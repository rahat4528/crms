import mongoose, { Schema, type Document, type Model } from "mongoose"
import bcrypt from "bcryptjs"

export type UserRole = "customer" | "admin"

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password?: string
  role: UserRole
  avatar?: string
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
      select: false, // Never returned by default
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
  },
  { timestamps: true }
)

// Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false
  return bcrypt.compare(candidatePassword, this.password)
}

// Indexes
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ role: 1 })

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema)

export default User

