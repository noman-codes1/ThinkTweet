import { TwitterApi } from "twitter-api-v2";
import { env } from "../config/env.config.js";
import { tweetDataVar } from "./extraction.schemaModel.js";
import { checkDomainOfTweet } from "../validation/validation.domainChecker.js";
import { NotFoundError } from "../errors/errors.custom.js";
import { AIServiceError } from "../errors/errors.custom.js";
import { logFlow, logError, logValid, logDB } from "../debug/debug.logs.js";

//creating a instance (basically js object of class) from the class
const tweet = new TwitterApi(env.xapi);

//function to extract tweet data from x api
export async function extractionOfTweetData(tweetIdOfX) {
  logFlow("Running extraction.tweet.js file...")

  //establishing a connection with a twitter server
  logFlow("Connecting to a twitter server")
  const response = await tweet.v2.singleTweet(tweetIdOfX, {
    "tweet.fields": ["created_at"],
  });

  //extracting the important data from the response
  logFlow("Extracting the important data from the response")
  const dataObject = response.data; //returns a js object

  //throwing a error if api returns undefined
  if (dataObject === undefined) {
    logError("No useful data recieved")
    throw new NotFoundError("Tweet Not Found");
  }
  logValid("Validated responsed data")

  //saving in database
  logDB("Saving the data in a database")
  await tweetDataVar.create({
    tweetId: tweetIdOfX, //tweetIdOfX contains the tweet id which was extracted
    tweetText: dataObject.text,
    tweetCreatedAt: dataObject.created_at,
  });
  logDB("Database saved")

  //checking the domain of the tweet
  logFlow("Running llm to check the domain of tweet")
  const isDomainCorrect = await checkDomainOfTweet(dataObject.text);

  //throwing a error if llm failed
  if (isDomainCorrect === "unknown") {
    logError("Seems to be llm issue occured")
    throw new AIServiceError("Unable to figure out domain. Might be AI error");
  }
  logValid("Validated the llm response")

  //saving the information in the datbase
  logDB("Updating the database")
  await tweetDataVar.updateOne(
    { tweetId: tweetIdOfX },
    { $set: { isFeminism: isDomainCorrect } },
  );
  logDB("Database updated")

  //returning the function
  return {
    text: dataObject.text,
    isFem: isDomainCorrect,
  };
}
