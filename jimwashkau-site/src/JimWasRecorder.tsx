import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, Camera, Check, ChevronRight, Cpu, FileCheck2,
  Fingerprint, HardDrive, HeartPulse, Layers3, Lock, MapPin, Mic2,
  ShieldCheck, SlidersHorizontal, Smartphone, Vibrate, Video, Volume2,
  Wrench, Zap,
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const CONTACT_URL =
  'mailto:contact@jimwashkau.com?subject=JimWas%20Recorder%20for%20iOS%2016';

const features = [
  { icon: <Video />, eyebrow: 'Background video', title: 'Keep recording beyond the Camera app.', body: 'Start from a hardware trigger or Control Center, lock the screen, and keep capturing with audio while iOS remains usable.' },
  { icon: <Layers3 />, eyebrow: 'Crash-safe segments', title: 'Small files. Immediate finalization.', body: 'Optional two-minute segments are fragmented during capture, finalized atomically, and recovered at SpringBoard startup when possible.' },
  { icon: <HeartPulse />, eyebrow: 'Recording health', title: 'A watchdog that stays on duty.', body: 'The capture session is checked every five seconds. Camera or media-service interruptions trigger a rebuild and automatic restart.' },
  { icon: <Vibrate />, eyebrow: 'Eyes-free confidence', title: 'Know the state without looking.', body: 'Strong start and stop vibrations, failure warnings, and optional periodic “still recording” haptics keep you informed with the screen off.' },
  { icon: <SlidersHorizontal />, eyebrow: 'Creator controls', title: 'Choose the capture, not just the camera.', body: 'Select front or rear camera, supported lens, 480p through 4K, and frame rates from 24 to 240 FPS when the hardware supports them.' },
  { icon: <MapPin />, eyebrow: 'Context preserved', title: 'Location travels with the clip.', body: 'Optionally embed timestamped GPS coordinates, altitude, accuracy, device make, model, and software metadata into video files.' },
  { icon: <Mic2 />, eyebrow: 'Audio & photos', title: 'One toolkit, three capture modes.', body: 'Record audio-only sessions or take photos in the background using the same configurable physical-button workflow.' },
  { icon: <HardDrive />, eyebrow: 'Files you control', title: 'Keep originals. Copy what matters.', body: 'Save recordings to the Documents folder, optionally copy videos and photos to the Camera Roll, and customize file prefixes.' },
];

const useCases = [
  { number: '01', icon: <Camera />, title: 'Everyday vlogging', body: 'Capture the walk between planned shots, the conversation after the camera would normally close, and the candid context that makes a vlog feel alive.' },
  { number: '02', icon: <Smartphone />, title: 'Travel documentation', body: 'Record long walks, drives, tours, and field notes without holding the Camera interface open—and preserve optional GPS context along the way.' },
  { number: '03', icon: <ShieldCheck />, title: 'Personal documentation', body: 'Create a dependable record of an interaction or event with tactile confirmation, resilient segments, and normal iOS privacy indicators.' },
  { number: '04', icon: <Mic2 />, title: 'Voice capture', body: 'Turn a volume-button gesture into an instant audio recorder for ideas, interviews, observations, and hands-busy moments.' },
];

