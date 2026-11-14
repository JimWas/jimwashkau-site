import type { DroidId } from './DroidProfiles';
type VoiceMood = 'dreaming' | 'wiggling';
type Definition = {label:string;mood:VoiceMood;level:number;steps:readonly (readonly [number,number,number,number])[]};
// Frequency, length, pitch bend, and pause: little phrases rather than random alarms.
export const droidSounds = {
 'sleepy-sigh':{label:'A sleepy little sigh',mood:'dreaming',level:.012,steps:[[300,.65,.65,.16]]},
 'dream-mumble':{label:'A tiny dream conversation',mood:'dreaming',level:.013,steps:[[240,.3,1.13,.14],[290,.42,.72,.12]]},
 'tiny-snore':{label:'A soft circuit snore',mood:'dreaming',level:.01,steps:[[170,.55,1.15,.25],[195,.35,.8,.1]]},
 'sleepy-yawn':{label:'A very small yawn',mood:'dreaming',level:.012,steps:[[220,.4,1.5,.06],[330,.6,.62,.1]]},
 'dream-whistle':{label:'A whistle from a little dream',mood:'dreaming',level:.01,steps:[[392,.35,1.12,.2],[440,.45,.8,.1]]},
 'contented-hum':{label:'Contented little circuits',mood:'dreaming',level:.012,steps:[[262,.6,1.02,.12],[294,.5,.96,.1]]},
 'curious-trill':{label:'A curious little question',mood:'wiggling',level:.025,steps:[[440,.14,1.14,.07],[494,.12,1.08,.07],[523,.3,1.3,.1]]},
 'shy-peep':{label:'A shy little peep',mood:'wiggling',level:.018,steps:[[480,.13,1.15,.3],[520,.2,.9,.1]]},
 'happy-giggle':{label:'A bubbly little giggle',mood:'wiggling',level:.024,steps:[[550,.12,1.2,.06],[660,.1,.9,.07],[550,.12,1.2,.06],[740,.22,.85,.1]]},
 'baby-babble':{label:'A very important baby-droid story',mood:'wiggling',level:.024,steps:[[392,.12,1.4,.08],[554,.2,.8,.08],[440,.13,1.12,.12],[587,.25,.85,.1]]},
 'tiny-hiccup':{label:'Hic! A surprised little beep',mood:'wiggling',level:.021,steps:[[390,.09,1.65,.35],[420,.1,1.4,.1]]},
 'proud-chirp':{label:'A proud little chirp',mood:'wiggling',level:.025,steps:[[392,.15,1.15,.08],[494,.16,1.08,.08],[587,.3,1.05,.1]]},
 'playful-whistle':{label:'A playful rising whistle',mood:'wiggling',level:.021,steps:[[440,.35,1.5,.12],[660,.25,.75,.1]]},
 'surprised-peep':{label:'Oh! A tiny discovery',mood:'wiggling',level:.021,steps:[[350,.12,1.65,.15],[587,.23,.85,.1]]},
 'cozy-coo':{label:'A cozy little coo',mood:'dreaming',level:.018,steps:[[330,.4,1.12,.12],[392,.36,.85,.1]]},
 'discovery':{label:'Look what I found!',mood:'wiggling',level:.024,steps:[[440,.13,1.2,.06],[523,.13,1.2,.06],[659,.25,.92,.1]]},
 'thank-you':{label:'A warm little thank-you',mood:'dreaming',level:.018,steps:[[523,.22,.92,.14],[392,.36,.85,.1]]},
 'hello':{label:'A happy little hello',mood:'wiggling',level:.025,steps:[[392,.18,1.2,.09],[587,.14,1.1,.08],[659,.26,.9,.1]]},
 'goodnight':{label:'One last sleepy goodnight',mood:'dreaming',level:.011,steps:[[392,.3,.9,.2],[294,.5,.8,.1]]},
 'xylophone':{label:'Three tiny rainbow notes',mood:'wiggling',level:.02,steps:[[523,.22,1,.16],[659,.22,1,.16],[784,.3,1,.1]]},
 'marble-bell':{label:'A little marble bell',mood:'wiggling',level:.017,steps:[[784,.4,.99,.08],[988,.32,.99,.1]]},
 'tiny-choo':{label:'The cuddle express whistle',mood:'wiggling',level:.017,steps:[[330,.38,1.12,.18],[392,.5,.9,.1]]},
 'magic-twinkle':{label:'A tiny magical flourish',mood:'wiggling',level:.017,steps:[[523,.13,1.02,.08],[659,.13,1.02,.08],[784,.13,1.02,.08],[988,.35,.99,.1]]},
 'cookie-ding':{label:'The pretend cookies are ready',mood:'wiggling',level:.017,steps:[[659,.35,.99,.16],[523,.4,.99,.1]]},
 'arcade-beeps':{label:'Little arcade button beeps',mood:'wiggling',level:.018,steps:[[392,.1,1.1,.14],[523,.12,1.05,.14],[659,.17,.9,.1]]},
 'cowboy-whistle':{label:'A tiny happy-trails whistle',mood:'wiggling',level:.018,steps:[[392,.3,1.25,.13],[494,.27,.88,.1],[440,.4,.8,.1]]},
} as const satisfies Record<string,Definition>;
export type DroidSoundKind = keyof typeof droidSounds;
const sleepy:readonly DroidSoundKind[]=['sleepy-sigh','dream-mumble','tiny-snore','sleepy-yawn','dream-whistle','contented-hum','goodnight'];
const cozy:readonly DroidSoundKind[]=['cozy-coo','contented-hum','shy-peep','curious-trill','thank-you','playful-whistle'];
const playful:readonly DroidSoundKind[]=['curious-trill','shy-peep','happy-giggle','baby-babble','tiny-hiccup','proud-chirp','playful-whistle','surprised-peep','discovery','hello','cozy-coo'];
export function pickDroidSound(previous:DroidSoundKind|null,activity:string,random=Math.random):DroidSoundKind {
 const pool=activity==='sleeping'?sleepy:activity==='idle'?cozy:playful;
 const options=pool.filter(kind=>kind!==previous);
 return options[Math.min(options.length-1,Math.max(0,Math.floor(random()*options.length)))];
}
export function makeDroidSound(kind:DroidSoundKind,resident:DroidId,random=Math.random) {
 const definition:Definition=droidSounds[kind];
 const pitch=(resident==='bb9e'?.82:1)*(.96+random()*.08);
 let delay=0;
 const notes=definition.steps.map(([frequency,duration,bend,pause],index)=>{
  const length=duration*(.94+random()*.12);
  const note={frequency:frequency*pitch,delay,duration:length,bend,level:definition.level*(.88+random()*.12),waveform:resident==='bb9e'||definition.mood==='dreaming'||index%3!==1?'sine' as const:'triangle' as const};
  delay+=length+pause;
  return note;
 });
 return {kind,label:definition.label,mood:definition.mood,notes,duration:delay};
}
export function chatterGap(activity:string,chatty:boolean,random=Math.random) {
 if(activity==='sleeping')return 45000+random()*90000;
 if(chatty)return 3500+random()*4500;
 return random()<.35?12000+random()*18000:35000+random()*85000;
}
export function activitySound(id:string):DroidSoundKind|null {
 if(id.startsWith('cowboy-')||id.startsWith('playdate-cowboy-'))return 'cowboy-whistle';
 if(id.startsWith('game-'))return 'arcade-beeps';
 const sounds:Record<string,DroidSoundKind>={'rainbow-xylophone':'xylophone','ambient-magic':'magic-twinkle','ambient-marble-run':'marble-bell','ambient-baking':'cookie-ding','ambient-train-journey':'tiny-choo','teddy-train':'tiny-choo','ambient-domino-chain':'surprised-peep','ambient-pet-rock':'cozy-coo','ambient-balloon':'curious-trill','ambient-crown':'tiny-hiccup','ambient-observatory':'curious-trill','tiny-dreams':'dream-mumble','goodbye':'thank-you','surprise-sleepy-thanks':'goodnight','welcome':'hello','surprise-welcome-home':'hello','tiny-celebration':'proud-chirp'};
 return sounds[id]||null;
}
