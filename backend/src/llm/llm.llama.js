import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";
import mySchema from "./llm.schema.js";
import rulesForAi from "../guidelines/guidelines.systemRules.js";
import { papersCitation } from "../guidelines/guidelines.citation.js";

//creating a instance from the Groq class
const groqAi = new Groq({ apiKey: env.groq });

//function to get response from OpenAI model
export async function llamaApiCall(params) {
  const response = await groqAi.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
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

  return JSON.parse(response.choices[0]?.message?.content || "");
}
