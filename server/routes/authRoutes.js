const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/userController');

router.post('/hognswap/userInfo', registerUser);
router.post('/hognswap/login', loginUser);

module.exports = router;