import { useContext } from "react";

import { PlayerContext } from "../store/player-context";
import { QuizContext } from "../store/quiz-context";

export default function Quiz() {
  const { quizItems, answerState } = useContext(QuizContext);
  const { player } = useContext(PlayerContext);

  const activeQuestionIndex = answerState.length;
  // display next question

  return (
    <>
      <div>
        <p>player name:{player.playerName}</p>
        <p>current score: {player.currentScore}</p>
        <p>highs score: {player.highScore}</p>
      </div>
      <div>
        {quizItems && <p>{quizItems[activeQuestionIndex].question}</p>}
        <p>
          <button>True</button>
          <button>False</button>
        </p>
      </div>
    </>
  );
}
