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
      <div>
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
