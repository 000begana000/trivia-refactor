import { useContext, useState } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

import QuestionTimer from "./QuestionTimer";
import GameOver from "./GameOver";

export default function Quiz({ onChangePage }) {
  const [playerLife, setPlayerLife] = useState(5);
  const [answerState, setAnswerState] = useState("unanswered");

  // Import states & functions from contexts
  const { quizItems, answers, onSaveAnswer } = useContext(QuizContext);
  const { player, onIncreaseCurrentScore } = useContext(PlayerContext);

  // Current Question Index
  let activeQuestionIndex =
    answerState === "unanswered" ? answers.length : answers.length - 1;

  // Timer
  let timer = 10000;

  if (answerState === "answered") {
    timer = 1000;
  }

  if (answerState !== "unanswered") {
    timer = 2000;
  }

  // Update Current score, Player life, Answer state
  function handleCheckAnswers(answer) {
    const correctAnswer =
      quizItems[activeQuestionIndex].correct_answer.toLowerCase();
    const playerAnswer = answer.toLowerCase();
    setAnswerState("answered");

    // Save answers
    if (correctAnswer === playerAnswer) {
      onSaveAnswer("correct");
    } else {
      onSaveAnswer("wrong");
    }

    setTimeout(() => {
      if (correctAnswer === playerAnswer) {
        handleCorrectAnswer();
      } else {
        handleWrongAnswer();
      }
      setTimeout(() => {
        setAnswerState("unanswered");
      }, 2000);
    }, 1000);
  }

  // if orrect Answer
  function handleCorrectAnswer() {
    setAnswerState("correct");
    onIncreaseCurrentScore();
  }

  // if Wrong Answer
  function handleWrongAnswer() {
    setAnswerState("wrong");
    setPlayerLife(prevState => (prevState -= 1));
  }

  // if Skipped Answer
  function handleSkipAnswer() {
    onSaveAnswer("skipped");
    setPlayerLife(prevState => (prevState -= 1));
  }

  // Change page to categories
  function handleChangePage() {
    onChangePage("categories");
  }

  // Game over
  if (playerLife === 0) {
    return <GameOver onChangePage={onChangePage} />;
  }

  // Quiz Complete
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
        <QuestionTimer
          key={timer}
          onSkipAnswer={handleSkipAnswer}
          timeout={timer}
        />
        <p>
          <button
            disabled={answerState !== "unanswered"}
            onClick={() => handleCheckAnswers("true")}
          >
            True
          </button>
          <button
            disabled={answerState !== "unanswered"}
            onClick={() => handleCheckAnswers("false")}
          >
            False
          </button>
        </p>
      </div>
    </>
  );
}
