import express from "express";
import cors from "cors";
import analysisRouter from "./src/analysis/analysis.route.js";
import { connectDB } from "./src/config/mongo.config.js";
import { env } from "./src/config/env.config.js";

//return a js object {.....}
const app = express(); 

//allows frontend to show the data from sent from here
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

//without this express cannot read the json coming from other sources
app.use(express.json());

//to check server is running or not
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

//sending to the tweet router
app.use("/tweet", analysisRouter)

//connecting to the database
const dbFunc = async () =>{
  await connectDB()
  app.listen(env.localport, ()=>{
    console.log(`Your server is running on http://localhost:3000`)
  })
}
await dbFunc()