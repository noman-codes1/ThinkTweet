import { Router } from "express"
import { loginController } from "./login.controller.js"
import { loginLimiter } from "../validation/validaton.expressLimiter.js"

//creating a mini express app
const loginRouter = Router()

loginRouter.post("/login", loginLimiter, loginController)

export default loginRouter