import User from "../model/User.model.js";
import Leave from "../model/leave.model.js";

export const getDashboardStats = async ({ user }) => {
  if (!user) throw new Error("Unauthenticated");

  // EMPLOYEE
  if (user.role === "employee") {
    const totalLeaves = await Leave.countDocuments({ employeeId: user.id });
    const approvedLeaves = await Leave.countDocuments({
      employeeId: user.id,
      status: "APPROVED",
    });
    const pendingLeaves = await Leave.countDocuments({
      employeeId: user.id,
      status: "PENDING",
    });
    
    return {
      totalLeaves,
      approvedLeaves,
      pendingLeaves,
    };
  }

  // MANAGER
  if (user.role === "manager") {
    const teamMembers = await User.countDocuments({
      managerId: user.id,
    });

    const pendingApprovals = await Leave.countDocuments({
      managerId: user.id,
      status: "PENDING",
    });

    const approvedLeaves = await Leave.countDocuments({
      managerId: user.id,
      status: "APPROVED",
    });

    return {
      teamMembers,
      pendingApprovals,
      approvedLeaves,
    };
  }

  // ADMIN / HR
const totalEmployees = await User.countDocuments({ role: "employee" });
const totalManagers = await User.countDocuments({ role: "manager" });

const totalLeaves = await Leave.countDocuments();
const approvedLeaves = await Leave.countDocuments({ status: "APPROVED" });
const pendingLeaves = await Leave.countDocuments({ status: "PENDING" });

return {
  totalEmployees,
  totalManagers,
  totalLeaves,
  approvedLeaves,
  pendingLeaves,
};
};
