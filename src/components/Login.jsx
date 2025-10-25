import { useRef, useContext } from "react";

import { PlayerContext } from "../store/player-context";

export default function Login({ onChangePage }) {
  const { onSavePlayerName } = useContext(PlayerContext);

  const playerName = useRef();

  function handleSavePlayerName(event) {
    event.preventDefault();
    onSavePlayerName(playerName.current.value);
    console.log(playerName.current.value);
  }

  return (
    <div>
      <h1>Welcome to trivia quiz</h1>
      <form action="">
        <p>Please enter your player name</p>
        <div className="input">
          <input type="text" name="" id="" ref={playerName} />
          <button onClick={handleSavePlayerName}>save</button>
        </div>
      </form>
    </div>
  );
}
