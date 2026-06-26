import mongoose from "mongoose";
import { Schema } from "mongoose";

const mySchema = new Schema({
  public_id:{
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 2,
    maxLength: 12,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    uniqure: true,
  },
  registered_user: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

//converting to the model to work and save to the database
export const pendingRegistrationVar = mongoose.model(
  "pending_registration",
  mySchema,
);
