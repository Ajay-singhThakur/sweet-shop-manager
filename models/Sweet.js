const mongoose = require('mongoose');

const SweetSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true },
  // Optional: Add image URL later if needed
});

module.exports = mongoose.model('Sweet', SweetSchema);