function JimWasRecorder() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = 'JimWas Recorder is a high-reliability background video, audio, and photo capture tweak for iOS 16 with Dopamine.';
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute('content');
    document.title = 'JimWas Recorder — Background Capture for iOS 16';
    let descriptionElement = existingDescription;
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute('content', description);

    const socialMeta = [
      ['property', 'og:title', 'JimWas Recorder — Background Capture for iOS 16'],
      ['property', 'og:description', description],
      ['property', 'og:image', 'https://jimwashkau.com/recorder/og.png'],
      ['property', 'og:url', 'https://jimwashkau.com/jimwas-recorder'],
      ['property', 'og:type', 'website'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', 'JimWas Recorder — Background Capture for iOS 16'],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', 'https://jimwashkau.com/recorder/og.png'],
    ];
    const addedMeta: HTMLMetaElement[] = [];
    socialMeta.forEach(([attribute, key, content]) => {
      const element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      element.dataset.jimwasRecorder = 'true';
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
    <div className="min-h-screen overflow-hidden bg-[#050608] text-white selection:bg-[#43d7ff] selection:text-black">
      <Analytics />
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050608]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/apps" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-cyan-300/60 group-hover:text-cyan-300"><ArrowLeft size={16} /></span>
            <span className="hidden sm:inline">JimWashkau<span className="text-cyan-300">.com</span></span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.26em] text-zinc-500 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)]" /> Verified on iPhone SE 2 & SE 3
            </span>
            <a href={CONTACT_URL} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-white">
              Get the tweak <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative isolate min-h-screen pt-20">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_28%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_8%_85%,rgba(59,130,246,0.12),transparent_30%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,.9)]" /> iOS 16 · Dopamine rootless
              </div>
              <h1 className="max-w-4xl text-6xl font-black leading-[0.84] tracking-[-0.07em] sm:text-7xl md:text-8xl xl:text-[7.1rem]">
                NEVER LOSE<span className="block text-cyan-300">THE MOMENT.</span>
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                JimWas Recorder turns a jailbroken iPhone into a resilient, screen-free capture tool. Record video and audio, take photos, and control it all from physical buttons or Control Center.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href={CONTACT_URL} className="group inline-flex items-center justify-center gap-4 rounded-full bg-cyan-300 px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-white">
                  Request installation <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                </a>
                <a href="#why-it-exists" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:border-white/50">
                  See why it’s different <ChevronRight size={17} />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                <span className="flex items-center gap-2"><Check className="text-cyan-300" size={14} /> Video + audio together</span>
                <span className="flex items-center gap-2"><Check className="text-cyan-300" size={14} /> Screen-off triggers</span>
                <span className="flex items-center gap-2"><Check className="text-cyan-300" size={14} /> Recovery watchdog</span>
              </div>
            </div>
            <div className="relative mx-auto h-[690px] w-full max-w-[570px] sm:h-[760px]">
              <div className="absolute left-0 top-16 z-10 hidden w-48 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-2xl backdrop-blur-xl sm:block">
                <div className="mb-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-500">Capture health <HeartPulse className="text-emerald-400" size={15} /></div>
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full bg-emerald-400" /></div>
                <p className="text-xs font-bold text-zinc-200">Session monitored every 5 seconds</p>
              </div>
              <PhoneFrame className="absolute right-0 top-0 z-0 -rotate-[5deg]" image="/recorder/capture-settings.png" alt="JimWas Recorder camera and reliability settings" />
              <PhoneFrame className="absolute bottom-0 left-4 z-20 rotate-[4deg] sm:left-12" image="/recorder/triggers.png" alt="JimWas Recorder hardware trigger and haptic settings" />
              <div className="absolute bottom-8 right-0 z-30 w-52 rounded-2xl border border-cyan-300/20 bg-[#071013]/90 p-5 shadow-2xl backdrop-blur-xl sm:right-[-1rem]">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300 text-black"><Vibrate size={17} /></span>
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Tactile state</p><p className="text-sm font-black">START · STOP · ALERT</p></div>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-400">Strong feedback confirms recording without waking the display.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
            <Stat value="4K" label="Maximum resolution" /><Stat value="240" label="Maximum FPS*" /><Stat value="02:00" label="Crash-safe segments" /><Stat value="5 sec" label="Health watchdog" />
          </div>
          <p className="mx-auto max-w-7xl px-6 pb-5 text-center text-[9px] uppercase tracking-[0.2em] text-zinc-700">*Resolution and frame rate depend on the selected camera and device hardware.</p>
        </section>

        <section id="why-it-exists" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="mb-16 max-w-3xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-cyan-300">Why it exists</p>
            <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.05em] md:text-7xl">THE BEST MOMENTS DON’T WAIT FOR A CAMERA UI.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">Apple Camera is excellent for intentional, on-screen photography. JimWas Recorder is built for continuity: capture from the lock screen, keep the display dark, and let reliability systems protect the session behind the scenes.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2">
            <ComparisonColumn label="Apple Camera" accent="text-zinc-400" items={['Designed around an open, visible camera interface', 'Recording ends when the app can no longer stay active', 'Screen interaction is central to capture control', 'Optimized for composing one deliberate shot at a time']} />
            <ComparisonColumn label="JimWas Recorder" accent="text-cyan-300" highlighted items={['Starts from hardware gestures or Control Center', 'Continues with the screen locked or another app visible', 'Uses haptics to confirm start, stop, health, and failure', 'Segments, monitors, finalizes, and recovers long sessions']} />
          </div>
        </section>

        <section className="relative border-y border-white/10 bg-[#080b0f] py-28 md:py-40">
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-cyan-300">Full capture stack</p>
                <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">BUILT LIKE A RECORDER. NOT A SHORTCUT.</h2>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-400">Every layer—from the physical trigger to the final movie file—was designed for dependable, low-attention capture.</p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
                {features.map((feature, index) => <Feature key={feature.title} {...feature} number={String(index + 1).padStart(2, '0')} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="grid grid-cols-2 items-start gap-5">
                <PhoneFrame className="relative w-full rotate-[-2deg]" image="/recorder/package.png" alt="JimWas Recorder package installed in Sileo" compact />
                <PhoneFrame className="relative mt-20 w-full rotate-[2deg]" image="/recorder/permissions.png" alt="JimWas Recorder permission companion application" compact />
              </div>
              <div className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/85 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-400"><FileCheck2 size={19} /></span>
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.26em] text-zinc-500">Permission-aware service</p><p className="mt-1 text-sm font-black">CAMERA · MICROPHONE · PHOTOS · LOCATION</p></div>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-cyan-300">From install to capture</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.05em] md:text-6xl">POWERFUL UNDER THE HOOD. SIMPLE IN YOUR HAND.</h2>
              <div className="mt-10 space-y-8">
                <Step number="01" icon={<Wrench />} title="Install & authorize" body="Install the rootless package, open the companion app once, and grant the permissions needed for your chosen capture modes." />
                <Step number="02" icon={<SlidersHorizontal />} title="Choose your workflow" body="Set camera, quality, FPS, file behavior, segmentation, metadata, triggers, and haptic cadence from iOS Settings." />
                <Step number="03" icon={<Volume2 />} title="Capture without friction" body="Use a button gesture or Control Center. Confirmation arrives through vibration; the recorder handles session health and files." />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025] py-28 md:py-36">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl"><p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-cyan-300">Made for real life</p><h2 className="text-5xl font-black leading-[0.92] tracking-[-0.05em] md:text-6xl">LESS TIME MANAGING THE CAMERA. MORE TIME LIVING THE STORY.</h2></div>
              <p className="max-w-md text-lg leading-relaxed text-zinc-400">The value is not just background recording. It is the confidence that capture remains active while your attention stays where it belongs.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{useCases.map((useCase) => <UseCase key={useCase.number} {...useCase} />)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.045] p-8 md:p-12">
              <div className="mb-8 flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-cyan-300 text-black"><Cpu size={20} /></span><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">Compatibility</p><p className="mt-1 text-sm text-zinc-500">Purpose-built, not App Store software</p></div></div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-5xl">FOR iOS 16 + DOPAMINE ROOTLESS.</h2>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <Requirement icon={<Check />} text="Verified on iOS 16.3" /><Requirement icon={<Check />} text="iPhone SE 2 & SE 3 tested" /><Requirement icon={<Check />} text="Rootless package architecture" /><Requirement icon={<Check />} text="Device-aware camera options" />
              </div>
              <p className="mt-8 text-sm leading-relaxed text-zinc-500">Requires a compatible jailbroken device. Available cameras, resolutions, and frame rates vary by iPhone model. Unsupported lens choices are hidden automatically.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0c10] p-8 md:p-12">
              <div className="mb-8 flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-zinc-300"><Fingerprint size={20} /></span><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Privacy by design</p><p className="mt-1 text-sm text-zinc-500">Power without pretending</p></div></div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-5xl">RECORD RESPONSIBLY.</h2>
              <ul className="mt-9 space-y-5 text-sm leading-relaxed text-zinc-400">
                <li className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-400" size={18} /> Apple’s green and yellow camera/microphone indicators remain visible.</li>
                <li className="flex gap-3"><Lock className="mt-0.5 shrink-0 text-emerald-400" size={18} /> Call audio is not captured.</li>
                <li className="flex gap-3"><Fingerprint className="mt-0.5 shrink-0 text-emerald-400" size={18} /> Location metadata is optional and permission-controlled.</li>
                <li className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-400" size={18} /> Users are responsible for consent and compliance with local recording laws.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 pb-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-cyan-300 px-8 py-16 text-black md:px-16 md:py-20">
            <div className="absolute -right-10 -top-20 h-80 w-80 rounded-full border-[50px] border-black/5" />
            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div><p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]"><Zap size={16} /> The moment is already happening</p><h2 className="max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.055em] md:text-7xl">CAPTURE FIRST. KEEP MOVING.</h2><p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-black/65">Ask about compatibility, installation, or using JimWas Recorder in your everyday capture workflow.</p></div>
              <a href={CONTACT_URL} className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-black px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-1">Get JimWas Recorder <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Jim Washkau · JimWas Recorder</p>
        <div className="flex flex-wrap gap-6"><a href="/apps" className="hover:text-cyan-300">All apps</a><a href="/support" className="hover:text-cyan-300">Support</a><a href="/privacy" className="hover:text-cyan-300">Privacy</a><a href={CONTACT_URL} className="hover:text-cyan-300">Contact</a></div>
      </footer>
    </div>
  );
}

