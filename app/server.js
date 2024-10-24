// backend/server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
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
