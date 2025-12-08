// hooks
import { useContext } from "react";

// import context
import { QuizContext } from "../store/quiz-context";
import { PlayerContext } from "../store/player-context";

// css module
import styles from "./ContinueQuiz.module.css";

// categories
import { CATEGORIES } from "../store/categories";

// image
import fire from "../assets/Fire.svg";

export default function ContinueQuiz({
  onChangePage,
  selectedAnswers,
  onResetAnswers,
}) {
  // imported states & functions from contexts
  const { quizItems, playedCategories } = useContext(QuizContext);
  const { player, onLocalStorageUpdate, onContinuePlay } =
    useContext(PlayerContext);

  // current category name
  const currentCategory = CATEGORIES.find(
    category => category.id === playedCategories[0]
  );

  let scoreResult;

  // print different content depends on highscore
  if (player.currentScore <= player.highScore) {
    onLocalStorageUpdate(player.highScore); // save new record to local storage
    scoreResult = (
      <>
        <div className={styles.finalScore}>
          <p className={styles.title}>current score</p>
          <p className={styles.score}>{player.currentScore}</p>
        </div>
        <p className={styles.highScore}>HIGH SCORE: {player.highScore}</p>
        <p lassName={styles.playedCategories}>
          category: {currentCategory.name}
        </p>
      </>
    );
  } else {
    onLocalStorageUpdate(player.currentScore); // save new record to local storage
    scoreResult = (
      <>
        <h3 className="fontBig">You made a new record!</h3>
        <div className={styles.newRecord}>
          <img src={fire} />
          <div className={styles.finalScore}>
            <p className={styles.title}>new high score</p>{" "}
            <p className={styles.score}>{player.currentScore}</p>
          </div>
          <img src={fire} />
        </div>
        <p className={styles.highScore}>
          PREVIOUS HIGH SCORE: {player.highScore}
        </p>
        <p className={styles.playedCategories}>
          category: {currentCategory.name}
        </p>
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
      <h1 className="mainPrompt">Quiz Complete</h1>
      <div>{scoreResult}</div>
      <div className={styles.container}>
        <div className={styles.titles}>
          <p className={styles.title}>Questions</p>
          <p className={styles.title}>Your Answers</p>
        </div>
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
