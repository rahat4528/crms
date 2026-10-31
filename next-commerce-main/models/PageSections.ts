import mongoose, { InferSchemaType } from 'mongoose';

const PageSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, {
  collection: 'page_sections',
  timestamps: true, // Automatically manage createdAt and updatedAt
});


// Pre-save middleware to update the updatedAt field
PageSectionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.PageSection || mongoose.model('PageSection', PageSectionSchema);
export type PageSectionType = InferSchemaType<typeof PageSectionSchema>;