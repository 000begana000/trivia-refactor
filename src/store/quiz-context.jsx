import { createContext, useState } from "react";

export const QuizContext = createContext({
  quizItems: [],
  playedCategories: [],
  answerState: [],
  onSaveQuizItems: resData => {},
  onSaveAnswerState: newAnswerState => {},
  onSavePlayedCategory: newCategory => {},
});

export default function QuizContextProvider({ children }) {
  const [quizItems, setQuizItems] = useState([]);
  const [playedCategories, setPlayedCategories] = useState([]);
  const [answerState, setAnswerState] = useState([]);

  function handleSaveQuizItems(resData) {
    setQuizItems(resData);
  }

  function handleSaveAnswerState(newAnswerState) {
    setAnswerState(prevAnswerStates => [...prevAnswerStates, newAnswerState]);
  }

  function handleSavePlayedCategory(newCategory) {
    setPlayedCategories(prevCategories => [...prevCategories, newCategory]);
  }

  const ctxValue = {
    quizItems,
    playedCategories,
    answerState,
    onSaveQuizItems: handleSaveQuizItems,
    onSaveAnswerState: handleSaveAnswerState,
    onSavePlayedCategory: handleSavePlayedCategory,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
