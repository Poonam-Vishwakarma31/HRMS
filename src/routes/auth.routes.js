import { Router } from "express";
import * as userController from '../controllers/auth.controller.js'

const router = Router();

// Normal User
router.post("/user/signup",userController.signup)
router.post("/user/login",userController.login)


export default router;