import { Router } from "express";
import { authneticatedLimiter } from "../validation/validaton.expressLimiter.js";
import { authenticate } from "../jwt/jwt.authenticate.js";
import { authneticatedController } from "./authenticated.controller.js";

//creating a mini express
const authneticatedRouter = Router()

//passing the request to multiple files
authneticatedRouter.post("/", authneticatedLimiter, authenticate, authneticatedController)

//exporting the router
export default authneticatedRouter