import { createContext, useState } from "react";

export const PlayerContext = createContext({
  player: { playerName: "", highScore: 0 },
  players: [],
  onCreatePlayer: () => {},
  onSelectPlayer: selectedPlayerName => {},
  onReducePlayerLife: () => {},
  onIncreaseCurrentScore: () => {},
  onResetPlayer: () => {},
});

const localStoragePlayers = JSON.parse(localStorage.getItem("players")) || [];

export default function PlayerContextProvider({ children }) {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState(localStoragePlayers);

  function handleCreatePlayer(playerName) {
    const newPlayer = {
      playerName,
      playerLife: 5,
      currentScore: 0,
      highScore: 0,
    };

    setPlayer(newPlayer);

    localStorage.setItem("players", JSON.stringify([newPlayer, ...players]));
  }

  function handleSelectPlayer(selectedPlayerName) {
    const selectedPlayer = players.find(
      player => player.playerName === selectedPlayerName
    );
    setPlayer(selectedPlayer);
  }

  function handleReducePlayerLife() {
    setPlayer(prevState => ({
      ...prevState,
      playerLife: prevState.playerLife - 1,
    }));
  }

  function handleIncreaseCurrentScore() {
    setPlayer(prevState => ({
      ...prevState,
      currentScore: prevState.currentScore + 100,
    }));
  }

  function handleResetPlayer() {
    setPlayer(prevState => ({ ...prevState, playerLife: 5, currentScore: 0 }));
  }

  const ctxValue = {
    player,
    players,
    onCreatePlayer: handleCreatePlayer,
    onSelectPlayer: handleSelectPlayer,
    onReducePlayerLife: handleReducePlayerLife,
    onIncreaseCurrentScore: handleIncreaseCurrentScore,
    onResetPlayer: handleResetPlayer,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>{children}</PlayerContext.Provider>
  );
}
