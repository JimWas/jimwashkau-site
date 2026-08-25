# JimWashkau.com

Personal website and product hub for Jim Washkau. The site is a React, TypeScript, Vite, and Tailwind CSS application with Vercel API routes for live GPS telemetry.

## What This Site Contains

- Homepage with product spotlights, iOS app promos, live telemetry, capabilities, mission logs, and contact sections.
- Product pages for TravelVid Recorder, JimWas Recorder, Lingo Echo, Swift PDF Editor, GPhotos2Shorts, and other tools.
- Interactive pages including Love Signal, MarsRelay AI, Space Drinks, iPhone Jailbreak Wizard, and JW iOS MCP research.
- Markdown driven mission logs loaded from `src/content/logs`.
- A What's New page powered by `src/data/siteUpdates.ts`.
- Vercel API endpoints for live location intake, latest location JSON, and XML telemetry logs.

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 through `@tailwindcss/vite`
- Lucide React icons
- React Markdown
- Vercel Analytics
- Vercel Blob for production GPS storage

## Local Setup

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Important Files

- `src/App.tsx`: Main router, homepage, mission log loader, and live telemetry UI.
- `src/TravelVid.tsx`: TravelVid Recorder landing page.
- `src/JimWasRecorder.tsx`: JimWas Recorder landing page.
- `src/LingoEcho.tsx`: Lingo Echo landing page.
- `src/SwiftPdfEditor.tsx`: Swift PDF Editor landing page.
- `src/Apps.tsx`: iOS app portfolio page.
- `src/WhatsNew.tsx`: Changelog style public page.
- `src/data/siteUpdates.ts`: Source data for What's New and homepage update cards.
- `src/content/logs/*.md`: Mission log content with frontmatter.
- `api/location/index.ts`: Authenticated GPS location intake endpoint.
- `api/location/latest.ts`: Latest GPS location JSON endpoint.
- `api/location/log.ts`: Public XML location log endpoint.
- `api/_lib/location-store.ts`: Shared location persistence code.
- `public/`: Static assets served from the site root.
- `vercel.json`: Vercel rewrites for API routes and single page app fallback.

## Routes

The app uses a lightweight client side route switch in `src/App.tsx`.

- `/`: Homepage
- `/apps`: iOS apps portfolio
- `/travelvid`, `/TravelVidRecorder`, `/travelvid-recorder`: TravelVid Recorder
- `/jimwas-recorder`: JimWas Recorder
- `/LingoEcho`, `/lingo-echo`: Lingo Echo
- `/SwiftPDFEditor`, `/swift-pdf-editor`: Swift PDF Editor
- `/gphotos2shorts`: GPhotos2Shorts
- `/mars-relay`: MarsRelay AI
- `/love-signal`: Love Signal
- `/space-drinks`: Space Drinks
- `/iphone-jailbreak-wizard`: iPhone Jailbreak Wizard
- `/jw-ios-mcp`: JW iOS MCP research
- `/whats-new`: What's New
- `/support`: Support
- `/privacy`: Privacy
- `/sounds-of-earth`, `/sounds-of-earth/`: Sounds of Earth landing page
- `/sounds-of-earth/privacy`: Sounds of Earth privacy policy
- `/sounds-of-earth/support`: Sounds of Earth support center
- `/terms`: Terms

## Environment Variables

Only the GPS API needs environment configuration.

- `SITE_GPS_API_KEY`: Required by `POST /api/location` through the `X-API-KEY` header.
- `BLOB_READ_WRITE_TOKEN`: Optional locally, required in production for Vercel Blob backed GPS storage.

Without `BLOB_READ_WRITE_TOKEN`, GPS data falls back to a local `.data/location-log.json` file during development.

## Deployment Notes

This project is built for Vercel. `vercel.json` sends `/api/*` requests to Vercel functions and all other routes to `index.html` so client side routes work when loaded directly.

There is no `.openai/hosting.json` Sites hosting config in this repository at the time of writing.

## Documentation

Developer documentation lives in:

- `DOCUMENTATION.md`
- `CHANGELOG.md`
- `ios-app/README.md` for the separate Mission Recorder iOS companion app notes
