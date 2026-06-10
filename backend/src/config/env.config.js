import dotenv from "dotenv";
dotenv.config()

export const env = {
    groq : process.env.GROQ_API_KEY,
    gemini : process.env.GEMINI_API_KEY
}