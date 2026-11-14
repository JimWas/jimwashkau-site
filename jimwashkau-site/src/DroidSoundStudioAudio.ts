import { encodeMonoWav, type StudioNote } from './DroidSoundStudio';
export function playStudioNotes(context:BaseAudioContext,notes:StudioNote[],onEnd?:()=>void) {
 const voices=new Set<{oscillator:OscillatorNode;gain:GainNode}>();
 let finished=false,completed=0;
 const stop=()=>{if(finished)return;finished=true;for(const {oscillator,gain}of voices){gain.gain.cancelScheduledValues(context.currentTime);gain.gain.setTargetAtTime(.00001,context.currentTime,.015);oscillator.stop(context.currentTime+.1);}onEnd?.();};
 for(const note of notes){
  const oscillator=context.createOscillator(),gain=context.createGain(),start=context.currentTime+note.delay+.02,end=start+note.duration;
  oscillator.type=note.waveform;oscillator.frequency.setValueAtTime(note.frequency,start);oscillator.frequency.exponentialRampToValueAtTime(note.frequency*note.bend,end);
  gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(note.level,start+Math.min(.03,note.duration*.3));gain.gain.exponentialRampToValueAtTime(.0001,end);gain.gain.linearRampToValueAtTime(0,end+.025);
  oscillator.connect(gain);gain.connect(context.destination);
  const voice={oscillator,gain};voices.add(voice);
  oscillator.onended=()=>{voices.delete(voice);oscillator.disconnect();gain.disconnect();if(++completed===notes.length&&!finished){finished=true;onEnd?.();}};
  oscillator.start(start);oscillator.stop(end+.03);
 }
 return {stop};
}
export async function renderStudioWav(notes:StudioNote[],duration:number){
 const context=new OfflineAudioContext(1,Math.ceil((duration+.2)*44100),44100);
 playStudioNotes(context,notes);
 const buffer=await context.startRendering();
 return encodeMonoWav(buffer.getChannelData(0),buffer.sampleRate);
}
