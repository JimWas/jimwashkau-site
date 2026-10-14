# Page previews

`src/data/pageMetadata.json` is the source of page-specific titles, descriptions, canonical paths, aliases, and social artwork choices. `PageMetadata.ts` updates the browser head on navigation. Vite serves the same metadata in local HTML responses, and production emits one HTML entry per canonical page with the React bundle intact.

The build generates 1200×630 PNG cards with content-hashed filenames before Vite bundles the site. Generated PNGs are excluded from Git and copied into the deployment from `public/social`. They contain no personal nursery photos. Every page has its own image; the beer photo belongs only to its blog article.

When adding a page:

1. Add its metadata, descriptive headline, and optional local artwork to the manifest.
2. Add exact route and alias rewrites in `vercel.json` to `/<canonical-path>/index.html`, before the homepage fallback. Include trailing-slash aliases.
3. Run `npm run build` then `npm run test:previews`.

The tests verify complete React route coverage, matching Open Graph/Twitter tags, unique metadata and artwork, canonical/alias rewrites, proper escaping, raster image dimensions, and asset sizes. API routes, static assets, and existing external redirects remain separate.

Social networks can retain cached previews on previously shared URLs. Correct crawler HTML and a new image URL are delivered on their next fetch; this cannot change the platform’s cache policy or guarantee an existing post updates immediately.
