import React from 'react';
import { useDrop } from 'react-dnd';
import Event from './Event';

const HourSlot = ({ day, hour, event, moveEvent }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'EVENT',
    drop: (item) => moveEvent(item.fromDay, item.fromHour, day, hour, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={` border rounded min-h-[40px] ${
        isOver ? 'bg-blue-100' : ''
      }`}
    >
      <p className="text-xs font-medium">{hour}:00</p>
      {event && <Event event={event} day={day} hour={hour} />}
    </div>
  );
};

export default HourSlot;
