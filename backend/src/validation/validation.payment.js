import { BadRequestError } from "../errors/errors.custom.js";
import { ValidationError } from "../errors/errors.custom.js";
import { logFlow, logError, logValid } from "../debug/debug.logs.js";

//fn to validate before running the business logic
export const validationPayment = (req, res, next) => {
  try {

    //#tip: Use 400 only for technical related issues
    // and 422 for if doesn't comply to your buisness logic.
    // So update gradually

    logFlow("Running validationPayment files..")

    //extracting the body from the request
    logFlow("Extracting the req.body")
    const bodyObject = req.body;

    //checking the length of the keys
    if (Object.keys(bodyObject).length != 1) {
      logError("Length of body object is manipulated")
      throw new BadRequestError("Body is manipulated.");
    }
    logValid("1st validation passed")

    //checking the type
    if (!(typeof bodyObject.plan === "string")) {
      logError("Data type of values of the object is manipulated.")
      throw new BadRequestError("Keys of the body are manipulated");
    }
    logValid("2nd validation passed")

    //checking the values of keys
    const plan = bodyObject.plan.trim();
    if (!(plan === "premium" || plan === "pro" || plan === "pro-max")) {
      logError("Invalid Plan")
      throw new ValidationError("Plan Unknown");
    }
    logValid("3rd validation passed")

    // updating the req.body with validated object
    logFlow("Updating the req.body")
    req.body = {
      plan: plan
    }

    //passing the request to the next middleware
    next()
  } catch (error) {
    next(error)
  }
};
