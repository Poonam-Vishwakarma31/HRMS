

export const PERMISSIONS = {
  // USER / EMPLOYEE DATA 
  EMPLOYEE_READ_ALL: "employee:read:all",
  EMPLOYEE_READ_SELF: "employee:read:self",
  EMPLOYEE_UPDATE_SELF: "employee:update:self",
  EMPLOYEE_UPDATE_ALL: "employee:update:all",

  //User create
  USER_CREATE: "user:create",

 
  // LEAVE REQUESTS 
  LEAVE_CREATE: "leave:create",
  LEAVE_VIEW_SELF: "leave:view:self",
  LEAVE_VIEW_ALL: "leave:view:all",
  LEAVE_APPROVE: "leave:approve",
  LEAVE_REJECT: "leave:reject",
  LEAVE_CANCLE: "leave:cancle",

  //SYSTEM / ADMIN 
  ROLE_ASSIGN: "role:assign",
  PERMISSION_ASSIGN: "permission:assign"
};
