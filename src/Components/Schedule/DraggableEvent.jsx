import { useState } from 'react';
import { DraggableCore } from 'react-draggable';

function DraggableEvent({ event, onStop, onDelete, onEdit }) {
  const startHour = parseInt(event.startTime.split(':')[0], 10);
  const topPosition = (startHour / 24) * 1152; // 1152px for 24 hours grid height

  const [position, setPosition] = useState({ x: 0, y: topPosition });

  const snapToGrid = (y) => {
    const hourHeight = 1152 / 24; // Height of one hour slot
    const snappedY = Math.round(y / hourHeight) * hourHeight; // Snap to nearest hour
    return snappedY;
  };

  const handleDrag = (e, data) => {
    const snappedY = snapToGrid(data.y); // Snap Y position to hour slot
    setPosition({ x: data.x, y: snappedY });
  };

  const handleStop = (e, data) => {
    const snappedY = snapToGrid(data.y);
    const newStartHour = Math.round((snappedY / 1152) * 24);
    const duration =
      parseInt(event.endTime.split(':')[0], 10) -
      parseInt(event.startTime.split(':')[0], 10);
    const newEndHour = Math.min(24, newStartHour + duration);

    onStop(event.id, `${newStartHour}:00`, `${newEndHour}:00`, e.target);
  };

  return (
    <DraggableCore className='z-10' onDrag={handleDrag} onStop={handleStop}>
      <div
        className="bg-blue-500 text-white rounded p-2 absolute w-full cursor-move"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <strong>{event.eventName}</strong>
        <div className="flex justify-between mt-1 text-xs">
          <button
            onClick={() => onEdit(event)}
            className="bg-yellow-500 px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="bg-red-500 px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </DraggableCore>
  );
}

export default DraggableEvent;
