import React from 'react';
import {
  AudioWaveform,
  ArrowDown,
  BellRing,
  Earth,
  Headphones,
  Heart,
  Mic2,
  Radio,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
  UsersRound,
} from 'lucide-react';

const features = [
  {
    icon: <Mic2 size={25} />,
    label: 'Capture',
    title: 'Record the world as it happens.',
    body: 'Walk, listen, and capture an ambient sound signal with its place and moment attached.',
  },
  {
    icon: <Earth size={25} />,
    label: 'Map',
    title: 'Turn Earth into a living soundboard.',
    body: 'Every public signal becomes a discoverable point on the globe using a privacy-protected location.',
  },
  {
    icon: <Headphones size={25} />,
    label: 'Listen',
    title: 'Hear somewhere else right now.',
    body: 'Explore streets, forests, cafés, storms, stations, and cities through the people standing there.',
  },
  {
    icon: <UsersRound size={25} />,
    label: 'Connect',
    title: 'Follow the ears you trust.',
    body: 'Build a profile, follow field recordists, react, comment, save signals, and return for the next transmission.',
  },
];

const feedModes = [
  ['LATEST', 'Fresh public recordings, newest first.'],
  ['TRENDING', 'Signals rising through reactions, comments, and recency.'],
  ['FOLLOWING', 'New recordings from creators you follow.'],
  ['NEARBY', 'The closest sounds to your current location.'],
];

