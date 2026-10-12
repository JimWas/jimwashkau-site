import { Check, Heart, RefreshCw, X } from 'lucide-react';

const species = ['bear', 'giraffe', 'bunny', 'fox', 'elephant', 'cat', 'penguin', 'dinosaur'] as const;
type Species = typeof species[number];
export type PlushFriend = { id: string; species: Species; name: string; color: string; accent: string; patch: 'heart' | 'star' | 'moon' };
export type PlushShelf = { choices: PlushFriend[]; selected: PlushFriend[]; refreshAt: number };
export const PLUSH_REFRESH_MS = 5 * 60 * 1000;
const names = ['Pip', 'Peaches', 'Mochi', 'Clover', 'Waffles', 'Sprout', 'Noodle', 'Biscuit', 'Pudding', 'Pebble', 'Maple', 'Button', 'Honey', 'Doodle', 'Bean', 'Twinkle'];
const palettes = [['#c4ab86', '#90745a'], ['#a9bca1', '#718c76'], ['#cbb0ba', '#a17e91'], ['#a7b9ca', '#718b9e'], ['#c5b6d0', '#9684a9'], ['#dfbf9c', '#b58b6d']];
const patches = ['heart', 'star', 'moon'] as const;
const pick = <T,>(options: readonly T[]): T => options[Math.floor(Math.random() * options.length)];
function createFriend(kind: Species): PlushFriend {
  const [color, accent] = kind === 'giraffe' ? pick([['#e0c18a', '#ae8650'], ['#d5b17d', '#9b7445'], ['#ead1a2', '#b89363']]) : pick(palettes);
  return { id: crypto.randomUUID(), species: kind, name: pick(names), color, accent, patch: pick(patches) };
}
export function generateFriends(initial = false): PlushFriend[] {
  const pool = initial ? species.filter(kind => kind !== 'bear' && kind !== 'giraffe') : [...species];
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const kinds: Species[] = initial ? ['bear', 'giraffe', ...pool.slice(0, 4)] : pool.slice(0, 6);
  return kinds.map(createFriend);
}
export function refreshPlushShelf(shelf: PlushShelf, now = Date.now()): PlushShelf {
  if (now < shelf.refreshAt) return shelf;
  return { ...shelf, choices: generateFriends(), refreshAt: now + PLUSH_REFRESH_MS };
}
function validFriend(value: unknown): value is PlushFriend {
  if (!value || typeof value !== 'object') return false;
  const friend = value as Partial<PlushFriend>;
  return typeof friend.id === 'string' && typeof friend.name === 'string' && friend.name.length < 30 && species.includes(friend.species as Species) && /^#[a-f\d]{6}$/i.test(friend.color || '') && /^#[a-f\d]{6}$/i.test(friend.accent || '') && patches.includes(friend.patch as PlushFriend['patch']);
}
export function readPlushShelf(): PlushShelf {
  try {
    const saved = JSON.parse(localStorage.getItem('bb8-plush-shelf') || 'null');
    if (saved && Array.isArray(saved.choices) && saved.choices.length === 6 && saved.choices.every(validFriend) && Array.isArray(saved.selected) && saved.selected.length <= 3 && saved.selected.every(validFriend) && Number.isFinite(saved.refreshAt)) {
      return { ...saved, refreshAt: Math.min(saved.refreshAt, Date.now() + PLUSH_REFRESH_MS) };
    }
  } catch { /* A fresh shelf still works when browser storage is unavailable. */ }
  const choices = generateFriends(true);
  return { choices, selected: choices.slice(0, 2), refreshAt: Date.now() + PLUSH_REFRESH_MS };
}

