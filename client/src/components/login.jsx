import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form validation
    if (!email || !password) {
      setError('Please enter an email and password');
      return;
    }

    try {
      // Send login request
      const response = await fetch('/api/hognswap/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;       

        // Login Success Message
        setLoginMessage('HOG IS READY TO SWAP!');

        // Reset form fields
        setEmail('');
        setPassword('');
        setError('');
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
