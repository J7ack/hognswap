const express = require('express');
const itemController = require('../controller/itemController');
const router = express.Router();


// File storage (for pictures)
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Get all items from the collection
router.get('/hognswap/itemInfo', itemController.getAllItems);


// Add new item to the collection
router.post('/hognswap/itemInfo', upload.array('pictures', 5), itemController.addItem);


// Have user 'like' an item
router.post('/hognswap/like', itemController.likeItem);


// Check user has items uploaded
router.get('/hognswap/itemInfo/:userEmail', itemController.getUserItems);

module.exports = router;