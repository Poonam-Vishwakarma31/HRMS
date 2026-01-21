// src/api/leave.api.js
import api from "./axios.js";

/**
 * EMPLOYEE
 */

// Create leave
export const createLeave = (payload) => {
  return api.post("/leaves/create", payload);
};

// Get leaves
// - Employee → own leaves
// - HR/Admin → all leaves
export const getLeaves = () => {
  return api.get("/leaves");
};

// Cancel own leave
export const cancelLeave = (leaveId) => {
  return api.patch(`/leaves/${leaveId}/cancel`);
};

/**
 * APPROVER (HR / ADMIN / MANAGER)
 */

// Approve leave
export const approveLeave = (leaveId) => {
  return api.patch(`/leaves/${leaveId}/approve`);
};

// Reject leave
export const rejectLeave = (leaveId) => {
  return api.patch(`/leaves/${leaveId}/reject`);
};
