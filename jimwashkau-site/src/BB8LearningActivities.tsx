import type { LittleActivity } from './BB8LittleActivities';
import './BB8LearningActivities.css';

function Star({ x, y, color = '#f5d691' }: { x: number; y: number; color?: string }) {
  return <path transform={`translate(${x} ${y})`} d="m0-10 3 7 8 1-6 6 2 8-7-4-7 4 2-8-6-6 8-1z" fill={color}/>;
}
function LessonSteps({ lines }: { lines: [string, string, string] }) {
  return <g fontSize="13" textAnchor="middle" fill="#fff1ce" fontFamily="system-ui, sans-serif">
    <rect x="521" y="267" width="160" height="28" rx="10" fill="#344e47"/>
    {lines.map((line, i) => <text key={line} x="601" y="286" className={`bb8-lesson-step bb8-lesson-step-${i}`}>{line}</text>)}
  </g>;
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
      <LessonSteps lines={['1… 2… 3… 4… 5!', 'Did I count that one?', 'Let’s try again ♡']}/>
    </>}
    {id === 'color-sorting' && <>
      {['#d8887a','#e3c674','#8dbbc9'].map((color,i) => <g key={color}>
        <path d={`M${532+i*48} 385h42q-2 27-21 27t-21-27`} fill={color} stroke="#eee3c4" strokeWidth="2"/>
        <g className="bb8-sort-bolt" style={{animationDelay:`${i*1.2}s`}}><path d={`m${546+i*48} 324 9-5 9 5v10l-9 5-9-5z`} fill={color} stroke="#fff0ce" strokeWidth="2"/></g>
        <text x={553+i*48} y="380" textAnchor="middle" fontSize="10" fill="#344e47">{['RED','YELLOW','BLUE'][i]}</text>
      </g>)}
      <LessonSteps lines={['Find the same color', 'Red, yellow, blue!', 'A match! Happy beep ♡']}/>
    </>}
    {id === 'moon-garden' && <>
      <path d="M557 373h59l-8 40h-43z" fill="#c68e6c" stroke="#e3c9a2" strokeWidth="3"/>
      <g className="bb8-sprout-grow"><path d="M585 375v-53" stroke="#759c77" strokeWidth="5"/><path d="M584 349q-31-1-24-24 24 1 24 24m3-10q30-2 23-23-23 1-23 23" fill="#a7c690"/></g>
      <path d="M635 316v96m0-80h10m-10 20h7m-7 20h10m-10 20h7" stroke="#ead3a5" strokeWidth="3"/>
      <g className="bb8-stir"><path d="M520 327h27v24h-27z" fill="#93bcbc"/><path d="m546 335 19-10" stroke="#93bcbc" strokeWidth="7"/></g>
      <path className="bb8-play-float" d="m567 336-2 7m9-4-2 7" stroke="#b9e3df" strokeWidth="3"/>
      <LessonSteps lines={['Light + water + care', 'A little taller today!', 'You’re doing so well ♡']}/>
    </>}
    {id === 'constellations' && <>
      <rect x="535" y="155" width="132" height="100" rx="16" fill="#304954" stroke="#9db7b0" strokeWidth="3"/>
      <path className="bb8-constellation-line" d="m557 178 17 13 20-17 20 17 20-13-7 27-15 22h-31l-15-22z" fill="none" stroke="#c6ddd7" strokeWidth="2" strokeDasharray="210"/>
      {[[557,178],[574,191],[594,174],[614,191],[634,178],[627,205],[612,227],[581,227],[566,205]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#f9e1aa"/>)}
      <LessonSteps lines={['Connect the stars', 'My pretend teddy sky!', 'Patterns in the night']}/>
    </>}
    {id === 'magnet-lab' && <>
      <g className="bb8-magnet-test"><path d="M546 322v27a20 20 0 0 0 40 0v-27" fill="none" stroke="#cf8b80" strokeWidth="13"/><path d="M546 322v10m40-10v10" stroke="#c3d5d0" strokeWidth="13"/></g>
      <rect x="618" y="367" width="26" height="26" rx="4" fill="#be966b"/><text x="631" y="409" textAnchor="middle" fontSize="11" fill="#344e47">wood</text>
      <g className="bb8-iron-lift"><path d="m571 380 8-5 8 5v9l-8 5-8-5z" fill="#99aaa5" stroke="#edf0d9" strokeWidth="2"/></g>
      <path d="m508 306 8-5 8 5v9l-8 5-8-5z" fill="#b4c1b5" stroke="#f2e6ca" strokeWidth="2"/>
      <LessonSteps lines={['Wood? No stick.', 'Iron? It sticks!', 'Oh! A bolt on me too?']}/>
    </>}
    {id === 'spelling' && <>
      {Array.from('FRIEND').map((letter,i)=><g key={i} transform={`translate(${521+i*25} 351)`}><g className={i===3?'bb8-letter-correct':undefined}><rect x="-11" y="-15" width="23" height="30" rx="4" fill={i%2?'#d6b184':'#a5c0ad'} stroke="#f0e5c9" strokeWidth="2"/><text y="7" textAnchor="middle" fontSize="20" fill="#344e47">{letter}</text></g></g>)}
      <LessonSteps lines={['F · R · I · E · N · D', 'That E looks funny…', 'FRIEND! That’s you ♡']}/>
    </>}
    {id === 'music-lesson' && <>
      <rect x="533" y="346" width="127" height="57" rx="8" fill="#708c83" stroke="#c9d8c0" strokeWidth="3"/>
      {['C','E','G'].map((note,i)=><g key={note}><rect className="bb8-lesson-key" style={{animationDelay:`${i*.42}s`}} x={543+i*37} y="353" width="31" height="42" rx="3" fill="#f2e7cb"/><text x={558+i*37} y="382" textAnchor="middle" fill="#344e47" fontSize="16">{note}</text></g>)}
      <text className="bb8-play-float" x="569" y="327" fontSize="31" fill="#eed499">♫</text>
      <LessonSteps lines={['Listen: C · E · G', 'Now my turn…', 'I played it! Encore ♡']}/>
    </>}
    {id === 'weather-station' && <>
      <rect x="533" y="312" width="134" height="93" rx="10" fill="#e9dfc2" stroke="#9bb6a5" strokeWidth="4"/>
      <circle cx="558" cy="340" r="11" fill="#dca95f"/><path d="M548 364q-7-12 4-14 7-13 15-2 15-3 15 12z" fill="#a4bec3"/>
      <path className="bb8-play-float" d="m590 373-3 9m12-9-3 9m12-9-3 9" stroke="#729fae" strokeWidth="3"/>
      <path d="M637 330v44m-7-44v44a10 10 0 1 0 14 0v-44a7 7 0 0 0-14 0" fill="#d18d7f" stroke="#ab9d82" strokeWidth="2"/>
      <LessonSteps lines={['Pretend forecast time', 'Sunny, cloudy, rainy', 'Match the weather card']}/>
    </>}
    {id === 'rocket-lab' && <>
      <path d="M537 404h127" stroke="#b3baa5" strokeWidth="3" strokeDasharray="3 6"/>
      <g className="bb8-rocket-test"><path d="m538 347 65-30-19 53-16-20z" fill="#f5ead0" stroke="#99b4a8" strokeWidth="2"/><path d="m568 350 35-33-19 53" fill="#bdd0bc"/></g>
      <path d="m540 387 24-10m-24 2 24-10" stroke="#c1cbb2" strokeWidth="2"/>
      <LessonSteps lines={['Fold a little wing', 'Test flight… whoosh!', 'Adjust, then try again']}/>
    </>}
    {id === 'fossils' && <>
      <ellipse cx="589" cy="389" rx="62" ry="23" fill="#d7bd94" stroke="#e9d7b3" strokeWidth="3"/>
      <path d="M594 397c-35-4-28-36-6-33 23 3 17 28 1 24-13-3-6-15 1-10" fill="none" stroke="#a48d70" strokeWidth="5"/>
      <g className="bb8-fossil-brush"><path d="m544 341 25 28" stroke="#9c8060" strokeWidth="5"/><path d="m562 363 13 13" stroke="#edd8ab" strokeWidth="13"/></g>
      <circle cx="630" cy="332" r="24" fill="#c5e0d4" fillOpacity=".4" stroke="#879f96" strokeWidth="5"/><path d="m612 350-14 17" stroke="#879f96" strokeWidth="8"/>
      <LessonSteps lines={['Gently brush the sand', 'A spiral-shaped fossil!', 'Look closely, little one']}/>
    </>}
    {id === 'fair-shares' && <>
      {['PERCY','OPPY','GINNY'].map((name,i)=><g key={name}><ellipse cx={550+i*48} cy="380" rx="22" ry="25" fill={['#adbc9c','#d2b58c','#a7c6c0'][i]} stroke="#eae0c2" strokeWidth="2"/><text x={550+i*48} y="416" fontSize="9" textAnchor="middle" fill="#344e47">{name}</text><Star x={550+i*48} y={369} color="#f4d998"/><Star x={550+i*48} y={390} color="#f4d998"/></g>)}
      <LessonSteps lines={['6 toy treats, 3 friends', '2 for every friend', 'Equal shares! 2 + 2 + 2']}/>
    </>}
    {id === 'feelings' && <>
      {[0,1,2].map(i=><g key={i} transform={`translate(${550+i*48} 331)`}><rect x="-20" y="-22" width="40" height="49" rx="7" fill={['#e4c88d','#a9c5c4','#cbb4cb'][i]}/><path d={i===1?'m-11-4q4 5 8 0m6 0q4 5 8 0':'M-9-4h1m15 0h1'} stroke="#42584e" strokeWidth="3"/><path d={i===0?'M-9 7q9 12 18 0':i===1?'M-3 12h6':'M-8 15q8-10 16 0'} fill="none" stroke="#42584e" strokeWidth="2"/></g>)}
      <Teddy x={591} y={391}/><path className="bb8-play-float" d="M631 392q-17-13-11-19 6-4 11 4 5-8 11-4 6 6-11 19" fill="#d99b91"/>
      <LessonSteps lines={['Happy, sleepy, worried', 'All feelings are okay', 'A hug, if you’d like ♡']}/>
    </>}
    {id === 'recycling' && <>
      {['PAPER','METAL','PLASTIC'].map((name,i)=><g key={name}><rect x={531+i*48} y="361" width="43" height="49" rx="5" fill={['#91b9bd','#aab794','#d2b278'][i]} stroke="#e6ddc2" strokeWidth="2"/><path d={`M${530+i*48} 359h45`} stroke="#d4ddc3" strokeWidth="5"/><text x={553+i*48} y="389" textAnchor="middle" fontSize="9" fill="#263f37">{name}</text><g className="bb8-sort-bolt" style={{animationDelay:`${i*1.2}s`}}>{i===0?<path d="M544 314h18v23h-18z" fill="#f2e6c9"/>:i===1?<circle cx="601" cy="326" r="9" fill="#c2ccc1"/>:<path d="M645 316h9v6h5v17h-18v-17h4z" fill="#d5e2d3"/>}</g></g>)}
      <LessonSteps lines={['Clean toy materials', 'Sort into labeled bins', 'Check local rules ♡']}/>
    </>}
    {id === 'shadow-lab' && <>
      <rect x="590" y="310" width="80" height="101" rx="7" fill="#dfd9bd"/>
      <g transform="translate(627 370)"><path className="bb8-shadow-grow" d="M-9 20v-22l-6-12 13 6 11-6-3 12v22z" fill="#7d887b"/></g>
      <path d="M558 385h15l4-20-10-12-11 12z" fill="#d4b18a"/>
      <g className="bb8-lamp-slide"><path d="M516 403v-46m-9 46h18" stroke="#a2b7a4" strokeWidth="4"/><path d="m507 342-6 24h29l-8-24z" fill="#eed298"/></g>
      <LessonSteps lines={['Keep the toy still', 'Lamp closer → bigger', 'How did you get so tall?']}/>
    </>}
    {id === 'plush-school' && <>
      <rect x="535" y="158" width="137" height="98" rx="8" fill="#37574d" stroke="#c5b28b" strokeWidth="5"/>
      <circle cx="559" cy="195" r="12" fill="#8ab4c1"/><path d="m552 187 8 4-2 13 7-7" stroke="#b0c69b" strokeWidth="4"/>
      <circle cx="601" cy="195" r="10" fill="#cf9777"/>
      <circle cx="645" cy="195" r="11" fill="#d4bc87"/><ellipse cx="645" cy="195" rx="22" ry="5" fill="none" stroke="#e9d3a5" strokeWidth="3"/>
      {['EARTH','MARS','SATURN'].map((name,i)=><text key={name} x={559+i*43} y="236" textAnchor="middle" fontSize="9" fill="#f4e7c4">{name}</text>)}
      <Teddy x={552} y={385}/><Teddy x={620} y={385} tilted/>
      <LessonSteps lines={['Earth is our home', 'Mars is the red planet', 'Saturn has rings!']}/>
    </>}
  </g>;
}
