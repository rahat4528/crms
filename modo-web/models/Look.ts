import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ILookHotspot {
  x: number // percentage
  y: number // percentage
  itemId: mongoose.Types.ObjectId
  note?: string
}

export interface ILook extends Document {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  season?: string
  cover: string
  hotspots: ILookHotspot[]
  publishedAt?: Date
  state: "draft" | "published"
  addedAt: Date
  modifiedAt: Date
}

const LookHotspotSchema = new Schema<ILookHotspot>(
  {
    x: { type: Number, required: true, min: 0, max: 100 },
    y: { type: Number, required: true, min: 0, max: 100 },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    note: { type: String, trim: true },
  },
  { _id: false }
)

const LookSchema = new Schema<ILook>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    season: { type: String, default: "Current Season" },
    cover: { type: String, required: true },
    hotspots: [LookHotspotSchema],
    publishedAt: { type: Date, default: Date.now },
    state: { type: String, enum: ["draft", "published"], default: "published" },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "looks",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

LookSchema.index({ state: 1 })

const Look: Model<ILook> = mongoose.models.Look ?? mongoose.model<ILook>("Look", LookSchema)

export default Look

