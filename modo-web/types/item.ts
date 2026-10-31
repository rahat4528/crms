import { z } from "zod"

export const ItemOptionSchema = z.object({
  label: z.string().min(1, "Option label is required"),
  size: z.string().optional(),
  color: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(0, "Price must be non-negative"),
  listPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0).default(0),
  isEnabled: z.boolean().default(true),
})

export const ItemGallerySchema = z.object({
  src: z.string().url("Image URL must be valid"),
  alt: z.string().default(""),
  isCover: z.boolean().default(false),
})

export const ItemDetailSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

export const CreateItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  summary: z.string().optional(),
  gallery: z.array(ItemGallerySchema).min(1, "At least one image is required"),
  collection: z.string().optional(),
  subCollection: z.string().optional(),
  price: z.number().min(0, "Price must be non-negative"),
  listPrice: z.number().min(0).optional(),
  options: z.array(ItemOptionSchema).default([]),
  labels: z.array(z.string()).default([]),
  details: z.array(ItemDetailSchema).default([]),
  stock: z.number().int().min(0).default(0),
  state: z.enum(["draft", "live", "paused", "sold-out"]).default("draft"),
  spotlight: z.boolean().default(false),
  isFresh: z.boolean().default(false),
  isOffer: z.boolean().default(false),
  shipWeight: z.number().optional(),
  packSize: z
    .object({
      length: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
  meta: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.array(z.string()).optional(),
    })
    .optional(),
})

export const UpdateItemSchema = CreateItemSchema.partial()

export type CreateItemInput = z.infer<typeof CreateItemSchema>
export type UpdateItemInput = z.infer<typeof UpdateItemSchema>

export interface ItemDto {
  _id: string
  title: string
  slug: string
  description: string
  summary?: string
  gallery: Array<{ src: string; alt?: string; isCover?: boolean }>
  collection?: { _id: string; title: string; slug: string } | string
  subCollection?: { _id: string; title: string; slug: string } | string
  price: number
  listPrice?: number
  options: Array<{
    _id?: string
    label: string
    size?: string
    color?: string
    sku: string
    price: number
    listPrice?: number
    stock: number
    isEnabled: boolean
  }>
  labels: string[]
  details: Array<{ label: string; value: string }>
  stock: number
  ratingStats: { avg: number; total: number }
  salesStats: { units: number; revenue: number }
  meta?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
  }
  state: "draft" | "live" | "paused" | "sold-out"
  spotlight: boolean
  isFresh: boolean
  isOffer: boolean
  onOffer?: boolean
  discountPct?: number
  coverImage?: string
  addedAt: string
  modifiedAt: string
}

