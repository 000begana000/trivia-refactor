import { useState } from "react";

import Header from "./components/Header";
import Login from "./components/Login";

export default function App() {
  const [page, setPage] = useState("login");

  function handleChangePage(pageName) {
    setPage(pageName);
  }

  return (
    <>
      <Header />
      {page === "login" && <Login onChangePage={handleChangePage} />}
    </>
  );
}
