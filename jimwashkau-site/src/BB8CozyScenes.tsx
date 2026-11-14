import type { DroidId } from './DroidProfiles';
import './BB8CozyScenes.css';

function Teddy({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cy="9" rx="17" ry="20" fill="#c2a079"/>
    <circle cx="-12" cy="-17" r="7" fill="#b2926e"/><circle cx="12" cy="-17" r="7" fill="#b2926e"/>
    <circle cy="-9" r="17" fill="#d4b58d"/><ellipse cy="-3" rx="9" ry="7" fill="#e6cfa7"/>
    <circle cx="-6" cy="-12" r="2" fill="#465e51"/><circle cx="6" cy="-12" r="2" fill="#465e51"/>
    <path d="m-3-5 3 3 3-3M0-2v4" fill="none" stroke="#705b47" strokeWidth="2"/>
    <ellipse cx="-12" cy="26" rx="8" ry="6" fill="#b2926e"/><ellipse cx="12" cy="26" rx="8" ry="6" fill="#b2926e"/>
  </g>;
}
function Sock({ color, striped = false }: { color: string; striped?: boolean }) {
  return <g><path d="M-10-22h21v23l13 5q9 12-3 17H-1q-9 0-9-9Z" fill={color} stroke="#eee0c3" strokeWidth="2"/>
    <path d="M-9-14h19" stroke="#f3e7cb" strokeWidth="4"/>{striped && <path d="M-9-3h19M-8 8h25" stroke="#f3e7cb" strokeWidth="3"/>}</g>;
}

export function CozyAntennaSock({ resident }: { resident: DroidId }) {
  return <g transform={`translate(${resident === 'bb9e' ? '501 134' : '453 155'}) scale(.65) rotate(-16)`}><g className="bb8-cozy-sock-hat"><Sock color="#d5ac95"/></g></g>;
}

// Physical toys only. Their little stories are described in the status and terminal.
export function CozySceneProps({ id }: { id: string }) {
  return <g className="bb8-cozy-props">
    {id === 'teddy-train' && <g transform="translate(-22 0)" aria-label="A wooden train carries teddy slowly along a little track">
      <path d="M530 421h164m-153-7v14m24-14v14m24-14v14m24-14v14m24-14v14m24-14v14m24-14v14" fill="none" stroke="#b6a282" strokeWidth="3"/>
      <g className="bb8-cozy-train"><path d="M539 391h41v19h-41Z" fill="#a4bdac" stroke="#e8d8b7" strokeWidth="2"/><rect x="542" y="368" width="22" height="24" rx="3" fill="#cb9c77"/><rect x="546" y="372" width="14" height="12" rx="2" fill="#e9d9b8"/><path d="M570 391v-20h8v20m3 14h15" stroke="#b9a284" strokeWidth="4"/>
        <Teddy x={618} y={370}/><path d="M594 391h49v19h-49Z" fill="#b3a9bf" stroke="#e8d8b7" strokeWidth="2"/>
        {[549,572,603,634].map(x=><circle key={x} cx={x} cy="413" r="6" fill="#617c6b" stroke="#d4c8a8" strokeWidth="2"/>)}</g>
      <g transform="translate(525 335) rotate(-12)"><rect x="-18" y="-13" width="36" height="26" rx="3" fill="#eddbaf" stroke="#ac9170" strokeWidth="2"/><path d="M-7-8V8" stroke="#a88e6b" strokeDasharray="2 3"/><path d="m1 0 4-6 4 6-4 6Z" fill="#9aae96"/></g>
    </g>}
    {id === 'sock-matching' && <g aria-label="A tiny laundry basket, matching striped socks, and one sock perched on an antenna">
      <path d="M558 358h78l-9 53h-60Z" fill="#bdab8c" stroke="#e7d8b8" strokeWidth="3"/><path d="M572 369h49m-47 12h45m-43 12h41m-34-30v39m17-39v39m17-39v39" stroke="#e1ceb0" strokeWidth="3"/>
      {[0,1].map(i=><g key={i} transform={`translate(${535+i*40} 393) rotate(${i?-12:9})`}><Sock color="#a3bbb0" striped/></g>)}
      <g transform="translate(588 351) rotate(16)"><Sock color="#d5ac95"/></g>
    </g>}
    {id === 'windup-duck' && <g aria-label="A wind-up toy duck waddles, pauses, then waddles again"><g className="bb8-cozy-duck">
      <ellipse cx="594" cy="407" rx="28" ry="6" fill="#829485" opacity=".2"/>
      <path d="m580 398-5 10h14m16-10 8 10h-14" stroke="#ce9e73" strokeWidth="4" fill="none"/>
      <path d="M568 376q-4 26 27 26 30 0 27-27l-14 8Z" fill="#e1c68c" stroke="#f0e1bf" strokeWidth="2"/>
      <circle cx="607" cy="368" r="17" fill="#e5cc94"/><path d="m622 368 13 5-13 5" fill="#ce9671"/>
      <circle cx="611" cy="364" r="3" fill="#486354"/><path d="M584 381q0 14 16 9" fill="none" stroke="#b79b69" strokeWidth="3"/>
      <g transform="translate(572 381)"><g className="bb8-cozy-wind-key"><path d="M0 0h-12m0-6v12" stroke="#91a999" strokeWidth="4"/><circle cx="-17" cy="-6" r="5" fill="none" stroke="#91a999" strokeWidth="3"/><circle cx="-17" cy="6" r="5" fill="none" stroke="#91a999" strokeWidth="3"/></g></g>
    </g></g>}
    {id === 'paper-boat' && <g aria-label="A folded paper boat glides across a dry felt pond toward a soft island">
      <ellipse cx="592" cy="400" rx="84" ry="22" fill="#91b4b2" stroke="#c9d8c1" strokeWidth="3"/>
      <path d="M526 404q20-7 38 0m35 8q19-7 39-2" stroke="#cbded2" strokeWidth="2" fill="none"/>
      <ellipse cx="625" cy="394" rx="16" ry="8" fill="#bdc498"/>
      <g className="bb8-cozy-boat"><path d="m543 380 25-29 25 29-25 17Z" fill="#f0e0bd" stroke="#baa582" strokeWidth="2"/><path d="m543 380 12 18h26l12-18-25 8Z" fill="#d6bd97" stroke="#baa582" strokeWidth="2"/><path d="m568 354 0 30" stroke="#bfa783" strokeWidth="2"/></g>
      <path className="bb8-cozy-puff" d="M515 344q22-10 28 2m-25 8q21-5 31 5" stroke="#e2e3c9" strokeWidth="2" fill="none"/>
    </g>}
    {id === 'rainbow-xylophone' && <g transform="translate(-18 0)" aria-label="A little rainbow xylophone with a gently tapping mallet">
      <path d="M522 402h133v9H522Z" fill="#b59c7d"/>
      {['#ce9d8e','#d6af82','#ddc58a','#a9bf9d','#97b8b3','#aaa9c3'].map((color,i)=><g key={color}><rect x={526+i*21} y={371+i*3} width="18" height={34-i*3} rx="4" fill={color} stroke="#ecdfbf" strokeWidth="2"/><circle cx={535+i*21} cy={379+i*3} r="2" fill="#6b806b"/></g>)}
      <g className="bb8-cozy-mallet"><path d="m521 337 50 38" stroke="#b9a584" strokeWidth="5"/><circle cx="572" cy="376" r="8" fill="#e6d4ae" stroke="#baaa8c" strokeWidth="2"/></g>
      {[0,1,2].map(i=><text key={i} className="bb8-cozy-note" style={{animationDelay:`${i*1.2}s`}} x={561+i*26} y={333-i*11} fontSize="22" fill={i%2?'#d4c18f':'#b0c8b7'}>♪</text>)}
    </g>}
    {id === 'teddy-planetarium' && <g aria-label="A toy planetarium projects a little constellation above a teddy bear">
      <path d="m583 380-60-159h154Z" fill="#d9dfba" opacity=".08"/>
      <g className="bb8-cozy-constellation"><path d="m535 250 32-32 30 20 38-17 23 32" stroke="#d0d6b3" strokeWidth="2" strokeDasharray="3 5" fill="none"/>
        {[[535,250],[567,218],[597,238],[635,221],[658,253]].map(([x,y])=><path key={x} transform={`translate(${x} ${y})`} d="m0-7 2 5 6 2-6 2-2 5-2-5-6-2 6-2Z" fill="#ebd6a3"/>)}</g>
      <path d="M563 391v-13q20-27 40 0v13Z" fill="#a2b7ad" stroke="#e4d8b8" strokeWidth="3"/><ellipse cx="583" cy="391" rx="25" ry="6" fill="#8ca494"/><circle cx="583" cy="374" r="5" fill="#efdcaa"/>
      <g transform="translate(615 383) rotate(-9)"><Teddy x={0} y={0}/></g>
      <path className="bb8-cozy-pointer" d="m521 328 25-41" stroke="#a6b9a6" strokeWidth="5" strokeLinecap="round"/>
    </g>}
  </g>;
}
