// dashboard/DashboardHome.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { getDashboardStats } from "../api/dashboard.api.js";

// Widgets
import AdminStat from "./Widgets/AdminStats.jsx";
import CreateUser from "./Widgets/CreateUserWidgets.jsx";
import LeaveOverview from "./Widgets/LeaveOverview.jsx";
import MyLeaveWidget from "./Widgets/MyLeaveWidget.jsx";
import TeamStats from "./Widgets/TeamStats.jsx";

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Failed to load dashboard</p>;

  return (
    <div className="dashboard-grid">
      {/* ADMIN / HR */}

      {(user.role === "admin" || user.role === "hr") && (
        <>
          <AdminStat stats={stats} />
          <CreateUser />
          <LeaveOverview stats={stats} />
        </>
      )}

      {/* MANAGER */}
      {user.role === "manager" && (
        <TeamStats stats={stats} />
      )}

      {/* EMPLOYEE */}
      {user.role === "employee" && (
        <MyLeaveWidget stats={stats} />
      )}
    </div>
  );
};

export default DashboardHome;

