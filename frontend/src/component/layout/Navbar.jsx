import { useAuth } from "../../auth/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-semibold">HRMS</h1>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>
        <button onClick={logout} className="text-red-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
