import type { DroidId } from './DroidProfiles';

export const playdateActivities = ['playdate-building', 'playdate-turns', 'playdate-reading', 'secret-handshake', 'playdate-encouragement', 'playdate-nap', 'playdate-quiet', 'gift-drawing', 'gift-flower', 'gift-treasure', 'tiny-celebration', 'playdate-project', 'memory-shelf', 'buddy-ritual', 'playdate-puzzle', 'playdate-talent', 'playdate-compromise', 'playdate-picnic', 'bedtime-ritual', 'with-you-rain', 'with-you-breath', 'with-you-tune'];
export type HandshakePartner = DroidId | 'percy' | 'oppy' | 'ginny';
export const otherDroid = (resident: DroidId): DroidId => resident === 'bb8' ? 'bb9e' : 'bb8';
export const playdateTiming = { firstGap: [90, 240], gap: [240, 540], stay: [75, 150] } as const;
export const handshakeProfiles = {
  'bb8:bb9e': { name: 'The sunshine-and-starlight shuffle', detail: 'BB-8 offers two eager beeps. BB-9E checks the rhythm, answers with a thoughtful nod, then they wobble together.', notes: [440, 660, 330, 495], nod: 'double beep · thoughtful nod · shared wobble' },
  'bb8:percy': { name: 'The explorer salute', detail: 'BB-8 gives Percy a bright beep-beep, Percy nods his camera, and they finish with a brave little salute.', notes: [392, 523, 392, 784], nod: 'beep-beep · camera nod · salute' },
  'bb8:oppy': { name: 'The sunny wheel wiggle', detail: 'BB-8 and Oppy trade three sunny beeps, a tiny nod, and one cheerful wheel-and-body wiggle.', notes: [523, 659, 784, 659], nod: 'three sunny beeps · nod · wheel wiggle' },
  'bb8:ginny': { name: 'The antenna twirl', detail: 'Ginny bobs to BB-8’s rising beeps. An antenna wiggle and a tiny hover finish their special greeting.', notes: [440, 554, 740, 880], nod: 'rising beeps · antenna wiggle · hover' },
  'bb9e:percy': { name: 'The careful explorer check', detail: 'BB-9E studies Percy’s camera nod, gently copies it, then surprises Percy with a perfectly timed little beep.', notes: [294, 392, 440, 587], nod: 'look closely · camera nod · surprise beep' },
  'bb9e:oppy': { name: 'The quiet sunshine sway', detail: 'Oppy offers a sunny beep. BB-9E answers softly, checks their timing, and leads a confident little sway.', notes: [330, 440, 494, 660], nod: 'listen · soft reply · confident sway' },
  'bb9e:ginny': { name: 'The starlight hover hello', detail: 'BB-9E follows Ginny’s careful hover, gives two gentle nods, then surprises her with a happy antenna wiggle.', notes: [349, 466, 622, 698], nod: 'hover hello · two nods · antenna wiggle' },
} as const;
export function handshakeFor(resident: DroidId, partner: HandshakePartner) {
  const key = partner === 'bb8' || partner === 'bb9e' ? 'bb8:bb9e' : `${resident}:${partner}` as keyof typeof handshakeProfiles;
  return handshakeProfiles[key];
}

export function greetingFor(resident: DroidId, partner: HandshakePartner) {
  const name = resident === 'bb8' ? 'BB-8' : 'BB-9E';
  const greetings = {
    percy: { title: 'A curious hello for Percy', detail: `${name} takes a curious look at Percy’s camera. A thoughtful inspection, then a little welcoming nod.`, notes: [392, 330] },
    oppy: { title: 'A happy roll for Oppy', detail: `${name} spots Oppy and does a happy little roll. A sunny friend deserves a sunny welcome.`, notes: [440, 554, 659] },
    ginny: { title: 'An antenna hello for Ginny', detail: `${name} looks up at Ginny. His antenna gives an excited wiggle, and she answers with a gentle hover.`, notes: [660, 880] },
  };
  return greetings[partner === 'percy' || partner === 'oppy' || partner === 'ginny' ? partner : 'percy'];
}

export function ritualFor(partner: HandshakePartner) {
  const rituals = {
    percy: {title:'Percy’s little rock ritual',detail:'Percy brought another pretend rock. Two curious friends inspect it carefully, then give their familiar little nod.'},
    oppy: {title:'Oppy’s sunny cushion',detail:'The sunny cushion is waiting in Oppy’s favorite spot. A happy roll, a cozy seat, and a familiar friend.'},
    ginny: {title:'Ginny hangs the decorations',detail:'Ginny carefully helps hang the little paper flags. A gentle hover, one last adjustment, and the nursery feels like home.'},
  };
  return rituals[partner==='percy'||partner==='oppy'||partner==='ginny'?partner:'percy'];
}
