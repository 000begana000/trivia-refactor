import { createContext, useState } from "react";

export const PlayerContext = createContext({
  player: { playerName: "", highScore: 0 },
  onCreatePlayer: () => {},
});

export default function PlayerContextProvider({ children }) {
  const [player, setPlayer] = useState("");

  function handleCreatePlayer(playerName) {
    const newPlayer = { playerName, highScore: 0 };
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
