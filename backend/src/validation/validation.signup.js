import { ValidationError } from "../errors/errors.custom.js";
import crypto from "crypto";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import validator from "validator"; //returns a js object
import { BadRequestError } from "../errors/errors.custom.js";
import { pendingRegistrationVar } from "../signup/signup.pendingModelSchema.js";

export const validationForSignup = async (dataObject) => {
  console.log("Inside validateForSignup() func");

  //WRITE THE DEFINED ERROR AND GENERATE ERROR CODE

  //checking does req.body contains exact three keys
  if (Object.keys(dataObject).length != 3) {
    throw new BadRequestError("Not allowed.");
  }

  //checking validation for name
  const name = dataObject.username.trim();
  if (
    !(
      validator.isAlphanumeric(name) &&
      validator.isLength(name, { min: 2, max: 12 })
    )
  ) {
    throw new ValidationError("Validation for Name failed.");
  }
  console.log("First Validation Passed.");

  //check the type of data being passed...
  

  //checking validation for email
  const email = dataObject.useremail.trim().toLowerCase();
  console.log(`This is email : ${email}`);
  if (!validator.isEmail(email)) {
    throw new ValidationError("Validation for Email failed.");
  }

  //checking the 'registered user' database whether this email exists or not
  if (await registeredUserVar.exists({ user_email: email })) {
    throw new ValidationError("This email is already registered.");
  }
  console.log("Second Validation Passed.");

  //checking the database for pending registration to avoid multiple time registration..
  if(await pendingRegistrationVar.exist({email: email})){
    throw new ValidationError("Please confirm you account by visit a mail...")
  }
  console.log("Third Validation Passed")

  //password validation check
  const password = dataObject.userpass;
  console.log(`The length of password entered by user is ${password.length}`);
  if (!(password.length >= 14 && password.length <= 40)) {
    throw new ValidationError("Password should be of 14-40 characters");
  }
  console.log("Fourth Validation Passed.");
  console.log("Checking whether the password was leaked before or not...");

  //checking the password is blacklist or not
  const hashedPassword = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();

  //diving the string into useful pieces
  const prefix = hashedPassword.slice(0, 5);
  const suffix = hashedPassword.slice(5); //it will go from index to last

  //fetching the pwned endpoint
  const reponse = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await reponse.text();
  console.log("Fetched data successfully.");

  console.log("Finding the leakedData");
  //utilising the data
  const arrayOfData = text.split("\n");

  const findingRelevantData = arrayOfData.find((item) => {
    return item.startsWith(suffix);
  }); //it returns the type of index of the array

  console.log("Counting the leak data...");
  if (!findingRelevantData) {
    console.log("Good to go, passoword is not leaked");
  } else {
    const [, count] = findingRelevantData.split(":");
    throw new ValidationError(`This password is leaked ${count.trim()} times.`);
  }

  console.log("All validation work completed...");

  return {
    username: name,
    useremail: email,
    userpass: password,
  };
};
