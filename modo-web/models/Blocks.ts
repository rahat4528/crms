import mongoose, { Schema, type Document, type Model } from "mongoose"

// ----------------------------------------------------
// HeroBanner Model (collection `hero_banners`)
// ----------------------------------------------------
export interface IHeroBanner extends Document {
  _id: mongoose.Types.ObjectId
  headline: string
  subline?: string
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  backdrop: string
  isLive: boolean
  addedAt: Date
  modifiedAt: Date
}

const HeroBannerSchema = new Schema<IHeroBanner>(
  {
    headline: { type: String, required: true, trim: true },
    subline: { type: String, trim: true },
    primaryCta: {
      label: { type: String, default: "Explore Collection" },
      href: { type: String, default: "/shop" },
    },
    secondaryCta: {
      label: { type: String, default: "Our Story" },
      href: { type: String, default: "/story" },
    },
    backdrop: { type: String, default: "" },
    isLive: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "hero_banners",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Ensure only one banner is live at a time
HeroBannerSchema.pre("save", async function (next) {
  if (this.isLive) {
    await mongoose.model("HeroBanner").updateMany({ _id: { $ne: this._id } }, { $set: { isLive: false } })
  }
  next()
})

export const HeroBanner: Model<IHeroBanner> =
  mongoose.models.HeroBanner ?? mongoose.model<IHeroBanner>("HeroBanner", HeroBannerSchema)

// ----------------------------------------------------
// HomeBlock Model (collection `home_blocks`)
// ----------------------------------------------------
export type HomeBlockKind =
  | "spotlight"
  | "fresh-drops"
  | "top-sellers"
  | "on-offer"
  | "trending"
  | "picked-for-you"

export interface IHomeBlock extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  heading: string
  blurb?: string
  kind: HomeBlockKind
  picking: {
    mode: "manual" | "auto"
    itemIds: mongoose.Types.ObjectId[]
    rules?: {
      collection?: mongoose.Types.ObjectId
      labels?: string[]
      sort?: "newest" | "price-asc" | "price-desc" | "top-rated" | "best-selling"
      limit?: number
    }
  }
  display: {
    showHeading: boolean
    showBlurb: boolean
    showPrice: boolean
    showRating: boolean
    layout: "grid" | "slider"
    columns: number
  }
  position: number
  isLive: boolean
  addedAt: Date
  modifiedAt: Date
}

const HomeBlockSchema = new Schema<IHomeBlock>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    heading: { type: String, required: true, trim: true },
    blurb: { type: String, trim: true },
    kind: {
      type: String,
      enum: ["spotlight", "fresh-drops", "top-sellers", "on-offer", "trending", "picked-for-you"],
      default: "spotlight",
    },
    picking: {
      mode: { type: String, enum: ["manual", "auto"], default: "auto" },
      itemIds: [{ type: Schema.Types.ObjectId, ref: "Item" }],
      rules: {
        collection: { type: Schema.Types.ObjectId, ref: "Collection" },
        labels: [{ type: String }],
        sort: {
          type: String,
          enum: ["newest", "price-asc", "price-desc", "top-rated", "best-selling"],
          default: "newest",
        },
        limit: { type: Number, default: 8, min: 1, max: 24 },
      },
    },
    display: {
      showHeading: { type: Boolean, default: true },
      showBlurb: { type: Boolean, default: true },
      showPrice: { type: Boolean, default: true },
      showRating: { type: Boolean, default: true },
      layout: { type: String, enum: ["grid", "slider"], default: "grid" },
      columns: { type: Number, default: 4, min: 1, max: 6 },
    },
    position: { type: Number, default: 0 },
    isLive: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "home_blocks",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

HomeBlockSchema.index({ kind: 1 })
HomeBlockSchema.index({ position: 1 })
HomeBlockSchema.index({ isLive: 1 })

export const HomeBlock: Model<IHomeBlock> =
  mongoose.models.HomeBlock ?? mongoose.model<IHomeBlock>("HomeBlock", HomeBlockSchema)

export default HomeBlock

