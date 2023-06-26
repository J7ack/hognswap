const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/userController');

router.post('/hognswap/userInfo', registerUser);

module.exports = router;