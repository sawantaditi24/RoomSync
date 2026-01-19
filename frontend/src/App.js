import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostAvailability from './components/PostAvailability';
import SeekAvailability from './components/SeekAvailability';
import Marketplace from './components/Marketplace';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-availability" element={<PostAvailability />} />
          <Route path="/seek-availability" element={<SeekAvailability />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
