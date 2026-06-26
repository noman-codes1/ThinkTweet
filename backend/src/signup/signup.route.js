import { Router } from "express";
import { signupController } from "./signup.controller.js";
import { verifyController } from "./signup.verify.controller.js";
import { signupLimiter } from "../validation/validaton.expressLimiter.js";
import { verifyLimiter } from "../validation/validaton.expressLimiter.js";

const signupRouter = Router();

//transferring the signals to different files
signupRouter.post("/signup", signupLimiter, signupController);
signupRouter.get("/verify", verifyLimiter, verifyController);

export default signupRouter;
