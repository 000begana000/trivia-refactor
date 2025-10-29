import { useState, useEffect, useContext } from "react";

import { QuizContext } from "../store/quiz-context";

const CATEGORIES = [
  { id: 9, name: "General Knowledge" },
  { id: 11, name: "Film" },
  { id: 12, name: "Music" },
  { id: 15, name: "Video Games" },
  { id: 17, name: "Science & Nature" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 27, name: "Animals" },
  { id: 31, name: "Japanese Anime & Manga" },
];

export default function Categories({ onChangePage }) {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [playedCategories, setPlayedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { onSaveQuizItems } = useContext(QuizContext);

  useEffect(() => {
    async function fetchQuiz() {
      if (!categoryId) return;

      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=boolean`
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error("faild to fetch quiz data");
        }

        onSaveQuizItems(resData.results);
        console.log(resData.results);
      } catch (error) {
        setError({ message: error.message || "Could not fetch quiz items." });
      }
    }

    fetchQuiz();
  }, [categoryId]);

  function handleSelectCategoryName(category) {
    setCategoryName(category.name);
    setCategoryId(category.id);
  }

  function handleStartGame() {
    // save played category ids
    setPlayedCategories(prevCategories => [...prevCategories, categoryId]);

    onChangePage("quiz");
  }

  return (
    <div>
      <ul>
        {CATEGORIES.map(category => (
          <li key={category.id}>
            <button onClick={() => handleSelectCategoryName(category)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      {categoryName && <p>You've selected "{categoryName}" category</p>}
      <button onClick={handleStartGame}>Start new game</button>
    </div>
  );
}
