// src/components/UserCard.jsx
import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="max-w-md mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {/* User Header Section */}
      <div className="flex items-center space-x-4 p-4 bg-gray-100">
        <img
          className="w-16 h-16 rounded-full"
          src={user.avatar}
          alt={user.name}
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">Level: {user.level}</p>
        </div>
      </div>

      {/* Levels Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">Current Levels</h3>
        {user.levels.map((lvl, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">{lvl.name} - Level {lvl.value}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${(lvl.value / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">Achievements</h3>
        <ul className="list-disc list-inside">
          {user.achievements.map((ach, index) => (
            <li key={index} className="text-gray-300">
              <strong>{ach.name}</strong>: {ach.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Quests Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">Quests</h3>
        {user.quests.map((quest, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">{quest.name}</p>
            <ul className="list-disc list-inside text-gray-300">
              {quest.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
