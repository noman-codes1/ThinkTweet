import { TwitterApi } from "twitter-api-v2";
import { env } from "../config/env.config.js";
import { tweetDataVar } from "./extraction.schemaModel.js";
import { checkDomainOfTweet } from "../validation/validation.domainChecker.js";
import { NotFoundError } from "../errors/errors.custom.js";
import { AIServiceError } from "../errors/errors.custom.js";

//creating a instance (basically js object of class) from the class
const tweet = new TwitterApi(env.xapi);

//function to extract tweet data from x api
export async function extractionOfTweetData(params) {
  console.log("Inside extractionofTweetData() func");
  const response = await tweet.v2.singleTweet(params, {
    "tweet.fields": ["created_at"],
  });

  const dataObject = response.data; //returns a js object
  console.log("Tweeter has responded with \n", dataObject);

  //throwing a error if api returns undefined
  if (dataObject === undefined) {
    throw new NotFoundError("Tweet Not Found");
  }

  console.log("Validaton passed.");
  console.log("Saving the data in database...");

  //saving in database
  await tweetDataVar.create({
    tweetId: params, //params contains the tweet id which was extracted
    tweetText: dataObject.text,
    tweetCreatedAt: dataObject.created_at,
  });

  console.log("Successfully, data is saved.");
  console.log("Running LLM to find the domain of tweet");

  //checking the domain of the tweet
  const isDomainCorrect = await checkDomainOfTweet(dataObject.text);

  console.log(`Domain replied with ${isDomainCorrect}`);

  //throwing a error if llm failed
  if (isDomainCorrect === "unknown") {
    throw new AIServiceError("Unable to figure out domain. Might be AI error");
  }

  console.log("Second Validation for 'unknown' passed");
  console.log("Updating the value in database");

  //saving the information in the datbase
  await tweetDataVar.updateOne(
    { tweetId: params },
    { $set: { isFeminism: isDomainCorrect } },
  );

  console.log("Database Updated. Returning the func value");

  return {
    text: dataObject.text,
    isFem: isDomainCorrect,
  };
}
