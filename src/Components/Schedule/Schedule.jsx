import { useState, useRef, useEffect } from 'react';
import EventForm from './EventForm';
import DayColumn from './DayColumn';

function Schedule() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const gridRef = useRef(null);
  const [columnWidth, setColumnWidth] = useState(0);

  useEffect(() => {
    if (gridRef.current) {
      setColumnWidth(gridRef.current.offsetWidth / 7); // Calculate day width
    }
  }, [gridRef]);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: Date.now() }]);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
  };

  const handleStop = (id, startTime, endTime, target) => {
    const dayIndex = Math.floor(target.closest('.day-grid').offsetLeft / columnWidth);
    const newDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayIndex];

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? { ...event, day: newDay, startTime, endTime }
          : event
      )
    );
  };

  const getEventsForDay = (day) =>
    events.filter((event) => event.day === day);

  return (
    <div className="p-6 space-y-4">
      <EventForm onAddEvent={handleAddEvent} />

      {editingEvent && (
        <EventForm
          onAddEvent={handleUpdateEvent}
          event={editingEvent}
          key={editingEvent.id}
        />
      )}

        {/* <div className="flex flex-col gap-4">
            {Array.from({ length: 24 }, (_, i) => `${i}:00`).map((hour) => (
            <div key={hour} className="text-sm text-gray-500 h-12">
                {hour}
            </div>
            ))}
        </div> */}
      <div ref={gridRef} className="grid grid-cols-7 gap-4 week-grid">
        
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
          (day) => (
            <DayColumn
              key={day}
              day={day}
              events={getEventsForDay(day)}
              onStop={handleStop}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Schedule;
