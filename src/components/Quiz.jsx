import { useContext, useState, useCallback } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

import QuestionTimer from "./QuestionTimer";
import ContinueQuiz from "./ContinueQuiz";
import GameOver from "./GameOver";

export default function Quiz({ onChangePage }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [playerLife, setPlayerLife] = useState(5);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("unanswered");

  // Import states & functions from contexts
  const { quizItems } = useContext(QuizContext);
  const { player } = useContext(PlayerContext);

  // Current Question Index
  let activeQuestionIndex =
    answerState === "unanswered"
      ? selectedAnswers.length
      : selectedAnswers.length - 1;

  // Initial timer
  let timer = 10000;

  // Timer after user
  if (answerState === "answered") {
    timer = 1000;
  }

  if (answerState === "correct" || answerState === "wrong") {
    timer = 2000;
  }

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    newAnswer
  ) {
    setAnswerState("answered");

    setSelectedAnswers(prevAnswers => [...prevAnswers, newAnswer]);

    const selectedAnswerLowcase = newAnswer.toLowerCase();
    const correctedAnswerLowcase =
      quizItems[activeQuestionIndex].correct_answer.toLowerCase();

    setTimeout(() => {
      if (selectedAnswerLowcase === correctedAnswerLowcase) {
        setAnswerState("correct");
        setCurrentScore(prevScore => prevScore + 100);
      } else {
        setAnswerState("wrong");
        setPlayerLife(prevLife => prevLife - 1);
      }
      setTimeout(() => {
        setAnswerState("unanswered");
      }, 2000);
    }, 1000);
  },
  []);

  const handleSkipAnswer = useCallback(
    function handleSkipAnswer() {
      handleSelectAnswer("skipped");
    },
    [handleSelectAnswer]
  );

  // Game over
  if (playerLife === 0) {
    return <GameOver onChangePage={onChangePage} />;
  }

  // Quiz Complete
  if (playerLife >= 1 && activeQuestionIndex === 3) {
    return (
      <ContinueQuiz
        onChangePage={onChangePage}
        selectedAnswers={selectedAnswers}
      />
    );
  }

  return (
    <>
      <div>
        <p>player name:{player.playerName}</p>
        <p>player life: {playerLife}</p>
        <p>current score: {currentScore}</p>
        <p>highs score: {player.highScore}</p>
      </div>
      <div>
        {quizItems && <p>{quizItems[activeQuestionIndex].question}</p>}
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeout={handleSkipAnswer}
        />
        <p>
          <button
            className={
              answerState === "correct" || answerState === "wrong"
                ? answerState
                : undefined
            }
            disabled={answerState !== "unanswered"}
            onClick={() => handleSelectAnswer("true")}
          >
            True
          </button>
          <button
            className={
              answerState === "correct" || answerState === "wrong"
                ? answerState
                : undefined
            }
            disabled={answerState !== "unanswered"}
            onClick={() => handleSelectAnswer("false")}
          >
            False
          </button>
        </p>
      </div>
    </>
  );
}
