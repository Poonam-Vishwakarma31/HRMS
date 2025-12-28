import User from "../model/User.model.js";
import { createToken } from "./token.service.js";
import { ValidateFields } from "../../utils/validation.js";
import { ROLE_PERMISSIONS } from "../../config/rolePermission.js";
import { createAuditLog } from "../../infrastructure/Audit/audit.service.js";
import { AUDIT_ACTIONS } from "../../infrastructure/Audit/audit.actions.js";

// register service
export const registerService = async ({
  name,
  email,
  password,
  role,
  managerId,
  createdBy,
}) => {
  if (!ValidateFields(name, email, password, role)) {
    throw { status: 422, message: "Invalid input" };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 409, message: "User already exists" };
  }

  //  Role rules
  if (role === "admin" && createdBy.role !== "admin") {
    throw { status: 403, message: "Only admin can create admin" };
  }

  //  Manager rule
  if (role === "employee" && !managerId) {
    throw { status: 422, message: "Employee must have a manager" };
  }

  if (["admin", "HR"].includes(role) && managerId) {
    throw { status: 400, message: "Admin/HR cannot have a manager" };
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    managerId: role === "employee" ? managerId : null,
    permissions: ROLE_PERMISSIONS[role] || [],

  });

    // Audit log: record user creation
  await createAuditLog({
    actorId: createdBy.id,
    action: AUDIT_ACTIONS.USER_CREATED,
    targetId: user._id,
    meta: {
      name: user.name,
      email: user.email,
      role: user.role,
      managerId: user.managerId || null,
    },
  });

  return user;
};

// Assign manager to employee
export const assignManagerService = async ({ employeeId, managerId }) => {
  const employee = await User.findById(employeeId);
  if (!employee) {
    throw { status: 404, message: "Employee not found" };
  }

  if (employee.role !== "employee") {
    throw { status: 400, message: "Only employees can have managers" };
  }

  const manager = await User.findById(managerId);
  if (!manager) {
    throw { status: 404, message: "Manager not found" };
  }

  if (manager.role !== "manager") {
    throw { status: 400, message: "Assigned user is not a manager" };
  }

  if (employee.managerId && String(employee.managerId) === String(managerId)) {
  throw { status: 400, message: "Manager already assigned" };
}

 const before = { managerId: employee.managerId || null };

 //Assign manager
  employee.managerId = managerId;
  await employee.save();

   const after = { managerId: employee.managerId };

   
  // Audit log
  await createAuditLog({
    actorId: assignedBy.id, // who assigned the manager
    action: AUDIT_ACTIONS.MANAGER_ASSIGNED,
    targetId: employee._id,
    before,
    after,
  });

  return employee;
};


// Login service
export const loginService = async ({ email, password }) => {
  if (!ValidateFields(email, password)) {
    throw { status: 422, message: "One or more fields are invalid" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 400, message: "Invalid email or password" };
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw { status: 400, message: "Invalid email or password" };
  }

  const token = createToken(user.id, user.email, user.role);
  return { user, token };
};
