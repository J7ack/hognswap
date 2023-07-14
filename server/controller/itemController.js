const Item = require('../models/itemModel');
const mongoose = require('mongoose');

// Creating/Uploading an item
exports.addItem = async (req, res) => {
  try {
    // Extract info
    const { itemName, category, condition, tags } = req.body;

    // Field validation
    if (!itemName || !category || !condition || !tags) {
      return res.status(400).json({ error: 'Please provide all required item details' })
    }

    // Save item to the DB

    // tagIds stores converted ObjectId values
    let tagIds = [];
    if (Array.isArray(tags)) {
      // If tags is an array, iterate over each tag and make it an ObjectId
      tagIds = tags.map((tag) => {
        if (mongoose.Types.ObjectId.isValid(tag)) {
          return mongoose.Types.ObjectId(tag);
        } else {
          return null;
        }
      }).filter(Boolean);
    } else {
      // If tags is single value, convert it to ObjectId
      if (mongoose.Types.ObjectId.isValid(tags)) {
        tagIds = [mongoose.Types.ObjectId(tags)];
      }
    }

    const newItem = new Item({
      itemName,
      category,
      condition,
      tags: tagIds,
    });

    // Check name is valid
    if (typeof newItem.itemName !== 'string' || newItem.itemName.trim() === '') {
      return res.status(400).json({ message: 'Invalid name format' });
    }

    const savedItem = await newItem.save();

    // Check length of item title
    if (newItem.itemName.length > 100) {
      return res.status(400).json({ message: 'Name exceeds maximum length' });
    }

    // Return success res
    res.status(201).json({ message: 'Item submitted successfully', item: savedItem });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to submit the item' })
  }
}