const SoundsOfEarth: React.FC = () => {
  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = 'Sounds of Earth | Hear the World';
    if (description) {
      description.content = 'Record the sounds around you, place them on a global map, and listen to public signals shared from across Earth.';
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#02030a] text-white selection:bg-fuchsia-500 selection:text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-cyan-300/15 bg-[#02030a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="/sounds-of-earth/" className="flex items-center gap-3">
            <img src="/sounds-of-earth/app-icon.png" alt="" className="h-10 w-10 rounded-[10px] shadow-[0_0_24px_rgba(34,211,238,.2)]" />
            <span className="text-sm font-black tracking-[0.12em] uppercase sm:text-base">Sounds <span className="text-cyan-300">of Earth</span></span>
          </a>
          <div className="hidden items-center gap-7 text-xs font-bold tracking-[0.16em] uppercase md:flex">
            <a href="#how-it-works" className="text-zinc-400 hover:text-cyan-300">How it works</a>
            <a href="#discover" className="text-zinc-400 hover:text-fuchsia-300">Discover</a>
            <a href="/sounds-of-earth/support" className="text-zinc-400 hover:text-cyan-300">Support</a>
            <span className="border border-fuchsia-400/35 bg-fuchsia-400/10 px-4 py-2 text-fuchsia-300">App Store soon</span>
          </div>
          <a href="#listen" aria-label="Explore Sounds of Earth" className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 text-cyan-300 md:hidden">
            <ArrowDown size={18} />
          </a>
        </div>
      </nav>

      <main>
        <section className="relative min-h-screen px-5 pb-20 pt-32 md:px-8 md:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(34,211,238,.19),transparent_30%),radial-gradient(circle_at_75%_20%,rgba(217,70,239,.16),transparent_33%),radial-gradient(circle_at_55%_85%,rgba(124,58,237,.15),transparent_32%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.13)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.04fr_.96fr]">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 border border-emerald-300/30 bg-emerald-300/5 px-3 py-2 font-mono text-[10px] font-black tracking-[0.24em] text-emerald-300 uppercase">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Earth:// cloud live
              </div>
              <h1 className="max-w-4xl text-[clamp(4.3rem,10vw,8.7rem)] font-black leading-[0.76] tracking-[-0.075em] uppercase">
                Hear<br />the <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">world.</span>
              </h1>
              <p className="mt-9 max-w-2xl font-mono text-base leading-8 text-zinc-300 md:text-xl">
                Record the sounds around you. Plot them on a global map. Let anyone, anywhere, tune into what a place actually sounds like.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-3 bg-cyan-300 px-7 py-4 text-sm font-black tracking-[0.15em] text-black uppercase transition hover:bg-white">
                  <AudioWaveform size={20} /> Explore the network
                </a>
                <div className="inline-flex items-center justify-center gap-3 border border-fuchsia-400/35 bg-fuchsia-400/10 px-7 py-4 text-sm font-black tracking-[0.15em] text-fuchsia-300 uppercase">
                  <Sparkles size={18} /> App Store release in progress
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                <span>● Audio-first</span><span>● Global map</span><span>● Human signals</span><span>● Privacy protected</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-cyan-400/20 via-transparent to-fuchsia-500/20 blur-3xl" />
              <div className="relative mx-auto w-[68%] rotate-[3deg] rounded-[42px] border border-white/20 bg-[#11131d] p-2 shadow-[0_35px_120px_rgba(0,0,0,.8),0_0_45px_rgba(34,211,238,.14)]">
                <div className="overflow-hidden rounded-[35px] bg-[#050713]">
                  <img src="/sounds-of-earth/globe-screen.png" alt="Sounds of Earth global signal map on iPhone" className="-mt-[4.6%] block h-auto w-full" />
                </div>
              </div>
              <div className="absolute -left-2 top-[28%] border border-cyan-300/25 bg-[#060812]/90 px-4 py-3 font-mono text-[10px] tracking-widest text-cyan-300 shadow-xl backdrop-blur-md sm:left-0">
                13.3342° N<br /><span className="text-zinc-500">SIGNAL DETECTED</span>
              </div>
              <div className="absolute -right-1 bottom-[18%] border border-fuchsia-400/25 bg-[#060812]/90 px-4 py-3 font-mono text-[10px] tracking-widest text-fuchsia-300 shadow-xl backdrop-blur-md sm:right-0">
                ▶ LIVE AUDIO<br /><span className="text-zinc-500">EARTH CHANNEL</span>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-white/10 bg-[#060712] px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-black tracking-[0.28em] text-cyan-300 uppercase">01 // The signal path</p>
              <h2 className="mt-5 text-4xl font-black leading-none uppercase md:text-7xl">A planet you can listen to.</h2>
            </div>
            <div className="mt-16 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <article key={feature.label} className="group bg-[#060712] p-7 transition hover:bg-cyan-300/[0.04] md:p-9">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300">{feature.icon}</span>
                    <span className="font-mono text-xs text-zinc-700">0{index + 1}</span>
                  </div>
                  <p className="mt-10 font-mono text-[10px] font-black tracking-[0.24em] text-fuchsia-400 uppercase">{feature.label}</p>
                  <h3 className="mt-4 text-2xl font-black leading-tight normal-case">{feature.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-zinc-400">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="discover" className="relative px-5 py-24 md:px-8 md:py-36">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(217,70,239,.12),transparent_55%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div className="order-2 mx-auto w-full max-w-[620px] lg:order-1">
              <div className="grid grid-cols-[.8fr_1fr] items-center gap-4 sm:gap-7">
                <div className="rotate-[-4deg] rounded-[30px] border border-cyan-300/20 bg-[#11131d] p-1.5 shadow-2xl">
                  <div className="overflow-hidden rounded-[25px]"><img src="/sounds-of-earth/globe-screen.png" alt="Global map of public sounds" className="-mt-[4.6%] w-full" /></div>
                </div>
                <div className="rotate-[3deg] rounded-[35px] border border-fuchsia-400/20 bg-[#11131d] p-1.5 shadow-2xl">
                  <div className="overflow-hidden rounded-[29px]"><img src="/sounds-of-earth/profile-screen.png" alt="Sounds of Earth creator profile and recording" className="-mt-[4.6%] w-full" /></div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-mono text-xs font-black tracking-[0.28em] text-fuchsia-400 uppercase">02 // Discovery engine</p>
              <h2 className="mt-5 text-4xl font-black leading-none uppercase md:text-7xl">Find your next frequency.</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">Search places, signals, tags, and creators—or let the network surface something unexpected.</p>
              <div className="mt-10 space-y-3">
                {feedModes.map(([title, body]) => (
                  <div key={title} className="grid gap-2 border-l-2 border-cyan-300/30 bg-white/[0.025] px-5 py-4 sm:grid-cols-[120px_1fr]">
                    <span className="font-mono text-xs font-black tracking-wider text-cyan-300">{title}</span>
                    <span className="text-sm text-zinc-400">{body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="listen" className="border-y border-white/10 bg-gradient-to-br from-cyan-400/[0.07] via-[#060712] to-fuchsia-500/[0.08] px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <p className="font-mono text-xs font-black tracking-[0.28em] text-cyan-300 uppercase">03 // A real social network</p>
                <h2 className="mt-5 text-4xl font-black leading-none uppercase md:text-7xl">People connected by place and sound.</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  [<UserRoundPlus />, 'Creator profiles', 'Build an identity around the places and moments you capture.'],
                  [<Heart />, 'Reactions & comments', 'Respond to a signal and join the conversation around it.'],
                  [<BellRing />, 'Activity', 'Know when someone follows, reacts, or comments.'],
                  [<ShieldCheck />, 'Safety controls', 'Report harmful content, block accounts, and manage your network.'],
                ].map(([icon, title, body]) => (
                  <article key={String(title)} className="border border-white/10 bg-black/25 p-6">
                    <div className="text-fuchsia-300">{icon}</div>
                    <h3 className="mt-5 text-lg font-black">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-5 py-28 text-center md:px-8 md:py-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.15),transparent_38%)]" />
          <div className="relative mx-auto max-w-4xl">
            <img src="/sounds-of-earth/app-icon.png" alt="Sounds of Earth app icon" className="mx-auto h-28 w-28 rounded-[27px] shadow-[0_0_60px_rgba(217,70,239,.28)] md:h-36 md:w-36 md:rounded-[34px]" />
            <p className="mt-10 font-mono text-xs font-black tracking-[0.28em] text-fuchsia-300 uppercase">The planet is transmitting</p>
            <h2 className="mt-5 text-5xl font-black leading-[0.9] uppercase md:text-8xl">What does your world sound like?</h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">Sounds of Earth is preparing for its App Store release. The first public signals are already waiting to be heard.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <span className="inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-sm font-black tracking-[0.15em] text-black uppercase"><Radio size={19} /> Coming to iPhone</span>
              <a href="/sounds-of-earth/support" className="inline-flex items-center justify-center gap-3 border border-cyan-300/30 px-8 py-4 text-sm font-black tracking-[0.15em] text-cyan-300 uppercase hover:bg-cyan-300/10">Get support</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-black tracking-[0.14em] uppercase">Sounds <span className="text-cyan-300">of Earth</span></p>
            <p className="mt-2 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">© 2026 James Louis Washkau Jr.</p>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-xs tracking-wider text-zinc-500 uppercase">
            <a href="/" className="hover:text-white">JimWashkau.com</a>
            <a href="/sounds-of-earth/privacy" className="hover:text-cyan-300">Privacy</a>
            <a href="/sounds-of-earth/support" className="hover:text-fuchsia-300">Support</a>
            <a href="mailto:support@jimwashkau.com" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SoundsOfEarth;
