import { BadRequestError } from "../errors/errors.custom.js";
import validator from "validator"; //returns a js object
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { ValidationError } from "../errors/errors.custom.js";

export const validationLogin = async (objectRecieved) => {
  console.log("Inside validationLogic() func");

  //checking the length of the object
  if (Object.keys(objectRecieved).length != 2) {
    throw new BadRequestError("Recieved Invalid Data");
  }
  console.log("First Validation Passed.");

  //rejecting the request if it's not expected keys
  if (!(typeof objectRecieved.userEmail === "string" && typeof objectRecieved.userPass === "string")){
    throw new BadRequestError("Object keys are modified")
  }
  console.log("Second Validation Passed")

  //validating the url
  const email = objectRecieved.userEmail.trim();
  if (!validator.isEmail(email)) {
    throw new BadRequestError("Not a valid Email");
  }
  console.log("Third Validation Passed");

  //validating the password
  const pass = objectRecieved.userPass;
  if (!(pass.length >= 14 && pass.length <= 40)) {
    throw new ValidationError("Not a valid Pass");
  }
  console.log("Fourth Validation Passed");

  //checking whether user exist or not in the database
  if (!(await registeredUserVar.findOne({ user_email: email }))) {
    throw new ValidationError("User not registered");
  }
  console.log("Fifth Validation Passed");

  //all validation passed
  console.log("All validation completed. Returning the func...");

  return {
    useremail: email,
    userpass: pass,
  };
};
