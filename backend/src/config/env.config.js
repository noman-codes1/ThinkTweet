import dotenv from "dotenv";
dotenv.config()

export const env = {
    localport : process.env.PORT,
    groq : process.env.GROQ_API_KEY,
    gemini : process.env.GEMINI_API_KEY,
    xapi : process.env.X_BEARER_TOKEN,
    mongouri : process.env.MONGO_URI
}