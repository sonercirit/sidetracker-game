import express from "express";
import db from "../db.js";
import handleError from "../../error.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const player = await db.player.create({
      data: { name: req.body.name || "" },
    });
    res.json(player);
  } catch (e) {
    handleError(e, res);
  }
});

export default router;
