# Cake Platform — Project Plan

## Overview
A full-stack cake ordering platform for a small business. Customers browse and order cakes; admins manage orders and products. Built to professional standards as a learning project with real AWS infrastructure.

---

## Goals
- [ ] Customer-facing storefront: browse cakes, view details, place orders
- [ ] Checkout with Stripe payments
- [ ] Customer account: order history, order status
- [ ] Admin dashboard: manage products, view and update orders
- [ ] Strapi CMS integration (later phase): manage site content, images, SEO
- [ ] Production-grade AWS infrastructure

---

## Tech Stack

### Frontend
- **Next.js** (App Router) + **React** + **TypeScript**
- SSR/Server Components for catalogue pages (SEO + performance)
- Client components for interactive UI (cart, checkout, auth flows)
- Tailwind CSS for styling

### Backend
- **Express.js** + **Node.js** + **TypeScript**
- Stateless REST API — all business logic lives here
- Handles auth verification, orders, payments, admin operations
- Runs on port `5000` inside its Docker container

### Auth
- **Supabase Auth** — JWT-based, managed service
- Frontend handles sign-in/sign-up via Supabase client
- Express middleware verifies Supabase JWT on every protected route

### Database
- **Supabase PostgreSQL**
- ORM: **Drizzle** (TypeScript-first, lightweight)
- Use Supabase's **PgBouncer pooling connection string** in ECS (not direct connection) to avoid hitting connection limits

### Payments
- **Stripe** — checkout and payment intents
- Stripe webhooks hit Express BE to update order state

### CMS (later phase)
- **Strapi** — self-hosted, deployed as its own ECS service
- Manages homepage content, images, SEO metadata
- Frontend fetches Strapi content at build/request time

### Monorepo
- **pnpm workspaces**
- Shared TypeScript types in `packages/shared` (e.g. `Order`, `Product`, `User`)

---

## Directory Structure

```
cake-platform/
├── package.json              # pnpm workspaces root
├── packages/
│   └── shared/               # Shared TypeScript types & utils
│       └── src/types/
├── frontend/                 # Next.js app
│   ├── Dockerfile
│   └── src/
│       ├── app/              # App Router pages
│       ├── components/
│       └── lib/              # API client, Supabase client
└── backend/                  # Express API
    ├── Dockerfile
    └── src/
        ├── controllers/      # HTTP layer — req/res handling
        ├── services/         # Business logic
        ├── models/           # Drizzle schemas & queries
        ├── middleware/       # Auth, error handler, rate limiting
        └── server.ts
```

---

## AWS Infrastructure

```
Internet
   │
   ▼
CloudFront (CDN, caching, SSL termination)
   │
   ▼
ALB (Application Load Balancer)
   ├── /* ──────────────────▶ ECS Service: Frontend (2 tasks, Next.js)
   └── /api/* ──────────────▶ ECS Service: Backend  (2 tasks, Express)
                                       │
                                       ▼
                               Supabase (PostgreSQL + Auth)
                               Stripe API
```

- **ECS Fargate** — serverless containers, no EC2 to manage
- **2 tasks per service** — high availability, ECS handles restarts
- **Auto-scaling** on CPU/memory per service
- All services live inside a **VPC**; only ALB is public-facing
- Supabase is external (managed), accessed over SSL

### Later: Strapi
- Add a third ECS service behind `/cms/*` or a separate subdomain
- Attach an EBS volume or S3 bucket for media uploads

---

## CI/CD — GitHub Actions

- **On PR:** lint, type-check, run tests
- **On merge to main:** build Docker images → push to ECR → deploy to ECS (rolling update)
- Separate workflows for `frontend/` and `backend/` (path-filtered)
- Secrets stored in GitHub Actions secrets / AWS Secrets Manager

---

## Phases

### Phase 1 — Foundation
- Monorepo setup, shared types, Docker configs
- Express API skeleton with Supabase auth middleware
- Next.js app with Supabase auth (sign in, sign up, session)
- Basic product catalogue (read from DB, SSR)

### Phase 2 — Ordering
- Cart (client state or lightweight server session)
- Stripe checkout integration
- Order creation on BE, Stripe webhook → order status update
- Customer order history page

### Phase 3 — Admin
- Admin-only middleware on BE routes
- Admin dashboard: view all orders, update order status
- Product management: create, edit, delete cakes

### Phase 4 — Infrastructure
- Dockerise both services
- Set up VPC, ECS Fargate, ALB, CloudFront on AWS
- GitHub Actions CI/CD pipeline
- Environment config (dev / staging / prod)

### Phase 5 — CMS (Strapi)
- Spin up Strapi, define content types (homepage, SEO, banners)
- Frontend fetches Strapi content at request time
- Deploy Strapi as its own ECS service

---

## Key Decisions & Notes
- Supabase JWT verified in Express middleware — FE never hits DB directly for mutations
- Drizzle ORM: use PgBouncer pooling URL in production
- Stripe webhooks are unauthenticated endpoints — verify with Stripe signature, not Supabase JWT
- Strapi introduced only after core ordering flow is stable
- EKS explicitly out of scope — ECS Fargate is sufficient