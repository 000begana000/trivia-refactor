import { createContext, useState } from "react";

export const PlayerContext = createContext({
  playerName,
});

export default function PlayerContextProvider({ children }) {
  const [playerName, setPlayerName] = useState("");

  function handleSavePlayerName(playerName) {
    setPlayerName(playerName);
  }

  const ctxValue = {
    playerName,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>{children}</PlayerContext.Provider>
  );
}
