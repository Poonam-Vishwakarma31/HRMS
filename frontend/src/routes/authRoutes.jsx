import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/authContext";

/**
 * 1. PROTECTED ROUTE
 * → User must be authenticated
 */
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

/**
 * 2. ROLE-BASED ROUTE
 * → User must have one of the allowed roles
 */
export const RoleRoute = ({ allowedRoles = [] }) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

/**
 * 3. PERMISSION-BASED ROUTE
 * → User must have specific permission(s)
 */
export const PermissionRoute = ({ requiredPermissions = [] }) => {
  const { user } = useAuth();

  const userPermissions = user?.permissions || [];

  const hasPermission = requiredPermissions.every((perm) =>
    userPermissions.includes(perm)
  );

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
