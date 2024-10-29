import React from 'react';
import { useDrop } from 'react-dnd';
import HourSlot from './HourSlot';

const DayColumn = ({ day, events, moveEvent }) => {
  return (
    <div className="px-2 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">{day}</h2>
      <div className="grid grid-rows-24">
        {events.map((event, hour) => (
          <HourSlot
            key={hour}
            day={day}
            hour={hour}
            event={event}
            moveEvent={moveEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
