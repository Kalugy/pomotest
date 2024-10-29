import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Transition } from '@headlessui/react'; // For animation

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState('');
  const [goalStartDate, setGoalStartDate] = useState(null);
  const [goalEndDate, setGoalEndDate] = useState(null);
  const [milestoneInput, setMilestoneInput] = useState('');
  const [milestoneStartDate, setMilestoneStartDate] = useState(null);
  const [milestoneEndDate, setMilestoneEndDate] = useState(null);
  const [editingGoalIndex, setEditingGoalIndex] = useState(null);
  const [expandedGoal, setExpandedGoal] = useState(null); // For goal collapse animation

  const addMilestone = (goalIndex) => {
    if (milestoneInput.trim() === '' || !milestoneStartDate || !milestoneEndDate) return;

    const updatedGoals = [...goals];
    updatedGoals[goalIndex].milestones.push({
      description: milestoneInput,
      startDate: milestoneStartDate.toLocaleDateString(),
      endDate: milestoneEndDate.toLocaleDateString(),
    });

    setGoals(updatedGoals);
    setMilestoneInput('');
    setMilestoneStartDate(null);
    setMilestoneEndDate(null);
  };

  const addGoal = () => {
    if (goalInput.trim() === '' || !goalStartDate || !goalEndDate) return;

    const newGoal = {
      description: goalInput,
      startDate: goalStartDate.toLocaleDateString(),
      endDate: goalEndDate.toLocaleDateString(),
      milestones: [],
    };

    setGoals([...goals, newGoal]);
    setGoalInput('');
    setGoalStartDate(null);
    setGoalEndDate(null);
  };

  const toggleGoal = (index) => {
    setExpandedGoal(expandedGoal === index ? null : index);
  };

  const editGoal = (index) => {
    setEditingGoalIndex(index);
    const goal = goals[index];
    setGoalInput(goal.description);
    setGoalStartDate(new Date(goal.startDate));
    setGoalEndDate(new Date(goal.endDate));
  };

  const saveGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].description = goalInput;
    updatedGoals[index].startDate = goalStartDate.toLocaleDateString();
    updatedGoals[index].endDate = goalEndDate.toLocaleDateString();

    setGoals(updatedGoals);
    setEditingGoalIndex(null);
    setGoalInput('');
    setGoalStartDate(null);
    setGoalEndDate(null);
  };

  const removeGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const removeMilestone = (goalIndex, milestoneIndex) => {
    const updatedGoals = [...goals];
    updatedGoals[goalIndex].milestones = updatedGoals[goalIndex].milestones.filter(
      (_, i) => i !== milestoneIndex
    );

    setGoals(updatedGoals);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Goal Tracker</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <input
          type="text"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="Enter your goal"
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex gap-2 mb-4">
          <DatePicker
            selected={goalStartDate}
            onChange={(date) => setGoalStartDate(date)}
            placeholderText="Start Date"
            className="w-1/2 p-2 border rounded"
          />
          <DatePicker
            selected={goalEndDate}
            onChange={(date) => setGoalEndDate(date)}
            placeholderText="End Date"
            className="w-1/2 p-2 border rounded"
          />
        </div>

        {editingGoalIndex === null ? (
          <button
            onClick={addGoal}
            className="w-full bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Goal
          </button>
        ) : (
          <button
            onClick={() => saveGoal(editingGoalIndex)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Save Goal
          </button>
        )}
      </div>

      <div className="mt-10 max-w-md mx-auto">
        {goals.map((goal, goalIndex) => (
          <div key={goalIndex} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">{goal.description}</h2>
              <button
                onClick={() => toggleGoal(goalIndex)}
                className="text-blue-500"
              >
                {expandedGoal === goalIndex ? 'Hide' : 'Show'} Milestones
              </button>
            </div>

            <p className="text-gray-600 mb-2">
              Start Date: {goal.startDate} | End Date: {goal.endDate}
            </p>

            <Transition
              show={expandedGoal === goalIndex}
              enter="transition-all duration-500 ease-in-out"
              enterFrom="max-h-0 opacity-0"
              enterTo="max-h-screen opacity-100"
              leave="transition-all duration-300 ease-in-out"
              leaveFrom="max-h-screen opacity-100"
              leaveTo="max-h-0 opacity-0"
            >
              <ul className="mb-4">
                {goal.milestones.map((milestone, milestoneIndex) => (
                  <li key={milestoneIndex} className="mb-2">
                    <div className="flex justify-between">
                      <span>
                        {milestone.description} - {milestone.startDate} to {milestone.endDate}
                      </span>
                      <button
                        onClick={() => removeMilestone(goalIndex, milestoneIndex)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Transition>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={milestoneInput}
                onChange={(e) => setMilestoneInput(e.target.value)}
                placeholder="Milestone"
                className="flex-grow p-2 border rounded"
              />
              <DatePicker
                selected={milestoneStartDate}
                onChange={(date) => setMilestoneStartDate(date)}
                placeholderText="Start Date"
                className="w-1/3 p-2 border rounded"
              />
              <DatePicker
                selected={milestoneEndDate}
                onChange={(date) => setMilestoneEndDate(date)}
                placeholderText="End Date"
                className="w-1/3 p-2 border rounded"
              />
              <button
                onClick={() => addMilestone(goalIndex)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editGoal(goalIndex)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => removeGoal(goalIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
