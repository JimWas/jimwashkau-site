import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { escapeHtml, renderPreviewHtml } from './page-previews.mjs';
const project = new URL('../', import.meta.url);
const dataUrl = new URL('src/data/pageMetadata.json', project);
const pages = JSON.parse(await fs.readFile(dataUrl, 'utf8'));
const output = new URL('public/social/', project);
await fs.mkdir(output, {recursive:true});
function wrap(text, limit=18) {
  const lines = [''];
  for(const word of text.split(' ')) {
    const last = lines.length-1;
    if(lines[last] && lines[last].length+word.length+1>limit) lines.push(word);
    else lines[last]+=(lines[last]?' ':'')+word;
  }
  return lines;
}
for (const page of pages) {
  if (page.socialImage) {
    const image = await sharp(await fs.readFile(new URL(page.socialImage, project)))
      .resize(1200,630,{fit:'contain',background:'#000000'}).png().toBuffer();
    const hash = createHash('sha256').update(image).digest('hex').slice(0,12);
    const slug = page.path==='/'?'home':page.path.slice(1).replaceAll('/','-');
    page.image = `/social/${slug}-${hash}.png`;
    await fs.writeFile(new URL(path.basename(page.image), output), image);
    continue;
  }
  const isDroid = page.path === '/bb8' || page.path === '/bb9';
  const accent = isDroid ? '#e4aa78' : '#479aef';
  let art='';
  if(page.art) {
    const file = new URL(page.art,project);
    const png = await sharp(await fs.readFile(file)).resize(366,390,{fit:'inside'}).png().toBuffer();
    art=`<image x="786" y="130" width="366" height="390" href="data:image/png;base64,${png.toString('base64')}"/>`;
  } else {
    art=`<circle cx="969" cy="330" r="137" fill="none" stroke="${accent}" stroke-opacity=".35" stroke-width="2"/><ellipse cx="969" cy="330" rx="166" ry="53" fill="none" stroke="${accent}" stroke-opacity=".5" stroke-width="2" transform="rotate(-30 969 330)"/><rect x="887" y="247" width="164" height="164" rx="32" fill="${accent}" fill-opacity=".13" stroke="${accent}" stroke-opacity=".5"/><text x="969" y="348" text-anchor="middle" fill="${accent}" font-family="sans-serif" font-size="${page.mark.length>3?32:51}" font-weight="700">${escapeHtml(page.mark)}</text>`;
  }
  const lines = wrap(page.headline);
  const headline = lines.map((line,i)=>`<text x="64" y="${226+i*76}" fill="${i===lines.length-1?accent:'#f6f7f4'}" font-family="sans-serif" font-size="65" font-weight="800" letter-spacing="-2">${escapeHtml(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="glow"><stop stop-color="${accent}" stop-opacity=".18"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="${isDroid?'#0d1914':'#060d18'}"/><circle cx="1030" cy="270" r="510" fill="url(#glow)"/><rect x="1" y="1" width="1198" height="628" rx="20" fill="none" stroke="${accent}" stroke-opacity=".3" stroke-width="2"/><text x="64" y="76" font-family="sans-serif" font-size="26" fill="#e8eef1" font-weight="700">JIMWASHKAU<tspan fill="${accent}">.COM</tspan></text><path d="M64 106h1072" stroke="#ffffff" stroke-opacity=".12"/><text x="64" y="154" fill="${accent}" font-family="sans-serif" font-size="17" font-weight="600" letter-spacing="2">${escapeHtml(page.label.toUpperCase())}</text>${headline}${art}<text x="64" y="558" fill="#a7b5bd" font-family="sans-serif" font-size="19">${escapeHtml(page.path==='/'?'Built for today. Ready for tomorrow.':page.path)}</text><path d="M64 589h1072" stroke="#ffffff" stroke-opacity=".1"/></svg>`;
  const image = await sharp(Buffer.from(svg)).png().toBuffer();
  const hash = createHash('sha256').update(image).digest('hex').slice(0,12);
  const slug = page.path==='/'?'home':page.path.slice(1).replaceAll('/','-');
  page.image = `/social/${slug}-${hash}.png`;
  await fs.writeFile(new URL(path.basename(page.image), output), image);
}
await fs.writeFile(dataUrl,JSON.stringify(pages,null,2)+'\n');
const templateUrl = new URL('index.html', project);
await fs.writeFile(templateUrl,renderPreviewHtml(await fs.readFile(templateUrl,'utf8'),pages[0]));
console.log(`Prepared ${pages.length} page-specific 1200×630 social cards.`);
