import express from "express";
import db from "../db.js";
import handleError from "../../error.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const games = await db.game.findMany();
    return res.json(games);
  } catch (e) {
    return handleError(e, res);
  }
});

export default router;
