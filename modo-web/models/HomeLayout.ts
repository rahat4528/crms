import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IHomeSection {
  type: "hero" | "block" | "collection-showcase" | "journal-strip"
  referenceId?: mongoose.Types.ObjectId
  position: number
  isVisible: boolean
}

export interface IHomeLayout extends Document {
  _id: mongoose.Types.ObjectId
  sections: IHomeSection[]
  addedAt: Date
  modifiedAt: Date
}

const HomeSectionSchema = new Schema<IHomeSection>(
  {
    type: {
      type: String,
      enum: ["hero", "block", "collection-showcase", "journal-strip"],
      required: true,
    },
    referenceId: { type: Schema.Types.ObjectId },
    position: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { _id: false }
)

const HomeLayoutSchema = new Schema<IHomeLayout>(
  {
    sections: [HomeSectionSchema],
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "home_layouts",
  }
)

const HomeLayout: Model<IHomeLayout> =
  mongoose.models.HomeLayout ?? mongoose.model<IHomeLayout>("HomeLayout", HomeLayoutSchema)

export default HomeLayout

