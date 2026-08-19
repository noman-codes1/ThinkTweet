import { env } from "../config/env.config.js";
import { ForbiddenError } from "./errors.custom.js";
import { logFlow } from "../debug/debug.logs.js";

export const checkOrgin = (req, res, next) => {
  try {
    logFlow(`Url in .env is: ${env.frontendurl}`);
    logFlow(`Request coming from ${req.headers.origin}`);

    if (!(req.headers.origin === env.frontendurl || req.headers.origin === env.backendurl)) {
      throw new ForbiddenError("Request recieved from invalid url");
    }

    next();
    //when using without next()
    //without parameter - simply means to pass to the next middleware
    //with parameter - searches the .use() fn to pass to the global error
  } catch (error) {
    next(error);
  }
};
