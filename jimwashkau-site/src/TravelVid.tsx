import { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Check,
  ChevronRight,
  CircleStop,
  Clock3,
  Compass,
  Download,
  Film,
  Gauge,
  HardDrive,
  Images,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/travelvid-recorder/id6754813702';
const APP_SCREENSHOT_URL =
  'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/7b/57/e0/7b57e09b-ffc9-c7fc-795f-7b42c57855a8/Gemini_Generated_Image_hjq8tvhjq8tvhjq8.png/460x996bb.webp';

const coverModes = [
  'Cover image',
  'Tetris',
  'Video playback',
  'Fake call',
  'Flappy Bird',
  'World clock',
  'Calculator',
  'Travel dashboard',
];

function TravelVid() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = 'TravelVid Recorder is a focused iPhone travel video recorder with Cover Mode, segmented capture, GPS routes, readiness checks, and recovery tools.';
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute('content');
    document.title = 'TravelVid Recorder - Minimal Travel Video Recorder for iPhone';

    let descriptionElement = existingDescription;
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute('content', description);

    const socialMeta = [
      ['property', 'og:title', 'TravelVid Recorder - Minimal Travel Video Recorder for iPhone'],
      ['property', 'og:description', description],
      ['property', 'og:url', 'https://jimwashkau.com/travelvid'],
      ['property', 'og:type', 'website'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', 'TravelVid Recorder - Minimal Travel Video Recorder for iPhone'],
      ['name', 'twitter:description', description],
    ];
    const addedMeta: HTMLMetaElement[] = [];
    socialMeta.forEach(([attribute, key, content]) => {
      const element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      element.dataset.travelVid = 'true';
      document.head.appendChild(element);
      addedMeta.push(element);
    });

    return () => {
      document.title = previousTitle;
      if (previousDescription) descriptionElement?.setAttribute('content', previousDescription);
      addedMeta.forEach((element) => element.remove());
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#050706] text-white selection:bg-emerald-300 selection:text-black">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050706]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-emerald-300/60 group-hover:text-emerald-300">
              <ArrowLeft size={16} />
            </span>
            <span className="hidden sm:inline">JimWashkau<span className="text-emerald-300">.com</span></span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 md:inline">Available for iPhone</span>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-emerald-300"
            >
              Get the app <Download size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative isolate min-h-screen pt-20">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_28%,rgba(52,211,153,0.15),transparent_30%),radial-gradient(circle_at_12%_84%,rgba(251,146,60,0.10),transparent_28%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-300/25 bg-emerald-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]" />
                Travel ready · iOS 17.6+
              </div>
              <h1 className="max-w-4xl text-6xl font-black leading-[0.84] tracking-[-0.07em] sm:text-7xl md:text-8xl xl:text-[7.4rem]">
                KEEP THE
                <span className="block text-emerald-300">STORY</span>
                MOVING.
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                TravelVid Recorder is a minimal, reliable iPhone camera built for long trips, scenic drives, walking tours, flights, and any moment where the viewfinder should get out of the way.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-4 rounded-full bg-emerald-300 px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-white"
                >
                  Download on the App Store
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
                </a>
                <a
                  href="#built-for-the-road"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:border-white/50"
                >
                  See how it works <ChevronRight size={17} />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                <span className="flex items-center gap-2"><Check className="text-emerald-300" size={14} /> Cover Mode</span>
                <span className="flex items-center gap-2"><Check className="text-emerald-300" size={14} /> GPS route tools</span>
                <span className="flex items-center gap-2"><Check className="text-emerald-300" size={14} /> Version 3.4</span>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[560px] justify-center lg:justify-end">
              <div className="absolute left-0 top-[18%] hidden w-44 rounded-2xl border border-white/10 bg-black/70 p-5 shadow-2xl backdrop-blur-xl sm:block lg:-left-6">
                <div className="mb-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                  Recording health <ShieldCheck className="text-emerald-300" size={15} />
                </div>
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[88%] bg-emerald-300" /></div>
                <p className="text-xs font-bold text-zinc-200">Camera, audio & storage ready</p>
              </div>

              <div className="relative rotate-[2deg] rounded-[3.2rem] border border-white/20 bg-[#131714] p-2.5 shadow-[0_50px_120px_rgba(0,0,0,.75),0_0_80px_rgba(52,211,153,.08)]">
                <div className="pointer-events-none absolute left-1/2 top-5 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />
                <img
                  src={APP_SCREENSHOT_URL}
                  alt="TravelVid Recorder running on an iPhone"
                  className="h-[610px] w-[282px] rounded-[2.7rem] object-cover sm:h-[680px] sm:w-[314px]"
                />
              </div>

              <div className="absolute -bottom-6 right-0 w-48 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-2xl backdrop-blur-xl sm:right-[-1rem]">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-red-500/15 text-red-400"><CircleStop size={17} /></span>
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Auto segment</p><p className="text-sm font-black">02:00</p></div>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-400">Shorter files help protect your footage if the unexpected happens.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
            <Stat value="5.0" label="App Store rating" />
            <Stat value="9.3 MB" label="App size" />
            <Stat value="4+" label="Age rating" />
            <Stat value="Free" label="With premium tools" />
          </div>
        </section>

        <section id="built-for-the-road" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-emerald-300">Built for the road</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">THE CAMERA APP THAT PLANS AHEAD.</h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-400">TravelVid quietly handles checks, file management, recovery, and location context around your recording so you can stay present.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
              <Feature icon={<Film />} number="01" title="Resilient capture" body="Segmented recording helps protect long files, with automatic recovery for camera, audio, phone call, and system interruptions." />
              <Feature icon={<ShieldCheck />} number="02" title="Ready before you roll" body="Camera, microphone, free storage, and the latest saved segment are checked before every recording." />
              <Feature icon={<MapPin />} number="03" title="Your route, remembered" body="Optionally save your location, address, and GPS path alongside each video for richer travel context." />
              <Feature icon={<HardDrive />} number="04" title="Storage with guardrails" body="See available space at a glance, get warned before it runs low, and quickly clean up after export." />
              <Feature icon={<Images />} number="05" title="A useful library" body="Preview clips, inspect recorded routes, select in batches, and follow export progress from one place." />
              <Feature icon={<Gauge />} number="06" title="A live travel dashboard" body="See speed, heading, microphone level, current time, coordinates, and a location map while recording continues." />
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/10 bg-[#0a0d0b] py-28 md:py-36">
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-orange-300"><Sparkles size={16} /> Make the screen yours</div>
              <h2 className="max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">RECORDING DOESN&apos;T HAVE TO LOOK BORING.</h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">Choose a useful or entertaining cover mode while TravelVid records. A clear recording indicator remains visible throughout capture.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {coverModes.map((mode, index) => (
                <div key={mode} className={`min-h-32 rounded-2xl border p-5 transition-colors hover:border-emerald-300/40 ${index === 7 ? 'border-emerald-300/30 bg-emerald-300/10 sm:col-span-2' : 'border-white/10 bg-black/25'}`}>
                  <span className="mb-8 block font-mono text-[10px] text-zinc-600">0{index + 1}</span>
                  <p className="text-sm font-black uppercase tracking-wide">{mode}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="mb-16 max-w-2xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-emerald-300">From camera to camera roll</p>
            <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">A CLEAR PATH FROM CAPTURE TO KEEP.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Step icon={<Camera />} number="01" title="Choose and record" body="Set your camera, quality, audio, stabilization, and cover mode, then start with one tap." />
            <Step icon={<Clock3 />} number="02" title="Let TravelVid manage" body="Segmented recording, optional GPS, readiness checks, and recovery tools work while you keep moving." />
            <Step icon={<Smartphone />} number="03" title="Review and export" body="Preview clips and routes, then export one or many videos to Photos with clear results." />
          </div>
        </section>

        <section className="px-6 pb-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-emerald-300 px-8 py-16 text-black md:px-16 md:py-20">
            <div className="absolute -right-10 -top-20 h-80 w-80 rounded-full border-[50px] border-black/5" />
            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]"><Compass size={16} /> Your next story is out there</p>
                <h2 className="max-w-3xl text-5xl font-black leading-[0.88] tracking-[-0.055em] md:text-7xl">DON&apos;T MISS THE MOMENT.</h2>
              </div>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-black px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-1">
                Get TravelVid <ArrowUpRight className="transition-transform group-hover:rotate-45" size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Jim Washkau · TravelVid Recorder</p>
        <div className="flex flex-wrap gap-6">
          <a href="/apps" className="hover:text-emerald-300">All apps</a>
          <a href="/support" className="hover:text-emerald-300">Support</a>
          <a href="/privacy" className="hover:text-emerald-300">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-8 text-center md:py-10">
      <p className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">{value}</p>
      <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:text-[10px]">{label}</p>
    </div>
  );
}

function Feature({ icon, number, title, body }: { icon: React.ReactNode; number: string; title: string; body: string }) {
  return (
    <article className="group bg-[#080b09] p-8 transition-colors hover:bg-[#0d130f] md:p-10">
      <div className="mb-10 flex items-start justify-between">
        <span className="text-emerald-300 transition-transform group-hover:scale-110">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-zinc-700">{number}</span>
      </div>
      <h3 className="mb-4 text-xl font-black uppercase tracking-[-0.02em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
    </article>
  );
}

function Step({ icon, number, title, body }: { icon: React.ReactNode; number: string; title: string; body: string }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-8 md:p-10">
      <div className="absolute right-6 top-3 text-7xl font-black tracking-[-0.08em] text-white/[0.025]">{number}</div>
      <div className="mb-16 grid h-12 w-12 place-items-center rounded-full bg-emerald-300 text-black">{icon}</div>
      <p className="mb-3 font-mono text-[10px] font-bold tracking-[0.24em] text-emerald-300">STEP {number}</p>
      <h3 className="mb-4 text-2xl font-black uppercase tracking-[-0.025em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
    </article>
  );
}

export default TravelVid;
