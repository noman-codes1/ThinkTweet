import { Router } from "express";
import { analysisControllerLogic } from "./analysis.controller.js";
import { tweetLimiter } from "../validation/validaton.expressLimiter.js";

const analysisRouter = Router()

analysisRouter.post("/", tweetLimiter, analysisControllerLogic)

export default analysisRouter