# Modo — Considered Fashion & Living

A full-stack e-commerce platform built with **Next.js 15**, **TypeScript**, **MongoDB** and **TailwindCSS v4**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (Strict) |
| UI | React 19 + Radix UI + shadcn/ui |
| Styling | TailwindCSS v4 |
| Database | MongoDB Atlas + Mongoose |
| Auth | Auth.js v5 (Credentials + RBAC) |
| Payments | Stripe |
| Fonts | Bricolage Grotesque + Manrope + JetBrains Mono |

## Getting Started

### 1. Clone and install

```bash
git clone <repo>
cd modo-web
pnpm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and configure your credentials:

```bash
cp .env.example .env.local
```

### 3. Seed database

```bash
pnpm db:seed
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for all required variables (`MODO_DATABASE_URL`, `AUTH_SECRET`, etc.).

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint check |
| `pnpm typecheck` | Run TypeScript type checking (`tsc --noEmit`) |
| `pnpm db:seed` | Populate database with realistic demo data |
| `pnpm test` | Run unit & API test suite |
| `pnpm test:e2e` | Run Playwright end-to-end tests |

## Project Architecture

```
modo-web/
├── app/                  # Next.js App Router
│   ├── api/              # REST API (/api/catalog, /api/collections, /api/orders, /api/journal, etc.)
│   ├── studio/           # Modo Studio admin workspace
│   ├── me/               # Client account area (/me/orders, /me/addresses, /me/wishlist, etc.)
│   ├── shop/             # Catalog browsing and piece detail (/shop, /shop/[slug])
│   ├── collections/      # Curated collection views (/collections/[slug])
│   ├── bag/              # Shopping bag
│   ├── checkout/         # Multi-step checkout & confirmation
│   ├── journal/          # Editorial stories & essays
│   └── lookbook/         # Shoppable looks with interactive hotspots
├── components/           # React components
│   ├── ui/               # Radix UI primitives
│   └── studio/           # Studio workspace management components
├── lib/                  # Utilities (db.ts, cn.ts, env.ts, api.ts)
├── models/               # Mongoose schemas (Item, Collection, Blocks, Order, etc.)
├── types/                # TypeScript interfaces and Zod schemas
└── hooks/                # Custom hooks (use-viewport, use-notify)
```

## Key Features

- 🛍️ **Storefront** — Piece browsing, faceted search, filtering, bag, checkout
- 🔐 **Authentication** — Email/password credentials with RBAC (client, staff, manager, owner)
- 📦 **Modo Studio** — Full catalog, collection tree, order lifecycle, client CRM, and insights
- 🎨 **CMS & Layout** — Hero banner and dynamic home blocks managed from Studio
- 📖 **Editorial & Looks** — Journal dispatches and interactive shoppable lookbook
- 🌙 **Dark Mode** — Light/Dark OKLCH theme (sand / ink / clay / moss)

## License

MIT
