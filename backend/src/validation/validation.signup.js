import {
  ValidationError,
  BadRequestError,
  ConflictError,
} from "../errors/errors.custom.js";
import crypto from "crypto";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import validator from "validator"; //returns a js object
import { pendingRegistrationVar } from "../signup/signup.pendingModelSchema.js";
import {
  logDB,
  logFlow,
  logValid,
  logSuccess,
  logError,
} from "../debug/debug.logs.js";

export const validationForSignup = async (req, res, next) => {
  try {
    logFlow("Running validation files");
    const dataObject = req.body;

    //checking does req.body contains exact three keys
    if (Object.keys(dataObject).length != 4) {
      logError("Unexpected length of the object");
      throw new ValidationError("Unexpected length of object recieved.");
    }
    logValid("1st validation passed");
  
    //checking the type along with expected the key in the object
    if (!(
      typeof dataObject.username === "string" ||
      typeof dataObject.useremail === "string" ||
      typeof dataObject.userpass === "string" ||
      typeof dataObject.userconpass === "string"
    )) {
      logError("Mismatch in either 'key' name or datatype");
      throw new ValidationError("Unexpected keys or datatype.");
    }
    logValid("2nd validation passed");

    //checking validation for name
    const name = dataObject.username.trim();
    if (
      !(
        validator.isAlphanumeric(name) &&
        validator.isLength(name, { min: 3, max: 12 })
      )
    ) {
      logError("Unable to validate 'name' field");
      throw new ValidationError("Validation for name failed.");
    }
    logValid("3rd validation passed");

    //checking validation for email
    const email = dataObject.useremail.trim().toLowerCase();
    if (!validator.isEmail(email)) {
      logError("Unable to validate 'email' field");
      throw new ValidationError("Validation for email failed.");
    }
    logValid("4th validation passed");

    //checking the 'registered user' database whether this email exists or not
    if (await registeredUserVar.exists({ user_email: email })) {
      logError("Registered email found");
      throw new ConflictError("Email is already registered.");
    }
    logValid("5th validation passed");

    //checking the database for pending registration to avoid mult registration
    if (await pendingRegistrationVar.exists({ email: email })) {
      logError("Account exists in temporary database");
      throw new ConflictError(
        "Please click the verification link sent to your email to activate your account.",
      );
    }
    logValid("6th validation passed");

    //password validation check
    const password = dataObject.userpass;
    if (!(password.length >= 14 && password.length <= 40)) {
      logError("Unable to validate 'password' field");
      throw new ValidationError("Password must be of 14-40 characters");
    }
    logValid("7th validation passed");

    //matching the confirm password
    const confirmPass = dataObject.userconpass;
    if (password.length !== confirmPass.length) {
      logError("Password mismatch found");
      throw new ValidationError("Password mismatch");
    }
    logValid("8th validation passed");
    logFlow("Checking the breach of the entered password using HIBP api");

    //encryting the password
    const hashedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex")
      .toUpperCase();

    //cutting the string into useful pieces
    const prefix = hashedPassword.slice(0, 5);
    const suffix = hashedPassword.slice(5); //it will go from index 5 to last
    logFlow("Is ready to use api? Yes. Fetching now...");

    //fetching the pwned endpoint
    const reponse = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
    );
    const text = await reponse.text();
    logFlow("Recieved a response from the HIBP server");
    logFlow("Finding whether the password was leaked or not");

    //utilising the data
    const arrayOfData = text.split("\n");
    const findingRelevantData = arrayOfData.find((item) => {
      return item.startsWith(suffix);
    }); //returns the first matching element

    //evaluating the condition
    if (findingRelevantData) {
      const [, count] = findingRelevantData.split(":");
      logError("Password is listed in a breach");
      throw new ValidationError(
        `This password is leaked ${count.trim()} times. Use different password.`,
      );
    }
    logFlow("No breach found. Good to go.");
    logValid("9th validation passed.");

    //updating the req.query
    req.body = {
      username: name,
      useremail: email,
      userpass: password,
    };
    logFlow("req.query is updated");
    next();
  } catch (error) {
    next(error);
  }
};
