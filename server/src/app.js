import express from "express";
import * as dotenv from "dotenv";
import player from "./player/index.js";
import game from "./game/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("side-stacker game server");
});

app.use("/players", player);
app.use("/games", game);

app.listen(port, () => {
  console.log(`SSGM app listening on port ${port}`);
});
