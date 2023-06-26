const crypto = require('crypto');

// Hash the password
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

// Validate the password
function validatePassword(password, salt, hash) {
  const hashToValidate = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hashToValidate === hash;
}

module.exports = { hashPassword, validatePassword };