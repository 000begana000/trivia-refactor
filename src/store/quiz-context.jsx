import { createContext, useState } from "react";

export const QuizContext = createContext({
  quizItems: [],
  answerState: [],
  onSaveQuizItems: resData => {},
  onSaveAnswerState: newAnswerState => {},
});

export default function QuizContextProvider({ children }) {
  const [quizItems, setQuizItems] = useState([]);
  const [answerState, setAnswerState] = useState([]);

  function handleSaveQuizItems(resData) {
    setQuizItems(resData);
  }

  function handleSaveAnswerState(newAnswerState) {
    setAnswerState(prevAnswerStates => [...prevAnswerStates, newAnswerState]);
  }

  const ctxValue = {
    quizItems,
    answerState,
    onSaveQuizItems: handleSaveQuizItems,
    onSaveAnswerState: handleSaveAnswerState,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
