const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },  
  likedItems: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
  }]
}, { collection: 'userInfo' });

const User = mongoose.model('User', userSchema);

module.exports = User;