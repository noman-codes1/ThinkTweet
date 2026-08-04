import { Router } from "express";
import { dashboardController } from "./dashboard.controller.js";
import { authenticate } from "../jwt/jwt.authenticate.js";

const dashboardRouter = Router()

// Add a express limiter middleware also...
dashboardRouter.post("/", authenticate, dashboardController)

export default dashboardRouter