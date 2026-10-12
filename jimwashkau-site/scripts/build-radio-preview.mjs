import fs from 'node:fs';

const output = new URL('../dist/', import.meta.url);
let html = fs.readFileSync(new URL('index.html', output), 'utf8');
const title = 'JimWashkau Radio | Original Music';
const description = 'Tune into original music by Jim Washkau, playing around the clock. Everyone hears the same song.';
const url = 'https://www.jimwashkau.com/radio';
const image = 'https://www.jimwashkau.com/radio-social.png';
const alt = 'JimWashkau Radio with a blue radio icon and green tuning dial';

function replace(before, after) {
  if (!html.includes(before)) throw new Error(`Missing preview tag: ${before}`);
  html = html.replace(before, after);
}

replace('<title>JimWashkau.com | Systems-First Engineering</title>', `<title>${title}</title>`);
replace('<meta name="description" content="Jim Washkau builds focused iOS apps, tools, experiments, and systems." />', `<meta name="description" content="${description}" />`);
replace('<link rel="canonical" href="https://www.jimwashkau.com/" />', `<link rel="canonical" href="${url}" />`);
for (const attribute of ['property="og:title"', 'name="twitter:title"']) {
  replace(`<meta ${attribute} content="JimWashkau.com | Systems-First Engineering" />`, `<meta ${attribute} content="${title}" />`);
}
for (const attribute of ['property="og:description"', 'name="twitter:description"']) {
  replace(`<meta ${attribute} content="Focused iOS apps, tools, experiments, and systems by Jim Washkau." />`, `<meta ${attribute} content="${description}" />`);
}
replace('<meta property="og:url" content="https://www.jimwashkau.com/" />', `<meta property="og:url" content="${url}" />`);
for (const attribute of ['property="og:image"', 'name="twitter:image"']) {
  replace(`<meta ${attribute} content="https://www.jimwashkau.com/blog/cambodia-free-beer/beer-promo-2.jpg" />`, `<meta ${attribute} content="${image}" />`);
}
for (const attribute of ['property="og:image:alt"', 'name="twitter:image:alt"']) {
  replace(`<meta ${attribute} content="A Hanuman Lite beer can photographed in Cambodia" />`, `<meta ${attribute} content="${alt}" />`);
}
replace('</head>', '<meta name="twitter:site" content="@JimWashkau" />\n  </head>');
fs.mkdirSync(new URL('radio/', output), { recursive: true });
fs.writeFileSync(new URL('radio/index.html', output), html);
console.log('Built radio HTML with dedicated social preview metadata.');
