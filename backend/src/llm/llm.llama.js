import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";
import mySchema from "./llm.schema.js";
import rulesForAi from "../guidelines/guidelines.systemRules.js";
import { papersCitation } from "../guidelines/guidelines.citation.js";
import { logFlow, logError } from "../debug/debug.logs.js";

//creating a instance from the Groq class
const groqAi = new Groq({ apiKey: env.groq });

//function to get response from OpenAI model
//claims : piece of text to analyze
export async function llamaApiCall(claims) {
  try {
    logFlow("Running llama files..")

    //contacting the groq server
    logFlow("Establishing a connection to llm server")
    const response = await groqAi.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content: rulesForAi,
        },
        {
          role: "user",
          content: `Paper Citations : ${papersCitation}. Claim to analyze : ${claims}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "tweet-analysis",
          schema: mySchema,
        },
      },
    });
    logFlow("Response recieved. Extracting the data...")

    //returning the function wtih extracting the data
    return JSON.parse(response.choices[0]?.message?.content);
  } catch (error) {
    logError("Some error occured: ", error)

    //returning empty error so that other model takes it place without obstructing the entire flow
    return "";
  }
}