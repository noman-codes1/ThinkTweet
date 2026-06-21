import mongoose from "mongoose";
import { Schema } from "mongoose";

//writing a schema to enforce
const analyzeSchema = new Schema({
  tweetId: {
    type: String,
    require: true,
    unique: true
  },
  claims: {
    type: String,
    required: true,
  },
  scores: {
    evidence_strength: {
      type: Number,
      required: true,
    },
    logical_consistency: {
      type: Number,
      required: true,
    },
    generalization_risk: {
      type: Number,
      required: true,
    },
    confirmation_bias: {
      type: Number,
      required: true,
    },
    nuance_and_context: {
      type: Number,
      required: true,
    },
  },
  strength: {
    type: [String],
    required: true,
  },
  weakness: {
    type: [String],
    required: true,
  },
  nuances: {
    type: [String],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

//converting in to the model so that it can be used
export const analyzedTweetVar = mongoose.model("analyzed_tweet", analyzeSchema)
