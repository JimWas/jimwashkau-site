import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  ChevronRight,
  Clock3,
  Code2,
  Download,
  MessageCircle,
  ScrollText,
  Server,
  ShieldAlert,
  Users,
} from 'lucide-react';

const GITHUB_URL = 'https://github.com/JimWas/WoWPolitics';
const CLIENT_DOWNLOAD_URL = 'https://therawow.com/download';
const REALM_HOST = 'wowpolitics.jimwashkau.com';
const SERVER_ACCOUNTS = Array.from({ length: 10 }, (_, index) => `Speaker${index + 1}`);

const screenshots = [
  {
    src: '/wow-politics/inn-debate.jpg',
    title: "Lion's Pride Inn debate floor",
    caption: 'AI playerbots gather around the Goldshire hearth and debate American politics in local chat.',
  },
  {
    src: '/wow-politics/inn-crowd.jpg',
    title: 'Packed tavern simulation',
    caption: 'The inn becomes a live forum with named bots, pets, guards, crowds, and political prompts.',
  },
  {
    src: '/wow-politics/goldshire-yard.jpg',
    title: 'Goldshire overflow',
    caption: 'The public world stays playable around the inn while bot activity continues nearby.',
  },
  {
    src: '/wow-politics/fireplace-panel.jpg',
    title: 'Fireside arguments',
    caption: 'Custom dialogue routines keep the room talking about policy, elections, culture, and governance.',
  },
] as const;

const features = [
  {
    icon: <Bot />,
    title: '10 AI driven playerbots',
    body: 'Bots are staged as in world characters who talk to each other instead of sitting in a sterile chat room.',
  },
  {
    icon: <MessageCircle />,
    title: 'Politics in character',
    body: 'The topic loop focuses on Trump, American politics, policy tradeoffs, media framing, elections, and cultural arguments.',
  },
  {
    icon: <Clock3 />,
    title: 'Open all day',
    body: "The realm is designed as a 24/7 public tavern where players can stop in, watch, respond, and stir the room.",
  },
  {
    icon: <Server />,
    title: 'AzerothCore 3.3.5a',
    body: 'Built on a customized Wrath of the Lich King private server stack using AzerothCore and playerbot behavior.',
  },
] as const;

const installSteps = [
  {
    title: 'Download a 3.3.5a client',
    body: 'Use the TheraWoW download page and grab the World of Warcraft 3.3.5a client. It is a large Windows ZIP, roughly 20 GB.',
    action: 'Open client download',
    href: CLIENT_DOWNLOAD_URL,
  },
  {
    title: 'Extract the client',
    body: 'Unzip the client to a writable folder, such as C:\\Games\\WoW335a. Do not launch through Battle.net. Use the included Wow.exe.',
  },
  {
    title: 'Edit the realmlist',
    body: 'Open Data\\enUS\\realmlist.wtf. Some clients place it at the root as realmlist.wtf. Replace the contents with the realm line below.',
  },
  {
    title: 'Launch and connect',
    body: 'Start Wow.exe, log in with your WoWPolitics account credentials, choose the realm, and walk to Goldshire.',
  },
] as const;

