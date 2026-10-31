import mongoose from "mongoose"

const MODO_DATABASE_URL =
  process.env.MODO_DATABASE_URL ||
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/modo"

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var __modoMongoose: MongooseCache | undefined
}

const cached: MongooseCache = globalThis.__modoMongoose ?? { conn: null, promise: null }

if (!globalThis.__modoMongoose) {
  globalThis.__modoMongoose = cached
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      dbName: "modo",
    }

    cached.promise = mongoose.connect(MODO_DATABASE_URL, opts).then((m) => m)
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

