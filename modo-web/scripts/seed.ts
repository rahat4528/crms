import mongoose from "mongoose"
import dbConnect from "../lib/db"
import Item from "../models/Item"
import Collection from "../models/Collection"
import { HeroBanner, HomeBlock } from "../models/Blocks"
import JournalEntry from "../models/JournalEntry"
import Look from "../models/Look"
import User from "../models/User"
import Order, { generateOrderNumber } from "../models/Order"
import Review from "../models/Review"
import PromoCode from "../models/PromoCode"
import bcrypt from "bcryptjs"

const SAMPLE_IMAGES = [
  "/cashmere-cardigan.jpg",
  "/elegant-fashion-atelier.jpg",
  "/elegant-fashion-model-in-minimalist-setting.jpg",
  "/elegant-silk-blouse.jpg",
  "/luxury-cashmere-sweater.png",
  "/luxury-designer-handbag.jpg",
  "/luxury-home-decor-and-furniture.jpg",
  "/minimalist-luxury-watch.jpg",
  "/pearl-necklace.jpg",
  "/premium-leather-loafers.png",
  "/silk-dress-detail-1.jpg",
  "/sophisticated-men-fashion-collection.jpg",
  "/tailored-trousers.jpg",
  "/tailored-wool-blazer.jpg",
]

