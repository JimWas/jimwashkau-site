import type { DroidId } from './DroidProfiles';
export const soundStudioKey='little-droid-custom-sounds-v1';
export type StudioMood='happy'|'curious'|'sleepy'|'silly';
export type StudioSettings={mood:StudioMood;pitch:number;notes:number;speed:number;wobble:number;softness:number;boostDb:number};
export type StudioNote={frequency:number;delay:number;duration:number;bend:number;level:number;waveform:'sine'|'triangle'};
export type SavedDroidSound={id:string;name:string;seed:number;settings:StudioSettings;enabled:boolean;createdAt:number};
export const defaultStudioSettings:StudioSettings={mood:'happy',pitch:440,notes:4,speed:1,wobble:45,softness:65,boostDb:18};
const moods:StudioMood[]=['happy','curious','sleepy','silly'];
const clamp=(value:unknown,fallback:number,min:number,max:number)=>typeof value==='number'&&Number.isFinite(value)?Math.max(min,Math.min(max,value)):fallback;
export function cleanStudioSettings(value:Partial<StudioSettings>|null|undefined):StudioSettings {
 return {mood:moods.includes(value?.mood as StudioMood)?value!.mood!:defaultStudioSettings.mood,pitch:clamp(value?.pitch,440,160,800),notes:Math.round(clamp(value?.notes,4,1,8)),speed:clamp(value?.speed,1,.65,1.8),wobble:clamp(value?.wobble,45,0,100),softness:clamp(value?.softness,65,0,100),boostDb:clamp(value?.boostDb,18,0,30)};
}
function seededRandom(seed:number){let state=seed>>>0;return()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};}
export function generateStudioSound(settings:StudioSettings,seed:number,resident:DroidId='bb8') {
 const s=cleanStudioSettings(settings),random=seededRandom(seed),scale=[0,3,5,7,10,12];
 let position=Math.floor(random()*4),delay=0;
 const notes:StudioNote[]=[];
 for(let i=0;i<s.notes;i++){
  position=Math.max(0,Math.min(scale.length-1,position+Math.floor(random()*5)-2));
  const detune=(random()-.5)*(s.mood==='silly'?.12:.04);
  const pitch=s.pitch*(resident==='bb9e'?.82:1)*Math.pow(2,scale[position]/12+detune);
  const frequency=Math.max(120,Math.min(1100,pitch));
  const duration=Math.min(.85,(s.mood==='sleepy'?.25+random()*.3:.08+random()*.23)/s.speed);
  const direction=s.mood==='curious'?.2+random()*.8:s.mood==='sleepy'?-.8+random()*.9:random()*2-1;
  const bend=Math.max(100/frequency,Math.min(1400/frequency,Math.pow(2,direction*s.wobble/100*.8)));
  const texture=random();
  notes.push({frequency,delay,duration,bend,level:Math.min(.85,(.012+.018*(1-s.softness/100))*Math.pow(10,s.boostDb/20)),waveform:resident==='bb9e'||s.softness>=60||texture<.65?'sine':'triangle'});
  delay+=duration+(.035+random()*(s.mood==='sleepy'?.22:.14))/s.speed;
 }
 if(delay>6){const ratio=6/delay;notes.forEach(note=>{note.delay*=ratio;note.duration*=ratio;});delay=6;}
 return {label:`Your ${s.mood} little voice`,mood:s.mood==='sleepy'?'dreaming' as const:'wiggling' as const,notes,duration:delay};
}
export function parseSavedSounds(raw:unknown):SavedDroidSound[] {
 if(!Array.isArray(raw))return[];
 const sounds:SavedDroidSound[]=[];
 for(const item of raw.slice(0,40)){
  if(!item||typeof item!=='object'||typeof item.id!=='string'||!/^studio-[a-zA-Z0-9_-]{1,72}$/.test(item.id)||typeof item.name!=='string'||!Number.isInteger(item.seed)||item.seed<0||item.seed>4294967295||!item.settings||typeof item.settings!=='object'||!moods.includes(item.settings.mood)||typeof item.createdAt!=='number'||!Number.isFinite(item.createdAt)||item.createdAt<=0||sounds.some(sound=>sound.id===item.id))continue;
  const name=Array.from(String(item.name)).filter(char=>char.charCodeAt(0)>=32).join('').trim().slice(0,48)||'My little droid sound';
  sounds.push({id:item.id,name,seed:item.seed,settings:cleanStudioSettings(item.settings),enabled:item.enabled!==false,createdAt:item.createdAt});
 }
 return sounds;
}
export function readSavedSounds():SavedDroidSound[]{try{return parseSavedSounds(JSON.parse(localStorage.getItem(soundStudioKey)||'[]'));}catch{return[];}}
export function storeSavedSounds(sounds:SavedDroidSound[]){localStorage.setItem(soundStudioKey,JSON.stringify(parseSavedSounds(sounds)));}
export function chooseCustomSound(sounds:SavedDroidSound[],previous:string|null,activity:string,random=Math.random):SavedDroidSound|null {
 const choices=sounds.filter(sound=>sound.enabled&&sound.id!==previous&&(activity==='sleeping'?sound.settings.mood==='sleepy':activity==='idle'?sound.settings.mood!=='silly':sound.settings.mood!=='sleepy'));
 if(!choices.length||random()>=.25)return null;
 return choices[Math.min(choices.length-1,Math.floor(random()*choices.length))]||null;
}
export function encodeMonoWav(samples:Float32Array,rate=44100):ArrayBuffer {
 const data=new ArrayBuffer(44+samples.length*2),view=new DataView(data);
 const text=(offset:number,value:string)=>{for(let i=0;i<value.length;i++)view.setUint8(offset+i,value.charCodeAt(i));};
 text(0,'RIFF');view.setUint32(4,36+samples.length*2,true);text(8,'WAVE');text(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,rate,true);view.setUint32(28,rate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,samples.length*2,true);
 for(let i=0;i<samples.length;i++){const sample=Number.isFinite(samples[i])?Math.max(-1,Math.min(1,samples[i])):0;view.setInt16(44+i*2,Math.round(sample*32767),true);}
 return data;
}
