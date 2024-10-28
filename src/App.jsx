// src/App.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';

import Timer from './Components/Timer/Timer';
import Calendar from './Components/Calendar/Calendar';
import Navbar from './components/Navbar'; // Import Navbar

const App = () => {
  return (
      <Router>
        <Navbar /> {/* Navbar will stay visible on all pages */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/calendar" element={<Calendar />} />

        </Routes>
      
      </Router>
      
  );
};

export default App;
