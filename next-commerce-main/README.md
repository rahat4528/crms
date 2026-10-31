# Modo — Premium Fashion & Lifestyle

A full-stack e-commerce platform built with **Next.js 15**, **TypeScript**, **MongoDB** and **TailwindCSS v4**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 + Radix UI + shadcn/ui |
| Styling | TailwindCSS v4 |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js v5 (Credentials + RBAC) |
| Payments | Stripe |
| Fonts | Bricolage Grotesque + Manrope + JetBrains Mono |

## Getting Started

### 1. Clone and install

```bash
git clone <repo>
cd modo
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for all required variables.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
modo/
├── app/                  # Next.js App Router pages
│   ├── api/              # REST API routes
│   ├── admin/            # Admin dashboard
│   ├── account/          # Customer account
│   └── (auth)/           # Auth pages (login, register)
├── components/           # React components
│   ├── ui/               # shadcn/ui primitives
│   └── admin/            # Admin-specific components
├── lib/                  # Utilities
│   ├── env.ts            # Zod env validation
│   ├── mongoose.ts       # MongoDB connection
│   └── utils.ts          # Helper utilities
├── models/               # Mongoose schemas
├── types/                # TypeScript types
└── hooks/                # Custom React hooks
```

## Features

- 🛍️ **Storefront** — Product browsing, search, filtering, cart, checkout
- 🔐 **Authentication** — Email/password login with RBAC (customer + admin)
- 📦 **Admin Dashboard** — Full product, order, customer, and content management
- 🎨 **CMS** — Hero section and product sections managed from admin
- 🌙 **Dark Mode** — Full light/dark theme support
- 📱 **Responsive** — Mobile-first design

## License

MIT
