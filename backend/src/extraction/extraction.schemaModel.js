import mongoose from "mongoose";
import { Schema } from "mongoose";

const testSchema = new Schema({
    tweetId: {
        type: Number,
        unique : true,
        required: true
    },
    tweetText : {
        type : String,
        required : true
    },
    tweetCreatedAt: {
        type: Date,
        required: true
    },
    isFeminism: {
        type: Boolean,
        default : false,
        required : true
    }
})

export const tweetDataVar = mongoose.model("tweet_data", testSchema)