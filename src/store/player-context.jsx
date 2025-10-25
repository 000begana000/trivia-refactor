import { createContext, useState } from "react";

export const PlayerContext = createContext({
  player: { playerName, currentScore, highScore },
  onCreatePlayer: () => {},
});

export default function PlayerContextProvider({ children }) {
  const [player, setPlayer] = useState("");

  function handleCreatePlayer(playerName) {
    const newPlayer = { playerName, currentScore: 0, highScore: 0 };
    setPlayer(newPlayer);
  }

  const ctxValue = {
    player,
    onCreatePlayer: handleCreatePlayer,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>{children}</PlayerContext.Provider>
  );
}
