import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.config.js";
import mySchema from "./llm.schema.js";
import rulesForAi from "../guidelines/guidelines.systemRules.js";
import { papersCitation } from "../guidelines/guidelines.citation.js";

//creating a instance (a class method) from the class
const geminiAi = new GoogleGenAI({ apiKey: env.gemini });

//modifying the mySchema to make it compatible with GEMINI config
let modifiedSchema = JSON.stringify(mySchema); //converting js object to string to easily replace
modifiedSchema = modifiedSchema.replace(/object/g, "OBJECT");
modifiedSchema = modifiedSchema.replace(/string/g, "STRING");
modifiedSchema = modifiedSchema.replace(/number/g, "NUMBER");
modifiedSchema = modifiedSchema.replace(/array/g, "ARRAY");
modifiedSchema = JSON.parse(modifiedSchema); //converting back to js object to properly use it
// console.log(JSON.stringify(modifiedSchema, null, 2));

//function to get reponse from GemeniAI
//params : piece of text to analyze
export async function geminiApiCall(params) {
  console.log("Inside Gemini API Call")
  try {
    console.log("Inside try block")
    const response = await geminiAi.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Paper Citations : ${papersCitation}. Claim to analyze : ${params}`,
      config: {
        systemInstruction: rulesForAi,
        responseMimeType: "application/json",
        responseSchema: modifiedSchema,
      },
    });

    console.log("LLM responded...")
    console.log("Returning the value")

    return JSON.parse(response.text);
  } catch (error) {

    console.log("Seems some error occured in gemini call...")
    console.log(error);
    console.log(error.message);
    //returning empty error so that other model takes it place without obstructing the entire flow
    return "";
  }
}
