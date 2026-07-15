import mongoose from "mongoose";
import { env } from "./env.config.js";
import { logDB } from "../debug/debug.logs.js";

export const connectDB = async () =>{
    try {
        //setting the auto index off so that i won't face issue when switching unique true to false
        mongoose.set("autoIndex", false)

        //connecting the database
        await mongoose.connect(env.mongouri)
        logDB("Database is connected...")
    } catch (error) {

        //logging the error and closing the application
        logDB(`Error Occured : ${error}`)
        process.exit(1)
    }
}
