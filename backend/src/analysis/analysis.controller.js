import { anaylsisServices } from "./analysis.services.js";
import { extractionOfTweetData } from "../extraction/extraction.tweet.js";
import { validationServices } from "../validation/validation.services.js";

export async function analysisControllerLogic(req, res) {
  console.log(req.body);

  try {
    //performing all the validation logic
    console.log(req.body.url)
    const textClaim = await validationServices(req.body.url);

    // analysing the models by using multiple models
    await anaylsisServices(textClaim);
    res.json({
      success : true,
      message: "You have reached controller",
    });
  } catch (error) {
    console.log(error.message);
    console.log(error.statusCode)
    res.json({
      success: false,
      message: error.message,
      errCode : error.statusCode
    });
  }
}
