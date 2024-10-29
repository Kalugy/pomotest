import { NavLink } from 'react-router-dom';

function Navbar() {

  return (
    <nav className='p-2 bg-gray-800 absolute font-semibold underline cursor-pointer'>
      <NavLink to="/" className='mx-2 '>
        Home
      </NavLink>
      <NavLink to="/about" className='mx-2 '>
        About
      </NavLink>
      
      <NavLink to="/calendar" className='mx-2 '>
        Calendar
      </NavLink>
      
      <NavLink to="/timer" className='mx-2 '>
        Timer
      </NavLink>
      {/* <NavLink to="/schedule" className='mx-2 '>
        Schedule
      </NavLink> */}
      <NavLink to="/schedule2" className='mx-2 '>
        Schedule2
      </NavLink>
      {/* <NavLink to="/finance" className='mx-2 '>
        Finance
      </NavLink> */}
      <NavLink to="/finance2" className='mx-2 '>
        Finance2
      </NavLink>
      <NavLink to="/habit" className='mx-2 '>
        Habit
      </NavLink>
    </nav>
  );
}

export default Navbar;
