import { validationLogin } from "../validation/validation.login.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { UnauthorizedError } from "../errors/errors.custom.js";
import { accessToken } from "../jwt/jwt.generateTokens.js";
import { refreshToken } from "../jwt/jwt.generateTokens.js";
import argon2 from "argon2";
import { sessionReftokenVar } from "../jwt/jwt.sessionSchema.js";
import crypto from "crypto"
import { logFlow, logError, logDB } from "../debug/debug.logs.js";

export const loginController = async (req, res, next) => {
  try {
    logFlow("Running loginController files")

    //talking out the object from the body
    const jsObject = req.body

    //fetching the info and verify the password
    logDB("Searching the database.....")
    const userData = await registeredUserVar.findOne(
      { user_email: jsObject.useremail },
      { user_name: 1, user_pass: 1 },
    );

    //verifying the password
    logFlow("Verifying the entered password by the user")
    const isPassMatched = await argon2.verify(
      userData.user_pass,
      jsObject.userpass,
    );

    //checking the value of verification
    if (!isPassMatched) {
      logError("Mismatch in passowrd")
      throw new UnauthorizedError("Password is incorrect.");
    }
    logFlow("User is verified")

    //generating a session id
    logFlow("Generating a session id")
    const sessId = crypto.randomBytes(8).toString("hex");

    //creating a signed jwt key
    logFlow("Generating the accesstoken and refresh token using jwt")
    const accToken = await accessToken(userData._id);
    const refTokenData = await refreshToken(userData._id, sessId);

    //saving a refreshtoken database
    logDB("Creating the database for this session....")
    await sessionReftokenVar.create({
      session_id: sessId,
      user_id: userData.id,
      refresh_token: refTokenData.rHashedToken,
    });
    logDB("Database is created.")

    //setting up the access cookie
    logFlow("Setting up the cookie in user browser")
    res.cookie("access_token", accToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 60 * 1000,
      path: "/",
    });

    //setting up the refresh cookie
    res.cookie("refresh_token", refTokenData.rToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 100,
      path: "/refresh",
    });

    //replying back
    res.status(200).json({
      success: true,
      message: {
        name: userData.user_name,
      },
    });
  } catch (error) {
    next(error);
  }
};
