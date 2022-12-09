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

  const whoWon = useMemo(() => {
    for (const column of board) {
      if (column.join("").includes("XXXX")) {
        return 1;
      } else if (column.join("").includes("OOOO")) {
        return 2;
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
