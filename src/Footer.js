import React from "react";
import "./assets/Footer.css"; // Import your CSS file for styling
import footerLogo from "./assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section about">
          <img src={footerLogo} alt="Footer Logo" className="footer-logo" />
          <p>Connect with us on social media using the links below.</p>
          <div className="social-links">
            <a href="http://www.medsupervision.in/comingSoon"><i className="fab fa-facebook-f" /></a>
            <a href="http://www.medsupervision.in/comingSoon"><i className="fab fa-twitter" /></a>
            <a href="http://www.medsupervision.in/comingSoon"><i className="fab fa-linkedin-in" /></a>
            <a href="http://www.medsupervision.in/comingSoon"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>For Patients</h4>
          <ul>
            <li><a href="http://www.medsupervision.in/comingSoon">Search for Experts</a></li>
            <li><a href="http://www.medsupervision.in/login">Login</a></li>
            <li><a href="http://www.medsupervision.in/register">Register</a></li>
            <li><a href="http://www.medsupervision.in/comingSoon">Booking</a></li>
            <li><a href="http://www.medsupervision.in/login">Patient Dashboard</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>For Experts</h4>
          <ul>
            <li><a href="http://www.medsupervision.in/comingSoon">Appointments</a></li>
            <li><a href="http://www.medsupervision.in/comingSoon">Chat</a></li>
            <li><a href="http://www.medsupervision.in/login">Login</a></li>
            <li><a href="http://www.medsupervision.in/register">Register</a></li>
            <li><a href="http://www.medsupervision.in/loginExpert">Expert Dashboard</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><i className="fas fa-phone-alt" /> +91 8368143240</p>
          <p><i className="fas fa-envelope" /> medsupervision@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2020 Medsupervision. All rights reserved.</p>
        <div>
          <a href="http://www.medsupervision.in/terms-and-conditions">Terms and Conditions</a> | <a href="http://www.medsupervision.in/privacy-policy">Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;