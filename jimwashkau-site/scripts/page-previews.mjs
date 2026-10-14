export const siteOrigin = 'https://www.jimwashkau.com';
export const normalizePath = path => path.split('?')[0].replace(/\/+$/, '') || '/';
export function findPage(path, pages) {
  const normalized = normalizePath(path);
  return pages.find(page => page.path === normalized || page.aliases?.includes(normalized)) || pages[0];
}
export function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#39;');
}
export function renderPreviewHtml(html, page) {
  const url = siteOrigin + page.path;
  const image = siteOrigin + page.image;
  const alt = `${page.label}: ${page.headline}`;
  const tags = [
    ['name', 'description', page.description], ['property', 'og:type', page.type || 'website'],
    ['property', 'og:site_name', 'JimWashkau.com'], ['property', 'og:title', page.title],
    ['property', 'og:description', page.description], ['property', 'og:url', url],
    ['property', 'og:image', image], ['property', 'og:image:secure_url', image],
    ['property', 'og:image:type', 'image/png'], ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', alt], ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:site', '@JimWashkau'],
    ['name', 'twitter:title', page.title], ['name', 'twitter:description', page.description], ['name', 'twitter:image', image], ['name', 'twitter:image:alt', alt],
  ];
  const clean = html.replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\b[^>]*(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/gi, '');
  const head = `<title>${escapeHtml(page.title)}</title>\n<link rel="canonical" href="${escapeHtml(url)}" />\n` + tags.map(([attribute,key,value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`).join('\n');
  return clean.replace('</head>', `${head}\n</head>`);
}
