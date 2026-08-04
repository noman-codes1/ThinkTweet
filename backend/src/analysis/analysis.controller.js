import { anaylsisServices } from "./analysis.services.js";
import { extractionOfTweetData } from "../extraction/extraction.tweet.js";
import { analyzedTweetVar } from "./analysis.schemaModel.js";
import { logFlow, logError, logValid, logDB } from "../debug/debug.logs.js";
import { tweetExtractionAndRealtedWork } from "./analysis.tweetExtraction.js";
import { registeredUserVar } from "../signup/signup.schemaModel.js";

export async function analysisControllerLogic(req, res, next) {
  try {
    logFlow("Running controller files in analysis router...");

    //extracting the tweet id from the request object
    logFlow("Extracting a tweet id");
    const tweetId = req.body.tweetId;

    //extracting the tweet data
    logFlow("Extracting a tweet data via database/twitter api");
    const jsObject = await tweetExtractionAndRealtedWork(tweetId);
    logFlow("Extracted the data... moving further");

    //rejecting the request if the tweet age is less than 7 day
    //logic here

    //quering the database to check whether analysed data exists or not
    logDB("Searching database whether analyzed data exists or not");
    const doesExists = await analyzedTweetVar.exists({
      tweetId: jsObject.textId,
    });

    //checking whether it exist or not
    let data;
    if (doesExists) {
      logDB("Data exists");

      //attaching the object to send it to frontend
      data = await analyzedTweetVar.findOne({ tweetId: jsObject.textId });
    } else {
      logDB("Data not found");

      // analysing the models by using multiple models
      logFlow("Running LLM to generate a response...");
      data = await anaylsisServices(jsObject.textClaim, jsObject.textId);
    }

    //extracting a user id from
    logFlow("Extracting the user id from the response object")
    const userId = req.user.userId

    //fetching the user data from databse
    logDB("Pulling out data from database...")
    const userData = await registeredUserVar.findOne(
      { _id: userId },
      { _id: 0, credits: 1, totalAnalysis: 1 },
    );
    logDB("Data pulled")

    //deducting the credits and related work
    logFlow("Deducting the credits and calcualting the number of analysis")
    const credAfterDeduction = userData.credits - 18;
    const numOfTotalAnalysis = userData.totalAnalysis + 1;

    //updating the database
    logDB("Updating the database...")
    await registeredUserVar.updateOne(
      { _id: userId },
      {
        $set: {
          credits: credAfterDeduction,
          totalAnalysis: numOfTotalAnalysis,
        },
      },
    );
    logDB("Database updated")

    //returning the value to the frontend
    logFlow("Work completed. Closing the connection.");
    res.status(200).json({
      success: true,
      message: data,
    });
  } catch (error) {
    next(error);
  }
}
