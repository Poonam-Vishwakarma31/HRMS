import AuditLog from "./auditLog.model.js";

export const createAuditLog = async ({
  action,
  actorId = null,
  targetId = null,
  meta = {},
  before= null,
  after= null
}) => {
  await AuditLog.create({
    action,
    actorId,
    targetId,
    meta,
    before,
    after
  });
};
