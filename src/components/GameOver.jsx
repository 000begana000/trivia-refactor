import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

export default function GameOver({ onChangePage }) {
  const { onResetPlayedCategory } = useContext(QuizContext);

  function handleChangePage() {
    onResetPlayedCategory();
    onChangePage("categories");
  }

  return (
    <>
      <h1>Game Over</h1>
      <button onClick={handleChangePage}>Start New Game</button>
    </>
  );
}
