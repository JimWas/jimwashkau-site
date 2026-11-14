import { useEffect, useRef, useState } from 'react';
import './BB8CheerMode.css';
const pepTalks = ['You’ve got this!', 'Keep going. I’m cheering for you!', 'Take your time. Your voice matters.', 'One brave little step at a time!', 'You can do this. I’m in your corner!', 'Big breath. You’ve got room to shine.', 'Keep showing up for yourself!', 'You don’t have to be perfect. Keep going!', 'Go on! Tell your story.', 'You’ve got a little droid on your team!', 'There’s no rush. Find your words.', 'Bring that brave energy!', 'I’m rooting for you. All the way!', 'A little courage. A little kindness. Keep going!', 'Yes to giving it a try!', 'Your effort deserves a happy beep!'];
type Pace = 'steady' | 'occasional' | 'manual';
export default function CheerMode({ name, paused, volume, onStart, onEncourage }: { name: string; paused: boolean; volume: number; onStart: () => void; onEncourage: (phrase: string) => void }) {
  const [enabled, setEnabled] = useState(false);
  const [spoken, setSpoken] = useState(true);
  const [pace, setPace] = useState<Pace>('steady');
  const [phrase, setPhrase] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState('');
  const lastIndex = useRef(-1);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const lastTime = useRef(0);
  const current = useRef({ paused, volume, spoken, onEncourage });
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  useEffect(() => { current.current = { paused, volume, spoken, onEncourage }; }, [paused, volume, spoken, onEncourage]);
  function stopSpeech() {
    if (utterance.current && supported) { utterance.current = null; window.speechSynthesis.cancel(); }
    setSpeaking(false);
  }
  function encourage() {
    const settings = current.current;
    if (settings.paused || document.hidden || Date.now() - lastTime.current < 3500) return;
    if (supported && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) return;
    let index = Math.floor(Math.random() * (pepTalks.length - (lastIndex.current < 0 ? 0 : 1)));
    if (lastIndex.current >= 0 && index >= lastIndex.current) index++;
    lastIndex.current = index; lastTime.current = Date.now();
    const next = pepTalks[index];
    setPhrase(next); setNotice(''); settings.onEncourage(next);
    if (!settings.spoken || !supported || settings.volume === 0) return;
    const speech = new SpeechSynthesisUtterance(next);
    speech.lang = 'en-US'; speech.pitch = 1.35; speech.rate = 1.04; speech.volume = settings.volume / 100;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(item => item.localService && item.lang.startsWith('en')) || voices.find(item => item.lang.startsWith('en'));
    if (voice) speech.voice = voice;
    utterance.current = speech;
    speech.onend = () => { if (utterance.current === speech) { utterance.current = null; setSpeaking(false); } };
    speech.onerror = event => {
      if (utterance.current !== speech) return;
      utterance.current = null; setSpeaking(false);
      if (event.error !== 'canceled' && event.error !== 'interrupted') setNotice('Voice playback was paused by your browser. Tap “Back me up” to try again.');
    };
    setSpeaking(true); window.speechSynthesis.speak(speech);
  }
  const encourageRef = useRef(encourage);
  useEffect(() => { encourageRef.current = encourage; });
  useEffect(() => {
    const stop = () => { if (utterance.current && supported) { utterance.current = null; window.speechSynthesis.cancel(); } setSpeaking(false); };
    const visibility = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', visibility);
    let timer: number | undefined;
    if (enabled && !paused && pace !== 'manual') {
      const schedule = () => { timer = window.setTimeout(() => { encourageRef.current(); schedule(); }, pace === 'steady' ? 20000 + Math.random() * 15000 : 45000 + Math.random() * 30000); };
      schedule();
    }
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visibility); stop(); };
  }, [enabled, paused, pace, supported]);
  useEffect(() => {
    if (spoken && volume > 0) return;
    if (utterance.current && supported) { utterance.current = null; window.speechSynthesis.cancel(); }
    const update = window.setTimeout(() => setSpeaking(false), 0);
    return () => clearTimeout(update);
  }, [spoken, volume, supported]);
  return <section className="bb8-cheer-mode" aria-label="Cheer me on">
    <div className="bb8-cheer-heading"><div><h3>Cheer me on</h3><p>A little confidence, with {name} in your corner.</p></div><button type="button" role="switch" aria-checked={enabled} aria-label="Cheer me on" onClick={() => {
      if (enabled) { stopSpeech(); setEnabled(false); } else { onStart(); setEnabled(true); if (!paused) encourage(); }
    }}>{enabled ? 'On' : 'Off'}</button></div>
    {enabled && <>
      <div className="bb8-cheer-options"><label>Encouragement rhythm<select aria-label="Encouragement rhythm" value={pace} onChange={event => setPace(event.target.value as Pace)}><option value="steady">Steady · every 20–35 seconds</option><option value="occasional">Occasional · every 45–75 seconds</option><option value="manual">Only when I ask</option></select></label><label className="bb8-cheer-voice"><input type="checkbox" checked={spoken} disabled={!supported} onChange={event => { setSpoken(event.target.checked); if (!event.target.checked) stopSpeech(); }}/> Spoken pep talks</label></div>
      <div className="bb8-cheer-actions"><button type="button" disabled={paused || speaking} onClick={encourage}>Back me up ♡</button>{speaking && <button type="button" onClick={stopSpeech}>Stop speaking</button>}</div>
      <p className="bb8-cheer-quote" aria-live="polite">{paused ? 'A little pause for naps or dance time. Your cheer buddy will be back.' : phrase ? `“${phrase}”` : 'Your little cheer buddy is ready. Tap “Back me up” for a boost.'}</p>
      {notice && <p role="status">{notice}</p>}{!supported && <p>Spoken voices aren’t available in this browser. Encouraging words and happy beeps still work.</p>}
    </>}
    <small>No microphone or speech analysis. These are playful pep talks, timed or on demand. Spoken volume follows Nursery volume; voice sound depends on your browser.</small>
  </section>;
}
