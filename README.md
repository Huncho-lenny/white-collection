# The White Collection

A direct-booking website for two private villas in Kenya — **White Hill Villa** (Kisumu) and **White Cliff Villa** (Mombasa).

Book directly with us. No middleman, no platform fees.

---

## Live Site

> (https://the-white-collection.vercel.app/)

---

## Stack

- **React 18** + **Vite** + **TypeScript**
- **React Router v6** — client-side routing with protected routes
- **Supabase** — auth (email/password + Google OAuth), database, row-level security
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icons
- **Vercel** — hosting + SPA rewrite

---

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

### Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For Vercel, add these same two variables in **Vercel Dashboard → Settings → Environment Variables**, then redeploy. Vite bakes them at build time — they must be present during the build, not just at runtime.

---

## Project Structure

```
src/
  data/
    properties.ts          villa data — prices, photos, amenities, descriptions
  hooks/                   scroll-reveal + animated counter hooks
  lib/
    supabase.ts            Supabase client + DbBooking type
    auth.tsx               AuthProvider — session, profile, signIn, signUp, signInWithGoogle, signOut
  components/
    AnimationStyles.tsx    global keyframes/animation classes
    ui-elements.tsx        GoldBtn, DarkBtn, SectionHeading, StatCounter, StatusBadge
    PropertyCard.tsx       villa card used on Home + Properties
    Nav.tsx                top navigation (transparent on hero, solid on scroll)
    Footer.tsx             site footer with smooth-scroll anchor links
    AboutUs.tsx            About Us section
    HowItWorks.tsx         How It Works timeline section
    CancellationPolicy.tsx Cancellation Policy section
  pages/
    Home.tsx               landing page — hero, villas, about, how it works, cancellation, CTA
    Properties.tsx         listing of both villas
    PropertyDetail.tsx     routed by /properties/:slug — date/guest inputs wired to booking
    Booking.tsx            3-step booking flow (details → mock payment → confirmed)
    Contact.tsx            contact page
    Account.tsx            guest account — profile + real booking history from Supabase
    Login.tsx              email/password + Google OAuth login
    SignUp.tsx             registration with email confirmation flow
    AuthCallback.tsx       handles Supabase PKCE OAuth redirect
    Admin.tsx              admin dashboard — bookings, properties, stats (role-protected)
  App.tsx                  routes, ProtectedRoute, FULLSCREEN_PATHS
  main.tsx                 entry point
supabase/
  migrations/              SQL migrations — profiles table, RLS policies, trigger
vercel.json                SPA rewrite rule for React Router
```

---

## Features

### Authentication
- Email/password sign up and sign in
- Google OAuth (PKCE flow)
- Auto-created guest profile on sign up (Supabase trigger)
- Role-based access — `customer` and `admin`
- Protected routes — `/booking` and `/account` require login, `/admin` requires `role = admin`
- Redirect-back after login

### Booking Flow
- Select villa, dates, and guests from the property detail page
- 3-step flow: booking details → mock payment → confirmation
- Booking saved to Supabase with `user_id` and `payment_status`
- Guest name and email prefilled from profile

### Guest Account
- View all personal bookings pulled live from Supabase
- Booking status badges (pending / confirmed / cancelled)

### Admin Dashboard
- View and manage all bookings (approve / decline)
- Property management with modal editor
- Stats cards
- Role-protected — only accessible to users with `role = admin`

### Landing Page
- Hero with search bar
- Featured villas
- Why Book Direct section
- Amenities showcase
- About Us
- How It Works (5-step timeline)
- Cancellation Policy
- CTA section

### Footer
- All links functional — property pages, contact, and anchor links to About / How It Works / Cancellation Policy with smooth scroll

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — deployed to Vercel |
| `develop` | Integration branch — merge features here first |
| `feature/*` | Feature branches — branch off `develop` |
| `bugfix/*` | Bug fix branches — branch off `develop` |

---

## Before Launch — Remaining Placeholders

- `src/data/properties.ts` — swap Unsplash stock photos for real villa photos
- `src/pages/Contact.tsx` — replace placeholder phone, email, and WhatsApp link
- `src/pages/Booking.tsx` — replace `wa.me/254700000000` with real WhatsApp number
- `src/data/properties.ts` — confirm actual nightly rates

---

## Phase 2 — Not Built Yet

- Real payment processing (M-Pesa / card)
- Email notifications on booking (Resend / SendGrid)
- Property media gallery (images + video, lightbox, Supabase Storage)
- Availability calendar with block-out dates
- Guest reviews system
- Admin analytics and revenue reporting
- Promo / discount code management