function PhoneFrame({ image, alt, className = '', compact = false }: { image: string; alt: string; className?: string; compact?: boolean }) {
  return <div className={`${className} rounded-[2.7rem] border border-white/20 bg-[#15181c] p-2 shadow-[0_45px_100px_rgba(0,0,0,.68),0_0_60px_rgba(34,211,238,.06)] ${compact ? '' : 'w-[285px] sm:w-[315px]'}`}><div className="overflow-hidden rounded-[2.3rem] bg-black"><img src={image} alt={alt} className="block h-auto w-full" loading="eager" /></div></div>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="py-8 text-center md:py-10"><p className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">{value}</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:text-[10px]">{label}</p></div>;
}

function ComparisonColumn({ label, items, accent, highlighted = false }: { label: string; items: string[]; accent: string; highlighted?: boolean }) {
  return <article className={`p-8 md:p-12 ${highlighted ? 'bg-[#071116]' : 'bg-[#090a0c]'}`}><div className="mb-10 flex items-center justify-between"><h3 className={`text-2xl font-black uppercase tracking-[-0.03em] ${accent}`}>{label}</h3>{highlighted ? <HeartPulse className="text-cyan-300" size={22} /> : <Camera className="text-zinc-700" size={22} />}</div><ul className="space-y-5">{items.map((item) => <li key={item} className="flex gap-4 text-sm leading-relaxed text-zinc-400 md:text-base"><span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${highlighted ? 'bg-cyan-300' : 'bg-zinc-700'}`} />{item}</li>)}</ul></article>;
}

function Feature({ icon, number, eyebrow, title, body }: { icon: ReactNode; number: string; eyebrow: string; title: string; body: string }) {
  return <article className="group bg-[#080b0f] p-8 transition-colors hover:bg-[#0b1218] md:p-10"><div className="mb-10 flex items-start justify-between"><span className="text-cyan-300 transition-transform group-hover:scale-110">{icon}</span><span className="font-mono text-[10px] tracking-[0.24em] text-zinc-700">{number}</span></div><p className="mb-3 text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300/70">{eyebrow}</p><h3 className="mb-4 text-xl font-black uppercase leading-tight tracking-[-0.025em]">{title}</h3><p className="leading-relaxed text-zinc-500">{body}</p></article>;
}

function Step({ number, icon, title, body }: { number: string; icon: ReactNode; title: string; body: string }) {
  return <article className="flex gap-5"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">{icon}</div><div><p className="mb-2 font-mono text-[10px] font-bold tracking-[0.24em] text-cyan-300">STEP {number}</p><h3 className="mb-2 text-xl font-black uppercase tracking-[-0.025em]">{title}</h3><p className="leading-relaxed text-zinc-500">{body}</p></div></article>;
}

function UseCase({ number, icon, title, body }: { number: string; icon: ReactNode; title: string; body: string }) {
  return <article className="group relative min-h-80 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 p-8 transition-colors hover:border-cyan-300/30"><div className="absolute right-4 top-1 text-8xl font-black tracking-[-0.09em] text-white/[0.025]">{number}</div><span className="mb-20 block text-cyan-300 transition-transform group-hover:scale-110">{icon}</span><h3 className="mb-4 text-xl font-black uppercase tracking-[-0.025em]">{title}</h3><p className="text-sm leading-relaxed text-zinc-500">{body}</p></article>;
}

function Requirement({ icon, text }: { icon: ReactNode; text: string }) {
  return <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-4 text-sm font-bold text-zinc-300"><span className="text-emerald-400">{icon}</span>{text}</div>;
}

export default JimWasRecorder;
