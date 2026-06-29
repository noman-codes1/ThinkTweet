import { Router } from "express";
import { paymentController } from "./payments.controller.js";
import { paymentLimiter } from "../validation/validaton.expressLimiter.js";
import { authenticate } from "../jwt/jwt.authenticate.js";

//creating a router
const paymentRouter = Router()
paymentRouter.post("/", paymentLimiter, authenticate,  paymentController)

//exporting a router
export default paymentRouter