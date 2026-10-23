import { LearningActivityProps } from './BB8LearningActivities';
import { CardboardShip, KeepsakeArt } from './BB8WorldPanel';
import { keepsakeNames, type NurseryWorld } from './BB8NurseryWorld';

export function WorldActivityProps({ id, world, shared = false, visiting = [] }: { id: string; world: NurseryWorld; shared?: boolean; visiting?: string[] }) {
  const latest = world.keepsakes.at(-1);
  if(id==='with-you-breath' || id==='with-you-tune') return <g className="bb8-world-props" transform={shared?'translate(-120 0)':undefined}><LearningActivityProps id={id==='with-you-breath'?'gentle-breaths':'music-lesson'}/></g>;
  return <g className="bb8-world-props" transform={`translate(${shared?480:580} 355)`}>
    {id==='playdate-project' && <g aria-label={`Building spaceship step ${Math.min(3,world.projectStage+1)} of 3`}>
      <g transform="translate(0 28) scale(1.6)"><CardboardShip stage={world.projectStage}/><g className="bb8-project-next"><CardboardShip stage={Math.min(3,world.projectStage+1)}/></g></g>
      <path className="bb8-project-tool" d="m-68 15 18 18m-15-22 7-6 13 13-7 6z" fill="#a7bca5" stroke="#e9dabb" strokeWidth="3"/>
    </g>}
    {id==='memory-shelf' && latest && <g aria-label={`Remembering ${keepsakeNames[latest.id]}`}><g className="bb8-keepsake-remember" transform="scale(1.7)"><KeepsakeArt id={latest.id}/></g></g>}
    {id==='playdate-puzzle' && <g aria-label="Finding and fitting a puzzle together">
      <rect x="-38" y="-19" width="76" height="76" rx="6" fill="#ddd7bb" stroke="#e8dfbf" strokeWidth="3"/>
      {[[-34,-15,'#d6a183'],[2,-15,'#9fbba5'],[-34,21,'#a5bfc5'],[2,21,'#d9bf80']].map(([x,y,color],i)=><g key={i} className={`bb8-puzzle-piece bb8-puzzle-piece-${i}`}><rect x={x} y={y} width="32" height="32" rx="5" fill={color as string} stroke="#f4e8ca" strokeWidth="2"/><path d={`M${Number(x)+10} ${Number(y)+15}h12m-6-6v12`} stroke="#f3e7c8" strokeWidth="2"/></g>)}
    </g>}
    {id==='playdate-talent' && <g aria-label="A tiny talent show with applause for everyone">
      <path d="M-78 49h156v17H-78z" fill="#b09675"/><path d="M-75-40h150v8H-75z" fill="#b49977"/><path d="M-73-33v80l24-14V-33m122 0v80L49 33V-33" fill="#b38f86"/>
      <g className="bb8-talent-act bb8-talent-act-0"><path d="M2-12q22-5 18 13-12 12-2 19 3 18-15 20-18-3-13-18 8-9-2-20-7-13 14-14" fill="#bd8e63" stroke="#e7cda2" strokeWidth="2"/><path d="m7 9 14-40" stroke="#90704f" strokeWidth="5"/><path className="bb8-talent-bow" d="m-24-3 53 32" stroke="#ebd5ad" strokeWidth="3"/></g>
      {[['BB-9E’s proud little wobble','♡'],[visiting.includes('percy')?'Percy’s camera nod':'BB-8’s peek-a-boop','◉'],[visiting.includes('oppy')?'Oppy’s sunny wheel wiggle':'BB-9E’s little star trick','✦'],[visiting.includes('ginny')?'Ginny’s gentle hover':'A happy wobble together','∞']].map(([label,symbol],i)=><g key={label} className={`bb8-talent-act bb8-talent-act-${i+1}`}><text x="0" y="18" textAnchor="middle" fill="#debc88" fontSize="35">{symbol}</text></g>)}
      <text className="bb8-talent-applause" x="0" y="-65" textAnchor="middle" fill="#edcf90" fontSize="18">✦ ♡ ✦</text>
    </g>}
    {id==='playdate-compromise' && <g aria-label="Two friends pause and decide to take turns">
      <g className="bb8-compromise-toy"><rect x="-20" y="-3" width="40" height="24" rx="7" fill="#a2bdb8"/><circle cx="-12" cy="24" r="5" fill="#5e7866"/><circle cx="12" cy="24" r="5" fill="#5e7866"/></g>
      <path className="bb8-compromise-reach" d="m-75-1 40 14m110-14-40 14" stroke="#a8b9a3" strokeWidth="7" strokeLinecap="round"/>
    </g>}
    {id==='playdate-picnic' && <g aria-label="A space picnic with six pretend star snacks">
      <path d="M-92 15h184l12 48H-104z" fill="#b7bfa2" stroke="#e2d5af" strokeWidth="3"/><path d="M-90 30h180m-188 17h196m-139-30-4 44m38-44v44m35-44 4 44" stroke="#d8dcc0" strokeWidth="3"/>
      {[-45,45].map(x=><g key={x}><ellipse cx={x} cy="33" rx="29" ry="17" fill="#eee1be"/>{[-10,0,10].map((dx,i)=><path key={dx} transform={`translate(${x+dx} ${27+(i%2)*13}) scale(.55)`} d="m0-8 3 5 6 1-5 4 2 6-6-3-6 3 2-6-5-4 6-1z" fill="#d0a36e"/>)}</g>)}
      {visiting.includes('ginny') && <path className="bb8-picnic-napkin" d="m-10-8 22 0-11 20z" fill="#f4e9d0" stroke="#bdcbb4" strokeWidth="2"/>}
    </g>}
    {id==='bedtime-ritual' && <g aria-label="Tidy toys, one story, then goodnight">
      <rect x="-54" y="28" width="45" height="28" rx="5" fill="#9db6a5" stroke="#dfd8b8" strokeWidth="3"/>
      <rect className="bb8-bedtime-toy" x="-70" y="-12" width="19" height="19" rx="4" fill="#d4ad7b"/>
      <path d="M9 0q16-9 32 0 16-9 32 0v43q-16-7-32 1-16-8-32-1z" fill="#e9dcb9" stroke="#b59a76" strokeWidth="3"/><path d="M41 0v44" stroke="#b59a76" strokeWidth="2"/><text x="21" y="25" fill="#a2b49a" fontSize="18">★</text>
    </g>}
    {id==='with-you-rain' && <g><path d="M0 9q-33-25-19-35 12-6 19 8 7-14 19-8 14 10-19 35" fill="#d5a292"/></g>}
  </g>;
}
export function BuddyRitualScene({ partner, layer = 'front' }: {partner:string; layer?: 'front' | 'back'}) {
  return <g className="bb8-buddy-ritual" aria-label={`A familiar little ritual with ${partner}`}>
    {layer==='front' && partner==='percy' && <><ellipse className="bb8-percy-rock" cx="224" cy="527" rx="15" ry="11" fill="#b8b29b" stroke="#ddceb0" strokeWidth="2"/></>}
    {layer==='back' && partner==='oppy' && <ellipse cx="819" cy="611" rx="84" ry="14" fill="#d6bf85" stroke="#e6d7a9" strokeWidth="3"/>}
    {layer==='front' && partner==='ginny' && <g className="bb8-ginny-decoration"><path d="M540 123h118" stroke="#c5c8a9" strokeWidth="2"/>{[550,588,626].map(x=><path key={x} d={`m${x} 123 14 26 14-26z`} fill="#d6b68a" stroke="#eee0bd" strokeWidth="2"/>)}</g>}
  </g>;
}
