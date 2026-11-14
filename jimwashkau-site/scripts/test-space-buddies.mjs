import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ts from 'typescript';
const require=createRequire(import.meta.url);
const asModule=source=>`data:text/javascript;base64,${Buffer.from(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.React}}).outputText).toString('base64')}`;
const catalogUrl=asModule(await readFile(new URL('../src/BB8BuddyCatalog.ts',import.meta.url),'utf8'));
const {buddyNames,buddyProfiles,pickBuddy}=await import(catalogUrl);
const rulesSource=(await readFile(new URL('../src/BB8PlaydateRules.ts',import.meta.url),'utf8')).replace("'./BB8BuddyCatalog'",JSON.stringify(catalogUrl));
const {greetingFor,handshakeFor,ritualFor}=await import(asModule(rulesSource));
const modelSource=(await readFile(new URL('../src/BB8SpaceBuddyModels.tsx',import.meta.url),'utf8')).replace("import './BB8SpaceBuddies.css';",'');
const {SpaceBuddyAvatar}=await import(asModule(`import React from ${JSON.stringify(pathToFileURL(require.resolve('react')).href)};\n${modelSource}`));
const newIds=['sojourner','spirit','curiosity','philae','insight','huygens','vikram','pragyan'];
test('all eight new missions join the original three without replacing them',()=>{
 assert.equal(Object.keys(buddyNames).length,11);
 for(const id of ['percy','oppy','ginny',...newIds]) {assert.ok(buddyNames[id]);assert.ok(buddyProfiles[id].mission);}
 assert.equal(new Set(newIds.map(id=>buddyProfiles[id].mission)).size,8);
});
test('every buddy can visit automatically and the last visitor is not immediately repeated',()=>{
 for(const previous of [null,...Object.keys(buddyNames)]) {
  const seen=new Set();
  const slots=Object.keys(buddyNames).length-(previous?1:0);
  for(let i=0;i<slots;i++){const next=pickBuddy(previous,()=>(i+.5)/slots);assert.notEqual(next,previous);seen.add(next);}
  assert.equal(seen.size,slots);
 }
});
test('both droids have individual greetings, rituals, and beeps for every new buddy',()=>{
 for(const resident of ['bb8','bb9e'])for(const id of newIds){
  const greeting=greetingFor(resident,id),handshake=handshakeFor(resident,id),ritual=ritualFor(id);
  assert.ok(greeting.title.includes(buddyNames[id]));assert.ok(ritual.title.includes(buddyNames[id]));
  assert.ok(handshake.name.includes(buddyNames[id]));assert.ok(handshake.notes.every(note=>Number.isFinite(note)&&note>0));
  assert.ok(!greeting.detail.includes('Percy'));assert.ok(!ritual.detail.includes('Percy'));
 }
});
test('all eight distinct models render awake and asleep without duplicate SVG identifiers',()=>{
 const drawings=new Set();
 for(const id of newIds){
  const awake=renderToStaticMarkup(React.createElement(SpaceBuddyAvatar,{id}));
  const asleep=renderToStaticMarkup(React.createElement(SpaceBuddyAvatar,{id,sleeping:true}));
  assert.match(awake,/<svg/);assert.match(awake,/role="img"/);assert.notEqual(awake,asleep);
  assert.ok(!awake.includes('NaN'));assert.ok(!awake.includes('undefined'));assert.ok(!awake.includes('id="'));
  drawings.add(awake);
 }
 assert.equal(drawings.size,8);
});
