import { z } from "zod"

export const CreateOrderSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255).optional(),
  lines: z
    .array(
      z.object({
        itemId: z.string().min(1).max(64),
        optionSku: z.string().max(64).optional(),
        qty: z.number().int().min(1).max(99),
      })
    )
    .min(1, "Order must contain at least one item")
    .max(50, "Order cannot exceed 50 distinct lines"),
  shipTo: z.object({
    fullName: z.string().trim().min(2).max(100),
    street: z.string().trim().min(3).max(200),
    apartment: z.string().trim().max(100).optional(),
    city: z.string().trim().min(2).max(100),
    state: z.string().trim().max(100).optional(),
    postalCode: z.string().trim().min(2).max(20),
    country: z.string().trim().max(50).default("US"),
    phone: z.string().trim().max(30).optional(),
  }),
  billTo: z
    .object({
      fullName: z.string().trim().min(2).max(100),
      street: z.string().trim().min(3).max(200),
      city: z.string().trim().min(2).max(100),
      postalCode: z.string().trim().min(2).max(20),
      country: z.string().trim().max(50).default("US"),
    })
    .optional(),
  paymentProvider: z.string().max(30).default("stripe"),
})

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
