// hooks
import { useContext } from "react";

// imported context
import { QuizContext } from "../store/quiz-context";
import { PlayerContext } from "../store/player-context";

// image
import fire from "../assets/Fire.svg";

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
      <div className={styles.newRecord}>
        <img src={fire} />
        <div className={styles.finalScore}>
          <p>final score: {player.currentScore}</p>
          <p>high score: {player.highScore}</p>
          <img src={fire} />
        </div>
      </div>
    );
    // else player made new record
  } else {
    onLocalStorageUpdate(player.currentScore);
    scoreResult = (
      <>
        <h3 className="fontBig">You made a new record!</h3>
        <h4>new high score : {player.currentScore}</h4>
        <p>previous high score: {player.highScore}</p>
      </>
    );
  }

  return (
    <>
      <h1 className="mainPrompt">Game Over, {player.playerName}!</h1>
      {scoreResult}
      <button onClick={handleChangePage}>Start New Game</button>
    </>
  );
}
