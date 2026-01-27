// dashboard/widgets/TeamStats.jsx
const TeamStats = ({ stats }) => {
  return (
    <div className="widget">
      <h3>My Team</h3>

      <ul>
        <li>Team Members: <b>{stats.teamMembers}</b></li>
        <li>Pending Team Leaves: <b>{stats.teamPendingLeaves}</b></li>
        <li>Approved Team Leaves: <b>{stats.teamApprovedLeaves}</b></li>
      </ul>
    </div>
  );
};

export default TeamStats;

