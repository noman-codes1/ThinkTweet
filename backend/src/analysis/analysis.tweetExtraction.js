import { tweetDataVar } from "../extraction/extraction.schemaModel.js";
import { extractionOfTweetData } from "../extraction/extraction.tweet.js";
import { checkDomainOfTweet } from "../validation/validation.domainChecker.js";
import {
  AIServiceError,
  ValidationError,
  InteralServerError,
} from "../errors/errors.custom.js";
import { logFlow, logError, logValid, logDB } from "../debug/debug.logs.js";

export const tweetExtractionAndRealtedWork = async (id) => {
  logFlow("Running tweetExtractionFiles....");

  //checking whether the tweet exists in the database or not
  logDB("Does this tweet's data exists ?");
  const doesThisIdExists = await tweetDataVar.exists({ tweetId: id });

  //conditioning the logic acc to the result queried from database
  let claims;
  if (doesThisIdExists) {
    logDB("Yes it exists");

    //fetching data from the database for further check
    logDB("Fetching all the realed data");
    const fetchJSObject = await tweetDataVar.findOne(
      { tweetId: id },
      { _id: 0, tweetText: 1, isFeminism: 1 },
    );
    logDB("Successfully fetched");

    //checking the value to work accordingly
    logFlow("Checking whether the tweet is realted to feminism or not");
    if (fetchJSObject.isFeminism === "no") {
      logError("Not realted to feminism. Throwing a error");
      throw new ValidationError("Domain not supported");
    } else if (fetchJSObject.isFeminism === "unknown") {
      logFlow("Uncertaininty of the domain found");

      //running the ai to find the domain
      logFlow("Running the AI to find the domain");
      const value = await checkDomainOfTweet(fetchJSObject.tweetText);
      logFlow("Recieved some reponse.");

      //updating the database
      logDB("Updating the database");
      await tweetDataVar.updateOne(
        { tweetId: id },
        { $set: { isFeminism: value } },
      );
      logDB("Database updated");

      //checking what value is recieved
      logFlow("Conditionally working based on what response recieved");
      if (value === "unknown") {
        logError("Error occured when checking the domain of tweet.");
        throw new AIServiceError(
          "Unable to figure out domain. Might be LLM error",
        );
      } else if (value === "no") {
        logError("Tweet is not related to feminism");
        throw new ValidationError("Domain not supported");
      }
    }
    claims = fetchJSObject.tweetText;
  } else {
    logDB("No database exist for this");

    //running twitter api to get the data
    logFlow("Running api to get data");
    const returnedObject = await extractionOfTweetData(id);
    logFlow("Recived response from the function...");

    //rejecting the request if the tweet is not related to feminism
    if (returnedObject.isFem === "no") {
      logError("Tweet not related to feminism");
      throw new ValidationError("Domain not supported");
    }
    logValid("Validation for feminism 'passed'");

    //attaching the tweet claim
    claims = returnedObject.text;
  }

  //returning the function
  return {
    textId: id, //this is a tweet id
    textClaim: claims,
  };
};
