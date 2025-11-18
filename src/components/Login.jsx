import { useRef, useContext, useState } from "react";

import { PlayerContext } from "../store/player-context";

export default function Login({ onChangePage }) {
  const [invalid, setInvalid] = useState(false);

  const { player, players, onCreatePlayer, onSelectPlayer } =
    useContext(PlayerContext);

  const playerName = useRef();

  function handleSavePlayer(event) {
    event.preventDefault();

    const valid = players.every(
      player => player.playerName !== playerName.current.value
    );

    if (valid) {
      onCreatePlayer(playerName.current.value);
    } else {
      setInvalid(true);
      return;
    }

    onChangePage("categories");
  }

  return (
    <div>
      <h1>Welcome to trivia quiz</h1>
      <form action="" onSubmit={handleSavePlayer}>
        <h3>Please enter your player name</h3>
        <div className="input">
          <input
            type="text"
            name=""
            id=""
            required
            minLength={5}
            ref={playerName}
            disabled={player}
          />
          <button type="submit" disabled={player}>
            save
          </button>
        </div>
        {invalid && <p>player already exists. please choose another name.</p>}
      </form>
      <h3>Or Select A Player</h3>
      {players.length === 0 && <p>there is no player yet</p>}
      {players.map(player => (
        <button
          key={player.playerName}
          onClick={() => {
            onSelectPlayer(player.playerName);
          }}
        >
          {player.playerName}
        </button>
      ))}
      {player && <p>you've selected "{player.playerName}"</p>}
    </div>
  );
}
