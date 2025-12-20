import { Router } from "express";
import { verifyToken } from "../../middleware/authenticate.js";
import { authorizePermissions } from "../../middleware/authorizePermission.js";
import { authorizeOwnership } from "../../middleware/authorize.ownership.js";

import { getAllUsers, getMyProfile, updateUser, deleteUser } from "./user.controller.js";


const userRouter = Router();

// Admin / HR → all users
userRouter.get(
  "/",
  verifyToken,
  authorizePermissions(PERMISSIONS.EMPLOYEE_READ_ALL),
  getAllUsers
);

// Logged-in user → own profile
userRouter.get(
  "/me",
  verifyToken,
  getMyProfile
);

// Update user (self or admin)
userRouter.put(
  "/:id",
  verifyToken,
  authorizePermissions(
    PERMISSIONS.EMPLOYEE_UPDATE_SELF,
    PERMISSIONS.EMPLOYEE_UPDATE_ALL
  ),
  authorizeOwnership(async (req) => {
    const user = await User.findById(req.params.id);
    return user?.id;
  }),
  updateUser
);

// Delete user (admin only)
userRouter.delete(
  "/:id",
  verifyToken,
  authorizePermissions(PERMISSIONS.EMPLOYEE_UPDATE_ALL),
  deleteUser
);

export default userRouter;