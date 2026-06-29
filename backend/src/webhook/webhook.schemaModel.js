import mongoose from "mongoose";
import { Schema } from "mongoose";

const mySchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  sess_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  credits_bought: {
    type: Number,
    required: true,
  },
  payment_amount: {
    type: Number,
    required: true,
  },
  plan_bought: {
    type: String,
    required: true,
    enum: ["premium", "pro", "pro-max"]
  },
  has_updated: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

//exporting the model and working with database
export const paymentRecordsVar = mongoose.model("payment_records", mySchema);
