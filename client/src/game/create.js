export default function CreateGame({ id, setGameID, setBoard }) {
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
    setBoard(data.board);
  };

  return (
    <div>
      <div>
        <button onClick={handleCreate}>create new game</button>
      </div>
    </div>
  );
}
