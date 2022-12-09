import { useEffect, useState } from "react";

export default function ListGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/games`);
      const data = await response.json();
      setGames(data);
    }
    fetchGames();
  }, []);

  return (
    <div>
      <h2>list of games where player 2 isn't present</h2>
      <ul>
        {games.map((value) => (
          <li>{JSON.stringify(value)}</li>
        ))}
      </ul>
    </div>
  );
}
