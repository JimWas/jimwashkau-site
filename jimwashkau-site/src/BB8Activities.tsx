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
  </g>;
}
