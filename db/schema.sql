-- Enums
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'in_progress', 'ready', 'completed', 'cancelled');
CREATE TYPE fulfillment_type AS ENUM ('pickup', 'delivery');

-- ── Customers ─────────────────────────────────────────────────────────────────

CREATE TABLE customer (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users(id),
  phone_number text,
  address      text
);

-- ── Orders ────────────────────────────────────────────────────────────────────

CREATE TABLE "order" (
  id               uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      uuid             NOT NULL REFERENCES customer(id),
  status           order_status     NOT NULL DEFAULT 'pending',
  total            numeric(10, 2)   NOT NULL,
  created_at       timestamptz      NOT NULL DEFAULT now(),
  fulfillment_type fulfillment_type NOT NULL,
  fulfillment_date date
);

CREATE TABLE order_item (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   uuid           NOT NULL REFERENCES "order"(id),
  sanity_variant_id text    NOT NULL
  quantity   integer        NOT NULL CHECK (quantity > 0),
  unit_price numeric(10, 2) NOT NULL  -- snapshot at time of order, not a FK
);

-- ── Capacity ──────────────────────────────────────────────────────────────────

CREATE TABLE weekly_capacity (
  id          uuid     PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),  -- 0 = Mon
  max_orders  integer  NOT NULL CHECK (max_orders >= 0),
  active_from date     NOT NULL
);

CREATE TABLE capacity_override (
  id         uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  date       date    NOT NULL UNIQUE,
  max_orders integer NOT NULL CHECK (max_orders >= 0),  -- 0 = closed
  note       text
);
