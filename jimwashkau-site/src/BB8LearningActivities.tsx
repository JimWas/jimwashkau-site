import type { LittleActivity } from './BB8LittleActivities';
import './BB8LearningActivities.css';

function Star({ x, y, color = '#f5d691' }: { x: number; y: number; color?: string }) {
  return <path transform={`translate(${x} ${y})`} d="m0-10 3 7 8 1-6 6 2 8-7-4-7 4 2-8-6-6 8-1z" fill={color}/>;
}
function Teddy({ x, y, tilted = false }: { x: number; y: number; tilted?: boolean }) {
  return <g transform={`translate(${x} ${y})`}><g className={tilted ? 'bb8-student-tumble' : undefined}>
    <circle cx="-12" cy="-29" r="8" fill="#b8916d"/><circle cx="12" cy="-29" r="8" fill="#b8916d"/>
    <ellipse cy="3" rx="19" ry="23" fill="#c7a37c"/><circle cy="-19" r="19" fill="#d5b58c"/>
    <circle cx="-6" cy="-22" r="2" fill="#43574c"/><circle cx="6" cy="-22" r="2" fill="#43574c"/><ellipse cy="-14" rx="5" ry="3" fill="#735947"/>
    <path d="m-15 0-10 9m40-9 10 9m-35 9-3 8m23-8 3 8" stroke="#b8916d" strokeWidth="9"/>
  </g></g>;
}

