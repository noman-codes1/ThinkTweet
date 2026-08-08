import { Router } from "express";
import { paymentController } from "./payments.controller.js";
import { paymentLimiter } from "../validation/validaton.expressLimiter.js";
import { authenticate } from "../jwt/jwt.authenticate.js";
import { validationPayment } from "../validation/validation.payment.js";

//creating a router
const paymentRouter = Router();
paymentRouter.post(
  "/",
  paymentLimiter,
  authenticate,
  validationPayment,
  paymentController,
);

//exporting a router
export default paymentRouter;
