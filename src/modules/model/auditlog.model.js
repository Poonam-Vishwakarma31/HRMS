
import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,
    required: true
  },
  resourceType: {
    type: String,
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  before: Object,
  after: Object,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const AuditLog= mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
