const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');

// Add new item to the collection
router.post('/hognswap/itemInfo', itemController.addItem);


module.exports = router;