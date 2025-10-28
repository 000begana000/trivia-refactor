import { useState } from "react";

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

export default function Categories() {
  const [categoryId, setCategoryId] = "";
  const [categoryName, setCategoryName] = useState("");

  return (
    <div>
      <ul>
        {CATEGORIES.map(category => (
          <li key={category.id}>
            <button>{category.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
