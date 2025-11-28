// hooks
import { useState, useEffect, useContext } from "react";

// import contexts
import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

// css module
import styles from "./Categories.module.css";

// default categories
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // imported states & functions from contexts
  const { onSaveQuizItems, playedCategories, onSavePlayedCategory } =
    useContext(QuizContext);
  const { player } = useContext(PlayerContext);

  // Fetching quiz items
  useEffect(() => {
    async function fetchQuiz() {
      if (!categoryId) return; // guard clause (too many request)

      setLoading(true); // reset loading state
      setError(""); // reset error state

      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=boolean`
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error("faild to fetch quiz data");
        }

        onSaveQuizItems(resData.results);
        setLoading(false);

        console.log(resData.results); // for testing
      } catch (error) {
        setError({ message: error.message || "Could not fetch quiz items." });
      }
    }

    fetchQuiz();
  }, [categoryId]);

  function handleSelectCategoryName(category) {
    setCategoryName(category.name); // prompt category name
    setSelectedCategory(category.name);
    setCategoryId(category.id); // fetch quiz data
  }

  function handleStartGame() {
    if (!playedCategories.includes(categoryId)) {
      onSavePlayedCategory(categoryId); // save played category name
    }
    onChangePage("quiz"); // change the page to Quiz
  }

  return (
    <div>
      <p className="mainPrompt">Welcome, {player.playerName}!</p>
      <p className="paragraph">PLEASE SELECT A CAGEGORY.</p>

      <ul>
        <div className={styles.grid}>
          {CATEGORIES.map(category => (
            <li key={category.id} className={styles.listStyleNone}>
              <button
                className={`${styles.buttonCategory} ${
                  selectedCategory === category.name ? styles.selected : ""
                }`}
                disabled={playedCategories.includes(category.id)}
                onClick={() => handleSelectCategoryName(category)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </div>
      </ul>
      {categoryName && <p>You've selected "{categoryName}" category</p>}
      {error && <p>Something went wrong. please choose another category.</p>}
      {!error && (
        <button disabled={loading} onClick={handleStartGame}>
          {loading ? "Select A Category" : "Start new game"}
        </button>
      )}
    </div>
  );
}
