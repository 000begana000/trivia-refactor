import { createContext, useState } from "react";

export const QuizContext = createContext({
  quizItems: [],
  playedCategories: [],
  answers: [],
  onSaveQuizItems: resData => {},
  onSavePlayedCategory: newCategory => {},
  onSaveAnswer: newAnswer => {},
  onResetPlayedCategory: () => {},
  onResetAnswers: () => {},
});

export default function QuizContextProvider({ children }) {
  const [quizItems, setQuizItems] = useState([]);
  const [playedCategories, setPlayedCategories] = useState([]);
  const [answers, setAnswers] = useState([]);

  function handleSaveQuizItems(resData) {
    setQuizItems(resData);
  }

  function handleSavePlayedCategory(newCategory) {
    setPlayedCategories(prevCategories => [...prevCategories, newCategory]);
  }

  function handleSaveAnswer(newAnswer) {
    setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
  }

  function handleResetPlayedCategories() {
    setPlayedCategories([]);
  }

  function handleResetAnswers() {
    setAnswers([]);
  }

  const ctxValue = {
    quizItems,
    answers,
    playedCategories,
    onSaveQuizItems: handleSaveQuizItems,
    onSavePlayedCategory: handleSavePlayedCategory,
    onSaveAnswer: handleSaveAnswer,
    onResetPlayedCategory: handleResetPlayedCategories,
    onResetAnswers: handleResetAnswers,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
