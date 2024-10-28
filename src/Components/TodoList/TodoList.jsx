// src/TodoList.jsx
import { useState, useEffect } from 'react';
import DeleteIcon from '../../assets/icons/DeleteIcon';
const API_URL = 'http://localhost:3001/todos';

const TodoList = ({setSelectedOption}) => {
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
      const newTodo = { text: task, id: Date.now(), counterTask: 0 };
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
    <div className="flex flex-col justify-center gap-1">
        <h1 className="text-4xl font-bold text-blue-500">To-Do</h1>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="input"
          />
          <button onClick={addTask} className='primary mb-4'>Add</button>
        </div>
        <ul className="flex flex-col justify-left items-left align-middle">
          {todos.map((todo) => (
            <li key={todo.id} className="relative flex-row items-center align-middle rounded-lg shadow-lg mb-2 bg-slate-700">
              <div 
                className="absolute top-2 right-2 ml-2 mb-3 cursor-pointer" 
                onClick={() => deleteTask(todo.id)}
              >
                <DeleteIcon 
                  size={12}
                  color={'#ef4444'}
                />
              </div>

              <div className="flex items-center m-4">
                <input
                  type="radio"
                  id={todo.id}
                  name="mode"
                  value={todo}
                  //checked={selectedOption === 'name'}
                  onChange={(e) => setSelectedOption(todo)}
                  className="radio-input"
                />
                <label htmlFor="name" className='ml-2' >
                  <p className='font-semibold'>{todo.text} </p>
                  
                </label>
              </div>
              
              
            </li>
          ))}
        </ul>
    </div>
  );
};

export default TodoList;
