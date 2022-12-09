import express from "express";
import * as dotenv from "dotenv";
import { WebSocketServer } from "ws";
import player from "./player/index.js";
import game from "./game/index.js";
import handleMove from "./move/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const wss = new WebSocketServer({ port: parseInt(port, 10) + 1 });

const mapped = {};
wss.on("connection", function connection(ws) {
  ws.on("message", async function message(data) {
    const parsed = JSON.parse(data);

    // register the current user to the mapping
    if (!mapped[parsed.gameId]) {
      mapped[parsed.gameId] = {};
    }
    mapped[parsed.gameId][parsed.playerId] = ws;

    // finish early if type is register
    if (parsed.type === "register") {
      return;
    }

    const response = await handleMove(parsed);
    Object.values(mapped[parsed.gameId]).forEach((socket) => {
      socket.send(JSON.stringify(response));
    });
  });
});

app.use(express.json());

app.use("/players", player);
app.use("/games", game);

app.listen(port, () => {
  console.log(`STGM app listening on port ${port}`);
});
