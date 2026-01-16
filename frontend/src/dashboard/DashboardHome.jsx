// dashboard/DashboardHome.jsx
import { useAuth } from "../auth/AuthContext.jsx";
import { DASHBOARD_WIDGETS } from "./dashboard.Widgets.js";
import { hasAnyPermission } from "../utils/permission.js";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-grid">
      {DASHBOARD_WIDGETS
        .filter(widget =>
          hasAnyPermission(user, widget.permissions)
        )
        .map(({ id, component: Widget }) => (
          <Widget key={id} />
        ))}
    </div>
  );
};

export default DashboardHome;
