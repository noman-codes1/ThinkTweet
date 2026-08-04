import { ValidationError } from "../errors/errors.custom.js";
import { BadRequestError, ForbiddenError } from "../errors/errors.custom.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";
import { logFlow, logValid, logError, logDB } from "../debug/debug.logs.js";

//function to do all the validation work before reaching llm
export const validationForAnalysis = async (req, res, next) => {
  try {
    logFlow("Running validation files in the analysis router...")

    //extracting a body from the request
    logFlow("Extracting the data recieved")
    const recievedObject = req.body;

    //checking length of url
    if (Object.keys(recievedObject).length != 1) {
      logError("Unexpected number of keys recieved.")
      throw new BadRequestError("Wrong object recieved.");
    }
    logValid("1st validation passed")

    //checking the type of object
    if (!(typeof recievedObject.url === "string")) {
      logError("Unexpected data type of values recieved")
      throw new BadRequestError("Recieved unexpected object");
    }
    logValid("2nd validation passed")

    //checking whether url format is correct or not
    const url = recievedObject.url.trim();
    if (!url.startsWith("https://x.com/")) {
      logError("Unsupported type of url is detected.")
      throw new ValidationError("Unsupported URL");
    }
    logValid("3rd validation passed")

    //extracting the id from the tweet url using regrex (study about this more)
    logFlow("Extracting the tweet id from the url")
    const id = url.match(/status\/(\d+)/)?.[1];

    //rejecting the request if the tweet is not found
    if (id === undefined) {
      logError("Id not found")
      throw new ValidationError("URL seems to be modified.");
    }
    logValid("4th validation passed")

    //attaching the id to the body
    logFlow("Attaching the id to the req.body")
    req.body = {
      tweetId : id
    }

    //extracting a userId
    logFlow("Extracting the user id which recived during jwt verification")
    const userId = req.user.userId

    //pulling out the data from the database
    logDB("Fetching user data...")
    const userObject = await registeredUserVar.findOne({_id: userId}, {_id:0, credits: 1})
    logDB("Data Fetched")

    //checking whether user has required credits to pull the result or not
    if(!(userObject.credits > 18)){
      logError("Insufficient credit. Please top up")
      throw new ForbiddenError("Insufficient credits. Please top now")
    }
    logValid("5th validation passed")

    //sending the program to the next router
    next()

  } catch (error) {
    next(error);
  }
};
