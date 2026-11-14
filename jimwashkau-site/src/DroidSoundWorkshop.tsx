import {useEffect,useMemo,useRef,useState} from 'react';
import type {DroidId} from './DroidProfiles';
import {cleanStudioSettings,defaultStudioSettings,generateStudioSound,parseSavedSounds,readSavedSounds,storeSavedSounds,type SavedDroidSound,type StudioMood,type StudioSettings} from './DroidSoundStudio';
import {playStudioNotes,renderStudioWav} from './DroidSoundStudioAudio';
import './DroidSoundWorkshop.css';

function download(data:Blob,name:string){const url=URL.createObjectURL(data),link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1500);}
function freshSeed(previous=-1){const seed=Math.floor(Math.random()*4294967296);return seed===previous?(seed+1)>>>0:seed;}
const moodChoices:{id:StudioMood;label:string;icon:string}[]=[{id:'happy',label:'Happy',icon:'♡'},{id:'curious',label:'Curious',icon:'?'},{id:'sleepy',label:'Sleepy',icon:'☾'},{id:'silly',label:'Silly',icon:'✦'}];

export default function DroidSoundWorkshop({resident}:{resident:DroidId}){
 const [settings,setSettings]=useState<StudioSettings>(defaultStudioSettings);
 const [seed,setSeed]=useState(()=>freshSeed());
 const [voice,setVoice]=useState<DroidId>(resident);
 const [name,setName]=useState('');
 const [saved,setSaved]=useState(readSavedSounds);
 const [undo,setUndo]=useState<SavedDroidSound|null>(null);
 const [message,setMessage]=useState('');
 const [playing,setPlaying]=useState(false);
 const [exporting,setExporting]=useState(false);
 const context=useRef<AudioContext|null>(null);
 const playback=useRef<ReturnType<typeof playStudioNotes>|null>(null);
 const playingVersion=useRef(0);
 const sound=useMemo(()=>generateStudioSound(settings,seed,voice),[settings,seed,voice]);
 useEffect(()=>()=>{playback.current?.stop();void context.current?.close();},[]);
 function stop(){playingVersion.current++;playback.current?.stop();playback.current=null;setPlaying(false);}
 async function play(record?:SavedDroidSound){
  stop();const version=playingVersion.current;setMessage('');
  try{
   if(!context.current||context.current.state==='closed')context.current=new AudioContext();
   const audio=context.current;await audio.resume();if(version!==playingVersion.current||audio.state!=='running')return;
   const phrase=record?generateStudioSound(record.settings,record.seed,voice):sound;
   setPlaying(true);playback.current=playStudioNotes(audio,phrase.notes,()=>{if(version===playingVersion.current)setPlaying(false);});
  }catch{setPlaying(false);setMessage('Audio could not start. Try Preview again, or use another browser.');}
 }
 function update(key:keyof StudioSettings,value:number){stop();setSettings(current=>cleanStudioSettings({...current,[key]:value}));}
 function persist(next:SavedDroidSound[],text:string){try{storeSavedSounds(next);setSaved(next);setMessage(text);return true;}catch{setMessage('Browser storage is unavailable or full. You can still download WAV files and export your current sound.');return false;}}
 function draft():SavedDroidSound{const now=Date.now();return{id:`studio-${seed.toString(16)}-${now.toString(36)}`,name:name.trim().slice(0,48)||`${settings.mood[0].toUpperCase()+settings.mood.slice(1)} little voice`,seed,settings:cleanStudioSettings(settings),enabled:true,createdAt:now};}
 function save(){if(saved.length>=40){setMessage('Your library holds 40 sounds. Export a backup, then remove one to make room.');return;}persist([...saved,draft()],'Saved! This sound can now join automatic nursery chatter.');}
 async function exportWav(){setExporting(true);try{const wav=await renderStudioWav(sound.notes,sound.duration);download(new Blob([wav],{type:'audio/wav'}),`${(name.trim()||'little-droid-sound').replace(/[^a-zA-Z0-9_-]/g,'-').slice(0,48)}.wav`);setMessage('Your WAV file is ready in Downloads.');}catch{setMessage('WAV export could not finish in this browser. Your sound design can still be exported as JSON.');}finally{setExporting(false);}}
 function exportDesigns(records:SavedDroidSound[]){download(new Blob([JSON.stringify({version:1,sounds:records},null,2)],{type:'application/json'}),'little-droid-sound-designs.json');}
 async function importDesigns(file?:File){if(!file)return;try{if(file.size>1000000)throw new Error('size');const data=JSON.parse(await file.text());if(data.version!==1)throw new Error('format');const incoming=parseSavedSounds(data.sounds);if(!incoming.length)throw new Error('empty');const next=parseSavedSounds([...saved,...incoming]);const added=next.length-saved.length;persist(next,added?`Imported ${added} sound${added===1?'':'s'}. Your library holds up to 40.`:'Those sounds are already saved, or your library is full.');}catch{setMessage('Choose a valid Little Droid sound-design JSON file under 1 MB.');}}
 const slider=(key:'pitch'|'notes'|'speed'|'wobble'|'softness',label:string,min:number,max:number,step:number,suffix='')=><label className="sound-studio-slider"><span>{label}<output>{settings[key]}{suffix}</output></span><input aria-label={label} type="range" min={min} max={max} step={step} value={settings[key]} onChange={event=>update(key,Number(event.target.value))}/></label>;
 return <main className="sound-studio">
  <header><a href={resident==='bb9e'?'/bb9':'/bb8'}>← Back to the nursery</a><span>little droid · sound workshop</span></header>
  <section className="sound-studio-intro"><p>YOUR OWN LITTLE BEEPS</p><h1>Give your droid a new little voice.</h1><p>Generate something unexpected, shape it until you love it, then let it become part of nursery life.</p></section>
  <div className="sound-studio-grid"><section className="sound-studio-card" aria-label="Sound controls">
   <h2>What’s the little mood?</h2><div className="sound-studio-moods">{moodChoices.map(mood=><button key={mood.id} aria-pressed={settings.mood===mood.id} onClick={()=>{stop();setSettings(current=>({...current,mood:mood.id}));}}><b aria-hidden="true">{mood.icon}</b>{mood.label}</button>)}</div>
   {slider('pitch','Pitch',160,800,10,' Hz')}{slider('notes','Chattiness',1,8,1,' notes')}{slider('speed','Speed',.65,1.8,.05,'×')}{slider('wobble','Wobble',0,100,1,'%')}{slider('softness','Softness',0,100,1,'%')}
   <label className="sound-studio-voice">Preview voice<select aria-label="Preview voice" value={voice} onChange={event=>{stop();setVoice(event.target.value as DroidId);}}><option value="bb8">BB-8 · bright and sweet</option><option value="bb9e">BB-9E · warm and low</option></select></label>
  </section>
  <section className="sound-studio-card sound-studio-preview" aria-label="Your generated sound"><span className="sound-studio-sparkle" aria-hidden="true">♫</span><h2>A little sound, all yours.</h2><p>{sound.notes.length} notes · {sound.duration.toFixed(1)} seconds · variation {seed.toString(16).slice(-6).toUpperCase()}</p>
   <svg viewBox="0 0 600 150" role="img" aria-label={`Your generated phrase has ${sound.notes.length} notes`}><path d="M12 135h576" stroke="#496858" strokeWidth="1"/>{sound.notes.map((note,i)=>{const x=12+note.delay/sound.duration*560,w=Math.max(7,note.duration/sound.duration*560),y=125-note.frequency/1400*110,endY=125-note.frequency*note.bend/1400*110;return <g key={i}><rect x={x} y="15" width={w} height="120" rx="6" fill="#b7c9a2" opacity=".06"/><path d={`M${x} ${y}Q${x+w*.6} ${y} ${x+w} ${endY}`} stroke={i%2?'#e2bf87':'#a8cdbb'} strokeWidth="5" fill="none" strokeLinecap="round"/></g>;})}</svg>
   <div className="sound-studio-actions"><button className="sound-studio-primary" onClick={()=>{stop();setSeed(current=>freshSeed(current));}}>✦ Generate another</button><button onClick={()=>void play()}>▶ Preview</button><button disabled={!playing} onClick={stop}>Stop</button></div>
   <p className="sound-studio-hint">Keep the mood and sliders; Generate another makes a new phrase. Every curve above is one little note.</p>
   <label className="sound-studio-name">Name your sound<input aria-label="Name your sound" value={name} maxLength={48} placeholder="e.g. Sleepy moon wobble" onChange={event=>setName(event.target.value)}/></label>
   <div className="sound-studio-actions"><button onClick={save}>♡ Save to nursery</button><button disabled={exporting} onClick={()=>void exportWav()}>{exporting?'Making WAV…':'Download WAV'}</button><button onClick={()=>exportDesigns([draft()])}>Export this design</button></div>
   <p className="sound-studio-hint">Favorites join occasional automatic chatter. Sleepy sounds play during naps; both droids adapt the same design to their own voice.</p>
  </section></div>
  <p className="sound-studio-message" role="status" aria-live="polite">{message}</p>
  <section className="sound-studio-card sound-studio-library" aria-label="Your saved sounds"><div className="sound-studio-library-heading"><div><h2>Your little sound collection</h2><p>{saved.length}/40 saved on this browser.</p></div><div className="sound-studio-actions"><button disabled={!saved.length} onClick={()=>exportDesigns(saved)}>Export library JSON</button><label className="sound-studio-import">Import designs<input aria-label="Import sound designs" type="file" accept=".json,application/json" onChange={event=>{void importDesigns(event.target.files?.[0]);event.target.value='';}}/></label></div></div>
   {!saved.length&&<p className="sound-studio-empty">Find a voice you love and save it here. Your nursery will remember it.</p>}
   <div className="sound-studio-saved-list">{saved.map(record=><article key={record.id}><div><h3>{record.name}</h3><small>{record.settings.mood} · {record.settings.notes} notes</small></div><label><input type="checkbox" checked={record.enabled} onChange={()=>persist(saved.map(item=>item.id===record.id?{...item,enabled:!item.enabled}:item),record.enabled?'Paused in the nursery.':'Enabled for automatic nursery chatter.')}/> Use in nursery</label><button aria-label={`Preview ${record.name}`} onClick={()=>void play(record)}>▶ Play</button><button aria-label={`Edit ${record.name}`} onClick={()=>{stop();setSettings(record.settings);setSeed(record.seed);setName(record.name);setMessage('Loaded into the editor. Save makes a new copy; your original stays safe.');}}>Edit</button><button aria-label={`Remove ${record.name}`} onClick={()=>{if(persist(saved.filter(item=>item.id!==record.id),'Removed from this browser. You can undo below.'))setUndo(record);}}>Remove</button></article>)}</div>
   {undo&&<button onClick={()=>{const next=parseSavedSounds([...saved,undo]);if(next.length===saved.length){setMessage('The library is full, or this sound is already saved.');return;}if(persist(next,'Your sound was restored.'))setUndo(null);}}>Undo removal</button>}
  </section>
  <footer>Made locally, by your browser. No microphone, account, subscription, or cloud generation. Export JSON to back up designs or move them to another browser. WAV files go to your Mac’s Downloads folder.</footer>
 </main>;
}
