import React, { useState, useEffect } from "react";
import Flip from "../flip";

import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import "./index.css";

const CountDown = (props) => {
  const { time, stop } = props;

  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(true);
  const [initialTime, setInitialTime] = useState(time);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    if (isRunning) {
      const updateTime = setInterval(() => {
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;

        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        if (minutes !== m) {
          setMinutes(m);
        }

        setSeconds(s);
        console.log(m, s);

        if (timeLeft <= 0) {
          clearInterval(updateTime);
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);

      return () => clearInterval(updateTime);
    }
  }, [isRunning, timeLeft, minutes]);

  const handleReset = () => {
    setTimeLeft(initialTime);
    setMinutes(
      Math.floor(initialTime / 60)
        .toString()
        .padStart(2, "0")
    );
    setSeconds((initialTime % 60).toString().padStart(2, "0"));
    setIsRunning(false);
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <h1>counting...</h1>

      <div className="countdown-container">
        <Flip value={minutes} className="countdown-min" />
        <p className="divider">:</p>
        <Flip value={seconds} className="countdown-sec" />
      </div>
      <div className="button-container">
        <button onClick={handlePause} className="media-btn">
          {isRunning ? (
            <>
              <FaPause className="icon pause" /> pause
            </>
          ) : (
            <>
              <FaPlay className="icon play" /> play
            </>
          )}
        </button>
        <button onClick={handleReset} className="media-btn">
          <GrPowerReset className="icon reset" /> reset
        </button>
        <button onClick={stop} className="media-btn">
          <FaStop className="icon stop" /> stop
        </button>
      </div>
    </div>
  );
};

export default CountDown;
