import pages from './data/pageMetadata.json';

export function normalizePagePath(path: string) {
  return path.replace(/\/+$/, '') || '/';
}

export function applyPageMetadata(path: string) {
  const normalized = normalizePagePath(path);
  const page = pages.find(page => page.path === normalized || page.aliases?.includes(normalized)) || pages[0];
  const url = `https://www.jimwashkau.com${page.path === '/' ? '/' : page.path}`;
  const image = `https://www.jimwashkau.com${page.image}`;
  document.title = page.title;
  const tags: [string, string, string][] = [
    ['name', 'description', page.description],
    ['property', 'og:type', page.type || 'website'],
    ['property', 'og:site_name', 'JimWashkau.com'],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:secure_url', image],
    ['property', 'og:image:type', 'image/png'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', `${page.label}: ${page.headline}`],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:site', '@JimWashkau'],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', `${page.label}: ${page.headline}`],
  ];
  for (const [attribute, key, content] of tags) {
    const selector = `meta[${attribute}="${key}"]`;
    const existing = [...document.head.querySelectorAll<HTMLMetaElement>(selector)];
    const tag = existing.shift() || document.createElement('meta');
    existing.forEach(duplicate => duplicate.remove());
    tag.setAttribute(attribute, key);
    tag.content = content;
    if (!tag.isConnected) document.head.appendChild(tag);
  }
  const links = [...document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')];
  const canonical = links.shift() || document.createElement('link');
  links.forEach(duplicate => duplicate.remove());
  canonical.rel = 'canonical'; canonical.href = url;
  if (!canonical.isConnected) document.head.appendChild(canonical);
}
