import { z } from "zod"

const envSchema = z.object({
  // Database
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  // Auth
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),
  NEXTAUTH_URL: z.string().url().optional(),

  // Stripe (optional until payment phase)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // App
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Modo"),
})

type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    const messages = Object.entries(errors)
      .map(([key, val]) => `  ${key}: ${val?.join(", ")}`)
      .join("\n")
    throw new Error(`❌ Invalid environment variables:\n${messages}`)
  }

  return parsed.data
}

export const env = validateEnv()

