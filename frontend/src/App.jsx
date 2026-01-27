import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import DashboardLayout from "./component/layout/DashboardLayout.jsx";
import UsersList from "./pages/UsersList.jsx";
import ApplyLeave from "./pages/Leaves/ApplyLeave.jsx";
import MyLeaves from "./pages/Leaves/MyLeave.jsx";
import LeaveRequests from "./pages/Leaves/LeaveRequests.jsx";
import LeaveActions from "./pages/Leaves/LeaveActions.jsx";
import CreateUser from "./pages/CreateUser.jsx";

import {
  ProtectedRoute,
  RoleRoute,
  PermissionRoute,
} from "./routes/authRoutes.jsx";

import { PERMISSIONS } from "./utils/permission.js";

import "./App.css";
import DashboardHome from "./dashboard/DashboardHome.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

            {/* User Management */}
            <Route
              element={
                <PermissionRoute
                  requiredPermissions={[
                    PERMISSIONS.EMPLOYEE_READ_ALL,
                    PERMISSIONS.EMPLOYEE_READ_SELF,
                  ]}
                />
              }
            >
              <Route path="users/*" element={<UsersList />} />
              <Route path="users/:userId" element={<Profile mode="any" />} />
              <Route path="profile/*" element={<Profile mode="self" />} />
            </Route>

            {/* Create User */}
            <Route
              element={
                <PermissionRoute
                  requiredPermissions={[PERMISSIONS.USER_CREATE]}
                />
              }
            >
              <Route path="users/create" element={<CreateUser />} />
            </Route>

            {/* Leave Management */}
            <Route
              element={
                <PermissionRoute
                  requiredPermissions={[PERMISSIONS.LEAVE_VIEW_ALL]}
                />
              }
            >
              <Route path="leaves/requests" element={<LeaveRequests />} />
            </Route>

            <Route
              element={
                <PermissionRoute
                  requiredPermissions={[PERMISSIONS.LEAVE_CREATE]}
                />
              }
            >
              <Route path="leaves/apply" element={<ApplyLeave />} />
            </Route>

            <Route
              element={
                <PermissionRoute
                  requiredPermissions={[PERMISSIONS.LEAVE_VIEW_SELF]}
                />
              }
            >
              <Route path="leaves/mine" element={<MyLeaves />} />
            </Route>
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
