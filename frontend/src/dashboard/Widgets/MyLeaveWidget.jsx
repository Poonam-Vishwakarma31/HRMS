// dashboard/widgets/MyLeaveWidget.jsx
import { useNavigate } from "react-router-dom";

const MyLeaveWidget = ({ stats }) => {
  const navigate = useNavigate();

  return (
    <div className="widget">
      <h3>My Leaves</h3>

      <ul>
        <li>Total Applied: <b>{stats.totalLeaves}</b></li>
        <li>Pending: <b>{stats.pendingLeaves}</b></li>
        <li>Approved: <b>{stats.approvedLeaves}</b></li>
      </ul>

      <button onClick={() => navigate("/dashboard/leaves/mine")}>
        View Details
      </button>
    </div>
  );
};

export default MyLeaveWidget;