async function seed() {
  console.log("🌱 Starting Modo database seed...")
  await dbConnect()

  // Clean existing data for idempotency
  await Promise.all([
    Item.deleteMany({}),
    Collection.deleteMany({}),
    HeroBanner.deleteMany({}),
    HomeBlock.deleteMany({}),
    JournalEntry.deleteMany({}),
    Look.deleteMany({}),
    User.deleteMany({}),
    Order.deleteMany({}),
    Review.deleteMany({}),
    PromoCode.deleteMany({}),
  ])

  console.log("🧹 Cleared existing database records.")

  // 1. Seed Users (Demo accounts for client, staff, manager, owner)
  const defaultPassword = await bcrypt.hash("Password123!", 10)

  const owner = await User.create({
    name: "Elena Vance",
    email: "owner@modo.store",
    password: defaultPassword,
    role: "owner",
    phone: "+1 (555) 019-2834",
    addresses: [
      {
        isDefault: true,
        label: "Studio",
        street: "45 Mercer Street, Fl 4",
        city: "New York",
        state: "NY",
        postalCode: "10013",
        country: "US",
      },
    ],
  })

  const staff = await User.create({
    name: "Marcus Thorne",
    email: "staff@modo.store",
    password: defaultPassword,
    role: "staff",
  })

  const client1 = await User.create({
    name: "Sophia Chen",
    email: "sophia@example.com",
    password: defaultPassword,
    role: "client",
    phone: "+1 (555) 349-1120",
    addresses: [
      {
        isDefault: true,
        label: "Apartment",
        street: "740 Park Avenue, Apt 8B",
        city: "New York",
        state: "NY",
        postalCode: "10021",
        country: "US",
      },
    ],
  })

  const client2 = await User.create({
    name: "Julian Rivera",
    email: "julian@example.com",
    password: defaultPassword,
    role: "client",
  })

  console.log("👤 Seeded 4 demo accounts (owner, staff, 2 clients).")

  // 2. Seed Collections (8 collections with nested hierarchy)
  const apparel = await Collection.create({
    title: "Apparel",
    slug: "apparel",
    description: "Tailored silhouettes crafted from virgin wool, washed linen, and organic cotton.",
    cover: "/tailored-wool-blazer.jpg",
    position: 0,
    isVisible: true,
  })

  const knitwear = await Collection.create({
    title: "Knitwear",
    slug: "knitwear",
    description: "Pure Mongolian cashmere and fine-gauge merino knits designed for year-round layering.",
    cover: "/luxury-cashmere-sweater.png",
    parent: apparel._id,
    position: 1,
    isVisible: true,
  })

  const tailoring = await Collection.create({
    title: "Tailoring",
    slug: "tailoring",
    description: "Structured wool blazers and wide-leg trousers built on modern Italian proportions.",
    cover: "/tailored-trousers.jpg",
    parent: apparel._id,
    position: 2,
    isVisible: true,
  })

  const footwear = await Collection.create({
    title: "Footwear",
    slug: "footwear",
    description: "Handcrafted calfskin loafers and architectural mules made in Marche, Italy.",
    cover: "/premium-leather-loafers.png",
    position: 3,
    isVisible: true,
  })

  const leatherGoods = await Collection.create({
    title: "Leather Goods",
    slug: "leather-goods",
    description: "Sculptural handbags and small accessories made from vegetable-tanned Tuscan leather.",
    cover: "/luxury-designer-handbag.jpg",
    position: 4,
    isVisible: true,
  })

  const jewelry = await Collection.create({
    title: "Fine Jewelry",
    slug: "fine-jewelry",
    description: "Recycled 18k solid gold and baroque freshwater pearls shaped into enduring heirlooms.",
    cover: "/pearl-necklace.jpg",
    position: 5,
    isVisible: true,
  })

  const timepieces = await Collection.create({
    title: "Timepieces",
    slug: "timepieces",
    description: "Swiss automatic movements housed in brushed surgical steel with minimal dial geometry.",
    cover: "/minimalist-luxury-watch.jpg",
    position: 6,
    isVisible: true,
  })

  const living = await Collection.create({
    title: "Living & Objects",
    slug: "living-and-objects",
    description: "Hand-thrown stoneware, Belgian linen throws, and brass architectural accents for the home.",
    cover: "/luxury-home-decor-and-furniture.jpg",
    position: 7,
    isVisible: true,
  })

  // Update apparel parent with children
  await Collection.findByIdAndUpdate(apparel._id, {
    children: [knitwear._id, tailoring._id],
  })

  const allCollections = [apparel, knitwear, tailoring, footwear, leatherGoods, jewelry, timepieces, living]
  console.log("📁 Seeded 8 collections with nested sub-collections.")

  // 3. Seed Items (60 realistic catalog items)
  const ITEM_TEMPLATES = [
    { title: "Cashmere Mock-Neck Knit", price: 340, listPrice: 380, col: knitwear, img: "/luxury-cashmere-sweater.png", labels: ["cashmere", "minimal", "core"], spot: true, fresh: true },
    { title: "Relaxed Virgin Wool Blazer", price: 580, listPrice: 650, col: tailoring, img: "/tailored-wool-blazer.jpg", labels: ["wool", "tailoring", "essential"], spot: true, fresh: false },
    { title: "Pleated Wide-Leg Trousers", price: 290, listPrice: 290, col: tailoring, img: "/tailored-trousers.jpg", labels: ["wool", "tailoring"], spot: false, fresh: true },
    { title: "Hand-Stitched Penny Loafer", price: 420, listPrice: 480, col: footwear, img: "/premium-leather-loafers.png", labels: ["leather", "footwear", "artisan"], spot: true, fresh: false },
    { title: "Structured Leather Shoulder Bag", price: 680, listPrice: 750, col: leatherGoods, img: "/luxury-designer-handbag.jpg", labels: ["leather", "accessories"], spot: true, fresh: true },
    { title: "Organic Silk Drape Blouse", price: 280, listPrice: 320, col: apparel, img: "/elegant-silk-blouse.jpg", labels: ["silk", "drape"], spot: false, fresh: false },
    { title: "Baroque Pearl Drop Necklace", price: 310, listPrice: 310, col: jewelry, img: "/pearl-necklace.jpg", labels: ["gold", "pearl", "jewelry"], spot: true, fresh: true },
    { title: "Monochrome Steel Timepiece", price: 890, listPrice: 950, col: timepieces, img: "/minimalist-luxury-watch.jpg", labels: ["watches", "swiss"], spot: true, fresh: false },
    { title: "Chunky Ribbed Cardigan", price: 390, listPrice: 440, col: knitwear, img: "/cashmere-cardigan.jpg", labels: ["cashmere", "knitwear"], spot: false, fresh: true },
    { title: "Architectural Ceramic Vessel", price: 180, listPrice: 180, col: living, img: "/luxury-home-decor-and-furniture.jpg", labels: ["home", "ceramic"], spot: false, fresh: true },
    { title: "Heavyweight Double-Breasted Coat", price: 820, listPrice: 920, col: apparel, img: "/sophisticated-men-fashion-collection.jpg", labels: ["coat", "wool", "winter"], spot: true, fresh: false },
    { title: "Fluid Bias-Cut Silk Dress", price: 460, listPrice: 520, col: apparel, img: "/silk-dress-detail-1.jpg", labels: ["silk", "evening"], spot: false, fresh: true },
  ]

  const seededItems = []
  for (let i = 0; i < 60; i++) {
    const template = ITEM_TEMPLATES[i % ITEM_TEMPLATES.length]
    const variantIndex = Math.floor(i / ITEM_TEMPLATES.length)
    const suffix = variantIndex > 0 ? ` (Edition ${variantIndex + 1})` : ""
    const title = `${template.title}${suffix}`
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    const price = template.price + (variantIndex * 15)
    const listPrice = template.listPrice > template.price ? template.listPrice + (variantIndex * 20) : price

    const item = await Item.create({
      title,
      slug,
      description: `A considered wardrobe foundation, the ${title} balances refined proportion with tactile substance. Designed to age with character through seasonal rotation and everyday wear.`,
      summary: `Considered ${template.title.toLowerCase()} crafted from premium materials with enduring architectural lines.`,
      gallery: [
        { src: template.img, alt: title, isCover: true },
        { src: SAMPLE_IMAGES[(i + 1) % SAMPLE_IMAGES.length], alt: `${title} detail`, isCover: false },
      ],
      collection: template.col._id,
      price,
      listPrice,
      stock: i === 59 ? 0 : 24, // Item 59 is sold-out
      state: i === 59 ? "sold-out" : "live",
      spotlight: template.spot || i % 5 === 0,
      isFresh: template.fresh || i % 4 === 0,
      isOffer: listPrice > price,
      labels: [...template.labels, i % 2 === 0 ? "crafted-in-italy" : "organic"],
      ratingStats: {
        avg: Math.round((4.2 + (i % 8) * 0.1) * 10) / 10,
        total: 12 + (i * 3) % 45,
      },
      salesStats: {
        units: 35 + (i * 7) % 150,
        revenue: (35 + (i * 7) % 150) * price,
      },
      options: [
        { label: "Small", size: "S", sku: `MD-${slug.slice(0, 4).toUpperCase()}-S`, price, listPrice, stock: 8, isEnabled: true },
        { label: "Medium", size: "M", sku: `MD-${slug.slice(0, 4).toUpperCase()}-M`, price, listPrice, stock: 10, isEnabled: true },
        { label: "Large", size: "L", sku: `MD-${slug.slice(0, 4).toUpperCase()}-L`, price, listPrice, stock: 6, isEnabled: true },
      ],
      details: [
        { label: "Composition", value: i % 2 === 0 ? "100% Mongolian Cashmere" : "100% Virgin Wool" },
        { label: "Origin", value: "Crafted in Marche, Italy" },
        { label: "Care", value: "Specialist dry clean only or cold hand wash" },
      ],
      meta: {
        metaTitle: `${title} — Modo`,
        metaDescription: `Discover the ${title}. Crafted from sustainably sourced fibers with modern proportions.`,
      },
    })
    seededItems.push(item)
  }

  console.log(`🛍️ Seeded ${seededItems.length} catalog items across collections.`)

  // 4. Seed Hero Banner (1 active hero banner)
  await HeroBanner.create({
    headline: "Form, Function & Purpose",
    subline: "Autumn / Winter 2026 collection exploring sculptural silhouettes, unbleached linen, and double-faced virgin wool.",
    primaryCta: { label: "Explore The Collection", href: "/shop" },
    secondaryCta: { label: "Read Our Story", href: "/story" },
    backdrop: "/elegant-fashion-model-in-minimalist-setting.jpg",
    isLive: true,
  })

  console.log("🌟 Seeded Hero Banner.")

  // 5. Seed Home Blocks (6 kinds: spotlight, fresh-drops, top-sellers, on-offer, trending, picked-for-you)
  const blockConfigs = [
    { name: "Spotlight Pieces", slug: "spotlight-pieces", heading: "In The Spotlight", blurb: "Selected key pieces defining this season's tactile direction.", kind: "spotlight", mode: "auto", sort: "spotlight", limit: 4 },
    { name: "Fresh Drops", slug: "fresh-drops", heading: "Fresh Arrivals", blurb: "New arrivals tailored for the evolving seasonal calendar.", kind: "fresh-drops", mode: "auto", sort: "newest", limit: 4 },
    { name: "Top Sellers", slug: "top-sellers", heading: "Most Coveted", blurb: "Enduring customer favorites built to stand the test of time.", kind: "top-sellers", mode: "auto", sort: "best-selling", limit: 4 },
    { name: "Considered Archive", slug: "considered-archive", heading: "Selected Seasonal Archive", blurb: "Select archival pieces offered at preferential pricing.", kind: "on-offer", mode: "auto", sort: "price-asc", limit: 4 },
    { name: "Trending Now", slug: "trending-now", heading: "Trending Silhouettes", blurb: "Relaxed proportions and tactile fabrics dominating the studio.", kind: "trending", mode: "auto", sort: "top-rated", limit: 4 },
    { name: "Curator's Edit", slug: "curators-edit", heading: "Curator's Selection", blurb: "Hand-picked foundational essentials for a modular wardrobe.", kind: "picked-for-you", mode: "manual", limit: 4 },
  ]

  for (let idx = 0; idx < blockConfigs.length; idx++) {
    const config = blockConfigs[idx]
    await HomeBlock.create({
      name: config.name,
      slug: config.slug,
      heading: config.heading,
      blurb: config.blurb,
      kind: config.kind,
      picking: {
        mode: config.mode,
        itemIds: config.mode === "manual" ? seededItems.slice(0, 4).map((i) => i._id) : [],
        rules: {
          sort: config.sort as "newest" | "price-asc" | "price-desc" | "top-rated" | "best-selling",
          limit: config.limit,
        },
      },
      display: {
        showHeading: true,
        showBlurb: true,
        showPrice: true,
        showRating: true,
        layout: "grid",
        columns: 4,
      },
      position: idx,
      isLive: true,
    })
  }

  console.log("🧱 Seeded 6 Home Blocks.")

  // 6. Seed Journal Entries (8 editorial articles)
  const JOURNAL_TITLES = [
    { title: "The Anatomy of Double-Faced Cashmere", excerpt: "Inside the Biella mill where two layers of pure cashmere are hand-split and slip-stitched.", labels: ["craft", "materials"] },
    { title: "Building a Considered Ten-Piece Wardrobe", excerpt: "A minimalist framework for dressing with intentionality through the changing seasons.", labels: ["guide", "wardrobe"] },
    { title: "Vegetable Tanning in Santa Croce", excerpt: "How Tuscan artisans preserve centuries of leather craft using natural bark tannins.", labels: ["artisan", "sustainability"] },
    { title: "The Architecture of Natural Light", excerpt: "Studio visit with ceramicist Astrid Holm at her coastal Copenhagen workshop.", labels: ["living", "atelier"] },
    { title: "In Praise of Heavyweight Tailoring", excerpt: "Why structured British woolens maintain drape and resilience better than featherweight blends.", labels: ["tailoring", "heritage"] },
    { title: "Baroque Pearls and Wabi-Sabi Aesthetics", excerpt: "Embracing organic asymmetry in fine jewelry made from recycled precious metals.", labels: ["jewelry", "design"] },
    { title: "Slow Production and Seasonal Restraint", excerpt: "Why Modo limits our core catalog to fewer than one hundred deliberate silhouettes.", labels: ["manifesto", "slow-fashion"] },
    { title: "Care, Repair and the Art of Longevity", excerpt: "Our definitive guide to laundering knitwear, cedar storage, and resoling goodyear shoes.", labels: ["care", "guides"] },
  ]

  for (let i = 0; i < JOURNAL_TITLES.length; i++) {
    const j = JOURNAL_TITLES[i]
    await JournalEntry.create({
      title: j.title,
      slug: j.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      excerpt: j.excerpt,
      body: `## The Philosophy\n\nEvery fabric tells a story of origin, soil, climate, and human hand. When we speak of considered luxury, we speak not of excess, but of radical reduction to what truly matters.\n\n### Material Integrity\n\nQuality is felt before it is understood. The hand-feel of long-staple fibers, the tension of balanced yarns, the subtle weight of horn buttons chosen to withstand decades of fastening.\n\n### Care & Preservation\n\nWhen treated with respect, fine garments reward their caretaker by growing softer and richer with each passing season.`,
      coverImage: SAMPLE_IMAGES[i % SAMPLE_IMAGES.length],
      labels: j.labels,
      author: { name: "Modo Editorial", avatar: "/team-member-2.jpg" },
      linkedItems: seededItems.slice(i * 2, i * 2 + 3).map((item) => item._id),
      readingMinutes: 4,
      publishedAt: new Date(Date.now() - i * 86400000 * 3),
      state: "published",
    })
  }

  console.log("📖 Seeded 8 Journal Entries.")

  // 7. Seed Looks (4 shoppable looks)
  const LOOK_TITLES = [
    { title: "Autumn Minimalist Tailoring", season: "Fall 2026", cover: "/sophisticated-men-fashion-collection.jpg" },
    { title: "Tactile Cashmere Layering", season: "Fall / Winter 2026", cover: "/elegant-fashion-model-in-minimalist-setting.jpg" },
    { title: "Monochrome Atelier Uniform", season: "Core Series", cover: "/elegant-fashion-atelier.jpg" },
    { title: "Evening Silk & Gold Accents", season: "Holiday 2026", cover: "/silk-dress-detail-1.jpg" },
  ]

  for (let idx = 0; idx < LOOK_TITLES.length; idx++) {
    const l = LOOK_TITLES[idx]
    await Look.create({
      title: l.title,
      slug: l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      season: l.season,
      cover: l.cover,
      hotspots: [
        { x: 35, y: 30, itemId: seededItems[idx * 3]._id, note: "Cashmere layer" },
        { x: 50, y: 65, itemId: seededItems[idx * 3 + 1]._id, note: "Tailored trouser" },
      ],
      state: "published",
    })
  }

  console.log("📸 Seeded 4 Shoppable Looks.")

  // 8. Seed Orders (30 realistic orders)
  for (let i = 0; i < 30; i++) {
    const orderNo = generateOrderNumber()
    const item = seededItems[i % seededItems.length]
    const qty = (i % 2) + 1
    const subtotal = item.price * qty
    const shipping = subtotal >= 150 ? 0 : 12
    const tax = Math.round(subtotal * 0.08 * 100) / 100
    const total = subtotal + shipping + tax

    const states: Array<"pending" | "paid" | "packed" | "shipped" | "delivered"> = [
      "delivered",
      "shipped",
      "packed",
      "paid",
      "pending",
    ]
    const state = states[i % states.length]

    await Order.create({
      orderNo,
      client: i % 2 === 0 ? client1._id : client2._id,
      email: i % 2 === 0 ? client1.email : client2.email,
      lines: [
        {
          item: item._id,
          qty,
          unitPrice: item.price,
          titleSnapshot: item.title,
          imageSnapshot: item.gallery[0]?.src,
        },
      ],
      totals: { subtotal, discount: 0, shipping, tax, total },
      state,
      payment: {
        provider: "stripe",
        status: state === "pending" ? "unpaid" : "succeeded",
      },
      shipTo: {
        fullName: i % 2 === 0 ? client1.name : client2.name,
        street: "740 Park Avenue",
        city: "New York",
        state: "NY",
        postalCode: "10021",
        country: "US",
      },
      timeline: [
        { state: "Order Placed", at: new Date(Date.now() - (i + 1) * 86400000), note: "Placed online" },
      ],
    })
  }

  console.log("📦 Seeded 30 realistic demo Orders.")

  // 9. Seed Reviews (12 verified reviews)
  for (let i = 0; i < 12; i++) {
    const item = seededItems[i]
    await Review.create({
      item: item._id,
      client: client1._id,
      authorName: i % 2 === 0 ? "Julian R." : "Claire D.",
      rating: 5,
      title: "Superb drape and tactile quality",
      comment: "The hand-feel exceeds anything I expected. The silhouette falls naturally and the construction feels robust enough to last decades.",
      isVerifiedPurchase: true,
      isApproved: true,
      helpfulVotes: 4 + (i % 5),
    })
  }

  console.log("⭐ Seeded 12 verified Customer Reviews.")

  // 10. Seed Promo Codes
  const PROMO_CODES = [
    { code: "MODO10", discountType: "percentage" as const, value: 10, minSpend: 100 },
    { code: "WELCOME20", discountType: "percentage" as const, value: 20, minSpend: 200 },
    { code: "VIP50", discountType: "fixed" as const, value: 50, minSpend: 300 },
    { code: "ARCHIVE15", discountType: "percentage" as const, value: 15, minSpend: 150 },
    { code: "FREESHIP", discountType: "fixed" as const, value: 12, minSpend: 50 },
  ]

  for (const p of PROMO_CODES) {
    await PromoCode.create(p)
  }

  console.log("🎟️ Seeded 5 Active Promo Codes.")
  console.log("✅ Seed completed successfully!")
  process.exit(0)
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err)
  process.exit(1)
})
