import mongoose, { Schema, type Document, type Model } from "mongoose"
import bcrypt from "bcryptjs"

export type UserRole = "client" | "staff" | "manager" | "owner" | "admin" | "customer"

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password?: string
  role: UserRole
  avatar?: string
  phone?: string
  addresses?: Array<{
    isDefault?: boolean
    label?: string
    street: string
    city: string
    state?: string
    postalCode: string
    country: string
  }>
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["client", "staff", "manager", "owner", "admin", "customer"],
      default: "client",
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    addresses: [
      {
        isDefault: { type: Boolean, default: false },
        label: { type: String, default: "Home" },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        postalCode: { type: String, required: true },
        country: { type: String, required: true, default: "US" },
      },
    ],
    emailVerified: {
      type: Date,
    },
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false
  return bcrypt.compare(candidatePassword, this.password)
}

UserSchema.index({ role: 1 })

const User: Model<IUser> = mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema)

export default User
