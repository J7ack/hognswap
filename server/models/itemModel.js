const mongoose = require('mongoose');
const { tagModel } = require('./tagModel')

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String, 
    required: true,
    maxLength: 75,
  },
  category: { 
    type: String,
    required: true
  },
  condition: { 
    type: String,
    required: true 
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  pictures: [{
    type: String,
  }],
  likes: { type: [String], default: [] },
}, {collection: 'itemInfo'});

const Item = mongoose.model('Item', itemSchema);

// This model can be imported into the route files // 
module.exports = Item;