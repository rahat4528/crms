# 🛍️ Next-Commerce — Detailed Project Blueprint

> **"Luxe — Premium Fashion & Lifestyle"** | Next.js 15 · React 19 · MongoDB · TailwindCSS v4 · TypeScript 5

---

## 📌 Executive Summary

Next-Commerce is a **full-stack e-commerce platform** for premium fashion & lifestyle retail. It ships with a customer-facing storefront, a full admin panel, and a MongoDB-backed REST API layer — all inside a single Next.js 15 App Router monorepo. The site brand is **"Luxe"**.

---

## 🏗️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | `^15.5.4` |
| Language | TypeScript | `^5` |
| UI Runtime | React / React DOM | `^19.2.0` |
| Styling | TailwindCSS | `^4.1.9` |
| Component Library | Radix UI (full suite) | Various |
| Forms | React Hook Form + Zod | `^7.60` / `3.25` |
| Database | MongoDB via Mongoose | `^8.18.2` |
| Analytics | Vercel Analytics | latest |
| Font | Geist Sans / Geist Mono | latest |
| Charts | Recharts | latest |
| Carousel | Embla Carousel React | `8.5.1` |
| Animations | tailwindcss-animate / tw-animate-css | — |
| Toast | Sonner | `^1.7.4` |

---

## 📂 Directory Structure

```
next-commerce-main/
├── app/                      ← Next.js App Router pages & API routes
│   ├── page.tsx              ← Homepage
│   ├── layout.tsx            ← Root layout (Geist fonts, Analytics)
│   ├── globals.css           ← Global styles
│   ├── about/                ← About page
│   ├── account/              ← Customer account management
│   ├── add-product/          ← Quick product-add flow
│   ├── admin/                ← Admin dashboard (10 sections)
│   ├── api/                  ← REST API route handlers
│   ├── cart/                 ← Cart page
│   ├── category/             ← Category browsing
│   ├── checkout/             ← Checkout + success pages
│   ├── contact/              ← Contact page
│   ├── data-entry/           ← Bulk data entry
│   ├── faq/                  ← FAQ page
│   ├── movies/               ← Movie exploration feature
│   ├── page-edit/            ← CMS page editor
│   ├── privacy/              ← Privacy policy
│   ├── product/              ← Individual product detail
│   ├── products/             ← Product listing / search
│   ├── size-guide/           ← Size guide page
│   └── terms/                ← Terms & conditions
│
├── components/               ← Reusable UI components
│   ├── admin/                ← 15 admin-specific components
│   ├── ui/                   ← shadcn-style primitives (Radix-based)
│   └── *.tsx                 ← 17 shared storefront components
│
├── models/                   ← Mongoose data schemas
│   ├── Products.ts
│   ├── Categories.ts
│   ├── ContentBlocks.ts
│   ├── PageSections.ts
│   └── Movie.ts
│
├── lib/                      ← Shared utilities
│   ├── mongoose.ts           ← DB connection singleton
│   └── utils.ts              ← Tailwind merge helper
│
├── hooks/                    ← Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── types/                    ← TypeScript interfaces
│   ├── product.ts
│   ├── movie.ts
│   └── page-sections.ts
│
└── public/                   ← Static assets / images
```

---

## 🗺️ Route Map

### 🛒 Customer-Facing Routes

| Route | Description |
|---|---|
| `/` | Homepage: Hero + Dynamic Product Sections + Category Showcase |
| `/products` | Full product listing with filters, sort, pagination |
| `/product/[slug]` | Product detail: gallery, variants, Q&A, reviews, related products |
| `/category/[slug]` | Category-specific product browsing |
| `/cart` | Shopping cart with item management |
| `/checkout` | Multi-step secure checkout (form + order summary) |
| `/checkout/success` | Order confirmation |
| `/account` | Customer account: profile, orders, settings |
| `/about` | Brand story |
| `/contact` | Contact form |
| `/faq` | Frequently asked questions |
| `/size-guide` | Size guide reference |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |
| `/movies` | Movie exploration (bonus feature using MFLIX dataset) |

### 🔧 Admin Routes (`/admin/*`)

| Route | Description |
|---|---|
| `/admin` | Dashboard overview with KPI stats |
| `/admin/products` | Product CRUD management |
| `/admin/categories` | Category management |
| `/admin/orders` | Order management + detail view |
| `/admin/customers` | Customer table + customer detail |
| `/admin/inventory` | Inventory tracking |
| `/admin/marketing` | Email campaigns + coupons |
| `/admin/content` | CMS: page sections, hero, media library |
| `/admin/reports` | Sales charts, report filters |
| `/admin/returns` | Returns management |
| `/admin/settings` | Store settings |

### ⚙️ API Routes (`/api/*`)

