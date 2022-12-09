export default function ShowGame({ board }) {
  return (
    <div>
      {board.map((firstDepth) => (
        <div>
          {firstDepth.map((secondDepth) => (
            <span>{secondDepth} </span>
          ))}
        </div>
      ))}
    </div>
  );
}
