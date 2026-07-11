-- Enums
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'in_progress', 'ready', 'completed', 'cancelled');
CREATE TYPE fulfillment_type AS ENUM ('pickup', 'delivery');

-- ── Customers ─────────────────────────────────────────────────────────────────

CREATE TABLE customer (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid UNIQUE REFERENCES auth.users(id),  -- null for guest checkouts; UNIQUE = one customer per registered user (NULLs are distinct, so guests are unlimited)
  email        text,
  phone_number text,
  address      text,
  CHECK (user_id IS NOT NULL OR email IS NOT NULL)  -- every customer is reachable: an auth account or an email
);

-- ── Orders ────────────────────────────────────────────────────────────────────

CREATE TABLE "order" (
  id               uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      uuid             NOT NULL REFERENCES customer(id),
  status           order_status     NOT NULL DEFAULT 'pending',
  total            numeric(10, 2)   NOT NULL,
  created_at       timestamptz      NOT NULL DEFAULT now(),
  fulfillment_type fulfillment_type NOT NULL,
  delivery_address text,  -- snapshot at checkout; null for pickup
  CHECK (fulfillment_type <> 'delivery' OR delivery_address IS NOT NULL)  -- delivery orders must have an address
);

CREATE TABLE order_item (
  id                uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          uuid           NOT NULL REFERENCES "order"(id),
  sanity_product_id text           NOT NULL,  -- references a Sanity product document _id (no FK; content lives in Sanity)
  variations        jsonb          NOT NULL DEFAULT '{}'::jsonb,  -- snapshot of chosen options, e.g. {"size":"6 Inch","flavour":"Vanilla","colour":"Cobalt"}
  quantity          integer        NOT NULL CHECK (quantity > 0),
  unit_price        numeric(10, 2) NOT NULL,  -- price snapshot at time of order, not a FK
  fulfillment_date  date           NOT NULL,  -- per-item pickup/delivery date; drives capacity accounting
  notes             text                      -- optional per-item note, e.g. "Happy 30th Sarah"
);

-- ── Capacity ──────────────────────────────────────────────────────────────────

CREATE TABLE weekly_capacity (
  id          uuid     PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),  -- 0 = Mon
  max_items   integer  NOT NULL CHECK (max_items >= 0),  -- max cakes fulfillable on this weekday
  active_from date     NOT NULL
);

CREATE TABLE capacity_override (
  id         uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  date       date    NOT NULL UNIQUE,
  max_items  integer NOT NULL CHECK (max_items >= 0),  -- 0 = closed
  note       text
);
