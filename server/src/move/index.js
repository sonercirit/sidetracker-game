import db from "../db.js";

export default async function handleMove({ gameId, playerId, side, column }) {
  try {
    const game = await db.game.findUnique({
      where: {
        id: gameId,
      },
    });

    const piece = playerId === game.player1Id ? "X" : "O";

    await db.move.create({
      data: {
        gameId,
        playerId,
        side,
        column,
      },
    });

    const { board } = game;

    // get the column
    const columnData = board[column - 1];
    // get the first empty space, get from right if side is R
    const row =
      side === "R" ? columnData.lastIndexOf("_") : columnData.indexOf("_");
    // set the space to the player's id
    board[column - 1][row] = piece;

    const updatedGame = await db.game.update({
      where: {
        id: gameId,
      },
      data: {
        board,
      },
    });

    return updatedGame.board;
  } catch (e) {
    return console.log(e);
  }
}
