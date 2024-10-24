// src/App.jsx
import { useState } from 'react';
import Timer from './Components/Timer/Timer';
import TodoList from './Components/TodoList/TodoList';

const App = () => {
  const [selectedTodoId, setSelectedTodoId] = useState(null);


  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <Timer todoId={"fdsfs"} />
      <TodoList 
        onSelectTodo={setSelectedTodoId} 
      />
    </div>
  );
};

export default App;
