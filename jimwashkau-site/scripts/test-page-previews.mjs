import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import sharp from 'sharp';
import {findPage,renderPreviewHtml,siteOrigin} from './page-previews.mjs';
const pages = JSON.parse(fs.readFileSync(new URL('../src/data/pageMetadata.json',import.meta.url),'utf8'));
const config=JSON.parse(fs.readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
const template=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
function content(html,key) {return html.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)"`))?.[1];}
for(const page of pages) {
 test(`${page.path}: server HTML and raster card describe this page`,async()=>{
   const html=fs.readFileSync(new URL(`../dist${page.path==='/'?'':page.path}/index.html`,import.meta.url),'utf8');
   assert.equal(content(html,'og:title'),content(html,'twitter:title'));
   assert.equal(content(html,'og:description'),content(html,'twitter:description'));
   assert.equal(content(html,'og:url'),siteOrigin+page.path);
   assert.equal(content(html,'og:image'),siteOrigin+page.image);
   assert.equal(content(html,'twitter:image'),siteOrigin+page.image);
   for(const key of ['og:title','og:description','og:image','twitter:card','twitter:title','twitter:image']) assert.equal((html.match(new RegExp(`(?:name|property)="${key}"`,'g'))||[]).length,1);
   assert.ok(html.includes('type="module"'));
   if(page.path!=='/blog/cambodia-free-beer') assert.ok(!html.includes('beer-promo-2.jpg'));
   const image=await sharp(fs.readFileSync(new URL('../dist'+page.image,import.meta.url))).metadata();
   assert.equal(image.format,'png');assert.equal(image.width,1200);assert.equal(image.height,630);
   assert.ok(fs.statSync(new URL('../dist'+page.image,import.meta.url)).size<5_000_000);
 });
 for(const alias of [page.path,...page.aliases||[]].filter(p=>p!=='/')) test(`${alias}: normal and trailing-slash URLs route to the right preview`,()=>{
   for(const source of [alias,alias+'/']) {
     assert.equal(findPage(source,pages).path,page.path);
     assert.equal(config.rewrites.find(rule=>rule.source===source)?.destination,page.path+'/index.html');
   }
 });
}
test('all explicit React routes have preview definitions',()=>{
 const source=fs.readFileSync(new URL('../src/App.tsx',import.meta.url),'utf8');
 for(const [,route] of source.matchAll(/currentPath === '([^']+)'/g)) {
   if(['/IPVanish','/ipvanish'].includes(route)) continue;
   assert.ok(pages.some(page=>[page.path,...page.aliases||[]].includes(route.replace(/\/+$/,'')||'/')),`Missing ${route}`);
 }
});
test('metadata rendering escapes text and replaces old tags instead of duplicating them',()=>{
 const html=renderPreviewHtml(template,{...pages[0],title:'A <tag> & "quote"',description:'<script>alert(1)</script>'});
 assert.ok(html.includes('A &lt;tag&gt; &amp; &quot;quote&quot;'));
 assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
 assert.equal((html.match(/<title>/g)||[]).length,1);
});
test('each page has a distinct title and image',()=>{
 assert.equal(new Set(pages.map(p=>p.title)).size,pages.length);
 assert.equal(new Set(pages.map(p=>p.image)).size,pages.length);
});
