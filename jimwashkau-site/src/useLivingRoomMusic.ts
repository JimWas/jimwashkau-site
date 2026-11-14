import { useEffect, useRef, useState, type RefObject } from 'react';
import { startLivingRoomMusic } from './LivingRoomMusic';

export function useLivingRoomMusic(enabled:boolean, ready:boolean, volume:number, contextRef:RefObject<AudioContext|null>) {
  const session=useRef<ReturnType<typeof startLivingRoomMusic>|null>(null);
  const volumeRef=useRef(volume);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>{volumeRef.current=volume;session.current?.setVolume(volume);},[volume]);
  useEffect(()=>{
    if(!enabled||!ready)return;
    const context=contextRef.current;
    if(!context)return;
    const update=()=>setPlaying(context.state==='running');
    session.current=startLivingRoomMusic(context,volumeRef.current);
    const initialCheck=window.setTimeout(update,0);
    context.addEventListener('statechange',update);
    return()=>{clearTimeout(initialCheck);context.removeEventListener('statechange',update);session.current?.stop();session.current=null;};
  },[enabled,ready,contextRef]);
  return enabled&&ready&&playing;
}
