import type { LittleActivity } from './BB8LittleActivities';

// Props live inside the droid's SVG group so snapshots and night vision include them.
export function ActivityProps({ activity }: { activity: LittleActivity }) {
  return <g className={`bb8-play-props bb8-play-${activity.id}`} aria-label={activity.label} strokeLinecap="round" strokeLinejoin="round">
    {activity.id === 'violin' && <>
      <path d="M510 285q25 0 18 22q-13 14 0 26q10 27-15 38q-27 7-29-18q-2-15 9-23q10-9-3-21q-9-23 20-24" fill="#b97040" stroke="#75472f" strokeWidth="3"/>
      <path d="m510 337 26-80" stroke="#744d34" strokeWidth="12"/><path d="m510 342 28-83" stroke="#e9d6aa" strokeWidth="2"/>
      <path className="bb8-violin-bow" d="m467 294 87 58" stroke="#f0d7a3" strokeWidth="5"/>
      <path d="m486 330-22 9m56-59 19-7" stroke="#89968c" strokeWidth="7"/>
    </>}
    {activity.id === 'cooking' && <>
      <path d="M432 212v-24q-17-22 4-30q11-19 30-5q27-12 30 12q22 3 12 24v23z" fill="#f7f0dd" stroke="#c7c6b1" strokeWidth="3"/>
      <path d="M539 365h88q-3 51-44 51t-44-51" fill="#d6a06d" stroke="#a47651" strokeWidth="3"/><ellipse cx="583" cy="365" rx="44" ry="9" fill="#e9d7ad"/>
      <g className="bb8-stir"><path d="m580 369-18-62" stroke="#917352" strokeWidth="6"/><ellipse cx="561" cy="307" rx="8" ry="12" fill="#ba9971"/></g>
      <path className="bb8-play-float" d="M572 343q-9-9 0-18m17 18q-9-9 0-18" stroke="#eee2c2" strokeWidth="3" fill="none"/>
    </>}
    {activity.id === 'sippy' && <g className="bb8-sippy-cup">
      <path d="M510 302q-22-14-21 10q0 20 25 13m42-23q23-14 22 10q0 20-24 13" fill="none" stroke="#a9c8b0" strokeWidth="7"/>
      <rect x="509" y="286" width="48" height="57" rx="13" fill="#89b7aa" stroke="#5c9184" strokeWidth="3"/>
      <path d="M506 287h54m-32 0v-15h13v15" stroke="#e5d7ad" strokeWidth="8"/>
      <path d="m533 313 3-6 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5z" fill="#f6e4b1"/>
    </g>}
    {activity.id === 'reading' && <g className="bb8-storybook">
      <path d="M423 320q29-14 55 4q26-18 55-4v66q-30-11-55 6q-26-17-55-6z" fill="#e9dec1" stroke="#b38660" strokeWidth="5"/>
      <path d="M478 324v66m-43-31h27m-27 9h25m32-9h27m-27 9h25" stroke="#a89f87" strokeWidth="2"/>
      <circle cx="450" cy="339" r="9" fill="#dda366"/><path d="m506 330 4 7 8 1-6 6 2 8-8-4-7 4 1-8-5-6 8-1z" fill="#91aa91"/>
      <path className="bb8-book-page" d="M478 324q26-18 55-4v66q-30-11-55 6" fill="#f4ead2" opacity=".5"/>
    </g>}
    {activity.id === 'stars' && <>
      <path d="m557 304 41 102m-41-102-22 102" stroke="#b4b5a1" strokeWidth="5"/>
      <g transform="rotate(-28 560 293)"><rect x="520" y="281" width="89" height="26" rx="5" fill="#8aada7" stroke="#577a77" strokeWidth="3"/><path d="M605 278v33m-86-23h-13" stroke="#d9ceb2" strokeWidth="7"/></g>
      <path className="bb8-play-float" d="m644 174 3-9 3 9 9 3-9 3-3 9-3-9-9-3z" fill="#f6dfa4"/>
    </>}
    {activity.id === 'singing' && <>
      <path d="M549 341v67m-15 0h30" stroke="#979e92" strokeWidth="4"/><rect x="538" y="310" width="22" height="35" rx="11" fill="#6b8c87" stroke="#bac5b4" strokeWidth="3"/>
      <g className="bb8-play-float" fill="#efd095" fontFamily="serif" fontSize="33"><text x="560" y="265">♪</text><text x="596" y="232">♫</text><text x="538" y="200">♪</text></g>
    </>}
    {activity.id === 'painting' && <>
      <path d="m584 292-21 125m21-125 30 125" stroke="#a58361" strokeWidth="6"/><rect x="553" y="288" width="67" height="75" rx="3" fill="#f5e9cb" stroke="#bea47e" strokeWidth="4"/>
      <path d="M585 341q-32-22-17-31q10-7 17 6q7-13 17-6q15 9-17 31" fill="#d68a6d"/>
      <g className="bb8-stir"><path d="m531 350 27-39" stroke="#a08057" strokeWidth="5"/><path d="m558 311 6-9" stroke="#d68a6d" strokeWidth="8"/></g>
    </>}
    {activity.id === 'blocks' && <>
      {[['#b7c5a6',560,385],['#d5a271',590,385],['#9ebcba',575,353],['#dfc38e',575,321]].map(([color,x,y], i) => <g key={i}><rect x={x} y={y} width="29" height="29" rx="5" fill={color as string} stroke="#f1e5ca" strokeWidth="2"/><text x={Number(x)+14} y={Number(y)+20} fill="#f9f0d9" textAnchor="middle" fontSize="18">{i === 3 ? '★' : '✦'}</text></g>)}
      <rect className="bb8-block" x="533" y="331" width="27" height="27" rx="5" fill="#c79381" stroke="#eee0c2" strokeWidth="2"/>
    </>}
    {activity.id === 'bubbles' && <>
      <rect x="537" y="372" width="26" height="36" rx="7" fill="#a8c3b5"/><g className="bb8-stir"><path d="m532 323 22 51" stroke="#dfc295" strokeWidth="4"/><circle cx="528" cy="312" r="12" fill="none" stroke="#dfc295" strokeWidth="4"/></g>
      {[ [571,296,12], [600,247,18], [548,221,10], [626,196,13] ].map(([x,y,r],i) => <g className="bb8-bubble" key={i} style={{animationDelay:`-${i * 1.4}s`}}><circle cx={x} cy={y} r={r} fill="#cfdfdd" fillOpacity=".15" stroke="#d6e4da" strokeWidth="2"/><path d={`M${x-r/2} ${y-r/2}l3-2`} stroke="#fcf4da" strokeWidth="3"/></g>)}
    </>}
    {activity.id === 'gardening' && <>
      <path d="M567 369h45l-7 40h-31z" fill="#c18d67" stroke="#986b4d" strokeWidth="3"/><path d="M589 369v-38" stroke="#75906a" strokeWidth="4"/><path d="M588 353q-33 0-22-22q22-1 22 22m2-10q30 0 25-25q-25 1-25 25" fill="#9eb38b"/>
      <g className="bb8-stir"><path d="M524 333h30v30h-30z" fill="#8baeb2"/><path d="m551 341 20-13 5 6-22 21m-30-17q-21-8-16 13h16" fill="none" stroke="#8baeb2" strokeWidth="6"/></g>
      <path className="bb8-play-float" d="m576 343-2 5m7-2-2 5" stroke="#c6dedb" strokeWidth="3"/>
    </>}
    {activity.id === 'hide' && <g className="bb8-hide-blanket">
      <path d="M382 310q45-20 95 0t99 0v136H382z" fill="#7c9891" stroke="#b0c5b6" strokeWidth="4"/>
      <path d="M399 333q35-12 74 0t85 0m-135 27h10m-5-5v10m65 26h10m-5-5v10" fill="none" stroke="#c0d1c1" strokeWidth="3"/>
    </g>}
    {activity.id === 'tea' && <>
      <ellipse cx="588" cy="371" rx="63" ry="15" fill="#ceb592" stroke="#aa8b64" strokeWidth="3"/>
      <path d="M550 382v35m76-35v35" stroke="#aa8b64" strokeWidth="6"/>
      {[553,617].map(x => <g key={x}><ellipse cx={x} cy="369" rx="16" ry="4" fill="#eee0c2"/><path d={`M${x-9} 351h18v12q-9 10-18 0z`} fill="#acc6b5"/><path d={`M${x+9} 353q14-3 9 8h-9`} fill="none" stroke="#acc6b5" strokeWidth="3"/></g>)}
      <g className="bb8-teapot"><ellipse cx="587" cy="333" rx="19" ry="16" fill="#dda378"/><path d="m572 330-17-7 10 19m37-17q21-10 14 11h-12" fill="none" stroke="#dda378" strokeWidth="5"/><path d="M572 321h29m-15-1v-6" stroke="#efc69d" strokeWidth="5"/></g>
    </>}
    {activity.id === 'rolling' && <>
      {[363,598].map(x => <g key={x}><path d={`M${x} 418l15-35 15 35z`} fill="#d99f74" stroke="#f0d6ad" strokeWidth="3"/><path d={`M${x+7} 404h16`} stroke="#f4ead3" strokeWidth="5"/></g>)}
      <path className="bb8-play-float" d="m572 277 4-10 4 10 11 4-11 4-4 10-4-10-11-4z" fill="#f0d192"/>
      <path d="M408 432q71 12 142 0" fill="none" stroke="#eee1bd" strokeDasharray="4 10" strokeWidth="3"/>
    </>}
    {activity.id === 'paper' && <>
      <path d="M559 394h49l-7 15h-49z" fill="#d0c5a7"/>
      <g className="bb8-paper-flight"><path d="m537 333 62-26-19 50-12-19-31-5z" fill="#f3ead1" stroke="#b7b59e" strokeWidth="2"/><path d="m568 338 31-31-19 50" fill="#cbd5c2" stroke="#a1b39f" strokeWidth="2"/></g>
    </>}
    {activity.id === 'conducting' && <>
      <g className="bb8-conductor-baton"><path d="m520 299 33-83" stroke="#efe3c3" strokeWidth="5"/><path d="m520 299-5 12" stroke="#b48c66" strokeWidth="9"/></g>
      <g className="bb8-play-float" fill="#e7cf94" fontFamily="serif" fontSize="27"><text x="388" y="197">♪</text><text x="539" y="184">♫</text></g>
    </>}
    {activity.id === 'repairs' && <>
      <path d="m548 389 28-42 28 42-28-9z" fill="#a6bfba" stroke="#688e89" strokeWidth="3"/><ellipse cx="576" cy="370" rx="9" ry="13" fill="#d8e1cf"/><path d="m548 390-7 10m62-10 7 10" stroke="#d7ac77" strokeWidth="5"/>
      <g className="bb8-wrench"><path d="m532 353 26-35q-8-14 5-23l1 12 9 5 12-5q-1 17-18 17l-26 36z" fill="#a9b2a7" stroke="#6f8278" strokeWidth="3"/><circle cx="538" cy="353" r="3" fill="#eef0da"/></g>
      <circle cx="606" cy="409" r="4" fill="#b6aa8a"/><circle cx="550" cy="410" r="4" fill="#b6aa8a"/>
    </>}
    {activity.id === 'dancing' && <>
      <g className="bb8-play-float" fill="#e9c98e" fontFamily="serif" fontSize="35"><text x="360" y="310">♪</text><text x="566" y="260">♫</text><text x="600" y="340">♪</text></g>
      <path d="m392 395-13 9m184-9 13 9" stroke="#d8b786" strokeWidth="4"/>
    </>}
    {activity.id === 'peekaboo' && <g className="bb8-peek-cloth">
      <path d="M412 209q66-13 132 0l-6 80q-60 15-120 0z" fill="#d6bea2" stroke="#f0dec2" strokeWidth="3"/>
      <path d="m438 241 4-8 4 8 9 2-7 7 2 9-8-4-8 4 2-9-7-7z" fill="#a7bfa9"/><path d="M489 236q14-12 22 1" fill="none" stroke="#b09272" strokeWidth="3"/>
    </g>}
    {activity.id === 'crayons' && <>
      <path d="m527 358 81-9 8 59-81 9z" fill="#f3e7c9" stroke="#c6b999" strokeWidth="2"/>
      <g stroke="#a78361" strokeWidth="3" fill="none"><circle cx="568" cy="379" r="14"/><circle cx="557" cy="367" r="6"/><circle cx="579" cy="365" r="6"/><path d="m563 380 1 0m10-1 1 0m-10 6q4 4 8-1"/></g>
      <g className="bb8-crayon"><path d="m524 343 25 34" stroke="#c98c78" strokeWidth="7"/><path d="m549 377 4 6" stroke="#9b665c" strokeWidth="3"/></g>
      <path d="m596 415 14 0m-10 8h17" stroke="#94b3a5" strokeWidth="6"/>
    </>}
    {activity.id === 'fireflies' && <>
      {[[358,249],[408,180],[551,213],[590,290],[342,358],[601,358]].map(([x,y],i) => <g className="bb8-firefly" key={i} style={{animationDelay:`-${i * 1.3}s`}}><circle cx={x} cy={y} r="10" fill="#e7d998" opacity=".1"/><circle cx={x} cy={y} r="4" fill="#f0dea0"/><path d={`m${x-5} ${y-4}-4-3m14 3 4-3`} stroke="#d4dbc0" strokeWidth="2"/></g>)}
    </>}
    {activity.id === 'hiccups' && <>
      <text className="bb8-hic-bubble" x="550" y="243" fill="#ecd6a8" fontFamily="system-ui" fontSize="21">hic!</text><path className="bb8-hic-bubble" d="m401 307-12-5m167 10 12-5" stroke="#ebce99" strokeWidth="3"/>
    </>}
    {activity.id === 'tucking' && <>
      <path className="bb8-tuck-fold" d="M528 339q35-13 69 0v53q-35-9-69 0z" fill="#91b0a1" stroke="#cfddc8" strokeWidth="3"/><path className="bb8-play-float" d="M565 316q-24-17-14-24q8-5 14 5q6-10 14-5q10 7-14 24" fill="#dfb38e"/>
    </>}
    {activity.id === 'lightsaber' && <>
      <path className="bb8-saber-trail" d="M547 224q65 15 77 78" fill="none" stroke="#b9e5d5" strokeWidth="4" strokeDasharray="4 10" opacity=".4"/>
      <g className="bb8-training-saber">
        <path d="m525 329 38-98" stroke="#8bd7bc" strokeOpacity=".2" strokeWidth="22"/>
        <path d="m525 329 38-98" stroke="#97e3c5" strokeWidth="9"/><path d="m525 329 38-98" stroke="#ecfff0" strokeWidth="3"/>
        <path d="m519 344 9-23" stroke="#7c8c87" strokeWidth="12"/><path d="m520 337 7 3m-5-10 7 3" stroke="#d9ddca" strokeWidth="3"/>
      </g>
      <g className="bb8-training-orb"><circle cx="621" cy="280" r="15" fill="#c8cbbb" stroke="#8e9e94" strokeWidth="3"/><path d="M608 280h26m-13-13v26" stroke="#a2b3a5" strokeWidth="2"/><circle cx="615" cy="275" r="3" fill="#dfb484"/></g>
    </>}
    {activity.id === 'soldiering' && <>
      <path d="M431 208q5-45 47-45t47 45z" fill="#9dab8f" stroke="#6e826e" strokeWidth="3"/><path d="M426 208h104" stroke="#c2ccb1" strokeWidth="6"/>
      <path d="m477 177 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill="#e4cf93"/>
      <g className="bb8-salute"><path d="m536 299 21-33-29-32" fill="none" stroke="#929f92" strokeWidth="9"/><rect x="516" y="226" width="23" height="10" rx="4" fill="#bfcbbb"/></g>
      <path d="M594 417v-91m0 0h42l-8 14 8 14h-42" fill="#bdcea9" stroke="#819875" strokeWidth="3"/><path d="M606 340q-10-8-5-12q4-3 5 2q3-5 6-2q6 4-6 12" fill="#f4e7c8"/>
    </>}
    {activity.id === 'lego' && <>
      <ellipse cx="585" cy="416" rx="62" ry="7" fill="#718c7e" opacity=".3"/>
      {[[546,396,72,17,'#a0b6ca'],[562,375,40,21,'#d19a77'],[575,354,26,21,'#b2c59e'],[534,402,15,14,'#d8c38a'],[615,402,15,14,'#d8c38a']].map(([x,y,width,height,color],i) => <g key={i}><rect x={x} y={y} width={width} height={height} rx="3" fill={color as string} stroke="#ede4ca" strokeWidth="2"/>{[0,1].map(stud => <rect key={stud} x={Number(x)+4+stud*(Number(width)-12)} y={Number(y)-4} width="7" height="5" rx="2" fill={color as string} stroke="#ede4ca" strokeWidth="1"/>)}</g>)}
      <g className="bb8-lego-brick"><rect x="527" y="330" width="31" height="18" rx="3" fill="#c193ac" stroke="#efdfd3" strokeWidth="2"/><path d="M533 330v-4h6v4m8 0v-4h6v4" fill="#c193ac" stroke="#efdfd3" strokeWidth="2"/></g>
    </>}
  </g>;
}
