import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleGauge,
  Code2,
  Database,
  ExternalLink,
  FileArchive,
  Film,
  Image as ImageIcon,
  Layers3,
  Music2,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  WandSparkles,
  Zap,
} from 'lucide-react';

const GITHUB_URL = 'https://github.com/JimWas/GPhotos2Shorts';

const features = [
  {
    icon: <ImageIcon />,
    eyebrow: 'Full-frame layout',
    title: 'Nothing important gets cropped',
    body: 'Every photo and motion frame stays complete inside a 9:16 Short, backed by a polished blurred canvas instead of destructive center cropping.',
  },
  {
    icon: <Film />,
    eyebrow: 'Media fidelity',
    title: 'Live Photos stay alive',
    body: 'A paired high-quality still and motion file both make the timeline. GIFs animate, PNGs remain crisp, and common video containers are welcome.',
  },
  {
    icon: <Music2 />,
    eyebrow: 'Sound-aware mixing',
    title: 'Music knows when to step aside',
    body: 'Tracks begin at a safe random point. When a video speaks, music pauses and the original audio takes over—then resumes afterward.',
  },
  {
    icon: <Database />,
    eyebrow: 'Archive intelligence',
    title: 'A manifest for every memory',
    body: 'JSON tracks hashes, output clips, playback order, timestamps, music, source ranges, and completion state for reliable restarts.',
  },
  {
    icon: <Layers3 />,
    eyebrow: 'Complete video',
    title: 'Long footage is preserved',
    body: 'Standalone videos play in full and split safely across multiple Shorts, preferring quiet moments instead of slicing through speech.',
  },
  {
    icon: <Zap />,
    eyebrow: 'Apple Silicon ready',
    title: 'Fast enough for real libraries',
    body: 'One-time image composition, single-pass graphics, progress bars, and automatic VideoToolbox encoding keep big archive jobs moving.',
  },
];

const formats = ['JPEG', 'HEIC', 'PNG', 'GIF', 'WEBP', 'TIFF', 'MOV', 'MP4', 'MKV', 'AVI', 'MTS', 'WEBM'];

