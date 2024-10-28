import { useState, useEffect } from 'react';
import TodoList from '../TodoList/TodoList';

import EditIcon from '../../assets/icons/EditIcon';


const API_URL = 'http://localhost:3001';

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState(25); // User input for minutes
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  //task
  const [selectedOption, setSelectedOption] = useState([]);



  const logSession = async () => {
    const session = {
      date: new Date().toISOString(),
      startTime: minutes,
      isPaused: isPaused,
      task: selectedOption,
    };
    await fetch(API_URL + '/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
  };

  const updateFinishCycleTask = async (action) => {
    const newAction = {
      action: action
    };

    await fetch(API_URL + '/todos/'+ selectedOption.id +'/cycles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAction),
    });
  }

  const handleStartPause = () => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      console.log('hello')
    } else {
      setIsPaused(false);
      setIsActive(true);
      console.log('hello2222')
      if(minutes==inputMinutes){
        logSession()
        updateFinishCycleTask("start");
      }
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
    }else if (isActive && minutes === 0 && seconds === 0) {
      //setIsBreak(!isBreak); // Switch between work and break
      updateFinishCycleTask("end");
      handleReset(); // Reset the timer for the next session
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);


  return (
    <div className="h-screen bg-gray-800 text-white flex flex-col gap-1 items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">Timer</h1>
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
          <div className="cursor-pointer text-gray-200 hover:text-blue-500"
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
      <TodoList setSelectedOption={setSelectedOption} />
    </div>
  );
};

export default Timer;
