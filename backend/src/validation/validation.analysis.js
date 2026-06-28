import { ValidationError } from "../errors/errors.custom.js";
import { tweetDataVar } from "../extraction/extraction.schemaModel.js";
import { extractionOfTweetData } from "../extraction/extraction.tweet.js";
import { checkDomainOfTweet } from "./validation.domainChecker.js";
import { AIServiceError } from "../errors/errors.custom.js";
import { InteralServerError } from "../errors/errors.custom.js";
import { BadRequestError } from "../errors/errors.custom.js";

//function to do all the validation work before reaching llm
export const validationForAnalysis = async (recievedObject) => {
  console.log("Inside validationForAnalysis() func");
  console.log("Args is recieved as: " ,recievedObject);

  //checking length of url
  if (Object.keys(recievedObject).length != 1){
    throw new BadRequestError("Wrong object recieved.")
  }

  //checking the type of object
  if (!(typeof recievedObject.url === "string")){
    throw new BadRequestError("Recieved unexpected object")
  }

  //checking whether url format is correct or not
  const url = recievedObject.url.trim()
  if (!url.startsWith("https://x.com/")) {
    throw new ValidationError("Unsupported URL");
  }

  console.log("Successfully, surpassed the first validation");

  //extracting the id from the tweet url using regrex
  const id = url.match(/status\/(\d+)/)?.[1];

  console.log(typeof id);
  console.log(`Extracted Id from URL : ${id}`);

  //rejecting the request if the tweet is not found
  if (id === undefined) {
    throw new ValidationError("URL seems to be modified.");
  }

  console.log("Successfully, finished validation");
  console.log("Quering the database begins...");

  //quering the database to know this tweet id exists or not
  //this will return the js object - so we can truthy and falsy
  const doesThisIdExists = await tweetDataVar.exists({ tweetId: id });

  console.log(`Tweet Id exists? ${!!doesThisIdExists}`);

  let claims;

  //conditioning the logic acc to the result queried from database
  if (doesThisIdExists) {
    console.log("Inside main if block");

    const fetchJSObject = await tweetDataVar.findOne(
      { tweetId: id },
      { _id: 0, tweetText: 1, isFeminism: 1 },
    );

    console.log("Successfully, fetched data of that particular tweet");

    //checking the value to work accordingly
    if (fetchJSObject.isFeminism === "no") {
      console.log(
        "Oh no!, sadly we don't support this domain. Program Terminates.",
      );

      throw new ValidationError("Domain not supported");
    } else if (fetchJSObject.isFeminism === "unknown") {
      console.log("Found 'unknown' domain, running the llm to find it...");

      const value = await checkDomainOfTweet(fetchJSObject.tweetText);

      console.log(`LLM reply : ${value}`);

      //updating the database
      await tweetDataVar.updateOne(
        { tweetId: id },
        { $set: { isFeminism: value } },
      );

      if (value === "unknown") {
        console.log("Seems like some AI error occured");

        throw new AIServiceError(
          "Unable to figure out domain. Might be AI error",
        );
      } else if (value === "no") {
        console.log(
          "Oh no! We don't provide service for this domain. Program Terminates",
        );
        throw new ValidationError("Domain not supported");
      }
    }
    claims = fetchJSObject.tweetText;
  } else {
    console.log("Inside main else block");
    console.log("About to fetch xapi to get tweet data...");

    const returnedObject = await extractionOfTweetData(id);

    //rejecting the request if the tweet is not related to feminism
    if (returnedObject.isFem === "no") {
      throw new ValidationError("Domain not supported");
    }

    console.log("Validation for isFem=no passed");
    claims = returnedObject.text;
  }

  console.log("Returning the function value");
  return {
    textId: id, //this is a tweet id
    textClaim: claims,
  };
};
