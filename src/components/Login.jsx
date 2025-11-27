import { useRef, useContext, useState } from "react";

import { PlayerContext } from "../store/player-context";

import styles from "./Login.module.css";

export default function Login({ onChangePage }) {
  const [invalid, setInvalid] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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

  function handleSelectPlayer(playerName) {
    setSelectedPlayer(playerName);
    onSelectPlayer(playerName);
  }

  function handleStartNewGame() {
    onChangePage("categories");
  }

  return (
    <div>
      <form action="" onSubmit={handleSavePlayer}>
        <h3 className="mainPrompt">Please enter your player name</h3>
        <div>
          <input
            className={styles.formInput}
            name="playerName"
            type="text"
            required
            minLength={5}
            ref={playerName}
            disabled={player}
          />
          <button
            type="submit"
            className={styles.buttonLoginSave}
            disabled={player}
          >
            save
          </button>
        </div>

        {invalid && <p>player already exists. please choose another name.</p>}
      </form>
      <p className={styles.paragraphLogin}>OR</p>
      <h3 className="mainPrompt">Select A Player</h3>
      <div className={styles.players}>
        {players.length === 0 && <p>there is no player yet</p>}
        {players.map(player => (
          <button
            key={player.playerName}
            className={`${styles.buttonPlayerName} ${
              selectedPlayer === player.playerName ? styles.selected : ""
            }`}
            onClick={() => {
              handleSelectPlayer(player.playerName);
            }}
          >
            {player.playerName}
          </button>
        ))}
      </div>
      <div>
        {player && (
          <button className="buttonStartNewGame" onClick={handleStartNewGame}>
            Start new game as "{player.playerName}"
          </button>
        )}
      </div>
    </div>
  );
}
