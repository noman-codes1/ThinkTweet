import { env } from "../config/env.config.js"
import { ForbiddenError } from "./errors.custom.js"

export const checkOrgin = (req, res, next) =>{
    console.log(env.frontendurl)
    console.log(`The url that hit is : ${req.headers.origin}`)

    if(!(req.headers.origin === env.frontendurl)){
        throw new ForbiddenError("Not allowed")
    }

    next()
    //when using without next()
    //without parameter - simply means to pass to the next middleware
    //with parameter - searches the .use() fn to pass to the global error
}