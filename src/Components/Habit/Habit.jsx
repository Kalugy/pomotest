// src/components/FinanceComponent.jsx

import React, { useState, useEffect } from 'react';

const FinanceComponent = () => {
  const initialCategories = [
    { name: 'Monthly Salary', amount: 1000, isIncome: true },
    { name: 'Service Water', amount: 120, isIncome: false },
    { name: 'Service Energy', amount: 100, isIncome: false },
    { name: 'Service Network', amount: 50, isIncome: false },
    { name: 'Service Gas', amount: 200, isIncome: false },
    { name: 'Food', amount: 200, isIncome: false },
    { name: 'Entertainment Netflix', amount: 15, isIncome: false },
  ];

  const [totalIncome, setTotalIncome] = useState(1000);
  const [totalWaste, setTotalWaste] = useState(685);
  const [remaining, setRemaining] = useState(315);

  const [categories, setCategories] = useState(initialCategories);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // New state for filter
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newCategory, setNewCategory] = useState({ name: '', amount: '', isIncome: false });


  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    handleSearchAndFilter();
    updateTotals(categories);
  }, [categories, searchTerm, filterType, sortConfig, currentPage, rowsPerPage]);

  const updateTotals = (categoriesList) => {
    const income = categoriesList
      .filter((cat) => cat.isIncome)
      .reduce((acc, cat) => acc + cat.amount, 0);

    const waste = categoriesList
      .filter((cat) => !cat.isIncome)
      .reduce((acc, cat) => acc + cat.amount, 0);

    setTotalIncome(income);
    setTotalWaste(waste);
    setRemainingBalance(income - waste);
  };

  const handleSearchAndFilter = () => {
    let filtered = categories.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === 'all' || (filterType === 'income' ? cat.isIncome : !cat.isIncome);
      return matchesSearch && matchesFilter;
    });

    if (sortConfig.key === 'amount') {
      filtered = filtered.sort((a, b) =>
        sortConfig.direction === 'ascending' ? a.amount - b.amount : b.amount - a.amount
      );
    } else if (sortConfig.key === 'type') {
      filtered = filtered.sort((a, b) =>
        a.isIncome === b.isIncome ? 0 : a.isIncome ? -1 : 1
      );
    }

    setFilteredCategories(filtered);
  };

  const addCategory = () => {
    if (newCategory.name && newCategory.amount) {
      const newCat = {
        ...newCategory,
        amount: parseFloat(newCategory.amount),
      };
      setCategories([...categories, newCat]);
      setNewCategory({ name: '', amount: '', isIncome: false }); // Reset form
    }
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const editCategory = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] =
      field === 'amount' ? parseFloat(value) || 0 : value;
    setCategories(updatedCategories);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleRowsPerPageChange = (e) => setRowsPerPage(parseInt(e.target.value, 10));

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md max-w-3xl">
      <h1 className="text-2xl font-bold text-center mb-6">Monthly Finance Tracker</h1>

      <div className="flex flex-row text-center">
        <div className="text-xl font-bold text-green-500">Total Income: ${totalIncome.toFixed(2)}</div>
        <div className="text-xl font-bold text-red-500">Total Waste: ${totalWaste.toFixed(2)}</div>
        <div className="text-xl font-semibold">
         <p
          className={`text-xl font-bold ${
            remaining >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          Remaining Balance: ${remainingBalance.toFixed(2)}
        </p>  
        </div>
        
      </div>



      {/* Search, Filter, and Pagination Controls */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="waste">Waste</option>
        </select>
      </div>

      {/* Category Table */}
      <table className="w-full table-auto bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => requestSort('amount')}
            >
              Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => requestSort('type')}
            >
              Type {sortConfig.key === 'type' ? '⇅' : ''}
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((category, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => editCategory(index, 'name', e.target.value)}
                  className="border border-gray-300 p-1 rounded-lg"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={category.amount}
                  onChange={(e) => editCategory(index, 'amount', e.target.value)}
                  className="border border-gray-300 p-1 rounded-lg w-24"
                />
              </td>
              <td className="px-4 py-2">{category.isIncome ? 'Income' : 'Waste'}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteCategory(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>Rows per page: </label>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(filteredCategories.length / rowsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-2 py-1 rounded-lg ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Add New Category */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newCategory.amount}
          onChange={(e) => setNewCategory({ ...newCategory, amount: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg mb-2 w-full"
        />
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              checked={newCategory.isIncome}
              onChange={() => setNewCategory({ ...newCategory, isIncome: true })}
              className="mr-2"
            />
            Income
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              checked={!newCategory.isIncome}
              onChange={() => setNewCategory({ ...newCategory, isIncome: false })}
              className="mr-2"
            />
            Waste
          </label>
        </div>
        <button
          onClick={addCategory}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default FinanceComponent;
