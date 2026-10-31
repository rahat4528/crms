import type { MetadataRoute } from "next"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import Collection from "@/models/Collection"
import JournalEntry from "@/models/JournalEntry"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://virga.store"

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/lookbook`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/story`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/fit-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/reach-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacy-notice`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/terms-of-use`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ]

  try {
    await dbConnect()
    const [items, collections, articles] = await Promise.all([
      Item.find({ state: "live" }).select("slug modifiedAt").lean(),
      Collection.find({ isVisible: true }).select("slug modifiedAt").lean(),
      JournalEntry.find({ state: "published" }).select("slug modifiedAt").lean(),
    ])

    const itemEntries: MetadataRoute.Sitemap = items.map((item) => ({
      url: `${siteUrl}/shop/${item.slug}`,
      lastModified: item.modifiedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }))

    const collectionEntries: MetadataRoute.Sitemap = collections.map((col) => ({
      url: `${siteUrl}/collections/${col.slug}`,
      lastModified: col.modifiedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }))

    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${siteUrl}/journal/${article.slug}`,
      lastModified: article.modifiedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }))

    return [...staticRoutes, ...itemEntries, ...collectionEntries, ...articleEntries]
  } catch {
    return staticRoutes
  }
}

