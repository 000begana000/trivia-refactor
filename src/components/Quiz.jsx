import { useContext } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

export default function Quiz() {
  const { quizItems, answerState, onSaveAnswerState } = useContext(QuizContext);
  const { player, onIncreaseCurrentScore } = useContext(PlayerContext);

  const activeQuestionIndex = answerState.length;
  // compare answer state if it's correct or wrong
  function handleCheckAnswers(answer) {
    const correctAnswer =
      quizItems[activeQuestionIndex].correct_answer.toLowerCase();
    const playerAnswer = answer.toLowerCase();

    if (correctAnswer === playerAnswer) {
      handleCorrectAnswer();
    } else {
      onSaveAnswerState("wrong");
    }
  }
  // display next question

  function handleCorrectAnswer() {
    onSaveAnswerState("correct");
    onIncreaseCurrentScore();
  }

  return (
    <>
      <div>
        <p>player name:{player.playerName}</p>
        <p>current score: {player.currentScore}</p>
        <p>highs score: {player.highScore}</p>
      </div>
      <div>
        {quizItems && <p>{quizItems[activeQuestionIndex].question}</p>}
        <p>
          <button onClick={() => handleCheckAnswers("true")}>True</button>
          <button onClick={() => handleCheckAnswers("false")}>False</button>
        </p>
      </div>
    </>
  );
}
