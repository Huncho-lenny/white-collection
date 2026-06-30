-- ── Bookings RLS ─────────────────────────────────────────────────────────────
-- Allow any visitor to submit a booking request
create policy "Anyone can insert a booking"
on bookings for insert
to anon
with check (true);

-- Only the logged-in admin can read bookings
create policy "Auth users can read bookings"
on bookings for select
to authenticated
using (true);

-- Only the logged-in admin can approve / decline
create policy "Auth users can update bookings"
on bookings for update
to authenticated
using (true);

-- ── Properties RLS ────────────────────────────────────────────────────────────
-- Anyone can view properties (public listing)
create policy "Anyone can read properties"
on properties for select
to anon
using (true);
