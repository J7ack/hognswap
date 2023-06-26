const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  // Field and type definition
  itemName: {type: String, required: true},
  description: { type: String },
});

const item = mongoose.model("Item", itemSchema);

// This model can be imported into the route files // 
module.exports = item;