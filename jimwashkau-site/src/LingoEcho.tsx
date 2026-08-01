import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronRight,
  Download,
  Globe2,
  Headphones,
  Languages,
  MapPinned,
  MessageSquareText,
  Mic2,
  Plane,
  Plus,
  Search,
  Sparkles,
  Star,
  Volume2,
  WifiOff,
} from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/lingo-echo/id6759366510';

const phraseTiles = [
  ['Excuse me', 'Perdon', 'Spanish'],
  ['How much?', 'Combien?', 'French'],
  ['Thank you', 'Arigato', 'Japanese'],
  ['No spicy', 'Mai phet', 'Thai'],
  ['Where is?', 'Où est?', 'French'],
  ['Help me', 'Tasukete', 'Japanese'],
] as const;

const features = [
  {
    icon: <Mic2 />,
    eyebrow: 'Your voice',
    title: 'Record the phrases you actually say.',
    body: 'Save key travel lines in your own voice, then tap once to play them back when a conversation gets noisy, fast, or stressful.',
  },
  {
    icon: <Volume2 />,
    eyebrow: 'Pronunciation help',
    title: 'Hear it before you say it.',
    body: 'Built-in text-to-speech and pronunciation support help you practice a phrase before it matters in the real world.',
  },
  {
    icon: <Bookmark />,
    eyebrow: 'Quick phrases',
    title: 'Keep favorites close.',
    body: 'Pin your most-used lines into a quick strip so one-handed travel moments do not turn into menu hunting.',
  },
  {
    icon: <Plus />,
    eyebrow: 'Custom lines',
    title: 'Add the phrase the guidebook forgot.',
    body: 'Create your own phrases and translations for routes, hotels, food preferences, accessibility needs, or local errands.',
  },
  {
    icon: <WifiOff />,
    eyebrow: 'Offline-friendly',
    title: 'Useful when the signal disappears.',
    body: 'Local phrase data keeps the core phrasebook available on the go, including travel days when roaming data is unreliable.',
  },
  {
    icon: <Languages />,
    eyebrow: 'Phrase packs',
    title: 'Built for multilingual travel.',
    body: 'Includes packs across English, Spanish, French, German, Italian, Russian, Japanese, Korean, Vietnamese, Cambodian, Thai, Lao, and more.',
  },
] as const;

const travelMoments = [
  'Taxi directions',
  'Food allergies',
  'Hotel check-in',
  'Market prices',
  'Train stations',
  'Local greetings',
  'Medical basics',
  'Lost items',
] as const;

