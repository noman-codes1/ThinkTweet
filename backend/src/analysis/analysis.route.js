import { Router } from "express";
import { analysisControllerLogic } from "./analysis.controller.js";
import { tweetLimiter } from "../validation/validaton.expressLimiter.js";
import { authenticate } from "../jwt/jwt.authenticate.js";

const analysisRouter = Router()

analysisRouter.post("/", tweetLimiter, authenticate, analysisControllerLogic)

export default analysisRouter