import React from 'react';
import {
  BellRing,
  ChevronRight,
  CircleUserRound,
  CloudUpload,
  Flag,
  Headphones,
  Home,
  KeyRound,
  Mail,
  Map,
  Mic2,
  ShieldCheck,
  Trash2,
} from 'lucide-react';

const faqs = [
  {
    icon: <KeyRound size={21} />,
    question: 'I cannot create an account or sign in. What should I try?',
    answer: 'Confirm you have an internet connection, install the newest app version, and try again. For Sign in with Apple, make sure you are signed into iCloud and have two-factor authentication enabled. If the problem continues, email support with the exact error message—never send your password or Apple credentials.',
  },
  {
    icon: <Mic2 size={21} />,
    question: 'Why can’t I record a sound?',
    answer: 'Open iOS Settings, find Sounds of Earth, and enable Microphone and Location access. Return to the app and try a short recording. Location is used to map the sound and support Nearby discovery.',
  },
  {
    icon: <CloudUpload size={21} />,
    question: 'My recording will not upload.',
    answer: 'Keep the app open while publishing and confirm you have a stable connection. Try a shorter recording or switch between Wi-Fi and cellular data. Your unpublished recording may remain on the device so you can retry.',
  },
  {
    icon: <Headphones size={21} />,
    question: 'A sound appears, but it will not play.',
    answer: 'Check the device volume and silent-mode settings, then tap play again on a stable connection. If only one signal fails, report the recording or email its title and creator username to support.',
  },
  {
    icon: <Map size={21} />,
    question: 'Why is a public pin not at the exact recording coordinate?',
    answer: 'Public map pins use a privacy-protected approximate coordinate. The app keeps the protected capture coordinate from being exposed through the public feed while still allowing people to discover the general place where a sound was recorded.',
  },
  {
    icon: <CircleUserRound size={21} />,
    question: 'How do I update my profile photo, name, or bio?',
    answer: 'Open Profile, choose Edit Profile, make your changes, and save. If a new avatar does not appear immediately, pull to refresh or reopen the profile after the upload completes.',
  },
  {
    icon: <BellRing size={21} />,
    question: 'How do I manage notifications?',
    answer: 'Use the app notification settings when available, or open iOS Settings → Notifications → Sounds of Earth. You can enable or disable alerts without deleting your account.',
  },
  {
    icon: <Flag size={21} />,
    question: 'How do I report content or block someone?',
    answer: 'Open the recording or creator profile and use its menu to Report or Block. Reports are reviewed for violations of the Community Guidelines. Blocking hides that account’s content and interactions from your experience; blocked accounts can be managed in Settings.',
  },
  {
    icon: <Trash2 size={21} />,
    question: 'How do I delete a recording, comment, or my account?',
    answer: 'Use the menu on your own recording or comment to delete it. To delete your full account and associated content, open Profile → Settings → Delete Account and follow the confirmation steps. Account deletion is permanent.',
  },
];

const FAQItem: React.FC<(typeof faqs)[number]> = ({ icon, question, answer }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="overflow-hidden border border-cyan-300/15 bg-white/[0.025]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-cyan-300/[0.05] md:p-6"
      >
        <span className="shrink-0 text-cyan-300">{icon}</span>
        <span className="flex-1 text-sm font-black tracking-wide uppercase md:text-base">{question}</span>
        <ChevronRight className={`shrink-0 text-fuchsia-400 transition-transform ${open ? 'rotate-90' : ''}`} size={20} />
      </button>
      {open && <div className="border-t border-white/5 px-5 py-5 pl-16 font-mono text-sm leading-7 text-zinc-400 md:px-6 md:pl-[68px]">{answer}</div>}
    </div>
  );
};

const SoundsOfEarthSupport: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#03040c] text-white selection:bg-fuchsia-500 selection:text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-cyan-300/15 bg-[#03040c]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a href="/" className="group flex items-center text-lg font-black tracking-tight uppercase">
            <Home className="mr-2 text-zinc-500 transition-colors group-hover:text-cyan-300" size={19} />
            JimWashkau<span className="text-cyan-300">.com</span>
          </a>
          <a href="/sounds-of-earth/privacy" className="text-xs font-bold tracking-[0.18em] text-fuchsia-400 uppercase hover:text-fuchsia-300">Privacy</a>
        </div>
      </nav>

      <header className="relative overflow-hidden px-6 pb-20 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(34,211,238,0.18),transparent_33%),radial-gradient(circle_at_82%_22%,rgba(217,70,239,0.15),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-emerald-300/30 bg-emerald-300/5 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.25em] text-emerald-300 uppercase">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Earth:// support online
          </div>
          <p className="mb-4 font-mono text-sm tracking-[0.3em] text-cyan-300 uppercase">Sounds of Earth</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.9] uppercase sm:text-7xl md:text-8xl">
            Signal <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Support</span>
          </h1>
          <p className="mt-8 max-w-3xl font-mono text-base leading-7 text-zinc-400 md:text-lg">
            Help with recording, publishing, playback, maps, profiles, social features, safety, and your account.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-6 pb-28 lg:grid-cols-[1fr_340px]">
        <section>
          <h2 className="mb-7 text-3xl font-black">Frequently asked questions</h2>
          <div className="space-y-4">{faqs.map((faq) => <FAQItem key={faq.question} {...faq} />)}</div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/15 to-cyan-400/5 p-7">
            <Mail className="text-fuchsia-300" size={34} />
            <h2 className="mt-5 text-2xl font-black">Contact support</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-300">Still stuck? Send the app version, iPhone model, iOS version, exact error, and the steps that caused it.</p>
            <p className="mt-4 font-mono text-xs leading-5 text-zinc-500">Never email a password, private key, Apple credential, or authentication token.</p>
            <a href="mailto:support@jimwashkau.com?subject=Sounds%20of%20Earth%20Support" className="mt-7 flex items-center justify-center bg-cyan-300 px-5 py-4 text-sm font-black tracking-widest text-black uppercase hover:bg-white">Email support</a>
            <p className="mt-4 break-all text-center font-mono text-xs text-cyan-300">support@jimwashkau.com</p>
          </div>

          <div className="border border-cyan-300/15 bg-white/[0.025] p-7">
            <ShieldCheck className="text-cyan-300" size={32} />
            <h2 className="mt-5 text-xl font-black">Safety controls</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400">Use Report for objectionable content and Block to stop seeing an account. For an urgent privacy concern, include the recording title and creator username in your support email.</p>
          </div>

          <a href="/sounds-of-earth/privacy" className="block border border-white/10 p-6 transition-colors hover:border-fuchsia-300/50">
            <p className="font-mono text-xs tracking-widest text-fuchsia-300 uppercase">Read the policy</p>
            <p className="mt-2 font-black uppercase">Sounds of Earth Privacy →</p>
          </a>
        </aside>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 font-mono text-xs tracking-wider text-zinc-500 sm:flex-row">
          <span>© 2026 JIM WASHKAU // SOUNDS OF EARTH</span>
          <div className="flex gap-6"><a href="/" className="hover:text-cyan-300">HOME</a><a href="/sounds-of-earth/privacy" className="hover:text-cyan-300">PRIVACY</a></div>
        </div>
      </footer>
    </div>
  );
};

export default SoundsOfEarthSupport;
