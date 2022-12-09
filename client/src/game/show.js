import { useState } from "react";

export default function ShowGame({ board, setBoard, gameID, id }) {
  const [column, setColumn] = useState("");
  const [side, setSide] = useState("");

  const handleMove = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/moves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: gameID, playerId: id, side, column }),
    });
    const data = await response.json();
    setBoard(data.board);
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
