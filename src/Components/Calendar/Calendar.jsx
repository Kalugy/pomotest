// src/components/Calendar.jsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const API_URL = 'http://localhost:3001/todos';

const getRandomColor = () => {
  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState('month'); // Default view is 'month'

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeekY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  // Helper to convert a time string to percentage position on the timeline (0 to 100%)
  const getPositionPercentage = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return ((hour + minute / 60) / 24) * 100;
  };
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const daysInMonth = endOfMonth.diff(startOfMonth, 'day') + 1;
  const firstDayOfMonth = startOfMonth.day();

  const getDaysInMonth = (month) => {
    const startOfMonth = currentDate.month(month).startOf('month');
    const endOfMonth = currentDate.month(month).endOf('month');
    const daysInMonth = endOfMonth.diff(startOfMonth, 'day') + 1;
    const firstDay = startOfMonth.day();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return { days, firstDay };
  };

  const prevPeriod = () => {
    setCurrentDate(
      view === 'year'
        ? currentDate.subtract(1, 'year')
        : view === 'month'
        ? currentDate.subtract(1, 'month')
        : currentDate.subtract(1, 'day')
    );
  };

  const nextPeriod = () => {
    setCurrentDate(
      view === 'year'
        ? currentDate.add(1, 'year')
        : view === 'month'
        ? currentDate.add(1, 'month')
        : currentDate.add(1, 'day')
    );
  };

  const goToToday = () => setCurrentDate(dayjs());

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button className="text-blue-500 hover:text-blue-700" onClick={prevPeriod}>
          &larr; Prev
        </button>
        <h2 className="text-lg font-bold">
          {view === 'year' && currentDate.format('YYYY')}
          {view === 'month' && currentDate.format('MMMM YYYY')}
          {view === 'day' && currentDate.format('dddd, MMMM D, YYYY')}
        </h2>
        <button className="text-blue-500 hover:text-blue-700" onClick={nextPeriod}>
          Next &rarr;
        </button>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setView('day')}
        >
          Day
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setView('month')}
        >
          Month
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            view === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setView('year')}
        >
          Year
        </button>
      </div>

      {/* Calendar View */}
      {view === 'month' && (
        <div>
          <div className="grid grid-cols-7 gap-2 text-center text-gray-500">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={i}></div> // Empty cells for padding
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <div
                key={i}
                className={`p-2 text-center ${
                  currentDate.date() === i + 1 ? 'bg-blue-500 text-white' : ''
                } hover:bg-blue-100 rounded-lg cursor-pointer`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

       {/* Calendar View */}
       {view === 'year' && (
        <div className="mt-5 grid grid-cols-4 gap-1">
          {Array.from({ length: 12 }).map((_, month) => {
            const { days, firstDay } = getDaysInMonth(month);
            return (
              <div key={month} className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-center text-lg font-semibold mb-2">
                  {currentDate.month(month).format('MMMM')}
                </h3>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {daysOfWeekY.map((day) => (
                    <div key={day} className="font-bold">
                      {day}
                    </div>
                  ))}
                  {/* Empty cells to align the first day */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={i}></div>
                  ))}
                  {days.map((day) => (
                    <div
                      key={day}
                      className="p-1 hover:bg-blue-200 rounded-lg cursor-pointer"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === 'day' && (
        <div className="p-4 text-center">
          <p className="text-xl font-semibold">{currentDate.format('dddd')}</p>
          <p>{currentDate.format('MMMM D, YYYY')}</p>
          <div className="grid grid-cols-12 gap-4">
      {/* Hour markers on the left */}
      <div className="col-span-3">
        {hours.map((hour) => (
          <div key={hour} className="p-2 text-right text-gray-500">
            {hour}
          </div>
        ))}
      </div>

      {/* Events timeline */}
      <div className="col-span-9 relative border-l border-gray-300 pl-4">
        {todos.map((task) =>
          task.cycles
            ?.filter((cycle) => cycle.endDate) // Only show cycles with an endDate
            .map((cycle, index) => {
              const startPercent = getPositionPercentage(dayjs(cycle.startDate).format('HH:mm'));
              const endPercent = getPositionPercentage(dayjs(cycle.endDate).format('HH:mm'));
              const color = getRandomColor(); // Assign a random color to each block

              return (
                <div
                  key={`${task.id}-${index}`}
                  className={`absolute ${color} p-1 rounded-lg shadow-md transition-all duration-300`}
                  style={{
                    top: `${startPercent}%`,
                    height: `${endPercent - startPercent}%`,
                    width: '90%',
                  }}
                >
                  {/* Name only visible on hover */}
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <p className="text-sm font-semibold">{task.text}</p>
                    <p className="text-xs">
                      {dayjs(cycle.startDate).format('HH:mm')} -{' '}
                      {dayjs(cycle.endDate).format('HH:mm')}
                    </p>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>


        </div>
      )}

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={goToToday}
      >
        Today
      </button>
    </div>
  );
};

export default Calendar;
