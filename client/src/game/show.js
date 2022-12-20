import { useEffect, useMemo, useState } from "react";

const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);
export default function ShowGame({ board, setBoard, gameID, id, playerOrder }) {
  const [column, setColumn] = useState("");
  const [side, setSide] = useState("");

  socket.send(
    JSON.stringify({ gameId: gameID, playerId: id, type: "register" })
  );

  useEffect(() => {
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      setBoard(JSON.parse(event.data));
    });
  }, [setBoard, gameID, id]);

  const handleMove = async () => {
    socket.send(JSON.stringify({ gameId: gameID, playerId: id, side, column }));
  };

  const turn = useMemo(() => {
    const xMoves = board.flat().filter((move) => move === "X");
    const oMoves = board.flat().filter((move) => move === "O");
    return xMoves.length <= oMoves.length ? 1 : 2;
  }, [board]);
  console.log(turn);

  const checkWinner = (column) => {
    if (column.join("").includes("XXXX")) {
      return 1;
    } else if (column.join("").includes("OOOO")) {
      return 2;
    }
  };

  const whoWon = useMemo(() => {
    const vertical = [[], [], [], [], [], [], []];
    const diagonal = [[], [], [], [], [], [], []];
    const diagonalReverse = [[], [], [], [], [], [], []];
    for (const column of board) {
      for (const [index, piece] of column.entries()) {
        vertical[index].push(piece);
      }
      const winner = checkWinner(column);
      if (winner) {
        return winner;
      }
    }

    const createArray = (number) =>
      Array(number)
        .fill(0)
        .map((_, i) => i);

    // calculate vertical
    for (const column of vertical) {
      const winner = checkWinner(column);
      if (winner) {
        return winner;
      }
    }

    /*
     * For the diagonal array, the code is using the following formula to calculate the index: first + second.
     * This will add the pieces in a diagonal line that starts at the top left corner of the game board and ends at the bottom right corner.
     *
     * For the diagonalReverse array, the code is using the following formula to calculate the index: 6 - first - second.
     * This will add the pieces in a diagonal line that starts at the top right corner of the game board and ends at the bottom left corner.
     * */
    for (const first of createArray(7)) {
      for (const second of createArray(7 - first)) {
        diagonal[first].push(board[first + second][second]);
        diagonalReverse[first].push(board[6 - first - second][second]);
      }
    }

    console.log(diagonal);
    for (const column of diagonal) {
      const winner = checkWinner(column);
      if (winner) {
        return winner;
      }
    }

    return null;
  }, [board]);

  return (
    <div>
      {board.map((firstDepth) => (
        <div>
          {firstDepth.map((secondDepth) => (
            <span>{secondDepth} </span>
          ))}
        </div>
      ))}

      <div>
        {[...Array(7).keys()].map((value) => (
          <button value={column} onClick={() => setColumn(value + 1)}>
            {value + 1}
          </button>
        ))}
      </div>
      <div>
        {["L", "R"].map((value) => (
          <button value={side} onClick={() => setSide(value)}>
            {value}
          </button>
        ))}
      </div>
      {whoWon ? (
        <div>{`Player ${whoWon} won!`}</div>
      ) : (
        <button
          disabled={!(column && side) || !(turn === playerOrder)}
          onClick={handleMove}
        >
          submit
        </button>
      )}
    </div>
  );
}
