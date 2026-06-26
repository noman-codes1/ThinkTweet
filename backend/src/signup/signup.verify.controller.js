import path from "path";
import { pendingRegistrationVar } from "./signup.pendingModelSchema.js";
import argon2 from "argon2";
import { ValidationError } from "../errors/errors.custom.js";
import { BadRequestError } from "../errors/errors.custom.js";

//getting directory url
const __dirname = import.meta.dirname;

export async function verifyController(req, res, next) {
  console.log("Inside verifyController() func");
  try {
    //DID TESTING ENOUGH BRUTALLY BUT YOU NEED TO MORE BRUTAL TEST ALSO

    console.log("Inside try block");
    console.log(req.query);

    //validating the url
    if (Object.keys(req.query).length != 2) {
      throw new BadRequestError("You are aren't allowed");
    }
    console.log("First Validation is Passed.");

    //checking what kind of query parameter is present & stops nosql injection
    if (
      !(
        typeof req.query.pubToken === "string" &&
        typeof req.query.pubId === "string"
      )
    ) {
      throw new BadRequestError("Tampered URL");
    }
    console.log("Second Validation is Passed.");

    //santization of data because someone can hit it with other software also
    const token = req.query.pubToken.trim();
    const publicId = req.query.pubId.trim();

    //checking the exact length of each query parameter
    if (!(token.length === 64 && publicId.length === 24)) {
      throw new BadRequestError("Tampered URL");
    }
    console.log("Third Validation Failed");

    console.log("Searching database...");
    //seraching the database
    const exists = await pendingRegistrationVar.exists({
      public_id: publicId,
    });

    if (exists) {
      console.log("User details Found");
      const jsObject = await pendingRegistrationVar.findOne({
        public_id: publicId,
      });
      console.log(jsObject.token);

      console.log("Verifying the user...");
      //validating the token
      const isMatched = await argon2.verify(jsObject.token, token);
      console.log(`isMached: ${isMatched}`);
      if (isMatched) {
        console.log("User verified...");

        //registring the user
        await registeredUserVar.create({
          is_verified: true,
          user_name: jsObject.name,
          user_email: jsObject.email,
          user_pass: jsObject.password,
        });
        console.log("Database Saved");

        console.log("Cleaning temp data in database");
        //deleting the temp records
        await pendingRegistrationVar.deleteOne({ public_id: publicId });

        console.log("Serving files...");
        res.sendFile(path.join(__dirname, "..", "public", "verified.html"));
      } else {
        throw BadRequestError("URL is tampered");
      }
    } else {
      console.log("Url tampered or link is expired");
      res.sendFile(path.join(__dirname, "..", "public", "error.html"));
    }
  } catch (error) {
    next(error);
  }
}
