import { useContext, useState } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

import QuestionTimer from "./QuestionTimer";
import GameOver from "./GameOver";

export default function Quiz({ onChangePage }) {
  const [playerLife, setPlayerLife] = useState(5);

  // Import states & functions from contexts
  const { quizItems, answerState, onSaveAnswerState } = useContext(QuizContext);
  const { player, onIncreaseCurrentScore } = useContext(PlayerContext);

  // Current Question Index
  let activeQuestionIndex = answerState.length;

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

  // if orrect Answer
  function handleCorrectAnswer() {
    onSaveAnswerState("correct");
    onIncreaseCurrentScore();
  }

  // if Wrong Answer
  function handleWrongAnswer() {
    onSaveAnswerState("wrong");
    setPlayerLife(prevState => (prevState -= 1));
  }

  function handleChangePage() {
    onChangePage("categories");
  }

  if (playerLife === 0) {
    return <GameOver onChangePage={onChangePage} />;
  }

  if (playerLife >= 1 && activeQuestionIndex === 10) {
    return (
      <>
        <h1>Quiz Complete</h1>
        <button onClick={handleChangePage}>Continue Play</button>
      </>
    );
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
        <QuestionTimer key={activeQuestionIndex} />
        <p>
          <button onClick={() => handleCheckAnswers("true")}>True</button>
          <button onClick={() => handleCheckAnswers("false")}>False</button>
        </p>
      </div>
    </>
  );
}
