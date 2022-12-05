export default function CreatePlayer({ name, setName, setID }) {
  async function sendToAPI() {
    console.log(name);

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/players`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    const data = await response.json();
    setID(data.id);
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} className="base">
      <span>please enter your name</span>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={sendToAPI}>submit</button>
    </form>
  );
}
