const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Registration
async function registerUser(req, res) {
  const { email, password } = req.body;
  console.log("Register");

  try {
    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({ email, hash: hashedPassword, salt: 10 });

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

module.exports = { registerUser };
