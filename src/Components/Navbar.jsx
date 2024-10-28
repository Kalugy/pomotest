import { NavLink } from 'react-router-dom';

function Navbar() {
  const activeStyle = { textDecoration: 'underline', fontWeight: 'bold' };

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
    </nav>
  );
}

export default Navbar;
