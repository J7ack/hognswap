const jwt = require('jsonwebtoken');
const secret = 'the_secret_key';

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    console.log('Decoded token: ', decoded);
    // Extract user's ID
    return decoded.userId;

  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
      console.error('Error decoding token: Token is expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error('Error decoding token: JWT is malformed');
    } else {
      console.error('Error decoding token');
    }

    return null;
  }
};

module.exports = getUserIdFromToken;
