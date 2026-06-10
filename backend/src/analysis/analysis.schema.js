//you should use 'zod' before sending to the frontend

//wrting the schema, this schema is not compatible with gemini.. need to something...
const mySchema = {
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

export default mySchema
