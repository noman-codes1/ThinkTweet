import { pendingRegistrationVar } from "./signup.pendingModelSchema.js";
import argon2 from "argon2";
import crypto from "crypto";
import { sendVerificationLink } from "./signup.sendMail.js";
import { logDB, logFlow } from "../debug/debug.logs.js";

export async function signupController(req, res, next) {
  try {
    logFlow("Running signupController files");
    const signupData = req.body;

    //hashing the password
    logFlow("Hashing the password");
    const hashedPass = await argon2.hash(signupData.userpass);

    //generating a token
    logFlow("Generating a token to verify the user");
    const rawToken = crypto.randomBytes(32).toString("hex");

    //hashing a token for security purpose
    logFlow("Hashing the generated token for safety purpose");
    const hashedToken = await argon2.hash(rawToken);

    //creating a public id for the user
    logFlow("Generating the public id for the user");
    const publicId = crypto.randomBytes(12).toString("hex");

    // saving the data in temporary database
    logDB("Saving the temporarty data in database");
    await pendingRegistrationVar.create({
      public_id: publicId,
      name: signupData.username,
      email: signupData.useremail,
      password: hashedPass,
      token: hashedToken,
    });
    logDB("Database updated");

    //sending a verificationlink to verify user
    logFlow("Creating a url for verification");
    const url = `https://unconstructed-marisha-nonantagonistic.ngrok-free.dev/signAuth/verify?pubToken=${rawToken}&pubId=${publicId}`;

    //function for sending the mail
    await sendVerificationLink(url, signupData.useremail);
    logFlow("Sent the verification link");

    //sending the reply back
    logFlow("Closing the connection.");
    res.status(200).json({
      success: true,
      message: "Please check your to mail and verify yourself",
    });
  } catch (error) {
    next(error);
  }
}
