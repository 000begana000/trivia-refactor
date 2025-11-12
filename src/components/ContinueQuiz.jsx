import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

export default function ContinueQuiz({ onChangePage }) {
  const { quizItems, answers, onResetAnswers } = useContext(QuizContext);

  // Change page to categories
  function handleChangePage() {
    onChangePage("categories");
    onResetAnswers();
  }

  return (
    <>
      <h1>Quiz Complete</h1>
      {quizItems.map(item => (
        <p>{item.question}</p>
      ))}
      {answers.map(answer => (
        <p>{answer}</p>
      ))}
      <button onClick={handleChangePage}>Continue Play</button>
    </>
  );
}
