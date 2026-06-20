import { ValidationError } from "../errors/errors.customErr.js";
import { tweetDataVar } from "../extraction/extraction.schemaModel.js";
import { extractionOfTweetData } from "../extraction/extraction.tweet.js";

//function to do all the validation work before reaching llm
export const validationServices = async (params) => {
  //checking whether url format is correct or not
  console.log(params)
  if (!params.startsWith("https://x.com/")) {
    throw new ValidationError("Unsupported URL");
  }

  //extracting the id from the tweet url
  const id = params.match(/status\/(\d+)/)?.[1]
  console.log(id)

  //rejecting the request if the tweet is not found
  if (id === undefined) {
    throw new ValidationError("URL seems to be modified.")
  }

  //quering the database to know this tweet id exists or not
  const doesThisIdExists = await tweetDataVar.exists({tweetId : id})
  console.log(doesThisIdExists)
  //this will return the js object - so we can truthy and falsy

  let claims
  if(doesThisIdExists) {
    console.log("I am in the if block")
    const fetchJSObject = await tweetDataVar.findOne({tweetId: id}, {_id:0, tweetText:1, isFeminism:1})

    //rejecting the request if the tweet is not related to feminism
    if(fetchJSObject.isFeminism === false){
      throw new ValidationError("Domain not supported")
    }
    claims = fetchJSObject.tweetText
  } else {
    const returnedObject = await extractionOfTweetData(id);

    //rejecting the request if the tweet is not related to feminism
    if (returnedObject.isFem === false) {
      throw new ValidationError("Domain not supported");
    }
    claims = returnedObject.text;
  }

  return claims
};
