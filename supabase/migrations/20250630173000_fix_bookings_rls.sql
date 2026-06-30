-- Fix bookings RLS: public can submit booking requests, admins can read/update.

alter table public.bookings enable row level security;

-- Remove old/conflicting policies
drop policy if exists "Anyone can insert a booking" on public.bookings;
drop policy if exists "bookings_insert_public" on public.bookings;
drop policy if exists "Auth users can read bookings" on public.bookings;
drop policy if exists "Auth users can update bookings" on public.bookings;
drop policy if exists "bookings_select_admin" on public.bookings;
drop policy if exists "bookings_update_admin" on public.bookings;
drop policy if exists "anon_insert" on public.bookings;
drop policy if exists "auth_select" on public.bookings;
drop policy if exists "auth_update" on public.bookings;

-- Public booking form (anon role)
create policy "anon_insert"
  on public.bookings
  for insert
  to anon
  with check (true);

-- Admin dashboard (authenticated users)
create policy "auth_select"
  on public.bookings
  for select
  to authenticated
  using (true);

create policy "auth_update"
  on public.bookings
  for update
  to authenticated
  using (true)
  with check (true);

grant usage on schema public to anon, authenticated;
grant insert on public.bookings to anon;
grant select, update on public.bookings to authenticated;
