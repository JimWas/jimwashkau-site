import { useEffect, useRef, useState } from 'react';
import type { DroidId } from './DroidProfiles';
import { otherDroid, playdateTiming } from './BB8PlaydateRules';

function readAutomatic(key: string) { try { return localStorage.getItem(key) !== 'off'; } catch { return true; } }

export function useDroidPlaydates(sleeping: boolean, resident: DroidId, onEvent: (text: string) => void, cozyNap = false) {
  const key = `${resident}-droid-playdates`;
  const [automatic, setAutomatic] = useState(() => readAutomatic(key));
  const [invited, setInvited] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [reset, setReset] = useState(0);
  const allowed = !sleeping || cozyNap;
  const [previousAllowed, setPreviousAllowed] = useState(allowed);
  // Only an explicit shared nap keeps the guest; ordinary naps still end visits.
  if (previousAllowed !== allowed) {
    setPreviousAllowed(allowed);
    if (!allowed) { setInvited(false); setSurprise(false); }
  }
  const hasVisited = useRef(false);
  const sleepingRef = useRef(sleeping);
  const eventRef = useRef(onEvent);
  const guest = otherDroid(resident) === 'bb8' ? 'BB-8' : 'BB-9E';
  const present = allowed && (invited || surprise);
  useEffect(() => { sleepingRef.current = sleeping; eventRef.current = onEvent; }, [sleeping, onEvent]);
  useEffect(() => { try { localStorage.setItem(key, automatic ? 'on' : 'off'); } catch { /* Visits still work without storage. */ } }, [key, automatic]);
  useEffect(() => {
    if (!automatic || invited || sleeping) return;
    let timer: number;
    const delay = (range: readonly [number, number]) => (range[0] + Math.random() * (range[1] - range[0])) * 1000;
    const arrive = () => {
      if (sleepingRef.current || document.hidden) { timer = window.setTimeout(arrive, 60000); return; }
      hasVisited.current = true; setSurprise(true);
      timer = window.setTimeout(() => { setSurprise(false); timer = window.setTimeout(arrive, delay(playdateTiming.gap)); }, delay(playdateTiming.stay));
    };
    timer = window.setTimeout(arrive, delay(hasVisited.current ? playdateTiming.gap : playdateTiming.firstGap));
    return () => clearTimeout(timer);
  }, [automatic, invited, sleeping, reset]);
  const wasPresent = useRef(false);
  useEffect(() => {
    if (present === wasPresent.current) return;
    wasPresent.current = present;
    eventRef.current(present ? `${guest} came over! Two little droids, one cozy play crib. Time for their secret handshake.` : `${guest} waved goodbye and went home. A little space to rest before the next playdate.`);
  }, [present, guest]);
  function toggleInvitation() {
    if (sleeping && !present) return;
    hasVisited.current = true; setSurprise(false); setInvited(!present); setReset(value => value + 1);
  }
  function toggleAutomatic() { setAutomatic(value => !value); setSurprise(false); setReset(value => value + 1); }
  return { present, automatic, surprise, toggleInvitation, toggleAutomatic };
}
