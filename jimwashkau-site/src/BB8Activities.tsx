import { CompanionMomentProps } from './BB8CompanionMoments';
import type { DroidId } from './DroidProfiles';
import { LearningActivityProps } from './BB8LearningActivities';
import type { LittleActivity } from './BB8LittleActivities';

// Props live inside the droid's SVG group so snapshots and night vision include them.
export function ActivityProps({ activity, resident = 'bb8' }: { activity: LittleActivity; resident?: DroidId }) {
  return <g className={`bb8-play-props bb8-play-${activity.id}`} aria-label={activity.label} strokeLinecap="round" strokeLinejoin="round">
    <CompanionMomentProps id={activity.id} resident={resident}/>
    <LearningActivityProps key={activity.id} id={activity.id}/>
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
    {activity.id === 'dream-projecting' && <>
      <path d="m476 235 155-116 57 137z" fill="#b7d6cc" opacity=".08"/>
      <g className="bb8-dream-stars" fill="#e5d8a9"><path d="m597 151 4-10 4 10 11 3-11 4-4 10-4-10-11-4zm49 45 4-10 4 10 11 3-11 4-4 10-4-10-11-4z"/><circle cx="631" cy="160" r="13" fill="#accbc6"/><ellipse cx="631" cy="160" rx="22" ry="5" fill="none" stroke="#e5d8a9" strokeWidth="2"/><circle cx="612" cy="210" r="3"/></g>
    </>}
    {activity.id === 'words' && <>
      <path d="M543 244q0-14 14-14h86q14 0 14 14v33q0 14-14 14h-66l-20 12 4-12h-4q-14 0-14-14z" fill="#e6dfc8" stroke="#a5b9a7" strokeWidth="2"/>
      {['mama?','hello!','snack!'].map((word,i)=><text className="bb8-beep-word" key={word} x="600" y="269" textAnchor="middle" fontFamily="system-ui" fontSize="18" fill="#5b7869" style={{animationDelay:`-${(3-i)*4}s`}}>{word}</text>)}
    </>}
    {activity.id === 'shadow' && <>
      <g className="bb8-mystery-shadow" fill="#344b40" opacity=".25"><ellipse cx="607" cy="411" rx="42" ry="17"/><ellipse cx="608" cy="388" rx="28" ry="24"/><ellipse cx="608" cy="363" rx="21" ry="11"/><path d="m600 356-4-18" stroke="#344b40" strokeWidth="3"/></g>
      <text className="bb8-play-float" x="563" y="288" fontFamily="system-ui" fontSize="30" fill="#ead3a6">?</text>
    </>}
    {activity.id === 'treasure' && <>
      <g className="bb8-show-treasure"><path d="m522 333 24-26 15 0" fill="none" stroke="#92a394" strokeWidth="8"/><path d="m556 289 16-8 16 8v19l-16 8-16-8z" fill="#d7bb7e" stroke="#f4e4b5" strokeWidth="3"/><circle cx="572" cy="299" r="7" fill="#9c9679"/><path d="m572 316-2 14m-5-9h11m-11 5h11" stroke="#ddc494" strokeWidth="4"/></g>
      <path className="bb8-play-float" d="m594 277 3-8 3 8 8 3-8 3-3 8-3-8-8-3z" fill="#f8e7b8"/>
    </>}
    {activity.id === 'waiting' && <>
      <rect x="775" y="305" width="77" height="144" rx="25" fill="#3a4e46" stroke="#91a08d" strokeWidth="5"/><path d="M788 439V332q0-16 25-16t25 16v107" fill="none" stroke="#718b7b" strokeWidth="2"/><circle cx="833" cy="385" r="4" fill="#d8c394"/>
      <path className="bb8-play-float" d="M582 270q-20-14-12-21q7-5 12 5q5-10 12-5q8 7-12 21" fill="#ddaf92"/>
    </>}
    {activity.id === 'magnets' && <>
      <g className="bb8-magnet"><path d="M502 306v21q0 25 26 25t26-25v-21" fill="none" stroke="#c98977" strokeWidth="13"/><path d="M502 306v11m52-11v11" stroke="#c4d9d1" strokeWidth="13"/></g>
      <path className="bb8-magnet-bolt" d="m570 322 14 1m-10-7-1 13" stroke="#c3c7b3" strokeWidth="5"/>
    </>}
    {activity.id === 'checkup' && <>
      <path d="M449 276v13q0 20 22 20t22-20v-13m-22 33v29q0 31 27 31t27-24" fill="none" stroke="#6a948d" strokeWidth="5"/><path d="M443 275h10m35 0h10" stroke="#dddcc4" strokeWidth="6"/><circle className="bb8-checkup-disc" cx="525" cy="344" r="12" fill="#d0d9c9" stroke="#8ba799" strokeWidth="4"/><circle cx="525" cy="344" r="5" fill="#8ba799"/>
    </>}
    {activity.id === 'costume' && <>
      <path d="m409 282-33 126 50-17 18 19 10-128m49 0 12 128 20-19 43 17-31-126" fill="#92aaa2" stroke="#b9cbb5" strokeWidth="3"/>
      <circle cx="478" cy="235" r="77" fill="#d7e9df" fillOpacity=".08" stroke="#d0dfce" strokeWidth="4"/><path d="M425 194q13-18 29-22" fill="none" stroke="#e6edda" strokeOpacity=".5" strokeWidth="5"/><path d="M425 293q53 20 106 0" fill="none" stroke="#b7c9b6" strokeWidth="9"/><path d="m478 302-12 10 12 7 12-7z" fill="#e5c18a"/>
    </>}
    {activity.id === 'fort' && <>
      <path d="M363 438 478 190 595 438z" fill="#a3b6a4" stroke="#d0dbc1" strokeWidth="4"/><path d="M439 438 478 309 520 438z" fill="#354f45"/><path d="m478 190 1 104m-99 131 36-13m126 0 35 13" fill="none" stroke="#d4dfc7" strokeWidth="3"/><circle className="bb8-fort-eye" cx="479" cy="393" r="12" fill="#86afb1"/><circle cx="479" cy="393" r="7" fill="#18362e"/><path d="m433 300 3-7 3 7 8 2-6 5 1 8-6-4-6 4 1-8-6-5z" fill="#e8d6a9"/>
    </>}
    {activity.id === 'kisses' && <g className="bb8-camera-kiss" fill="#e0a78e"><path d="M584 293q-47-33-29-47q16-10 29 11q13-21 29-11q18 14-29 47"/><path d="M625 237q-23-17-14-23q8-5 14 6q7-11 14-6q9 6-14 23" opacity=".6"/></g>}
    {activity.id === 'dozing' && <g className="bb8-sleepy-book"><path d="M425 337q26-10 53 3q27-13 54-3v57q-29-10-54 5q-25-15-53-5z" fill="#e4d7b8" stroke="#a88560" strokeWidth="4"/><path d="M478 340v56m-40-37h26m27-5h28m-80 16h24m30-5h24" stroke="#b1a589" strokeWidth="2"/><text x="565" y="245" fill="#e9dfc1" fontSize="24" className="bb8-play-float">z</text></g>}
    {activity.id === 'charged' && <>
      <g className="bb8-full-charge"><rect x="552" y="285" width="59" height="34" rx="6" fill="#d6e4ca" stroke="#9ab58e" strokeWidth="3"/><path d="M611 295h6v14h-6" fill="#9ab58e"/><path d="m586 288-12 17h11l-5 11 17-18h-12z" fill="#6f9762"/><text x="581" y="340" textAnchor="middle" fontFamily="system-ui" fill="#e7ddbc" fontSize="17">100%</text></g>
      <g className="bb8-play-float" fill="#e5c18a"><path d="m397 273 3-7 3 7 7 3-7 3-3 7-3-7-7-3zm156-51 3-7 3 7 7 3-7 3-3 7-3-7-7-3z"/></g>
    </>}
    {activity.id === 'waking' && <text x="540" y="246" fill="#e8d6af" fontSize="27" className="bb8-play-float">?</text>}
    {activity.id === 'tiny-dreams' && <g className="bb8-dream-heart" fill="#d5b89b"><path d="M578 271q-28-21-17-31q10-6 17 8q8-14 18-8q11 10-18 31"/><text x="603" y="222" fontSize="23">♫</text></g>}
    {activity.id === 'rain' && <path d="m515 249 12 3m0-4v8" stroke="#e2d5ad" strokeWidth="3"/>}
    {activity.id === 'oops' && <g className="bb8-oops-tower">{[0,1,2,3].map((i)=><g key={i} className={`bb8-falling-block bb8-falling-block-${i}`}><rect x="573" y={384-i*29} width="29" height="28" rx="4" fill={['#c48c71','#96b9ae','#d7bf84','#b5c3a1'][i]} stroke="#f0e5c9" strokeWidth="2"/><text x="587" y={404-i*29} textAnchor="middle" fill="#f5e9ca" fontSize="18">★</text></g>)}</g>}
    {activity.id === 'goodbye' && <><rect x="772" y="300" width="80" height="148" rx="25" fill="#344b45" stroke="#a4b09b" strokeWidth="4"/><path d="m789 321 42 3v112l-42 0z" fill="#52675b"/><text x="670" y="315" fill="#e7cd9e" fontSize="23" className="bb8-play-float">bye ♡</text></>}
    {activity.id === 'sharing' && <path d="m521 327 57 15" stroke="#9baea0" strokeWidth="9"/>}
    {activity.id === 'camera' && <g className="bb8-camera-question"><text x="536" y="240" fill="#ead9ad" fontSize="24">?</text></g>}
    {activity.id === 'negotiating' && <><g className="bb8-extra-books">{[0,1,2].map(i=><g key={i} style={{animationDelay:`${i*5}s`}}><rect x="543" y={402-i*14} width="68" height="13" rx="3" fill={['#9fb7a6','#d1a27c','#adc0ca'][i]} stroke="#e7d9b9" strokeWidth="2"/><path d={`M551 ${408-i*14}h50`} stroke="#ede4cb" strokeWidth="3"/></g>)}</g><path d="M426 333q27-13 52 2q26-15 52-2v57q-28-9-52 5q-25-14-52-5z" fill="#e4d8bc" stroke="#a98665" strokeWidth="4"/><path d="M478 335v59" stroke="#bca584" strokeWidth="2"/><text x="553" y="277" fill="#eadbb8" fontSize="18">one more?</text></>}
    {activity.id === 'comfort' && <g className="bb8-quilt-smooth"><path d="M388 385q45-15 90 0t90 0v41q-45 16-90 0t-90 0z" fill="#94b3a3" stroke="#d0dac0" strokeWidth="3"/><path d="M407 400h30m-15-5v10m85 5h30m-15-5v10" stroke="#dce4c9" strokeWidth="3"/><path d="m445 361-21 28m90-28 20 28" stroke="#a7b4a3" strokeWidth="7"/></g>}
    {activity.id === 'welcome' && <g className="bb8-play-float" fill="#e2b298"><path d="M565 282q-32-23-20-33q11-7 20 8q9-15 20-8q12 10-20 33"/><text x="547" y="312" fontSize="17">you! ♡</text></g>}
  </g>;
}
