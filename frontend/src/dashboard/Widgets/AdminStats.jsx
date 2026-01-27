// dashboard/widgets/AdminStat.jsx
const AdminStat = ({ stats }) => {
  return (
    <div className="widget">
      <h3>Admin Stats</h3>

      <ul>
        <li>Total Employees: <b>{stats.totalEmployees}</b></li>
        <li>Total Managers: <b>{stats.totalManagers}</b></li>
      </ul>
    </div>
  );
};

export default AdminStat;

