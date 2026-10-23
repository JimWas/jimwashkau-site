import type { DroidId } from './DroidProfiles';
import { greetingFor, type HandshakePartner } from './BB8PlaydateRules';
import './BB8CompanionMoments.css';

export function LittleGift({ kind, x = 570, y = 340, nickname = '' }: { kind: string; x?: number; y?: number; nickname?: string }) {
  return <g transform={`translate(${x} ${y})`} aria-label={nickname ? `A little gift saved for ${nickname}` : "A little gift saved for you"}><g className="bb8-gift-offer">
    {kind === 'gift-drawing' && <><path d="M-34-40h68v74h-68z" fill="#f6e8c8" stroke="#c1ab85" strokeWidth="3"/><path d="M0 7q-31-25-18-34 12-7 18 8 6-15 18-8 13 9-18 34" fill="#d99485"/><path d="m-22 22 8-4 8 5 10-4 13 4" fill="none" stroke="#91ad99" strokeWidth="3"/></>}
    {kind === 'gift-flower' && <><path d="M0 36v-61m-1 46q-30-1-21-18 20-1 21 18m2-11q29-1 22-17-21-2-22 17" fill="#a5bd95" stroke="#85a07d" strokeWidth="4"/>{[0,72,144,216,288].map(angle=><ellipse key={angle} transform={`translate(0 -26) rotate(${angle})`} cy="-13" rx="10" ry="18" fill="#d9ae9e" stroke="#f2dcc0" strokeWidth="2"/>)}<circle cy="-26" r="10" fill="#edcf8b"/></>}
    {kind === 'gift-treasure' && <><path d="M-29 20q29-15 58 0l-5 18h-48z" fill="#a8c2b1"/><path d="m-16-14 16-9 16 9V4L0 13-16 4z" fill="#bdc9bc" stroke="#f2e6c2" strokeWidth="4"/><path d="M0-15v21m-6-16 12 12" stroke="#849f90" strokeWidth="3"/><path className="bb8-gift-sparkle" d="M24-31h16m-8-8v16" stroke="#f2d698" strokeWidth="3"/></>}
  </g></g>;
}
export function PaperCrown({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="m-34 4-4-26 22 12 16-22 16 22 22-12-4 26z" fill="#dfbd79" stroke="#f4e3b9" strokeWidth="2"/><path d="M-31 1H31" stroke="#c69b68" strokeWidth="3"/><circle cy="-11" r="4" fill="#c68e82"/></g>;
}
export function TinyCelebration({ resident, shared = false }: { resident: DroidId; shared?: boolean }) {
  return <g aria-label="A paper crown and a little celebration">
    {shared ? <><PaperCrown x={355} y={260}/><PaperCrown x={605} y={240}/></> : <PaperCrown x={478} y={resident === 'bb8' ? 199 : 179}/>}
    <text className="bb8-celebration-stars" x={shared ? 480 : 589} y={shared ? 313 : 302} textAnchor="middle" fill="#ead29c" fontSize="24">✦ ♡ ✦</text>
  </g>;
}
export function BuddyGreetingSignal({ resident, partner }: { resident: DroidId; partner: HandshakePartner }) {
  const greeting = greetingFor(resident, partner);
  return <g aria-label={greeting.title}><path d="M620 299q-21-17-13-23 8-5 13 5 5-10 13-5 8 6-13 23" fill="#d7a18a"/></g>;
}
export function CompanionMomentProps({ id, resident = 'bb8', nickname = '' }: { id: string; resident?: DroidId; nickname?: string }) {
  return <g className="bb8-companion-props">{id.startsWith('gift-') && <LittleGift kind={id} nickname={nickname}/>}{id === 'tiny-celebration' && <TinyCelebration resident={resident}/>}</g>;
}
