import { useState } from "react";

import PlayerContextProvider from "./store/player-context";

import Header from "./components/Header";
import Login from "./components/Login";
import Categories from "./components/Categories";

export default function App() {
  const [page, setPage] = useState("login");

  function handleChangePage(pageName) {
    setPage(pageName);
  }

  return (
    <PlayerContextProvider>
      <Header />
      {page === "login" && <Login onChangePage={handleChangePage} />}
      {page === "categories" && <Categories onChangePage={handleChangePage} />}
    </PlayerContextProvider>
  );
}
