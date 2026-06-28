import mongoose from "mongoose";
import { env } from "./env.config.js";

export const connectDB = async () =>{
    try {
        //setting the auto index of so that i won't face issue when unique true to false
        mongoose.set("autoIndex", false)

        //connecting the database
        await mongoose.connect(env.mongouri)
        console.log("Database is connected")
    } catch (error) {
        console.log("I am in the error part")
        console.log(error)
        process.exit(1)
    }
}
