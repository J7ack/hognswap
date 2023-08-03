const User = require('../models/userModel');
const Item = require('../models/itemModel');
const Tag = require('../models/tagModel');
const getUserIdFromToken = require('../utils/getUserIdFromToken');

// Function to handle tags and save them as a tagModel
const handleTags = async (tags) => {
  if (!Array.isArray(tags)) return []; // Return an empty array if tags are not an array

  const tagIds = [];
  for (const tag of tags) {
    if (typeof tag !== 'string') continue; // Skip invalid tags
    const existingTag = await Tag.findOne({ name: tag });
    if (existingTag) {
      tagIds.push(existingTag._id);
    } else {
      const newTag = new Tag({ name: tag });
      const savedTag = await newTag.save();
      tagIds.push(savedTag._id);
    }
  }
  console.log('Tag IDs: ', tagIds);

  return tagIds;
}

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to get the items' });
  }
}

exports.getUserItems = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const userItems = await Item.find({ userEmail: userEmail });

    if (userItems.length === 0) {
      return res.status(200).json({ message: 'No items found under this user' });
    }

    console.log("Returned items: ", userItems);
    return res.status(200).json(userItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while trying to get the user items' });
  }
};


// Creating/Uploading an item
exports.addItem = async (req, res) => {
  try {
    // Extract info
    const { itemName, category, condition } = req.body;

    // Check if tags exist before parsing
    let tags;
    if (req.body.tags) {
      tags = JSON.parse(req.body.tags);
    } else {
      return res.status(400).json({ error: "No tags provided." });
    }

    // Picture uploading
    let pictures;
    if (req.files) {
      pictures = req.files.map(file => file.buffer.toString('base64'));
    } else {
      return res.status(400).json({ error: "No pictures provided." });
    }

    // Field validation
    const requiredFields = ['itemName', 'category', 'condition'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0 || tags.length === 0 || !req.files) {
      return res.status(400).json({ error: `Please provide all required item details. Missing fields: ${missingFields.join(', ')}` })
    }

    // Handle tags and get tagIds
    const tagIds = await handleTags(tags);

    // Extract token from cookies
    const token = req.cookies.token;
    console.log(token)

    // Get user ID from token
    const userId = getUserIdFromToken(token);

    // Find the user
    const user = await User.findById(userId);

    console.log('USER!!!: ', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new item with the extracted information
    const newItem = new Item({
      itemName,
      category,
      condition,
      tags: tagIds,
      pictures: pictures,
      userEmail: user.email,
    });

    console.log('New Item: ', newItem);

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

// Item 'liking'
exports.likeItem = async (req, res) => {
  try {
    // Tests
    console.log('Authorization header:', req.headers['authorization']);


    const { itemId } = req.body;

    token = req.cookies.token;

    console.log('Token:', token);

    const userId = getUserIdFromToken(token);

    console.log('User ID:', userId);

    console.log(userId);

    console.log('userId:', userId);

    // Get the user from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the item exists in the database
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Add item to user's likedItems
    user.likedItems.push(item);
    await user.save();

    // Respond with success
    res.status(200).json({ message: 'Item liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to like the item' });
  }
}
