import React, { useState } from "react";
import "./assets/Header.css";
import logo from "./assets/logo.jpg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="#" className="navbar-brand">
            <img src={logo} alt="Logo" className="logo" />
          </a>
        </div>

        {/* Hamburger Icon */}
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-nav ${menuOpen ? "open" : ""}`}>
          <li><a href="http://www.medsupervision.in/" className="active">Home</a></li>
          <li><a href="http://www.medsupervision.in/about-us">About Us</a></li>
          <li><a href="http://www.medsupervision.in/loginExpert">Expert</a></li>
          <li><a href="http://www.medsupervision.in/login">Patient</a></li>
          <li><a href="http://www.medsupervision.in/health-care">Blogs</a></li>
          <li className="login-mobile"><a href="http://www.medsupervision.in/login" className="login-btn">LOGIN / SIGNUP</a></li>
        </ul>

        {/* Desktop Login Button (hidden on mobile) */}
        <div className="navbar-right">
          <a href="http://www.medsupervision.in/login" className="login-btn">LOGIN / SIGNUP</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
