// hooks
import { useState, useEffect } from "react";

// css module
import styles from "./ProgressBar.module.css";

export default function ProgressBar({ timeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Reduce remaining time from progress bar
  useEffect(() => {
    setRemainingTime(timeout);

    const interval = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timeout]);

  return (
    <>
      <progress
        className={styles.progress}
        max={timeout}
        value={remainingTime}
      />
    </>
  );
}
