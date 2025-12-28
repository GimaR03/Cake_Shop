const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0
  },
  weight: {
    type: Number,
    min: 0
  },
  flavours: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String, // Store image URL or path
    default: ''
  },
  categoryName: {
    type: String,
    required: true,
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId or number
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

