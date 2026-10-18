import { useState } from 'react';
import { ArrowLeft, Heart, Moon, Sparkles, Sun } from 'lucide-react';
import './BB9EPreview.css';
import { BB9EDefs, BB9EBody, BB9EHead } from './BB9EModel';

type Pose = 'shy' | 'hello' | 'sleepy' | 'proud';
const poses: { id: Pose; label: string; title: string; note: string }[] = [
  { id: 'shy', label: 'A little shy', title: 'Small droid. Kind heart.', note: 'He may look a little serious, but he means well. Just a shy little droid doing his best.' },
  { id: 'hello', label: 'Say hello', title: 'Oh. You meant me?', note: 'One tiny head tilt, then a happy little wobble. He knows he’s welcome here, and he’s happy you came.' },
  { id: 'sleepy', label: 'Getting sleepy', title: 'Loved little droids need naps, too.', note: 'His red lens grows soft. Tucked in, safe, and loved. One more cuddle before recharge.' },
  { id: 'proud', label: 'Feeling proud', title: 'Everything in its little place.', note: 'Lined up all his star blocks to help tidy the nursery. His little heart is in the right place.' },
];

function LittleBB9E({ pose }: { pose: Pose }) {
  return <g className={`nine-droid nine-${pose}`}>
    <g className="nine-ball"><BB9EBody/></g>
    <g className="nine-head"><BB9EHead sleeping={pose === 'sleepy'} hello={pose === 'hello'}/></g>
  </g>;
}

export default function BB9EPreview() {
  const [pose, setPose] = useState<Pose>('shy');
  const [dark, setDark] = useState(true);
  const selected = poses.find(item => item.id === pose)!;
  return <main className={`nine-preview${dark ? ' nine-dark' : ''}`}>
    <header className="nine-header"><a href="/bb8"><ArrowLeft size={16}/> Back to BB-8</a><span>little droid<span className="nine-dot">.</span></span><button aria-label="Dark preview theme" aria-pressed={dark} onClick={() => setDark(value => !value)}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button></header>
    <section className="nine-intro"><p className="nine-eyebrow">A NEW LITTLE PERSONALITY</p><h1>Meet little <em>BB-9E.</em></h1><p>A gentle little heart. Already very loved.</p></section>
    <section className="nine-layout" aria-label="BB-9E model preview">
      <div className="nine-stage">
        <div className="nine-stage-label"><span/> CHARACTER PREVIEW <span className="nine-stage-id">DROID 02</span></div>
        <svg viewBox="0 0 640 490" role="img" aria-label={`Cute illustrated baby BB-9E, ${selected.label.toLowerCase()}, with a charcoal body, silver panels and a soft red lens`}>
          <defs>
            <BB9EDefs/>
            <radialGradient id="nine-lamp"><stop stopColor="#e8d09d" stopOpacity=".3"/><stop offset="1" stopColor="#e8d09d" stopOpacity="0"/></radialGradient>
          </defs>
          <path d="M0 381h640M72 0v381m498-381v381" fill="none" stroke="#aebaa3" strokeOpacity=".09"/>
          <rect x="453" y="80" width="139" height="160" rx="63" fill="#283f37" stroke="#7e9281" strokeWidth="6"/>
          <rect x="460" y="87" width="125" height="146" rx="57" fill="#1e302c"/>
          <circle cx="540" cy="132" r="21" fill="#c4c5a8"/><circle cx="548" cy="124" r="19" fill="#1e302c"/>
          {[[483,120],[493,193],[559,180],[527,210],[573,111]].map(([x,y])=><circle key={x} cx={x} cy={y} r="1.5" fill="#bdc9b0" opacity=".65"/>)}
          <path d="M151 30v48m-39 16q39-33 78 0M115 93v35m74-35v57" fill="none" stroke="#a9b39a" strokeWidth="2"/><path className="nine-hanging-star" d="m115 125 5 10 11 2-8 8 1 12-9-6-10 6 2-12-9-8 12-2z" fill="#c4b68c"/><circle cx="189" cy="161" r="14" fill="#859e8c"/>
          <circle cx="89" cy="310" r="93" fill="url(#nine-lamp)"/>
          <path d="M88 312v65m-22 0h44m-47-66q25-45 50 0z" fill="#c5b48c" stroke="#a9a184" strokeWidth="3"/>
          <ellipse cx="323" cy="421" rx="199" ry="37" fill="#bac2ac"/><path d="M124 421v13q199 73 398 0v-13q-199 72-398 0" fill="#839a88"/>
          <ellipse cx="320" cy="423" rx="94" ry="15" fill="#2b4234" opacity=".24"/>
          <LittleBB9E pose={pose}/>
          <g transform="translate(159 387)"><ellipse cy="17" rx="24" ry="8" fill="#344d3d" opacity=".2"/><circle cy="-5" r="18" fill="#a3b39b"/><circle cx="-12" cy="-24" r="8" fill="#b6c2a9"/><circle cx="12" cy="-24" r="8" fill="#b6c2a9"/><circle cy="-17" r="17" fill="#b6c2a9"/><circle cx="-6" cy="-19" r="2" fill="#465a47"/><circle cx="6" cy="-19" r="2" fill="#465a47"/><ellipse cy="-12" rx="3" ry="2" fill="#70816a"/><ellipse cy="0" rx="10" ry="11" fill="#cbd1b9"/><path d="m0-6 2 4 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1z" fill="#829679"/></g>
          {pose === 'sleepy' && <g className="nine-snooze" fill="#d1cfaf" fontFamily="system-ui"><text x="395" y="208" fontSize="20">z</text><text x="418" y="182" fontSize="26">z</text></g>}
          {pose === 'proud' && <g>{[0,1,2].map(i=><g key={i}><rect x={442+i*29} y="391" width="25" height="27" rx="4" fill={['#c5b18a','#a6b99a','#93aaa2'][i]} stroke="#d2d6be" strokeWidth="2"/><text x={454+i*29} y="411" textAnchor="middle" fontSize="17" fill="#f2ead2">★</text></g>)}</g>}
        </svg>
        <div className="nine-caption"><Heart size={14}/> Safe. Welcome. Very loved.</div>
      </div>
      <aside className="nine-personality"><div className="nine-status-icon">{pose === 'sleepy' ? <Moon size={24}/> : <Heart size={24}/>}</div><p className="nine-eyebrow">GETTING TO KNOW HIM</p><h2>{selected.title}</h2><p>{selected.note}</p><div className="nine-tags"><span>Means well</span><span>Very loved</span></div><hr/><p className="nine-choice-label">Try a little moment</p><div className="nine-poses">{poses.map(item=><button key={item.id} aria-pressed={pose === item.id} onClick={() => setPose(item.id)}>{item.label}</button>)}</div><p className="nine-preview-note"><Sparkles size={14}/> Model preview · a little personality in progress</p></aside>
    </section>
    <div className="nine-enter"><a href="/bb8?droid=bb9e">Visit BB-9E’s nursery <Heart size={15}/></a></div><footer className="nine-footer"><span>He belongs in this cozy little galaxy, right alongside BB-8.</span><span>Independent fan-made character study.</span></footer>
  </main>;
}
