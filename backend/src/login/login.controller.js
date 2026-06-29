import { validationLogin } from "../validation/validation.login.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { UnauthorizedError } from "../errors/errors.custom.js";
import { accessToken } from "../jwt/jwt.generateTokens.js";
import { refreshToken } from "../jwt/jwt.generateTokens.js";
import argon2 from "argon2";
import { sessionReftokenVar } from "../jwt/jwt.sessionSchema.js";
import crypto from "crypto"

export const loginController = async (req, res, next) => {
  console.log("Inside loginController() func");
  console.log("The body contains: \n", req.body);
  try {
    //validating the input and security check
    const passedObject = await validationLogin(req.body);
    console.log("The returned object by validation func is : \n", passedObject);

    //fetching the info and verify the password
    console.log("Fetching Data for the user...");
    const userData = await registeredUserVar.findOne(
      { user_email: passedObject.useremail },
      { user_name: 1, user_pass: 1 },
    );
    console.log("User profile data: \n", userData);

    //verifying the password
    console.log("Verification for passwords begins...");
    const isPassMatched = await argon2.verify(
      userData.user_pass,
      passedObject.userpass,
    );

    //checking the value of verification
    if (!isPassMatched) {
      console.log("User is not verified.");
      throw new UnauthorizedError("Password is incorrect");
    }
    console.log("User is verified.");

    //generating a session id
    console.log("Generating the ssesion id");
    const sessId = crypto.randomBytes(8).toString("hex");
    console.log(`Session Id: ${sessId}`)

    //creating a signed jwt key
    console.log("Generating the access and refresh token token");
    const accToken = await accessToken(userData._id);
    console.log(`AccessToken is ${accToken}`);
    const refTokenData = await refreshToken(userData._id, sessId);
    console.log("Refresh Token Data is: \n", refTokenData);

    //saving a refreshtoken database
    console.log("Creating the database...");
    await sessionReftokenVar.create({
      session_id: sessId,
      user_id: userData.id,
      refresh_token: refTokenData.rHashedToken,
    });
    console.log("Database created.");
    console.log("Setting up the cookie");

    //setting up the access cookie
    res.cookie("access_token", accToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // maxAge: 10 * 60 * 1000,
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
