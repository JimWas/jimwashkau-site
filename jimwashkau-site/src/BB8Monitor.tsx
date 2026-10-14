import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, BatteryCharging, BatteryFull, Camera, Check, Heart, Maximize2, Minimize2, Moon, Music2, Radio, Sparkles, Sun, Volume2, VolumeX } from 'lucide-react';
import './BB8Monitor.css';
import BB8Terminal from './BB8Terminal';
import { useWallPhotos } from './BB8WallPhotos';
import CustomAlbum from './BB8CustomAlbum';
import BuddyVisits, { NurseryBuddies } from './BB8Buddies';
import { useBuddyVisits } from './BB8BuddyVisits';
import { statusMoments } from './BB8StatusMoments';
import { ActivityProps } from './BB8Activities';
import { littleActivities, pickLittleActivity, type LittleActivity } from './BB8LittleActivities';

import { advanceBattery, readBattery, saveBattery } from './BB8Battery';
import StuffedAnimals, { PlushAnimal, readPlushShelf, refreshPlushShelf, type PlushFriend } from './BB8StuffedAnimals';

import cozyPortrait from './assets/bb8-portraits/bb8-cozy-portrait.svg';
import rechargePortrait from './assets/bb8-portraits/bb8-recharge-nap.svg';
import stargazingPortrait from './assets/bb8-portraits/bb8-stargazing.svg';

const nurseryPortraits = [cozyPortrait, rechargePortrait, stargazingPortrait];

type Activity = 'sleeping' | 'idle' | 'busy' | 'up';
type Mood = Activity | 'dreaming' | 'wiggling' | 'hello';
const activityChoices: { value: Activity; label: string }[] = [{ value: 'sleeping', label: 'Asleep' }, { value: 'idle', label: 'Idle' }, { value: 'busy', label: 'Busy' }, { value: 'up', label: 'Up' }];
const activityDurations: Record<Activity, [number, number]> = { sleeping: [90, 180], idle: [40, 90], busy: [45, 90], up: [45, 90] };
type CareEvent = { time: number; text: string };
const helloPhrases = [
  'I missed your face!',
  'You’re my favorite person in the galaxy.',
  'Can we go on a tiny adventure?',
  'One more cuddle before recharge?',
  'I saved you a spot under my blanket.',
  'Did you bring any spare hugs?',
  'My happy circuits are all lit up!',
  'I dreamed we were counting stars together.',
  'Just five more minutes of playtime?',
  'You make my little world go round.',
  'I’m small, but my hugs are galaxy-sized!',
  'All systems say: I love you!',
];
const helloBeeps = ['Beep-boop!', 'Bwee-deep!', 'Boop-bip-bip!', 'Brrip-weep!', 'Bee-bee-boop!'];
const moodText: Record<Mood, { title: string; detail: string; log: string }> = {
  sleeping: { title: 'Sound asleep', detail: 'Recharging for his next little adventure.', log: 'Settled into a cozy recharge nap.' },
  dreaming: { title: 'Dreaming of adventures', detail: 'A few happy beeps from a galaxy far, far away.', log: 'A little dream beep. Still cozy.' },
  wiggling: { title: 'A little wiggle', detail: 'Just finding the comfiest spot in the galaxy.', log: 'Rolled a little, then got comfortable.' },
  idle: { title: 'Quietly daydreaming', detail: 'Just watching the stars and taking it all in.', log: 'A peaceful little pause. Watching the nursery.' },
  busy: { title: 'Busy little droid', detail: 'Investigating his blanket. Very important droid business.', log: 'A little roll, a curious look. Busy exploring his bed.' },
  up: { title: 'Up and ready', detail: 'Wide awake, sitting tall, and ready for a little love.', log: 'BB-8 is up! Ready to greet the galaxy.' },
  hello: { title: 'Hello, little one!', detail: 'That happy beep was just for you.', log: 'You said hello. BB-8 beeped back!' },
};
const clock = (date: number) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function readLog(): CareEvent[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('bb8-care-log') || '[]');
    return Array.isArray(saved) ? saved.filter((entry): entry is CareEvent => typeof entry?.time === 'number' && Number.isFinite(entry.time) && typeof entry?.text === 'string').slice(0, 12) : [];
  } catch { return []; }
}

