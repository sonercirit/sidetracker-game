import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("side-stacker game server");
});

app.listen(port, () => {
  console.log(`SSGM app listening on port ${port}`);
});