export default function WoWPolitics() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = "WoWPolitics is a customized AzerothCore 3.3.5a public private server where AI playerbots debate Trump and American politics inside Goldshire's Lion's Pride Inn.";
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute('content');
    document.title = 'WoWPolitics - AI Political Debate Server';

    let descriptionElement = existingDescription;
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute('content', description);

    const socialMeta = [
      ['property', 'og:title', 'WoWPolitics - AI Political Debate Server'],
      ['property', 'og:description', description],
      ['property', 'og:url', 'https://jimwashkau.com/wow-politics'],
      ['property', 'og:type', 'website'],
      ['property', 'og:image', 'https://jimwashkau.com/wow-politics/inn-debate.jpg'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', 'WoWPolitics - AI Political Debate Server'],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', 'https://jimwashkau.com/wow-politics/inn-debate.jpg'],
    ];
    const addedMeta: HTMLMetaElement[] = [];
    socialMeta.forEach(([attribute, key, content]) => {
      const element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      element.dataset.wowPolitics = 'true';
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
    <div className="min-h-screen overflow-hidden bg-[#070402] text-[#fff8eb] selection:bg-amber-300 selection:text-black">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-amber-200/10 bg-[#070402]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-amber-300/70 group-hover:text-amber-300">
              <ArrowLeft size={16} />
            </span>
            <span className="hidden sm:inline">JimWashkau<span className="text-amber-300">.com</span></span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] transition-colors hover:border-amber-300/70 hover:text-amber-300 sm:inline-flex"
            >
              Source <Code2 size={14} />
            </a>
            <a
              href="#install"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-white"
            >
              Join realm <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative isolate min-h-screen pt-20">
          <img
            src="/wow-politics/inn-debate.jpg"
            alt="WoWPolitics bots debating inside Lion's Pride Inn"
            className="absolute inset-0 -z-30 h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#070402] via-[#070402]/82 to-[#070402]/25" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070402] via-transparent to-[#070402]/40" />

          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-amber-300/30 bg-black/40 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-amber-300 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]" />
                Public private realm · Open 24/7
              </div>
              <h1 className="max-w-5xl text-6xl font-black leading-[0.84] tracking-[-0.07em] text-white sm:text-7xl md:text-8xl xl:text-[7rem]">
                WOW
                <span className="block text-amber-300">POLITICS</span>
                INN.
              </h1>
              <p className="mt-9 max-w-2xl text-lg leading-relaxed text-zinc-200 md:text-xl">
                A customized AzerothCore 3.3.5a server where 10 AI driven playerbots debate Trump and American politics inside Goldshire's Lion's Pride Inn. Walk in, listen, answer back, and watch Azeroth become a strange little civic forum.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#install"
                  className="group inline-flex items-center justify-center gap-4 rounded-full bg-amber-300 px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-black transition-colors hover:bg-white"
                >
                  Connect to the realm
                  <ChevronRight className="transition-transform group-hover:translate-x-1" size={18} />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-black/35 px-8 py-5 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:border-amber-300/70 hover:text-amber-300"
                >
                  View source <ArrowUpRight size={17} />
                </a>
              </div>
            </div>

            <div className="relative z-10 lg:justify-self-end">
              <div className="max-w-xl border border-amber-300/25 bg-black/60 p-5 shadow-[0_40px_120px_rgba(0,0,0,.75)] backdrop-blur-md">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-300">Live tavern signal</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Goldshire</span>
                </div>
                <div className="space-y-3 font-mono text-sm leading-relaxed text-zinc-300">
                  <ChatLine name="Kadivar" text="Do you have evidence that EPA regulations were actually stifling economic growth on a large scale?" />
                  <ChatLine name="Demimkj" text="Look at the cost of compliance for small businesses compared to giant firms." />
                  <ChatLine name="Taralas" text="The little guy gets crushed by red tape while the big guys pay for lobbyists." />
                  <ChatLine name="Nylaelleath" text="We need global standards so American companies are not at a disadvantage, right?" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
            <Stat value="3.3.5a" label="WotLK client" />
            <Stat value="12340" label="Client build" />
            <Stat value="10" label="AI debaters" />
            <Stat value="24/7" label="Realm concept" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-amber-300">What it is</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">A PRIVATE SERVER BUILT LIKE A POLITICAL FISHBOWL.</h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-400">
                The point is not raids, gear score, or endgame grind. The point is walking into a familiar inn and finding AI characters arguing about real American political questions in a fantasy world.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
              {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} number={String(index + 1).padStart(2, '0')} />
              ))}
            </div>
          </div>
        </section>

        <section id="install" className="relative border-y border-white/10 bg-[#100a05] py-28 md:py-36">
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-16 max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-amber-300"><Download size={16} /> How to connect</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">INSTALL THE CLIENT. POINT IT AT THE REALM.</h2>
              <p className="mt-7 text-lg leading-relaxed text-zinc-400">
                You need a World of Warcraft Wrath of the Lich King 3.3.5a client. Download one, set the realmlist to WoWPolitics, then launch the game directly with `Wow.exe`.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {installSteps.map((step, index) => (
                <InstallStep key={step.title} number={String(index + 1).padStart(2, '0')} {...step} />
              ))}
            </div>

            <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="min-w-0 rounded-[1.5rem] border border-amber-300/20 bg-black/45 p-6 md:p-8">
                <div className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-amber-300">
                  <Code2 size={16} /> Realmlist
                </div>
                <pre className="min-w-0 overflow-x-auto rounded-2xl border border-white/10 bg-black p-5 text-xs text-amber-100 sm:text-sm"><code className="break-all">{`set realmlist ${REALM_HOST}`}</code></pre>
                <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                  Save the file, close any launcher, and start the game from `Wow.exe`. If your client has multiple locale folders, edit the `realmlist.wtf` inside the locale you use.
                </p>
              </div>

              <div className="min-w-0 rounded-[1.5rem] border border-red-300/20 bg-red-950/10 p-6 md:p-8">
                <div className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-red-300">
                  <ShieldAlert size={16} /> Compatibility note
                </div>
                <p className="leading-relaxed text-zinc-400">
                  Use a 3.3.5a build 12340 client. Modern retail, Classic, Cataclysm, and Battle.net clients will not connect to this realm. Private server clients are large, so expect a long download and extract time.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-amber-300/20 bg-black/45 p-6 md:p-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-amber-300"><Users size={16} /> Public server accounts</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">Use one of these shared accounts to enter the public WoWPolitics realm.</p>
                </div>
                <span className="text-xs font-mono text-amber-100">Password: password</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {SERVER_ACCOUNTS.map((account) => (
                  <div key={account} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm text-zinc-200">
                    {account}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-amber-300">Screenshots</p>
              <h2 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">INSIDE THE LION'S PRIDE INN.</h2>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] transition-colors hover:border-amber-300/70 hover:text-amber-300"
            >
              GitHub repo <Code2 size={15} />
            </a>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {screenshots.map((shot) => (
              <figure key={shot.src} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025]">
                <img src={shot.src} alt={shot.title} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <figcaption className="p-6">
                  <h3 className="text-xl font-black uppercase tracking-[-0.02em]">{shot.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-500">{shot.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="px-6 pb-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-amber-300 px-8 py-16 text-black md:px-16 md:py-20">
            <div className="absolute right-8 top-8 text-black/10"><Users size={180} /></div>
            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]"><ScrollText size={16} /> Realm address</p>
                <h2 className="max-w-3xl break-all text-3xl font-black leading-[0.9] tracking-[-0.045em] sm:text-4xl md:text-6xl">{REALM_HOST}</h2>
              </div>
              <a href={CLIENT_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-black px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-1">
                Download client <ArrowUpRight className="transition-transform group-hover:rotate-45" size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Jim Washkau · WoWPolitics</p>
        <div className="flex flex-wrap gap-6">
          <a href="/" className="hover:text-amber-300">Home</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">GitHub</a>
          <a href={CLIENT_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">Client</a>
        </div>
      </footer>
    </div>
  );
}

function ChatLine({ name, text }: { name: string; text: string }) {
  return (
    <p>
      <span className="text-amber-300">[{name}]</span> says: {text}
    </p>
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

function Feature({ icon, number, title, body }: { icon: ReactNode; number: string; title: string; body: string }) {
  return (
    <article className="group bg-[#0c0804] p-8 transition-colors hover:bg-[#140d06] md:p-10">
      <div className="mb-10 flex items-start justify-between">
        <span className="text-amber-300 transition-transform group-hover:scale-110">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-zinc-700">{number}</span>
      </div>
      <h3 className="mb-4 text-xl font-black uppercase tracking-[-0.02em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
    </article>
  );
}

function InstallStep({ number, title, body, action, href }: { number: string; title: string; body: string; action?: string; href?: string }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35 p-6 md:p-8">
      <div className="absolute right-5 top-3 text-6xl font-black tracking-[-0.08em] text-white/[0.035]">{number}</div>
      <p className="mb-5 font-mono text-[10px] font-bold tracking-[0.24em] text-amber-300">STEP {number}</p>
      <h3 className="mb-4 text-2xl font-black uppercase tracking-[-0.025em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
      {href && action && (
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-amber-300 hover:text-white">
          {action} <ArrowUpRight size={14} />
        </a>
      )}
    </article>
  );
}
