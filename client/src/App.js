import "./App.css";
import CreatePlayer from "./player/create";
import { useState } from "react";

function App() {
  const [id, setID] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="base">
      <CreatePlayer name={name} setName={setName} id={id} setID={setID} />
    </div>
  );
}

export default App;
