import mongoose from "mongoose";
import { Schema } from "mongoose";

const tweetSchema = new Schema({
  tweetId: {
    type: String,
    unique: true,
    required: true,
  },
  tweetText: {
    type: String,
    required: true,
  },
  tweetCreatedAt: {
    type: Date,
    required: true,
  },
  isFeminism: {
    type: String,
    enum: ["yes", "no", "unknown"],
    default: "unknown",
    required: true,
  },
});

export const tweetDataVar = mongoose.model("tweet_data", tweetSchema);
