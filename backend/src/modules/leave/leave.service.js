import Leave from "../model/leave.model.js";
import { createAuditLog } from "../../infrastructure/Audit/audit.service.js";
import { AUDIT_ACTIONS } from "../../infrastructure/Audit/audit.actions.js";
import User from "../model/User.model.js";



import {
  ForbiddenError,
  BadRequestError,
  NotFoundError
} from "../../utils/errors.js";



// EMPLOYEE creates leave

export const createLeave = async ({ user, payload }) => {
  if (!user) throw new ForbiddenError("Unauthenticated");

    const dbUser = await User.findById(user.id).select("managerId");

  if (!dbUser || !dbUser.managerId) {
    throw new Error("Manager not assigned to user");
  }

  const leave = await Leave.create({
    employeeId: dbUser._id,
    managerId: dbUser.managerId,
    type: payload.type,
    startDate: payload.startDate,
    endDate: payload.endDate,
    reason: payload.reason
  });

  await createAuditLog({
    actorId:user.id,
    action: AUDIT_ACTIONS.LEAVE_CREATED,
    targetId:leave._id,
      meta: {
      employeeId: leave.employeeId,
      managerId: leave.managerId,
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status
    }
  })

  return leave;
};

// VIEW leaves
 
export const getLeaves = async ({ user }) => {
  if (!user) throw new ForbiddenError();

  if (user.role === "employee") {
    return Leave.find({ employeeId: user.id });
  }

  if (user.role === "manager") {
    return Leave.find({ managerId: user.id });
  }

  return Leave.find();
};

// APPROVE leave
 
export const approveLeave = async ({ user, leaveId }) => {
  if (!user) throw new ForbiddenError();

  const leave = await Leave.findById(leaveId);
  if (!leave) throw new NotFoundError("Leave not found");

  // authority check 
  if (
    user.role !== "admin" &&
    String(user.id) !== String(leave.managerId)
  ) {
    throw new ForbiddenError("Not authorized to approve this leave");
  }

  if (leave.status !== "PENDING") {
    throw new BadRequestError("Leave already processed");
  }

   const before = {
    status: leave.status,
    decidedBy: leave.decidedBy,
    decidedAt: leave.decidedAt,
  };

 //Update leave
  leave.status = "APPROVED";
  leave.decidedBy = user.id;
  leave.decidedAt = new Date();

  await leave.save();

 // Audit log
  await createAuditLog({
    actorId: user.id,
    action: AUDIT_ACTIONS.LEAVE_APPROVED,
    targetId: leave._id,
    before,
    after: {
      status: leave.status,
      decidedBy: leave.decidedBy,
      decidedAt: leave.decidedAt,
    },
  });

  return leave;
};

//REJECT leave
 
export const rejectLeave = async ({ user, leaveId, reason }) => {
  if (!user) throw new ForbiddenError();

  const leave = await Leave.findById(leaveId);
  if (!leave) throw new NotFoundError("Leave not found");

  if (
    user.role !== "admin" &&
    String(user.id) !== String(leave.managerId)
  ) {
    throw new ForbiddenError("Not authorized to reject this leave");
  }

  if (leave.status !== "PENDING") {
    throw new BadRequestError("Leave already processed");
  }

   const before = {
    status: leave.status,
    decidedBy: leave.decidedBy,
    decidedAt: leave.decidedAt,
  };

  leave.status = "REJECTED";
  leave.decidedBy = user.id;
  leave.decidedAt = new Date();
  leave.decisionReason = reason;

  await leave.save();

 // Audit log
  await createAuditLog({
    actorId: user.id,
    action: AUDIT_ACTIONS.LEAVE_REJECTED,
    targetId: leave._id,
    before,
    after: {
      status: leave.status,
      decidedBy: leave.decidedBy,
      decidedAt: leave.decidedAt,
      decisionReason:leave.decisionReason,
    },
  });

  return leave;
};

// EMPLOYEE cancels own leave
 
export const cancelLeave = async ({ user, leaveId }) => {
  if (!user) throw new ForbiddenError();

  const leave = await Leave.findById(leaveId);
  if (!leave) throw new NotFoundError("Leave not found");

  // ownership check
  if (String(user.id) !== String(leave.employeeId)) {
    throw new ForbiddenError("Cannot cancel others' leave");
  }

  if (leave.status !== "PENDING") {
    throw new BadRequestError("Only pending leave can be cancelled");
  }

  const before = {
    status: leave.status,
    decidedBy: leave.decidedBy,
    decidedAt: leave.decidedAt,
  };

  leave.status = "CANCELLED";
  await leave.save();

 // Audit log
  await createAuditLog({
    actorId: user.id,
    action: AUDIT_ACTIONS.LEAVE_CANCELLED,
    targetId: leave._id,
    before,
    after: {
      status: leave.status,
    },
  });

  return leave;
};
