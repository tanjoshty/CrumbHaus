# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CrumbHaus is a full-stack cake ordering platform. Customers browse and order cakes; admins manage orders and products. Stack: Next.js frontend + Express backend, Supabase (Auth + PostgreSQL), Stripe planned for payments. See `README.md` for the full project plan and phases, and `db-design.md` for the database design.

## Monorepo Structure

pnpm workspaces:
- `apps/backend/` — Express 5 + TypeScript REST API (port 4000; **not 5000** — macOS AirPlay squats on it)
- `apps/frontend/` — Next.js 16 + React 19 + Tailwind CSS 4 + shadcn/ui (port 3000)
- `packages/` — shared TypeScript types (not yet populated)
- `db/schema.sql` — Postgres DDL, run manually in the Supabase SQL editor

Root scripts: `pnpm dev` (both apps in parallel), `pnpm dev:fe`, `pnpm dev:be`.

## Backend

Run from `apps/backend/` (or root via `pnpm dev:be`):

```bash
pnpm dev          # tsx watch, loads .env
pnpm build        # tsc → dist/
pnpm start        # run built output
pnpm lint         # eslint
pnpm type-check   # tsc --noEmit
```

Deliberately minimal — plain Express, no framework libs. Layering:

- `src/index.ts` — reads `PORT`, starts server
- `src/app.ts` — express app, middleware, mounts routers under `/api/*`
- `src/routes/*.routes.ts` — HTTP layer, one router per resource
- `src/services/*.service.ts` — business logic + (for now) stub data; DB access will live here or in a repo layer once Drizzle/Supabase is wired up

`GET /api/health` for smoke checks. Config comes from `apps/backend/.env` (gitignored), loaded via Node's `--env-file` — no dotenv dependency.

## Frontend

Run from `apps/frontend/` (or root via `pnpm dev:fe`):

```bash
pnpm dev    # next dev
pnpm build  # next build
pnpm lint   # eslint
```

> **Important:** Next.js 16 has breaking API changes from older versions. Before writing frontend code, read the relevant guide in `apps/frontend/node_modules/next/dist/docs/` and heed deprecation notices. Known example: `middleware.ts` is deprecated — this project uses `proxy.ts`.

### Auth (Supabase password-based template)

- `lib/supabase/client.ts` — browser client for Client Components (sign-in/up forms)
- `lib/supabase/server.ts` — server client for Server Components; reads session from cookies
- `lib/supabase/middleware.ts` — `updateSession()` helper: refreshes the auth token cookie and returns `{ response, user }`
- `proxy.ts` — Next.js request interceptor (the Next 16 replacement for middleware.ts). Calls `updateSession` on every request; owns route protection. Currently only `/admin/*` requires auth — all other pages are public. Add new protected prefixes here.
- Auth pages live in `app/auth/*` (login, sign-up, forgot/update password, confirm). `app/admin/page.tsx` also does a page-level `getClaims()` check as a fallback.

### Styling

- Brand colors are defined in the `@theme` block of `app/globals.css`: `cream` #F5EDD3, `cobalt` #2350B5, `ink` #12205A (used as `bg-cream`, `text-cobalt`, etc.)
- Fonts load via `next/font/google` in `app/layout.tsx` — never via CSS `@import` (breaks PostCSS ordering). Jost = body (`font-sans`), Barlow Condensed = headings (`font-display`).

## Database

Schema design in `db-design.md`, DDL in `db/schema.sql`. Key conventions: uuid PKs, `numeric(10,2)` for money, `order_item.unit_price` is a price snapshot (deliberately not a FK), the `order` table must be quoted (reserved word). Order capacity is modeled via `weekly_capacity` (recurring, day_of_week 0 = Mon) plus `capacity_override` (specific dates, 0 = closed).
