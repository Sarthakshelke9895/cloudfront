import React from 'react';
import './Navbar.css';
import Logo from '../../Assests/weblogo.PNG';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ toggleMenu, isMenuOpen }) => {
  const handlereload =()=>{
    window.location.reload(); // Reloads the page

  }
  return (
    <div className="nav">
      {/* Hamburger on the left (only visible on mobile via CSS) */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </div>

      {/* Logo and name centered */}
      <div onClick={handlereload} className="img_and_logo">
        <img src={Logo} alt="App Logo" />
        <h1>XanaX</h1>
      </div>
    </div>
  );
};

export default Navbar;
