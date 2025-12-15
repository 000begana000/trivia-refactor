// hooks
import { useEffect } from "react";

// component
import ProgressBar from "./ProgressBar";

export default function QuestionTimer({ onTimeout, timeout }) {
  // Skip answer
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  return <ProgressBar timeout={timeout} />;
}
