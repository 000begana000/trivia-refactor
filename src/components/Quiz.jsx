// hooks
import { useContext, useState, useCallback } from "react";

// imported contexts
import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

// imported function
import { decodeHTML } from "../store/htmlDecoder";

// categories
import { CATEGORIES } from "../store/categories";

// imported components
import QuestionTimer from "./QuestionTimer";
import ContinueQuiz from "./ContinueQuiz";
import GameOver from "./GameOver";

// css module
import styles from "./Quiz.module.css";

// images
import heart from "../assets/Heart.svg";

export default function Quiz({ onChangePage }) {
  // states
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("unanswered");

  // import states & functions from contexts
  const { quizItems, playedCategories } = useContext(QuizContext);
  const { player, onReducePlayerLife, onIncreaseCurrentScore } =
    useContext(PlayerContext);

  // current question index
  let activeQuestionIndex =
    answerState === "unanswered"
      ? selectedAnswers.length
      : selectedAnswers.length - 1;

  // initial timer value
  let timer = 10000;

  // current category name
  const currentCategory = CATEGORIES.find(
    category => category.id === playedCategories[0]
  );

  // if player choose an answer, timer value = 1sec
  if (answerState === "answered") {
    timer = 1000;
  }

  // show player answer result for 2sec (timer value = 2sec)
  if (answerState === "correct" || answerState === "wrong") {
    timer = 2000;
  }

  // select an answer
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(newAnswer) {
      setAnswerState("answered"); // change timer value

      setSelectedAnswers(prevAnswers => [...prevAnswers, newAnswer]); // save answer

      const correctedAnswerLowcase =
        quizItems[activeQuestionIndex].correct_answer.toLowerCase(); // correct answer to lower case

      setTimeout(() => {
        // if the answer is correct
        if (newAnswer === correctedAnswerLowcase) {
          setAnswerState("correct"); // to highlight buttons to green & change timer value
          onIncreaseCurrentScore(); // increase current score
        } else {
          setAnswerState("wrong"); // to highlight buttons to red & change timer value
          onReducePlayerLife(); // reduce life -1
        }
        setTimeout(() => {
          setAnswerState("unanswered"); // reset answer state to "unanswered"
        }, 2000);
      }, 1000);
    },
    [quizItems, activeQuestionIndex]
  );

  // skip answer
  const handleSkipAnswer = useCallback(
    function handleSkipAnswer() {
      handleSelectAnswer("skipped"); // save answer as "skipped"
    },
    [handleSelectAnswer]
  );

  // reset answers array to []
  function handleResetAnswers() {
    setSelectedAnswers([]);
  }

  // Game over
  if (player.playerLife === 0) {
    return <GameOver onChangePage={onChangePage} currentScore={currentScore} />;
  }

  // Quiz Complete
  if (player.playerLife >= 1 && activeQuestionIndex === 10) {
    return (
      <ContinueQuiz
        onChangePage={onChangePage}
        selectedAnswers={selectedAnswers}
        onResetAnswers={handleResetAnswers}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardsPlayerState}>
        <div className="flex">
          <span className={`${styles.cardPlayerState} ${styles.gap}`}>
            <p className={styles.cardPlayerTitle}>player name</p>
            <p className={styles.cardPlayerContext}>{player.playerName}</p>
          </span>
          <span className={styles.cardPlayerState}>
            <p className={styles.cardPlayerTitle}>cateogry</p>
            <p className={styles.cardPlayerContext}>{currentCategory.name}</p>
          </span>
        </div>
        <div className="flex">
          <span className={`${styles.cardPlayerState} ${styles.gap}`}>
            <p className={styles.cardPlayerTitle}>current score</p>
            <p className={styles.cardPlayerContext}>{player.currentScore}</p>
          </span>
          <span className={styles.cardPlayerState}>
            <p className={styles.cardPlayerTitle}>high score</p>
            <p className={styles.cardPlayerContext}>{player.highScore}</p>
          </span>
        </div>
      </div>
      <div className={styles.lives}>
        {[...Array(player.playerLife)].map((_, i) => (
          <img key={i} src={heart} alt="life" className={styles.life} />
        ))}
      </div>

      <div>
        {quizItems && (
          <p>{decodeHTML(quizItems[activeQuestionIndex].question)}</p>
        )}
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
    </div>
  );
}
