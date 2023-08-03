const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use((req, res, next) => {
  // Extract the token from the header
  const authHeader = req.headers['authorization'];
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    // If no Bearer token, check cookies
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  console.log('Token received:', token)

  // If there is a token, verify it
  jwt.verify(token, 'the_secret_key', (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    if (!decoded || !decoded.userId) {
      return res.status(403).send({ auth: false, message: 'Invalid token' });
    }
    
    // If token is verified, save to request for use in other routes
    req.userId = decoded.userId;
    next();
  });
});

module.exports = router;
