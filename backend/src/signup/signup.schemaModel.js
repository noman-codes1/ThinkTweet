import mongoose from "mongoose";
import { Schema } from "mongoose";

const mySchema = new Schema({
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_pass: {
    type: String,
    required: true,
    unique: true,
  },
  totalAnalysis : {
    type: Number,
    required: true,
    default: 0
  },
  credits: {
    type: Number,
    required: true,
    default: 95
  },
  stripe_cus_id :{
    type: String,
    unique: true,
    default: null
  },
  // lastPurchaseHistory : {
  //   type: Object,
  //   required: true,
  //   default: undefined
  // },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

//making a model to use work on the database
export const registeredUserVar = mongoose.model("registered_user", mySchema);
