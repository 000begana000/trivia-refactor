import { useContext, useState, useCallback } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

import QuestionTimer from "./QuestionTimer";
import ContinueQuiz from "./ContinueQuiz";
import GameOver from "./GameOver";

export default function Quiz({ onChangePage }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("unanswered");

  // Import states & functions from contexts
  const { quizItems } = useContext(QuizContext);
  const { player, onReducePlayerLife } = useContext(PlayerContext);

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

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(newAnswer) {
      setAnswerState("answered");

      setSelectedAnswers(prevAnswers => [...prevAnswers, newAnswer]);

      const correctedAnswerLowcase =
        quizItems[activeQuestionIndex].correct_answer.toLowerCase();

      setTimeout(() => {
        if (newAnswer === correctedAnswerLowcase) {
          setAnswerState("correct");
          setCurrentScore(prevScore => prevScore + 100);
        } else {
          setAnswerState("wrong");
          onReducePlayerLife();
        }
        setTimeout(() => {
          setAnswerState("unanswered");
        }, 2000);
      }, 1000);
    },
    [quizItems, activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    function handleSkipAnswer() {
      handleSelectAnswer("skipped");
    },
    [handleSelectAnswer]
  );

  function handleResetAnswers() {
    setSelectedAnswers([]);
  }

  // Game over
  if (player.playerLife === 0) {
    return <GameOver onChangePage={onChangePage} currentScore={currentScore} />;
  }

  // Quiz Complete
  if (player.playerLife >= 1 && activeQuestionIndex === 3) {
    return (
      <ContinueQuiz
        currentScore={currentScore}
        onChangePage={onChangePage}
        selectedAnswers={selectedAnswers}
        onResetAnswers={handleResetAnswers}
      />
    );
  }

  return (
    <>
      <div>
        <p>player name:{player.playerName}</p>
        <p>player life: {player.playerLife}</p>
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
              answerState === "correct" ||
              answerState === "wrong" ||
              answerState === "answered"
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
              answerState === "correct" ||
              answerState === "wrong" ||
              answerState === "answered"
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
