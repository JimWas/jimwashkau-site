import type { DroidId } from './DroidProfiles';
import './BB8CowboyScenes.css';

function isCowboyMoment(id?: string) { return Boolean(id?.startsWith('cowboy-') || id?.startsWith('playdate-cowboy-')); }
export function CowboyHeadProps({ id, resident }: { id?: string; resident: DroidId }) {
  if (!isCowboyMoment(id)) return null;
  const hat = resident === 'bb8' ? '#bb966d' : '#9dad9d';
  return <g aria-label={`${resident === 'bb8' ? 'BB-8' : 'BB-9E'} wearing a little cowboy hat`}>
    <g transform="translate(478 194)"><g className="bb8-cowboy-hat">
      <path d="M-43 0-36-37q13-11 36-2 23-9 36 2L43 0Z" fill={hat} stroke="#e6d4b1" strokeWidth="2"/>
      <path d="M-40-12q40 7 80 0v9q-40 7-80 0Z" fill="#8b7761"/>
      <path d="M-75-6q17 15 32 4 43 10 86 0 15 11 32-4-10 26-75 23-65 3-75-23Z" fill={hat} stroke="#e6d4b1" strokeWidth="2"/>
      <path d="m0-13 3 5 6 1-4 4 1 5-6-3-6 3 1-5-4-4 6-1Z" fill="#dfc58b"/>
    </g></g>
    <path d="M446 275q32 12 64 0l-14 18-18-7-18 7Z" fill={resident === 'bb8' ? '#b98e83' : '#95b3ad'} stroke="#e4d3b2" strokeWidth="2"/>
  </g>;
}
function Badge({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="m0-12 4 7 8-1-3 8 4 7-9 0-4 7-4-7-9 0 4-7-3-8 8 1Z" fill="#dec18b" stroke="#e9dbb4" strokeWidth="1.5"/><circle r="3" fill="#ad9774"/></g>;
}
function ToyBlaster() {
  return <g aria-label="A brightly colored bubble toy"><path d="M-19-9h35v15H0l-3 13h-13l2-17h-5Z" fill="#a1beb5" stroke="#e5d9b5" strokeWidth="2"/><rect x="12" y="-8" width="12" height="12" rx="3" fill="#d5a67f"/><circle cx="4" cy="-2" r="4" fill="#deca91"/><path d="M-12 3h8" stroke="#668d7c" strokeWidth="2"/></g>;
}
function Pony({ x, y, color = '#c7a57c' }: { x: number; y: number; color?: string }) {
  return <g transform={`translate(${x} ${y})`} aria-label="A soft hobby horse"><path d="M0 10v57" stroke="#b09b78" strokeWidth="6"/>
    <path d="M-17 13-20-10-9-29 3-33 8-44 9-29 27-16 19-4 4-6 8 14Z" fill={color} stroke="#e5d4b1" strokeWidth="2"/>
    <path d="M-10-28-21-13l3 26" stroke="#9b8066" strokeWidth="6"/><circle cx="10" cy="-20" r="2.5" fill="#4d6b59"/><path d="m3-11 17 7m-31-15 29 13" stroke="#8ca89c" strokeWidth="3"/>
  </g>;
}
function Cactus({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} aria-label="A paper cactus target"><path d="M-4 24V-21q0-9 8 0v45m-8-11h-13V-3m21 10h13V-9" stroke="#9ab395" strokeWidth="9" strokeLinecap="round" fill="none"/><path d="M-22 27h44v6h-44Z" fill="#c0a17c"/><circle cy="-5" r="9" fill="#e4d2aa" stroke="#b79672" strokeWidth="2"/><circle cy="-5" r="3" fill="#c59f80"/></g>;
}
export function CowboySceneProps({ id, shared = false }: { id: string; shared?: boolean }) {
  if (!isCowboyMoment(id)) return null;
  const practice = id === 'cowboy-quickdraw' || id === 'playdate-cowboy-duel';
  const trail = id === 'cowboy-trail' || id === 'playdate-cowboy-trail';
  return <g className="bb8-cowboy-props" strokeLinecap="round" strokeLinejoin="round">
    <Badge x={shared ? 383 : 518} y={shared ? 371 : 318}/>{shared && <Badge x={632} y={369}/>}
    {id === 'cowboy-dressup' && <g aria-label="Trying on his cowboy outfit beside a little hobby horse"><g className="bb8-cowboy-pony"><Pony x={587} y={344}/></g><path d="M551 408q36 19 68 0" fill="none" stroke="#c6b38e" strokeWidth="4"/></g>}
    {practice && <g aria-label={shared ? 'Two little cowboys take turns sending toy bubbles toward a paper cactus' : 'A wobbly quick-draw with a bubble toy and a paper cactus'}>
      <Cactus x={shared ? 480 : 611} y={shared ? 370 : 365}/>
      <g transform={`translate(${shared ? 409 : 544} ${shared ? 373 : 340})`}><g className="bb8-cowboy-draw bb8-cowboy-draw-first"><ToyBlaster/></g></g>
      {shared && <g transform="translate(551 373) scale(-1 1)"><g className="bb8-cowboy-draw bb8-cowboy-draw-second"><ToyBlaster/></g></g>}
      {[0,1,2].map(i => <circle key={i} className="bb8-cowboy-bubble bb8-cowboy-bubble-first" cx={shared ? 435 : 570} cy={shared ? 370 : 337} r={3+i} stroke="#d6e3d1" strokeWidth="1.5" fill="#c3d7cb" fillOpacity=".15" style={{animationDelay:`${i*.35}s`}}/>)}
      {shared && [0,1,2].map(i => <circle key={i} className="bb8-cowboy-bubble bb8-cowboy-bubble-second" cx="525" cy="370" r={3+i} stroke="#e0d8b9" strokeWidth="1.5" fill="#d8c9ac" fillOpacity=".15" style={{animationDelay:`${i*.35}s`}}/>)}
    </g>}
    {trail && <g aria-label={shared ? 'Two cowboy buddies explore a pretend trail on soft hobby horses' : 'A cowboy follows a tiny pretend trail with a hobby horse'}>
      <path d={shared ? 'M392 425q90-28 180 0' : 'M526 418q45-25 104-4'} fill="none" stroke="#c5b58e" strokeWidth="3" strokeDasharray="4 9"/>
      <g className="bb8-cowboy-pony"><Pony x={shared ? 409 : 579} y={shared ? 357 : 344}/></g>
      {shared && <g className="bb8-cowboy-pony bb8-cowboy-pony-friend"><Pony x={552} y={357} color="#a7b7a2"/></g>}
      <g transform={`translate(${shared ? 480 : 624} 382)`}><path d="M0-39v65" stroke="#b89b74" strokeWidth="5"/><path d="M-26-36h47l9 9-9 9h-47Z" fill="#cbb58d" stroke="#ead9b4" strokeWidth="2"/><path d="m-13-27 8-3 8 3m-8-3v8" stroke="#829b80" strokeWidth="2" fill="none"/></g>
    </g>}
  </g>;
}
