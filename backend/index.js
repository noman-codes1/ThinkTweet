import express from "express";
import cors from "cors";
import analysisRouter from "./src/analysis/analysis.route.js";
import mySchema from "./src/analysis/analysis.schema.js";

//return a js object {.....}
const app = express(); 

//allowing my frontend to contact me
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

//without this express cannot read the json coming from frontend
app.use(express.json());

//to check server is not crashed on the web
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

//sending to the router
app.use("/tweet", analysisRouter)

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
