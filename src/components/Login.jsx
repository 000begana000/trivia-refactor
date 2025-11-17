import { useRef, useContext, useState } from "react";

import { PlayerContext } from "../store/player-context";

export default function Login({ onChangePage }) {
  const [selectedPlayerName, setSeletedPlayerName] = useState("");

  const { players, onCreatePlayer, onSelectPlayer } = useContext(PlayerContext);

  const playerName = useRef();

  function handleSavePlayerName(event) {
    event.preventDefault();
    onCreatePlayer(playerName.current.value);
    setSeletedPlayerName(playerName.current.value);
    console.log(playerName.current.value);
  }

  function handleSelectPlayer(selectedPlayerName) {
    // select a player
    onSelectPlayer(selectedPlayerName);
    setSeletedPlayerName(selectedPlayerName);
  }

  function handleStartGame() {
    onChangePage("categories");
  }

  return (
    <div>
      <h1>Welcome to trivia quiz</h1>
      <form action="" onSubmit={handleSavePlayerName}>
        <p>Please enter your player name</p>
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
      <div>
        <h4>Select a player</h4>
        {players.map(player => (
          <button
            key={player.playerName}
            onClick={() => handleSelectPlayer(player.playerName)}
          >
            {player.playerName}
          </button>
        ))}
      </div>
      {selectedPlayerName && <p>Hello, {selectedPlayerName}!</p>}
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}
