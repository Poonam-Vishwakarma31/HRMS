// dashboard/dashboard.widgets.js
import { PERMISSIONS } from "../utils/permission.js";

import AdminStats from "./Widgets/AdminStats.jsx";
import TeamStats from "./Widgets/TeamStats.jsx";
import LeaveOverview from "./Widgets/LeaveOverview.jsx";
import MyLeaveWidget from "./Widgets/MyLeaveWidget.jsx";
import CreateUserWidget from "./Widgets/CreateUserWidgets.jsx";

export const DASHBOARD_WIDGETS = [
  {
    id: "admin-stats",
    component: AdminStats,
    permissions: [PERMISSIONS.EMPLOYEE_READ_ALL],
  },
  {
    id: "team-stats",
    component: TeamStats,
    permissions: [PERMISSIONS.EMPLOYEE_READ_ALL],
  },
  {
    id: "leave-overview",
    component: LeaveOverview,
    permissions: [PERMISSIONS.LEAVE_VIEW_ALL],
  },
  {
    id: "my-leaves",
    component: MyLeaveWidget,
    permissions: [PERMISSIONS.LEAVE_VIEW_SELF],
  },
  {
    id: "create-user",
    component: CreateUserWidget,
    permissions: [PERMISSIONS.USER_CREATE],
  },
];
