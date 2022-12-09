import express from "express";
import db from "../db.js";
import handleError from "../../error.js";

const router = express.Router();

// get games
router.get("/", async (req, res) => {
  try {
    const games = await db.game.findMany({
      where: {
        player2Id: null,
      },
      include: {
        players: true,
      },
    });
    return res.json(games);
  } catch (e) {
    return handleError(e, res);
  }
});

// create game
router.post("/", async (req, res) => {
  try {
    const game = await db.game.create({
      data: {
        player1Id: req.body.playerId,
        players: {
          connect: [{ id: req.body.playerId }],
        },
      },
    });
    return res.json(game);
  } catch (e) {
    return handleError(e, res);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const game = await db.game.update({
      where: {
        id: req.params.id,
      },
      data: {
        player2Id: req.body.playerId,
        players: {
          connect: {
            id: req.body.playerId,
          },
        },
      },
    });
    return res.json(game);
  } catch (e) {
    return handleError(e, res);
  }
});

export default router;
