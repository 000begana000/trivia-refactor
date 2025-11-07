import { createContext, useState } from "react";

export const QuizContext = createContext({
  quizItems: [],
  playedCategories: [],
  onSaveQuizItems: resData => {},
  onSavePlayedCategory: newCategory => {},
  onResetPlayedCategory: () => {},
});

export default function QuizContextProvider({ children }) {
  const [quizItems, setQuizItems] = useState([]);
  const [playedCategories, setPlayedCategories] = useState([]);

  function handleSaveQuizItems(resData) {
    setQuizItems(resData);
  }
  function handleSavePlayedCategory(newCategory) {
    setPlayedCategories(prevCategories => [...prevCategories, newCategory]);
  }

  function handleResetPlayedCategories() {
    setPlayedCategories([]);
  }

  const ctxValue = {
    quizItems,
    playedCategories,
    onSaveQuizItems: handleSaveQuizItems,
    onSavePlayedCategory: handleSavePlayedCategory,
    onResetPlayedCategory: handleResetPlayedCategories,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
