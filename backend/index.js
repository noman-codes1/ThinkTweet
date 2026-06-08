import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Groq } from "groq-sdk/client.js";

dotenv.config();

//you should use 'zod' before sending to the frontend

const app = express(); //it's a object {.....}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const groqAi = new Groq({ apiKey: process.env.GROQ_API_KEY });

//allowing my frontend to contact me
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

//wrting the schema, this schema is not compatible with gemini.. need to something...
const schema = {
  type: "object",

  properties: {
    claim: {
      type: "string",
    },
    scores: {
      type: "object",

      properties: {
        evidenceStrength: {
          type: "number",
        },
        logicalConsistency: {
          type: "number",
        },
        generalizationRisk: {
          type: "number",
        },
        confirmationBias: {
          type: "number",
        },
        nuanceAndContext: {
          type: "number",
        },
      },
      required: [
        "evidenceStrength",
        "logicalConsistency",
        "generalizationRisk",
        "confirmationBias",
        "nuanceAndContext",
      ],
    },
    strengths: {
      type: "array",
      items: {
        type: "string",
      },
    },
    weaknesses: {
      type: "array",
      items: {
        type: "string",
      },
    },
    nuances: {
      type: "array",
      items: {
        type: "string",
      },
    },
    summary: {
      type: "string",
    },
  },
  required: [
    "claim",
    "scores",
    "strengths",
    "weaknesses",
    "nuances",
    "summary",
  ],
};
// console.log(JSON.stringify(schema, null, 2));
//2 is basically a identation

//creating a function to connect with the Gemini
const main = async (parameter) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Score it out of 100, and you have to be feminist and practically think. ${parameter}, this is exactly what you need to think`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const data = JSON.parse(response.text);
  return data;
};

//creating function for to call the groq api and get the results
const groqFuncApiCall = async () => {
  const response = await groqAi.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: `Score it out of 100, and you have to be feminist and practically think. 'Abortions hurt women. So does childbirth, unpaid labor, and forced motherhood.', this is exactly what you need to think`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "tweet-analysis",
        schema: schema,
      },
    },
  });

  //printing what open ai would response
  console.log(JSON.parse(response.choices[0]?.message?.content || ""));
};
groqFuncApiCall();

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.post("/tweet", async (req, res) => {
  try {
    // console.log(req)
    console.log(req.body);
    const geminiReply = await main(req.body.dataText);
    console.log(geminiReply);
    res.json({
      message: "Hello from server",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
