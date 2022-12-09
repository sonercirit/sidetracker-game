import "./App.css";
import CreatePlayer from "./player/create";
import { useState } from "react";
import ListGames from "./game/list";
import CreateGame from "./game/create";

function App() {
  const [id, setID] = useState("");
  const [name, setName] = useState("");

  const [gameID, setGameID] = useState("");

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
            </div>
          ) : (
            <div>
              <CreateGame id={id} setGameID={setGameID} />
              <ListGames />
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
