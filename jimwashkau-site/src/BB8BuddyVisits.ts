import { useEffect, useRef, useState } from 'react';

export const buddyNames = { percy: 'Percy', oppy: 'Oppy', ginny: 'Ginny' } as const;
export type BuddyId = keyof typeof buddyNames;
export const visitTiming = { firstGap: [60, 180], gap: [180, 480], stay: [60, 150] } as const;
export function randomVisitDelay(range: readonly [number, number], random = Math.random) {
  return (range[0] + random() * (range[1] - range[0])) * 1000;
}
export function pickBuddy(previous: BuddyId | null, random = Math.random): BuddyId {
  const choices = (Object.keys(buddyNames) as BuddyId[]).filter(id => id !== previous);
  return choices[Math.floor(random() * choices.length)];
}

export function useBuddyVisits(sleeping: boolean, onEvent: (message: string) => void) {
  const [automatic, setAutomatic] = useState(true);
  const [manualVisitors, setManualVisitors] = useState<BuddyId[]>([]);
  const [automaticVisitor, setAutomaticVisitor] = useState<BuddyId | null>(null);
  const [reset, setReset] = useState(0);
  const lastBuddy = useRef<BuddyId | null>(null);
  const hasVisited = useRef(false);
  const sleepingRef = useRef(sleeping);
  const eventRef = useRef(onEvent);
  useEffect(() => { sleepingRef.current = sleeping; eventRef.current = onEvent; }, [sleeping, onEvent]);

  useEffect(() => {
    if (!automatic || manualVisitors.length) return;
    let timer: number;
    let cancelled = false;
    const arrive = () => {
      if (cancelled) return;
      // No surprise arrivals during naps or while the page is hidden.
      if (sleepingRef.current || document.hidden) {
        timer = window.setTimeout(arrive, 60000);
        return;
      }
      const buddy = pickBuddy(lastBuddy.current);
      lastBuddy.current = buddy;
      hasVisited.current = true;
      setAutomaticVisitor(buddy);
      eventRef.current(`${buddyNames[buddy]} popped by for a little surprise playdate.`);
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setAutomaticVisitor(null);
        eventRef.current(`${buddyNames[buddy]} waved goodbye. A peaceful little pause before the next visit.`);
        timer = window.setTimeout(arrive, randomVisitDelay(visitTiming.gap));
      }, randomVisitDelay(visitTiming.stay));
    };
    timer = window.setTimeout(arrive, randomVisitDelay(hasVisited.current ? visitTiming.gap : visitTiming.firstGap));
    return () => { cancelled = true; clearTimeout(timer); };
  }, [automatic, manualVisitors.length, reset]);

  function changeVisitors(ids: BuddyId[]) {
    hasVisited.current = true;
    setAutomaticVisitor(null);
    setManualVisitors(ids);
    setReset(value => value + 1);
    onEvent(ids.length ? `A little Mars playdate: ${ids.map(id => buddyNames[id]).join(', ')} invited to the nursery.` : 'The Mars buddies waved goodbye. Some quiet time for BB-8.');
  }
  function toggleAutomatic() {
    setAutomatic(value => !value);
    setAutomaticVisitor(null);
    setReset(value => value + 1);
    onEvent(automatic ? 'Surprise visits paused. You can still invite his buddies yourself.' : 'Surprise visits are on. A little friend will stop by now and then.');
  }
  return { visiting: automaticVisitor ? [automaticVisitor] : manualVisitors, automatic, automaticVisitor, changeVisitors, toggleAutomatic };
}
