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
    // Grab email and pass from body of request
    const { email, password } = req.body;

    // Find user by email in DB
    const user = await User.findOne({ email });

    // Check for a user email actually exists in DB
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Compare the provided password with the hashed pass in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Return 401 status and msg of invalid creds
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, 'the_secret_key', { 
      expiresIn: '100h' 
    });

    // Message for me debugging
    console.log('Generated token:', token)

    
    const cookieOptions = {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600 * 1000, // expiration time 1 hour
      path: '/',
    };
    
    res.cookie('token', token, cookieOptions);
    

    // COOKIE DUBUGGING
    console.log('Cookie options: ', cookieOptions);

    console.log('Cookies after storing the token: ', req.cookies);

    // Return a success response
    res.json({ message: 'Login success!', token: token });

  } catch (error) {
    console.error('Error logging in user: ', error);
    res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = { registerUser, loginUser };