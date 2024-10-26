// src/App.jsx
import Timer from './Components/Timer/Timer';

const App = () => {
  return (
    <div>
      <div className="h-screen bg-gray-800 text-white flex flex-col gap-1 items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-500">Pomodoro Timer</h1>
        <div>
          <Timer />
        </div>
      </div>

      
    </div>
  );
};

export default App;
