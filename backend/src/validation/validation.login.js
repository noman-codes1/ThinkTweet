import { BadRequestError } from "../errors/errors.custom.js";
import validator from "validator"; //returns a js object
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { ValidationError } from "../errors/errors.custom.js";
import { logFlow, logError, logValid } from "../debug/debug.logs.js";

export const validationLogin = async (req, res, next) => {
  try {
    logFlow("Running validationLogin files")
    
    //taking out the req.body to validate it
    const objectRecieved = req.body

    //checking the length of the object
    if (Object.keys(objectRecieved).length != 2) {
      logError("Unexpected object recievced")
      throw new BadRequestError("Unexpected length of keys in the object.");
    }
    logValid("1st validation passed")

    //rejecting the request if it's not expected keys
    if (
      !(
        typeof objectRecieved.userEmail === "string" &&
        typeof objectRecieved.userPass === "string"
      )
    ) {
      logError("Mismatch datatype of values in the object recieved")
      throw new BadRequestError("Object keys are modified.");
    }
    logValid("2nd validation passed")

    //validating the url
    const email = objectRecieved.userEmail.trim();
    if (!validator.isEmail(email)) {
      logError("Invalida email recieved")
      throw new BadRequestError("Not a valid email.");
    }
    logValid("3rd validation passed")

    //validating the password
    const pass = objectRecieved.userPass;
    if (!(pass.length >= 14 && pass.length <= 40)) {
      logError("Unexpected length of pass recieved")
      throw new ValidationError("Invalid password.");
    }
    logValid("4th validation passed")

    //checking whether user exist or not in the database
    if (!(await registeredUserVar.findOne({ user_email: email }))) {
      logError("User not registered")
      throw new ValidationError("Please sign up for an account first.");
    }
    logValid("5th validation passed")

    //upating the value of req.body
    req.body = {
      userEmail : email,
      userPass : pass
    }
    logFlow("Updated the req.body. Sending to the next middleware")

    //sending the express to the next middleware
    next()

  } catch (error) {
    next(error)
  }
};
