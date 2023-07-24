const express = require('express');
const router = express.Router();

// File storage (for pictures)
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const itemController = require('../controller/itemController');

// Add new item to the collection
router.post('/hognswap/itemInfo', upload.array('pictures', 5), itemController.addItem);


module.exports = router;