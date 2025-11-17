import { createContext, useState } from "react";

export const PlayerContext = createContext({
  player: { playerName: "", highScore: 0 },
  onCreatePlayer: () => {},
  onReducePlayerLife: () => {},
  onIncreaseCurrentScore: () => {},
});

export default function PlayerContextProvider({ children }) {
  const [player, setPlayer] = useState("");

  function handleCreatePlayer(playerName) {
    const newPlayer = {
      playerName,
      playerLife: 5,
      currentScore: 0,
      highScore: 300,
    };
    setPlayer(newPlayer);
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

  const ctxValue = {
    player,
    onCreatePlayer: handleCreatePlayer,
    onReducePlayerLife: handleReducePlayerLife,
    onIncreaseCurrentScore: handleIncreaseCurrentScore,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>{children}</PlayerContext.Provider>
  );
}