function goHome() {
  window.history.pushState({}, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

export default function GPhotos2Shorts() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = 'GPhotos2Shorts | Turn Photo Archives into YouTube Shorts';
    if (description) {
      description.content = 'Archive Google Photos and Apple Photos exports as no-crop YouTube Shorts with Live Photos, original audio, music, and JSON tracking.';
    }
    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#020509] text-white selection:bg-cyan-300 selection:text-black">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020509]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button onClick={goHome} className="group flex items-center gap-3 text-left" aria-label="Return to JimWashkau.com">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-cyan-300/50">
              <ArrowLeft size={16} />
            </span>
            <span>
              <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">JimWashkau.com</span>
              <span className="font-['Nasalization'] text-sm tracking-[0.08em]">GPHOTOS<span className="text-cyan-300">2</span>SHORTS</span>
            </span>
          </button>
          <div className="hidden items-center gap-7 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 md:flex">
            <a href="#capabilities" className="transition-colors hover:text-cyan-300">Capabilities</a>
            <a href="#workflow" className="transition-colors hover:text-cyan-300">Workflow</a>
            <a href="#archive" className="transition-colors hover:text-cyan-300">Archive</a>
          </div>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-cyan-300">
            <Code2 size={15} /> <span className="hidden sm:inline">View source</span>
          </a>
        </div>
      </nav>

      <main>
        <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_40%,rgba(0,135,255,.18),transparent_34%),radial-gradient(circle_at_8%_90%,rgba(249,115,22,.09),transparent_28%)]" />
          <div className="absolute inset-0 -z-20 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.27em] text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,.9)]" />
                Open-source archive pipeline
              </div>
              <h1 className="font-['Nasalization'] text-5xl leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[5.8rem]">
                YOUR PHOTO ARCHIVE,
                <span className="mt-3 block text-cyan-300">CLEARED FOR LAUNCH.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                Turn a Google Photos or Apple Photos export into ready-to-upload YouTube Shorts—without cropping a memory, muting a video, or losing track of what shipped.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-4 rounded-full bg-cyan-300 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] text-black transition-all hover:-translate-y-1 hover:bg-white">
                  Get it on GitHub <ExternalLink size={17} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#workflow" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] transition-colors hover:border-cyan-300/50 hover:text-cyan-300">
                  See the pipeline <ArrowRight size={17} />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-600">
                <span className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> macOS</span>
                <span className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> Python + FFmpeg</span>
                <span className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> Local-first</span>
              </div>
            </div>

            <div className="relative lg:translate-x-8">
              <div className="absolute -inset-8 rounded-[3rem] bg-cyan-300/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-black p-2 shadow-[0_50px_140px_rgba(0,0,0,.82),0_0_90px_rgba(0,153,255,.12)]">
                <img src="/gphotos2shorts/hero.webp" alt="GPhotos2Shorts converts photo and video archives into vertical Shorts" className="aspect-[3/2] w-full rounded-[1.3rem] object-cover" fetchPriority="high" />
              </div>
              <div className="absolute -bottom-5 left-5 rounded-full border border-white/10 bg-black/90 px-5 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-6">
                No crop · Full motion · Original audio
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
            <Stat value="3 SEC" label="Default photo time" />
            <Stat value="60 SEC" label="Default Short limit" />
            <Stat value="1080×1920" label="Delivery frame" />
            <Stat value="SHA-256" label="Archive tracking" />
          </div>
        </section>

        <section id="capabilities" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <SectionIntro eyebrow="Built for the messy reality of exports" title="ONE FOLDER IN. AN ORDERED ARCHIVE OUT." body="Photos, Live Photos, animation, long footage, music, labels, duplicates, and cleanup all move through one deliberate pipeline." />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => <Feature key={feature.title} {...feature} number={String(index + 1).padStart(2, '0')} />)}
          </div>
        </section>

        <section className="relative border-y border-white/10 bg-[#050a10] py-20">
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">A practical welcome mat for your library</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {formats.map((format) => <span key={format} className="rounded-full border border-white/10 bg-black/40 px-5 py-3 font-mono text-xs font-bold text-zinc-400 transition-colors hover:border-cyan-300/35 hover:text-cyan-300">.{format}</span>)}
            </div>
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-orange-400">Four-stage flight plan</p>
              <h2 className="font-['Nasalization'] text-5xl leading-[0.92] tracking-[-0.045em] md:text-6xl">FROM CAMERA ROLL TO PUBLISH QUEUE.</h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-500">Run one guided command. Review the manifest before anything renders. Follow every stage in the terminal.</p>
            </div>
            <div className="space-y-5">
              <Step number="01" icon={<ScanSearch />} title="Scan & understand" body="Discover supported media, pair Live Photos, hash contents, detect duplicates, and analyze video duration and silence." />
              <Step number="02" icon={<CircleGauge />} title="Review the mission" body="See media counts, skipped files, estimated Shorts, required space, cleanup intent, and encoder choice before giving final approval." />
              <Step number="03" icon={<WandSparkles />} title="Compose & encode" body="Build no-crop vertical frames, add filename and song information in Nasalization type, mix audio intelligently, and accelerate H.264 on Apple hardware." />
              <Step number="04" icon={<FileArchive />} title="Validate & record" body="Verify the finished clip, publish it with a unique completion timestamp, write the clip manifest, and optionally move completed sources to Trash." />
            </div>
          </div>
        </section>

        <section id="archive" className="border-y border-white/10 bg-white/[0.025] py-28 md:py-36">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-cyan-300/15 bg-[#03080d] p-5 shadow-[0_35px_100px_rgba(0,0,0,.65)] md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3"><TerminalSquare size={18} className="text-cyan-300" /><span className="font-mono text-xs text-zinc-500">photo_archive.json</span></div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">validated</span>
              </div>
              <pre className="overflow-x-auto font-mono text-[11px] leading-7 text-zinc-500 sm:text-xs"><code>{`{
  "schema_version": 2,
  "clips": {
    "short_0007_completed_...mp4": {
      "duration_seconds": 60.0,
      "music": { "title": "Midnight Inkwell" },
      "files": [
        {
          "filename": "IMG_1234.HEIC",
          "clip_start_seconds": 0.0,
          "clip_end_seconds": 3.0,
          "segment_type": "high-quality photo"
        }
      ]
    }
  }
}`}</code></pre>
            </div>
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-cyan-300">The archive remembers</p>
              <h2 className="font-['Nasalization'] text-5xl leading-[0.92] tracking-[-0.045em] md:text-6xl">EVERY FILE. EVERY CLIP. EVERY SECOND.</h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">The database is more than a duplicate list. It is a durable, clip-by-clip manifest of what was rendered, where it appeared, what music played, and whether cleanup completed.</p>
              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {['Playback order and timing', 'Original paths and hashes', 'Long-video source ranges', 'Live Photo components', 'Music history and start point', 'Safe resume after interruption'].map((item) => <li key={item} className="flex gap-3 text-sm font-bold text-zinc-400"><ShieldCheck size={17} className="shrink-0 text-emerald-400" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <div className="relative overflow-hidden rounded-[2rem] bg-cyan-300 px-8 py-16 text-black md:px-16 md:py-20">
            <div className="absolute -right-16 -top-24 h-96 w-96 rounded-full border-[60px] border-black/5" />
            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]"><Sparkles size={16} /> Your archive has been waiting</p>
                <h2 className="font-['Nasalization'] max-w-4xl text-5xl leading-[0.88] tracking-[-0.055em] md:text-7xl">TURN MEMORIES INTO MOMENTUM.</h2>
                <p className="mt-6 max-w-2xl font-semibold leading-relaxed text-black/65">Free, open source, local-first, and built for the exports you already have.</p>
              </div>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-black px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-1">
                Launch on GitHub <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Jim Washkau · GPhotos2Shorts</p>
        <div className="flex flex-wrap gap-6"><button onClick={goHome} className="hover:text-cyan-300">Home</button><a href="/support" className="hover:text-cyan-300">Support</a><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">GitHub</a></div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="py-8 text-center md:py-10"><p className="text-2xl font-black tracking-[-0.04em] text-white md:text-3xl">{value}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:text-[10px]">{label}</p></div>;
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="max-w-4xl"><p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p><h2 className="font-['Nasalization'] text-5xl leading-[0.92] tracking-[-0.05em] md:text-7xl">{title}</h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-500">{body}</p></div>;
}

function Feature({ icon, eyebrow, title, body, number }: { icon: ReactNode; eyebrow: string; title: string; body: string; number: string }) {
  return <article className="group bg-[#05090e] p-8 transition-colors hover:bg-[#07121a] md:p-10"><div className="mb-12 flex items-start justify-between"><span className="text-cyan-300 transition-transform group-hover:scale-110">{icon}</span><span className="font-mono text-[10px] tracking-[0.24em] text-zinc-700">{number}</span></div><p className="mb-3 text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300/70">{eyebrow}</p><h3 className="mb-4 text-xl font-black uppercase leading-tight tracking-[-0.025em]">{title}</h3><p className="leading-relaxed text-zinc-500">{body}</p></article>;
}

function Step({ number, icon, title, body }: { number: string; icon: ReactNode; title: string; body: string }) {
  return <article className="group grid gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-cyan-300/25 sm:grid-cols-[auto_1fr_auto] sm:items-center md:p-9"><span className="grid h-14 w-14 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">{icon}</span><div><p className="mb-2 text-[9px] font-black uppercase tracking-[0.24em] text-orange-400">Stage {number}</p><h3 className="text-xl font-black uppercase tracking-[-0.025em]">{title}</h3><p className="mt-2 max-w-2xl leading-relaxed text-zinc-500">{body}</p></div><span className="hidden font-['Nasalization'] text-3xl text-white/5 sm:block">{number}</span></article>;
}
