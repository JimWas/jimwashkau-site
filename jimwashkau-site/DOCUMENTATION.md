# Developer Documentation

This document is the working guide for future developers maintaining JimWashkau.com.

## Project Overview

JimWashkau.com is a single page React application with a manual route switch in `src/App.tsx`. It is not using React Router. Each standalone page is a React component that is selected based on `window.location.pathname`.

The homepage is also in `src/App.tsx`. It contains the top mission hero, product promo sections, iOS apps preview, support section, live telemetry map, capabilities, What's New preview, mission log list, modal log reader, and contact section.

## Development Workflow

1. Install dependencies with `npm install`.
2. Start development with `npm run dev`.
3. Make focused edits in `src`.
4. Run `npm run build` before committing.
5. If changing visible layout, verify the page in a browser at desktop and mobile widths.
6. Update `src/data/siteUpdates.ts` and `CHANGELOG.md` for user facing additions.

## Routing Pattern

Routes are handled near the top of `App()` in `src/App.tsx`.

Example:

```tsx
if (currentPath === '/travelvid' || currentPath === '/TravelVidRecorder') {
  return <TravelVid />;
}
```

When adding a page:

1. Create `src/NewPage.tsx`.
2. Import it in `src/App.tsx`.
3. Add a route condition before the homepage return.
4. Add navigation or promo links as needed.
5. Add a What's New entry in `src/data/siteUpdates.ts` if the page should appear in the public update feed.

Internal links usually prevent default browser navigation, call `window.history.pushState`, dispatch a `PopStateEvent`, and scroll to the top.

## Page Metadata

Standalone product pages use `useEffect` to set `document.title` and meta description. Many pages also add Open Graph and Twitter meta tags and remove them on unmount.

When adding metadata:

- Save the previous title.
- Save any previous description content.
- Restore previous values in the cleanup function.
- Remove any meta tags that were created by the page.

## Homepage Product Promos

Homepage promo sections live in `src/App.tsx`. Current promo order starts with TravelVid Recorder near the top, followed by GPhotos2Shorts, JimWas Recorder, Lingo Echo, and Swift PDF Editor.

Standalone interactive pages such as WoWPolitics should use route stable assets in `public`, set page metadata in `useEffect`, and add an entry to `src/data/siteUpdates.ts`.

Design conventions:

- Use full width sections, not nested cards.
- Keep product CTAs obvious.
- Use real product screenshots or specific UI mockups.
- Use Lucide icons for small feature bullets.
- Keep copy direct and human.

## Mission Logs

Mission logs are Markdown files in `src/content/logs`.

Each file should include frontmatter:

```md
---
title: "Example Mission"
tag: "OP-EXAMPLE"
status: "SUCCESS"
year: "2026"
date: "2026-08-20"
summary: "Short summary for the modal."
audio: "/audio/example.mp3"
---

Mission body goes here.
```

The files are imported manually at the top of `src/App.tsx` and registered in `MOCK_MODULES`. When adding a new log, add both the import and the map entry.

## What's New System

The public What's New page and homepage preview use `src/data/siteUpdates.ts`.

Each update has:

- `date`
- `title`
- `category`
- `summary`
- optional `href`
- `items`

The homepage shows the first three entries. Keep the newest entries at the top.

## Live Telemetry API

The API is stored in `api`.

Endpoints:

- `POST /api/location`: Accepts authenticated GPS payloads.
- `GET /api/location/latest`: Returns the latest stored location as JSON.
- `GET /api/location/log`: Returns stored location history as XML.

`POST /api/location` requires an `X-API-KEY` header matching `SITE_GPS_API_KEY`.

Payload shape:

```json
{
  "latitude": 40.7128,
  "longitude": -74.006,
  "accuracy": 10,
  "speed": 0,
  "timestamp": "2026-08-20T12:00:00.000Z",
  "device_id": "iphone",
  "device_name": "Jim iPhone"
}
```

Storage:

- Production uses Vercel Blob when `BLOB_READ_WRITE_TOKEN` exists.
- Local development uses `.data/location-log.json`.
- History is capped at 500 records.

## Static Assets

Assets in `public` are served from the root URL. Example: `public/recorder/og.png` is available as `/recorder/og.png`.

Imported assets in `src/assets` are bundled by Vite and referenced through imports.

Use `public` for route stable assets and app screenshots. Use `src/assets` when the asset is part of a component bundle.

WoWPolitics screenshots live in `public/wow-politics` and are referenced by root relative paths such as `/wow-politics/inn-debate.jpg`.

## Styling

Tailwind CSS 4 is loaded through the Vite plugin. Most styling is inline class based.

Guidelines:

- Follow the existing dark, high contrast product style.
- Prefer section level layouts over card inside card structures.
- Use responsive grid tracks and stable dimensions for phone mockups, cards, buttons, and hero visuals.
- Do not let button text or badges overflow on mobile.
- Avoid decorative clutter that does not explain the product.

## Build And Validation

Required before shipping:

```bash
npm run build
```

Recommended for larger visual changes:

```bash
npm run dev -- --host 127.0.0.1
```

Then open:

- `http://127.0.0.1:5173/`
- Any new route being changed
- `/apps`
- `/whats-new`

Check for:

- No blank screens
- No broken images
- No console errors
- Mobile text fits
- Internal route links work

## Deployment

The site is deployed as a Vite app on Vercel.

`vercel.json` includes:

- API rewrite for `/api/(.*)`
- Single page app fallback for all other routes

The repo does not currently include an OpenAI Sites hosting config.

## Maintenance Checklist

When adding a new product page:

- Add the component under `src`.
- Add the route to `src/App.tsx`.
- Add homepage promo only if it deserves homepage space.
- Add or update the app card in `src/Apps.tsx`.
- Add a `siteUpdates.ts` entry.
- Add a `CHANGELOG.md` entry.
- Run `npm run build`.

When adding a new mission log:

- Add the Markdown file under `src/content/logs`.
- Add the import in `src/App.tsx`.
- Add it to `MOCK_MODULES`.
- Confirm it appears in the Mission Log section.
