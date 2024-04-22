import { useState } from "react";
import { Timer } from "./components/Timer";

export const App = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="layout">
      <div className="timer">
        <label>
          <input
            type="checkbox"
            checked={show}
            onChange={() => setShow((s) => !s)}
          />{" "}
          Show Timer
        </label>
      </div>
      {show && <Timer />}
    </div>
  );
};
