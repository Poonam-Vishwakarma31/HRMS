import Can from "../Guard/Can.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";
import { hasAnyPermission } from "../../utils/permission.js";

const Input = ({ permission, label, ...props }) => {
  const { user } = useAuth();

  const allowed =
    !permission || hasAnyPermission(user, [permission]);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <input
        {...props}
        disabled={!allowed}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600
          ${!allowed ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />
    </div>
  );
};

export default Input;
