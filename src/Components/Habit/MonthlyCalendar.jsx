import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { FaBook, FaRunning, FaDumbbell, FaGuitar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const icons = { FaBook, FaRunning, FaDumbbell, FaGuitar }; // Icon options

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const MonthlyCalendar = ({ habits }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Initialize each day with an empty array to store multiple habits
  const [calendar, setCalendar] = useState(
    Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, () => [])
  );

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const handleDrop = (day, habit) => {
    setCalendar((prev) => {
      const updatedCalendar = [...prev];
      updatedCalendar[day - 1] = [...(updatedCalendar[day - 1] || []), habit]; // Add habit to the day
      return updatedCalendar;
    });
  };

  const DayCell = ({ day }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'habit',
      drop: (item) => handleDrop(day, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    const habitsForDay = calendar[day - 1] || []; // Ensure an array

    return (
      <div
        ref={drop}
        className={`border rounded-lg p-4 h-28 flex flex-col items-center justify-start space-y-2 ${
          isOver ? 'bg-blue-100' : 'bg-white'
        }`}
      >
        <span className="font-bold text-sm">{day}</span> {/* Display the day number */}
        <div className="flex space-x-2">
          {habitsForDay.map((habit, index) => {
            const IconComponent = icons[habit.icon];
            return <IconComponent key={index} className="text-2xl" />;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-2/3 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentMonth((prev) => (prev - 1 + 12) % 12)}>
          <FaChevronLeft />
        </button>
        <h2 className="text-xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button onClick={() => setCurrentMonth((prev) => (prev + 1) % 12)}>
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => (
          <DayCell key={i} day={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
