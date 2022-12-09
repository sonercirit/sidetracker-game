import { useEffect, useState } from "react";
import _ from "lodash";

export default function ListGames({ id, setGameId, setBoard }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/games`);
      const data = await response.json();
      setGames(data);
    }
    fetchGames();
  }, []);

  const handleJoin = async (gameId) => {
    const game = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/games/${gameId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerId: id }),
      }
    );

    const data = await game.json();
    setGameId(data.id);
    setBoard(data.board);
  };

  return (
    <div>
      <h2>list of games where player 2 isn't present</h2>
      <ul>
        {games.map((value) => (
          <li>
            <button onClick={() => handleJoin(value.id)}>join</button>{" "}
            {_.get(value, "players[0].name")}'s game
          </li>
        ))}
      </ul>
    </div>
  );
}
