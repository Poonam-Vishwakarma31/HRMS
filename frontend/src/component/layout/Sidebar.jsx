import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard" className="hover:text-orange-400">
          Dashboard
        </NavLink>

        <NavLink to="/users" className="hover:text-orange-400">
          Users
        </NavLink>

        <NavLink to="/settings" className="hover:text-orange-400">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
