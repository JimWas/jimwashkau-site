import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Pause, Play, Radio as RadioIcon, RotateCw, Volume2 } from 'lucide-react';
import { getRadioPosition, radioAudioBase, radioTracks } from './data/radioSchedule';

function time(value: number) {
  return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
}

export default function Radio() {
  const audio = useRef<HTMLAudioElement>(null);
  const playing = useRef(false);
  const clockOffset = useRef(0);
  const loadedIndex = useRef(-1);
  const [position, setPosition] = useState(() => getRadioPosition(Date.now()));
  const [status, setStatus] = useState('Ready');
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [volume, setVolume] = useState(0.7);

  function synchronize(force = false) {
    const current = getRadioPosition(Date.now() + clockOffset.current);
    setPosition(current);
    const player = audio.current;
    if (!player || !playing.current) return;
    if (loadedIndex.current !== current.index || force) {
      loadedIndex.current = current.index;
      setStatus('Connecting');
      player.src = radioAudioBase + radioTracks[current.index].file;
      player.load();
    } else if (player.readyState >= 1 && Math.abs(player.currentTime - current.offset) > 3) {
      player.currentTime = current.offset;
    }
  }

  useEffect(() => {
    let disposed = false;
    async function updateClock() {
      const started = Date.now();
      try {
        const response = await fetch('/api/radio-time', { cache: 'no-store' });
        if (!response.ok) return;
        const result: { now: number } = await response.json();
        if (!disposed && Number.isFinite(result.now)) clockOffset.current = result.now - (started + Date.now()) / 2;
      } catch { /* Local previews use the device clock. */ }
    }
    void updateClock();
    const tick = window.setInterval(() => synchronize(), 1000);
    const clock = window.setInterval(() => void updateClock(), 60000);
    const resume = () => { if (!document.hidden) { void updateClock(); synchronize(); } };
    document.addEventListener('visibilitychange', resume);
    return () => {
      disposed = true;
      window.clearInterval(tick);
      window.clearInterval(clock);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  async function startAudio() {
    const player = audio.current;
    if (!player || !playing.current) return;
    const current = getRadioPosition(Date.now() + clockOffset.current);
    if (current.index !== loadedIndex.current) { synchronize(); return; }
    player.currentTime = current.offset;
    try {
      await player.play();
    } catch (failure) {
      if (failure instanceof DOMException && failure.name === 'AbortError') return;
      if (playing.current && loadedIndex.current === current.index) { setError('Playback could not start. Press Play to try again.'); stop(); }
    }
  }

  function stop() {
    playing.current = false;
    audio.current?.pause();
    setListening(false);
    setStatus('Paused');
  }

  function tuneIn() {
    setError('');
    playing.current = true;
    setListening(true);
    synchronize(true);
    // Begin playback within the click gesture for mobile browsers.
    void audio.current?.play().catch(() => {});
  }

  const track = radioTracks[position.index];
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 min-h-20 flex items-center justify-between gap-4">
          <a href="/" className="text-xl font-bold uppercase">JimWashkau<span className="text-brand">.com</span></a>
          <a href="/" className="flex items-center gap-2 text-sm"><ArrowLeft size={16} /> Home</a>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 text-brand text-sm font-bold uppercase"><RadioIcon size={20} /> Original music, around the clock</div>
        <h1 className="text-5xl md:text-7xl font-bold mt-6 mb-10">JimWashkau Radio</h1>
        <section className="border-y border-white/15 py-10" aria-label="Radio player">
          <div className="flex items-center gap-2 text-sm text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Now on the station</div>
          <div className="flex items-center gap-6 mt-5">
            <img src="/radio-cover.jpg" alt="Artwork from Jim Washkau's original recordings" className="w-24 h-24 md:w-36 md:h-36 object-cover shrink-0 rounded" />
            <div className="min-w-0"><h2 className="text-2xl md:text-4xl font-bold break-words">{track.title.replaceAll('_', ' ')}</h2><p className="text-white/50 mt-2">Jim Washkau</p></div>
          </div>
          <div className="h-1 bg-white/10 mt-8 overflow-hidden"><div className="h-full bg-brand" style={{ width: `${position.offset / track.duration * 100}%` }} /></div>
          <div className="flex justify-between text-xs text-white/50 mt-2 tabular-nums"><span>{time(position.offset)}</span><span>{time(track.duration)}</span></div>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <button onClick={listening ? stop : tuneIn} aria-label={listening ? 'Pause radio' : 'Play radio'} title={listening ? 'Pause radio' : 'Play radio'} className="w-16 h-16 shrink-0 rounded-full bg-brand flex items-center justify-center hover:brightness-110">{listening ? <Pause size={26} /> : <Play size={26} />}</button>
            <span className="text-sm text-white/60" role="status">{status}</span>
            <label className="flex items-center gap-3 ml-auto"><Volume2 size={20} /><span className="sr-only">Volume</span><input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={event => { const next = Number(event.target.value); setVolume(next); if (audio.current) audio.current.volume = next; }} className="w-28 accent-blue-500" /></label>
          </div>
          {error && <div className="mt-6 flex items-center gap-4 text-red-300" role="alert"><p>{error}</p><button onClick={tuneIn} aria-label="Reconnect" title="Reconnect"><RotateCw size={20} /></button></div>}
        </section>
        <section className="pt-10" aria-label="Upcoming tracks">
          <h2 className="text-lg font-bold mb-4">Coming Up</h2>
          {Array.from({ length: 5 }, (_, step) => radioTracks[(position.index + step + 1) % radioTracks.length]).map((next, index) => <div key={next.file} className="flex items-center gap-5 py-4 border-b border-white/10"><span className="text-brand text-sm tabular-nums">{String(index + 1).padStart(2, '0')}</span><span className="flex-1 min-w-0 break-words">{next.title.replaceAll('_', ' ')}</span><span className="text-white/40 text-sm tabular-nums">{time(next.duration)}</span></div>)}
        </section>
        <footer className="mt-12 text-sm text-white/40">Original recordings by Jim Washkau. All rights reserved.</footer>
        <audio ref={audio} preload="none" onLoadedMetadata={() => { if (audio.current) audio.current.volume = volume; void startAudio(); }} onPlaying={() => { if (playing.current) { setStatus('On air'); setError(''); } else audio.current?.pause(); }} onWaiting={() => { if (playing.current) setStatus('Buffering'); }} onEnded={() => synchronize()} onError={() => { setError('The music connection was interrupted. Try reconnecting.'); stop(); }} />
      </main>
    </div>
  );
}
