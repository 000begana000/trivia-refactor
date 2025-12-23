// hooks
import { useState, useEffect } from "react";

// css module
import styles from "./ProgressBar.module.css";

export default function ProgressBar({ timeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Reduce remaining time from progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
