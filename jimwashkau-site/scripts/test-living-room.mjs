import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const source=await readFile(new URL('../src/LivingRoomMusic.ts',import.meta.url),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {startLivingRoomMusic,livingRoomBpm}=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
function audioContext() {
 const sources=[],gains=[];
 const param=()=>({value:0,events:[],setValueAtTime(value,time){assert.ok(Number.isFinite(value));assert.ok(Number.isFinite(time));this.events.push({value,time});},linearRampToValueAtTime(value,time){this.setValueAtTime(value,time);},exponentialRampToValueAtTime(value,time){assert.ok(value>0);this.setValueAtTime(value,time);},setTargetAtTime(value,time){this.setValueAtTime(value,time);},cancelScheduledValues(){}});
 const node=()=>({disconnected:false,connect(){},disconnect(){this.disconnected=true;}});
 const ctx={currentTime:0,state:'running',sampleRate:48000,destination:node(),sources,gains,
  createGain(){const n={...node(),gain:param()};gains.push(n);return n;},
  createDynamicsCompressor(){return {...node(),threshold:param(),knee:param(),ratio:param(),attack:param(),release:param()};},
  createBiquadFilter(){return {...node(),frequency:param()};},
  createBuffer(channels,length){assert.equal(channels,1);return {getChannelData:()=>new Float32Array(length)};},
  createOscillator(){const n={...node(),frequency:param(),starts:[],stops:[],start(time){assert.ok(time>=ctx.currentTime);this.starts.push(time);},stop(time){this.stops.push(time);}};sources.push(n);return n;},
  createBufferSource(){const n={...node(),starts:[],stops:[],start(time){this.starts.push(time);},stop(time){this.stops.push(time);}};sources.push(n);return n;},
 };
 return ctx;
}
test('a session starts gently, and its own volume is bounded',t=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const ctx=audioContext(),session=startLivingRoomMusic(ctx,55),bus=ctx.gains[0];
 assert.equal(livingRoomBpm,110);assert.ok(ctx.sources.length>0);
 assert.equal(bus.gain.events[0].value,0);assert.ok(bus.gain.events[1].time>=.8);
 for(const volume of [-20,0,50,100,500,NaN]){session.setVolume(volume);const gain=bus.gain.events.at(-1).value;assert.ok(gain>=0&&gain<=.65);}
 session.stop();
});
test('switching off fades out, stops scheduling, and disconnects audio',t=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const ctx=audioContext(),session=startLivingRoomMusic(ctx,50),bus=ctx.gains[0];
 const count=ctx.sources.length;session.stop();
 assert.equal(bus.gain.events.at(-1).value,.0001);
 assert.ok(ctx.sources.every(source=>source.stops.at(-1)<=.9));
 ctx.currentTime=4;t.mock.timers.tick(4000);
 assert.equal(ctx.sources.length,count);assert.ok(bus.disconnected);
 assert.doesNotThrow(()=>session.stop());
});
test('a delayed background timer never replays a backlog of beats',t=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const ctx=audioContext(),session=startLivingRoomMusic(ctx,40),before=ctx.sources.length;
 ctx.currentTime=120;t.mock.timers.tick(60);
 assert.ok(ctx.sources.length-before<12);
 for(const source of ctx.sources.slice(before))assert.ok(source.starts[0]>=120);
 session.stop();
});
test('suspended or closed audio contexts can stop safely',t=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const ctx=audioContext();ctx.state='suspended';const session=startLivingRoomMusic(ctx,40);
 assert.equal(ctx.sources.length,0);ctx.state='closed';assert.doesNotThrow(()=>session.stop());t.mock.timers.tick(1200);
});
