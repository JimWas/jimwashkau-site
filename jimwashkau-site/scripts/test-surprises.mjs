import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const asModule = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64')}`;
const rules = asModule(await readFile(new URL('../src/BB8PlaydateRules.ts',import.meta.url),'utf8'));
const source = (await readFile(new URL('../src/BB8LittleActivities.ts',import.meta.url),'utf8')).replace("'./BB8PlaydateRules'",JSON.stringify(rules));
const {littleActivities,pickLittleActivity} = await import(asModule(source));
const awake = {sleeping:false,fullyCharged:false,hasBuddies:false,hasDroidFriend:false,hasKeepsakes:false};
function random(seed=123) {return () => {seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};}
test('all twenty-four surprises have unique activity entries',()=>{
 const surprises=littleActivities.filter(item=>item.id.startsWith('surprise-'));
 assert.equal(surprises.length,24);assert.equal(new Set(littleActivities.map(item=>item.id)).size,littleActivities.length);
});
test('surprises remain occasional and awake-only',()=>{
 const rng=random();let surprises=0;
 for(let i=0;i<10000;i++) {const next=pickLittleActivity(null,rng,awake);if(next.id.startsWith('surprise-'))surprises++;assert.notEqual(next.id,'surprise-welcome-home');assert.ok(!['surprise-duet','surprise-quiet-kindness'].includes(next.id));}
 assert.ok(surprises>900 && surprises<1500,`${surprises} surprises out of 10000`);
 for(let i=0;i<1000;i++) assert.ok(!pickLittleActivity(null,rng,{...awake,sleeping:true}).id.startsWith('surprise-'));
});
test('both shared-only surprises can appear during a droid playdate',()=>{
 const rng=random();const seen=new Set();
 for(let i=0;i<10000;i++)seen.add(pickLittleActivity(null,rng,{...awake,hasDroidFriend:true}).id);
 assert.ok(seen.has('surprise-duet'));assert.ok(seen.has('surprise-quiet-kindness'));assert.ok(!seen.has('surprise-welcome-home'));
});
test('the same surprise is not selected twice in a row',()=>{
 const rng=random();let previous=null;
 for(let i=0;i<1000;i++){const next=pickLittleActivity(previous,rng,awake);assert.notEqual(next.id,previous?.id);previous=next;}
});

test('new surprises follow their prerequisites and become available after progress',()=>{
 const locked=new Set(),unlocked=new Set();const rng=random(87);
 for(let i=0;i<20000;i++){
  locked.add(pickLittleActivity(null,rng,awake).id);
  unlocked.add(pickLittleActivity(null,rng,{...awake,hasDroidFriend:true,hasBuddies:true,hasGarden:true,projectFinished:true}).id);
 }
 for(const id of ['surprise-moon-bloom','surprise-ship-launch','surprise-parade','surprise-backwards-concert','surprise-precious-repair']){
  assert.ok(!locked.has(id),`${id} must wait for its prerequisite`);
  assert.ok(unlocked.has(id),`${id} must be available after its prerequisite`);
 }
});
