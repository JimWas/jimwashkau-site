import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import pages from './src/data/pageMetadata.json'
import { findPage, renderPreviewHtml } from './scripts/page-previews.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'page-specific-previews',
      transformIndexHtml: {
        order: 'pre',
        handler: (html, context) => renderPreviewHtml(html, findPage(context.path, pages)),
      },
    },
  ],
  assetsInclude: ['**/*.md'],
})
