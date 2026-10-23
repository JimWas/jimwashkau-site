import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNurseryWorld, cleanNickname, completeWorldMoment } from '../src/BB8NurseryWorld.ts';

test('a new world begins with an empty shelf and no project progress', () => {
  assert.deepEqual(parseNurseryWorld(null), { nickname:'', projectStage:0, keepsakes:[] });
});
test('malformed saves fail safely and unknown artifacts are ignored', () => {
  assert.equal(parseNurseryWorld('{bad').projectStage,0);
  assert.equal(parseNurseryWorld('{"projectStage":999}').projectStage,3);
  assert.deepEqual(parseNurseryWorld('{"keepsakes":[null,{"id":"unknown","createdAt":1},{"id":"flower","createdAt":0}]}').keepsakes,[]);
});
test('nickname whitespace and length are normalized', () => {
  assert.equal(cleanNickname('  Star   friend  '),'Star friend');
  assert.equal(Array.from(cleanNickname('🌟'.repeat(40))).length,24);
  assert.equal(cleanNickname('  '),'');
});
test('the project advances once per eligible completed playdate', () => {
  const first = completeWorldMoment(parseNurseryWorld(null),'playdate-project',1,true);
  assert.equal(first.world.projectStage,1);
  const repeated = completeWorldMoment(first.world,'playdate-project',2,false);
  assert.equal(repeated.world,first.world);
  assert.equal(repeated.projectAdvanced,false);
  const second = completeWorldMoment(first.world,'playdate-project',3,true);
  assert.equal(second.world.projectStage,2);
  const third = completeWorldMoment(second.world,'playdate-project',4,true);
  assert.equal(third.world.projectStage,3);
  assert.equal(third.world.keepsakes[0].id,'ship');
});
test('admiring a finished project neither advances it nor duplicates it', () => {
  let world = parseNurseryWorld(null);
  for(let i=1;i<=3;i++) world=completeWorldMoment(world,'playdate-project',i,true).world;
  const result=completeWorldMoment(world,'playdate-project',4,true);
  assert.equal(result.world.projectStage,3);
  assert.equal(result.world.keepsakes.length,1);
  assert.equal(result.projectAdvanced,false);
});
test('completed crafts create a unique keepsake with a personal note', () => {
  const world={...parseNurseryWorld(null),nickname:'Star friend'};
  const first=completeWorldMoment(world,'gift-drawing',1,false);
  assert.equal(first.world.keepsakes[0].id,'drawing');
  assert.match(first.note,/Star friend/);
  const repeated=completeWorldMoment(first.world,'painting',2,false);
  assert.equal(repeated.world.keepsakes.length,1);
});
test('unrelated completed moments do not create artificial keepsakes', () => {
  const world=parseNurseryWorld(null);
  assert.equal(completeWorldMoment(world,'with-you-rain',1,false).world,world);
});
test('world saves round-trip across either nursery', () => {
  const crafted=completeWorldMoment(parseNurseryWorld(null),'gift-flower',1,false).world;
  const world={...crafted,nickname:'Captain',projectStage:2};
  assert.deepEqual(parseNurseryWorld(JSON.stringify(world)),world);
});
