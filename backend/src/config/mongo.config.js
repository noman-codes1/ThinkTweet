import mongoose from "mongoose";
import { env } from "./env.config.js";

export const connectDB = async () =>{
    try {
        await mongoose.connect(env.mongouri)
        console.log("Database is connected")
    } catch (error) {
        console.log("I am in the error part")
        console.log(error)
        process.exit(1)
    }
}
