import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ICollection extends Document {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  description?: string
  cover?: string
  parent?: mongoose.Types.ObjectId | null
  children: mongoose.Types.ObjectId[]
  isVisible: boolean
  position: number
  metaTitle?: string
  metaDescription?: string
  addedAt: Date
  modifiedAt: Date
}

const CollectionSchema = new Schema<ICollection>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    cover: { type: String, default: "" },
    parent: { type: Schema.Types.ObjectId, ref: "Collection", default: null },
    children: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    isVisible: { type: Boolean, default: true },
    position: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "collections",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

CollectionSchema.index({ parent: 1 })
CollectionSchema.index({ isVisible: 1 })
CollectionSchema.index({ position: 1 })

// Post-save hook to ensure parent keeps its children array in sync
CollectionSchema.post("save", async function (doc) {
  if (doc.parent) {
    await mongoose.model("Collection").findByIdAndUpdate(doc.parent, {
      $addToSet: { children: doc._id },
    })
  }
})

const Collection: Model<ICollection> =
  mongoose.models.Collection ?? mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection

