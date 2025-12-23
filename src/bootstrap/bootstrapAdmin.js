import User from "../modules/model/User.model.js";
import { createAuditLog } from "../infrastructure/Audit/audit.service.js";
import { AUDIT_ACTIONS } from "../infrastructure/Audit/audit.actions.js";



export const bootstrapAdmin = async () => {
  const adminExists = await User.exists({ role: "admin" });
  if (adminExists) return;

  if (!process.env.BOOTSTRAP_ADMIN_EMAIL || !process.env.BOOTSTRAP_ADMIN_PASSWORD) {
    throw new Error("Bootstrap admin env vars missing");
  }

  // Create Admin one-time only
  const admin = await User.create({
    name: "System Admin",
    email: process.env.BOOTSTRAP_ADMIN_EMAIL,
    password: process.env.BOOTSTRAP_ADMIN_PASSWORD, 
    role: "admin",
    isActive: true
  });

  // Audit log
  await createAuditLog({
    actorId: null, // system
    action: AUDIT_ACTIONS.BOOTSTRAP_ADMIN_CREATED,
    targetId: admin._id,
    meta: { email: admin.email }
  });

  console.log(" Bootstrap admin created:", admin.email);
};
