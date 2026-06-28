import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { UnauthorizedError } from "../errors/errors.custom.js";
import { ValidationError } from "../errors/errors.custom.js";

export const authenticate = (req, res, next) => {
  console.log("Inside authenticate() func");
  try {
    //extracting the token
    console.log("Extracting a accessToken");
    const accessToken = req.cookies.access_token;

    //throwing a error when token is not provided
    if (!accessToken) {
      console.log("Please log in again...")
      throw new UnauthorizedError("Token is not provided");
    }
    console.log("Token is present");

    //verifying the token
    console.log("Verifying the token and getting the payload");
    jwt.verify(accessToken, env.accesskey, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new ValidationError(err.message);
        }
        throw new UnauthorizedError(err.message);
      }
      console.log(`Here is your decoded payload : ${payload}`);

      //attaching to the req so it's become easy to accessible
      req.user = payload;
    });

    console.log("req.user :", req.user);
    next();
  } catch (error) {
    next(error);
  }
};
