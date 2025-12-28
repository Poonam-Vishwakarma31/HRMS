import { Router } from "express";
import * as userController from './auth.controller.js';
import { verifyToken } from "../../middleware/authenticate.js";
import { PERMISSIONS } from "../../config/permission.js";
import { authorizePermissions } from "../../middleware/authorizePermission.js";

const authRouter = Router();

//  User registration
authRouter.post(
  "/user/register",
  verifyToken,
  authorizePermissions(
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.ROLE_ASSIGN
  ),
  userController.register
);

// Manager assign to employee
authRouter.patch(
  "/:id/assign-manager",
  verifyToken,
  authorizePermissions(PERMISSIONS.EMPLOYEE_UPDATE_ALL),
  userController.assignManager
);



//User login

authRouter.post("/user/login",userController.login)


export default authRouter;