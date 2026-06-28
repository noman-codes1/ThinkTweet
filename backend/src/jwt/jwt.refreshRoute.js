import { Router } from "express";
import { jwtRefreshController } from "./jwt.refreshController.js";
import { refreshLimiter } from "../validation/validaton.expressLimiter.js";

//creating a mini express and setting up the router
const refreshRouter = Router()
refreshRouter.post("/", refreshLimiter, jwtRefreshController)

//exporting the router
export default refreshRouter