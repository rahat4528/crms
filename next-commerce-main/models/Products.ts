import mongoose, { InferSchemaType } from 'mongoose';

// Product variant schema for size/color combinations
const VariantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  sku: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  inventory: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Main Product schema
const ProductSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      trim: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  variants: [VariantSchema],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  specifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }],
  inventory: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  sales: {
    count: {
      type: Number,
      min: 0,
      default: 0
    },
    revenue: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  seo: {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'out-of-stock'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isSale: {
    type: Boolean,
    default: false
  },
  weight: {
    type: Number,
    min: 0
  },
  dimensions: {
    length: {
      type: Number,
      min: 0
    },
    width: {
      type: Number,
      min: 0
    },
    height: {
      type: Number,
      min: 0
    }
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

// Indexes (removed name and slug indexes as they're handled by unique constraints)
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ subcategory: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ isNew: 1 });
ProductSchema.index({ isSale: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ 'rating.average': -1 });
ProductSchema.index({ 'sales.count': -1 });
ProductSchema.index({ createdAt: -1 });

// Pre-save middleware to generate slug if not provided
ProductSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Virtual for checking if product is on sale
ProductSchema.virtual('onSale').get(function() {
  return this.originalPrice && this.originalPrice > this.price;
});

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for primary image
ProductSchema.virtual('primaryImage').get(function() {
  const primary = this.images?.find(img => img.isPrimary);
  return primary || this.images?.[0];
});

// Export models
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export type ProductType = InferSchemaType<typeof ProductSchema>;

export default { Product };