
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        {/* Logo and Store Name */}
        <div className="navbar-brand">
          <img src="/img/logo.png" alt="Jake Store Logo" className="navbar-logo" />
          <span className="store-name">JAKE STORE</span>
        </div>

        {/* Navigation Links - Only show on customer pages */}
        {!isAdminRoute && (
          <div className="navbar-links">
            <Link to="/" className="nav-link">Categories</Link>
            <Link to="/products" className="nav-link">Products</Link>
          </div>
        )}

        {/* Right side - Search and Admin/User */}
        <div className="navbar-right">
          {/* Only show search bar on customer pages */}
          {!isAdminRoute && (
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search..." className="search-input-nav" />
            </div>
          )}
          
          {/* Show "User" on admin pages, "Admin" on customer pages */}
          <Link to={isAdminRoute ? "/" : "/admin"} className="admin-link">
            <div className="admin-icon">👤</div>
            <span>{isAdminRoute ? "User" : "Admin"}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;