import { Router } from "express";
import * as userController from './auth.controller.js'

const authRouter = Router();

// Normal User
authRouter.post("/user/register",userController.register)
authRouter.post("/user/login",userController.login)


export default authRouter;