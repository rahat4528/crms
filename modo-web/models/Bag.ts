import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IBagLine {
  item: mongoose.Types.ObjectId
  optionSku?: string
  qty: number
  addedAt: Date
}

export interface IBag extends Document {
  _id: mongoose.Types.ObjectId
  client?: mongoose.Types.ObjectId
  guestSessionId?: string
  lines: IBagLine[]
  promoCode?: string
  addedAt: Date
  modifiedAt: Date
}

const BagLineSchema = new Schema<IBagLine>(
  {
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    optionSku: { type: String },
    qty: { type: Number, required: true, default: 1, min: 1 },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
)

const BagSchema = new Schema<IBag>(
  {
    client: { type: Schema.Types.ObjectId, ref: "User" },
    guestSessionId: { type: String },
    lines: [BagLineSchema],
    promoCode: { type: String },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "bags",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

BagSchema.index({ client: 1 })
BagSchema.index({ guestSessionId: 1 })

const Bag: Model<IBag> = mongoose.models.Bag ?? mongoose.model<IBag>("Bag", BagSchema)

export default Bag

