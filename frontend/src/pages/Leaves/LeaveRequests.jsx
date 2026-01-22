import { useEffect, useState } from "react";
import { getLeaves, approveLeave, rejectLeave } from "../../api/leave.api.js";
import { PERMISSIONS } from "../../utils/permission.js";
import { useAuth } from "../../auth/AuthContext.jsx";

const LeaveRequests = () => {
  const { permissions } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {

    try {
      const res = await getLeaves();
      console.log("RAW RESPONSE:", res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.leaves || res.data.data || [];

      setLeaves(data);
    } catch (err) {
      console.error("Failed to fetch leaves", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (loading) return <p>Loading leave requests...</p>;
  if (!leaves.length) return <p>No leave requests found</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>From</th>
          <th>To</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {leaves.map((leave) => (
          <tr key={leave._id}>
            <td>{leave.employeeId}</td>
            <td>{leave.startDate}</td>
            <td>{leave.endDate}</td>
            <td>{leave.status}</td>

            <td className="flex gap-2">
              {permissions.includes(PERMISSIONS.LEAVE_APPROVE) && (
                <button
                  onClick={() => approveLeave(leave._id).then(fetchLeaves)}
                  className="px-2 py-1 bg-green-600 text-white"
                >
                  Approve
                </button>
              )}

              {permissions.includes(PERMISSIONS.LEAVE_REJECT) && (
                <button
                  onClick={() => rejectLeave(leave._id).then(fetchLeaves)}
                  className="px-2 py-1 bg-red-600 text-white"
                >
                  Reject
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveRequests;
