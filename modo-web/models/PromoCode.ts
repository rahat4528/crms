import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IPromoCode extends Document {
  _id: mongoose.Types.ObjectId
  code: string
  discountType: "percentage" | "fixed"
  value: number
  minSpend?: number
  maxDiscount?: number
  usageLimit?: number
  usageCount: number
  startsAt?: Date
  expiresAt?: Date
  isActive: boolean
  addedAt: Date
  modifiedAt: Date
}

const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
    value: { type: Number, required: true, min: 0 },
    minSpend: { type: Number, default: 0 },
    maxDiscount: { type: Number },
    usageLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
    startsAt: { type: Date },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "promo_codes",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

PromoCodeSchema.index({ isActive: 1 })

const PromoCode: Model<IPromoCode> =
  mongoose.models.PromoCode ?? mongoose.model<IPromoCode>("PromoCode", PromoCodeSchema)

export default PromoCode

