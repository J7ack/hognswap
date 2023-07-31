// App.js
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from './components/nav.jsx';
import './App.css';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Home from './pages/Home';
import LoginReg from './pages/LoginReg.js';
import '../src/index.css';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);

  const checkIsAuthenticated = async () => {
    // Retrieve the token from cookies and localStorage
    const tokenFromCookies = Cookies.get('token');
    const storedToken = localStorage.getItem('token');

    // Check if either token exists
    if (tokenFromCookies || storedToken) {
      setIsAuthenticated(true);
      setToken(tokenFromCookies || storedToken);
    } else {
      setIsAuthenticated(false);
      setToken(null);
    }

    // Retrieve the userEmail from localStorage
    const storedUserEmail = localStorage.getItem('userEmail');
    if(storedUserEmail && storedUserEmail !== 'null') {
      setUserEmail(storedUserEmail);
    }
  };

  const login = async (email, tokenFromServer) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setToken(tokenFromServer);
    Cookies.set('token', tokenFromServer);
    Cookies.set('userEmail', email);
    // Call checkIsAuthenticated to validate and update the auth state
    checkIsAuthenticated();
  }

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userEmail, login, token, setToken }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/about" element={isAuthenticated ? <Settings /> : <Navigate to="/login" replace />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginReg />} />
        </Routes>
      </Router>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  return (
    <AuthProvider />
  );
}

export default App;
