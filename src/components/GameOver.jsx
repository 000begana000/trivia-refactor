import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";
import { PlayerContext } from "../store/player-context";

export default function GameOver({ onChangePage }) {
  const { onResetPlayedCategory } = useContext(QuizContext);
  const { player, onResetPlayer } = useContext(PlayerContext);

  function handleChangePage() {
    onResetPlayer();
    onResetPlayedCategory();
    onChangePage("categories");
  }

  let scoreResult;

  if (player.currentScore <= player.highScore) {
    scoreResult = (
      <>
        <p>final score: {player.currentScore}</p>
        <p>high score: {player.highScore}</p>
      </>
    );
  } else {
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
