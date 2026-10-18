import cozy from './assets/bb8-portraits/bb8-cozy-portrait.svg';
import nap from './assets/bb8-portraits/bb8-recharge-nap.svg';
import stars from './assets/bb8-portraits/bb8-stargazing.svg';
import nineCozy from './assets/bb9e-portraits/cozy.svg';
import nineNap from './assets/bb9e-portraits/nap.svg';
import nineStars from './assets/bb9e-portraits/stars.svg';
export type DroidId = 'bb8' | 'bb9e';
export const droidProfiles = {
  bb8: { name: 'BB-8', portraits: [cozy, nap, stars], link: 'https://starwars.fandom.com/wiki/BB-8' },
  bb9e: { name: 'BB-9E', portraits: [nineCozy, nineNap, nineStars], link: 'https://starwars.fandom.com/wiki/BB-9E' },
} as const;
export function readResident(search: string): DroidId {
  const requested = new URLSearchParams(search).get('droid');
  if (requested === 'bb8' || requested === 'bb9e') return requested;
  try { return localStorage.getItem('little-droid-resident') === 'bb9e' ? 'bb9e' : 'bb8'; } catch { return 'bb8'; }
}
