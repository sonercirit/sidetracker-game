import "./App.css";
import CreatePlayer from "./player/create";
import { useState } from "react";
import ListGames from "./game/list";
import CreateGame from "./game/create";
import ShowGame from "./game/show";

function App() {
  const [id, setID] = useState("");
  const [name, setName] = useState("");

  const [gameID, setGameID] = useState("");
  const [board, setBoard] = useState([]);

  return (
    <div className="base">
      {id ? (
        <div>
          <span>your id is {id}</span>
          <br />
          <span>your name is {name}</span>
          {gameID ? (
            <div>
              <span>your game id is {gameID}</span>
              <ShowGame
                board={board}
                setBoard={setBoard}
                gameID={gameID}
                id={id}
              />
            </div>
          ) : (
            <div>
              <CreateGame id={id} setGameID={setGameID} setBoard={setBoard} />
              <ListGames id={id} setGameId={setGameID} setBoard={setBoard} />
            </div>
          )}
        </div>
      ) : (
        <CreatePlayer name={name} setName={setName} setID={setID} />
      )}
    </div>
  );
}

export default App;
