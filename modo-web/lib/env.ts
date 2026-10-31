import { z } from "zod"

const envSchema = z.object({
  // Database
  VIRGA_DATABASE_URL: z
    .string()
    .min(1, "VIRGA_DATABASE_URL is required")
    .default(process.env.VIRGA_DATABASE_URL || process.env.MODO_DATABASE_URL || process.env.MONGODB_URI || "mongodb://localhost:27017/virga"),

  // Authentication
  AUTH_SECRET: z
    .string()
    .min(16, "AUTH_SECRET must be at least 16 characters")
    .default(process.env.NEXTAUTH_SECRET || "development-secret-key-at-least-32-chars-long"),
  AUTH_URL: z.string().optional().default(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  // Site
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Optional 3rd party providers
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),
  MAIL_FROM: z.string().default("Virga <concierge@virga.store>"),

  LLM_API_KEY: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

function getEnv(): Env {
  const result = envSchema.safeParse({
    VIRGA_DATABASE_URL: process.env.VIRGA_DATABASE_URL || process.env.MODO_DATABASE_URL || process.env.MONGODB_URI,
    AUTH_SECRET: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL || process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MAIL_FROM: process.env.MAIL_FROM,
    LLM_API_KEY: process.env.LLM_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
  })

  if (!result.success) {
    const formatted = result.error.format()
    console.error("❌ Invalid environment variables:", JSON.stringify(formatted, null, 2))
    throw new Error("Invalid environment configuration. Check your .env file against .env.example")
  }

  return result.data
}

export const env = getEnv()
