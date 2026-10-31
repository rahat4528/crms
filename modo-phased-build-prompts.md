# Modo — Phased Build Prompts

**Brand:** Modo — *Considered Fashion & Living* (replaces "Luxe — Premium Fashion & Lifestyle")
**What this is:** the same kind of full-stack store as your original project (storefront + admin + MongoDB REST API in one Next.js 15 app), with **every name changed**, **every blueprint detail kept**, the **Movies feature replaced** by a Lookbook/Journal, and **many new advanced features** added.

## How to use
1. Open a fresh session in your AI coding tool (Claude Code, Cursor, etc.).
2. Paste **PROMPT 0** first. Keep it in context for every phase.
3. Paste **PHASE 1 → 7** one at a time. Start the next phase only when the current one's **Done when** checks pass.
4. Run the **Final audit** (end of Phase 7) before launch.

> Check Modo's trademark, domain and social-handle availability before launch.

---

## PROMPT 0 — Context, rename map, rules (paste first)

````text
You are a senior full-stack engineer. Build "Modo — Considered Fashion & Living": a premium fashion & lifestyle e-commerce platform with (a) a customer storefront, (b) a full admin panel called "Studio", and (c) a MongoDB-backed REST API — all inside ONE Next.js 15 App Router project.

FIXED STACK
- Next.js ^15.5.4 (App Router), React ^19.2.0 / React DOM ^19.2.0, TypeScript ^5 (strict)
- TailwindCSS ^4.1.9 via @tailwindcss/postcss (no tailwind.config file), tw-animate-css 1.3.3
- Radix UI full suite + shadcn-style primitives in components/ui, lucide-react, class-variance-authority, clsx, tailwind-merge
- Forms: react-hook-form ^7.60.0 + @hookform/resolvers ^3.10.0 + zod 3.25.67
- DB: MongoDB via Mongoose ^8.18.2 (MongoDB Atlas)
- Charts: Recharts. Carousel: embla-carousel-react 8.5.1. Toasts: sonner ^1.7.4. Themes: next-themes ^0.4.6. Drawers: vaul ^0.9.9. Command palette: cmdk 1.0.4. Dates: date-fns 4.1.0 + react-day-picker 9.8.0. OTP: input-otp 1.4.1. Panels: react-resizable-panels ^2.1.7.
- Analytics: @vercel/analytics. Package manager: pnpm only.

RENAME MAP — the "Old" column must NEVER appear anywhere (file names, folders, identifiers, types, routes, API paths, DB collections, env vars, comments, UI copy, alt text, metadata, README, seed data). Use only the "New" column.

A) Brand / project
| Old | New |
|---|---|
| Luxe | Modo |
| "Premium Fashion & Lifestyle" | "Considered Fashion & Living" |
| next-commerce (package name) | modo-store |
| next-commerce-main (folder) | modo-web |
| Admin panel / "Admin" | Studio / "Modo Studio" |
| Geist Sans / Geist Mono | Bricolage Grotesque (headings), Manrope (body), JetBrains Mono (mono) via next/font/google |

B) Customer routes
| Old | New |
|---|---|
| / | / |
| /products | /shop |
| /product/[slug] | /shop/[slug] |
| /category/[slug] | /collections/[slug] |
| /cart | /bag |
| /checkout | /checkout |
| /checkout/success | /checkout/confirmed |
| /account | /me (sub-pages: /me/orders, /me/profile, /me/settings, /me/addresses, /me/wishlist, /me/rewards) |
| /about | /story |
| /contact | /reach-us |
| /faq | /help |
| /size-guide | /fit-guide |
| /privacy | /privacy-notice |
| /terms | /terms-of-use |
| /movies | /journal (articles) + /lookbook (shoppable looks) |
| /add-product | /studio/quick-add |
| /data-entry | /studio/bulk-import |
| /page-edit | /studio/page-builder |

C) Studio (admin) routes
| Old | New |
|---|---|
| /admin | /studio |
| /admin/products | /studio/catalog |
| /admin/categories | /studio/collections |
| /admin/orders | /studio/orders (+ /studio/orders/[id]) |
| /admin/customers | /studio/clients (+ /studio/clients/[id]) |
| /admin/inventory | /studio/stock |
| /admin/marketing | /studio/campaigns (email campaigns + promo codes) |
| /admin/content | /studio/content (home blocks, hero banner, asset library) |
| /admin/reports | /studio/insights |
| /admin/returns | /studio/exchanges |
| /admin/settings | /studio/settings |

