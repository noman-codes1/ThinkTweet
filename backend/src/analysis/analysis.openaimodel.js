import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";
const groqAi = new Groq({ apiKey: env.groq });
import mySchema from "./analysis.schema.js";
import rulesForAi from "./analysis.rules.js";

//function to get response from OpenAI model
export async function OpenApiCall (claimForOpenAi) {
    try {
        const response = await groqAi.chat.completions.create({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content: rulesForAi,
            },
            {
              role: "user",
              content: claimForOpenAi,
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
    } catch (error) {
        console.log(error)
        return ""
    }
}