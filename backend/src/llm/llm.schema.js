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
          description : "Return a score based on evidence you could find to satisfy the claim."
        },
        logicalConsistency: {
          type: "number",
          description : "Return a score based on how inherently consistent the claim is"
        },
        generalizationRisk: {
          type: "number",
          description : "Return a score based on how much risk of generalization is present"
        },
        confirmationBias: {
          type: "number",
          description : "Return a score based on how much biasness it might hold"
        },
        nuanceAndContext: {
          type: "number",
          description : "Return a score based on how much claim contains the naunce and context"
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
      minItems : 1,
      maxItems : 3
    },
    weaknesses: {
      type: "array",
      items: {
        type: "string",
      },
      minItems : 1,
      maxItems : 3
    },
    nuances: {
      type: "array",
      items: {
        type: "string",
      },
      minItems : 1,
      maxItems : 3
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
