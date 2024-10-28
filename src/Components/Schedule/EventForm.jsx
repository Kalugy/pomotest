import { useState } from 'react';

function EventForm({ onAddEvent }) {
  const [eventName, setEventName] = useState('');
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('12:00');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({ eventName, day, startTime, endTime });
    setEventName(''); // Reset form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 items-center mb-4 p-4 border rounded-lg bg-gray-500 shadow"
    >
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="p-2 border rounded text-black"
        required
      />
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="p-2 border rounded text-black"
      >
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
          (day) => (
            <option key={day} value={day}>
              {day}
            </option>
          )
        )}
      </select>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="p-2 border rounded text-black"
        required
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="p-2 border rounded text-black"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Event
      </button>
    </form>
  );
}

export default EventForm;
