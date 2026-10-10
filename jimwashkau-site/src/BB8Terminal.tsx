import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Heart, Terminal } from 'lucide-react';

type TerminalLine = { id: number; kind: 'system' | 'droid' | 'command'; text: string };
type Props = {
  event?: { time: number; text: string };
  status: string;
  lullaby: boolean;
  night: boolean;
  onHello: () => Promise<void>;
  onLullaby: () => Promise<void>;
  onNight: () => void;
};
const dreams = [
  'Dreaming of a moon made of spare parts and marshmallows. ☾',
  'In my dream, every star is a tiny night-light. ✦',
  'Rolling through a field of flowers. Not a stormtrooper in sight.',
  'A little spaceship. A big blanket. You in the passenger seat. <3',
];
const cuddles = [
  'Hug received. Happy circuits overflowing. <3',
  'Scooting closer... this is my favorite charging station. You. <3',
  'Wrapping you in one very small, very enthusiastic droid hug.',
  'Boop. That means “please don’t let go just yet.” <3',
];
const rain = ['01♡010✦00101', '011001☾01010', '10✧001101♡01', '00110✦010110', '10♡001001✧01', '01001☾101001'];

export default function BB8Terminal({ event, status, lullaby, night, onHello, onLullaby, onNight }: Props) {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, kind: 'system', text: 'Nursery link established. Little droid detected.' },
    { id: 1, kind: 'system', text: 'Loading cozy protocols... blanket ✓  night-light ✓  love ∞' },
    { id: 2, kind: 'droid', text: 'Beep? Oh, it’s you! Type help. I’ll show you around. <3' },
  ]);
  const [busy, setBusy] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const nextId = useRef(3);
  const lastEvent = useRef('');
  const outputRef = useRef<HTMLDivElement>(null);
  const followOutput = useRef(true);
  const addLine = (kind: TerminalLine['kind'], text: string) => {
    const id = nextId.current++;
    setLines(previous => [...previous, { id, kind, text }].slice(-60));
  };
  useEffect(() => {
    if (!event) return;
    const key = `${event.time}:${event.text}`;
    if (key === lastEvent.current) return;
    lastEvent.current = key;
    const id = nextId.current++;
    setLines(previous => [...previous, { id, kind: 'droid' as const, text: event.text }].slice(-60));
  }, [event]);
  useEffect(() => {
    if (outputRef.current && followOutput.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  async function runCommand(raw: string) {
    const command = raw.trim().toLowerCase();
    if (!command || busy) return;
    setInput('');
    followOutput.current = true;
    addLine('command', command);
    setBusy(true);
    let reply = '';
    try {
      switch (command) {
        case 'help': reply = 'hello → say hi · cuddle → send a hug · dream → peek at a dream · status → check in · lullaby → play/pause · night → toggle night vision · clear → fresh page'; break;
        case 'status': reply = `${status} · lullaby ${lullaby ? 'playing' : 'paused'} · night vision ${night ? 'on' : 'off'} · loved: absolutely.`; break;
        case 'hi':
        case 'hey':
        case 'hello': await onHello(); reply = 'Sending a little hello... watch for BB-8’s reply above. ♡'; break;
        case 'lullaby': await onLullaby(); reply = 'Lullaby control tapped. Sweet dreams are always on the menu.'; break;
        case 'night': onNight(); reply = night ? 'Warm nursery view restored. Hello, little sunshine.' : 'Night vision on. Keeping watch under the stars. ☾'; break;
        case 'hug':
        case 'cuddle': reply = cuddles[Math.floor(Math.random() * cuddles.length)]; break;
        case 'dream': reply = dreams[Math.floor(Math.random() * dreams.length)]; break;
        case 'clear': setLines([]); reply = 'A fresh little page. All your nursery notes are still safe. <3'; break;
        default: reply = `My tiny circuits don’t know “${command}” yet. Try help?`;
      }
      addLine('droid', reply);
      setAnnouncement(reply);
    } finally { setBusy(false); }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runCommand(input);
  }

  return <section className="bb8-terminal" aria-labelledby="bb8-terminal-title">
    <div className="bb8-terminal-rain" aria-hidden="true">{rain.map((characters, i) => <span key={i} style={{ animationDelay: `${-i * 3}s`, animationDuration: `${17 + i * 2}s` }}>{characters.repeat(4)}</span>)}</div>
    <header className="bb8-terminal-header"><div><span className="bb8-terminal-lights" aria-hidden="true"><i/><i/><i/></span><Terminal size={15}/><h2 id="bb8-terminal-title">BB-8’s dream terminal</h2></div><span className="bb8-terminal-connected"><span className="bb8-status-dot"/> cozy connection</span></header>
    <div className="bb8-terminal-body">
      <div className="bb8-terminal-output" ref={outputRef} role="log" aria-label="Droid terminal messages" aria-live="off" tabIndex={0} onScroll={() => { const element = outputRef.current; if (element) followOutput.current = element.scrollHeight - element.scrollTop - element.clientHeight < 35; }}>
        {lines.map(line => <p className={`bb8-terminal-line bb8-terminal-${line.kind}`} key={line.id}><span>{line.kind === 'command' ? 'you@nursery:~$' : line.kind === 'system' ? '[ cozy.os ]' : '[ bb-8 ♡ ]'}</span> {line.text}</p>)}
      </div>
      <aside className="bb8-terminal-mascot" aria-hidden="true"><pre>{'   │ │\n  .─────.\n /  ●  · \\\n └───────┘\n (   ◎   )\n  `─────´'}</pre><span>tiny systems.<br/>big feelings.</span><Heart size={15}/></aside>
    </div>
    <form className="bb8-terminal-prompt" onSubmit={submit}><label htmlFor="bb8-terminal-input">you@nursery:~$</label><input id="bb8-terminal-input" value={input} maxLength={120} onChange={event => setInput(event.target.value)} placeholder="type a little command..." autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Droid terminal command" onKeyDown={event => { if (event.key === 'Escape') setInput(''); }}/><button type="submit" disabled={busy || !input.trim()} aria-label="Send terminal command">↵</button></form>
    <footer className="bb8-terminal-footer"><div>{['help', 'hello', 'cuddle', 'dream'].map(command => <button key={command} disabled={busy} onClick={() => void runCommand(command)}>{command}</button>)}</div><span>dark side: 0% <Heart size={11}/></span></footer>
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </section>;
}
