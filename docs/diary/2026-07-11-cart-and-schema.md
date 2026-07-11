# Session — 2026-07-11 — Cart operational + schema reshape

Covers work since the Week 1 entry (2026-07-09 → 2026-07-11). Two themes: the
client-side cart is now operational end to end, and the Postgres schema was
reshaped to match how products/orders actually work.

## Summary

The cart works: a configured cake can be validated, added to a persisted
Zustand store, confirmed with a toast, and viewed/removed in a slide-in drawer.
Separately, the DB schema got a round of corrections — the biggest being that
`order_item` no longer references a non-existent "variant" entity, plus guest
checkout support and a per-item fulfillment model. The order-placement backend
(cart → order rows, capacity check, payment) is still not built; that remains
the largest open piece.

## Cart — what was built

- **Add to Cart** wired up in `ProductVariants`: builds a `CartItem`, pushes it
  to the store, and fires a Sonner success toast with a "View cart" action.
- **Client-side validation** before adding: size, flavour, and date are required
  (colour too, but only for products that actually have colours). Missing fields
  surface inline via a small `FieldError` helper.
- **`CartDrawer`** — a client island that reads the store and feeds the dumb
  `Cart` component; mounted in the (still server) root layout next to `Toaster`.
- **Header cart trigger** reads item count / opens the drawer from the store.

## Decisions & justifications

### Cart line identity: `lineId`, separate from `productId`

Each cart line gets its own `crypto.randomUUID()` `lineId`. The same cake with
different variations must be two distinct lines, so `productId` alone can't
identify a line, and removing by array index is fragile once the list is
reordered/filtered. `removeItem(lineId)` filters by the stable id, which also
doubles as the React `key`.

### Store shape: state and actions split; immutable updates

`CartStore = CartState & CartActions` so the action methods are actually typed
and reachable off `useCartStore()` (they weren't when the type only described
the data). `addItem` builds a new array (`[...items, item]`) rather than
mutating `get().cartItems` in place, to respect the immutability Zustand/React
assume. `total` is recomputed from the items on every change (cart is tiny;
robustness over micro-optimisation).

### `partialize` so open-state doesn't persist

`isCartOpen` lives in the same store as the cart data, but the `persist`
middleware only writes `cartItems`/`total` via `partialize`. Otherwise closing
the tab with the drawer open would pop it open on the next visit.

### Client island, not a client layout

Opening the cart needs store access, but the layout stays a Server Component —
a small `"use client"` `CartDrawer` island reads the store and passes
`open`/`items`/handlers down to the dumb `Cart`. Same pattern as `Toaster`.
Marking the whole layout client would opt the entire app shell out of server
rendering for no reason.

### Toast over inline alert

Sonner (pinned to the light theme, `next-themes` dependency dropped) confirms
"added to cart" without layout shift, auto-dismisses, is reusable app-wide, and
supports the "View cart" action button. Chosen over an inline alert under the
button.

## Schema — what changed and why

### `order_item`: product id + variations snapshot

`sanity_variant_id` was fiction — there is no variant document in Sanity, just a
product with `sizes[]` / `flavours[]` / `colours[]`. Replaced it with
`sanity_product_id` (no FK; content lives in Sanity) plus a `variations jsonb`
snapshot of the chosen options, mirroring the frontend `CartItem.variations`
object. Chose `jsonb` over a normalised child table because an order line is a
point-in-time snapshot, not relational data to join against, and future cakes
may add new option dimensions. (Also fixed a missing-comma syntax bug that would
have stopped the file running.)

### Per-item fulfillment date → capacity counts cakes

Each cake in the cart has its own date, so `fulfillment_date` moved from `order`
to `order_item`, and `notes` was added there too. Capacity columns renamed
`max_orders` → `max_items` in `weekly_capacity` and `capacity_override`, because
availability is now "cakes fulfillable per day", counted as `SUM(quantity)` of
order items on that date (override wins over weekly; `0` = closed).

### One order, many items — not order-per-cake

Considered splitting each cake into its own order (since dates differ per item),
but kept the standard model: the **order is the checkout/payment unit** (one
customer, one total, one Stripe charge). Splitting would force multiple charges
or re-introduce an order-grouping layer. Per-item dates are a *fulfillment*
concern, handled at the line level. **Open follow-up:** `order.status` can't
express different cakes at different lifecycle stages — item-level status is the
real gap, deferred for now.

### Guest checkout on `customer`

`user_id` is now nullable (guests), with `email` added. Guards added:
`UNIQUE(user_id)` enforces one customer per registered user while still allowing
unlimited guests (Postgres treats NULLs as distinct), and a table `CHECK
(user_id IS NOT NULL OR email IS NOT NULL)` ensures every customer is reachable.
`email` left non-unique so a guest and a later registration can coexist and be
merged deliberately.

### Delivery address snapshot on `order`

Added `delivery_address text` to `order` with `CHECK (fulfillment_type <>
'delivery' OR delivery_address IS NOT NULL)`. Snapshotted on the order (not read
live from `customer.address`) for the same reason as `unit_price`: historical
accuracy (a customer moving must not rewrite past deliveries) and per-order
flexibility (gifting to a different address). `customer.address` is now just a
saved default to pre-fill checkout.

### Correctness fix: `ProductDisplay`

Replaced `client.fetch(...) as Product` with `client.fetch<Product | null>(...)`
plus `if (!product) notFound()`. The cast was lying about nullability and an
un-chained `product._id` would have crashed on an invalid slug; invalid slugs
now 404. `Product | null` is accurate here because the query has no projection.

## What's next

- **Backend order placement** — the big one: cart → `order` + `order_item` rows,
  wrapped in a transaction, with the capacity check (`SUM(quantity)` per
  `fulfillment_date` vs `max_items`, override/closed rules).
- **Item-level status** — decide the `order_item` fulfillment lifecycle and
  whether `order.status` becomes a rollup.
- **Payment** — Stripe, one charge per order.
- **Guest validation** — enforce email (and likely phone) app-side at checkout;
  the DB `CHECK` is only the floor.
- **Migrations** — `db/schema.sql` is a single DDL file, not migrations. If any
  of it is already applied in Supabase, these edits need `ALTER TABLE`s; only a
  fresh DB picks up the new shape by re-running the file.

Smaller cleanups noted: Zustand selector usage vs whole-store destructuring,
the manual TypeGen type copy from Studio to frontend, typing the `ProductGrid`
fetch, and the lingering lint warnings (unescaped quotes, unused prop).
