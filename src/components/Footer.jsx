import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            Math with <Heart className="footer-logo-icon" size={18} /> Love
          </Link>
          <p className="footer-description">
            Expert math tutoring and high-quality educational resources. Building confidence, strengthening skills, and making math make sense.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <Link to="/curriculum" className="footer-link">Free Lessons</Link>
            <Link to="/tutoring" className="footer-link">Private Tutoring</Link>
            <Link to="/classroom" className="footer-link">Online Classroom</Link>
            <Link to="/resources" className="footer-link">Resources</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Contact & Support</h4>
          <div className="footer-contact-info">
            <a href="mailto:mathwlove@gmail.com" className="footer-contact-item">
              <Mail size={16} /> mathwlove@gmail.com
            </a>
            <span className="footer-contact-item">
              <MapPin size={16} /> Wichita Falls, TX, USA
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Math with Love. All rights reserved.
        </p>
        <div className="footer-legal-links">
          <a href="#" className="footer-legal-link">Privacy Policy</a>
          <a href="#" className="footer-legal-link">Terms of Service</a>
          <a href="#" className="footer-legal-link">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
