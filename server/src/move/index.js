import express from "express";
import db from "../db.js";
import handleError from "../../error.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const game = await db.game.findUnique({
      where: {
        id: req.body.gameId,
      },
    });

    const piece = req.body.playerId === game.player1Id ? "X" : "O";

    await db.move.create({
      data: {
        gameId: req.body.gameId,
        playerId: req.body.playerId,
        side: req.body.side,
        column: req.body.column,
      },
    });

    const { board } = game;

    // get the column
    const column = board[req.body.column - 1];
    // get the first empty space, get from right if side is R
    const row =
      req.body.side === "R" ? column.lastIndexOf("_") : column.indexOf("_");
    // set the space to the player's id
    board[req.body.column - 1][row] = piece;

    const updatedGame = await db.game.update({
      where: {
        id: req.body.gameId,
      },
      data: {
        board,
      },
    });

    return res.json(updatedGame);
  } catch (e) {
    return handleError(e, res);
  }
});

export default router;
