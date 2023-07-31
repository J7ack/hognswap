import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Login = () => {
  // Initialize useHistory hook
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // Form statechange handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Authentication
  const { setIsAuthenticated, login } = useContext(AuthContext);

  // Handle submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form validation
    if (!email || !password) {
      setError('Please enter an email and password');
      return;
    }

    try {
      // Send login request
      const res = await fetch('/api/hognswap/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await res.json();
      console.log('Response from server: ', response);

      if (res.status === 200 || response.message === 'Login success!') {
        // Login Success Message
        setLoginMessage("HOG IS READY TO SWAP!");

        // Store the token in local storage
        localStorage.setItem('token', response.token);

        // Reset form fields
        setEmail('');
        setPassword('');
        setError('');

        // Authenticate
        setIsAuthenticated(true);
        
        // Set the user email and token
        login(email, response.token);  // pass the token here

        // Navigate to homepage after successful login
        navigate('/');
        
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error: ', error);
      setLoginMessage('Email or Password incorrect');
    }
  };

  return (
    <div className='container' >
      <h2>Login</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label className='form-label' >Email:</label>
          <input type="email" className='form-input' value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label className='form-label' >Password:</label>
          <input type="password" className='form-input' value={password} onChange={handlePasswordChange} />
          {loginMessage && <p>{loginMessage}</p>}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className='form-button' >Login</button>
      </form>
    </div>
  );
};

export default Login;