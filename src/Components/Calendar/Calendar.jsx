// src/components/Calendar.jsx
import React, { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState('month'); // Default view is 'month'

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeekY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  const events = [
    { id: 1, time: '09:00', title: 'Morning Meditation' },
    { id: 2, time: '14:00', title: 'Team Meeting' },
    { id: 3, time: '18:00', title: 'Workout Session' },
  ];


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
            <div className="col-span-3">
                {hours.map((hour) => (
                <div key={hour} className="p-2 text-right text-gray-500">
                    {hour}
                </div>
                ))}
            </div>
            <div className="col-span-9 border-l border-gray-300 pl-4">
                {hours.map((hour) => (
                <div key={hour} className="border-b border-gray-200 py-4">
                    {events
                    .filter((event) => event.time.startsWith(hour.slice(0, 2)))
                    .map((event) => (
                        <div
                        key={event.id}
                        className="bg-blue-500 text-white rounded-lg p-2 mb-2"
                        >
                        {event.title}
                        </div>
                    ))}
                </div>
                ))}
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
