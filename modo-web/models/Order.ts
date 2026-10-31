import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IOrderLine {
  item: mongoose.Types.ObjectId
  option?: {
    sku?: string
    size?: string
    color?: string
    label?: string
  }
  qty: number
  unitPrice: number
  titleSnapshot: string
  imageSnapshot?: string
}

export interface IOrderAddress {
  fullName: string
  street: string
  apartment?: string
  city: string
  state?: string
  postalCode: string
  country: string
  phone?: string
}

export interface IOrderTimeline {
  state: string
  at: Date
  by?: string
  note?: string
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId
  orderNo: string
  client?: mongoose.Types.ObjectId
  email: string
  lines: IOrderLine[]
  totals: {
    subtotal: number
    discount: number
    shipping: number
    tax: number
    total: number
  }
  currency: string
  state: "pending" | "paid" | "packed" | "shipped" | "delivered" | "cancelled" | "refunded"
  payment: {
    provider: string
    intentId?: string
    status: "unpaid" | "processing" | "succeeded" | "failed" | "refunded"
  }
  shipTo: IOrderAddress
  billTo?: IOrderAddress
  timeline: IOrderTimeline[]
  tracking?: {
    carrier?: string
    number?: string
    url?: string
  }
  addedAt: Date
  modifiedAt: Date
}

const OrderLineSchema = new Schema<IOrderLine>(
  {
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    option: {
      sku: String,
      size: String,
      color: String,
      label: String,
    },
    qty: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    titleSnapshot: { type: String, required: true },
    imageSnapshot: { type: String },
  },
  { _id: false }
)

const OrderAddressSchema = new Schema<IOrderAddress>(
  {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "US" },
    phone: { type: String },
  },
  { _id: false }
)

const OrderTimelineSchema = new Schema<IOrderTimeline>(
  {
    state: { type: String, required: true },
    at: { type: Date, default: Date.now },
    by: { type: String, default: "system" },
    note: { type: String },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    orderNo: { type: String, required: true, unique: true },
    client: { type: Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true, lowercase: true, trim: true },
    lines: [OrderLineSchema],
    totals: {
      subtotal: { type: Number, required: true, min: 0 },
      discount: { type: Number, default: 0, min: 0 },
      shipping: { type: Number, default: 0, min: 0 },
      tax: { type: Number, default: 0, min: 0 },
      total: { type: Number, required: true, min: 0 },
    },
    currency: { type: String, default: "USD" },
    state: {
      type: String,
      enum: ["pending", "paid", "packed", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    payment: {
      provider: { type: String, default: "stripe" },
      intentId: { type: String },
      status: {
        type: String,
        enum: ["unpaid", "processing", "succeeded", "failed", "refunded"],
        default: "unpaid",
      },
    },
    shipTo: { type: OrderAddressSchema, required: true },
    billTo: { type: OrderAddressSchema },
    timeline: [OrderTimelineSchema],
    tracking: {
      carrier: { type: String },
      number: { type: String },
      url: { type: String },
    },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
    collection: "orders",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

OrderSchema.index({ client: 1 })
OrderSchema.index({ email: 1 })
OrderSchema.index({ state: 1 })
OrderSchema.index({ addedAt: -1 })

export function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000)
  return `MD-${year}-${randomSixDigits}`
}

const Order: Model<IOrder> = mongoose.models.Order ?? mongoose.model<IOrder>("Order", OrderSchema)

export default Order

