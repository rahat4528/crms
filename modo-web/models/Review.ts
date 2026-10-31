import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId
  item: mongoose.Types.ObjectId
  client?: mongoose.Types.ObjectId
  authorName: string
  rating: number // 1 to 5
  title?: string
  comment: string
  isVerifiedPurchase: boolean
  isApproved: boolean
  helpfulVotes: number
  addedAt: Date
  modifiedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    client: { type: Schema.Types.ObjectId, ref: "User" },
    authorName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    comment: { type: String, required: true, trim: true },
    isVerifiedPurchase: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: true },
    helpfulVotes: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "reviews",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ReviewSchema.index({ item: 1, isApproved: 1 })
ReviewSchema.index({ addedAt: -1 })

const Review: Model<IReview> = mongoose.models.Review ?? mongoose.model<IReview>("Review", ReviewSchema)

export default Review

