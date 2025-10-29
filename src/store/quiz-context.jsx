import { createContext, useState } from "react";

export const QuizContext = createContext({
  quizItems: [],
  answerState: [],
  onSaveQuizItems: resData => {},
});

export default function QuizContextProvider({ children }) {
  const [quizItems, setQuizItems] = useState([]);
  const [answerState, setAnswerState] = useState([]);

  function handleSaveQuizItems(resData) {
    setQuizItems(resData);
  }

  const ctxValue = {
    quizItems,
    answerState,
    onSaveQuizItems: handleSaveQuizItems,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
