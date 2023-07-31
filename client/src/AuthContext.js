import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => {},
  token: '',
  setToken: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    setToken(storedToken)
  }, []);

  // Define login function
  const login = (email, token) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setToken(token)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('token', token);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, userEmail, token }}>
      {children}
    </AuthContext.Provider>
  );
};