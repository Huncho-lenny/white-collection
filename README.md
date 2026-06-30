# The White Collection

A direct-booking website for two private villas in Kenya — White Hill Villa (Kisumu) and White Cliff Villa (Mombasa).

This started as a Figma Make concept (visual style + layout inspiration only) and was rebuilt from scratch as a real, maintainable React project: split into proper pages/components, real React Router routing, 2 real villas instead of 6 fake international ones, KSh pricing, and an honest admin view (no invented revenue numbers).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Project structure

```
src/
  data/properties.ts       villa data — edit this to change prices, photos, amenities, descriptions
  hooks/                   scroll-reveal + animated counter hooks
  components/
    AnimationStyles.tsx    global keyframes/animation classes
    ui-elements.tsx        buttons, section headings, stat counter
    PropertyCard.tsx       villa card used on Home + Properties
    Nav.tsx                top navigation
    Footer.tsx             site footer
  pages/
    Home.tsx
    Properties.tsx         listing of both villas
    PropertyDetail.tsx     routed by /properties/:slug
    Booking.tsx            booking request form (no payment yet — sends a request, confirmed manually)
    Contact.tsx
    Admin.tsx              basic admin view — property list + booking placeholder
  App.tsx                  routes are wired up here
  main.tsx                 entry point
```

## Before launch — replace these placeholders

- `src/data/properties.ts` — swap Unsplash stock photos for real villa photos
- `src/pages/Contact.tsx` — real phone number, email, WhatsApp link
- `src/pages/Booking.tsx` — the WhatsApp link (`wa.me/254700000000`) — same number throughout, search for it
- Pricing in `src/data/properties.ts` — confirm actual nightly rates

## What's intentionally not built yet (Phase 2)

- No real backend — booking "submits" only show a confirmation message, nothing is saved
- No payments (M-Pesa/card) — bookings are confirmed manually via WhatsApp for now
- No admin login/auth — the `/admin` route is open, just for demoing the concept
- No email notifications, no guest reviews system yet
