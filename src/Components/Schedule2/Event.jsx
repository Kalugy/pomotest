import React from 'react';
import { useDrag } from 'react-dnd';

const Event = ({ event }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'EVENT',
    item: event,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`p-2 rounded bg-blue-500 text-white ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p className="text-sm">{event.name}</p>
      <p className="text-xs">
        {event.startHour}:00 - {event.endHour}:00
      </p>
    </div>
  );
};

export default Event;
