import { PERMISSIONS } from "../utils/permission.js";

export const SIDEBAR_ITEMS = [
  // ---------------- COMMON ----------------
  {
    label: "Dashboard",
    path: "/dashboard",
    permissions: [], // any logged-in user
  },

  // ---------------- EMPLOYEE ----------------
  {
    label: "My Profile",
    path: "/dashboard/profile",
    permissions: [
      PERMISSIONS.EMPLOYEE_READ_SELF,
       PERMISSIONS.EMPLOYEE_UPDATE_SELF,
    ],
  },

  {
    label: "User List",
    path: "/dashboard/users",
    permissions: [
      PERMISSIONS.EMPLOYEE_READ_ALL,
      PERMISSIONS.EMPLOYEE_UPDATE_ALL,
    ],
  },

  // ---------------- LEAVE ----------------
  {
    label: "Apply Leave",
    path: "/dashboard/leaves/apply",
    permissions: [PERMISSIONS.LEAVE_CREATE],
  },

  {
    label: "My Leaves",
    path: "/dashboard/leaves/mine",
    permissions: [PERMISSIONS.LEAVE_VIEW_SELF],
  },

  {
    label: "Leave Requests",
    path: "/dashboard/leaves/requests",
    permissions: [PERMISSIONS.LEAVE_VIEW_ALL],
  },

  // ---------------- USER MANAGEMENT ----------------
  {
    label: "Create User",
    path: "/dashboard/users/create",
    permissions: [PERMISSIONS.USER_CREATE],
  },

  // ---------------- ADMIN / SYSTEM ----------------
  {
    label: "Admin Panel",
    path: "/dashboard",
    permissions: [
      PERMISSIONS.ROLE_ASSIGN,
      PERMISSIONS.PERMISSION_ASSIGN,
    ],
  },
];