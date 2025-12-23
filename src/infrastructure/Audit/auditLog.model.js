import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },

    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null // system / bootstrap actions
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },

    meta: {
      type: Object,
      default: {}
    },
    before: {
  type: Object,
  default: null
},
after: {
  type: Object,
  default: null
}

  },
  {
    timestamps: true,
    versionKey: false
  }
);

const AuditLog= mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
