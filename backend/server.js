import express from "express";
import router from "./src/routes/movies.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("YO YO YO wassup!");
});

app.use("/movies", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