D) API routes
| Old | New |
|---|---|
| /api/products (GET, POST) | /api/catalog |
| /api/products/[id] (GET/PUT/DELETE) | /api/catalog/[id] |
| /api/products/search | /api/catalog/search |
| /api/products/by-section | /api/catalog/by-block |
| /api/categories, /api/categories/[id] | /api/collections, /api/collections/[id] |
| /api/movies | /api/journal (and /api/looks) |
| /api/page-sections | /api/home-blocks |
| /api/admin/hero-section | /api/studio/hero-banner |
| /api/admin/page-sections | /api/studio/home-blocks |
| /api/admin/products | /api/studio/catalog |

E) Models, collections, types, lib, hooks
| Old | New |
|---|---|
| models/Products.ts, Product | models/Item.ts, Item (Mongo collection `items`) |
| models/Categories.ts, Category | models/Collection.ts, Collection (collection `collections`) |
| models/ContentBlocks.ts: HeroSection | models/Blocks.ts: HeroBanner (`hero_banners`) |
| models/ContentBlocks.ts: ProductSection | models/Blocks.ts: HomeBlock (`home_blocks`) |
| models/PageSections.ts | models/HomeLayout.ts |
| models/Movie.ts (MFLIX) | models/JournalEntry.ts (`journal_entries`) + models/Look.ts (`looks`) |
| Variant | Option |
| types/product.ts, types/movie.ts, types/page-sections.ts | types/item.ts, types/journal.ts, types/home-blocks.ts |
| lib/mongoose.ts | lib/db.ts |
| lib/utils.ts | lib/cn.ts (update components.json alias accordingly) |
| hooks/use-mobile.ts | hooks/use-viewport.ts |
| hooks/use-toast.ts | hooks/use-notify.ts |

F) Field names
| Old (Product) | New (Item) |
|---|---|
| name | title |
| shortDescription | summary |
| images[] {url, alt, isPrimary} | gallery[] {src, alt, isCover} |
| category / subcategory | collection / subCollection |
| originalPrice | listPrice |
| variants[] | options[] |
| tags[] | labels[] |
| specifications[] {name, value} | details[] {label, value} |
| inventory | stock |
| rating {average, count} | ratingStats {avg, total} |
| sales {count, revenue} | salesStats {units, revenue} |
| seo {title, description, keywords[]} | meta {metaTitle, metaDescription, metaKeywords[]} |
| status: draft/active/inactive/out-of-stock | state: draft/live/paused/sold-out |
| featured / isNew / isSale | spotlight / isFresh / isOffer |
| weight / dimensions {length,width,height} | shipWeight / packSize {length,width,height} |
| createdAt / updatedAt | addedAt / modifiedAt (Mongoose timestamps option) |
| virtuals onSale / discountPercentage / primaryImage | onOffer / discountPct / coverImage |
| Variant: name,size,color,sku,price,originalPrice,inventory,isActive | Option: label,size,color,sku,price,listPrice,stock,isEnabled |
| Category: name,slug,description,image,parentCategory,subcategories[],isActive,sortOrder,seoTitle,seoDescription | Collection: title,slug,description,cover,parent,children[],isVisible,position,metaTitle,metaDescription |
| HeroSection: title,description,primaryButton{text,url},secondaryButton{text,url},backgroundImage,isActive | HeroBanner: headline,subline,primaryCta{label,href},secondaryCta{label,href},backdrop,isLive |
| ProductSection: name,slug,title,description,type,productSelection,displaySettings,sortOrder,isActive | HomeBlock: name,slug,heading,blurb,kind,picking,display,position,isLive |
| type: featured/new-arrivals/best-sellers/on-sale/trending/recommended | kind: spotlight/fresh-drops/top-sellers/on-offer/trending/picked-for-you |
| productSelection {method: manual/automatic, productIds[], criteria{category,tags[],sortBy,limit}} | picking {mode: manual/auto, itemIds[], rules{collection,labels[],sort,limit}} |
| displaySettings {showTitle,showDescription,showPrice,showRating,layout: grid/carousel,itemsPerRow} | display {showHeading,showBlurb,showPrice,showRating,layout: grid/slider,columns} |

G) API query params and response envelope
| Old | New |
|---|---|
| page, limit | page, pageSize |
| sortBy | sort (values: newest, price-asc, price-desc, top-rated, best-selling, spotlight) |
| category, subcategory | collection, subCollection |
| featured, isNew, isSale | spotlight, fresh, offer |
| status | state |
| minPrice, maxPrice | priceMin, priceMax |
| search | q |
| tags | labels |
| { success, data, pagination{currentPage,totalPages,totalCount,limit,hasNextPage,hasPrevPage}, filters } | { ok, items, pageInfo{page,pageCount,total,pageSize,hasNext,hasPrev}, appliedFilters } (single record: { ok, item }; error: { ok:false, error:{code,message} }) |