// Shared vector artwork keeps the picker, nursery, and snapshots in sync.
export function PlushAnimal({ friend }: { friend: PlushFriend }) {
  const { species: kind, color, accent, patch } = friend;
  const giraffe = kind === 'giraffe';
  const headY = giraffe ? -102 : -63;
  return <g>
    <ellipse cy="0" rx="34" ry="8" fill="#3c4c40" opacity=".18"/>
    {kind === 'fox' && <path d="M17-18q42 0 26-36-3 26-30 16" fill={accent}/>}
    {kind === 'dinosaur' && <path d="m20-30 17 2-11 9 15 9-17 5" fill={accent}/>}
    {giraffe && <><path d="M-8-36v-54h16v54" fill={color}/><path d="M-5-49h9m-9-18h9m-9-12h9" stroke={accent} strokeWidth="6" strokeLinecap="round"/></>}
    <ellipse cy="-25" rx="25" ry="27" fill={color}/>
    <ellipse cy="-24" rx="15" ry="19" fill="#fff2da" opacity=".5"/>
    <ellipse cx="-23" cy="-24" rx="9" ry="17" fill={color} transform="rotate(24 -23 -24)"/><ellipse cx="23" cy="-24" rx="9" ry="17" fill={color} transform="rotate(-24 23 -24)"/>
    <ellipse cx="-15" cy="-5" rx="13" ry="8" fill={accent}/><ellipse cx="15" cy="-5" rx="13" ry="8" fill={accent}/>
    {kind === 'bunny' ? <><ellipse cx="-14" cy="-95" rx="9" ry="27" fill={color} transform="rotate(-12 -14 -95)"/><ellipse cx="14" cy="-95" rx="9" ry="27" fill={color} transform="rotate(12 14 -95)"/><path d="M-14-110v25m28-25v25" stroke={accent} strokeWidth="5" strokeLinecap="round"/></> : kind === 'cat' || kind === 'fox' ? <><path d="M-25-70-24-94-6-79m12 0 18-15 1 24" fill={color}/><path d="m-21-80 1-8 7 7m26 0 7-7 1 8" fill={accent}/></> : kind === 'elephant' ? <><ellipse cx="-26" cy="-64" rx="19" ry="25" fill={accent}/><ellipse cx="26" cy="-64" rx="19" ry="25" fill={accent}/><ellipse cx="-26" cy="-64" rx="12" ry="18" fill={color}/><ellipse cx="26" cy="-64" rx="12" ry="18" fill={color}/></> : kind === 'giraffe' ? <><ellipse cx="-23" cy="-110" rx="13" ry="7" fill={color} transform="rotate(25 -23 -110)"/><ellipse cx="23" cy="-110" rx="13" ry="7" fill={color} transform="rotate(-25 23 -110)"/><path d="M-10-114v-15m20 15v-15" stroke={accent} strokeWidth="5" strokeLinecap="round"/><circle cx="-10" cy="-131" r="5" fill={accent}/><circle cx="10" cy="-131" r="5" fill={accent}/></> : kind === 'bear' ? <><circle cx="-19" cy="-83" r="12" fill={accent}/><circle cx="19" cy="-83" r="12" fill={accent}/><circle cx="-19" cy="-83" r="7" fill={color}/><circle cx="19" cy="-83" r="7" fill={color}/></> : null}
    <ellipse cy={headY} rx={giraffe ? 25 : 27} ry={giraffe ? 21 : 24} fill={color}/>
    {kind === 'penguin' && <ellipse cy={headY + 2} rx="22" ry="19" fill="#f6ecd6"/>}
    <ellipse cy={headY + 9} rx="15" ry="10" fill="#fff2da" opacity=".5"/>
    <circle cx="-10" cy={headY - 1} r="2.6" fill="#3f4f42"/><circle cx="10" cy={headY - 1} r="2.6" fill="#3f4f42"/>
    <circle cx="-17" cy={headY + 6} r="4" fill="#d7978a" opacity=".35"/><circle cx="17" cy={headY + 6} r="4" fill="#d7978a" opacity=".35"/>
    {kind === 'elephant' ? <path d="M0-57q-3 30 10 25" stroke={color} strokeWidth="11" strokeLinecap="round" fill="none"/> : kind === 'penguin' ? <path d="m-6-59 12 0-6 7z" fill="#c79258"/> : <><ellipse cy={headY + 7} rx="4" ry="3" fill={accent}/><path d={`M0 ${headY + 9}v4m-5-1q5 6 10 0`} stroke="#6e7967" strokeWidth="1.2" fill="none"/></>}
    {kind === 'cat' && <path d="m-15-55-14-3m14 8-14 2m44-7 14-3m-14 8 14 2" stroke={accent} strokeWidth="1.5"/>}
    {giraffe && <><circle cx="-16" cy="-34" r="5" fill={accent}/><circle cx="19" cy="-18" r="5" fill={accent}/></>}
    {patch === 'heart' ? <path d="M0-19q-12-7-8-13 6-5 8 1 3-6 8-1 4 6-8 13" fill={accent}/> : patch === 'star' ? <path d="m0-35 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill={accent}/> : <path d="M3-35a10 10 0 1 0 7 15 10 10 0 0 1-7-15" fill={accent}/>}
    <path d="M0-13v6" stroke={accent} strokeWidth="1.2" strokeDasharray="2 2"/>
  </g>;
}

export default function StuffedAnimals({ shelf, now, onToggle, onRefresh }: { shelf: PlushShelf; now: number; onToggle: (friend: PlushFriend) => void; onRefresh: () => void }) {
  const seconds = Math.max(0, Math.ceil((shelf.refreshAt - now) / 1000));
  const countdown = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  return <section className="bb8-plush-picker" aria-labelledby="bb8-plush-title">
    <div className="bb8-plush-heading"><div><p className="bb8-eyebrow">LITTLE FRIENDS, BIG CUDDLES</p><h2 id="bb8-plush-title">His cuddle crew</h2><p>Pick up to three soft friends for his bed. Every batch is a little different.</p></div><button onClick={onRefresh} disabled={seconds > 0} title="New choices are available every five minutes"><RefreshCw size={15}/>{seconds > 0 ? `Refresh in ${countdown}` : 'Meet new friends'}</button></div>
    <div className="bb8-plush-choices">{shelf.choices.map(friend => { const selected = shelf.selected.some(item => item.id === friend.id); return <button key={friend.id} onClick={() => onToggle(friend)} aria-pressed={selected} disabled={!selected && shelf.selected.length >= 3} className={selected ? 'is-selected' : ''} aria-label={`${selected ? 'Remove' : 'Add'} ${friend.name} the ${friend.species} ${selected ? 'from' : 'to'} the bed`}><svg viewBox="-58 -145 116 157" aria-hidden="true"><PlushAnimal friend={friend}/></svg><strong>{friend.name}</strong><span>{friend.species}</span><small>{selected ? <><Check size={12}/> In his bed</> : <><Heart size={12}/> Add a friend</>}</small></button>; })}</div>
    <div className="bb8-plush-selected"><span>In his bed · {shelf.selected.length}/3</span>{shelf.selected.map(friend => <button key={friend.id} onClick={() => onToggle(friend)} aria-label={`Remove ${friend.name} the ${friend.species} from the bed`}>{friend.name} <small>the {friend.species}</small><X size={12}/></button>)}{shelf.selected.length === 0 && <small>A little room for a new best friend.</small>}</div>
    <p className="bb8-plush-footnote">Your chosen friends stay in his bed when you refresh. Saved on this device.</p>
  </section>;
}
