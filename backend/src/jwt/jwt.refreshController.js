import { UnauthorizedError } from "../errors/errors.custom.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { sessionReftokenVar } from "./jwt.sessionSchema.js";
import { env } from "../config/env.config.js";
import { accessToken } from "./jwt.generateTokens.js";
import { refreshToken } from "./jwt.generateTokens.js";

export const jwtRefreshController = async (req, res, next) => {
  console.log("Inside jwtRefreshController() func");
  try {
    //getting the refresh token
    console.log("Getting the refresh token");
    const refToken = req.cookies.refresh_token;

    //checking whether the token is present or not
    if (!refToken) {
      throw new UnauthorizedError("Refresh Token is missing");
    }
    console.log("Token available");

    //verifying the token and getting the payload
    console.log("Verifying the token...");
    let data;
    jwt.verify(refToken, env.refreshkey, (err, payload) => {
      if (err) {
        throw new UnauthorizedError(err.message);
      }
      data = payload;
    });
    console.log("The data decode from jwt is: \n", data);

    //checking the existence of data
    console.log("Searching database for existence... ")
    const exists = await sessionReftokenVar.exists({ session_id: data.sessionId });

    //working on according to conditions
    if (exists) {
      //getting the detailed data of that user
      console.log("User found in database... Getting the data");
      const sessionUserData = await sessionReftokenVar.findOne(
        { session_id: data.sessionId },
        {session_id: 1, refresh_token: 1 },
      );
      console.log("Session Data: \n", sessionUserData)

      //verfiying whether the refresh token is matched with user or not
      console.log("Verifying the token with database...");
      const doesMatch = await argon2.verify(
        sessionUserData.refresh_token,
        refToken,
      );
      console.log("Matched? : ", doesMatch);

      //checking the condition
      if (doesMatch) {
        //creating the new access and refresh token
        console.log("Getting new access token and refresh token");
        const accToken = await accessToken(data.userId);
        const refreshTokenData = await refreshToken(data.userId, sessionUserData.session_id);
        console.log("Access Token: \n", accToken);
        console.log("Refresh Token Data: \n", refreshTokenData);

        //updating the database with new refreshed token
        console.log("Updating the database...");
        await sessionReftokenVar.updateOne(
          { session_id: data.sessionId },
          { $set: { refresh_token: refreshTokenData.rHashedToken } },
        );
        console.log("Database updated");
        console.log("Setting the cookie");

        //setting the cookie for access token
        res.cookie("access_token", accToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 10 * 60 * 1000,
          path: "/",
        });

        //setting the cookie for refresh token
        res.cookie("refresh_token", refreshTokenData.rToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 100,
          path: "/refresh",
        });

        //replying the server
        res.status(200).json({
          success: true,
          message: "Now, continue your work...",
        });
      } else {
        //user is compromised
        console.log("User is compromised...")

        //cleaning up the access token
        res.clearCookie("access_token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        console.log("Cleaned access token in the cookie")

        //cleaning up the refresh token
        res.clearCookie("refresh_token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/refresh",
        });
        console.log("Cleaned refresh token in the cookie")

        //cleaning up the database
        await sessionReftokenVar.deleteOne({session_id : data.sessionId})
        console.log("Cleaned the database")

        //send a mail to the user
  

        //replying back
        throw new UnauthorizedError("User is compromised...")
      }
    } else {
      //throw a error
      throw new UnauthorizedError("User not logged in. Please log in.");
    }
  } catch (error) {
    next(error);
  }
};