import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // URL to category image
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  seoTitle: String,
  seoDescription: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'categories',
  timestamps: true, // Automatically manage createdAt and updatedAt
});

// Create indexes for better performance
CategorySchema.index({ parentCategory: 1 });
CategorySchema.index({ isActive: 1 });

// Pre-save middleware to update the updatedAt field
CategorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);