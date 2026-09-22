# Estate — Mini Real Estate Web App

A responsive, frontend-only real estate app: browse properties, search/filter/sort with
shareable URLs, and view a rich details page with a photo lightbox, videos and an enquiry form.

All data is mock data in `src/data/properties.json` (12 properties — Apartment, Villa, House,
Land; Buy and Rent; 6 with videos). No backend.

## Setup

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # production build
```

## Tech

- React 19 + TypeScript
- TanStack Router (file-based routing, type-safe URL search params)
- Tailwind CSS v4 design tokens (`src/styles.css`) — no hardcoded colors in components
- lucide-react icons

## Folder structure

```
src/
  data/properties.json          mock listings
  lib/properties.ts             types, price formatting, filtering, similar, links
  components/layout/            SiteHeader, SiteFooter
  components/property/          PropertyCard, Lightbox, VideoSection, EnquiryForm
  routes/
    __root.tsx                  shell + header/footer
    index.tsx                   / — hero search + featured
    properties.tsx              /properties — listing, filters, sort
    property.$slug.tsx          /property/:slug — details
```

## Features completed

**Listing page (`/properties`)**

- Card grid: cover photo, title, location, formatted price (₹85 Lakhs / ₹1.25 Cr / ₹22,000/mo),
  beds | baths | sq.ft, "Video Available" badge, For Buy/Rent badge.
- Home page `/` with hero search bar, quick type links and Featured Properties.

**Search, filters & sorting**

- Text search on city / locality / state / title.
- Filters: Buy/Rent, property type, min–max price, bedrooms (1, 2, 3, 4+).
- Sort: Newest, Price Low → High, Price High → Low.
- All filters and sort live in the URL, e.g.
  `/properties?type=Villa&q=calicut&min_price=5000000&sort=price_asc`.
  Refresh or share the URL and the same results load (parsed on the server too).
- Result count, "Clear filters", and a friendly "No properties found" state.

**Details page (`/property/:slug`)**

- Media hero with photo/video counts; clicking it opens the gallery.
- Thumbnail grid + full-screen lightbox: next/prev, `3 / 12` counter, close, keyboard
  arrows/Escape, and swipe on mobile.
- Video section: YouTube embeds and MP4 with `controls` and no autoplay.
- Title, price, location, specs (beds, baths, area, parking, furnishing), full description,
  amenities with icons.
- Call (`tel:`) and WhatsApp (`wa.me`) buttons with the pre-filled message
  "Hi, I'm interested in Property ID #PROP-1025. Please share more details."
- Enquiry form: Name, Phone, Email, Message, Preferred Visit Date with validation
  (required fields, 10-digit phone, valid email). On submit it shows a success message and
  `console.log`s the payload including the property ID.
- Similar properties (up to 3, same type or city, current one excluded).
- Invalid slug renders a "Property not found" page.

**Responsive**

- Mobile, tablet and desktop layouts; sticky bottom bar (Call | WhatsApp | Enquire) on the
  mobile details page.

**Extras**

- TypeScript throughout, image lazy loading, per-page SEO/social metadata.

## Not completed

- Admin "Add Property" form (bonus).
- Loading skeletons and unit tests (bonus).

## Assumptions

- Routing uses TanStack Router instead of React Router DOM (same file-based, type-safe routing
  concepts) because that is the router this project template ships with.
- Contact phone number `+91 98765 43210` is a placeholder for all listings.
- Sample YouTube links and a public sample MP4 stand in for real property videos.
- Prices are in INR; rent prices are shown per month.
