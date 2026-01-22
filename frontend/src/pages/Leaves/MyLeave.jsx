// src/pages/leaves/MyLeaves.jsx
import { useEffect, useState } from "react";
import { getLeaves, cancelLeave } from "../../api/leave.api.js";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const fetchLeaves = async () => {
  try {
    setLoading(true);

    const res = await getLeaves();
    const leaves = res.data.leaves;

    if (!Array.isArray(leaves)) {
      throw new Error("Invalid leaves response");
    }

    setLeaves(leaves);
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Failed to load leaves");
    setLeaves([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleCancel = async (leaveId) => {
    try {
      await cancelLeave(leaveId);
      fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  if (loading) return <p>Loading leaves...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Leaves</h2>

      {leaves.length === 0 ? (
        <p>No leaves found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.type}</td>
                <td>{leave.startDate?.slice(0, 10)}</td>
                <td>{leave.endDate?.slice(0, 10)}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.status === "PENDING" && (
                    <button className="bg-blue-500" onClick={() => handleCancel(leave._id)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


