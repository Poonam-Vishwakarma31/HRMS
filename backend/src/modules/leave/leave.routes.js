import { Router } from "express";
import { PERMISSIONS } from "../../config/permission.js";
import { verifyToken } from "../../middleware/authenticate.js";
import { authorizePermissions } from "../../middleware/authorizePermission.js";

import { createLeave, getLeaves, approveLeave, rejectLeave, cancelLeave } from "./leave.controller.js";


const leaveRouter= Router();


//Employee create leave
leaveRouter.post(
    "/create",
    verifyToken,
    authorizePermissions(PERMISSIONS.LEAVE_CREATE),
    createLeave
);

// get all leave- hr, admin
// Employee- get own leave

leaveRouter.get(
    "/",
    verifyToken,
    authorizePermissions(PERMISSIONS.LEAVE_VIEW_ALL, PERMISSIONS.LEAVE_VIEW_SELF),
    getLeaves
);

// approve leave - HR, Admin, Manager

leaveRouter.patch(
    "/:id/approve",
    verifyToken, 
    authorizePermissions(PERMISSIONS.LEAVE_APPROVE),
    approveLeave
)

// reject leave- HR, Admin, Manager

leaveRouter.patch(
    "/:id/reject",
    verifyToken,
    authorizePermissions(PERMISSIONS.LEAVE_REJECT),
    rejectLeave
)

// Cancle own leave- only employee

leaveRouter.patch(
    "/:id/cancle",
    verifyToken,
    authorizePermissions(PERMISSIONS.LEAVE_CANCLE),
    cancelLeave
);


export default leaveRouter;