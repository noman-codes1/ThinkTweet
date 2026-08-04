import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";
import mySchema from "./llm.schema.js";
import { papersCitation } from "../guidelines/guidelines.citation.js";
import rulesForAi from "../guidelines/guidelines.systemRules.js";
import { logFlow, logError } from "../debug/debug.logs.js";

//creating a instance of the Groq class
const qwenAi = new Groq({ apiKey: env.groq });

export const qwenApiCall = async (claim) => {
  try {
    logFlow("Running qwenApi files..");

    //establishing a connnection with groq server
    logFlow("Talking to a groq server...");
    const response = await qwenAi.chat.completions.create({
      model: "qwen/qwen3-32b",
      messages: [
        {
          role: "system",
          content: rulesForAi,
        },
        {
          role: "user",
          content: `Paper Citations : ${papersCitation}. Claim to analyze: ${claim}`,
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
    logFlow("Recieved response from the server. Extracting the useful data...");

    return JSON.parse(response.choices[0]?.message?.content);
  } catch (error) {
    logError("Some error occured: ", error);
    return "";
  }
};
