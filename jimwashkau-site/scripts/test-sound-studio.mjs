import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const moduleUrl=source=>`data:text/javascript;base64,${Buffer.from(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64')}`;
const studioUrl=moduleUrl(await readFile(new URL('../src/DroidSoundStudio.ts',import.meta.url),'utf8'));
const {defaultStudioSettings,generateStudioSound,parseSavedSounds,chooseCustomSound,encodeMonoWav,cleanStudioSettings}=await import(studioUrl);
const audioSource=(await readFile(new URL('../src/DroidSoundStudioAudio.ts',import.meta.url),'utf8')).replace("'./DroidSoundStudio'",JSON.stringify(studioUrl));
const {playStudioNotes}=await import(moduleUrl(audioSource));
const record=(id='test',mood='happy',enabled=true)=>({id:`studio-${id}`,name:'My voice',seed:42,settings:{...defaultStudioSettings,mood},enabled,createdAt:12345});
test('a design is reproducible, and new seeds create genuinely different phrases',()=>{
 assert.deepEqual(generateStudioSound(defaultStudioSettings,10),generateStudioSound(defaultStudioSettings,10));
 const distinct=new Set(Array.from({length:100},(_,i)=>JSON.stringify(generateStudioSound(defaultStudioSettings,i).notes)));
 assert.equal(distinct.size,100);
});
test('all mood and slider extremes keep notes quiet, finite, and bounded',()=>{
 for(const mood of ['happy','curious','sleepy','silly'])for(const pitch of [160,800])for(const notes of [1,8])for(const speed of [.65,1.8])for(const softness of [0,100]){
  const result=generateStudioSound({mood,pitch,notes,speed,wobble:100,softness},8192);
  assert.equal(result.notes.length,notes);assert.ok(result.duration>0&&result.duration<=6.00001);
  let end=0;
  for(const note of result.notes){assert.ok(note.delay>=end);assert.ok(note.frequency>=120&&note.frequency<=1100);assert.ok(note.frequency*note.bend>=99.99&&note.frequency*note.bend<=1400.01);assert.ok(note.level<=.031);assert.ok(note.duration>0&&note.duration<=.85);end=note.delay+note.duration;}
 }
});
test('both droids can use one design, with BB-9E keeping a lower voice',()=>{
 const a=generateStudioSound(defaultStudioSettings,42,'bb8'),b=generateStudioSound(defaultStudioSettings,42,'bb9e');
 assert.equal(a.notes.length,b.notes.length);b.notes.forEach((note,i)=>{assert.ok(note.frequency<a.notes[i].frequency);assert.equal(note.waveform,'sine');});
});
test('invalid settings fail safely and imported collections reject malformed or duplicate records',()=>{
 assert.equal(cleanStudioSettings({pitch:NaN,notes:999,speed:-1}).notes,8);
 assert.equal(cleanStudioSettings({pitch:NaN}).pitch,440);
 const valid=record();
 assert.deepEqual(parseSavedSounds([null,{}, {...valid,id:'bad'}, {...valid,seed:-1},valid,valid]),[valid]);
 assert.equal(parseSavedSounds(Array.from({length:90},(_,i)=>record(`test-${i}`))).length,40);
 assert.deepEqual(parseSavedSounds(JSON.parse(JSON.stringify([record('quiet','sleepy',false)]))),[record('quiet','sleepy',false)]);
});
test('saved sounds respect mood, pause controls, and immediate-repeat avoidance',()=>{
 const sounds=[record('happy'),record('sleepy','sleepy'),record('silly','silly'),record('disabled','happy',false)];
 assert.equal(chooseCustomSound(sounds,null,'sleeping',()=>0).id,'studio-sleepy');
 assert.equal(chooseCustomSound(sounds,'studio-sleepy','sleeping',()=>0),null);
 assert.equal(chooseCustomSound(sounds,null,'up',()=>0).id,'studio-happy');
 assert.equal(chooseCustomSound(sounds,null,'up',()=>.8),null);
 assert.equal(chooseCustomSound([record('off','sleepy',false)],null,'sleeping',()=>0),null);
});
test('WAV export uses a real mono PCM header and clips nonfinite input safely',()=>{
 const wav=encodeMonoWav(new Float32Array([.5,-.5,NaN,2,-2]));const view=new DataView(wav);
 assert.equal(Buffer.from(wav).subarray(0,4).toString(),'RIFF');assert.equal(Buffer.from(wav).subarray(8,12).toString(),'WAVE');
 assert.equal(view.getUint16(22,true),1);assert.equal(view.getUint32(24,true),44100);assert.equal(view.getUint32(40,true),10);
 assert.equal(view.getInt16(48,true),0);assert.equal(view.getInt16(50,true),32767);assert.equal(view.getInt16(52,true),-32767);
});
test('preview stop fades and cancels scheduled notes without leaving a playback callback running',()=>{
 const sources=[];let ended=0;
 const param=()=>({events:[],setValueAtTime(v,t){assert.ok(Number.isFinite(v)&&Number.isFinite(t));this.events.push([v,t]);},linearRampToValueAtTime(v,t){this.setValueAtTime(v,t);},exponentialRampToValueAtTime(v,t){assert.ok(v>0);this.setValueAtTime(v,t);},cancelScheduledValues(){},setTargetAtTime(v,t){this.setValueAtTime(v,t);}});
 const ctx={currentTime:0,destination:{},createGain(){return{gain:param(),connect(){},disconnect(){}};},createOscillator(){const node={frequency:param(),starts:[],stops:[],connect(){},disconnect(){},start(t){this.starts.push(t);},stop(t){this.stops.push(t);}};sources.push(node);return node;}};
 const sound=generateStudioSound(defaultStudioSettings,10);const playback=playStudioNotes(ctx,sound.notes,()=>ended++);
 assert.equal(sources.length,sound.notes.length);playback.stop();playback.stop();assert.equal(ended,1);
 assert.ok(sources.every(source=>source.stops.at(-1)===.1));sources.forEach(source=>source.onended());assert.equal(ended,1);
});
