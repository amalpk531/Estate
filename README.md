# Estate

Estate is a responsive real-estate listing website built with React, TypeScript, Vite, and TanStack Router,
and Tailwind CSS. Visitors can browse properties, search and filter listings, view media-rich
property details, contact the listing team, and open WhatsApp conversations with a pre-filled
message.

The current application uses static mock data and public image/video URLs. It does not include a
database, authentication system, admin dashboard, or server-side enquiry storage.

## Quick Start

| Command           | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| `npm install`     | Install dependencies                                    |
| `npm run dev`     | Start the development server at `http://localhost:8080` |
| `npm run build`   | Create a production build                               |
| `npm run preview` | Preview the production build locally                    |
| `npm run lint`    | Run ESLint                                              |
| `npm run format`  | Format the project with Prettier                        |

## Deployment

This is a client-rendered Vite SPA. Deploy the generated `dist` directory.

| Platform | Build command | Output directory | SPA fallback |
| --- | --- | --- | --- |
| Vercel | `npm run build` | `dist` | `vercel.json` |
| Netlify | `npm run build` | `dist` | `public/_redirects` |

The fallback rules are required so refreshing or opening routes such as `/properties` and
`/property/example-slug` does not return a platform 404 page.

## Technology

| Area                  | Technology                               |
| --------------------- | ---------------------------------------- |
| UI                    | React 19 and TypeScript                  |
| Application framework | Vite React SPA                           |
| Routing               | TanStack Router with file-based routes   |
| Styling               | Tailwind CSS v4 and custom design tokens |
| Icons                 | Lucide React                             |
| UI primitives         | Radix UI                                 |
| Build tool            | Vite                                     |
| Data source           | Static JSON mock data                    |

## Routes

| Route             | Purpose                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| `/`               | Hero search, property categories, featured listings, statistics, testimonials, and CTA |
| `/properties`     | Listing grid with URL-backed search, filters, and sorting                              |
| `/property/:slug` | Property gallery, details, videos, enquiry form, contact actions, and similar listings |

## Main Features

### Homepage

- Full-screen local hero image from `public/home.jpg`.
- Search by city or locality and quick links by property type.
- Featured property cards using the shared `PropertyCard` component.
- Animated statistics that count up when they enter the viewport.
- Property categories, benefits, testimonials, and a full-width contact CTA.

### Property discovery

- Search across title, city, locality, and state.
- Filter by listing type, property type, price range, and bedrooms.
- Sort by newest, lowest price, or highest price.
- Filter and sort state is stored in the URL for shareable results.
- Collapsible filter controls and a responsive card grid.

### Property details

- Cover-image media hero with photo and video counts.
- Responsive photo gallery with lightbox navigation.
- YouTube embeds and MP4 video support without autoplay.
- Price, location, bedrooms, bathrooms, area, parking, and furnishing details.
- Amenities, description, similar properties, and enquiry form.
- Phone and WhatsApp contact actions.
- Mobile sticky contact bar with Call, WhatsApp, and Enquire actions.

## Project Structure

| Path                            | Responsibility                                                              |
| ------------------------------- | --------------------------------------------------------------------------- |
| `src/main.tsx`                  | Browser entry point and router mount                                        |
| `src/routes/__root.tsx`         | Application shell, metadata, shared header, footer, and outlet              |
| `src/routes/index.tsx`          | Homepage experience                                                         |
| `src/routes/properties.tsx`     | Listing, filtering, sorting, and search state                               |
| `src/routes/property.$slug.tsx` | Property details route                                                      |
| `src/components/layout/`        | Shared header and footer                                                    |
| `src/components/property/`      | Cards, gallery, video, and enquiry components                               |
| `src/components/ui/`            | Reusable Radix-based UI components                                          |
| `src/data/properties.json`      | Static property records                                                     |
| `src/lib/properties.ts`         | Property types, filters, pricing, contact links, and media helpers          |
| `src/lib/utils.ts`              | Shared class-name utility functions                                         |
| `src/styles.css`                | Tailwind imports, color tokens, typography, shadows, and global transitions |
| `public/home.jpg`               | Homepage hero image                                                         |

## Data and Contact Configuration

| Item           | Current value or location                                |
| -------------- | -------------------------------------------------------- |
| Listings       | `src/data/properties.json`                               |
| Listing count  | 12 static properties                                     |
| Property types | Apartment, Villa, House, Land                            |
| Listing modes  | Buy and Rent                                             |
| Currency       | Indian Rupees (INR)                                      |
| Enquiry phone  | `+91 99478 09632` in `src/lib/properties.ts`             |
| WhatsApp       | Generated by `whatsappLink()` in `src/lib/properties.ts` |
| GitHub         | `https://github.com/amalpk531` in the footer             |

## URL Search Parameters

The `/properties` route supports these query parameters:

| Parameter   | Example              | Description                  |
| ----------- | -------------------- | ---------------------------- |
| `q`         | `q=calicut`          | Search text                  |
| `city`      | `city=Kochi`         | City search alias            |
| `listing`   | `listing=Rent`       | Buy or Rent                  |
| `type`      | `type=Villa`         | Property type                |
| `min_price` | `min_price=5000000`  | Minimum price                |
| `max_price` | `max_price=15000000` | Maximum price                |
| `beds`      | `beds=3`             | Bedroom count; supports `4+` |
| `sort`      | `sort=price_asc`     | Sort order                   |

Example:

```text
/properties?type=Villa&q=calicut&min_price=5000000&sort=price_asc
```

## Development Notes

- Property data is currently mock data and is imported at build time.
- The application is client-rendered; `vercel.json` and `public/_redirects` provide SPA fallbacks.
- Enquiries are validated in the browser and logged locally; they are not persisted.
- Contact details should be updated in `src/lib/properties.ts` rather than duplicated in components.
- Images and videos may come from remote public URLs, so production deployment should account for
  remote asset availability and licensing.

## Current Limitations

- No database or persistent enquiry backend.
- No authentication or admin property management.
- No automated unit, integration, or end-to-end test suite.
- No loading skeleton system for remote media.