// These lessons share the resident's movement, lighting, and snapshot layers.
export function LearningActivityProps({ id }: { id: LittleActivity['id'] }) {
  return <g className="bb8-learning-props">
    {id === 'counting-stars' && <>
      <rect x="540" y="165" width="122" height="87" rx="16" fill="#334e55" stroke="#99b4aa" strokeWidth="3"/>
      {[0,1,2,3,4].map(i => <g key={i} className="bb8-count-star" style={{animationDelay: `${i * .8}s`}}><Star x={553+i*23} y={194+(i%2)*28}/><text x={553+i*23} y="243" fontSize="12" textAnchor="middle" fill="#fff0c9">{i+1}</text></g>)}
    </>}
    {id === 'color-sorting' && <>
      {['#d8887a','#e3c674','#8dbbc9'].map((color,i) => <g key={color}>
        <path d={`M${532+i*48} 385h42q-2 27-21 27t-21-27`} fill={color} stroke="#eee3c4" strokeWidth="2"/>
        <g className="bb8-sort-bolt" style={{animationDelay:`${i*1.2}s`}}><path d={`m${546+i*48} 324 9-5 9 5v10l-9 5-9-5z`} fill={color} stroke="#fff0ce" strokeWidth="2"/></g>
        <text x={553+i*48} y="380" textAnchor="middle" fontSize="10" fill="#344e47">{['RED','YELLOW','BLUE'][i]}</text>
      </g>)}
    </>}
    {id === 'moon-garden' && <>
      <path d="M557 373h59l-8 40h-43z" fill="#c68e6c" stroke="#e3c9a2" strokeWidth="3"/>
      <g className="bb8-sprout-grow"><path d="M585 375v-53" stroke="#759c77" strokeWidth="5"/><path d="M584 349q-31-1-24-24 24 1 24 24m3-10q30-2 23-23-23 1-23 23" fill="#a7c690"/></g>
      <path d="M635 316v96m0-80h10m-10 20h7m-7 20h10m-10 20h7" stroke="#ead3a5" strokeWidth="3"/>
      <g className="bb8-stir"><path d="M520 327h27v24h-27z" fill="#93bcbc"/><path d="m546 335 19-10" stroke="#93bcbc" strokeWidth="7"/></g>
      <path className="bb8-play-float" d="m567 336-2 7m9-4-2 7" stroke="#b9e3df" strokeWidth="3"/>
    </>}
    {id === 'constellations' && <>
      <rect x="535" y="155" width="132" height="100" rx="16" fill="#304954" stroke="#9db7b0" strokeWidth="3"/>
      <path className="bb8-constellation-line" d="m557 178 17 13 20-17 20 17 20-13-7 27-15 22h-31l-15-22z" fill="none" stroke="#c6ddd7" strokeWidth="2" strokeDasharray="210"/>
      {[[557,178],[574,191],[594,174],[614,191],[634,178],[627,205],[612,227],[581,227],[566,205]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#f9e1aa"/>)}
    </>}
    {id === 'magnet-lab' && <>
      <g className="bb8-magnet-test"><path d="M546 322v27a20 20 0 0 0 40 0v-27" fill="none" stroke="#cf8b80" strokeWidth="13"/><path d="M546 322v10m40-10v10" stroke="#c3d5d0" strokeWidth="13"/></g>
      <rect x="618" y="367" width="26" height="26" rx="4" fill="#be966b"/><text x="631" y="409" textAnchor="middle" fontSize="11" fill="#344e47">wood</text>
      <g className="bb8-iron-lift"><path d="m571 380 8-5 8 5v9l-8 5-8-5z" fill="#99aaa5" stroke="#edf0d9" strokeWidth="2"/></g>
      <path d="m508 306 8-5 8 5v9l-8 5-8-5z" fill="#b4c1b5" stroke="#f2e6ca" strokeWidth="2"/>
    </>}
    {id === 'spelling' && <>
      {Array.from('FRIEND').map((letter,i)=><g key={i} transform={`translate(${521+i*25} 351)`}><g className={i===3?'bb8-letter-correct':undefined}><rect x="-11" y="-15" width="23" height="30" rx="4" fill={i%2?'#d6b184':'#a5c0ad'} stroke="#f0e5c9" strokeWidth="2"/><text y="7" textAnchor="middle" fontSize="20" fill="#344e47">{letter}</text></g></g>)}
    </>}
    {id === 'music-lesson' && <>
      <rect x="533" y="346" width="127" height="57" rx="8" fill="#708c83" stroke="#c9d8c0" strokeWidth="3"/>
      {['C','E','G'].map((note,i)=><g key={note}><rect className="bb8-lesson-key" style={{animationDelay:`${i*.42}s`}} x={543+i*37} y="353" width="31" height="42" rx="3" fill="#f2e7cb"/><text x={558+i*37} y="382" textAnchor="middle" fill="#344e47" fontSize="16">{note}</text></g>)}
      <text className="bb8-play-float" x="569" y="327" fontSize="31" fill="#eed499">♫</text>
    </>}
    {id === 'weather-station' && <>
      <rect x="533" y="312" width="134" height="93" rx="10" fill="#e9dfc2" stroke="#9bb6a5" strokeWidth="4"/>
      <circle cx="558" cy="340" r="11" fill="#dca95f"/><path d="M548 364q-7-12 4-14 7-13 15-2 15-3 15 12z" fill="#a4bec3"/>
      <path className="bb8-play-float" d="m590 373-3 9m12-9-3 9m12-9-3 9" stroke="#729fae" strokeWidth="3"/>
      <path d="M637 330v44m-7-44v44a10 10 0 1 0 14 0v-44a7 7 0 0 0-14 0" fill="#d18d7f" stroke="#ab9d82" strokeWidth="2"/>
    </>}
    {id === 'rocket-lab' && <>
      <path d="M537 404h127" stroke="#b3baa5" strokeWidth="3" strokeDasharray="3 6"/>
      <g className="bb8-rocket-test"><path d="m538 347 65-30-19 53-16-20z" fill="#f5ead0" stroke="#99b4a8" strokeWidth="2"/><path d="m568 350 35-33-19 53" fill="#bdd0bc"/></g>
      <path d="m540 387 24-10m-24 2 24-10" stroke="#c1cbb2" strokeWidth="2"/>
    </>}
    {id === 'fossils' && <>
      <ellipse cx="589" cy="389" rx="62" ry="23" fill="#d7bd94" stroke="#e9d7b3" strokeWidth="3"/>
      <path d="M594 397c-35-4-28-36-6-33 23 3 17 28 1 24-13-3-6-15 1-10" fill="none" stroke="#a48d70" strokeWidth="5"/>
      <g className="bb8-fossil-brush"><path d="m544 341 25 28" stroke="#9c8060" strokeWidth="5"/><path d="m562 363 13 13" stroke="#edd8ab" strokeWidth="13"/></g>
      <circle cx="630" cy="332" r="24" fill="#c5e0d4" fillOpacity=".4" stroke="#879f96" strokeWidth="5"/><path d="m612 350-14 17" stroke="#879f96" strokeWidth="8"/>
    </>}
    {id === 'fair-shares' && <>
      {['PERCY','OPPY','GINNY'].map((name,i)=><g key={name}><ellipse cx={550+i*48} cy="380" rx="22" ry="25" fill={['#adbc9c','#d2b58c','#a7c6c0'][i]} stroke="#eae0c2" strokeWidth="2"/><text x={550+i*48} y="416" fontSize="9" textAnchor="middle" fill="#344e47">{name}</text><Star x={550+i*48} y={369} color="#f4d998"/><Star x={550+i*48} y={390} color="#f4d998"/></g>)}
    </>}
    {id === 'feelings' && <>
      {[0,1,2].map(i=><g key={i} transform={`translate(${550+i*48} 331)`}><rect x="-20" y="-22" width="40" height="49" rx="7" fill={['#e4c88d','#a9c5c4','#cbb4cb'][i]}/><path d={i===1?'m-11-4q4 5 8 0m6 0q4 5 8 0':'M-9-4h1m15 0h1'} stroke="#42584e" strokeWidth="3"/><path d={i===0?'M-9 7q9 12 18 0':i===1?'M-3 12h6':'M-8 15q8-10 16 0'} fill="none" stroke="#42584e" strokeWidth="2"/></g>)}
      <Teddy x={591} y={391}/><path className="bb8-play-float" d="M631 392q-17-13-11-19 6-4 11 4 5-8 11-4 6 6-11 19" fill="#d99b91"/>
    </>}
    {id === 'recycling' && <>
      {['PAPER','METAL','PLASTIC'].map((name,i)=><g key={name}><rect x={531+i*48} y="361" width="43" height="49" rx="5" fill={['#91b9bd','#aab794','#d2b278'][i]} stroke="#e6ddc2" strokeWidth="2"/><path d={`M${530+i*48} 359h45`} stroke="#d4ddc3" strokeWidth="5"/><text x={553+i*48} y="389" textAnchor="middle" fontSize="9" fill="#263f37">{name}</text><g className="bb8-sort-bolt" style={{animationDelay:`${i*1.2}s`}}>{i===0?<path d="M544 314h18v23h-18z" fill="#f2e6c9"/>:i===1?<circle cx="601" cy="326" r="9" fill="#c2ccc1"/>:<path d="M645 316h9v6h5v17h-18v-17h4z" fill="#d5e2d3"/>}</g></g>)}
    </>}
    {id === 'shadow-lab' && <>
      <rect x="590" y="310" width="80" height="101" rx="7" fill="#dfd9bd"/>
      <g transform="translate(627 370)"><path className="bb8-shadow-grow" d="M-9 20v-22l-6-12 13 6 11-6-3 12v22z" fill="#7d887b"/></g>
      <path d="M558 385h15l4-20-10-12-11 12z" fill="#d4b18a"/>
      <g className="bb8-lamp-slide"><path d="M516 403v-46m-9 46h18" stroke="#a2b7a4" strokeWidth="4"/><path d="m507 342-6 24h29l-8-24z" fill="#eed298"/></g>
    </>}
    {id === 'plush-school' && <>
      <rect x="535" y="158" width="137" height="98" rx="8" fill="#37574d" stroke="#c5b28b" strokeWidth="5"/>
      <circle cx="559" cy="195" r="12" fill="#8ab4c1"/><path d="m552 187 8 4-2 13 7-7" stroke="#b0c69b" strokeWidth="4"/>
      <circle cx="601" cy="195" r="10" fill="#cf9777"/>
      <circle cx="645" cy="195" r="11" fill="#d4bc87"/><ellipse cx="645" cy="195" rx="22" ry="5" fill="none" stroke="#e9d3a5" strokeWidth="3"/>
      {['EARTH','MARS','SATURN'].map((name,i)=><text key={name} x={559+i*43} y="236" textAnchor="middle" fontSize="9" fill="#f4e7c4">{name}</text>)}
      <Teddy x={552} y={385}/><Teddy x={620} y={385} tilted/>
    </>}
    {id === 'moon-phases' && <>
      <rect x="539" y="308" width="124" height="101" rx="19" fill="#344e59" stroke="#aec3b5" strokeWidth="3"/>
      <circle cx="600" cy="354" r="33" fill="#667b7d"/>
      <g className="bb8-lesson-step bb8-lesson-step-0"><path d="M610 324a33 33 0 1 1 0 60 29 29 0 0 0 0-60" fill="#f5dfab"/></g>
      <g className="bb8-lesson-step bb8-lesson-step-1"><path d="M600 321a33 33 0 0 1 0 66z" fill="#f5dfab"/></g>
      <g className="bb8-lesson-step bb8-lesson-step-2"><circle cx="600" cy="354" r="33" fill="#f5dfab"/></g>
      <path className="bb8-moon-offer" d="M526 331a15 15 0 1 0 0 28 13 13 0 0 1 0-28" fill="#e8d3a7"/>
    </>}
    {id === 'shape-detective' && <>
      <rect x="531" y="322" width="141" height="88" rx="12" fill="#eee1c4" stroke="#afbd9f" strokeWidth="3"/>
      <circle cx="554" cy="350" r="15" fill="#d5aa7d"/><path d="m598 331 18 35h-36z" fill="#9ebca6"/><rect x="635" y="334" width="30" height="30" rx="2" fill="#a5c2cd"/>
      {['CIRCLE','TRIANGLE','SQUARE'].map((name,i)=><text key={name} x={554+i*44} y="393" textAnchor="middle" fontSize="8" fill="#35564c">{name}</text>)}
      <circle className="bb8-shape-ring" cx="478" cy="340" r="96" fill="none" stroke="#f2daa2" strokeWidth="3" strokeDasharray="6 9"/>
    </>}
    {id === 'sink-float' && <>
      <path d="M528 352h146l-10 60H538z" fill="#b6d5d5" fillOpacity=".8" stroke="#89acaa" strokeWidth="3"/>
      <path d="M533 366q16-7 32 0t32 0t32 0t40 0" fill="none" stroke="#f2e9d3" strokeWidth="3"/>
      <g className="bb8-cork-bob"><rect x="548" y="357" width="29" height="12" rx="5" fill="#bb9166"/><path d="m553 361 3 2m10-3 3 2" stroke="#8e6b49" strokeWidth="2"/></g>
      <g className="bb8-stone-sink"><ellipse cx="631" cy="360" rx="14" ry="10" fill="#8e9991"/></g>
      <path className="bb8-lesson-step bb8-lesson-step-2" d="M608 329h14l7 12 7-12h14v24h-42z" fill="#e5b16e" stroke="#f1dfb6" strokeWidth="3"/>
    </>}
    {id === 'pattern-train' && <>
      <path d="M529 406h147m-137-5v10m24-10v10m24-10v10m24-10v10m24-10v10m24-10v10" stroke="#a8b7a1" strokeWidth="3"/>
      {[0,1,2,3,4].map(i=><g key={i} className={i===4?'bb8-pattern-car':undefined} transform={`translate(${533+i*28} 367)`}><rect width="25" height="24" rx="4" fill={i%2?'#94b9c8':'#d89586'}/><circle cx="6" cy="27" r="4" fill="#566e61"/><circle cx="19" cy="27" r="4" fill="#566e61"/></g>)}
      <g className="bb8-pattern-answer"><rect x="673" y="367" width="25" height="24" rx="4" fill="#94b9c8"/><circle cx="679" cy="394" r="4" fill="#566e61"/><circle cx="692" cy="394" r="4" fill="#566e61"/></g>
    </>}
    {id === 'droid-yoga' && <>
      <ellipse cx="477" cy="419" rx="110" ry="16" fill="#9cb8aa" stroke="#d8dfc1" strokeWidth="3"/>
      <rect x="555" y="318" width="88" height="91" rx="11" fill="#ebdfc2" stroke="#a2baa7" strokeWidth="3"/>
      <circle cx="600" cy="335" r="8" fill="#94aaa0"/><path d="M600 344v30m-20-23 20 9 19-20m-19 34-14 22m14-22 16 9-16 5" fill="none" stroke="#859f8b" strokeWidth="5"/>
    </>}
    {id === 'animal-sounds' && <>
      <g transform="translate(556 359)"><path d="M-22 18v-32l10-15 10 12h8l13-12 5 22v25z" fill="#c5a47e"/><path d="m-12 1h1m20 0h1m-13 9h6" stroke="#435b4e" strokeWidth="3"/></g>
      <g transform="translate(637 359)"><path d="M-21-10l-13-9m55 9 13-9" stroke="#e3c392" strokeWidth="7"/><rect x="-23" y="-19" width="46" height="48" rx="17" fill="#ede2ca"/><ellipse cy="17" rx="20" ry="11" fill="#d6aa9b"/><path d="m-10-3h1m18 0h1m-17 20h1m12 0h1" stroke="#455c50" strokeWidth="3"/></g>
      <text x="556" y="411" fontSize="12" fill="#344e47" textAnchor="middle">MEOW</text><text x="637" y="411" fontSize="12" fill="#344e47" textAnchor="middle">MOO</text>
    </>}
    {(id === 'directions' || id === 'coding-rover') && <>
      <rect x="535" y="310" width="137" height="103" rx="9" fill="#dfdcc0" stroke="#9bb39f" strokeWidth="3"/>
      <path d="M551 316v92m27-92v92m27-92v92m27-92v92m27-92v92m-118-67h125m-125 28h125m-125 28h125" stroke="#c2c7ad" strokeWidth="1"/>
      <path d="M551 394v-55h82v55" fill="none" stroke="#749c87" strokeWidth="4" strokeDasharray="4 4"/>
      <path className="bb8-lesson-step bb8-lesson-step-0" d="M551 339h-13" stroke="#c9867b" strokeWidth="5"/>
      {id==='directions'?<g className="bb8-map-traveler"><Star x={551} y={394}/></g>:<g className="bb8-map-traveler"><rect x="541" y="385" width="20" height="12" rx="3" fill="#d2ab70"/><path d="M550 385v-8m-3 0h7" stroke="#7c9385" strokeWidth="3"/><circle cx="545" cy="399" r="3" fill="#4f665b"/><circle cx="557" cy="399" r="3" fill="#4f665b"/></g>}
      {id==='directions'?<g transform="translate(633 389) scale(.35)"><Teddy x={0} y={0}/></g>:<><rect x="624" y="385" width="20" height="19" rx="3" fill="#86ad98"/><path d="m636 388-6 6h7l-5 7" fill="none" stroke="#f5e6b7" strokeWidth="2"/></>}
      <text x="599" y="245" textAnchor="middle" fill="#f4dfb3" stroke="#526e5d" strokeWidth=".3" fontSize="24">↑ → ↓</text>
    </>}
    {id === 'space-post' && <>
      {['PERCY','OPPY','GINNY'].map((name,i)=><g key={name} transform={`translate(${551+i*49} 369)`}><path d="M-19 0v-24q19-25 38 0V0z" fill={['#d7b481','#bdc7a3','#a1bfbe'][i]} stroke="#eee3c4" strokeWidth="2"/><path d="M-12-13h24" stroke="#688572" strokeWidth="3"/><text y="33" textAnchor="middle" fontSize="9" fill="#344e47">{name}</text><text y="-30" textAnchor="middle" fontSize="15" fill="#344e47">{['★','○','△'][i]}</text><path d="M0 12q-12-9-8-13 4-4 8 3 4-7 8-3 4 4-8 13" fill="#d28f83"/></g>)}
      <g className="bb8-post-letter"><rect x="525" y="307" width="32" height="23" rx="3" fill="#f2e4c7" stroke="#bda582" strokeWidth="2"/><path d="m526 308 15 11 15-11" stroke="#bda582" fill="none"/><rect x="549" y="310" width="5" height="5" fill="#c18e81"/>{['★','○','△'].map((symbol,i)=><text key={symbol} x="535" y="325" fontSize="10" fill="#526e5d" className={`bb8-lesson-step bb8-lesson-step-${i}`}>{symbol}</text>)}</g>
    </>}
    {id === 'block-measuring' && <>
      <path d="M541 414h118" stroke="#9cb49e" strokeWidth="3"/>
      {[0,1,2,3,4].map(i=><g key={i}><rect x="552" y={397-i*18} width="18" height="18" rx="2" fill={i%2?'#d4af82':'#a6c0ab'} stroke="#eee3c5" strokeWidth="2"/><text x="542" y={410-i*18} textAnchor="end" fill="#344e47" fontSize="10">{i+1}</text></g>)}
      <g className="bb8-measure-giraffe"><path d="M619 404v-70" stroke="#dcc68e" strokeWidth="18"/><ellipse cx="625" cy="333" rx="20" ry="8" fill="#e4d49d"/><path d="M614 329v-4m13 3v-4" stroke="#b89a63" strokeWidth="4"/><ellipse cx="618" cy="398" rx="25" ry="14" fill="#e4d49d"/><path d="m602 404-2 10m29-10 2 10m-17-67h7m-7 17h7m-7 17h7" stroke="#bd9f6c" strokeWidth="5"/><circle cx="633" cy="331" r="2" fill="#486050"/></g>
      <path d="M577 324h71" stroke="#a6b6a1" strokeDasharray="3 4" strokeWidth="2"/>
    </>}
    {id === 'gentle-breaths' && <>
      <path d="M600 405v-47m-2 27q-30-2-24-17 20-3 24 17m4-7q28-2 23-17-19-1-23 17" stroke="#85a989" strokeWidth="5" fill="#acc794"/>
      <g transform="translate(600 347)"><g className="bb8-breath-flower">{[0,60,120,180,240,300].map(angle=><ellipse key={angle} transform={`rotate(${angle})`} cy="-19" rx="12" ry="24" fill="#d5b9a9" fillOpacity=".8" stroke="#ecdbb6" strokeWidth="2"/>)}<circle r="12" fill="#edce8c"/></g></g>
    </>}
    {id === 'sound-detective' && <>
      <g transform="translate(551 354)"><path d="M-15 16q10-5 8-25 7-17 14 0-2 20 8 25z" fill="#d8b77c" stroke="#edd9ad" strokeWidth="2"/><circle cy="20" r="4" fill="#917a51"/></g>
      <g transform="translate(601 352)"><path d="M0 20v23" stroke="#a68b65" strokeWidth="5"/><ellipse ry="21" rx="13" fill="#b4c5a4" stroke="#ede0bf" strokeWidth="2"/><path d="m-6-9 12 18m-12-9 9 9" stroke="#789b85" strokeWidth="2"/></g>
      <g transform="translate(650 365)"><path d="M-18 0v24q18 13 36 0V0" fill="#cb9b80" stroke="#e7d3af" strokeWidth="2"/><ellipse rx="18" ry="7" fill="#eee1c1"/><path d="m-13 9 26 10m-26 0 26-10" stroke="#a77e62" strokeWidth="2"/></g>
      {['BELL','SHAKER','DRUM'].map((name,i)=><text key={name} x={551+i*49} y="416" textAnchor="middle" fontSize="9" fill="#344e47">{name}</text>)}
    </>}
    {id === 'droid-archaeology' && <>
      <ellipse cx="600" cy="406" rx="76" ry="10" fill="#bdad88" opacity=".4"/>
      <g className="bb8-pot-left"><path d="M600 334h-30l8 33q-22 37 22 39v-35l-9-9 9-7z" fill="#c99c76" stroke="#edcfaa" strokeWidth="2"/></g>
      <g className="bb8-pot-right"><path d="M600 334h30l-8 33q22 37-22 39v-35l-9-9 9-7z" fill="#d8ad86" stroke="#edcfaa" strokeWidth="2"/></g>
      <path d="M567 331h66m-50 58h34" stroke="#b78463" strokeWidth="4"/>
      <path className="bb8-play-float" d="m653 367 12-8 10 15-17 9z" fill="#d8ad86" stroke="#edcfaa" strokeWidth="2"/>
    </>}
    {id === 'orbit-lesson' && <>
      <rect x="534" y="311" width="140" height="102" rx="14" fill="#354f58" stroke="#a3b9aa" strokeWidth="3"/>
      <circle cx="599" cy="363" r="39" fill="none" stroke="#91b3af" strokeDasharray="3 5" strokeWidth="2"/><circle cx="599" cy="363" r="15" fill="#ebca85"/>
      <g className="bb8-earth-orbit"><circle cx="638" cy="363" r="9" fill="#91b9c3"/><path d="m637 357-3 7 7 3" stroke="#b0c99a" strokeWidth="3"/></g>
      <g transform="translate(658 330) scale(.3)"><g className="bb8-teddy-orbit"><Teddy x={0} y={0}/></g></g>
      <text x="599" y="308" textAnchor="middle" fontSize="11" fill="#344e47">MODEL SUN + EARTH</text>
    </>}
    {id === 'kindness-circle' && <>
      <ellipse cx="586" cy="408" rx="58" ry="9" fill="#a7c2ac" fillOpacity=".5"/>
      <g transform="translate(550 383) scale(.65)"><Teddy x={0} y={0}/></g><g transform="translate(596 383) scale(.65)"><Teddy x={0} y={0}/></g>
      <g className="bb8-invite-plush"><g transform="translate(666 383) scale(.65)"><Teddy x={0} y={0}/></g></g>
      <path className="bb8-play-float" d="M603 332q-19-14-12-20 7-5 12 4 5-9 12-4 7 6-12 20" fill="#d6a194"/>
    </>}
  </g>;
}
