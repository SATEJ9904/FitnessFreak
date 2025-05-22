// src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="neo-navbar">
      <div className="logo">Fitness<span className="highlight">Pro</span></div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end className="nav-button">BMI Calculator</NavLink>
        </li>
        <li>
          <NavLink to="/dietfoods" className="nav-button">Diet Foods</NavLink>
        </li>
        <li>
          <NavLink to="/workouts" className="nav-button">Workouts</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-button">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