H) Storefront components (components/)
header → top-bar · footer → site-footer · hero-section → hero-banner · dynamic-product-sections → home-blocks · category-showcase → collection-showcase · product-grid → item-grid · product-filters → filter-panel · product-image-gallery → item-gallery · product-reviews → item-reviews · product-qa → item-questions · related-products → pairs-well-with · cart-item → bag-line · cart-summary → bag-summary · checkout-form → checkout-flow · breadcrumb-nav → trail-nav · account-sidebar → me-sidebar · theme-provider → appearance-provider

I) Studio components (components/studio/, was components/admin/)
admin-sidebar → studio-nav · dashboard-stats → kpi-cards · sales-chart → revenue-chart · product-table → catalog-table · product-form → catalog-form · order-table → orders-grid · order-details → order-view · customer-table → clients-grid · customer-details → client-profile · coupon-table → promo-table · email-campaign-table → campaigns-table · media-library → asset-library · blog-table → articles-table · page-table → pages-table · report-filters → insight-filters

J) Environment variables (third-party standard names stay as the provider requires)
| Old | New |
|---|---|
| MONGODB_URI (db name `luxe`) | MODO_DATABASE_URL (db name `modo`) |
| NEXTAUTH_SECRET / NEXTAUTH_URL | AUTH_SECRET / AUTH_URL |
| STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY | STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET |
| CLOUDINARY_CLOUD_NAME / _API_KEY / _API_SECRET | same names (provider-defined) |
| RESEND_API_KEY | RESEND_API_KEY + MAIL_FROM |
| (new) | NEXT_PUBLIC_SITE_URL, LLM_API_KEY, UPSTASH/REDIS_URL (rate limit), SENTRY_DSN |

RULES FOR EVERY PHASE
1. Obey the rename map 100%. No old names anywhere, ever.
2. TypeScript strict. No `any`, no `@ts-ignore`, no `ignoreBuildErrors`, no `ignoreDuringBuilds`.
3. Server Components by default; "use client" only where state/effects/events are needed.
4. Validate ALL API input and ALL env vars with Zod. Never trust the client.
5. Use the response envelope from table G on every API route.
6. A phase is finished only when `pnpm typecheck && pnpm lint && pnpm build` all pass.
7. One conventional commit per phase.
8. Visual identity must be clearly different from a generic shadcn store: warm "sand / ink / clay / moss" palette, editorial typography, pill buttons, soft 14px radius, large imagery, subtle motion. Support light + dark.
9. Reply at the end of each phase with: files created, how to run it, and anything left undone.
````

---

## PHASE 1 — Foundations, config, theme

````text
PHASE 1 — Project scaffold and every config file.

Create the project "modo-web" (package name "modo-store", version 0.1.0, private: true).

package.json
- Scripts: build="next build", dev="next dev", lint="next lint", start="next start"; ADD typecheck="tsc --noEmit", test="vitest run", test:e2e="playwright test", db:seed="tsx scripts/seed.ts", format="prettier --write .".
- Add "packageManager" (pnpm) and engines.node ">=20".
- Dependencies: all packages from the FIXED STACK, with these exact baselines — @radix-ui/react-accordion 1.2.2, alert-dialog 1.1.4, aspect-ratio 1.1.1, avatar 1.1.2, checkbox 1.1.3, collapsible 1.1.2, context-menu 2.2.4, dialog 1.1.4, dropdown-menu 2.1.4, hover-card 1.1.4, label 2.1.1, menubar 1.1.4, navigation-menu ^1.2.14, popover 1.1.4, progress 1.1.1, radio-group 1.2.2, scroll-area 1.2.2, select 2.1.4, separator 1.1.1, slider 1.2.2, slot 1.1.1, switch 1.1.2, tabs 1.1.2, toast 1.2.4, toggle 1.1.1, toggle-group 1.1.1, tooltip 1.1.6; class-variance-authority ^0.7.1; clsx ^2.1.1; cmdk 1.0.4; date-fns 4.1.0; embla-carousel-react 8.5.1; input-otp 1.4.1; lucide-react ^0.454.0; mongoose ^8.18.2; next ^15.5.4; next-themes ^0.4.6; react ^19.2.0; react-dom ^19.2.0; react-day-picker 9.8.0; react-hook-form ^7.60.0; react-resizable-panels ^2.1.7; sonner ^1.7.4; tailwind-merge ^2.5.5; vaul ^0.9.9; zod 3.25.67; @hookform/resolvers ^3.10.0; eslint-config-next ^15.5.4.
- IMPROVEMENTS over a typical template: pin every package that would otherwise be "latest" (@vercel/analytics, recharts) to the current stable exact version; use @types/react and @types/react-dom ^19 (not ^18); do NOT install autoprefixer or tailwindcss-animate (Tailwind v4 + tw-animate-css replace them).
- devDependencies: @tailwindcss/postcss ^4.1.9, tailwindcss ^4.1.9, postcss ^8.5, typescript ^5, @types/node ^22, tw-animate-css 1.3.3, plus vitest, @playwright/test, tsx, prettier, eslint.
- Use ONE lockfile: pnpm-lock.yaml. Do not create package-lock.json.

