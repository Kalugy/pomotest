import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/sessions';

const Timer = ({ todoId }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const logSession = async (state) => {
    const session = {
      date: new Date().toISOString(),
      state: isBreak ? 'break' : 'work',
      startTime: isBreak ? 5 : 25,
      todosId: todoId,
    };
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    logSession(isActive ? 'stop' : 'start');
  };

  useEffect(() => {
    let interval;
    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else if (isActive && minutes === 0 && seconds === 0) {
      setIsBreak(!isBreak); // Switch session
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  return (
    <div>
      <h1>{isBreak ? 'Break Time' : 'Work Time'}</h1>
      <div>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button onClick={toggleTimer}>{isActive ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default Timer;
