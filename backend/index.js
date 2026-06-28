import express from "express";
import cors from "cors";
import analysisRouter from "./src/analysis/analysis.route.js";
import { connectDB } from "./src/config/mongo.config.js";
import { env } from "./src/config/env.config.js"
import signupRouter from "./src/signup/signup.route.js";
import path from 'path'
import { globalError } from "./src/errors/errors.global.js";
import loginRouter from "./src/login/login.route.js";
import { checkOrgin } from "./src/errors/error.checkOrigin.js";
import cookieParser from "cookie-parser";
import refreshRouter from "./src/jwt/jwt.refreshRoute.js";

//return a js object {.....}
const app = express();

//allows frontend to show the data from sent from here
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

//getting the real ip address even if they are spoofing...
app.set("trust proxy", 1)

//without this express cannot read the json coming from other sources
//use is the name of the function
app.use(express.json({limit: "10kb"})); //limit it to 10kb to avoid large payload

//getting the url of the file
const __dirname = import.meta.dirname

//blocking the code to run if not my origin
// app.use(checkOrgin)

//using cookie parser
app.use(cookieParser())

//to server static files
app.use(express.static(path.join(__dirname, "src", "public")))

//to check server is running or not
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

//test
console.log("In a index.js files");
//USE LOGS SERVICES TO LOG INFO...

//sending to the dedicated router
app.use("/tweet", analysisRouter);
app.use("/signAuth", signupRouter);
app.use("/logAuth", loginRouter)
app.use("/refresh", refreshRouter)

//all global errors will come back to here
app.use(globalError)

//connecting to the database
const dbFunc = async () => {
  await connectDB();
  app.listen(env.localport, () => {
    console.log(`Your server is running on http://localhost:3000`);
  });
};
await dbFunc();