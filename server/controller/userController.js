const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const User = require('../models/userModel');

// Registration
async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({ email, password: hashedPassword });

    console.log(newUser);

    // Save new user to DB
    await newUser.save();

    console.log('Registration successful');

    // Send success response
    res.status(201).json({ message: 'Registration Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
}

// Login
async function loginUser(req, res) {
  try{
    const { email, password } = req.body;

    // Find user by email in DB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Compare the provided password with the hashed pass in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { 
      expiresIn: '1h' 
    });

    // Set the token as an HTTP-only cookie
    res.setHeader(
      'Set-Cookie', 
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // expiration time 1 hour
        path: '/',
    }));

    // Return a success response
    res.json({ message: 'Login success!' })
  } catch (error) {
    console.error('Error logging in user: ', error);
    res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = { registerUser, loginUser };