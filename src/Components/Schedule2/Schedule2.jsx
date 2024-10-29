import React, { useState } from 'react';
import DayColumn from './DayColumn';
import Event from './Event';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Schedule = () => {
  const [schedule, setSchedule] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: Array(24).fill(null) }), {})
  );

  const [newEvents, setNewEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const createEvent = () => {
    const newEvent = {
      id: Date.now(),
      name: eventName,
      startHour: parseInt(startTime),
      endHour: parseInt(endTime),
    };
    setNewEvents([...newEvents, newEvent]);
    setEventName('');
    setStartTime('');
    setEndTime('');
  };

  const moveEvent = (fromDay, fromHour, toDay, toHour, event) => {
    const { startHour, endHour } = event;
    const duration = endHour - startHour;

    setSchedule((prev) => {
      const updatedFromDay = fromDay ? [...prev[fromDay]] : null;

      if (fromDay) {
        for (let i = startHour; i < endHour; i++) {
          updatedFromDay[i] = null;
        }
      }

      const updatedToDay = [...prev[toDay]];
      for (let i = toHour; i < toHour + duration; i++) {
        updatedToDay[i] = { ...event, hour: i };
      }

      return {
        ...prev,
        ...(fromDay && { [fromDay]: updatedFromDay }),
        [toDay]: updatedToDay,
      };
    });

    setNewEvents((prev) => prev.filter((e) => e.id !== event.id));
  };


  return (
    <div className="grid grid-cols-8 gap-4">
      {/* New Event Creation Section */}
      <div className="col-span-1 p-2 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">New Event</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="number"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Hour (e.g., 9)"
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="number"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Hour (e.g., 12)"
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={createEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Create Event
        </button>

        <div className="mt-4">
          {newEvents.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="col-span-7 grid grid-cols-7 gap-4">
        {days.map((day) => (
          <DayColumn
            key={day}
            day={day}
            events={schedule[day]}
            moveEvent={moveEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
