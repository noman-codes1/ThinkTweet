import mongoose from "mongoose";
import { Schema } from "mongoose";

const mySchema = new Schema({
  session_id: {
    type:String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    expires: "7d",
  },
});

//write a model to work with database
export const sessionReftokenVar = mongoose.model("session_refToken", mySchema);
