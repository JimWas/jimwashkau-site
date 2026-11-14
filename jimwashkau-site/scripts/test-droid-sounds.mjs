import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const source=await readFile(new URL('../src/DroidSoundLibrary.ts',import.meta.url),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {droidSounds,makeDroidSound,pickDroidSound,chatterGap,activitySound}=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
test('all 26 phrases stay short, quiet, finite, and use gentle waveforms',()=>{
 assert.equal(Object.keys(droidSounds).length,26);
 for(const kind of Object.keys(droidSounds))for(const resident of ['bb8','bb9e'])for(const random of [()=>0,()=>.5,()=>.999]){
  const phrase=makeDroidSound(kind,resident,random);let previous=-1;
  assert.ok(phrase.duration>0&&phrase.duration<4);assert.ok(phrase.notes.length<=5);
  for(const note of phrase.notes){
   assert.ok(note.frequency>100&&note.frequency<1200);assert.ok(note.duration>0&&note.duration<.8);
   assert.ok(note.level>0&&note.level<=.03);assert.ok(note.bend>0&&Number.isFinite(note.bend));
   assert.ok(['sine','triangle'].includes(note.waveform));assert.ok(note.delay>previous);previous=note.delay;
  }
 }
});
test('BB-9E keeps a warmer lower voice while the phrase timing stays familiar',()=>{
 for(const kind of Object.keys(droidSounds)){
  const bb8=makeDroidSound(kind,'bb8',()=>.5),bb9=makeDroidSound(kind,'bb9e',()=>.5);
  assert.equal(bb8.duration,bb9.duration);
  bb9.notes.forEach((note,i)=>{assert.ok(note.frequency<bb8.notes[i].frequency);assert.equal(note.waveform,'sine');});
 }
});
test('automatic chatter varies without immediate repeats and naps avoid excited voices',()=>{
 for(const activity of ['sleeping','idle','busy','up']){
  let previous=null;const seen=new Set();
  for(let i=0;i<500;i++){
   const next=pickDroidSound(previous,activity,()=>((i*37)%499)/499);
   assert.notEqual(next,previous);assert.ok(droidSounds[next]);seen.add(next);
   if(activity==='sleeping')assert.equal(droidSounds[next].mood,'dreaming');
   previous=next;
  }
  assert.ok(seen.size>=5);
 }
});
test('chatty spells still leave space, and sleep always gets longer pauses',()=>{
 for(const random of [()=>0,()=>.5,()=>.999]){
  assert.ok(chatterGap('sleeping',true,random)>=45000);
  assert.ok(chatterGap('sleeping',false,random)<135000);
  assert.ok(chatterGap('busy',true,random)>=3500);
  assert.ok(chatterGap('idle',false,random)>=12000);
 }
});
test('activity sounds resolve to real motifs and unrelated activities stay quiet',()=>{
 for(const id of ['rainbow-xylophone','ambient-marble-run','ambient-baking','ambient-magic','ambient-train-journey','teddy-train','ambient-domino-chain','ambient-observatory','cowboy-trail','playdate-cowboy-duel','game-tetris','tiny-dreams','goodbye','welcome'])assert.ok(droidSounds[activitySound(id)],id);
 assert.equal(activitySound('reading'),null);assert.equal(activitySound('not-an-activity'),null);
});
