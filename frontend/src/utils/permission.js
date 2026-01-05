/**
 * FRONTEND PERMISSIONS CONTRACT
 */

export const PERMISSIONS = {
  // USER / EMPLOYEE DATA 
  EMPLOYEE_READ_ALL: "employee:read:all",
  EMPLOYEE_READ_SELF: "employee:read:self",
  EMPLOYEE_UPDATE_SELF: "employee:update:self",
  EMPLOYEE_UPDATE_ALL: "employee:update:all",

  // User creation
  USER_CREATE: "user:create",

  // LEAVE REQUESTS 
  LEAVE_CREATE: "leave:create",
  LEAVE_VIEW_SELF: "leave:view:self",
  LEAVE_VIEW_ALL: "leave:view:all",
  LEAVE_APPROVE: "leave:approve",
  LEAVE_REJECT: "leave:reject",
  LEAVE_CANCEL: "leave:cancel", 

  // SYSTEM / ADMIN 
  ROLE_ASSIGN: "role:assign",
  PERMISSION_ASSIGN: "permission:assign"
};

/**
 * Frontend helper: Check if user has ALL required permissions
 * @param {Object} user - The logged-in user object from AuthContext
 * @param {string[]} requiredPermissions - Array of permission strings
 * @returns {boolean}
 */
export const hasPermissions = (user, requiredPermissions = []) => {
  if (!user || !Array.isArray(user.permissions)) return false;

  return requiredPermissions.every((perm) =>
    user.permissions.includes(perm)
  );
};

/**
 * Frontend helper: Check if user has AT LEAST ONE permission
 * @param {Object} user - The logged-in user object from AuthContext
 * @param {string[]} permissions - Array of permission strings
 * @returns {boolean}
 */
export const hasAnyPermission = (user, permissions = []) => {
  if (!user || !Array.isArray(user.permissions)) return false;

  return permissions.some((perm) =>
    user.permissions.includes(perm)
  );
};

/**
 * OPTIONAL: Role hints for frontend UI (not security-critical)
 * Useful for showing/hiding components based on role
 */
export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.EMPLOYEE_READ_ALL,
    PERMISSIONS.EMPLOYEE_UPDATE_ALL,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.LEAVE_VIEW_ALL,
    PERMISSIONS.LEAVE_APPROVE,
    PERMISSIONS.LEAVE_REJECT,
    PERMISSIONS.ROLE_ASSIGN,
    PERMISSIONS.PERMISSION_ASSIGN
  ],
  HR: [
    PERMISSIONS.EMPLOYEE_READ_ALL,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.LEAVE_VIEW_ALL,
    PERMISSIONS.LEAVE_APPROVE,
    PERMISSIONS.LEAVE_REJECT
  ],
  manager: [
    PERMISSIONS.EMPLOYEE_READ_ALL,
    PERMISSIONS.LEAVE_VIEW_ALL,
    PERMISSIONS.LEAVE_APPROVE,
    PERMISSIONS.LEAVE_REJECT
  ],
  employee: [
    PERMISSIONS.EMPLOYEE_READ_SELF,
    PERMISSIONS.EMPLOYEE_UPDATE_SELF,
    PERMISSIONS.LEAVE_CREATE,
    PERMISSIONS.LEAVE_VIEW_SELF,
    PERMISSIONS.LEAVE_CANCEL
  ]
};
