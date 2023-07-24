import React, { useState } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/hognswap/userInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Registration Successful');

        // Reset form fields
        setEmail('');
        setPassword('');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error: ', error);
    }
  };

  const handleLike = () => {
    console.log('Liked!');
  }

  const handleDislike = () => {
    console.log('Disliked!');
  }

  return (
    <div className="container">
      <form className="form-group" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label className='form-label'htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            className='form-input'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className='form-label' htmlFor="password">Password:</label>
          <input
            type="password"
            id="password" className='form-input' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='form-button' >Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
