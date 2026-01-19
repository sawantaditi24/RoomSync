import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to RoomSync</h1>
        <p className="hero-subtitle">Your one-stop solution for finding accommodation, roommates, and essential items at CSULB</p>
        <div className="hero-buttons">
          <Link to="/post-availability" className="hero-button primary">
            Post Availability
          </Link>
          <Link to="/seek-availability" className="hero-button secondary">
            Seek Availability
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🏠</div>
          <h2>Find Accommodation</h2>
          <p>Search for available rooms in Beverly Plaza, Park Avenue, Patio Gardens, and Circles Apartments</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h2>Find Roommates</h2>
          <p>Connect with students who match your preferences for gender, cost, lease term, and more</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛒</div>
          <h2>Marketplace</h2>
          <p>Buy and sell essential student items like lamps, chairs, study tables, and more</p>
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Post or Search</h3>
            <p>Post your availability or search for available accommodations with your preferences</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Filter & Match</h3>
            <p>Use filters to find the perfect match based on gender, cost, lease term, and more</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connect</h3>
            <p>View contact details and reach out to potential roommates or sellers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

