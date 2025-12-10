// hooks
import { useState } from "react";

// context providers
import PlayerContextProvider from "./store/player-context";
import QuizContextProvider from "./store/quiz-context";

// components
import Header from "./components/Header";
import Login from "./components/Login";
import Categories from "./components/Categories";
import Quiz from "./components/Quiz";

export default function App() {
  // state
  const [page, setPage] = useState("login");

  // change pages (components)
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
