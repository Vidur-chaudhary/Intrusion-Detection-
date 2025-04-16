import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Importing CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Attack Analysis</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dataset">Dataset</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
