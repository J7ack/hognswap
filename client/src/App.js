import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav.jsx';
import './App.css';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Home from './pages/Home';
import LoginReg from './pages/LoginReg.js';
import '../src/index.css'

function App() {
  return (
  <div>
    <nav>
      <NavBar />
    </nav>
    <Routes>
      <Route path="/about" element={<Settings />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      < Route path="/login" element={<LoginReg />} />
    </Routes>
  </div>
  );
}

export default App;
