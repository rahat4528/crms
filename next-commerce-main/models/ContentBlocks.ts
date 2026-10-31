import mongoose from 'mongoose';

// Hero section schema - no products, just content
const HeroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  primaryButton: {
    text: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  secondaryButton: {
    text: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Product section schema
const ProductSectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['featured', 'new-arrivals', 'best-sellers', 'on-sale', 'trending', 'recommended'],
    required: true
  },
  // How to determine which products to show
  productSelection: {
    method: {
      type: String,
      enum: ['manual', 'automatic'],
      default: 'automatic'
    },
    // Manual selection
    productIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    // Automatic selection criteria
    criteria: {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
      tags: [String],
      sortBy: {
        type: String,
        enum: ['newest', 'oldest', 'price-low', 'price-high', 'rating', 'popularity', 'sales'],
        default: 'newest'
      },
      limit: {
        type: Number,
        default: 8,
        min: 1,
        max: 50
      }
    }
  },
  displaySettings: {
    showTitle: {
      type: Boolean,
      default: true
    },
    showDescription: {
      type: Boolean,
      default: true
    },
    showPrice: {
      type: Boolean,
      default: true
    },
    showRating: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      enum: ['grid', 'carousel'],
      default: 'grid'
    },
    itemsPerRow: {
      type: Number,
      default: 4,
      min: 1,
      max: 6
    }
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
ProductSectionSchema.index({ type: 1 });
ProductSectionSchema.index({ isActive: 1 });
ProductSectionSchema.index({ sortOrder: 1 });

// Pre-save middleware to generate slug if not provided
ProductSectionSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Export models
export const HeroSection = mongoose.models.HeroSection || mongoose.model('HeroSection', HeroSectionSchema);
export const ProductSection = mongoose.models.ProductSection || mongoose.model('ProductSection', ProductSectionSchema);

export default { HeroSection, ProductSection };