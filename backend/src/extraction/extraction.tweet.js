import { TwitterApi } from "twitter-api-v2";
import { env } from "../config/env.config.js";
import { tweetDataVar } from "./extraction.schemaModel.js";
import { checkDomainOfTweet } from "../validation/validation.domainChecker.js";

//creating a instance (basically js object of class) from the class
const tweet = new TwitterApi(env.xapi);

//function to extract tweet data from x api
export async function extractionOfTweetData(params) {
  const response = await tweet.v2.singleTweet(params, {
    "tweet.fields": ["created_at"],
  });

  const dataObject = response.data; //returns a js object
  console.log(dataObject);

  //saving in database
  await tweetDataVar.create({
    tweetId : dataObject.id,
    tweetText : dataObject.text,
    tweetCreatedAt : dataObject.created_at
  })

  //checking the domain of the tweet
  const isDomainCorrect = await checkDomainOfTweet(dataObject.text)

  //saving the information in the datbase
  await tweetDataVar.updateOne(
    {tweetId : dataObject.id}, 
    {$set : {isFeminism : isDomainCorrect}}
  )
  
  return { 
    text: dataObject.text, 
    isFem: isDomainCorrect }
}
