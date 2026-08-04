import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";
import mySchema from "./llm.schema.js";
import rulesForAi from "../guidelines/guidelines.systemRules.js";
import { papersCitation } from "../guidelines/guidelines.citation.js";
import { logFlow, logError } from "../debug/debug.logs.js";

//creating a instance from the Groq class
const groqAiForGPT = new Groq({ apiKey: env.groq });

//function to get response from OpenAI model
//params : piece of text to analyze
export async function openAiApiCall(params) {
  try {
    logFlow("Running openAi llm files..")

    //establishing a connnection with a server
    logFlow("Contacting the groq server..")
    const response = await groqAiForGPT.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: rulesForAi,
        },
        {
          role: "user",
          content: `Paper Citations : ${papersCitation}. Claim to analyze : ${params}`,
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
    logFlow("Server has replied. Extracting the useful data from response...")

    //returing the function
    return JSON.parse(response.choices[0]?.message?.content);
  } catch (error) {
    logError("Some error occured: ", error)
    
    //returning empty error so that other model takes it place without obstructing the entire flow
    return "";
  }
}
