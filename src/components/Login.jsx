import { useRef } from "react";

export default function Login({ onChangePage }) {
  const playerName = useRef();

  return (
    <div>
      <h1>Welcome to trivia quiz</h1>
      <form action="">
        <p>Please enter your player name</p>
        <div className="input">
          <input type="text" name="" id="" ref={playerName} />
          <button>save</button>
        </div>
      </form>
    </div>
  );
}
