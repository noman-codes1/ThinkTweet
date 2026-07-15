import { Router } from "express";
import { signupController } from "./signup.controller.js";
import { verifyController } from "./signup.verify.controller.js";
import { signupLimiter } from "../validation/validaton.expressLimiter.js";
import { verifyLimiter } from "../validation/validaton.expressLimiter.js";
import { validationForSignup } from "../validation/validation.signup.js";
import { validationVerifyUser } from "../validation/validation.verifyUser.js";

const signupRouter = Router();

//transferring the signals to different files
signupRouter.post("/signup", signupLimiter, validationForSignup, signupController);
signupRouter.get("/verify", verifyLimiter, validationVerifyUser, verifyController);

export default signupRouter;
