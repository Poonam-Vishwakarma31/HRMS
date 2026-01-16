// dashboard/dashboard.widgets.js
import { PERMISSIONS } from "../../utils/permission";

import AdminStats from "./widgets/AdminStats";
import TeamStats from "./widgets/TeamStats";
import LeaveOverview from "./widgets/LeaveOverview";
import MyLeaveWidget from "./widgets/MyLeaveWidget";
import CreateUserWidget from "./widgets/CreateUserWidget";

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
