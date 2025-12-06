const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    min: 0 // Optional for desserts/cupcakes
  },
  flavours: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true // Will store the uploaded file path
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Assuming you have a Category model
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);