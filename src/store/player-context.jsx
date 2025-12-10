// hooks
import { createContext, useState } from "react";

export const PlayerContext = createContext({
  player: { playerName: "", highScore: 0 },
  players: [],
  onCreatePlayer: () => {},
  onSelectPlayer: selectedPlayerName => {},
  onReducePlayerLife: () => {},
  onIncreaseCurrentScore: () => {},
  onLocalStorageUpdate: () => {},
  onContinuePlay: (highScore, currentScore) => {},
  onResetPlayer: () => {},
});

// fetch localStorage
const localStoragePlayers = JSON.parse(localStorage.getItem("players")) || [];

export default function PlayerContextProvider({ children }) {
  // states
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState(localStoragePlayers);

  // create new player
  function handleCreatePlayer(playerName) {
    const newPlayer = {
      playerName,
      playerLife: 5,
      currentScore: 0,
      highScore: 0,
    };

    setPlayer(newPlayer);

    // save to localStorage
    localStorage.setItem("players", JSON.stringify([newPlayer, ...players]));
  }

  // select a current player
  function handleSelectPlayer(selectedPlayerName) {
    const selectedPlayer = players.find(
      player => player.playerName === selectedPlayerName
    );
    setPlayer(selectedPlayer);
  }

  // reduce 1 life when player choose incorrect answer
  function handleReducePlayerLife() {
    setPlayer(prevState => ({
      ...prevState,
      playerLife: prevState.playerLife - 1,
    }));
  }

  // increase current score when player choose correct answer
  function handleIncreaseCurrentScore() {
    setPlayer(prevState => ({
      ...prevState,
      currentScore: prevState.currentScore + 100,
    }));
  }

  // update player's new info to localStorage
  function handleLocalStorageUpdate(highScore) {
    const existingPlayerIndex = players.findIndex(
      existingPlayer => existingPlayer.playerName === player.playerName
    );
    const updatedPlayers = [...players];
    const existingPlayer = players[existingPlayerIndex];

    const updatedPlayer = {
      ...existingPlayer,
      highScore,
      currentScore: 0,
      playerLife: 5,
    };

    updatedPlayers[existingPlayerIndex] = updatedPlayer;
    console.log(updatedPlayers);

    localStorage.setItem("players", JSON.stringify([...updatedPlayers]));
  }

  // update current player's current score and high score to continue play
  function handleContinuePlay(highScore, currentScore) {
    setPlayer(prevState => ({
      ...prevState,
      currentScore,
      highScore,
    }));
  }

  // reset current player's status to start new game
  function handleResetPlayer() {
    setPlayer(prevState => ({
      ...prevState,
      playerLife: 5,
      currentScore: 0,
      highScore: prevState.currentScore,
    }));
  }

  // context values
  const ctxValue = {
    player,
    players,
    onCreatePlayer: handleCreatePlayer,
    onSelectPlayer: handleSelectPlayer,
    onReducePlayerLife: handleReducePlayerLife,
    onIncreaseCurrentScore: handleIncreaseCurrentScore,
    onLocalStorageUpdate: handleLocalStorageUpdate,
    onContinuePlay: handleContinuePlay,
    onResetPlayer: handleResetPlayer,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>{children}</PlayerContext.Provider>
  );
}
