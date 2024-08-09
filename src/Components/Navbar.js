import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Falls du CSS in einer separaten Datei hast

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <img src="/image/logo.png" alt="Logo" /> {/* Passe den Pfad an, falls notwendig */}
      </Link>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={menuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/partner" onClick={toggleMenu}>Partner</Link></li>
        <li><Link to="/portrait" onClick={toggleMenu}>Portrait</Link></li>
        <li><Link to="/gallerie" onClick={toggleMenu}>Gallerie</Link></li>
        <li><Link to="/agenda" onClick={toggleMenu}>Agenda</Link></li>
        <li><Link to="/Login" onClick={toggleMenu}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;