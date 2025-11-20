import React from 'react';
import './Navbar.css';
import Logo from '../../Assests/weblogo.PNG';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation } from "react-router-dom";

const Navbar = ({ toggleMenu, isMenuOpen }) => {
  const handlereload =()=>{
    window.location.reload(); // Reloads the page

  }
   const location = useLocation();

  // pages where toggle should be hidden
  const hideToggleOn = ["/login", "/register", "/setup","/"];

  const shouldHide = hideToggleOn.includes(location.pathname);
  return (
    <div className="nav">
      {/* Hamburger on the left (only visible on mobile via CSS) */}
      <div className={`menu-toggle ${shouldHide ? "hidden-toggle" : ""}`} onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes className='icon2' size={28} /> : <FaBars className='icon2' size={28} />}
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