tsconfig.json — same options as a strict Next.js app: lib ["dom","dom.iterable","esnext"], allowJs true, target ES2022, skipLibCheck true, strict true, noEmit true, esModuleInterop true, module esnext, moduleResolution bundler, resolveJsonModule true, isolatedModules true, jsx preserve, incremental true, plugins [{ name: "next" }], paths { "@/*": ["./*"] }, forceConsistentCasingInFileNames true. include ["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"] (no hard-coded route files), exclude ["node_modules"].

next.config.mjs — JSDoc type `import('next').NextConfig`; `export default nextConfig`. Do NOT ignore ESLint or TypeScript errors. Enable next/image optimization with remotePatterns for the Cloudinary host (do not set images.unoptimized). Add poweredByHeader:false, reactStrictMode:true, and security headers (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS).

postcss.config.mjs — JSDoc type `import('postcss-load-config').Config`; plugins: { '@tailwindcss/postcss': {} }; `export default config`.

components.json — $schema https://ui.shadcn.com/schema.json; style "new-york"; rsc true; tsx true; tailwind { config: "", css: "app/globals.css", baseColor: "stone", cssVariables: true, prefix: "" }; aliases { components: "@/components", utils: "@/lib/cn", ui: "@/components/ui", lib: "@/lib", hooks: "@/hooks" }; iconLibrary "lucide".

.gitignore — keep every standard entry: /node_modules, /.next/, /out/, /build, npm-debug.log*, yarn-debug.log*, yarn-error.log*, .pnpm-debug.log*, .env* (but allow !.env.example), .vercel, *.tsbuildinfo, next-env.d.ts; ADD coverage/, playwright-report/, .DS_Store.

.env.example — every variable from table J with placeholder values + comments. Add lib/env.ts that parses process.env with Zod and throws a readable error at boot if anything required is missing.

README.md — replace the create-next-app boilerplate with a real README for Modo: overview, stack, prerequisites, `pnpm i` + `pnpm dev`, env setup, scripts, folder structure, seeding, deployment on Vercel, license. Mention http://localhost:3000.

Folder skeleton (empty placeholders are fine): app/, components/ (+ components/studio, components/ui), models/, lib/, hooks/, types/, public/, scripts/.

app/layout.tsx — root layout: next/font/google for Bricolage Grotesque, Manrope, JetBrains Mono (CSS variables), <html lang>, appearance-provider (next-themes, system default), Sonner <Toaster/>, Vercel <Analytics/>, site metadata (title template "%s — Modo", description, openGraph, metadataBase from NEXT_PUBLIC_SITE_URL).

