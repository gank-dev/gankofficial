-- ============================================================
-- GANK SERVICE
-- Initial Database Schema
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

create type public.user_role as enum (
  'OWNER',
  'ADMIN',
  'TECHNICIAN'
);

create type public.service_order_status as enum (
  'RECEIVED',
  'CHECKLIST_1',
  'CHECKING',
  'WAITING_APPROVAL',
  'REPAIRING',
  'CHECKLIST_AFTER_SERVICE',
  'TESTING',
  'READY',
  'COMPLETED',
  'CANCELLED'
);

create type public.approval_status as enum (
  'PENDING',
  'APPROVED',
  'REJECTED',
  'OVERRIDDEN'
);

-- ============================================================
-- USERS
-- ============================================================

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'TECHNICIAN',
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- CUSTOMERS
-- ============================================================

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index customers_phone_idx
  on public.customers(phone);

-- ============================================================
-- DEVICES
-- ============================================================

create table public.devices (
  id uuid primary key default gen_random_uuid(),

  customer_id uuid not null
    references public.customers(id)
    on delete restrict,

  brand text not null,
  model text not null,

  imei text,
  serial_number text,
  color text,

  physical_condition text,
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index devices_customer_id_idx
  on public.devices(customer_id);

create index devices_imei_idx
  on public.devices(imei);

-- ============================================================
-- SERVICE ORDERS
-- ============================================================

create table public.service_orders (
  id uuid primary key default gen_random_uuid(),

  ticket_number text not null unique,

  customer_id uuid not null
    references public.customers(id)
    on delete restrict,

  device_id uuid not null
    references public.devices(id)
    on delete restrict,

  assigned_technician_id uuid
    references public.users(id)
    on delete set null,

  status public.service_order_status not null
    default 'RECEIVED',

  complaint text not null,

  initial_condition text,

  estimated_cost numeric(15,2),
  final_cost numeric(15,2),

  customer_approved_at timestamptz,
  completed_at timestamptz,

  public_tracking_token uuid not null
    default gen_random_uuid()
    unique,

  internal_notes text,

  received_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index service_orders_customer_id_idx
  on public.service_orders(customer_id);

create index service_orders_device_id_idx
  on public.service_orders(device_id);

create index service_orders_status_idx
  on public.service_orders(status);

create index service_orders_technician_idx
  on public.service_orders(assigned_technician_id);

-- ============================================================
-- SERVICE STATUS HISTORY
-- ============================================================

create table public.service_status_history (
  id uuid primary key default gen_random_uuid(),

  service_order_id uuid not null
    references public.service_orders(id)
    on delete cascade,

  from_status public.service_order_status,

  to_status public.service_order_status not null,

  changed_by uuid
    references public.users(id)
    on delete set null,

  note text,

  created_at timestamptz not null default now()
);

create index service_status_history_order_idx
  on public.service_status_history(service_order_id);

create index service_status_history_created_idx
  on public.service_status_history(created_at);

-- ============================================================
-- APPROVAL HISTORY
-- ============================================================

create table public.service_approval_history (
  id uuid primary key default gen_random_uuid(),

  service_order_id uuid not null
    references public.service_orders(id)
    on delete cascade,

  status public.approval_status not null,

  estimated_cost numeric(15,2),

  acted_by uuid
    references public.users(id)
    on delete set null,

  reason text,

  created_at timestamptz not null default now()
);

create index service_approval_history_order_idx
  on public.service_approval_history(service_order_id);

-- ============================================================
-- SERVICE PHOTOS
-- ============================================================

create type public.service_photo_type as enum (
  'INITIAL_CONDITION',
  'REPAIR_PROCESS',
  'FINAL_CONDITION'
);

create table public.service_photos (
  id uuid primary key default gen_random_uuid(),

  service_order_id uuid not null
    references public.service_orders(id)
    on delete cascade,

  photo_type public.service_photo_type not null,

  storage_path text not null,

  caption text,

  uploaded_by uuid
    references public.users(id)
    on delete set null,

  created_at timestamptz not null default now()
);

create index service_photos_order_idx
  on public.service_photos(service_order_id);

-- ============================================================
-- TICKET NUMBER GENERATOR
-- ============================================================

create sequence public.service_ticket_sequence;

create or replace function public.generate_ticket_number()
returns text
language plpgsql
as $$
declare
  sequence_number bigint;
begin
  sequence_number := nextval('public.service_ticket_sequence');

  return 'GS-' ||
         lpad(sequence_number::text, 6, '0');
end;
$$;

alter table public.service_orders
  alter column ticket_number
  set default public.generate_ticket_number();

-- ============================================================
-- UPDATED AT
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

create trigger customers_set_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

create trigger devices_set_updated_at
before update on public.devices
for each row
execute function public.set_updated_at();

create trigger service_orders_set_updated_at
before update on public.service_orders
for each row
execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.devices enable row level security;
alter table public.service_orders enable row level security;
alter table public.service_status_history enable row level security;
alter table public.service_approval_history enable row level security;
alter table public.service_photos enable row level security;

-- ============================================================
-- AUTHORIZATION HELPERS
-- ============================================================

create or replace function public.get_current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.users
  where id = auth.uid()
    and is_active = true
  limit 1;
$$;

revoke all on function public.get_current_user_role() from public;
grant execute on function public.get_current_user_role()
  to authenticated;

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- USERS

create policy "users_can_read_own_profile"
on public.users
for select
to authenticated
using (
  id = auth.uid()
);

create policy "owner_can_read_all_users"
on public.users
for select
to authenticated
using (
  public.get_current_user_role() = 'OWNER'
);

-- CUSTOMERS

create policy "staff_can_read_customers"
on public.customers
for select
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_create_customers"
on public.customers
for insert
to authenticated
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_update_customers"
on public.customers
for update
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
)
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

-- DEVICES

create policy "staff_can_read_devices"
on public.devices
for select
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_create_devices"
on public.devices
for insert
to authenticated
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_update_devices"
on public.devices
for update
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
)
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

-- SERVICE ORDERS

create policy "staff_can_read_service_orders"
on public.service_orders
for select
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_create_service_orders"
on public.service_orders
for insert
to authenticated
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_update_service_orders"
on public.service_orders
for update
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
)
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

-- STATUS HISTORY

create policy "staff_can_read_status_history"
on public.service_status_history
for select
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_create_status_history"
on public.service_status_history
for insert
to authenticated
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

-- APPROVAL HISTORY

create policy "staff_can_read_approval_history"
on public.service_approval_history
for select
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_create_approval_history"
on public.service_approval_history
for insert
to authenticated
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

-- SERVICE PHOTOS

create policy "staff_can_read_service_photos"
on public.service_photos
for select
to authenticated
using (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

create policy "staff_can_create_service_photos"
on public.service_photos
for insert
to authenticated
with check (
  public.get_current_user_role() in ('OWNER', 'ADMIN', 'TECHNICIAN')
);

