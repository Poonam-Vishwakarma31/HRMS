// src/pages/leaves/LeaveActions.jsx
import {
  approveLeave,
  rejectLeave,
} from "../../api/leave.api";

export default function LeaveActions({ leaveId, onAction }) {
  const handleApprove = async () => {
    await approveLeave(leaveId);
    onAction();
  };

  const handleReject = async () => {
    await rejectLeave(leaveId);
    onAction();
  };

  return (
    <>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleReject}>Reject</button>
    </>
  );
}
