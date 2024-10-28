import DraggableEvent from './DraggableEvent';

function DayColumn({ day, events, onStop, onDelete, onEdit }) {
  return (
    <div className="day-grid border rounded-lg overflow-hidden shadow-md">
      <h3 className="text-center bg-gray-800 text-white py-2">{day}</h3>
      <div className="relative h-[1152px]">
        {events.map((event) => (
          <DraggableEvent
            key={event.id}
            event={event}
            onStop={onStop}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default DayColumn;
