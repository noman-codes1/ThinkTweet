import { UnauthorizedError } from "../errors/errors.custom.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { sessionReftokenVar } from "./jwt.sessionSchema.js";
import { env } from "../config/env.config.js";
import { accessToken } from "./jwt.generateTokens.js";
import { refreshToken } from "./jwt.generateTokens.js";
import { logFlow, logDB, logValid, logError } from "../debug/debug.logs.js";

export const jwtRefreshController = async (req, res, next) => {
  try {
    logFlow("Running jwtRefreshController files...")

    //getting the refresh token
    logFlow("Extracting the refresh token from the cookies")
    const refToken = req.cookies.refresh_token;

    //checking whether the token is present or not
    if (!refToken) {
      logError("No token is present")
      throw new UnauthorizedError("Refresh Token is missing");
    }
    logValid("Token is available")

    //verifying the token and getting the payload
    logFlow("Verifying the token...")
    let data;
    jwt.verify(refToken, env.refreshkey, (err, payload) => {
      if (err) {
        logError("Token not verified")
        throw new UnauthorizedError(err.message);
      }
      data = payload;
    });
    logValid("Token verified")

    //checking the existence of data
    logFlow("Further security check")
    logDB("Searching the session id from the database..")
    const exists = await sessionReftokenVar.exists({ session_id: data.sessionId });

    //working on according to conditions
    if (exists) {
      logValid("Session available in the database")
      
      //getting the detailed data of that user
      logDB("Getting the data from the database...")
      const sessionUserData = await sessionReftokenVar.findOne(
        { session_id: data.sessionId },
        {session_id: 1, refresh_token: 1 },
      );

      //verfiying whether the refresh token is matched with user or not
      logFlow("Verifying the correct refresh token...")
      const doesMatch = await argon2.verify(
        sessionUserData.refresh_token,
        refToken,
      );

      //checking the condition
      if (doesMatch) {
        logFlow("Correct refresh token found")

        //generating the new accessToken and fresh token
        logFlow("Generating the tokens...")
        const accToken = await accessToken(data.userId);
        const refreshTokenData = await refreshToken(data.userId, sessionUserData.session_id);

        //updating the database with new refreshed token
        logDB("Updating the database with correct hashed refresh token...")
        await sessionReftokenVar.updateOne(
          { session_id: data.sessionId },
          { $set: { refresh_token: refreshTokenData.rHashedToken } },
        );
        logDB("Database updated")

        //setting the cookie for access token
        logFlow("Updating the accessToken in cookie")
        res.cookie("access_token", accToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 10 * 60 * 1000,
          path: "/",
        });

        //setting the cookie for refresh token
        logFlow("Updating the refreshToken")
        res.cookie("refresh_token", refreshTokenData.rToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 100,
          path: "/refresh",
        });

        //replying the server
        logFlow("Closing the connection")
        res.status(200).json({
          success: true,
          message: "Now, continue your work...",
        });
      } else {
        //user is compromised
        logError("User is compromised....")
        logFlow("Cleaning up the process")

        //cleaning up the access token
        logFlow("Deleting the accessToken")
        res.clearCookie("access_token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });

        //cleaning up the refresh token
        logFlow("Deleting the refreshToken")
        res.clearCookie("refresh_token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/refresh",
        });

        //cleaning up the database
        logDB("Cleaning up the database..")
        await sessionReftokenVar.deleteOne({session_id : data.sessionId})
        logDB("Session Id is deleted")

        //sending a mail to the user
        // WILL APPLY IN PHASE II

        //replying back
        throw new UnauthorizedError("User is compromised...")
      }
    } else {
      //throw a error
      logError("Session not avaliable. Please log in again.")
      throw new UnauthorizedError("Session not avaliable. Please log in...");
    }
  } catch (error) {
    next(error);
  }
};