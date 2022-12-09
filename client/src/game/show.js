import { useEffect, useState } from "react";

const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);
export default function ShowGame({ board, setBoard, gameID, id }) {
  const [column, setColumn] = useState("");
  const [side, setSide] = useState("");

  useEffect(() => {
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      setBoard(JSON.parse(event.data));
    });
    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({ gameId: gameID, playerId: id, type: "register" })
      );
    });
  }, [setBoard, gameID, id]);

  const handleMove = async () => {
    socket.send(JSON.stringify({ gameId: gameID, playerId: id, side, column }));
  };

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
      {
        <button disabled={!(column && side)} onClick={handleMove}>
          submit
        </button>
      }
    </div>
  );
}
