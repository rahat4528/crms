import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IJournalEntry extends Document {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  excerpt: string
  body: string
  coverImage?: string
  labels: string[]
  author: {
    name: string
    avatar?: string
  }
  linkedItems: mongoose.Types.ObjectId[]
  readingMinutes: number
  publishedAt?: Date
  state: "draft" | "published" | "scheduled"
  meta?: {
    metaTitle?: string
    metaDescription?: string
  }
  addedAt: Date
  modifiedAt: Date
}

const JournalEntrySchema = new Schema<IJournalEntry>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    coverImage: { type: String, default: "" },
    labels: [{ type: String, trim: true }],
    author: {
      name: { type: String, default: "Modo Editorial" },
      avatar: { type: String },
    },
    linkedItems: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    readingMinutes: { type: Number, default: 3 },
    publishedAt: { type: Date, default: Date.now },
    state: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "published",
    },
    meta: {
      metaTitle: { type: String },
      metaDescription: { type: String },
    },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "journal_entries",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

JournalEntrySchema.pre("save", function (next) {
  if (this.body && (!this.readingMinutes || this.isModified("body"))) {
    const wordCount = this.body.split(/\s+/).length
    this.readingMinutes = Math.max(1, Math.round(wordCount / 200))
  }
  next()
})

JournalEntrySchema.index({ state: 1, publishedAt: -1 })
JournalEntrySchema.index({ labels: 1 })

const JournalEntry: Model<IJournalEntry> =
  mongoose.models.JournalEntry ?? mongoose.model<IJournalEntry>("JournalEntry", JournalEntrySchema)

export default JournalEntry

