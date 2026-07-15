import { logFlow, logError } from "../debug/debug.logs.js";
import path from "path"
import { ValidationError } from "../errors/errors.custom.js";

//getting the url of this file
const __dirname = import.meta.dirname

export const validationVerifyUser = (req, res, next) => {
  try {
    logFlow("Running validationVeriyUser file... ");

    //taking the request object out
    const dataObject = req.query;
    console.log(dataObject.pubToken)

    //validating the url
    if (Object.keys(dataObject).length != 2) {
      logError("Unexpected length of the keys in the object")
      throw new ValidationError("Unexpected url.");
    }
    logFlow("1st validation passed")

    //checking what kind of query parameter is present & stops nosql injection
    if (
      !(
        typeof dataObject.pubToken === "string" &&
        typeof dataObject.pubId === "string"
      )
    ) {
      logError("Url is tampered")
      throw new ValidationError("Recieved ampered URL.");
    }
    logFlow("2nd validtion passed")

    //santization of data because someone can hit it with other software also
    const token = dataObject.pubToken.trim();
    const publicId = dataObject.pubId.trim();

    //checking the exact length of each query parameter
    if (!(token.length === 64 && publicId.length === 24)) {
      logError("Unexpected length of value of keys recieved")
      throw new ValidationError("Recieved tampered URL");
    }
    logFlow("3rd validation passed")

    //updating from req.query to req.body
    req.body = {
        userToken : token,
        userPublicId : publicId
    }

    //sending the express to the next middleware
    next()
  } catch (error) {
    logError(error)
    res.sendFile(path.join(__dirname, "..", "public", "unauthorized.html"))
  }
};