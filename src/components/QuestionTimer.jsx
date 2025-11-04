import { useState, useEffect } from "react";

export default function QuestionTimer() {
  const [remainingTime, setRemainingTime] = useState(10000);

  useEffect(() => {
    setTimeout(() => {
      console.log("skip");
    }, 10000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setRemainingTime(prevTime => prevTime - 100);
    }, 100);
  }, []);

  return <progress max={10000} value={remainingTime} />;
}
