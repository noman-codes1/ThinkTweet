import { env } from "../config/env.config.js";
import { ForbiddenError } from "./errors.custom.js";
import { logFlow } from "../debug/debug.logs.js";

export const checkOrgin = (req, res, next) => {
  try {
    logFlow(`Url in .env is: ${env.frontendurl}`);
    logFlow(`Request coming from ${req.headers.origin}`);

    //finding whether it's a direct server visit or not
    // #tip: learn more about this combination
    const isDirectServerVisit =
      req.headers["sec-fetch-site"] === "none" &&
      req.headers["sec-fetch-mode"] === "navigate" &&
      req.headers.origin === undefined;

    //checking whether request is arising from the expected situation
    if (!(req.headers.origin === env.frontendurl || isDirectServerVisit)) {
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
