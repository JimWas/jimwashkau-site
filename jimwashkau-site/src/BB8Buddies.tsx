import percy from './assets/bb8-buddies/percy.png';
import oppy from './assets/bb8-buddies/oppy.png';
import ginny from './assets/bb8-buddies/ginny.png';
import type { BuddyId } from './BB8BuddyVisits';

const buddies = [
  { id: 'percy', name: 'Percy', mission: 'Perseverance rover', image: percy, note: 'A curious explorer with a big heart.', x: 28, y: 407, width: 224, height: 216 },
  { id: 'oppy', name: 'Oppy', mission: 'Opportunity rover', image: oppy, note: 'A sunny little friend, always ready to roll.', x: 710, y: 431, width: 224, height: 197 },
  { id: 'ginny', name: 'Ginny', mission: 'Ingenuity helicopter', image: ginny, note: 'Tiny wings. Enormous enthusiasm.', x: 634, y: 100, width: 220, height: 186 },
] as const;

export function NurseryBuddies({ visiting, sleeping, droidName = 'BB-8' }: { droidName?: string; visiting: string[]; sleeping: boolean }) {
  return <g className={`bb8-visitors ${sleeping ? 'is-quiet' : ''}`} aria-label={`${droidName}'s visiting Mars buddies`}>
    {buddies.filter(buddy => visiting.includes(buddy.id)).map(buddy => <g key={buddy.id}>
      {buddy.id !== 'ginny' && <ellipse cx={buddy.x + buddy.width / 2} cy={buddy.y + buddy.height - 7} rx="87" ry="10" fill="#172e28" opacity=".18"/>}
      <g className={`bb8-visitor bb8-visitor-${buddy.id}`}><image href={buddy.image} x={buddy.x} y={buddy.y} width={buddy.width} height={buddy.height} preserveAspectRatio="xMidYMax meet" aria-label={`${buddy.name}, the ${buddy.mission}`}/></g>
      {sleeping && <text x={buddy.x + buddy.width - 25} y={buddy.y + 25} fill="#e8e2c8" fontSize="17" fontFamily="system-ui">z</text>}
    </g>)}
  </g>;
}

export default function BuddyVisits({ visiting, sleeping, automatic, surprise, onAutomatic, onChange, droidName = 'BB-8' }: { droidName?: string; visiting: BuddyId[]; sleeping: boolean; automatic: boolean; surprise: boolean; onAutomatic: () => void; onChange: (ids: BuddyId[]) => void }) {
  return <section className="bb8-buddy-section" aria-labelledby="bb8-buddies-title">
    <div className="bb8-buddy-heading"><div><p className="bb8-eyebrow">LITTLE MARS BUDDIES</p><h2 id="bb8-buddies-title">A playdate across the galaxy</h2><p>A little friend stops by now and then. You can invite them, too.</p></div><div className="bb8-buddy-actions">{visiting.length < buddies.length && <button onClick={() => onChange(buddies.map(buddy => buddy.id))}>Invite the whole crew</button>}{visiting.length > 0 && <button onClick={() => onChange([])}>Say goodbye to the crew</button>}</div></div>
    <div className="bb8-surprise-controls"><button aria-pressed={automatic} onClick={onAutomatic}>Surprise visits <strong>{automatic ? 'on' : 'off'}</strong></button><span>{automatic ? 'One buddy at a time, with peaceful gaps. No surprise arrivals during naps.' : 'Manual invitations only. Invite whoever you like below.'}</span></div>
    <div className="bb8-buddy-cards">{buddies.map(buddy => {
      const invited = visiting.includes(buddy.id);
      return <button key={buddy.id} className={invited ? 'is-visiting' : ''} aria-label={`${invited ? 'Send home' : 'Invite'} ${buddy.name}`} aria-pressed={invited} onClick={() => onChange(invited ? visiting.filter(id => id !== buddy.id) as BuddyId[] : [...visiting, buddy.id] as BuddyId[])}>
        <img src={buddy.image} alt=""/><span><strong>{buddy.name}</strong><small>{buddy.mission}</small><span>{buddy.note}</span><em>{invited ? 'Visiting · tap to say goodbye' : 'Tap to invite'}</em></span>
      </button>;
    })}</div>
    <p className="bb8-buddy-note" role="status">{visiting.length ? sleeping ? `Quiet company: his buddies settle down while ${droidName} recharges.` : surprise ? 'A surprise visitor! They’ll stay a minute or two, then wave goodbye. You can send them home sooner.' : 'Your invited buddies stay until you send them home. Surprise visits wait while they’re here.' : automatic ? `Just ${droidName} for now. A buddy will drop by after some quiet time.` : `Just ${droidName} for now. His friends are a little invitation away.`}</p>
  </section>;
}
