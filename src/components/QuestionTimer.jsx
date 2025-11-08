import { useState, useEffect } from "react";

export default function QuestionTimer({ onSkipAnswer, timeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Skip answer
  useEffect(() => {
    const timer = setTimeout(() => {
      onSkipAnswer();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onSkipAnswer, timeout]);

  // Reduce remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timeout} value={remainingTime} />;
}
