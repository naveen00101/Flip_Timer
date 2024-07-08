// import React from "react";
import { useState } from "react";
import CountDown from "../countdown";

import "./index.css";

const Timer = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [ms, setMs] = useState([0, 0]);

  const time = ms[0] * 60 + ms[1];

  const updateMin = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value > 60) {
      value = 60;
    } else if (value < 0) {
      value = 0;
    }
    setMs([value, ms[1]]);
  };

  const updateSec = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value > 60) {
      value = 60;
    } else if (value < 0) {
      value = 0;
    }
    setMs([ms[0], value]);
  };

  const stopTimer = () => {
    setIsCounting(false);
  };
  console.log(typeof ms[0]);
  console.log(time);

  return (
    <div className="timer-container">
      {!isCounting && (
        <>
          <h1 className="title">Set Timer</h1>
          <hr className="line" />
          <form
            className="time-entry-container"
            onSubmit={() => setIsCounting(!isCounting)}
          >
            <label>Enter Time for CountDown</label>
            <div className="time-entry-input-container">
              <div className="input-labeling">
                <input
                  type="number"
                  className="time-entry"
                  value={ms[0]}
                  onChange={updateMin}
                />
                <p>min</p>
              </div>

              <p>:</p>
              <div className="input-labeling">
                <input
                  type="number"
                  className="time-entry"
                  value={ms[1]}
                  onChange={updateSec}
                />
                <p>sec</p>
              </div>
            </div>

            <button className="set-button" disabled={time === 0} type="submit">
              Set
            </button>
          </form>
        </>
      )}
      {isCounting && <CountDown time={time} stop={stopTimer} />}
    </div>
  );
};

export default Timer;
