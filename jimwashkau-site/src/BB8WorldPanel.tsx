import { useState } from 'react';
import { keepsakeNames, projectStages, type KeepsakeId, type NurseryWorld } from './BB8NurseryWorld';
import './BB8World.css';

export function CardboardShip({ stage }: { stage: number }) {
  return <g>
    {stage===0 ? <><rect x="-24" y="-25" width="48" height="27" fill="#b99570"/><path d="m-24-25-9-12h21l12 12 12-12h21l-9 12" fill="#d1b28a"/></> : <path d="m-25-17 10-14h29l12 14-8 24h-36z" fill="#b99570" stroke="#e5d1a6" strokeWidth="2"/>}
    {stage>=2 && <><circle cx="-8" cy="-12" r="5" fill="#a1bdbe"/><circle cx="9" cy="-12" r="5" fill="#a1bdbe"/></>}
    {stage>=3 && <path d="M12-29v-20l14 5-14 8" fill="#a1b99d" stroke="#d5c79e" strokeWidth="2"/>}
  </g>;
}
export function KeepsakeArt({ id }: { id: KeepsakeId }) {
  return <g aria-label={keepsakeNames[id]}>
    {id==='drawing' && <><rect x="-18" y="-32" width="36" height="42" fill="#efe0bd" stroke="#bca27c" strokeWidth="2"/><path d="M0-2q-22-17-12-23 8-4 12 6 4-10 12-6 10 6-12 23" fill="#cf9587"/></>}
    {id==='flower' && <><path d="M0 10v-35m0 25-12-9" stroke="#96ae8a" strokeWidth="3"/>{[0,72,144,216,288].map(a=><ellipse key={a} transform={`translate(0 -26) rotate(${a})`} cy="-6" rx="5" ry="9" fill="#d6a795"/>)}<circle cy="-26" r="5" fill="#e4c786"/></>}
    {id==='rocket' && <path d="m-22-7 42-24-13 39-12-12-17-3z" fill="#e6e6cb" stroke="#9fb9ac" strokeWidth="2"/>}
    {id==='treasure' && <path d="m-12-15 12-7 12 7v14L0 6-12-1z" fill="#b5c6b6" stroke="#e8ddb9" strokeWidth="3"/>}
    {id==='ship' && <CardboardShip stage={3}/>}
  </g>;
}
export function MemoryShelf({ world }: { world: NurseryWorld }) {
  return <g aria-label="Their saved memory shelf"><path d="M92 276h174v9H92z" fill="#ae9978" stroke="#d5c4a1" strokeWidth="2"/><path d="m110 285 9 12m128-12-9 12" stroke="#9a886b" strokeWidth="4"/>
    {world.keepsakes.slice(-4).map((item,i)=><g key={item.id} transform={`translate(${113+i*43} 268) scale(.65)`}><KeepsakeArt id={item.id}/></g>)}
    {!world.keepsakes.length && <text x="179" y="268" fontSize="10" fill="#e1d3ae" textAnchor="middle">little memories to come ♡</text>}
  </g>;
}
export default function WorldPanel({ world, sleeping, hasFriend, onNickname, onMoment }: { world: NurseryWorld; sleeping:boolean; hasFriend:boolean; onNickname:(value:string)=>void; onMoment:(id:string)=>void }) {
  const [draft,setDraft] = useState(world.nickname);
  return <section className="bb8-world-panel" aria-label="Their little world"><div><p className="bb8-eyebrow">LITTLE THINGS THAT LAST</p><h2>Their little world</h2><p>A project to come back to. A shelf full of memories. No rush to finish.</p></div>
    <div className="bb8-world-grid"><article><h3>A cardboard spaceship</h3><svg viewBox="0 0 180 95" role="img" aria-label={projectStages[world.projectStage]}><g transform="translate(90 70) scale(1.8)"><CardboardShip stage={world.projectStage}/></g></svg><p>{projectStages[world.projectStage]}</p><progress value={world.projectStage} max="3" aria-label="Spaceship project progress"/><p>One completed step per playdate: hull, windows, then a wonderfully crooked flag.</p><button disabled={sleeping || !hasFriend} onClick={()=>onMoment('playdate-project')}>{world.projectStage===3?'Admire their spaceship':'Work on their spaceship'}</button>{!hasFriend && <small>Invite the other droid to build together.</small>}</article>
    <article><h3>The memory shelf</h3><div className="bb8-keepsake-list">{world.keepsakes.map(item=><figure key={item.id}><svg viewBox="-32 -52 64 70" role="img" aria-label={keepsakeNames[item.id]}><KeepsakeArt id={item.id}/></svg><figcaption>{keepsakeNames[item.id]}</figcaption></figure>)}</div>{!world.keepsakes.length && <p>Finish a drawing, paper flower, or spacecraft to leave a little keepsake here.</p>}<button disabled={sleeping || !world.keepsakes.length} onClick={()=>onMoment('memory-shelf')}>Remember a little craft</button><p>Crafts stay here between visits, shared by both droids on this browser.</p></article></div>
    <form onSubmit={event=>{event.preventDefault();onNickname(draft);}}><label htmlFor="nursery-nickname">Your nursery nickname</label><div><input id="nursery-nickname" value={draft} maxLength={24} onChange={event=>setDraft(event.target.value)} placeholder="Favorite human" autoComplete="off"/><button type="submit">Save nickname</button></div><p role="status">{world.nickname ? `Their little gifts and notes are for ${world.nickname} ♡` : 'Leave it blank and they’ll simply say “you.”'} Saved only in this browser.</p></form>
    <div className="bb8-spend-moment"><h3>Spend a moment together</h3><p>A short, quiet visit with your little companions.</p><div>{[['with-you-rain','Listen to rain'],['with-you-breath','Breathe with the flower'],['with-you-tune','Hear a little tune']].map(([id,label])=><button key={id} disabled={sleeping} onClick={()=>onMoment(id)}>{label}</button>)}</div>{sleeping && <small>They’re resting. These little moments will be here when they wake.</small>}</div>
  </section>;
}
