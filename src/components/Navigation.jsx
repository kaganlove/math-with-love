import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Free Lessons", path: "/curriculum" },
    { name: "Private Tutoring", path: "/tutoring" },
    { name: "Resources", path: "/resources" },
    { name: "Contact & Book", path: "/contact" }
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <span className="logo-text">Math with</span>
          <Heart className="logo-icon animate-pulse" />
          <span className="logo-text-accent">Love</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="nav-menu-mobile">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link-mobile ${isActive(item.path) ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
