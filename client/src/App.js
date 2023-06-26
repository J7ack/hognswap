import React, { useEffect, useState } from 'react';
import Navbar from './components/nav';
import RegistrationForm from './components/registration.jsx'
import './App.css';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, [])
  return (
  <>
    <Navbar />
    <RegistrationForm />
  </>
  );
}

export default App;
