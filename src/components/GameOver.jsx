import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";
import { PlayerContext } from "../store/player-context";

export default function GameOver({ onChangePage }) {
  const { onResetPlayedCategory } = useContext(QuizContext);
  const { player, onResetPlayer, onLocalStorageUpdate } =
    useContext(PlayerContext);

  function handleChangePage() {
    onResetPlayer();
    onResetPlayedCategory(); // before reset we need to update LHs
    onChangePage("categories");
  }

  let scoreResult;

  if (player.currentScore <= player.highScore) {
    onLocalStorageUpdate(player.highScore);
    scoreResult = (
      <>
        <p>final score: {player.currentScore}</p>
        <p>high score: {player.highScore}</p>
      </>
    );
  } else {
    onLocalStorageUpdate(player.currentScore);
    scoreResult = (
      <>
        <h3>You made a new record!</h3>
        <h4>new high score : {player.currentScore}</h4>
        <p>previous high score: {player.highScore}</p>
      </>
    );
  }

  return (
    <>
      <h1>Game Over!</h1>
      <p>{player.playerName}</p>
      {scoreResult}
      <button onClick={handleChangePage}>Start New Game</button>
    </>
  );
}
