import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend for DnD
import HabitTracker from './HabitTracker';
import MonthlyCalendar from './MonthlyCalendar';

const App = () => {
  const [habits, setHabits] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-8 p-8 bg-slate-700 text-black">
        <HabitTracker habits={habits} setHabits={setHabits} />
        <MonthlyCalendar habits={habits} />
      </div>
    </DndProvider>
  );
};

export default App;
