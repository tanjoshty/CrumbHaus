# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CrumbHaus is a full-stack cake ordering platform. Customers browse and order cakes; admins manage orders and products. The planned stack is Next.js frontend + Express backend with Supabase Auth, Drizzle ORM (PostgreSQL), and Stripe — but the **current backend uses a JSON-file mock ORM** (`MockOrm.ts`) as a stand-in for Drizzle during early development.

## Monorepo Structure

pnpm workspaces with three packages:
- `backend/` — Express.js + TypeScript REST API (port 5000)
- `frontend/` — Next.js 16 + React 19 + Tailwind CSS 4
- `packages/shared/` — shared TypeScript types (not yet populated)

## Backend Commands

Run from `backend/`:

```bash
npm run dev          # watch mode + browser-sync (hot reload)
npm run dev:basic    # single run, no watch
npm run test         # vitest (uses database.test.json, not database.json)
npm run lint         # eslint
npm run format       # prettier
npm run type-check   # tsc --noEmit
npm run build        # lint + tsc + copy static assets
```

Run a single test file:
```bash
npm run test -- tests/users.test.ts
```

Env files live in `backend/config/` (`.env.development`, `.env.test`, `.env.production`). The dev script loads `.env.development` via `DOTENV_CONFIG_PATH`.

## Frontend Commands

Run from `frontend/`:

```bash
npm run dev    # next dev
npm run build  # next build
npm run lint   # eslint
```

> **Important:** This project uses Next.js 16 with React 19, which has breaking API changes from older versions. Before writing frontend code, read the relevant guide in `frontend/node_modules/next/dist/docs/` and heed deprecation notices.

## Backend Architecture

Three-layer pattern: **Routes → Services → Repos**

- **Routes** (`src/routes/`) — HTTP layer only: request validation via `parseReq` + `jet-validators`, then delegates to Services. No business logic.
- **Services** (`src/services/`) — business logic, throws `RouteError` for domain failures.
- **Repos** (`src/repos/`) — data access. Currently `MockOrm.ts` reads/writes `src/repos/common/database.json` (JSON file). Tests use `database.test.json`.
- **Models** (`src/models/`) — TypeScript interfaces + `jet-validators` schemas. Each model exports `new()` (factory with defaults) and `isComplete` (validator for API boundaries).
- **Paths** (`src/common/constants/Paths.ts`) — single source of truth for all route paths. `JetPaths` export generates typed path-builder functions used in tests.

Path alias `@src` maps to `backend/src` in both TypeScript and Vitest config.

## Adding a New Route

1. Add path constants to `Paths.ts`
2. Create a model in `src/models/` with interface + schema
3. Add repo functions in `src/repos/`
4. Add service functions in `src/services/`
5. Create route handlers in `src/routes/` using `parseReq` for validation
6. Wire the router in `src/routes/apiRouter.ts`

## Key Libraries (Backend)

- `jet-env` — typed env var loading
- `jet-logger` — structured logging
- `jet-paths` — typed path builder (generates path functions from the `Paths` constant)
- `jet-validators` / `jet-validators/utils` — runtime type validation and `parseObject`/`testObject` schema builders
- `tspo` — small utility for immutable object updates
