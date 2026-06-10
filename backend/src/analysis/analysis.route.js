import { Router } from "express";
import { analysisControllerLogic } from "./analysis.controller.js";
const analysisRouter = Router()

analysisRouter.post("/", analysisControllerLogic)

export default analysisRouter