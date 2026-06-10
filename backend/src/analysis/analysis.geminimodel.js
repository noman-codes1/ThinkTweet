import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.config.js";
const geminiAi = new GoogleGenAI({apiKey: env.gemini})
import mySchema from "./analysis.schema.js";
import rulesForAi from "./analysis.rules.js";

//modifying the mySchema to make it compatible with GEMINI config
let modifiedSchema = JSON.stringify(mySchema); //converting js object to string to easily replace
modifiedSchema = modifiedSchema.replace(/object/g, "OBJECT");
modifiedSchema = modifiedSchema.replace(/string/g, "STRING");
modifiedSchema = modifiedSchema.replace(/number/g, "NUMBER");
modifiedSchema = modifiedSchema.replace(/array/g, "ARRAY")
modifiedSchema = JSON.parse(modifiedSchema) //converting back to js object to properly use it
// console.log(JSON.stringify(modifiedSchema, null, 2));

//function to get reponse from GemeniAI
export async function geminiApiCall (claimForGemini){
    try {
        const response = await geminiAi.models.generateContent({
          model: "gemini-3.5-flash",
          contents: claimForGemini,
          config: {
            systemInstruction: rulesForAi,
            responseMimeType: "application/json",
            responseSchema: modifiedSchema,
          },
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.log(error)
        return ""
    }
}