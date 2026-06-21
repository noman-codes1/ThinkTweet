import { Groq } from "groq-sdk/client.js";
import { env } from "../config/env.config.js";

//creating instance from the class
const domainCheckAi = new Groq({ apiKey: env.groq });

//function to generate results from Groq Compound Model
export async function checkDomainOfTweet(params) {
  console.log("Inside checkDomainOfTweet() func");
  try {
    console.log("Inside try block");
    const response = await domainCheckAi.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "Find whether this topic is related to Feminism or not",
        },
        {
          role: "user",
          content: params,
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

    console.log("LLM replied...");
    //checking what is being returned
    const jsObject = JSON.parse(response.choices[0]?.message?.content);
    console.log("LLM reply is ",jsObject);

    return jsObject.isFeminism;
  } catch (error) {
    console.log("Inside catch block")
    console.log("Some error is caught.....");
    console.log(error);
    return "unknown";
  }
}
