import { useState, useEffect } from 'react';
import TodoList from '../TodoList/TodoList';

import EditIcon from '../../assets/icons/EditIcon';


const API_URL = 'http://localhost:3001/sessions';

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState(25); // User input for minutes
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  const logSession = async () => {
    const session = {
      date: new Date().toISOString(),
      state: isBreak ? 'break' : 'work',
      startTime: isBreak ? 5 : 25,
      
    };
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
  };

  const handleStartPause = () => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
    } else {
      setIsPaused(false);
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setMinutes(inputMinutes);
    setSeconds(0);
  };

  const handleSave = () => {
    setMinutes(inputMinutes);
    setSeconds(0);
    setIsEditing(false); // Exit edit mode after saving
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
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);


  return (
    <div>
      <div className="box relative">
      
      {isEditing ? (
        <div className='flex flex-row gap-2' >
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(parseInt(e.target.value, 10))}
            placeholder="Enter minutes"
            className="input"
          />
          <button className="primary mb-4 " onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div className='flex flex-col justify-center '>
        <div className="flex justify-center text-3xl my-4">
          <div className="absolute right-20 cursor-pointer text-gray-200 hover:text-blue-500"
            onClick={() => setIsEditing(!isEditing)}
          >
            <EditIcon
              size={13}
            />
          </div>
          <p className='text-zinc-300 font-bold text-4xl'>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
        </div>
          <div className='flex flex-row justify-center gap-1'>
            <button
              className={`primary ${isActive ? 'bg-yellow-500' : 'bg-green-500'}`}
              onClick={handleStartPause}
            >
              {isActive ? 'Pause' : isPaused ? 'Resume' : 'Start'}
            </button>
            <button className="secondary ml-4" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      )}
      </div>
      <TodoList />
    </div>
  );
};

export default Timer;
