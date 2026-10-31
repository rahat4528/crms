import { z } from "zod"
import type { ItemDto } from "./item"

export const HomeBlockFormSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  heading: z.string().min(2),
  blurb: z.string().optional(),
  kind: z.enum([
    "spotlight",
    "fresh-drops",
    "top-sellers",
    "on-offer",
    "trending",
    "picked-for-you",
  ]),
  picking: z.object({
    mode: z.enum(["manual", "auto"]),
    itemIds: z.array(z.string()).default([]),
    rules: z
      .object({
        collection: z.string().optional(),
        labels: z.array(z.string()).default([]),
        sort: z.enum(["newest", "price-asc", "price-desc", "top-rated", "best-selling"]).default("newest"),
        limit: z.number().int().min(1).max(24).default(8),
      })
      .optional(),
  }),
  display: z.object({
    showHeading: z.boolean().default(true),
    showBlurb: z.boolean().default(true),
    showPrice: z.boolean().default(true),
    showRating: z.boolean().default(true),
    layout: z.enum(["grid", "slider"]).default("grid"),
    columns: z.number().int().min(1).max(6).default(4),
  }),
  position: z.number().int().default(0),
  isLive: z.boolean().default(true),
})

export type HomeBlockFormInput = z.infer<typeof HomeBlockFormSchema>

export interface HomeBlockDto {
  _id: string
  name: string
  slug: string
  heading: string
  blurb?: string
  kind:
    | "spotlight"
    | "fresh-drops"
    | "top-sellers"
    | "on-offer"
    | "trending"
    | "picked-for-you"
  picking: {
    mode: "manual" | "auto"
    itemIds: string[] | ItemDto[]
    rules?: {
      collection?: string
      labels?: string[]
      sort?: string
      limit?: number
    }
  }
  display: {
    showHeading: boolean
    showBlurb: boolean
    showPrice: boolean
    showRating: boolean
    layout: "grid" | "slider"
    columns: number
  }
  position: number
  isLive: boolean
  items?: ItemDto[]
}

export interface HeroBannerDto {
  _id: string
  headline: string
  subline?: string
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  backdrop: string
  isLive: boolean
}

