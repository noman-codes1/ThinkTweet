import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";
import mySchema from "./llm.schema.js";
import rulesForAi from "../guidelines/guidelines.systemRules.js";
import { papersCitation } from "../guidelines/guidelines.citation.js";

//creating a instance from the Groq class
const groqAiForGPT = new Groq({ apiKey: env.groq });

//function to get response from OpenAI model
//params : piece of text to analyze
export async function openAiApiCall(params) {
  console.log("Inside OpenAI API call");

  try {
    console.log("Inside try block");

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

    console.log("LLM responded...");
    console.log("Returning the value");

    return JSON.parse(response.choices[0]?.message?.content);
  } catch (error) {

    console.log("In catch block, caught some error");
    console.log(error);
    
    //returning empty error so that other model takes it place without obstructing the entire flow
    return "";
  }
}
