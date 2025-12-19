import { Router } from "express";
import * as userController from './auth.controller.js'

const router = Router();

// Normal User
router.post("/user/register",userController.register)
router.post("/user/login",userController.login)


export default router;