| Endpoint | Method | Description |
|---|---|---|
| `/api/products` | GET | List products (filter, sort, paginate) |
| `/api/products` | POST | Create new product |
| `/api/products/[id]` | GET/PUT/DELETE | Single product CRUD |
| `/api/products/search` | GET | Full-text product search |
| `/api/products/by-section` | GET | Fetch products for a homepage section |
| `/api/categories` | GET/POST | List / create categories |
| `/api/categories/[id]` | GET/PUT/DELETE | Single category CRUD |
| `/api/movies` | GET | Fetch movies (MFLIX dataset) |
| `/api/page-sections` | GET/POST | CMS page section management |
| `/api/admin/hero-section` | GET/PUT | Manage hero section content |
| `/api/admin/page-sections` | GET/PUT | Manage all page sections |
| `/api/admin/products` | GET/POST | Admin product management |

---

## 🗄️ Data Models

### 📦 Product (`models/Products.ts`)

```
Product {
  name           String (required)
  slug           String (unique, auto-generated)
  description    String
  shortDescription String
  images[]       { url, alt, isPrimary }
  category       → Category (ref)
  subcategory    → Category (ref)
  price          Number
  originalPrice  Number
  variants[]     VariantSchema
  tags[]         String[]
  specifications[] { name, value }
  inventory      Number
  rating         { average: 0-5, count }
  sales          { count, revenue }
  seo            { title, description, keywords[] }
  status         enum: draft | active | inactive | out-of-stock
  featured       Boolean
  isNew          Boolean
  isSale         Boolean
  weight         Number
  dimensions     { length, width, height }
  timestamps     createdAt, updatedAt
}

Variant {
  name, size, color, sku, price, originalPrice, inventory, isActive
}
```

**Indexes:** text search (name + description + tags), category, status, featured, price, rating.average (desc), sales.count (desc), createdAt (desc)

**Virtuals:** `onSale`, `discountPercentage`, `primaryImage`

---

### 🗂️ Category (`models/Categories.ts`)

```
Category {
  name           String (unique)
  slug           String (unique)
  description    String
  image          String (URL)
  parentCategory → Category (self-ref)
  subcategories[] → Category[]
  isActive       Boolean
  sortOrder      Number
  seoTitle       String
  seoDescription String
  timestamps
}
```

Supports nested categories (parent → children hierarchy).

---

### 🖼️ Content Blocks (`models/ContentBlocks.ts`)

**HeroSection:**
```
{ title, description, primaryButton {text,url}, secondaryButton {text,url},
  backgroundImage, isActive, timestamps }
```

**ProductSection (Homepage CMS):**
```
{
  name, slug, title, description,
  type: featured | new-arrivals | best-sellers | on-sale | trending | recommended,
  productSelection: {
    method: manual | automatic,
    productIds[],                         // manual pick
    criteria: { category, tags[], sortBy, limit }  // automatic
  },
  displaySettings: { showTitle, showDescription, showPrice, showRating, layout: grid|carousel, itemsPerRow },
  sortOrder, isActive, timestamps
}
```

---

### 🎬 Movie (`models/Movie.ts`)

MongoDB Atlas Sample MFLIX dataset:
```
{ plot, genres[], runtime, cast[], poster, title, fullplot, languages[],
  released, directors[], rated, awards{wins,nominations,text},
  year, imdb{rating,votes,id}, countries[], type, tomatoes{...} }
```

---

## 🧩 Component Architecture

### 🏠 Storefront Components (17)

| Component | Role |
|---|---|
| `header.tsx` | Nav, search, cart icon, mobile menu |
| `footer.tsx` | Footer links, newsletter, social |
| `hero-section.tsx` | Fetches & renders HeroSection from API |
| `dynamic-product-sections.tsx` | Fetches ProductSections, renders each block |
| `category-showcase.tsx` | Visual category grid on homepage |
| `product-grid.tsx` | Filterable, paginated product card grid |
| `product-filters.tsx` | Side-panel filters: price, category, tags, sort |
| `product-image-gallery.tsx` | Multi-image product viewer |
| `product-reviews.tsx` | Star ratings + review list |
| `product-qa.tsx` | Q&A accordion |
| `related-products.tsx` | Horizontal related product strip |
| `cart-item.tsx` | Cart row: image, variants, qty controls |
| `cart-summary.tsx` | Cart totals + promo codes |
| `checkout-form.tsx` | Multi-section checkout form (Zod validated) |
| `breadcrumb-nav.tsx` | Contextual breadcrumbs |
| `account-sidebar.tsx` | Account navigation sidebar |
| `theme-provider.tsx` | next-themes dark/light mode provider |

### 🔧 Admin Components (15)

