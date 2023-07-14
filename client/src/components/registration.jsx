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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
      <br></br>
      <br></br>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
    </form>
  );
};

export default RegistrationForm;
