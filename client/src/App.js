import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav.jsx';
import './App.css';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Home from './pages/Home';

function App() {

  // const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //   .then(response => response.json())
  //   .then(data => {
  //       setBackendData(data);
  //     });
  // }, []);
  return (
  <div>
    <nav>
      <NavBar />
    </nav>
    <Routes>
      <Route path="/about" element={<Settings />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
  );
}

export default App;
