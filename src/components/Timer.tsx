import { useState, useRef, useEffect } from "react";

const TOTAL_SECONDS = 300;
type TimerStatusType = "RESET" | "STARTED" | "PAUSED" | "COMPLETED";

export const Timer = () => {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [timerStatus, setTimerStatus] = useState<TimerStatusType>("RESET");
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      console.log("setinterval callback");
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          setTimerStatus("COMPLETED");
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }

        return prevSeconds - 1;
      });
    }, 1000);
    setTimerStatus("STARTED");
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerStatus("PAUSED");
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(TOTAL_SECONDS);
    setTimerStatus("RESET");
  };

  useEffect(() => {
    const minutesText = `${Math.floor(seconds / 60)}`.padStart(2, "0");
    const secondsText = `${seconds % 60}`.padStart(2, "0");
    document.title = `${minutesText}:${secondsText} - Timer`;
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="timer">
      <big>
        {`${Math.floor(seconds / 60)}`.padStart(2, "0")}
        <small>m</small> {`${seconds % 60}`.padStart(2, "0")}
        <small>s</small>
      </big>
      <progress
        value={TOTAL_SECONDS - seconds}
        max={TOTAL_SECONDS}
        className={timerStatus === "PAUSED" ? "inactive" : ""}
      />
      <footer>
        {timerStatus === "STARTED" ? (
          <button className="btnPrimary" onClick={stopTimer}>
            Stop
          </button>
        ) : (
          <button className="btnPrimary" onClick={startTimer}>
            Start
          </button>
        )}
        <button onClick={resetTimer} disabled={timerStatus === "RESET"}>
          Reset
        </button>
      </footer>
      <p>Status : {timerStatus}</p>
    </div>
  );
};