| Component | Role |
|---|---|
| `admin-sidebar.tsx` | Admin navigation sidebar |
| `dashboard-stats.tsx` | KPI cards (revenue, orders, customers, products) |
| `sales-chart.tsx` | Recharts revenue / orders chart |
| `product-table.tsx` | Paginated admin product list |
| `product-form.tsx` | Full product create/edit form |
| `order-table.tsx` | Orders list with status badges |
| `order-details.tsx` | Full order detail view |
| `customer-table.tsx` | Customer list |
| `customer-details.tsx` | Customer profile + order history |
| `coupon-table.tsx` | Marketing coupon management |
| `email-campaign-table.tsx` | Email campaign list |
| `media-library.tsx` | Asset browser / uploader |
| `blog-table.tsx` | Blog/content management |
| `page-table.tsx` | CMS page list |
| `report-filters.tsx` | Date range + filters for reports |

---

## 🔄 Data Flow

```
Browser
  │
  ├─ Storefront pages → fetch /api/* → Mongoose → MongoDB Atlas
  │
  ├─ Admin pages → fetch /api/admin/* → Mongoose → MongoDB Atlas
  │
  └─ Static/ISR pages → next.js cache layer
```

**Products API Query Parameters:**
`page`, `limit`, `sortBy`, `category`, `subcategory`, `featured`, `isNew`, `isSale`, `status`, `minPrice`, `maxPrice`, `search`, `tags`

**Response envelope:**
```json
{
  "success": true,
  "data": [...],
  "pagination": { "currentPage", "totalPages", "totalCount", "limit", "hasNextPage", "hasPrevPage" },
  "filters": { ...applied filters }
}
```

---

## ⚠️ Current Gaps / Missing Features

> [!WARNING]
> The following features are scaffolded in the UI but **not yet fully implemented**:

| Gap | Details |
|---|---|
| 🔐 **Authentication** | No auth system (NextAuth/Clerk/Auth.js) — admin & account routes are unprotected |
| 🛒 **Cart State** | No global cart state manager (no Zustand/Context/Redux) — cart is likely mock data |
| 💳 **Payment Gateway** | Checkout form exists but no Stripe/PayPal integration — `handleCheckoutSubmit` is a simulated 2s delay |
| 📦 **Order Management** | No order creation API route — orders only exist in admin UI as mock data |
| 🔍 **Search** | Full-text search endpoint exists on the backend but no autocomplete/search page UI |
| 🖼️ **Image Storage** | No cloud image upload integration (Cloudinary/S3) — `media-library.tsx` is UI-only |
| 📧 **Email** | Email campaign UI exists but no email service (Resend/SendGrid) integration |
| 📊 **Analytics** | Vercel Analytics added; no custom event tracking |
| 🌐 **CMS (Page Edit)** | `/page-edit` route exists but editing flow may be incomplete |
| 🎬 **Movies Feature** | Movie model and route exist — unclear purpose in an e-commerce app (possibly a demo/test feature) |

---

## 🚀 Suggested Improvement Roadmap

### Phase 1 — Foundation (Critical)
1. **Auth** — Integrate NextAuth.js with credentials + Google provider
2. **Cart** — Zustand store for persistent cart state (with localStorage sync)
3. **Orders** — `/api/orders` CRUD + order confirmation emails

### Phase 2 — Commerce (Core)
4. **Payments** — Stripe Checkout or Stripe Payment Elements
5. **Image Uploads** — Cloudinary or UploadThing in media library
6. **Reviews API** — Backend endpoints for creating/fetching product reviews

### Phase 3 — Growth
7. **Search UI** — Algolia or MongoDB Atlas Search with autocomplete
8. **Email** — Resend or SendGrid for transactional & campaign emails
9. **Wishlist** — Per-user saved product list
10. **Dark Mode** — Full dark mode polish (theme-provider is already in place)

### Phase 4 — Scale
11. **ISR/SSG** — Static generation for product & category pages
12. **CDN** — Move images to Cloudinary/S3 with next/image optimization
13. **Admin Auth** — Role-based access control for admin panel

---

## 🔑 Environment Variables Needed

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/luxe
NEXTAUTH_SECRET=<random-secret>
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
```

---

## 📈 Strengths

- ✅ Well-structured Mongoose schemas with indexes and virtuals
- ✅ Comprehensive admin UI covering all standard e-commerce sections
- ✅ CMS-driven homepage (hero + product sections configurable from admin)
- ✅ Radix UI component suite for accessibility
- ✅ Full filter/sort/pagination on the product API
- ✅ TypeScript throughout
- ✅ Vercel-ready (Analytics included)
- ✅ SEO fields baked into the Product schema
- ✅ Geist fonts for modern typography

---

*Blueprint generated: 2026-10-16*
