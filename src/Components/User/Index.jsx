// src/App.jsx
import React from 'react';
import UserCard from './UserCard';

function App() {
  const user = {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    level: 5,
    levels: [
      { name: 'Gym', value: 10 },
      { name: 'Running', value: 3 },
      { name: 'Reading', value: 1 },
    ],
    achievements: [
      { name: 'Iron Pump', description: 'Reach Gym Level 10.' },
      { name: 'Bookworm', description: 'Read 10 books.' },
      { name: 'Master Chef', description: 'Cook 10 new dishes.' },
    ],
    quests: [
      {
        name: 'Fitness Journey',
        tasks: ['Complete 30 gym sessions.', 'Lift a total of 1,000 kg.'],
      },
      {
        name: 'Reading Challenge',
        tasks: ['Read one book every two weeks.', 'Write a summary for each.'],
      },
      {
        name: 'Culinary Adventure',
        tasks: ['Cook one new recipe every weekend.', 'Host a dinner party.'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <UserCard user={user} />
    </div>
  );
}

export default App;
