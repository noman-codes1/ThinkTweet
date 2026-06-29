import express from "express"
import { Router } from "express";
import { webhookController } from "./webhook.controller.js";

const webhookRouter = Router()
webhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  webhookController,
);

export default webhookRouter