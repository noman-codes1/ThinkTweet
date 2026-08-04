import { Router } from "express";
import { analysisControllerLogic } from "./analysis.controller.js";
import { tweetLimiter } from "../validation/validaton.expressLimiter.js";
import { authenticate } from "../jwt/jwt.authenticate.js";
import { validationForAnalysis } from "../validation/validation.analysis.js";

const analysisRouter = Router();

analysisRouter.post(
  "/",
  tweetLimiter,
  authenticate,
  validationForAnalysis,
  analysisControllerLogic,
);

export default analysisRouter;
