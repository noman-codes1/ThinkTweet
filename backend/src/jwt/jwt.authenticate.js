import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { UnauthorizedError, TokenExpiredError, ValidationError } from "../errors/errors.custom.js";
import { logFlow, logError, logDB, logValid } from "../debug/debug.logs.js";

export const authenticate = (req, res, next) => {
  try {
    logFlow("Running authenticate files...")

    //extracting the token
    logFlow("Extracting the token from the cookie")
    const accessToken = req.cookies.access_token;

    //throwing a error when token is not provided
    if (!accessToken) {
      logError("No access token found")
      throw new UnauthorizedError("Token is not provided.");
    }
    logValid("Validated. Access token present")

    //verifying the token
    logFlow("Verifying the token....")
    jwt.verify(accessToken, env.accesskey, (err, payload) => {
      if (err) {
        // if (err.name === "TokenExpiredError") {
        //   logError("Token is expired")
        //   throw new ValidationError(err.message);
        // }
        logError("Unable to verify the token")
        throw new UnauthorizedError(err.message);
      }
      logFlow("Access token is verified")

      //attaching to the req so it's become easy to accessible
      logFlow("Setting the payload to different object to access later.")
      req.user = payload;
    });

    next();
  } catch (error) {
    next(error);
  }
};
