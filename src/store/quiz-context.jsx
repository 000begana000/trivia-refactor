import { createContext, useState } from "react";

export const QuizContext = createContext({
  quizItems: [],
  playedCategories: [],
  playerAnswers: [],
  answerState: "unanswered",
  onSaveQuizItems: resData => {},
  onSaveAnswer: newAnswer => {},
  onSavePlayedCategory: newCategory => {},
  onResetPlayedCategory: () => {},
});

export default function QuizContextProvider({ children }) {
  const [quizItems, setQuizItems] = useState([]);
  const [playedCategories, setPlayedCategories] = useState([]);
  const [playerAnswers, setPlayerAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("unanswered");

  function handleSaveQuizItems(resData) {
    setQuizItems(resData);
  }

  function handleSaveAnswer(newAnswer) {
    setPlayerAnswers(prevAnswers => [...prevAnswers, newAnswer]);
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
    playerAnswers,
    answerState,
    onSaveQuizItems: handleSaveQuizItems,
    onSaveAnswer: handleSaveAnswer,
    onSavePlayedCategory: handleSavePlayedCategory,
    onResetPlayedCategory: handleResetPlayedCategories,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
