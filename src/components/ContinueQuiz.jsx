import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

export default function ContinueQuiz({
  onChangePage,
  selectedAnswers,
  onResetAnswers,
  onLocalStorageUpdate,
}) {
  const { quizItems } = useContext(QuizContext);

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

  // Change page to categories
  function handleChangePage() {
    onChangePage("categories");
    onResetAnswers();
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
