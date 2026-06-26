import { pendingRegistrationVar } from "./signup.pendingModelSchema.js";
import argon2 from "argon2";
import crypto from "crypto";
import { sendVerificationLink } from "./signup.sendMail.js";
import { validationForSignup } from "../validation/validation.signup.js";

export async function signupController(req, res, next) {
  console.log("Inside signupController() func")
  try {

    console.log("Insde try block")
    console.log(req.body);

    console.log("Validation of the data begins...")
    //validating the data
    const signupData = await validationForSignup(req.body)

    console.log("Hashing the password.")
    //hashing the password
    const hashedPass = await argon2.hash(signupData.userpass);

    console.log("Generating a token to verify authenticity...")
    //generating a token
    const rawToken = crypto.randomBytes(32).toString("hex");
    console.log(rawToken);

    console.log("Hashing the token...")
    //hashing a token for security purpose
    const hashedToken = await argon2.hash(rawToken);

    console.log("Generating a public id for the user")
    //creating a public id for the user
    const publicId = crypto.randomBytes(12).toString("hex")

    console.log("Saving the data temporarily in the database")
    // saving the data in temporary database
    await pendingRegistrationVar.create({
      public_id: publicId,
      name: signupData.username,
      email: signupData.useremail,
      password: hashedPass,
      token: hashedToken,
    });
    console.log("Temp data successfully saved.")

    console.log("Creating a verification url")
    //sending a verificationlink to verify user
    const url = `https://unconstructed-marisha-nonantagonistic.ngrok-free.dev/signAuth/verify?pubToken=${rawToken}&pubId=${publicId}`;
    console.log("Verification URL is", url)

    //function for sending the mail
    const test = await sendVerificationLink(url, req.body.useremail);
    console.log(`Reply of the mail sent: ${test}`);

    //sending the reply back
    res.json({
      success: true,
      message: "Please check your to mail and verify yourself",
    });
  } catch (error) {
    next(error)
  }
}