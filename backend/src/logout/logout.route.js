import { Router } from "express";
import { logoutController } from "./logout.controller.js";
import { authenticate } from "../jwt/jwt.authenticate.js";
import { logoutLimiter } from "../validation/validaton.expressLimiter.js";

//creating a mini express app
const logoutRouter = Router();

//create a post creating and passing the request through middlewares
logoutRouter.post("/", logoutLimiter, authenticate, logoutController);

//exporting a file
export default logoutRouter;
