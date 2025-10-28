import { createContext, useState } from "react";

export const QuizContext = createContext({
  questions: [],
  answers: [],
  answerState: [],
});

export default function QuizContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answerState, setAnswerState] = useState([]);

  const ctxValue = { questions, answers, answerState };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
