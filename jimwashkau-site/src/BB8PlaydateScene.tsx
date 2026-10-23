import { WorldActivityProps } from './BB8WorldActivities';
import type { NurseryWorld } from './BB8NurseryWorld';
import { LittleGift, TinyCelebration } from './BB8CompanionMoments';
import { DroidAvatar } from './DroidAvatar';
import type { DroidId } from './DroidProfiles';
import { handshakeFor, otherDroid, type HandshakePartner } from './BB8PlaydateRules';
import './BB8Playdates.css';

export function HandshakeSignal({ resident, partner }: { resident: DroidId; partner: HandshakePartner }) {
  const profile = handshakeFor(resident, partner);
  return <g className="bb8-handshake-signal" aria-label={profile.name}>
    <g className="bb8-handshake-heart"><path d="M480 292q-21-17-13-23 8-5 13 5 5-10 13-5 8 6-13 23" fill="#d7a18a"/></g>
  </g>;
}
export function DroidPlaydateScene({ resident, moment, world = {nickname:'',projectStage:0,keepsakes:[]}, visiting = [] }: { resident: DroidId; moment?: string; world?: NurseryWorld; visiting?: string[] }) {
  const handshake = moment === 'secret-handshake';
  const napping = moment === 'playdate-nap';
  return <g className={`bb8-shared-playdate bb8-pair-${moment || 'quiet'}`} aria-label="BB-8 and BB-9E together in the play crib">
    <ellipse cx="355" cy="427" rx="83" ry="15" fill="#748478" opacity=".25"/><ellipse cx="605" cy="427" rx="83" ry="15" fill="#748478" opacity=".25"/>
    <g transform="translate(1 120) scale(.74)"><g className="bb8-playmate bb8-playmate-bb8"><DroidAvatar resident="bb8" activity={napping ? 'sleeping' : 'up'}/></g></g>
    <g transform="translate(251 120) scale(.74)"><g className="bb8-playmate bb8-playmate-bb9e"><DroidAvatar resident="bb9e" activity={napping ? 'sleeping' : 'up'}/></g></g>
    {moment === 'playdate-building' && <g stroke="#eee0bd" strokeWidth="2">
      {[0,1,2].map(i=><rect key={i} x={453+(i%2)*4} y={397-i*26} width="48" height="25" rx="4" fill={['#a5bea4','#cda17c','#a2bdc4'][i]}/>)}
      <g className="bb8-pair-eager-block"><rect x="410" y="345" width="25" height="25" rx="4" fill="#d9bc83"/></g>
      <g className="bb8-pair-careful-block"><rect x="526" y="365" width="25" height="25" rx="4" fill="#c59991"/></g>
      <path className="bb8-pair-support" d="m537 363-36 22m-76-22 30 22" fill="none" stroke="#a7b5a1" strokeWidth="7"/>
    </g>}
    {moment === 'playdate-turns' && <>
      <path d="M420 409h123" fill="none" stroke="#bcc9ae" strokeWidth="3" strokeDasharray="3 5"/>
      <g className="bb8-pair-shared-toy"><path d="m461 370 19-14 19 14-19 12z" fill="#d8b077"/><rect x="462" y="370" width="36" height="17" rx="5" fill="#9ebbb8"/><circle cx="469" cy="389" r="5" fill="#536d60"/><circle cx="492" cy="389" r="5" fill="#536d60"/></g>
    </>}
    {(moment === 'playdate-reading' || !moment) && <>
      <path d="M409 350q34-15 71 4 37-19 71-4v65q-35-11-71 6-36-17-71-6z" fill="#eee0bf" stroke="#ad8d66" strokeWidth="4"/><path d="M480 354v66" stroke="#bca57e" strokeWidth="2"/>
      <circle cx="443" cy="375" r="13" fill="#d9b079"/><path d="m515 360 5 10 11 2-8 8 1 11-9-5-10 5 2-11-8-8 11-2z" fill="#9ab49d"/>
      <path className="bb8-pair-book-page" d="M480 354q37-19 71-4v65q-35-11-71 6z" fill="#faf0d7" opacity=".55"/>
    </>}
    {moment === 'playdate-encouragement' && <g aria-label="A dropped block, a patient nudge, and another try">
      <rect x="450" y="390" width="56" height="28" rx="5" fill="#9ebba4" stroke="#eddfbd" strokeWidth="2"/>
      <g className="bb8-encouragement-block"><rect x="457" y="341" width="29" height="29" rx="5" fill="#d1aa7c" stroke="#f1dfb7" strokeWidth="2"/></g>
      <path className="bb8-encouraging-nudge" d="m566 380-42 23-24 0" fill="none" stroke="#a6b9a6" strokeWidth="8" strokeLinecap="round"/>
    </g>}
    {moment?.startsWith('gift-') && <LittleGift kind={moment} x={480} y={344} nickname={world.nickname}/>}
    {moment === 'tiny-celebration' && <TinyCelebration resident={resident} shared/>}
    {(napping || moment === 'playdate-quiet' || moment === 'with-you-rain') && <g aria-label="A soft blanket shared by both droids">
      <path d="M266 387q105-29 212 0t216 0v51q-107 16-216 0t-212 0z" fill="#97b4a2" stroke="#d4ddc0" strokeWidth="3"/>
      <path d="M290 406q90-18 188 0t190 0m-321 12h12m-6-6v12m247-6h12m-6-6v12" fill="none" stroke="#d4dfc6" strokeWidth="3"/>
      {napping && <g fill="#eee4c7" fontSize="19"><text x="399" y="284">z</text><text x="553" y="279">z</text></g>}
    </g>}
    {moment && <WorldActivityProps id={moment} world={world} shared visiting={visiting}/>}
    {handshake && <HandshakeSignal resident={resident} partner={otherDroid(resident)}/>}
  </g>;
}
export function DroidPlaydateControls({ resident, present, automatic, sleeping, surprise, onInvite, onAutomatic, onMoment }: { resident: DroidId; present: boolean; automatic: boolean; sleeping: boolean; surprise: boolean; onInvite: () => void; onAutomatic: () => void; onMoment: (id: string) => void }) {
  const guest = otherDroid(resident) === 'bb8' ? 'BB-8' : 'BB-9E';
  return <section className="bb8-playdate-section" aria-label="Little droid playdates"><div><p className="bb8-eyebrow">TWO LITTLE HEARTS</p><h2>A friend in the play crib</h2><p>BB-8 tries eagerly. BB-9E looks thoughtfully. Both help, both learn, both belong.</p></div>
    <div className="bb8-playdate-buttons"><button onClick={onInvite} disabled={sleeping && !present} aria-pressed={present}>{present ? `Say goodbye to ${guest}` : `Invite ${guest} over`}</button><button onClick={onAutomatic} aria-pressed={automatic}>Droid surprise playdates {automatic ? 'on' : 'off'}</button></div>
    <p role="status">{sleeping && present ? 'A little group recharge. Their visiting Mars friends settle too; the other droid goes home when this nap finishes.' : sleeping ? 'Recharge time. Invite a friend when he wakes.' : present ? `${guest} is here in the same play crib.${surprise ? ' A short surprise visit, then home for a peaceful break.' : ' Your invited friend stays until goodbye or nap time.'}` : 'They visit now and then, with quiet time between playdates. You can invite a friend yourself, too.'}</p>
    {present && <div className="bb8-playdate-buttons" aria-label="Shared playdate activities">{[['playdate-building','Build together'],['playdate-turns','Take turns'],['playdate-reading','Read together'],['secret-handshake','Their secret handshake'],['playdate-encouragement','Encourage each other'],['gift-flower','Offer a little flower'],['tiny-celebration','Celebrate a little win'],['playdate-quiet','Quiet rain time'],['playdate-nap','Nap together'],['playdate-project','Build their spaceship'],['playdate-puzzle','Solve a puzzle'],['playdate-talent','Tiny talent show'],['playdate-compromise','Practice taking turns'],['playdate-picnic','Space picnic'],['bedtime-ritual','Begin bedtime']].map(([id,label])=><button key={id} disabled={sleeping} onClick={()=>onMoment(id)}>{label}</button>)}</div>}
  </section>;
}
