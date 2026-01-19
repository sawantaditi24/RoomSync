import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          RoomSync
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link 
              to="/post-availability" 
              className={`navbar-link ${location.pathname === '/post-availability' ? 'active' : ''}`}
            >
              Post Availability
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/seek-availability" 
              className={`navbar-link ${location.pathname === '/seek-availability' ? 'active' : ''}`}
            >
              Seek Availability
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/marketplace" 
              className={`navbar-link ${location.pathname === '/marketplace' ? 'active' : ''}`}
            >
              Marketplace
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

