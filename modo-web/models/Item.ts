import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IOption {
  _id?: mongoose.Types.ObjectId
  label: string
  size?: string
  color?: string
  sku: string
  price: number
  listPrice?: number
  stock: number
  isEnabled: boolean
}

export interface IGalleryItem {
  src: string
  alt?: string
  isCover?: boolean
}

export interface IItem extends Omit<Document, "collection"> {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  description: string
  summary?: string
  gallery: IGalleryItem[]
  collection?: mongoose.Types.ObjectId
  subCollection?: mongoose.Types.ObjectId
  price: number
  listPrice?: number
  options: IOption[]
  labels: string[]
  details: Array<{ label: string; value: string }>
  stock: number
  ratingStats: { avg: number; total: number }
  salesStats: { units: number; revenue: number }
  meta?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
  }
  state: "draft" | "live" | "paused" | "sold-out"
  spotlight: boolean
  isFresh: boolean
  isOffer: boolean
  shipWeight?: number
  packSize?: {
    length?: number
    width?: number
    height?: number
  }
  addedAt: Date
  modifiedAt: Date

  // Virtuals
  onOffer: boolean
  discountPct: number
  coverImage: string
}

const OptionSchema = new Schema<IOption>(
  {
    label: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    sku: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    listPrice: { type: Number, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    isEnabled: { type: Boolean, default: true },
  },
  { _id: true }
)

const ItemSchema = new Schema<IItem>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    summary: { type: String, trim: true },
    gallery: [
      {
        src: { type: String, required: true },
        alt: { type: String, default: "" },
        isCover: { type: Boolean, default: false },
      },
    ],
    collection: { type: Schema.Types.ObjectId, ref: "Collection" },
    subCollection: { type: Schema.Types.ObjectId, ref: "Collection" },
    price: { type: Number, required: true, min: 0 },
    listPrice: { type: Number, min: 0 },
    options: [OptionSchema],
    labels: [{ type: String, trim: true }],
    details: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    stock: { type: Number, default: 0, min: 0 },
    ratingStats: {
      avg: { type: Number, default: 0, min: 0, max: 5 },
      total: { type: Number, default: 0, min: 0 },
    },
    salesStats: {
      units: { type: Number, default: 0, min: 0 },
      revenue: { type: Number, default: 0, min: 0 },
    },
    meta: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      metaKeywords: [{ type: String }],
    },
    state: {
      type: String,
      enum: ["draft", "live", "paused", "sold-out"],
      default: "draft",
    },
    spotlight: { type: Boolean, default: false },
    isFresh: { type: Boolean, default: false },
    isOffer: { type: Boolean, default: false },
    shipWeight: { type: Number },
    packSize: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    suppressReservedKeysWarning: true,
  }
)

// Virtual: onOffer
ItemSchema.virtual("onOffer").get(function (this: IItem) {
  return typeof this.listPrice === "number" && this.listPrice > this.price
})

// Virtual: discountPct
ItemSchema.virtual("discountPct").get(function (this: IItem) {
  if (!this.listPrice || this.listPrice <= this.price) return 0
  return Math.round(((this.listPrice - this.price) / this.listPrice) * 100)
})

// Virtual: coverImage
ItemSchema.virtual("coverImage").get(function (this: IItem) {
  if (!this.gallery || this.gallery.length === 0) return ""
  const cover = this.gallery.find((g) => g.isCover)
  return cover ? cover.src : this.gallery[0].src
})

// Pre-save hook: auto sold-out state when stock is 0
ItemSchema.pre("save", function (next) {
  if (this.stock === 0 && this.state === "live") {
    this.state = "sold-out"
  }
  next()
})

// Indexes
ItemSchema.index({ title: "text", description: "text", labels: "text" })
ItemSchema.index({ collection: 1 })
ItemSchema.index({ state: 1 })
ItemSchema.index({ spotlight: 1 })
ItemSchema.index({ isFresh: 1 })
ItemSchema.index({ isOffer: 1 })
ItemSchema.index({ price: 1 })
ItemSchema.index({ "ratingStats.avg": -1 })
ItemSchema.index({ "salesStats.units": -1 })
ItemSchema.index({ addedAt: -1 })

const Item: Model<IItem> = mongoose.models.Item ?? mongoose.model<IItem>("Item", ItemSchema)

export default Item
