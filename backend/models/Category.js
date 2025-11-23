import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  size: { 
    type: String, 
    required: [true, 'Size name is required'],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, 'Size price is required'],
    min: [0, 'Price cannot be negative']
  }
});

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Category name is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Category description is required'] 
  },
  image: { 
    type: String, 
    required: [true, 'Category image is required'] 
  },
  basePrice: { 
    type: Number, 
    required: [true, 'Base price is required'],
    min: [0, 'Base price cannot be negative']
  },
  sizes: [sizeSchema],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update updatedAt before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Category', categorySchema);