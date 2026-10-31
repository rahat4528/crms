import { z } from "zod"

export const JournalEntrySchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().min(5),
  body: z.string().min(10),
  coverImage: z.string().url().optional(),
  labels: z.array(z.string()).default([]),
  author: z
    .object({
      name: z.string().default("Modo Editorial"),
      avatar: z.string().optional(),
    })
    .default({ name: "Modo Editorial" }),
  linkedItems: z.array(z.string()).default([]),
  readingMinutes: z.number().int().min(1).default(3),
  publishedAt: z.string().optional(),
  state: z.enum(["draft", "published", "scheduled"]).default("published"),
})

export type JournalEntryInput = z.infer<typeof JournalEntrySchema>

export interface JournalEntryDto {
  _id: string
  title: string
  slug: string
  excerpt: string
  body: string
  coverImage?: string
  labels: string[]
  author: {
    name: string
    avatar?: string
  }
  linkedItems?: Array<{
    _id: string
    title: string
    slug: string
    price: number
    coverImage?: string
  }>
  readingMinutes: number
  publishedAt: string
  state: "draft" | "published" | "scheduled"
  addedAt: string
  modifiedAt: string
}

export interface LookDto {
  _id: string
  title: string
  slug: string
  season?: string
  cover: string
  hotspots: Array<{
    x: number
    y: number
    itemId: string
    item?: {
      _id: string
      title: string
      slug: string
      price: number
      coverImage?: string
    }
    note?: string
  }>
  publishedAt: string
  state: "draft" | "published"
}

