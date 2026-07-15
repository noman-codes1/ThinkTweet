import path from "path";
import { pendingRegistrationVar } from "./signup.pendingModelSchema.js";
import argon2 from "argon2";
import { ValidationError } from "../errors/errors.custom.js";
import { BadRequestError } from "../errors/errors.custom.js";
import { registeredUserVar } from "./signup.schemaModel.js";
import { logFlow, logDB, logError } from "../debug/debug.logs.js";

//getting directory url
const __dirname = import.meta.dirname;

export async function verifyController(req, res, next) {
  try {
    logFlow("Running verifyController files...");

    //getting the data from req.body
    const publicId = req.body.userPublicId;
    const token = req.body.userToken;

    //seraching the database
    logFlow("Searching the database to find user");
    const exists = await pendingRegistrationVar.exists({
      public_id: publicId,
    });

    if (exists) {
      logFlow("User found in database");
      logFlow("Getting the details");
      const jsObject = await pendingRegistrationVar.findOne({
        public_id: publicId,
      });

      //validating the token
      logFlow("Verifying the user using token...");
      const isMatched = await argon2.verify(jsObject.token, token);
      if (isMatched) {
        //registring the user
        logFlow("User verified");
        logFlow("Creating a account...");
        await registeredUserVar.create({
          is_verified: true,
          user_name: jsObject.name,
          user_email: jsObject.email,
          user_pass: jsObject.password,
        });
        logFlow("Account created. Database updated.");

        //deleting the temp records
        logFlow("Cleaning the temporary data");
        await pendingRegistrationVar.deleteOne({ public_id: publicId });

        //replying back to the user
        logFlow("Serving the file...");
        res.sendFile(path.join(__dirname, "..", "public", "verified.html"));
      } else {
        //serving the unauthorized files
        logError("User not verfied. Serving realted files....");
        res.sendFile(path.join(__dirname, "..", "public", "unauthorized.html"));
      }
    } else {
      //serving the error files
      logError("User not found in database");
      res.sendFile(path.join(__dirname, "..", "public", "error.html"));
    }
  } catch (error) {
    next(error);
  }
}
