import { useState, useEffect } from "react";

export default function QuestionTimer({ onSkipAnswer }) {
  const [remainingTime, setRemainingTime] = useState(10000);

  // Skip answer
  useEffect(() => {
    const timer = setTimeout(() => {
      onSkipAnswer();
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [onSkipAnswer]);

  // Reduce remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={10000} value={remainingTime} />;
}
