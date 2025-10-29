import { useState } from "react";

import PlayerContextProvider from "./store/player-context";
import QuizContextProvider from "./store/quiz-context";

import Header from "./components/Header";
import Login from "./components/Login";
import Categories from "./components/Categories";
import Quiz from "./components/Quiz";

export default function App() {
  const [page, setPage] = useState("login");

  function handleChangePage(pageName) {
    setPage(pageName);
  }

  return (
    <PlayerContextProvider>
      <Header />
      {page === "login" && <Login onChangePage={handleChangePage} />}
      <QuizContextProvider>
        {page === "categories" && (
          <Categories onChangePage={handleChangePage} />
        )}
        {page === "quiz" && <Quiz onChangePage={handleChangePage} />}
      </QuizContextProvider>
    </PlayerContextProvider>
  );
}
