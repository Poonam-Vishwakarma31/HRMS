import express from "express";
import { dashboardStats } from "./dashboard.controller.js";
import { verifyToken } from "../../middleware/authenticate.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", verifyToken, dashboardStats);

export default dashboardRouter;