import mongoose from "mongoose"

const VIRGA_DATABASE_URL =
  process.env.VIRGA_DATABASE_URL ||
  process.env.MODO_DATABASE_URL ||
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/virga"

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var __virgaMongoose: MongooseCache | undefined
}

const cached: MongooseCache = globalThis.__virgaMongoose ?? { conn: null, promise: null }

if (!globalThis.__virgaMongoose) {
  globalThis.__virgaMongoose = cached
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      dbName: process.env.VIRGA_DATABASE_URL ? "virga" : (process.env.MODO_DATABASE_URL ? "modo" : "virga"),
    }

    cached.promise = mongoose.connect(VIRGA_DATABASE_URL, opts).then((m) => m)
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }

  return cached.conn
}

export default dbConnect

