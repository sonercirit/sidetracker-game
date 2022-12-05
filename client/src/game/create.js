import { useState } from "react";

export default function CreateGame({ id }) {
  const [gameID, setGameID] = useState("");

  const handleCreate = async () => {
    const game = await fetch(`${process.env.REACT_APP_SERVER_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId: id }),
    });

    const data = await game.json();
    console.log(data);
    setGameID(data.id);
  };

  return (
    <div>
      {gameID ? (
        <div>
          <span>your game id is {gameID}</span>
        </div>
      ) : (
        <div>
          <button onClick={handleCreate}>create new game</button>
        </div>
      )}
    </div>
  );
}