function LingoEcho() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = 'Lingo Echo is an offline-friendly iPhone travel phrasebook and soundboard for recording, saving, and replaying phrases in your own voice.';
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute('content');
    document.title = 'Lingo Echo — Travel Phrase Soundboard for iPhone';

    let descriptionElement = existingDescription;
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute('content', description);

    const socialMeta = [
      ['property', 'og:title', 'Lingo Echo — Travel Phrase Soundboard for iPhone'],
      ['property', 'og:description', description],
      ['property', 'og:url', 'https://jimwashkau.com/LingoEcho'],
      ['property', 'og:type', 'website'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', 'Lingo Echo — Travel Phrase Soundboard for iPhone'],
      ['name', 'twitter:description', description],
    ];
    const addedMeta: HTMLMetaElement[] = [];
    socialMeta.forEach(([attribute, key, content]) => {
      const element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      element.dataset.lingoEcho = 'true';
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
    <div className="min-h-screen overflow-hidden bg-[#050509] text-white selection:bg-fuchsia-300 selection:text-black">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050509]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/apps" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-fuchsia-300/60 group-hover:text-fuchsia-300">
              <ArrowLeft size={16} />
            </span>
            <span className="hidden sm:inline">JimWashkau<span className="text-fuchsia-300">.com</span></span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 md:inline">Available for iPhone</span>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-fuchsia-300"
            >
              Get the app <Download size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative isolate min-h-screen pt-20">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_73%_24%,rgba(217,70,239,0.15),transparent_30%),radial-gradient(circle_at_10%_88%,rgba(45,212,191,0.12),transparent_28%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.03fr_0.97fr]">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-fuchsia-300/25 bg-fuchsia-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300 shadow-[0_0_14px_rgba(94,234,212,.9)]" />
                Travel phrasebook · Voice soundboard
              </div>
              <h1 className="max-w-4xl text-6xl font-black leading-[0.84] tracking-[-0.07em] sm:text-7xl md:text-8xl xl:text-[7.25rem]">
                SPEAK WITH
                <span className="block text-fuchsia-300">YOUR OWN</span>
                ECHO.
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                Lingo Echo turns your iPhone into a fast travel phrase soundboard. Record essential lines in your own voice, save favorites, and play or practice phrases when the conversation needs to move.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-4 rounded-full bg-fuchsia-300 px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-white"
                >
                  Download on the App Store
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
                </a>
                <a
                  href="#travel-mode"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:border-white/50"
                >
                  See travel mode <ChevronRight size={17} />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                <span className="flex items-center gap-2"><Check className="text-fuchsia-300" size={14} /> Record & replay</span>
                <span className="flex items-center gap-2"><Check className="text-fuchsia-300" size={14} /> Offline-friendly</span>
                <span className="flex items-center gap-2"><Check className="text-fuchsia-300" size={14} /> Custom phrases</span>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[580px] justify-center lg:justify-end">
              <div className="absolute left-0 top-[18%] hidden w-48 rounded-2xl border border-white/10 bg-black/70 p-5 shadow-2xl backdrop-blur-xl sm:block lg:-left-7">
                <div className="mb-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                  Quick phrases <Star className="text-fuchsia-300" size={15} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Taxi', 'Food', 'Hotel'].map((item) => (
                    <span key={item} className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-[10px] font-black text-fuchsia-100">{item}</span>
                  ))}
                </div>
                <p className="mt-4 text-xs font-bold text-zinc-200">Favorites stay one tap away.</p>
              </div>

              <PhoneMockup />

              <div className="absolute -bottom-6 right-0 w-52 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-2xl backdrop-blur-xl sm:right-[-1rem]">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-300/15 text-teal-300"><Headphones size={17} /></span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Practice mode</p>
                    <p className="text-sm font-black">LISTEN · RECORD · REPLAY</p>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-400">Hear pronunciation help, then answer with your own saved voice.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
            <Stat value="13+" label="Language packs" />
            <Stat value="4+" label="Age rating" />
            <Stat value="6.2 MB" label="App size" />
            <Stat value="$4.99" label="Premium unlock" />
          </div>
        </section>

        <section id="travel-mode" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-fuchsia-300">Built for the conversation</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">A PHRASEBOOK THAT TALKS BACK.</h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-400">
                Translation apps are great until you are juggling bags, traffic noise, spotty data, and a phrase you need right now. Lingo Echo keeps the essentials tactile and fast.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
              {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} number={String(index + 1).padStart(2, '0')} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/10 bg-[#090711] py-28 md:py-36">
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-teal-300">
                <Plane size={16} /> Real travel pressure
              </div>
              <h2 className="max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">BUILT FOR THE MOMENT BETWEEN CONFUSION AND CLARITY.</h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">
                Create a small set of phrases for the country, city, or errand in front of you. Then tap, play, point, repeat, and keep moving.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {travelMoments.map((moment, index) => (
                <div key={moment} className={`min-h-32 rounded-2xl border p-5 transition-colors hover:border-fuchsia-300/40 ${index === 0 || index === 3 ? 'border-fuchsia-300/30 bg-fuchsia-300/10 sm:col-span-2' : 'border-white/10 bg-black/25'}`}>
                  <span className="mb-8 block font-mono text-[10px] text-zinc-600">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm font-black uppercase tracking-wide">{moment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="mb-16 max-w-2xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-fuchsia-300">From idea to spoken phrase</p>
            <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">THREE STEPS TO A BETTER TRAVEL MOMENT.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Step icon={<Search />} number="01" title="Find or add a line" body="Use built-in phrase packs, search for a travel need, or create the exact phrase your trip requires." />
            <Step icon={<Mic2 />} number="02" title="Record your echo" body="Save the phrase in your own voice so it feels personal, clear, and familiar when you replay it." />
            <Step icon={<MessageSquareText />} number="03" title="Tap when it matters" body="Play the phrase, use pronunciation help, or keep favorites ready for quick one-handed communication." />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-28">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-fuchsia-300/20 bg-fuchsia-300/[0.045] p-8 md:p-12">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-fuchsia-300 text-black"><Globe2 size={20} /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-300">Supported packs</p>
                  <p className="mt-1 text-sm text-zinc-500">Travel vocabulary for real routes</p>
                </div>
              </div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-5xl">SPANISH TO LAO. RESTAURANTS TO RIDESHARES.</h2>
              <div className="mt-9 flex flex-wrap gap-3">
                {['English', 'Spanish', 'French', 'German', 'Italian', 'Russian', 'Japanese', 'Korean', 'Vietnamese', 'Cambodian', 'Thai', 'Lao'].map((language) => (
                  <span key={language} className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-300">{language}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#0c0a12] p-8 md:p-12">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-zinc-300"><Sparkles size={20} /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">What premium unlocks</p>
                  <p className="mt-1 text-sm text-zinc-500">More packs, fewer interruptions</p>
                </div>
              </div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-5xl">EXTRA PACKS. ADS REMOVED.</h2>
              <ul className="mt-9 space-y-5 text-sm leading-relaxed text-zinc-400">
                <li className="flex gap-3"><Check className="mt-0.5 shrink-0 text-teal-300" size={18} /> Free download from the App Store.</li>
                <li className="flex gap-3"><Check className="mt-0.5 shrink-0 text-teal-300" size={18} /> Optional LingoEcho Premium unlock listed at $4.99.</li>
                <li className="flex gap-3"><Check className="mt-0.5 shrink-0 text-teal-300" size={18} /> Designed for iPhone and categorized for Travel.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 pb-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-fuchsia-300 px-8 py-16 text-black md:px-16 md:py-20">
            <div className="absolute -right-10 -top-20 h-80 w-80 rounded-full border-[50px] border-black/5" />
            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]"><MapPinned size={16} /> The next conversation is closer than it looks</p>
                <h2 className="max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.055em] md:text-7xl">SAVE THE PHRASE BEFORE YOU NEED IT.</h2>
              </div>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-black px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-1">
                Get Lingo Echo <ArrowUpRight className="transition-transform group-hover:rotate-45" size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Jim Washkau · Lingo Echo</p>
        <div className="flex flex-wrap gap-6">
          <a href="/apps" className="hover:text-fuchsia-300">All apps</a>
          <a href="/support" className="hover:text-fuchsia-300">Support</a>
          <a href="/privacy" className="hover:text-fuchsia-300">Privacy</a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-300">App Store</a>
        </div>
      </footer>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative rotate-[2deg] rounded-[3.2rem] border border-white/20 bg-[#15101b] p-2.5 shadow-[0_50px_120px_rgba(0,0,0,.78),0_0_80px_rgba(217,70,239,.1)]">
      <div className="pointer-events-none absolute left-1/2 top-5 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-[610px] w-[282px] overflow-hidden rounded-[2.7rem] bg-[#f7f2ff] text-[#19101f] sm:h-[680px] sm:w-[314px]">
        <div className="bg-gradient-to-br from-[#7c3aed] via-[#db2777] to-[#14b8a6] px-6 pb-6 pt-16 text-white">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/65">Lingo Echo</p>
              <h3 className="mt-2 text-3xl font-black leading-none tracking-[-0.04em]">Travel Phrases</h3>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/18 backdrop-blur">
              <Languages size={24} />
            </span>
          </div>
          <div className="rounded-2xl bg-white/18 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
              <span>Now recording</span>
              <span>00:07</span>
            </div>
            <div className="flex h-12 items-end gap-1.5">
              {[28, 40, 20, 48, 34, 56, 24, 44, 30, 52, 22, 38, 46, 26].map((height, index) => (
                <span key={index} className="w-full rounded-full bg-white" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="mb-4 flex gap-2 overflow-hidden">
            {['Favorites', 'Food', 'Taxi'].map((tab, index) => (
              <span key={tab} className={`rounded-full px-4 py-2 text-[11px] font-black ${index === 0 ? 'bg-[#19101f] text-white' : 'bg-[#ede3f6] text-[#5b4a66]'}`}>{tab}</span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {phraseTiles.map(([english, phrase, language], index) => (
              <div key={`${english}-${phrase}`} className={`rounded-3xl p-4 shadow-sm ${index === 0 ? 'bg-[#19101f] text-white' : 'bg-white text-[#1c1424]'}`}>
                <p className="mb-4 text-[9px] font-black uppercase tracking-[0.18em] opacity-50">{language}</p>
                <p className="text-sm font-black">{english}</p>
                <p className={`mt-1 text-xs ${index === 0 ? 'text-fuchsia-100' : 'text-[#76657f]'}`}>{phrase}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`grid h-8 w-8 place-items-center rounded-full ${index === 0 ? 'bg-fuchsia-300 text-black' : 'bg-[#f3edf8] text-[#7c3aed]'}`}>
                    <Volume2 size={14} />
                  </span>
                  <span className="text-[10px] font-black opacity-45">PLAY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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

function Feature({ icon, eyebrow, number, title, body }: { icon: ReactNode; eyebrow: string; number: string; title: string; body: string }) {
  return (
    <article className="group bg-[#090711] p-8 transition-colors hover:bg-[#100b18] md:p-10">
      <div className="mb-10 flex items-start justify-between">
        <span className="text-fuchsia-300 transition-transform group-hover:scale-110">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-zinc-700">{number}</span>
      </div>
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-teal-300">{eyebrow}</p>
      <h3 className="mb-4 text-xl font-black uppercase tracking-[-0.02em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
    </article>
  );
}

function Step({ icon, number, title, body }: { icon: ReactNode; number: string; title: string; body: string }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-8 md:p-10">
      <div className="absolute right-6 top-3 text-7xl font-black tracking-[-0.08em] text-white/[0.025]">{number}</div>
      <div className="mb-16 grid h-12 w-12 place-items-center rounded-full bg-fuchsia-300 text-black">{icon}</div>
      <p className="mb-3 font-mono text-[10px] font-bold tracking-[0.24em] text-fuchsia-300">STEP {number}</p>
      <h3 className="mb-4 text-2xl font-black uppercase tracking-[-0.025em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
    </article>
  );
}

export default LingoEcho;
