// dashboard/widgets/LeaveOverview.jsx
const LeaveOverview = ({ stats }) => {
  return (
    <div className="widget">
      <h3>Leave Overview</h3>

      <ul>
        <li>Total Leaves: <b>{stats.totalLeaves}</b></li>
        <li>Pending: <b>{stats.pendingLeaves}</b></li>
        <li>Approved: <b>{stats.approvedLeaves}</b></li>
        <li>Rejected: <b>{stats.rejectedLeaves}</b></li>
      </ul>
    </div>
  );
};

export default LeaveOverview;

