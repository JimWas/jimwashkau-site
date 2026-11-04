import { WonderSurpriseScene } from './BB8WonderSurprises';
import type { SolarWindowId } from './BB8SolarSystem';
import { CardboardShip } from './BB8WorldPanel';
import './BB8Surprises.css';

function Heart({x=0,y=0,scale=1}: {x?:number;y?:number;scale?:number}) {
  return <path transform={`translate(${x} ${y}) scale(${scale})`} d="M0 12q-26-19-15-28 9-5 15 7 6-12 15-7 11 9-15 28" fill="#dda69b"/>;
}
function Drawing() { return <g><rect x="-27" y="-32" width="54" height="65" rx="2" fill="#f2e6c9" stroke="#c3aa83" strokeWidth="3"/><Heart scale={.7}/><path d="m-17 23 10-3 10 3 13-3" stroke="#8da993" strokeWidth="3" fill="none"/></g>; }
function Star({x,y}: {x:number;y:number}) { return <path transform={`translate(${x} ${y})`} d="m0-8 3 5 6 1-5 4 2 6-6-3-6 3 2-6-5-4 6-1z" fill="#ead29d"/>; }

// These are physical props and expressions; narration stays in the terminal.
export function SurpriseScene({id,shared,nickname,visiting,layer,windowBody='moon'}: {windowBody?:SolarWindowId;id:string;shared:boolean;nickname:string;visiting:string[];layer:'back'|'front'}) {
  if (!id.startsWith('surprise-')) return null;
  const positions = shared ? [[355,295],[605,275]] : [[478,235]];
  return <g className={`bb8-surprise bb8-${id}`} pointerEvents="none">
    <WonderSurpriseScene id={id} shared={shared} visiting={visiting} layer={layer} windowBody={windowBody}/>
    {layer==='back' && <>
      {id==='surprise-shooting-star' && <svg x="622" y="99" width="201" height="164" viewBox="0 0 201 164" overflow="hidden" aria-label="A shooting star crossing the porthole"><g className="bb8-shooting-star"><path d="m0 0-65-24" stroke="#ead8b2" strokeWidth="3" opacity=".6"/><Star x={0} y={0}/></g></svg>}
      {id==='surprise-constellation' && <g aria-label={nickname ? `A heart constellation for ${nickname}` : 'A heart constellation for you'}><path d="M510 382 620 152 790 152Z" fill="#d4dfc6" opacity=".06"/><path d="M710 211 655 163 663 135 689 127 710 149 731 127 757 135 765 163Z" fill="none" stroke="#bacdb6" strokeWidth="2" strokeDasharray="3 6"/>{[[710,211],[655,163],[663,135],[689,127],[710,149],[731,127],[757,135],[765,163]].map(([x,y])=><Star key={`${x}:${y}`} x={x} y={y}/>)}{nickname && <text x="710" y="243" textAnchor="middle" fontSize="13" fill="#f4e3bf">{nickname}</text>}</g>}
    </>}
    {layer==='front' && <>
      {id==='surprise-welcome-home' && <g className="bb8-surprise-banner" aria-label="A handmade welcome-back banner, one end upside down"><path d="M295 201q170 40 340 0" stroke="#bdad8e" strokeWidth="3"/>{Array.from('WELCOME ♡').map((letter,i)=><g key={i} transform={`translate(${309+i*35} ${206+Math.sin(i/8*Math.PI)*15}) rotate(${i===2?180:i%2?8:-8})`}><path d="M-14-4h28v33l-14-7-14 7z" fill={i%2?'#b5c4a4':'#d8ba90'} stroke="#eee0bf" strokeWidth="1"/><text y="17" textAnchor="middle" fontSize="16" fill="#3d574b">{letter}</text></g>)}</g>}
      {id==='surprise-camera-gift' && <g transform="translate(550 413)" aria-label="A drawing left beside the camera"><g className="bb8-camera-gift"><Drawing/></g><path className="bb8-gift-straighten" d="M42 32 26 19" stroke="#a2b6a4" strokeWidth="7" strokeLinecap="round"/></g>}
      {id==='surprise-costume-mixup' && positions.map(([x,y],i)=><g key={x} transform={`translate(${x} ${y})`} aria-label={i?'Oversized explorer goggles':'A little saucepan helmet'}>{i===0?<g transform="translate(0 -30)"><path d="M-46 0h92v-26q-46-20-92 0z" fill="#a9b7ad" stroke="#e1dfc7" strokeWidth="3"/><path d="M44-19h45" stroke="#7c9689" strokeWidth="9"/><ellipse cy="-27" rx="46" ry="8" fill="#bdc5b6"/></g>:<g><rect x="-51" y="-14" width="43" height="29" rx="10" fill="#acc4bd" fillOpacity=".35" stroke="#ddc195" strokeWidth="6"/><rect x="5" y="-14" width="43" height="29" rx="10" fill="#acc4bd" fillOpacity=".35" stroke="#ddc195" strokeWidth="6"/><path d="M-9-1H5" stroke="#ddc195" strokeWidth="5"/></g>}</g>)}
      {id==='surprise-duet' && <g aria-label="Two little melodies with optional Mars-buddy percussion">{[355,605].map((x,i)=><g key={x} className={`bb8-duet-note bb8-duet-note-${i}`}><text x={x} y="233" fontSize="30" fill={i?'#b8cdb6':'#ebcd93'}>{i?'♫':'♪'}</text></g>)}{visiting.map((buddy,i)=><g key={buddy} transform={`translate(${110+i*80} 566)`}><ellipse rx="16" ry="9" fill="#ead9b6"/><path d="M-16 0v17q16 12 32 0V0" fill="#b99d7f"/><path className="bb8-surprise-drum" d="m-20-13 22 11" stroke="#e8d3ac" strokeWidth="3"/></g>)}</g>}
      {id==='surprise-blanket-hide' && <g aria-label="A wiggly blanket lump with an antenna sticking out"><g className="bb8-blanket-lump"><path d={shared?'M270 417Q260 259 356 263q92-2 98 154Z':'M373 435Q369 202 478 202q108 0 108 233Z'} fill="#92b09f" stroke="#d5dfc0" strokeWidth="4"/><path d={shared?'M351 263v-43':'M472 202v-43'} stroke="#b7bfb3" strokeWidth="4"/><path d={shared?'M310 350q40-25 84 0':'M415 335q60-25 122 0'} fill="none" stroke="#cfddc2" strokeWidth="3"/></g></g>}
      {id==='surprise-delivery' && <g transform="translate(570 384)" aria-label="A miniature Mars parcel with a rock, toy rocket, and postcard"><path d="M-48-10h96v54h-96Z" fill="#bb9971" stroke="#e3d0ab" strokeWidth="3"/><path className="bb8-parcel-lid" d="M-48-10 0-25 48-10 0 5Z" fill="#d7b78c" stroke="#e3d0ab" strokeWidth="3"/><g className="bb8-parcel-treasures"><ellipse cx="-26" cy="-31" rx="14" ry="10" fill="#a6b0a3"/><path d="m0-56 10 22-10 7-10-7Z" fill="#c5d3c0" stroke="#f0dfb9" strokeWidth="2"/><rect x="15" y="-61" width="34" height="26" rx="2" fill="#eee0bf"/><circle cx="31" cy="-49" r="8" fill="#cf956d"/></g><path d="M-5 8v32m-34-10h14" stroke="#e2c79e" strokeWidth="3"/></g>}
      {id==='surprise-quiet-kindness' && <g aria-label="A blanket straightened and a toy nudged closer"><path className="bb8-kind-quilt" d="M548 373q58-15 116 0v49q-58 13-116 0Z" fill="#a0bba5" stroke="#d4dfc1" strokeWidth="3"/><g className="bb8-kind-toy"><rect x="474" y="403" width="30" height="21" rx="6" fill="#d2af7f"/><circle cx="481" cy="426" r="5" fill="#5b7667"/><circle cx="498" cy="426" r="5" fill="#5b7667"/></g><path className="bb8-kind-nudge" d="m410 389 55 23" stroke="#acbcaa" strokeWidth="7" strokeLinecap="round"/></g>}
      {id==='surprise-photo-pose' && <g aria-label="A silly pose for a snapshot">{positions.map(([x,y])=><g key={x}><Star x={x-75} y={y-25}/><Heart x={x+65} y={y+15} scale={.55}/></g>)}<path d="M290 235v-15h15m350 0h15v15m0 185v15h-15m-350 0h-15v-15" fill="none" stroke="#e2d2b2" strokeWidth="2" opacity=".6"/></g>}
      {id==='surprise-beautiful-mess' && <g aria-label="A wonky cardboard spaceship and scattered paper stars"><g transform="translate(540 406) scale(1.35)"><CardboardShip stage={3}/></g>{[[300,433],[380,411],[650,430],[710,412],[570,451]].map(([x,y],i)=><g key={x} transform={`rotate(${i*29} ${x} ${y})`}><Star x={x} y={y}/></g>)}</g>}
      {id==='surprise-sleepy-thanks' && <g className="bb8-sleepy-thanks" aria-label="One soft thank-you beep before sleep"><Heart x={shared?480:565} y={shared?275:268} scale={.8}/></g>}
    </>}
  </g>;
}
