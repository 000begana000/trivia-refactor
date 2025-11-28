// hooks
import { useContext } from "react";

// imported context
import { QuizContext } from "../store/quiz-context";
import { PlayerContext } from "../store/player-context";

export default function GameOver({ onChangePage }) {
  // imported states & functions from contexts
  const { onResetPlayedCategory } = useContext(QuizContext);
  const { player, onResetPlayer, onLocalStorageUpdate } =
    useContext(PlayerContext);

  // change page to categories
  function handleChangePage() {
    onResetPlayer(); // reset player's state
    onResetPlayedCategory(); // reset played categories array to []
    onChangePage("categories");
  }

  let scoreResult; // empty array to display result of score

  // if player didn't make new record
  if (player.currentScore <= player.highScore) {
    onLocalStorageUpdate(player.highScore);
    scoreResult = (
      <>
        <p>final score: {player.currentScore}</p>
        <p>high score: {player.highScore}</p>
      </>
    );
    // else player made new record
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
