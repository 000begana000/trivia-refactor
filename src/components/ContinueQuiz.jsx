import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

export default function ContinueQuiz({ onChangePage, selectedAnswers }) {
  const { quizItems } = useContext(QuizContext);

  // Change page to categories
  function handleChangePage() {
    onChangePage("categories");
    onResetAnswers();
  }

  return (
    <>
      <h1>Quiz Complete</h1>
      {quizItems.map(item => (
        <p key={item.question}>{item.question}</p>
      ))}
      {selectedAnswers.map((answer, index) => (
        <p key={index}>{answer}</p>
      ))}
      <button onClick={handleChangePage}>Continue Play</button>
    </>
  );
}
