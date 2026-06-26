import { anaylsisServices } from "./analysis.services.js";
import { extractionOfTweetData } from "../extraction/extraction.tweet.js";
import { validationForAnalysis } from "../validation/validation.analysis.js";
import { analyzedTweetVar } from "./analysis.schemaModel.js";

export async function analysisControllerLogic(req, res) {
  console.log("Inside analysis controllerLogic() func");
  console.log("Body : ", req.body);

  try {

    //WORK LEFT IN THIS PART
    // 1. Connect the catch block with global error
    // 2. Improve the security
    // 3. Protect this sensitive route
    // 4. Check all the validation to find any lapse
    // 5. Make the parameter more readable in the func

    
    //performing all the validation logic
    console.log(`Extracted url from the Body: ${req.body.url}`);
    const jsObject = await validationForAnalysis(req.body.url);
    console.log("Returned value from validationServicesFunc is \n", jsObject);

    console.log("Validation, quering database, fetch x api (if any) completed");

    //rejecting the request if the tweet age is less than 7 day
    //logic here

    //quering the database to check whether data exists or not
    console.log("Looking in the database for the analyzedData..");
    const doesExists = await analyzedTweetVar.exists({
      tweetId: jsObject.textId,
    });
    console.log(`Does database contains analyzedData? ${!!doesExists}`);

    let data;
    if (doesExists) {
      console.log("Inside If Block");
      data = await analyzedTweetVar.findOne({ tweetId: jsObject.textId });
    } else {
      console.log("Inside Else Block");
      console.log("LLM will run now");
      // analysing the models by using multiple models
      data = await anaylsisServices(jsObject.textClaim, jsObject.textId);
    }

    console.log("The data to be sent:\n", data);
    console.log("Sent the final output to the frontend");
    //returning the value to the frontend
    res.json({
      success: true,
      statusCode: 200,
      message: data,
    });
  } catch (error) {
    console.log("Program is terminated. Some error occured");
    console.log(error.message);
    console.log(error.statusCode|| "");
    res.json({
      success: false,
      message: error.message,
      errCode: error.statusCode,
    });
  }
}
