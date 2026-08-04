import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";
import { logFlow, logDB, logError } from "../debug/debug.logs.js";

//creating instance from the class
const domainCheckAi = new Groq({ apiKey: env.groq });

//function to generate results from Groq Compound Model
export async function checkDomainOfTweet(tweetClaim) {
  try {
    logFlow("Running domainChecker files...")

    //establishing a connection with a groq
    logFlow("Talking to the groq server...")
    const response = await domainCheckAi.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "Find whether this topic is related to Feminism or not",
        },
        {
          role: "user",
          content: tweetClaim,
        },
      ],

      //getting a response in json object
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "domain-check",
          schema: {
            type: "object",
            properties: {
              isFeminism: {
                type: "string",
                enum: ["yes", "no"],
              },
            },
            required: ["isFeminism"],
          },
        },
      },
    });

    //checking what is being returned
    logFlow("Recieved a response from the server...")
    const jsObject = JSON.parse(response.choices[0]?.message?.content);

    //returing the object
    return jsObject.isFeminism;
  } catch (error) {
    logError("Some error occured: ", error)
    return "unknown";
  }
}
