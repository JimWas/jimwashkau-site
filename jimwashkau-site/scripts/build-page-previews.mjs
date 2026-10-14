import fs from 'node:fs/promises';
import { renderPreviewHtml } from './page-previews.mjs';
const output = new URL('../dist/',import.meta.url);
const template = await fs.readFile(new URL('index.html',output),'utf8');
const pages = JSON.parse(await fs.readFile(new URL('../src/data/pageMetadata.json',import.meta.url),'utf8'));
for(const page of pages) {
  const directory = new URL(page.path==='/'?'./':page.path.slice(1)+'/',output);
  await fs.mkdir(directory,{recursive:true});
  await fs.writeFile(new URL('index.html',directory),renderPreviewHtml(template,page));
}
console.log(`Built crawler-readable previews for all ${pages.length} pages.`);
