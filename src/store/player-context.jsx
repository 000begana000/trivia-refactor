import { createContext, useState } from "react";

export const PlayerContext = createContext({
  player: { playerName: "", currentScore: 0, highScore: 0 },
  onCreatePlayer: () => {},
  onIncreaseCurrentScore: () => {},
});

export default function PlayerContextProvider({ children }) {
  const [player, setPlayer] = useState("");

  function handleCreatePlayer(playerName) {
    const newPlayer = { playerName, currentScore: 0, highScore: 0 };
    setPlayer(newPlayer);
  }

  function handleIncreaseCurrentScore() {
    setPlayer(prevState => ({
      ...prevState,
      currentScore: (prevState.currentScore += 100),
    }));
  }

  const ctxValue = {
    player,
    onCreatePlayer: handleCreatePlayer,
    onIncreaseCurrentScore: handleIncreaseCurrentScore,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>{children}</PlayerContext.Provider>
  );
}
