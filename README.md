# Deodar-Brew

A production-ready food-business website demo with a digital menu, cart system, WhatsApp ordering, offers, editable business settings, and a protected admin dashboard. Built to demonstrate Deodar Web Studio website capability for cafes, restaurants, bakeries, cloud kitchens, tea stalls, juice shops, and fast-food businesses.

## What This Proves

Deodar-Brew is not just a static brochure. It demonstrates the everyday website workflows food operators actually need:

- **Cafes** — Featured brews, snacks, pickup ordering, and warm brand presentation
- **Restaurants** — Searchable categories, dish descriptions, prices, offers, location, and hours
- **Bakeries** — Fresh batches, dessert menus, limited specials, and availability toggles
- **Cloud kitchens** — A direct ordering storefront without customer accounts or app downloads
- **Tea stalls** — Lightweight mobile browsing for quick repeat orders and local customers
- **Juice shops** — Seasonal drink menus, customer notes, and fast WhatsApp handoff
- **Fast-food businesses** — Compact combo-friendly menus, cart ordering, and phone-first UX

## Features

- **Digital Menu** — Browse categories, search items, view descriptions and prices
- **Cart System** — Add items, adjust quantities, persists across page refreshes
- **WhatsApp Ordering** — Send a structured order message directly to the cafe on WhatsApp
- **Admin Dashboard** — Manage menu items, categories, offers, gallery, and cafe settings
- **Protected Admin** — JWT-based session authentication with middleware route protection
- **Editable Business Info** — Update phone, WhatsApp number, address, opening hours, maps link, currency, and about text
- **Mobile-First** — Responsive design optimized for phones, tablets, and desktop
- **Cafe-Themed Design** — Warm cream, espresso, and caramel palette with serif headings

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Neon-compatible) |
| ORM | Prisma 5 |
| Validation | Zod |
| Admin Forms | React Hook Form |
| Auth | jose (JWT) + bcryptjs |
| Icons | Lucide React |
| Images | next/image |
| Cart State | React Context + localStorage |

## Setup

### 1. Clone and install

```bash
git clone <repo-url> deodar-brew
cd deodar-brew
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Fill in the values:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (e.g., from Neon) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of the admin password |
| `ADMIN_SESSION_SECRET` | Random secret for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (default: `http://localhost:3000`) |
| `NEXT_PUBLIC_DEODAR_STUDIO_URL` | Optional Deodar Web Studio URL for footer attribution. Set only when the real URL is approved/configured. If unset, attribution is plain text |

#### Generate admin password hash

```bash
node -e "const b=require('bcryptjs');b.hash('yourAdminPasswordHere',12).then(console.log)"
```

Replace `yourAdminPasswordHere` with your actual admin password while generating the hash. Paste only the bcrypt hash into `ADMIN_PASSWORD_HASH`; do not store the plain password in env files.

#### Generate session secret

```bash
openssl rand -base64 32
```

Paste only the random output into `ADMIN_SESSION_SECRET`.

Never commit `.env.local` or any real secrets.

### 3. Set up the database

```bash
npx prisma db push
```

### 4. Seed the database

```bash
npm run seed
```

This creates categories, menu items, offers, gallery images, and default cafe settings.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Prisma Commands

| Command | Description |
|---------|-------------|
| `npx prisma generate` | Regenerate the Prisma client |
| `npx prisma db push` | Push schema changes to the database |
| `npx prisma studio` | Open Prisma Studio (GUI for the database) |
| `npm run seed` | Run the seed script |
| `npx prisma migrate dev` | Create and apply a migration |

## Build

```bash
npm run build
npm start
```

## Environment setup

### Local development

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill `DATABASE_URL` with a local or hosted PostgreSQL connection string.
3. Set `ADMIN_EMAIL` to the admin login email.
4. Generate an admin password hash:

```bash
node -e "const b=require('bcryptjs');b.hash('yourAdminPasswordHere',12).then(console.log)"
```

5. Paste only the bcrypt hash into `ADMIN_PASSWORD_HASH`.
6. Generate an admin session secret:

```bash
openssl rand -base64 32
```

7. Paste only the random secret into `ADMIN_SESSION_SECRET`.
8. Keep `NEXT_PUBLIC_SITE_URL` as `http://localhost:3000` for local development unless you run the app on another local URL.
9. Set `NEXT_PUBLIC_DEODAR_STUDIO_URL` only if the real Deodar Web Studio URL is approved/configured.
10. Never commit `.env.local`.

### Vercel deployment

1. Add the same values in Vercel Project Settings -> Environment Variables.
2. Do not upload `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to the deployed Vercel URL.
4. Set `NEXT_PUBLIC_DEODAR_STUDIO_URL` only if the real Deodar Web Studio URL is approved/configured.
5. Configure `DATABASE_URL` from Neon/Postgres.
6. Run Prisma migration/seed as required for the deployed database.

## Deployment Notes

1. **Set all environment variables** on your hosting platform before enabling admin access.
2. **Update `CafeSettings`** — Replace demo phone, WhatsApp number, address, opening hours, and business copy in the admin settings page or directly in the database.
3. **WhatsApp number format** — Use the full international number without `+` (e.g., `919541206212` for India).
4. **Images** — Use real cafe photos from `/public` or a configured CDN.
5. **Database** — Use a managed PostgreSQL provider like [Neon](https://neon.tech) for serverless compatibility.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── menu/page.tsx       # Menu page
│   └── admin/
│       ├── login/          # Admin login
│       ├── page.tsx        # Dashboard
│       ├── menu/           # Menu CRUD
│       ├── categories/     # Category management
│       ├── offers/         # Offer management
│       └── settings/       # Cafe settings
├── components/
│   ├── cart/               # Cart system
│   ├── public/             # Public site components
│   └── admin/              # Admin components
├── lib/
│   ├── prisma.ts           # Prisma singleton
│   ├── auth.ts             # JWT session auth
│   ├── whatsapp.ts         # WhatsApp URL builder
│   ├── validators.ts       # Zod schemas
│   └── slug.ts             # Slug utility
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── public/assets/          # Static demo images
├── public/placeholders/    # SVG fallback images
├── middleware.ts            # Admin route protection
└── tailwind.config.ts       # Theme configuration
```

## Limitations (v1)

- **No payment gateway** — Orders are placed via WhatsApp; payment is handled at the counter
- **No customer accounts** — No login or order history for customers
- **No delivery tracking** — Pickup only; no delivery integration
- **Demo images** — Local demo images are included; replace them with real business photos before launch
- **WhatsApp number must be configured** — Replace the default placeholder before deployment
- **No inventory management** — Item availability is toggled manually by the admin
- **No multi-branch support** — Single cafe location only
- **No real-time order dashboard** — Orders go to WhatsApp; there is no in-app order tracking

## Credits

Built to demonstrate **Deodar Web Studio** food-business website capability.
