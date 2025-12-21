import Leave from "../model/leave.model.js";
import AuditLog from "../model/auditlog.model.js"
import {
  ForbiddenError,
  BadRequestError,
  NotFoundError
} from "../../utils/errors.js";

//helper → write audit log
 
const logAudit = async ({
  actorId,
  action,
  resourceId,
  before,
  after
}) => {
  await AuditLog.create({
    actorId,
    action,
    resourceType: "Leave",
    resourceId,
    before,
    after
  });
};

// EMPLOYEE creates leave

export const createLeave = async ({ user, payload }) => {
  if (!user) throw new ForbiddenError("Unauthenticated");

  const leave = await Leave.create({
    employeeId: user.id,
    managerId: user.managerId,
    type: payload.type,
    startDate: payload.startDate,
    endDate: payload.endDate,
    reason: payload.reason
  });

  await logAudit({
    actorId: user.id,
    action: "LEAVE_CREATED",
    resourceId: leave._id,
    after: leave.toObject()
  });

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

  // authority check (not ownership)
  if (
    user.role !== "admin" &&
    String(user.id) !== String(leave.managerId)
  ) {
    throw new ForbiddenError("Not authorized to approve this leave");
  }

  if (leave.status !== "PENDING") {
    throw new BadRequestError("Leave already processed");
  }

  const before = leave.toObject();

  leave.status = "APPROVED";
  leave.decidedBy = user.id;
  leave.decidedAt = new Date();

  await leave.save();

  await logAudit({
    actorId: user.id,
    action: "LEAVE_APPROVED",
    resourceId: leave._id,
    before,
    after: leave.toObject()
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

  const before = leave.toObject();

  leave.status = "REJECTED";
  leave.decidedBy = user.id;
  leave.decidedAt = new Date();
  leave.decisionReason = reason;

  await leave.save();

  await logAudit({
    actorId: user.id,
    action: "LEAVE_REJECTED",
    resourceId: leave._id,
    before,
    after: leave.toObject()
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

  const before = leave.toObject();

  leave.status = "CANCELLED";
  await leave.save();

  await logAudit({
    actorId: user.id,
    action: "LEAVE_CANCELLED",
    resourceId: leave._id,
    before,
    after: leave.toObject()
  });

  return leave;
};
