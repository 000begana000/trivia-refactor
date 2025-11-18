import { useRef, useContext } from "react";

import { PlayerContext } from "../store/player-context";

export default function Login({ onChangePage }) {
  const { onCreatePlayer } = useContext(PlayerContext);

  const playerName = useRef();

  function handleValidatePlayerName(event) {
    event.preventDefault();

    onCreatePlayer(playerName.current.value);
    onChangePage("categories");
  }

  return (
    <div>
      <h1>Welcome to trivia quiz</h1>
      <form action="" onSubmit={handleValidatePlayerName}>
        <h3>Please enter your player name</h3>
        <div className="input">
          <input
            type="text"
            name=""
            id=""
            required
            minLength={5}
            ref={playerName}
          />
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
}
