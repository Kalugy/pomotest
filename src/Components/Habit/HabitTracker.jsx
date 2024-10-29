import React, { useState } from 'react';
import { FaBook, FaRunning, FaDumbbell, FaGuitar, FaEdit, FaTrash } from 'react-icons/fa';
import { useDrag } from 'react-dnd';

const icons = { FaBook, FaRunning, FaDumbbell, FaGuitar };

const HabitTracker = ({ habits, setHabits }) => {
  const [newHabit, setNewHabit] = useState({ name: '', icon: 'FaBook', color: '#000000' });

  const handleAddHabit = () => {
    if (newHabit.name) {
      setHabits([...habits, { ...newHabit, id: Date.now() }]);
      setNewHabit({ name: '', icon: 'FaBook', color: '#000000' });
    }
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const HabitItem = ({ habit }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'habit',
      item: habit,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    const IconComponent = icons[habit.icon];

    return (
      <div
        ref={drag}
        className={`flex items-center space-x-2 p-2 rounded-lg shadow-md ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
        style={{ backgroundColor: habit.color }}
      >
        <IconComponent className="text-2xl" />
        <span className="font-semibold">{habit.name}</span>
        <button onClick={() => handleDeleteHabit(habit.id)}>
          <FaTrash className="text-red-500" />
        </button>
      </div>
    );
  };

  return (
    <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Habit Tracker</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Habit Name"
          value={newHabit.name}
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          className="border p-2 rounded-lg flex-grow"
        />
        <select
          value={newHabit.icon}
          onChange={(e) => setNewHabit({ ...newHabit, icon: e.target.value })}
          className="border p-2 rounded-lg"
        >
          {Object.keys(icons).map((icon) => (
            <option key={icon} value={icon}>
              {icon.replace('Fa', '')}
            </option>
          ))}
        </select>
        <input
          type="color"
          value={newHabit.color}
          onChange={(e) => setNewHabit({ ...newHabit, color: e.target.value })}
          className="w-10 h-10 rounded-lg"
        />
        <button
          onClick={handleAddHabit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