export function Nursery({ mood, activity, night, sceneRef, friends, wallPhoto, cribPhoto, pastime, visiting }: { visiting: string[]; pastime: LittleActivity | null; mood: Mood; activity: Activity; night: boolean; sceneRef: React.RefObject<SVGSVGElement | null>; friends: PlushFriend[]; wallPhoto?: string; cribPhoto?: string }) {
  return <svg ref={sceneRef} className={`bb8-scene ${night ? 'is-night' : ''}`} viewBox="0 0 960 650" role="img" aria-label={`BB-8 ${mood === 'hello' ? 'waving hello' : pastime ? pastime.label.toLowerCase() : mood} in a softly lit spaceship nursery with ${friends.map(friend => `a stuffed ${friend.species}`).join(', ') || 'his cozy blanket'}${visiting.length ? `, visited by ${visiting.join(', ')}` : ''}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bb8-wall" x2="0" y2="1"><stop stopColor="#363f43"/><stop offset="1" stopColor="#72706a"/></linearGradient>
      <linearGradient id="bb8-bed" x2="0" y2="1"><stop stopColor="#ebe5d5"/><stop offset="1" stopColor="#b8b5a9"/></linearGradient>
      <radialGradient id="bb8-ball" cx=".34" cy=".24" r=".75"><stop stopColor="#fffcf0"/><stop offset=".65" stopColor="#e1e1d6"/><stop offset="1" stopColor="#969f9c"/></radialGradient>
      <radialGradient id="bb8-glow"><stop stopColor="#ffd5a0" stopOpacity=".24"/><stop offset="1" stopColor="#ffd5a0" stopOpacity="0"/></radialGradient>
      <linearGradient id="bb8-sky" x2="0" y2="1"><stop stopColor="#111f2c"/><stop offset="1" stopColor="#394650"/></linearGradient>
      <pattern id="bb8-fabric" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M19 14v10m-5-5h10" stroke="#697e7b" strokeOpacity=".17" strokeWidth="1.5"/></pattern>
      <filter id="bb8-shadow"><feDropShadow dx="0" dy="14" stdDeviation="12" floodOpacity=".2"/></filter>
    </defs>
    <rect width="960" height="650" fill="url(#bb8-wall)"/>
    <path d="M0 451h960M73 0v451M887 0v451" stroke="#c1bba5" strokeOpacity=".14" strokeWidth="3"/>
    <path d="M0 454h960v196H0z" fill="#50574f"/>
    <path d="M0 525h960M0 598h960M200 454l-90 196m650-196 90 196" stroke="#b0b4a6" strokeOpacity=".1"/>
    <rect x="592" y="58" width="270" height="238" rx="108" fill="#242e32" stroke="#91958b" strokeWidth="14"/>
    <rect x="607" y="73" width="240" height="208" rx="98" fill="url(#bb8-sky)"/>
    {[ [641,131], [687,97], [783,116], [822,167], [679,216], [771,245], [712,165], [808,215], [658,179] ].map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1} fill="#e6e9d6" opacity=".7"/>)}
    <circle cx="758" cy="169" r="35" fill="#cbc6aa"/><circle cx="747" cy="158" r="7" fill="#b5b29c"/><circle cx="771" cy="184" r="10" fill="#bab7a2"/>
    <g transform="rotate(-5 177 157)">
    <path d="M90 100h173v114H90z" fill="#c9bda2" stroke="#a99d87" strokeWidth="8"/>
    {wallPhoto ? <image href={wallPhoto} x="97" y="107" width="159" height="100" preserveAspectRatio="xMidYMid meet"/> : <><path d="m130 183 32-46 23 28 25-33 30 51z" fill="#807e6c"/><circle cx="135" cy="128" r="12" fill="#e7a16b"/></>}
    </g>
    <ellipse cx="443" cy="281" rx="420" ry="295" fill="url(#bb8-glow)"/>
    <g className="bb8-mobile"><path d="M429 0v58m-91 34q91-69 182 0M340 90v68m88-100v79m90-47v88" stroke="#c6bba4" strokeWidth="2" fill="none"/>
      <circle cx="340" cy="174" r="17" fill="#c19064"/><ellipse cx="340" cy="174" rx="29" ry="8" stroke="#e8d2ac" strokeWidth="3" fill="none" transform="rotate(-18 340 174)"/>
      <path d="m428 135 5 12 13 1-10 9 3 13-11-7-12 7 3-13-10-9 14-1z" fill="#e0c78d"/>
      <path d="M510 178a20 20 0 1 0 22 29 19 19 0 0 1-22-29" fill="#ccd3c0"/>
    </g>
    <g filter="url(#bb8-shadow)">
      <path d="M136 386q343-72 688 0l-35 183H169z" fill="#a4967e"/>
      <ellipse cx="480" cy="393" rx="349" ry="107" fill="#d1c7ae"/>
      <ellipse cx="480" cy="394" rx="319" ry="87" fill="url(#bb8-bed)"/>
      <ellipse cx="480" cy="394" rx="319" ry="87" fill="url(#bb8-fabric)"/>
      <ellipse cx="468" cy="413" rx="133" ry="26" fill="#79827c" opacity=".28"/>
      <g transform={activity === 'sleeping' ? 'translate(0 27) rotate(-35 478 340)' : activity === 'idle' ? 'translate(0 9)' : undefined}>
      <g className={`bb8-droid bb8-${mood} bb8-routine-${activity} ${pastime ? `bb8-doing-${pastime.id}` : ''}`}>
        <g className="bb8-body"><circle cx="478" cy="340" r="94" fill="url(#bb8-ball)" stroke="#909993" strokeWidth="2"/>
          <circle cx="478" cy="340" r="67" fill="#d68a45"/><circle cx="478" cy="340" r="49" fill="#ddddce" stroke="#b86d31" strokeWidth="4"/>
          <circle cx="478" cy="340" r="31" fill="#8d9793"/><circle cx="478" cy="340" r="21" fill="#bfc6bd"/>
          <path d="M471 276v20m14-20v20m-72 37h20m-20 14h20m87-14h20m-20 14h20m-69 39v20m14-20v20" stroke="#b6b8a9" strokeWidth="6"/>
          <path d="M400 302q-10 39 0 72m155-72q10 39 0 72" stroke="#d68943" strokeWidth="15" fill="none"/>
          <path d="M446 252q30-10 58 0m-58 176q30 10 58 0" stroke="#aeb6ac" strokeWidth="3" fill="none"/>
          <circle cx="461" cy="328" r="3" fill="#59665f"/><circle cx="494" cy="353" r="3" fill="#59665f"/>
        </g>
        <g className="bb8-head"><path d="M453 225v-72" stroke="#b7bfb3" strokeWidth="4"/><path d="M450 154h6" stroke="#454d49" strokeWidth="6"/><path d="M468 219v-48" stroke="#b7bfb3" strokeWidth="3"/>
          <path d="M413 261a65 65 0 0 1 130 0z" fill="url(#bb8-ball)" stroke="#a0a69d" strokeWidth="2"/>
          <path d="M417 239h120" stroke="#d88b45" strokeWidth="10"/><path d="M426 216h101" stroke="#919d99" strokeWidth="5"/>
          <path d="M413 258h130v12q-65 19-130 0z" fill="#a5aca2"/><path d="M416 263h124" stroke="#cf823f" strokeWidth="4"/>
          <circle cx="476" cy="235" r="24" fill="#d5d5c7"/><circle cx="476" cy="235" r="19" fill="#2c393a"/><circle cx="476" cy="235" r="13" fill="#111e23"/><ellipse cx="471" cy="228" rx="6" ry="4" fill="#6e8b94"/>
          {activity === 'sleeping' && <><circle cx="476" cy="235" r="15" fill="#586660"/><path d="M463 235q13 7 26 0" fill="none" stroke="#263831" strokeWidth="3" strokeLinecap="round"/></>}
          <circle cx="518" cy="249" r="8" fill="#344341"/><circle cx="519" cy="247" r="3" fill="#90b1b3"/>
          <circle className="bb8-led" cx="443" cy="249" r="3" fill="#f58b55"/>
        </g>
        {pastime && <ActivityProps activity={pastime}/>}
      </g>
      </g>
      {friends.map((friend, index) => <g key={friend.id} transform={`translate(${[765, 245, 670][index]} ${[414, 414, 430][index]}) rotate(${[8, -8, 5][index]})`}><PlushAnimal friend={friend}/>{pastime?.id === 'tucking' && <g className="bb8-toy-quilt"><path d="M-33-14q33-12 66 0v35q-33 7-66 0z" fill="#a0bca9" stroke="#d5dfc7" strokeWidth="2"/><path d="M-24 0h48m-36-5v10m24-10v10" stroke="#dce6d0" strokeWidth="2"/></g>}</g>)}
      <path d="M177 448q120-44 216-3t236 0q89-36 152 3l-15 70q-297 35-573 0z" fill="#7c9891"/>
      <path d="M195 467q109-30 214 1t207-1q92-29 150-4" stroke="#a7bbb0" strokeWidth="3" fill="none"/>
      <path d="M152 455q321 106 656 0l-7 29q-320 107-642 0z" fill="#c2b59a"/>
      <path d="M182 488v72m74-51v60m75-47v52m75-46v51m75-48v50m75-54v52m75-60v57m75-72v65m71-89v75" stroke="#b6a88d" strokeWidth="9" strokeLinecap="round"/>
      <path d="M157 564q322 76 642 0" stroke="#d2c3a7" strokeWidth="15" fill="none" strokeLinecap="round"/>
      {cribPhoto && <g aria-label="BB-8's crib portrait">
        <path d="M472 534v19m16-19v19" stroke="#d8a574" strokeWidth="5" strokeLinecap="round"/>
        <rect x="422" y="546" width="116" height="78" rx="5" fill="#c9bda2" stroke="#a99d87" strokeWidth="5"/>
        <image href={cribPhoto} x="430" y="554" width="100" height="62" preserveAspectRatio="xMidYMid meet"/>
      </g>}
    </g>
    <path d="M80 295v80m-28 0h56M52 295q28-58 56 0z" fill="#e4c391" stroke="#c6ad83" strokeWidth="3"/>
    <circle cx="80" cy="298" r="65" fill="url(#bb8-glow)"/>
    <g className={`bb8-zzz ${activity !== 'sleeping' ? 'is-awake' : ''}`} fill="#ece5ce" fontFamily="system-ui" fontWeight="600"><text x="567" y="228" fontSize="18">z</text><text x="588" y="199" fontSize="25">z</text><text x="615" y="163" fontSize="33">z</text></g>
    <NurseryBuddies visiting={visiting} sleeping={activity === 'sleeping'}/>
    <rect width="960" height="650" fill="#162e29" opacity={night ? '.28' : '0'} pointerEvents="none"/>
  </svg>;
}

export default function BB8Monitor() {
  const [now, setNow] = useState(Date.now);
  const [portraitIndex, setPortraitIndex] = useState(0);
  const customAlbum = useWallPhotos();
  useEffect(() => {
    const timer = window.setInterval(() => setPortraitIndex(previous => (previous + 1 + Math.floor(Math.random() * (nurseryPortraits.length - 1))) % nurseryPortraits.length), 60000);
    return () => clearInterval(timer);
  }, []);
  const [night, setNight] = useState(false);
  const [plushShelf, setPlushShelf] = useState(readPlushShelf);
  const [sound, setSound] = useState(false);
  const [lullaby, setLullaby] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioStartedRef = useRef(false);
  const [volume, setVolume] = useState(100);
  const [battery, setBattery] = useState(readBattery);
  const batteryRef = useRef(battery);
  const [activity, setActivity] = useState<Activity>(battery.activity);
  const activityRef = useRef<Activity>(battery.activity);
  const [routineReset, setRoutineReset] = useState(0);
  const [pastime, setPastime] = useState<LittleActivity | null>(null);
  const lastPastime = useRef<LittleActivity | null>(null);
  const manualPastime = useRef(false);
  const [babyMood, setBabyMood] = useState<Mood | null>(null);
  const [helloUntil, setHelloUntil] = useState(0);
  const [helloPhrase, setHelloPhrase] = useState('That happy beep was just for you.');
  const lastHello = useRef(-1);
  const [log, setLog] = useState<CareEvent[]>(readLog);
  const [message, setMessage] = useState('');
  const [fullscreen, setFullscreen] = useState(false);
  const [theatre, setTheatre] = useState(false);
  const sceneRef = useRef<SVGSVGElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const musicVoices = useRef(new Set<{ oscillator: OscillatorNode; gain: GainNode }>());
  const babyVoices = useRef(new Set<{ oscillator: OscillatorNode; gain: GainNode }>());
  const previousMood = useRef<Mood | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const mood: Mood = now < helloUntil ? 'hello' : babyMood || activity;
  const pose: Activity = mood === 'hello' ? 'up' : activity;
  const visiblePastime = activity !== 'sleeping' && mood !== 'hello' ? pastime : null;
  const status = visiblePastime ? visiblePastime : mood === 'hello' ? { ...moodText.hello, detail: helloPhrase } : {
    ...moodText[mood], ...(statusIndex > 0 ? statusMoments[mood][statusIndex - 1] : {}),
  };
  useEffect(() => {
    if (mood === 'hello' || visiblePastime) return;
    let timer: number;
    const rotate = () => {
      // Every mood has eight extra moments; choose a different one each time.
      setStatusIndex(previous => (previous + 1 + Math.floor(Math.random() * 8)) % 9);
      timer = window.setTimeout(rotate, 25000 + Math.random() * 25000);
    };
    rotate();
    return () => clearTimeout(timer);
  }, [mood, visiblePastime]);

  useEffect(() => { try { localStorage.setItem('bb8-plush-shelf', JSON.stringify(plushShelf)); } catch { /* The cuddle crew still works without storage. */ } }, [plushShelf]);
  function toggleFriend(friend: PlushFriend) {
    const selected = plushShelf.selected.some(item => item.id === friend.id);
    if (!selected && plushShelf.selected.length >= 3) return;
    setPlushShelf(shelf => ({ ...shelf, selected: selected ? shelf.selected.filter(item => item.id !== friend.id) : [...shelf.selected, friend] }));
    addLog(selected ? `${friend.name} the ${friend.species} is resting on the toy shelf.` : `${friend.name} the ${friend.species} joined BB-8 for cuddles.`);
  }
  function refreshFriends() {
    const refreshed = refreshPlushShelf(plushShelf);
    if (refreshed === plushShelf) return;
    setPlushShelf(refreshed);
    setMessage('A new little cuddle crew is ready to meet you.');
  }

  useEffect(() => {
    const next = { ...advanceBattery(batteryRef.current, now), activity };
    batteryRef.current = next;
    setBattery(next);
    saveBattery(next);
    if (next.level <= 15 && activity !== 'sleeping') {
      setBabyMood(null);
      setHelloUntil(0);
      setPastime(null);
      setActivity('sleeping');
      setMessage('Low battery. BB-8 is settling down for a recharge nap.');
    }
  }, [now, activity]);

  useEffect(() => {
    activityRef.current = activity;
    const [minimum, maximum] = activityDurations[activity];
    const timer = window.setTimeout(() => {
      if (activity === 'sleeping' && batteryRef.current.level < 35) {
        setRoutineReset(value => value + 1);
        return;
      }
      const weighted: Activity[] = ['sleeping', 'sleeping', 'sleeping', 'idle', 'idle', 'busy', 'up', 'up'];
      const next = weighted.filter(value => value !== activity);
      setBabyMood(null);
      setPastime(null);
      setActivity(next[Math.floor(Math.random() * next.length)]);
    }, (minimum + Math.random() * (maximum - minimum)) * 1000);
    return () => clearTimeout(timer);
  }, [activity, routineReset]);
  // Awake spells alternate little adventures with quiet breaks; naps always win.
  useEffect(() => {
    if (activity === 'sleeping') return;
    let timer: number;
    const begin = () => {
      const next = pickLittleActivity(lastPastime.current);
      lastPastime.current = next;
      setPastime(next);
      setLog(entries => [{ time: Date.now(), text: next.detail }, ...entries].slice(0, 12));
      timer = window.setTimeout(() => {
        setPastime(null);
        timer = window.setTimeout(begin, 15000 + Math.random() * 30000);
      }, 25000 + Math.random() * 35000);
    };
    const firstDelay = manualPastime.current ? 30000 : 8000 + Math.random() * 20000;
    manualPastime.current = false;
    timer = window.setTimeout(begin, firstDelay);
    return () => clearTimeout(timer);
  }, [activity, routineReset]);

  function choosePastime(next: LittleActivity) {
    chooseActivity('busy');
    lastPastime.current = next;
    manualPastime.current = true;
    setPastime(next);
    addLog(next.detail);
  }

  function chooseActivity(next: Activity) {
    setPastime(null);
    setBabyMood(null);
    setHelloUntil(0);
    setActivity(next);
    setRoutineReset(value => value + 1);
  }

  const addLog = (text: string) => setLog(entries => [{ time: Date.now(), text }, ...entries].slice(0, 12));
  const buddyVisits = useBuddyVisits(activity === 'sleeping', addLog);
  const { visiting } = buddyVisits;
  useEffect(() => {
    const title = document.title;
    document.title = 'BB-8 Nursery · Little Droid Monitor';
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    const onFullscreen = () => setFullscreen(document.fullscreenElement === feedRef.current);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => { document.title = title; clearInterval(timer); document.removeEventListener('fullscreenchange', onFullscreen); };
  }, []);
  useEffect(() => {
    if (mood !== previousMood.current) {
      previousMood.current = mood;
      if (mood !== 'hello') setLog(entries => [{ time: Date.now(), text: moodText[mood].log }, ...entries].slice(0, 12));
    }
  }, [mood]);
  useEffect(() => { try { localStorage.setItem('bb8-care-log', JSON.stringify(log)); } catch { /* Monitoring still works with storage disabled. */ } }, [log]);
  useEffect(() => { if (!message) return; const timer = setTimeout(() => setMessage(''), 5000); return () => clearTimeout(timer); }, [message]);
  useEffect(() => () => { void audioRef.current?.close(); }, []);

  function tone(frequency: number, delay = 0, duration = .18, soft = false, bend = 1.3, waveform: OscillatorType = 'sine', level = .055, channel: 'music' | 'baby' | 'hello' = 'hello') {
    const context = audioRef.current;
    if (!context || context.state !== 'running') return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + delay);
    if (!soft) oscillator.frequency.exponentialRampToValueAtTime(frequency * bend, context.currentTime + delay + duration);
    gain.gain.setValueAtTime(0, context.currentTime + delay);
    gain.gain.linearRampToValueAtTime(level, context.currentTime + delay + (soft ? .65 : .025));
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + delay + duration);
    oscillator.connect(gain); gain.connect(masterRef.current || context.destination);
    const voices = channel === 'music' ? musicVoices.current : channel === 'baby' ? babyVoices.current : null;
    const voice = { oscillator, gain };
    voices?.add(voice);
    oscillator.onended = () => { voices?.delete(voice); oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(context.currentTime + delay); oscillator.stop(context.currentTime + delay + duration + .03);
  }
  async function enableAudio(automatic = false) {
    try {
      if (!audioRef.current || audioRef.current.state === 'closed') {
        audioRef.current = new AudioContext();
        masterRef.current = audioRef.current.createGain();
        masterRef.current.gain.value = volume / 100;
        masterRef.current.connect(audioRef.current.destination);
      }
      const context = audioRef.current;
      await context.resume();
      if (audioRef.current !== context) return false;
      if (context.state !== 'running') throw new Error('Audio unavailable');
      if (!audioStartedRef.current) { audioStartedRef.current = true; setAudioStarted(true); setSound(true); setLullaby(true); }
      return true;
    } catch { if (!automatic) setMessage('Audio is unavailable in this browser. You can still watch BB-8.'); return false; }
  }
  useEffect(() => {
    if (audioStarted) return;
    // Try autoplay; browsers that require a gesture can resume on the first interaction.
    const start = () => { void enableAudio(true); };
    const timer = window.setTimeout(start, 0);
    document.addEventListener('pointerdown', start);
    document.addEventListener('keydown', start);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('pointerdown', start);
      document.removeEventListener('keydown', start);
    };
  }, [audioStarted]);
  useEffect(() => {
    const context = audioRef.current;
    if (context && masterRef.current) masterRef.current.gain.setTargetAtTime(volume / 100, context.currentTime, .1);
  }, [volume]);

  function hush(voices: Set<{ oscillator: OscillatorNode; gain: GainNode }>) {
    const context = audioRef.current;
    if (!context || context.state === 'closed') return;
    for (const { oscillator, gain } of voices) {
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setTargetAtTime(.0001, context.currentTime, .05);
      oscillator.stop(context.currentTime + .25);
    }
  }

  useEffect(() => {
    if (!lullaby || !audioStarted) return;
    // Pentatonic notes stay harmonious; a slow random walk avoids a fixed loop.
    const scale = [196, 220, 261.63, 293.66, 329.63, 392, 440, 523.25];
    let position = 2 + Math.floor(Math.random() * 3);
    let harmonyIn = 4 + Math.floor(Math.random() * 5);
    let timer: number;
    let cancelled = false;
    const play = () => {
      if (cancelled) return;
      if (audioRef.current?.state === 'running') {
        position = Math.max(0, Math.min(scale.length - 1, position + (Math.random() < .5 ? -1 : 1)));
        const duration = 3.5 + Math.random() * 2.5;
        tone(scale[position], 0, duration, true, 1, 'sine', .035 + Math.random() * .015, 'music');
        if (--harmonyIn <= 0) {
          tone(scale[Math.max(0, position - 2)] / 2, .3, duration + 1, true, 1, 'sine', .018, 'music');
          harmonyIn = 4 + Math.floor(Math.random() * 5);
        }
      }
      timer = window.setTimeout(play, 2300 + Math.random() * 2500);
    };
    play();
    const voices = musicVoices.current;
    return () => { cancelled = true; clearTimeout(timer); hush(voices); };
  }, [lullaby, audioStarted]);

  useEffect(() => {
    if (!sound || !audioStarted) return;
    let timer: number;
    let settleTimer: number;
    let chatterLeft = 0;
    let cancelled = false;
    const murmur = () => {
      if (cancelled) return;
      if (audioRef.current?.state === 'running') {
        const sleepiness = { sleeping: .95, idle: .65, busy: .2, up: .35 }[activityRef.current];
        const sleepy = Math.random() < sleepiness;
        const pitch = sleepy ? 180 + Math.random() * 190 : 430 + Math.random() * 300;
        const notes = sleepy ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 4);
        let delay = 0;
        for (let i = 0; i < notes; i++) {
          const duration = sleepy ? .35 + Math.random() * .55 : .1 + Math.random() * .2;
          tone(pitch * (.8 + Math.random() * .6), delay, duration, false, .65 + Math.random() * .7, sleepy ? 'sine' : 'triangle', sleepy ? .04 : .055, 'baby');
          delay += duration + .06 + Math.random() * .15;
        }
        setBabyMood(sleepy ? 'dreaming' : 'wiggling');
        clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => setBabyMood(null), (delay + 3) * 1000);
        // Sometimes a brief chatty spell; sometimes a long, peaceful pause.
        if (chatterLeft === 0 && Math.random() < .3) chatterLeft = 1 + Math.floor(Math.random() * 3);
      }
      const gap = chatterLeft > 0 ? (chatterLeft--, 2000 + Math.random() * 4500) : Math.random() < .35 ? 12000 + Math.random() * 18000 : 35000 + Math.random() * 85000;
      timer = window.setTimeout(murmur, gap);
    };
    timer = window.setTimeout(murmur, 5000 + Math.random() * 7000);
    const voices = babyVoices.current;
    return () => { cancelled = true; clearTimeout(timer); clearTimeout(settleTimer); hush(voices); };
  }, [sound, audioStarted]);

  useEffect(() => {
    if (!sound || !audioStarted || activity === 'sleeping' || (pastime?.id !== 'singing' && pastime?.id !== 'violin' && pastime?.id !== 'dancing' && pastime?.id !== 'conducting')) return;
    const melody = [261.63, 329.63, 392, 329.63, 293.66, 261.63];
    const play = () => {
      melody.forEach((note, index) => tone(note, index * .42, .35, true, 1, pastime.id === 'violin' ? 'triangle' : 'sine', .025, 'baby'));
    };
    play();
    const timer = window.setInterval(play, 11000);
    return () => clearInterval(timer);
  }, [pastime, activity, sound, audioStarted]);

  async function sayHello() {
    const hasAudio = await enableAudio();
    // Pick from the other phrases so consecutive hellos always get a new reply.
    let phraseIndex = Math.floor(Math.random() * (helloPhrases.length - (lastHello.current < 0 ? 0 : 1)));
    if (lastHello.current >= 0 && phraseIndex >= lastHello.current) phraseIndex++;
    lastHello.current = phraseIndex;
    const phrase = helloPhrases[phraseIndex];
    const beep = helloBeeps[Math.floor(Math.random() * helloBeeps.length)];
    if (hasAudio) {
      const notes = 3 + Math.floor(Math.random() * 4);
      const basePitch = 420 + Math.random() * 360;
      let delay = 0;
      for (let i = 0; i < notes; i++) {
        const duration = .09 + Math.random() * .17;
        const pitch = basePitch * (.7 + Math.random() * 1.2);
        tone(pitch, delay, duration, false, .65 + Math.random(), Math.random() < .3 ? 'triangle' : 'sine');
        delay += duration + .035 + Math.random() * .08;
      }
    }
    setHelloPhrase(`${beep} “${phrase}”`);
    setHelloUntil(Date.now() + 7000); setNow(Date.now());
    addLog(`BB-8 says: “${phrase}”`);
    setMessage(`${beep} ${phrase}${hasAudio ? '' : ' (Audio unavailable in this browser.)'}`);
  }
  async function toggleLullaby() {
    if (!lullaby && !await enableAudio()) return;
    setLullaby(!lullaby);
    addLog(lullaby ? 'You paused the lullaby.' : 'You started an ever-changing, soft lullaby.');
  }
  async function toggleSound() {
    if (!sound && !await enableAudio()) return;
    setSound(!sound);
    if (sound) setBabyMood(null);
    setMessage(sound ? 'BB-8’s little noises paused. The lullaby has its own control.' : 'BB-8’s little noises are on. Some chatter, some peaceful pauses.');
  }
  useEffect(() => {
    if (!theatre) return;
    feedRef.current?.scrollIntoView({ block: 'start' });
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.fullscreenElement && !fullscreen) setTheatre(false);
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [theatre, fullscreen]);

  async function toggleFullscreen() {
    if (!theatre && !fullscreen) {
      setTheatre(true);
      return;
    }
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (feedRef.current?.requestFullscreen) await feedRef.current.requestFullscreen();
      else setMessage('Fullscreen is unavailable in this browser.');
    } catch { setMessage('Fullscreen is unavailable in this browser.'); }
  }
  async function saveSnapshot() {
    if (!sceneRef.current) return;
    const svg = sceneRef.current.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '960'); svg.setAttribute('height', '650');
    if (night) svg.setAttribute('style', 'filter: grayscale(1) sepia(1) hue-rotate(65deg)');
    try {
      // Embed the displayed photo so the downloaded scene remains self-contained.
      await Promise.all(Array.from(svg.querySelectorAll('image')).map(async image => {
        const href = image.getAttribute('href');
        if (!href || href.startsWith('data:')) return;
        const response = await fetch(href);
        if (!response.ok) throw new Error('Photo unavailable');
        const blob = await response.blob();
        const data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error('Photo could not be saved'));
          reader.readAsDataURL(blob);
        });
        image.setAttribute('href', data);
      }));
    } catch { setMessage('The wall photo could not load. Please try your snapshot again.'); return; }
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `bb8-nursery-${new Date().toISOString().slice(0, 10)}.svg`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    addLog('You saved a nursery snapshot.'); setMessage('A little memory saved to your downloads.');
  }

  return <div className="bb8-page">
    <header className="bb8-header"><a href="/" className="bb8-home"><ArrowLeft size={16}/> JimWashkau.com</a><a className="bb8-wordmark" href="/bb8"><span className="bb8-logo"><Radio size={19}/></span> little droid<span className="bb8-wordmark-dot">.</span></a><span className="bb8-header-note"><span className="bb8-status-dot"/> A little peace of mind</span></header>
    <main className="bb8-main">
      <section className="bb8-intro"><div><p className="bb8-eyebrow">THE GALAXY’S COZIEST CORNER</p><h1>Little droid. <em>Big dreams.</em></h1><p>A tiny adventurer deserves a good night’s recharge.<br className="bb8-desktop-break"/> Keep a loving eye on BB-8, any time of day.</p></div><div className="bb8-availability"><span><Moon size={20}/></span><div><strong>24 / 7 nursery</strong><small>Always a little closer</small></div></div></section>
      <div className={`bb8-layout ${theatre ? 'is-theatre' : ''}`}>
        <section className="bb8-monitor" aria-label="BB-8 nursery monitor">
          <div className="bb8-monitor-heading"><div><span className="bb8-status-dot"/><h2>BB-8’s nursery</h2></div><span>CAM 01 <span className="bb8-heading-divider">/</span> SIMULATED FEED</span></div>
          <div ref={feedRef} className={`bb8-feed ${fullscreen ? 'is-fullscreen' : ''}`}>
            <Nursery visiting={visiting} pastime={visiblePastime} mood={mood} activity={pose} night={night} sceneRef={sceneRef} friends={plushShelf.selected} wallPhoto={customAlbum.photo || nurseryPortraits[portraitIndex]} cribPhoto={customAlbum.cribPhoto || nurseryPortraits[(portraitIndex + 1) % nurseryPortraits.length]}/>
            <div className="bb8-feed-top"><span className="bb8-feed-badge"><span className="bb8-status-dot"/> {night ? 'NIGHT VISION' : visiting.length ? 'BUDDY VISIT' : 'NURSERY VIEW'}</span><time dateTime={new Date(now).toISOString()}>{new Date(now).toLocaleTimeString([], { hour12: false })} <small>LOCAL</small></time></div>
            <div className="bb8-feed-bottom"><span><Moon size={15}/> {status.title}</span><div className="bb8-view-buttons">{theatre && !fullscreen && <button onClick={() => setTheatre(false)} aria-label="Exit theatre mode" title="Exit theatre mode"><Minimize2 size={18}/></button>}<button onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : theatre ? 'Open fullscreen' : 'Open theatre mode'} title={fullscreen ? 'Exit fullscreen' : theatre ? 'Fullscreen' : 'Theatre mode'}>{fullscreen ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}</button></div></div>
            <span className="bb8-camera-corner bb8-corner-left"/><span className="bb8-camera-corner bb8-corner-right"/>
          </div>
          <div className="bb8-controls"><button className={sound ? 'is-active' : ''} onClick={toggleSound} aria-pressed={sound}>{sound ? <Volume2 size={19}/> : <VolumeX size={19}/>}<span>Sound <small>{sound ? 'on' : 'off'}</small></span></button><button className={night ? 'is-active' : ''} onClick={() => setNight(!night)} aria-pressed={night}>{night ? <Sun size={19}/> : <Moon size={19}/>}<span>Night vision</span></button><button onClick={saveSnapshot}><Camera size={19}/><span>Snapshot</span></button><div className="bb8-controls-note"><span className="bb8-status-dot"/> {lullaby ? 'Lullaby playing' : 'All cozy here'}</div></div>
          <label className="bb8-volume">Nursery volume <input type="range" min="0" max="100" value={volume} onChange={event => setVolume(Number(event.target.value))}/><span>{volume}%</span></label>
          <div className="bb8-play-controls"><label htmlFor="bb8-play-choice">Little adventures</label><select id="bb8-play-choice" value={visiblePastime?.id || ''} onChange={event => { const next = littleActivities.find(item => item.id === event.target.value); if (next) choosePastime(next); else chooseActivity(activity); }}><option value="">Let him surprise you</option>{littleActivities.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select><small>He picks his own adventures between naps.</small></div>
          <div className="bb8-routine-controls" role="group" aria-label="BB-8 activity"><span>Little droid routine</span><div>{activityChoices.map(choice => <button key={choice.value} aria-pressed={activity === choice.value} onClick={() => chooseActivity(choice.value)}>{choice.label}</button>)}</div><small>Changes on his own, too.</small></div>
          <p className="bb8-feed-caption"><Sparkles size={14}/> A fan-made animated nursery. Activity and readings are pretend.</p>
        </section>
        <aside className="bb8-sidebar">
          <section className="bb8-status-card"><div className="bb8-card-label"><span>LITTLE ONE’S STATUS</span><Heart size={16}/></div><div className="bb8-sleep-icon"><Moon size={29}/><span>✦</span></div><h2>{status.title}</h2><p>{status.detail}</p><div className="bb8-status-pills"><span><Check size={13}/> Safe & snug</span><span><BatteryFull size={15}/> {visiblePastime ? 'Learning & playing' : activity === 'sleeping' ? 'Recharging' : activity === 'idle' ? 'Daydreaming' : activity === 'busy' ? 'Exploring' : 'Ready to play'}</span></div><div className="bb8-reading-row"><div><span>Room temperature</span><strong>22<small>°C</small></strong></div><div><span>Battery</span><strong>{Math.round(battery.level)}<small>%</small>{activity === 'sleeping' && <BatteryCharging className="bb8-charging-icon" size={20} role="img" aria-label="Battery charging"/>}</strong></div></div><small className="bb8-pretend-label">Simulated battery · charges asleep, drains awake</small></section>
          <section className="bb8-care-card"><p className="bb8-eyebrow">A LITTLE LOVE GOES A LONG WAY</p><h2>Be there, from anywhere.</h2><button className="bb8-hello-button" onClick={sayHello}><Heart size={18}/> Say hello to BB-8 <span>↗</span></button><button className={`bb8-lullaby-button ${lullaby ? 'is-active' : ''}`} onClick={toggleLullaby} aria-pressed={lullaby}><Music2 size={18}/><span>{lullaby ? 'Pause the lullaby' : audioStarted ? 'Resume the lullaby' : 'Start nursery audio'}</span><span className="bb8-music-bars" aria-hidden="true"><i/><i/><i/></span></button><p>{audioStarted ? 'An evolving lullaby, with little noises in his own time.' : 'Audio starts automatically. If your browser pauses it, tap anywhere to begin.'}</p></section>
        </aside>
      </div>
      {/* Google Photos stays hidden; this album uses only locally chosen images. */}
      <CustomAlbum album={customAlbum}/>
      <BuddyVisits visiting={visiting} sleeping={activity === 'sleeping'} automatic={buddyVisits.automatic} surprise={!!buddyVisits.automaticVisitor} onAutomatic={buddyVisits.toggleAutomatic} onChange={buddyVisits.changeVisitors}/>
      <StuffedAnimals shelf={plushShelf} now={now} onToggle={toggleFriend} onRefresh={refreshFriends}/>
      <section className="bb8-journal"><div className="bb8-journal-heading"><div><p className="bb8-eyebrow">THE LITTLE MOMENTS</p><h2>Nursery notes</h2></div><span>Saved on this device</span></div><div className="bb8-log" aria-label="Recent nursery activity">{log.slice(0, 4).map((entry, i) => <article key={`${entry.time}-${i}`}><span className="bb8-log-icon">{entry.text.includes('lullaby') ? <Music2 size={16}/> : entry.text.includes('snapshot') ? <Camera size={16}/> : <Moon size={16}/>}</span><div><p>{entry.text}</p><time dateTime={new Date(entry.time).toISOString()}>{new Date(entry.time).toLocaleDateString([], { month: 'short', day: 'numeric' })} · {clock(entry.time)}</time></div></article>)}</div></section>
      <BB8Terminal event={log[0]} status={status.title} lullaby={lullaby} night={night} onHello={sayHello} onLullaby={toggleLullaby} onNight={() => setNight(!night)}/>
      <div className="bb8-bottom-note"><span>Made for the love of a little orange droid.</span><a href="https://starwars.fandom.com/wiki/BB-8" target="_blank" rel="noreferrer">Meet BB-8 <ArrowUpRight size={14}/></a></div>
    </main>
    <footer className="bb8-footer"><span>Independent fan experience · BB-8 and Star Wars belong to Lucasfilm.</span><span>Available whenever you visit. Animation and audio run while this page is open.</span></footer>
    <div className={`bb8-toast ${message ? 'is-visible' : ''}`} role="status" aria-live="polite">{message}</div>
  </div>;
}
