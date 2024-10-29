// src/App.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';

import Timer from './Components/Timer/Timer';
import Calendar from './Components/Calendar/Calendar';
import Navbar from './Components/Navbar'; // Import Navbar
import Schedule from './Components/Schedule/Schedule';

import Schedule2 from './Components/Schedule2/index';
import Index from './Components/Finance/index';
import Index2 from './Components/Finance2/index';
import IndexHabit from './Components/Habit/index';

const App = () => {
  return (
      <Router>
        <Navbar /> {/* Navbar will stay visible on all pages */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule2" element={<Schedule2 />} />
          <Route path="/finance" element={<Index />} />
          <Route path="/finance2" element={<Index2 />} />
          <Route path="/habit" element={<IndexHabit />} />


        </Routes>
      
      </Router>
      
  );
};

export default App;
