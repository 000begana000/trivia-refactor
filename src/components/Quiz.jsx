import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";

export default function Quiz() {
  const { quizItems } = useContext(QuizContext);

  return (
    <>
      {!quizItems && <p>There is no questions</p>}
      {quizItems &&
        quizItems.map(item => <p key={item.question}>{item.question}</p>)}
    </>
  );
}
