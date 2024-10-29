import React, { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Schedule2 from './Schedule2';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen text-blue-700 bg-gray-800 p-4">
        <h1 className="text-3xl text-blue-500 font-bold text-center mb-6">Weekly Schedule</h1>
        <Schedule2 />
      </div>
    </DndProvider>
  );
}

export default App;


// const [schedule, setSchedule] = useState(
//   days.reduce((acc, day, i) => ({ ...acc, [day]: [{ id: i, name: 'Meeting'+i, startHour: 9, endHour: 10 }] }), {})
// );
