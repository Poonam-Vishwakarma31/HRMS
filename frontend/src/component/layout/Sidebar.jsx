import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../config/sidebar.config.js";
import { useAuth } from "../../auth/AuthContext.jsx";
import { hasAnyPermission } from "../../utils/permission.js";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null; // prevent rendering if user is not loaded


  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">HRMS</h2>

      <nav className="flex flex-col gap-2">
        {SIDEBAR_ITEMS.filter(
          (item) =>
            item.permissions.length === 0 ||
            hasAnyPermission(user, item.permissions)
        ).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