app/globals.css — Tailwind v4: `@import "tailwindcss"; @import "tw-animate-css";`, `@custom-variant dark`, and an `@theme` block with design tokens in OKLCH. Light: background warm sand (~#F6F1EA), foreground ink (~#14110F), accent clay (~#B4532A), secondary moss (~#3F5D4A), muted/border warm greys, radius 0.875rem. Dark: warm charcoal background (~#171412) with lifted clay/moss. Add fluid type scale, a `.container-modo` utility, focus-visible ring, reduced-motion handling.

Install and generate (shadcn) the full set of ui primitives into components/ui, restyled to the Modo tokens (pill buttons, soft radius).

Hooks: hooks/use-viewport.ts (is-mobile breakpoint hook), hooks/use-notify.ts (toast helper wrapper). lib/cn.ts (clsx + tailwind-merge). lib/db.ts (Mongoose connection singleton cached on globalThis, uses MODO_DATABASE_URL, db name "modo").

DONE WHEN: `pnpm i && pnpm typecheck && pnpm lint && pnpm build` pass and `/` renders a themed placeholder with a working light/dark toggle.
````

---

## PHASE 2 — Data layer

````text
PHASE 2 — Mongoose models, TypeScript types, validators, seed data. Use only the new names from the rename map.

models/Item.ts (collection `items`)
Fields: title (required), slug (unique, auto-generated from title, collision-safe), description, summary, gallery[] {src, alt, isCover}, collection → ref Collection, subCollection → ref Collection, price (Number), listPrice (Number), options[] (Option sub-schema), labels[] (String), details[] {label, value}, stock (Number), ratingStats {avg 0–5, total}, salesStats {units, revenue}, meta {metaTitle, metaDescription, metaKeywords[]}, state enum draft | live | paused | sold-out, spotlight (Boolean), isFresh (Boolean), isOffer (Boolean), shipWeight (Number), packSize {length, width, height}. Timestamps with custom names addedAt / modifiedAt.
Option sub-schema: label, size, color, sku, price, listPrice, stock, isEnabled.
Indexes: text index (title + description + labels); collection; state; spotlight; price; ratingStats.avg (desc); salesStats.units (desc); addedAt (desc).
Virtuals: onOffer, discountPct, coverImage. Include virtuals in toJSON/toObject.
Auto-set state "sold-out" when total stock is 0.

models/Collection.ts (collection `collections`)
title (unique), slug (unique), description, cover (URL), parent → Collection (self-ref), children[] → Collection, isVisible, position, metaTitle, metaDescription, timestamps. Supports nested hierarchy (parent → children). Keep parent/children in sync on save.

models/Blocks.ts
HeroBanner (`hero_banners`): headline, subline, primaryCta {label, href}, secondaryCta {label, href}, backdrop, isLive, timestamps. Only one banner may be live at a time.
HomeBlock (`home_blocks`): name, slug, heading, blurb, kind enum spotlight | fresh-drops | top-sellers | on-offer | trending | picked-for-you, picking { mode manual | auto, itemIds[], rules { collection, labels[], sort, limit } }, display { showHeading, showBlurb, showPrice, showRating, layout grid | slider, columns }, position, isLive, timestamps.

models/HomeLayout.ts — ordered list of homepage sections (hero, blocks, collection showcase) with position and visibility, driven from Studio.

models/JournalEntry.ts (replaces the old movie model): title, slug, excerpt, body (rich text / MDX), coverImage, labels[], author {name, avatar}, linkedItems[] → Item, readingMinutes (auto), publishedAt, state draft | published | scheduled, meta.
models/Look.ts: title, slug, season, cover, hotspots[] {x%, y%, itemId, note}, publishedAt, state.

NEW models for later phases (create now, wire later): Client (user), Bag, Wishlist, Order, Review, Question, PromoCode, Campaign, Exchange, Asset, StoreSettings, Subscriber, RewardsLedger, GiftCard, AuditLog, StockAlert.
Order: orderNo (format MD-YYYY-000123), client, lines[] {item, option, qty, unitPrice, title snapshot}, totals {subtotal, discount, shipping, tax, total}, currency, state (pending|paid|packed|shipped|delivered|cancelled|refunded), payment {provider, intentId, status}, shipTo, billTo, timeline[] {state, at, by, note}, tracking.

types/item.ts, types/journal.ts, types/home-blocks.ts — TS interfaces + Zod schemas (create/update/query) shared by API and forms; export inferred types.

scripts/seed.ts — idempotent seed: 8 collections (with 3 nested), 60 realistic items with options, gallery, labels, ratings, 1 hero banner, 6 home blocks (one per kind, mix of manual/auto), 8 journal entries, 4 looks, demo clients, 30 demo orders, 12 reviews, 10 questions, 5 promo codes. No real brands, no copyrighted imagery (use placeholder image URLs).

DONE WHEN: `pnpm db:seed` populates a local/Atlas DB, models compile, indexes are created, and a Vitest test confirms slug uniqueness, virtuals, and the sold-out auto-state.
````

---

## PHASE 3 — API layer

````text
PHASE 3 — REST API route handlers (app/api/**/route.ts). Every handler: validate with Zod, connect via lib/db.ts, return the envelope from table G, map errors to {ok:false,error:{code,message}} with correct HTTP status, and never leak stack traces.

CATALOG
- GET /api/catalog — list items with filter, sort, paginate. Query: page, pageSize, sort, collection, subCollection, spotlight, fresh, offer, state, priceMin, priceMax, q, labels. Response: { ok, items, pageInfo{page,pageCount,total,pageSize,hasNext,hasPrev}, appliedFilters }. Public callers only ever see state "live".
- POST /api/catalog — create item (staff+ only).
- GET/PUT/DELETE /api/catalog/[id] — single item CRUD (accepts id or slug on GET). PUT/DELETE staff+ only.
- GET /api/catalog/search — full-text search (Atlas Search with autocomplete + typo tolerance; fall back to the text index in dev). Returns ranked items + suggestions + facets.
- GET /api/catalog/by-block — fetch items for a home block (by block id/slug): manual mode returns itemIds in order; auto mode applies rules {collection, labels[], sort, limit}.

COLLECTIONS
- GET/POST /api/collections — list (nested tree option) / create.
- GET/PUT/DELETE /api/collections/[id] — single collection CRUD; block delete if it still has items or children (or require reassignment).

HOME BLOCKS / HERO
- GET/POST /api/home-blocks — public GET returns live blocks ordered by position; POST staff+.
- GET/PUT /api/studio/hero-banner — manage hero banner content.
- GET/PUT /api/studio/home-blocks — manage all blocks and ordering at once.
- GET/POST /api/studio/catalog — studio item management (includes drafts, bulk operations, CSV import hook).

JOURNAL / LOOKBOOK (replaces movies)
- GET /api/journal (list + filter by label, paginated), GET /api/journal/[slug]; POST/PUT/DELETE staff+.
- GET /api/looks, GET /api/looks/[slug]; staff+ write.

Cross-cutting
- lib/api.ts helpers: withHandler(), parseQuery(), ok(), fail(), paginate().
- Rate limiting (Redis/Upstash) on public + write routes; idempotency keys on mutating order/payment routes.
- Cache: set revalidateTag per resource (items, collections, blocks, journal); mutations call revalidateTag.
- Role guard stub `requireRole()` (real auth lands in Phase 6).

DONE WHEN: a Vitest + supertest-style suite covers list/filter/sort/paginate, search, by-block (manual + auto), nested collections, and error shapes; OpenAPI JSON generated at /api/docs.
````

---

## PHASE 4 — Storefront

````text
PHASE 4 — Customer-facing storefront using Server Components + the API/DB layer. Use the Modo design tokens; every page must be responsive, accessible (WCAG 2.2 AA), and have metadata.

PAGES
- / — Homepage: hero-banner (from /api/studio/hero-banner data) + home-blocks (dynamic, grid or slider per block display settings) + collection-showcase (visual collection grid). Order controlled by HomeLayout.
- /shop — full item listing: filter-panel (price range slider, collection, labels, offer/fresh toggles, sort), item-grid with pagination (URL-synced query params), empty and loading states, skeletons.
- /shop/[slug] — item detail: item-gallery (multi-image, zoom, thumbnails, swipe), options selector (size/color with stock state), price + listPrice + discountPct badge, add-to-bag, wishlist, item-questions (Q&A accordion), item-reviews (star rating summary + list + form), pairs-well-with (horizontal related strip), trail-nav breadcrumbs, JSON-LD.
- /collections/[slug] — collection browsing (cover header, sub-collection chips, same grid + filters).
- /bag — shopping bag: bag-line rows (image, option, qty controls, remove, move to wishlist) + bag-summary (totals, promo code, shipping estimate).
- /checkout — multi-step secure checkout: checkout-flow (contact → shipping → delivery method → payment → review, Zod-validated with react-hook-form) + order summary sidebar.
- /checkout/confirmed — order confirmation with order number and next steps.
- /me and sub-pages — me-sidebar + profile, orders (list + detail), settings, addresses, wishlist, rewards.
- /story (brand story), /reach-us (contact form → API + email), /help (FAQ accordion with search), /fit-guide (size tables, how-to-measure, conversion), /privacy-notice, /terms-of-use.
- /journal and /journal/[slug] (article list + article with linked items), /lookbook and /lookbook/[slug] (shoppable looks with hotspots).

SHARED COMPONENTS (all 17, new names): top-bar (nav with mega-menu from collections, search trigger, bag icon with count, account menu, mobile menu), site-footer (links, newsletter signup, social), hero-banner, home-blocks, collection-showcase, item-grid, filter-panel, item-gallery, item-reviews, item-questions, pairs-well-with, bag-line, bag-summary, checkout-flow, trail-nav, me-sidebar, appearance-provider.

Quality bar: next/image everywhere, ISR (revalidate via tags), loading.tsx / error.tsx / not-found.tsx per route group, skeletons, keyboard navigation, prefers-reduced-motion respected.

DONE WHEN: every customer route above renders with seeded data, Lighthouse ≥ 90 for Performance/Accessibility/SEO on /, /shop and /shop/[slug] (desktop), and no console errors.
````

---

## PHASE 5 — Studio (admin panel)

````text
PHASE 5 — "Modo Studio" at /studio (all 11 sections). Layout: studio-nav sidebar (collapsible), top bar with command palette (cmdk), breadcrumbs, dark mode. Data from /api/studio/* and server actions. (Auth enforcement lands in Phase 6, but guard every route with requireRole() now.)

SECTIONS
1. /studio — dashboard: kpi-cards (revenue, orders, clients, items, with period-over-period change), revenue-chart (Recharts revenue + orders over time), recent orders, low-stock list, top sellers.
2. /studio/catalog — catalog-table (paginated, search, filters, bulk actions, inline state toggle) + catalog-form (create/edit: title, slug, description, summary, gallery manager with drag-reorder + cover, collection/subCollection, price/listPrice, options matrix generator, labels, details, stock, meta, state, spotlight/isFresh/isOffer, shipWeight, packSize).
3. /studio/collections — collection tree (drag to reorder/nest), edit form, visibility toggle.
4. /studio/orders and /studio/orders/[id] — orders-grid (status badges, filters, search) + order-view (lines, totals, timeline, payment, addresses, status transitions, refund, print invoice, notes).
5. /studio/clients and /studio/clients/[id] — clients-grid + client-profile (details, order history, lifetime value, notes, segment tags).
6. /studio/stock — inventory tracking: per-option stock, low-stock thresholds, adjust with reason, history, CSV export.
7. /studio/campaigns — campaigns-table (email campaigns: draft/scheduled/sent, stats) + promo-table (coupons: type, value, limits, schedule, usage).
8. /studio/content — CMS: hero banner editor, home-blocks manager (create/order/toggle, manual or auto picking, display settings, live preview), asset-library (browse/upload/search/tag assets), pages-table (CMS pages), articles-table (journal articles + looks).
9. /studio/insights — revenue/orders/clients/item reports with insight-filters (date range, collection, channel), charts, CSV export.
10. /studio/exchanges — returns/exchanges queue: request, approve, receive, refund/exchange, reasons analytics.
11. /studio/settings — store profile, currency, taxes, shipping zones/rates, payment providers, email templates, roles/users, integrations, SEO defaults.
Extra routes: /studio/quick-add (fast single-item add flow), /studio/bulk-import (CSV/Excel import with column mapping, validation report, dry-run), /studio/page-builder (visual CMS page editor with blocks, preview, publish).

All 15 studio components, new names: studio-nav, kpi-cards, revenue-chart, catalog-table, catalog-form, orders-grid, order-view, clients-grid, client-profile, promo-table, campaigns-table, asset-library, articles-table, pages-table, insight-filters.

DONE WHEN: every section works end-to-end against the DB (real CRUD, no mock arrays), forms use Zod, tables are keyboard-accessible, and typecheck/lint/build pass.
````

---

## PHASE 6 — Advanced features (new, not in the original)

````text
PHASE 6 — Implement the gaps and the new differentiators. Build in this order; each item needs tests and Studio controls where relevant.

A. FOUNDATION GAPS (must ship)
1. Authentication — Auth.js v5: email+password (argon2), Google, passwordless magic link (Resend). Roles: client, staff, manager, owner. Middleware protects /studio/** and /me/** and write APIs. Admin 2FA (TOTP), session list + revoke, login rate limit, audit log of studio actions.
2. Bag state — Zustand store persisted to localStorage, synced to server Bag for signed-in clients, guest→account merge on login, optimistic updates, slide-over mini-bag (vaul drawer), 15-minute stock reservation at checkout.
3. Orders — /api/orders create + read, order numbers MD-YYYY-000123, lifecycle pending→paid→packed→shipped→delivered, cancel/refund, status timeline, invoice PDF, public tracking page /track/[orderNo] (with email + orderNo check).
4. Payments — Stripe Payment Element + webhooks (STRIPE_WEBHOOK_SECRET), idempotent order finalization, taxes, shipping rates by zone/weight, promo codes, gift cards, store credit. Put payments behind a provider-adapter interface so other gateways and cash-on-delivery can be added.
5. Media — Cloudinary signed uploads in asset-library (drag-drop, multi-file, progress, auto AVIF/WebP, focal point, tags, AI-suggested alt text).
6. Email — Resend + React Email templates: welcome, order confirmed, shipped, delivered, exchange update, password reset, abandoned bag, back-in-stock, price-drop, campaign sends; unsubscribe + preference center.
7. Reviews & questions API — create/list/moderate; verified-purchase badge, photo reviews, helpful votes, staff replies, spam filter; ratingStats recalculated on change.
8. Search UI — /search page + Cmd/Ctrl-K command palette with autocomplete, typo tolerance, recent searches, collection/label facets, zero-result suggestions, keyboard navigation.
9. Analytics — Vercel Analytics + custom events (view_item, add_to_bag, begin_checkout, purchase, search, wishlist_add) with consent banner (cookie preferences).

B. DIFFERENTIATORS (new — nothing like this in the original)
10. Modo Stylist — AI shopping assistant (LLM via LLM_API_KEY): chat widget that recommends outfits from the live catalog (tool-calling over /api/catalog), respects stock, links to items, "build a look" from a prompt or uploaded photo. Rate-limited, logged, no hallucinated items (only returns real item ids).
11. Fit assistant — size recommender using the client's past purchases, fit feedback ("runs small/large"), and per-item size charts; shows confidence and reduces exchanges.
12. Shoppable Lookbook — hotspots on look images → quick-add popovers; "shop the whole look" adds all items to bag.
13. Drops — scheduled launches with countdown, waitlist/early access for rewards tiers, auto-publish at time, sold-out → back-in-stock alerts.
14. Rewards — points on purchases/reviews/referrals, tiers (e.g. Ember, Clay, Atelier), referral links, birthday perk, gift cards, store credit; /me/rewards dashboard.
15. Wishlist & compare — heart items (guest → account merge), shareable wishlist link, price-drop + low-stock alerts, compare up to 4 items side by side, recently viewed rail.
16. Smart promotions engine — automatic discounts (BOGO, tiered spend, bundle, free shipping threshold), stackable rules, usage caps, schedule, preview calculator in Studio.
17. Abandoned-bag recovery — timed email sequence with dynamic bag contents and optional one-time code; recovery stats in insights.
18. Multi-currency + i18n — next-intl, locale routing, currency conversion with cached rates, localized number/date formats, RTL-ready layout.
19. PWA — installable, offline shell + cached bag/wishlist, web-push for drops and order updates.
20. Studio superpowers — AI-written item descriptions + SEO meta from a few keywords/photos, bulk edit, saved table views, real-time new-order notifications (SSE), customer segments, inventory forecast ("days of stock left"), audit log viewer, role-based permissions matrix.
21. Sustainability & care — per-item materials, origin, care instructions, and impact badges shown on item pages (data-driven from details[]).
22. Gift flows — gift message, gift wrap option, gift-card purchase and redeem at checkout.

DONE WHEN: signup→browse→bag→pay (Stripe test mode)→email→order visible in Studio→ship→track works end-to-end, with Playwright e2e covering it, and every feature above is reachable from the UI.
````

---

## PHASE 7 — Hardening, SEO, performance, tests, launch, clone-proof audit

````text
PHASE 7 — Production readiness.

SECURITY: CSP + all security headers verified; Zod on every input; output sanitization for rich text (journal body, reviews); CSRF protection on mutations; file-type/size checks on uploads; secrets only via env; dependency audit clean; role-permission tests for every Studio route and write API.

SEO: generateMetadata everywhere; JSON-LD (Organization, WebSite+SearchAction, Product for items, BreadcrumbList, Article for journal); sitemap.ts and robots.ts; canonical + hreflang; dynamic OG images via next/og for items, collections, journal.

PERFORMANCE: ISR / partial prerendering with revalidateTag on every Studio mutation; next/image with Cloudinary loader; route-level code splitting; font subsetting; Core Web Vitals budgets (LCP < 2.5s, CLS < 0.1, INP < 200ms) with a CI check.

ACCESSIBILITY: axe checks in Playwright; keyboard-only run of checkout; focus management in drawers/dialogs; reduced motion.

TESTING & CI: Vitest unit + API tests, Playwright e2e (browse, search, bag, checkout, studio CRUD, auth), GitHub Actions running typecheck, lint, test, build; Sentry for errors; seed script for preview deployments.

DEPLOY: Vercel project config, env checklist, MongoDB Atlas indexes (incl. Atlas Search index definition committed in /scripts), Stripe + Resend + Cloudinary webhooks documented in README.

FINAL AUDIT — CLONE-PROOF CHECK (must return zero hits):
  grep -rniE "luxe|next-commerce|mflix|movie|\bProduct(s|Section)?\b|\bCategor(y|ies)\b|HeroSection|page-sections|use-mobile|use-toast|/admin|/products|/category|/cart\b|geist" --exclude-dir=node_modules --exclude-dir=.next --exclude=pnpm-lock.yaml .
Allowed exceptions ONLY: third-party package names, JSON-LD "Product" schema type, and Stripe/Cloudinary/Resend env names. Also verify: no package-lock.json, no ignoreBuildErrors/ignoreDuringBuilds, no `images.unoptimized`, no "latest" versions, no default shadcn palette, no create-next-app README text.

COVERAGE CHECKLIST (all must be true): 15 customer routes + Journal/Lookbook, 11 studio sections + quick-add/bulk-import/page-builder, all API endpoints from table D, 5+ model groups from table E, 17 storefront components, 15 studio components, 2 hooks, 3 type files, 10 original gaps closed (auth, bag state, payments, orders, search UI, image storage, email, analytics events, page builder, Movies replaced).

DONE WHEN: audit is clean, CI is green, and the app is deployed to a Vercel preview URL.
````

---

## Quick reference — what was changed and why
- **Same site, new identity:** brand, routes, API paths, models, fields, components, hooks, env vars, fonts and visual theme all renamed (tables A–J in Prompt 0).
- **Movies feature replaced** with a Journal + shoppable Lookbook (on-brand, and it removes the most recognizable oddity).
- **Original gaps closed:** auth, bag state, payments, orders, search UI, image uploads, email, analytics events, page builder.
- **Template mistakes fixed:** removed build-error suppression, unoptimized images, "latest" versions, React 18 types on React 19, duplicate lockfiles, leftover Tailwind v3 plugin/autoprefixer, boilerplate README, hard-coded route in tsconfig.
- **New differentiators:** AI Stylist, fit assistant, drops, rewards, promotions engine, abandoned-bag recovery, multi-currency/i18n, PWA, Studio AI tools, and more (Phase 6).
