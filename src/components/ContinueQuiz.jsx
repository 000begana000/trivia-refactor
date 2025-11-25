// hooks
import { useContext } from "react";

// import context
import { QuizContext } from "../store/quiz-context";
import { PlayerContext } from "../store/player-context";

export default function ContinueQuiz({
  onChangePage,
  selectedAnswers,
  onResetAnswers,
}) {
  // imported states & functions from contexts
  const { quizItems } = useContext(QuizContext);
  const { player, onLocalStorageUpdate, onContinuePlay } =
    useContext(PlayerContext);

  let scoreResult;

  // print different content depends on highscore
  if (player.currentScore <= player.highScore) {
    onLocalStorageUpdate(player.highScore); // save new record to local storage
    scoreResult = (
      <>
        <p>final score: {player.currentScore}</p>
        <p>high score: {player.highScore}</p>
      </>
    );
  } else {
    onLocalStorageUpdate(player.currentScore); // save new record to local storage
    scoreResult = (
      <>
        <h3>You made a new record!</h3>
        <h4>new high score : {player.currentScore}</h4>
        <p>previous high score: {player.highScore}</p>
      </>
    );
  }

  // Change page to categories
  function handleChangePage() {
    onChangePage("categories");
    onResetAnswers(); // reset answers to empty array
    // save scores to continue play
    if (player.currentScore <= player.highScore) {
      onContinuePlay(player.highScore, player.currentScore);
    } else {
      onContinuePlay(player.currentScore, player.currentScore);
    }
  }

  return (
    <>
      <h1>Quiz Complete</h1>
      <div>{scoreResult}</div>
      <div>
        {quizItems.map((item, index) => {
          const question = item.question;
          const selectedAnswer = selectedAnswers[index];
          const correctAnswer = quizItems[index].correct_answer.toLowerCase();

          let cssClass;

          if (selectedAnswer === correctAnswer) {
            cssClass = "correct";
          } else if (selectedAnswer === "skipped") {
            cssClass = "skipped";
          } else {
            cssClass = "wrong";
          }

          return (
            <div className="flex justify-spacebetween" key={question}>
              <p>{question}</p>
              <p className={cssClass}>{selectedAnswer}</p>
            </div>
          );
        })}
      </div>
      <button onClick={handleChangePage}>Continue Play</button>
    </>
  );
}
