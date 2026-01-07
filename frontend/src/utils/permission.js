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
export const hasAllPermissions = (user, permissions = []) => {
  if (!user || !Array.isArray(user.permissions)) return false;
  return permissions.every((perm) =>
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


