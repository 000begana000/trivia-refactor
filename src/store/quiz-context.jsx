// hooks
import { createContext, useState } from "react";

export const QuizContext = createContext({
  quizItems: [],
  playedCategories: [],
  onSaveQuizItems: resData => {},
  onSavePlayedCategory: newCategory => {},
  onResetPlayedCategory: () => {},
});

export default function QuizContextProvider({ children }) {
  // states
  const [quizItems, setQuizItems] = useState([]);
  const [playedCategories, setPlayedCategories] = useState([]);

  // save fetched quiz data to quizItems state
  function handleSaveQuizItems(resData) {
    setQuizItems(resData);
  }

  // save played cateogories
  function handleSavePlayedCategory(newCategory) {
    setPlayedCategories(prevCategories => [newCategory, ...prevCategories]);
  }

  // reset played categories
  function handleResetPlayedCategories() {
    setPlayedCategories([]);
  }

  // context values
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
