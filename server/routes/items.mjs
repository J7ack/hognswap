import { Router } from "express";
const router = express.Router();

// Add new item to the collection
router.post('/', async (req, res) => {
  try {
    // Retrieve the item details from the request body
    const newItem = req.body;

    // Check all fields are valid
    if (!newItem.name || !newItem.description || !newItem.images) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check name is valid
    if (typeof newItem.name !== 'string' || newItem.name.trim() === '') {
      return res.status(400).json({ message: 'Invalid name format' });
    }
    
    // Check image requirements are met
    if (!Array.isArray(newItem.images) || newItem.images.length < 2) {
      return res.status(400).json({ message: 'Invalid images format' });
    }

    // Save the item to the database
    const savedItem = await db.collection('items').insertOne(newItem);

    // Check length of name and images uploading

    if (newItem.name.length > 100) {
      return res.status(400).json({ message: 'Name exceeds maximum length' });
    }
    
    if (newItem.images.length > 5) {
      return res.status(400).json({ message: 'Too many images' });
    }

    const existingItem = await db.collection('items').findOne({ name: newItem.name });

    if (existingItem) {
      return res.status(409).json({ message: 'Item with the same name already exists' });
    }


    res.status(201).json(savedItem);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating item' });
  }
});


export default Router;