const mongoose = require('mongoose');

// Create a simple User's schema

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true},

})

const userModel = new mongoose.model('User', userSchema);

module.exports = userModel
