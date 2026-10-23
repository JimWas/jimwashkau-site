import { useEffect, useRef, useState } from 'react';
import { cleanNickname, completeWorldMoment, parseNurseryWorld, readNurseryWorld, saveNurseryWorld, worldStorageKey, type NurseryWorld } from './BB8NurseryWorld';
export function useNurseryWorld() {
  const [world,setWorld] = useState(readNurseryWorld);
  const worldRef = useRef(world);
  function update(next: NurseryWorld) { worldRef.current=next; saveNurseryWorld(next); setWorld(next); }
  useEffect(()=> { const sync = (event: StorageEvent) => { if(event.key===worldStorageKey){const next=parseNurseryWorld(event.newValue);worldRef.current=next;setWorld(next);} }; window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync); },[]);
  function complete(activity: string, eligible: boolean) {
    const result = completeWorldMoment(worldRef.current,activity,Date.now(),eligible);
    if(result.world!==worldRef.current)update(result.world);
    return result;
  }
  return {world,worldRef,complete,saveNickname:(value:string)=>update({...worldRef.current,nickname:cleanNickname(value)})};
}
