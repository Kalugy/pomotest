// src/TodoList.jsx
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Fetch todos from the backend on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const saveTodos = async (updatedTodos) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodos),
      });
      if (response.ok) {
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTask = () => {
    if (task.trim()) {
      const newTodo = { text: task, id: Date.now() };
      const updatedTodos = [...todos, newTodo];
      saveTodos(updatedTodos);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <button onClick={() => deleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
