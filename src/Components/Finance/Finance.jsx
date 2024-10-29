// src/components/FinanceComponent.jsx

import React, { useState } from 'react';

const FinanceComponent = () => {
  const [categories, setCategories] = useState([
    { name: 'Montly Salary', amount: 1000, isIncome: true },
    { name: 'Service Water', amount: 120, isIncome: false },
    { name: 'Service Energy', amount: 100, isIncome: false },
    { name: 'Service Network', amount: 50, isIncome: false },
    { name: 'Service Gas', amount: 200, isIncome: false },
    { name: 'Food', amount: 200, isIncome: false },
    { name: 'Entertainment Netflix', amount: 15, isIncome: false },
  ]);

  const [customCategory, setCustomCategory] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isIncome, setIsIncome] = useState(false); 

  const [totalIncome, setTotalIncome] = useState(1000);
  const [totalWaste, setTotalWaste] = useState(685);
  const [remaining, setRemaining] = useState(315);

  // Validation Error State
  const [error, setError] = useState('');

  const handleAmountChange = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index].amount = parseFloat(value) || 0;
    setCategories(updatedCategories);
    updateTotals(updatedCategories);
  };

  const updateTotals = (categoriesList) => {
    const income = categoriesList
      .filter((cat) => cat.isIncome)
      .reduce((acc, cat) => acc + cat.amount, 0);

    const waste = categoriesList
      .filter((cat) => !cat.isIncome)
      .reduce((acc, cat) => acc + cat.amount, 0);

    setTotalIncome(income);
    setTotalWaste(waste);
    setRemaining(income - waste);
  };

  const addCustomCategory = () => {
    if (!customCategory || customAmount === '') {
      setError('Please fill in both category name and amount.');
      return;
    }
    if (isNaN(parseFloat(customAmount))) {
      setError('Amount must be a valid number.');
      return;
    }

    const newCategory = {
      name: customCategory,
      amount: parseFloat(customAmount),
      isIncome: isIncome,
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    updateTotals(updatedCategories);

    setCustomCategory('');
    setCustomAmount('');
    setIsIncome(false);
    setError(''); // Clear any previous errors
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    updateTotals(updatedCategories);
  };

  const editCategory = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setCategories(updatedCategories);
    updateTotals(updatedCategories);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md max-w-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Monthly Finance Tracker</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-200 text-red-800 p-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Expense Categories */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={category.name}
                onChange={(e) => editCategory(index, 'name', e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </div>

            <div className="w-24">
              <input
                type="number"
                value={category.amount}
                onChange={(e) => editCategory(index, 'amount', e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full text-right"
              />
            </div>

            <div className="w-32">
              <select
                value={category.isIncome ? 'income' : 'waste'}
                onChange={(e) =>
                  editCategory(index, 'isIncome', e.target.value === 'income')
                }
                className="border border-gray-300 p-2 rounded-lg w-full"
              >
                <option value="income">Income</option>
                <option value="waste">Waste</option>
              </select>
            </div>

            <button
              onClick={() => deleteCategory(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}

        {/* Add Custom Category */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Custom Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full mb-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full mb-2"
          />

          {/* Income or Waste Radio Buttons */}
          <div className="flex items-center space-x-4 mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={isIncome}
                onChange={() => setIsIncome(true)}
                className="mr-2"
              />
              Income
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="waste"
                checked={!isIncome}
                onChange={() => setIsIncome(false)}
                className="mr-2"
              />
              Waste
            </label>
          </div>

          <button
            onClick={addCustomCategory}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
          >
            Add Custom Category
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold">Total Income</h2>
        <p className="text-3xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>

        <h2 className="text-xl font-semibold mt-4">Total Waste</h2>
        <p className="text-3xl font-bold text-red-500">${totalWaste.toFixed(2)}</p>

        <h2 className="text-xl font-semibold mt-4">Remaining Balance</h2>
        <p
          className={`text-3xl font-bold ${
            remaining >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          ${remaining.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default FinanceComponent;
