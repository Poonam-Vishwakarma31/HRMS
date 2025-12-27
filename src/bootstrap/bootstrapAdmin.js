import User from "../modules/model/User.model.js";
import { createAuditLog } from "../infrastructure/Audit/audit.service.js";
import { AUDIT_ACTIONS } from "../infrastructure/Audit/audit.actions.js";



export const bootstrapAdmin = async () => {
  if (!process.env.BOOTSTRAP_ADMIN_EMAIL || !process.env.BOOTSTRAP_ADMIN_PASSWORD) {
    throw new Error("Bootstrap admin env vars missing");
  }

  // Look for existing admin by email
  let admin = await User.findOne({ email: process.env.BOOTSTRAP_ADMIN_EMAIL });

  if (admin) {
    // If soft-deleted or inactive, restore
    if (!admin.isActive || admin.isDeleted) {
      admin.isActive = true;
      admin.$isDeleted = false;
      await admin.save();
      console.log("Bootstrap admin restored:", admin.email);
    } else {
      console.log("Bootstrap admin already exists and active:", admin.email);
    }
    return;
  }

  // No admin exists at all → create new
  admin = await User.create({
    name: "System Admin",
    email: process.env.BOOTSTRAP_ADMIN_EMAIL,
    password: process.env.BOOTSTRAP_ADMIN_PASSWORD, 
    role: "admin",
    isActive: true
  });

  // Audit log 
  try {
    await createAuditLog({
      actorId: null,
      action: AUDIT_ACTIONS.BOOTSTRAP_ADMIN_CREATED,
      targetId: admin._id,
      meta: { email: admin.email }
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }

  console.log("Bootstrap admin created:", admin.email);
};


