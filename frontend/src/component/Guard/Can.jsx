import { useAuth } from "../../auth/AuthContext.jsx";
import { hasAnyPermission, hasAllPermissions } from "../../utils/permission.js";

/**
 * Usage:
 * <Can permission={PERMISSIONS.USER_CREATE}>
 * <Can any={[...]} >
 * <Can all={[...]} >
 */
const Can = ({ permission, any = [], all = [], children }) => {
  const { user } = useAuth();

  if (!user) return null;

  if (permission && !hasAnyPermission(user, [permission])) return null;
  if (any.length && !hasAnyPermission(user, any)) return null;
  if (all.length && !hasAllPermissions(user, all)) return null;

  return children;
};

export default Can;
