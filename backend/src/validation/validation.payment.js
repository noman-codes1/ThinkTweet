import { BadRequestError } from "../errors/errors.custom.js";
import { ValidationError } from "../errors/errors.custom.js";

//fn to validate before running the business logic
export const validationPayment = (requestObject) => {
  //checking the length of the keys
  if (Object.keys(requestObject).length != 1) {
    throw new BadRequestError("Body is manipulated.");
  }

  //checking the type
  if (!(typeof requestObject.plan === "string")) {
    throw new BadRequestError("Keys of the body are manipulated");
  }

  //checking teh values of keys
  const plan = requestObject.plan.trim()
  if (
    !(
      plan === "premium" ||
      plan === "pro" ||
      plan === "pro-max"
    )
  ) {
    throw new ValidationError("Plan Unknown")
  }

  //returing the function
  return plan
};
