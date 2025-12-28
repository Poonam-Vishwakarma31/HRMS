import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    type: {
      type: String,
      enum: ["CASUAL", "SICK", "PAID", "UNPAID"],
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    reason: {
      type: String,
      maxlength: 500
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
      default: "PENDING",
      index: true
    },

    appliedAt: {
      type: Date,
      default: Date.now
    },

    decidedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    decidedAt: {
      type: Date
    },

    decisionReason: {
      type: String,
      maxlength: 300
    }
  },
  { timestamps: true }
);

const Leave= mongoose.model("Leave", leaveSchema);
export default Leave;
