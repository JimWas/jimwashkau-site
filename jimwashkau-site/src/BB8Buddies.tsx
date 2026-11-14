import { buddyNames, buddyProfiles, type BuddyId, type NewBuddyId } from './BB8BuddyCatalog';
import { SpaceBuddyArt, SpaceBuddyAvatar } from './BB8SpaceBuddyModels';
import percy from './assets/bb8-buddies/percy.png';
import oppy from './assets/bb8-buddies/oppy.png';
import ginny from './assets/bb8-buddies/ginny.png';


const legacyImages: Partial<Record<BuddyId,string>> = {percy,oppy,ginny};
const buddies = (Object.keys(buddyNames) as BuddyId[]).map(id=>({id,name:buddyNames[id],...buddyProfiles[id],image:legacyImages[id]}));

export function NurseryBuddies({ visiting, sleeping, moment, droidName = 'BB-8' }: { droidName?: string; visiting: string[]; sleeping: boolean; moment?:string }) {
  const guests=buddies.filter(buddy=>visiting.includes(buddy.id));
  const ground=guests.filter(buddy=>buddy.kind!=='helicopter');
  return <g className={`bb8-visitors ${sleeping ? 'is-quiet' : ''}`} aria-label={`${droidName}'s visiting space buddies`}>
    {guests.map(buddy=>{
      const airborne=buddy.kind==='helicopter';
      const width=airborne?220:Math.min(224,850/Math.max(1,ground.length));
      const height=airborne?186:buddy.id==='percy'?width*216/224:buddy.id==='oppy'?width*197/224:width*.9;
      const index=ground.findIndex(item=>item.id===buddy.id);
      const x=airborne?634:ground.length===1?(buddy.side==='left'?24:712):20+index*(920-width)/Math.max(1,ground.length-1);
      const y=airborne?100:628-height;
      return <g key={buddy.id}>
        {sleeping && (airborne || buddy.kind==='lander') && <g aria-label={`${buddy.name}’s landing cushion`}><ellipse cx={airborne?729:x+width/2} cy={airborne?419:624} rx={airborne?83:width*.4} ry="12" fill="#acc4b9" stroke="#d9e3cb" strokeWidth="2"/></g>}
        {!airborne && <ellipse cx={x+width/2} cy="624" rx={width*.38} ry="8" fill="#172e28" opacity=".18"/>}
        <g className={`bb8-visitor bb8-visitor-${buddy.id}${buddy.image?'':` bb8-visitor-new ${buddy.kind==='lander'?'is-lander':''}`}`}>
          {buddy.image ? <image href={buddy.image} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMax meet" aria-label={`${buddy.name}, the ${buddy.mission}`}/> : <svg className="space-buddy-model" x={x} y={y} width={width} height={height} viewBox="0 0 200 180" role="img" aria-label={`${buddy.name}, the ${buddy.mission}`}><SpaceBuddyArt id={buddy.id as NewBuddyId} sleeping={sleeping}/></svg>}
        </g>
        {moment==='sharing' && !buddy.image && <g transform={`translate(${x+width*.83} 610)`} aria-label={`A little pretend drink shared with ${buddy.name}`}><rect x="-9" y="-20" width="18" height="23" rx="5" fill="#a0bfae" stroke="#dedbb9" strokeWidth="2"/><path d="M-9-14q-9-3-8 6t8 3m18-9q9-3 8 6t-8 3M-3-20v-5h6v5" fill="none" stroke="#dedbb9" strokeWidth="2"/></g>}
        {sleeping && <text x={x+width-22} y={y+28} fill="#e8e2c8" fontSize="17" fontFamily="system-ui">z</text>}
      </g>;
    })}
  </g>;
}

export default function BuddyVisits({ visiting, sleeping, automatic, surprise, onAutomatic, onChange, onHandshake, onGreet, onRitual, droidName = 'BB-8' }: { onRitual?: (partner: BuddyId) => void; onGreet?: (partner: BuddyId) => void; onHandshake?: (partner: BuddyId) => void; droidName?: string; visiting: BuddyId[]; sleeping: boolean; automatic: boolean; surprise: boolean; onAutomatic: () => void; onChange: (ids: BuddyId[]) => void }) {
  return <section className="bb8-buddy-section" aria-labelledby="bb8-buddies-title">
    <div className="bb8-buddy-heading"><div><p className="bb8-eyebrow">LITTLE SPACE BUDDIES</p><h2 id="bb8-buddies-title">A playdate across the galaxy</h2><p>A little friend stops by now and then. You can invite them, too.</p></div><div className="bb8-buddy-actions">{visiting.length < buddies.length && <button onClick={() => onChange(buddies.map(buddy => buddy.id))}>Invite the whole crew</button>}{visiting.length > 0 && <button onClick={() => onChange([])}>Say goodbye to the crew</button>}</div></div>
    <div className="bb8-surprise-controls"><button aria-pressed={automatic} onClick={onAutomatic}>Surprise visits <strong>{automatic ? 'on' : 'off'}</strong></button><span>{automatic ? 'One buddy at a time, with peaceful gaps. No surprise arrivals during naps.' : 'Manual invitations only. Invite whoever you like below.'}</span></div>
    <div className="bb8-buddy-cards">{buddies.map(buddy => {
      const invited = visiting.includes(buddy.id);
      return <button key={buddy.id} className={invited ? 'is-visiting' : ''} aria-label={`${invited ? 'Send home' : 'Invite'} ${buddy.name}`} aria-pressed={invited} onClick={() => onChange(invited ? visiting.filter(id => id !== buddy.id) as BuddyId[] : [...visiting, buddy.id] as BuddyId[])}>
        <span className="space-buddy-avatar">{buddy.image ? <img src={buddy.image} alt=""/> : <SpaceBuddyAvatar id={buddy.id as NewBuddyId}/>}</span><span><strong>{buddy.name}</strong><small>{buddy.mission}</small><span>{buddy.note}</span><em>{invited ? 'Visiting · tap to say goodbye' : 'Tap to invite'}</em></span>
      </button>;
    })}</div>
    {!sleeping && (onHandshake || onRitual) && visiting.length > 0 && <div className="bb8-playdate-buttons">{buddies.filter(buddy => visiting.includes(buddy.id)).map(buddy => <span key={buddy.id}>{onGreet && <button onClick={() => onGreet(buddy.id)}>Greet {buddy.name}</button>} {onHandshake && <button onClick={() => onHandshake(buddy.id)}>Secret handshake with {buddy.name}</button>} {onRitual && <button onClick={() => onRitual(buddy.id)}>Little ritual with {buddy.name}</button>}</span>)}</div>}
    <p className="bb8-buddy-note" role="status">{visiting.length ? sleeping ? `Quiet company: his buddies settle down while ${droidName} recharges.` : surprise ? 'A surprise visitor! They’ll stay a minute or two, then wave goodbye. You can send them home sooner.' : 'Your invited buddies stay until you send them home. Surprise visits wait while they’re here.' : automatic ? `Just ${droidName} for now. A buddy will drop by after some quiet time.` : `Just ${droidName} for now. His friends are a little invitation away.`}</p>
  </section>;
}
