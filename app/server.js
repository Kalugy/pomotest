// backend/server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const dayjs = require('dayjs');

const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const TODOS_FILE = './todos.json';
const SESSIONS_FILE = './sessions.json';

// Middleware
app.use(cors()); // Allow frontend requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Read todos from the JSON file
app.get('/todos', (req, res) => {
  fs.readFile(TODOS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading todos:', err);
      return res.status(500).json({ error: 'Failed to read todos.' });
    }
    res.json(JSON.parse(data || '[]'));
  });
});

// Save a new list of todos to the JSON file
app.post('/todos', (req, res) => {
  const todos = req.body;
  fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), (err) => {
    if (err) {
      console.error('Error writing todos:', err);
      return res.status(500).json({ error: 'Failed to save todos.' });
    }
    res.json({ success: true });
  });
});

// Helper function to read the todos file
const readTodos = () => {
  const data = fs.readFileSync(TODOS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write to the todos file
const writeTodos = (todos) => {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
};

// Endpoint to update the task cycle
app.put('/todos/:id/cycles', (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'start' or 'end'

  const todos = readTodos();
  const task = todos.find((todo) => todo.id === parseInt(id, 10));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Initialize the cycles array if it doesn't exist
  if (!task.cycles) {
    task.cycles = [];
  }

  if (action === 'start') {
    // Start a new cycle by pushing a new object with the startDate
    task.cycles.push({ startDate: dayjs().toISOString() });
  } else if (action === 'end') {
    // Find the last cycle and add an endDate to it
    const lastCycle = task.cycles[task.cycles.length - 1];
    if (lastCycle && !lastCycle.endDate) {
      lastCycle.endDate = dayjs().toISOString();
    } else {
      return res.status(400).json({ message: 'No active cycle to end' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid action' });
  }

  writeTodos(todos);

  res.status(200).json({ message: 'Task cycle updated', task });
});

// Log session data to sessions.json
app.post('/sessions', (req, res) => {
    const session = req.body;
    fs.readFile(SESSIONS_FILE, 'utf8', (err, data) => {
      const sessions = JSON.parse(data || '[]');
      sessions.push(session);
      fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error saving session.' });
        res.json({ success: true });
      });
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
