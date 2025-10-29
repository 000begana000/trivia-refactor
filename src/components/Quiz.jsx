import { useContext } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

export default function Quiz() {
  const { quizItems } = useContext(QuizContext);
  const { player } = useContext(PlayerContext);

  return (
    <>
      <div>
        <p>player name:{player.playerName}</p>
        <p>current score: {player.currentScore}</p>
        <p>highs score: {player.highScore}</p>
      </div>
      {quizItems &&
        quizItems.map(item => <p key={item.question}>{item.question}</p>)}
    </>
  );
}
