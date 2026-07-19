import { Router } from "express"
import { loginController } from "./login.controller.js"
import { loginLimiter } from "../validation/validaton.expressLimiter.js"
import { validationLogin } from "../validation/validation.login.js"

//creating a mini express app
const loginRouter = Router()

// #tip: we don't need to break this router further 
// since there are not multiple path
loginRouter.post("/login", loginLimiter, validationLogin, loginController)

export default loginRouter