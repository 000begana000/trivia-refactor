import { useContext, useState } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

export default function Quiz() {
  const [playerLife, setPlayerLife] = useState(5);

  // Import states & functions from contexts
  const { quizItems, answerState, onSaveAnswerState } = useContext(QuizContext);
  const { player, onIncreaseCurrentScore } = useContext(PlayerContext);

  // Current Question Index
  const activeQuestionIndex = answerState.length;

  // Update Current score, Plyer life, Answer state
  function handleCheckAnswers(answer) {
    const correctAnswer =
      quizItems[activeQuestionIndex].correct_answer.toLowerCase();
    const playerAnswer = answer.toLowerCase();

    if (correctAnswer === playerAnswer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  }

  // Correct Answer
  function handleCorrectAnswer() {
    onSaveAnswerState("correct");
    onIncreaseCurrentScore();
  }

  function handleWrongAnswer() {
    onSaveAnswerState("wrong");
    setPlayerLife(prevState => (prevState -= 1));
  }

  return (
    <>
      <div>
        <p>player name:{player.playerName}</p>
        <p>player life: {playerLife}</p>
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
