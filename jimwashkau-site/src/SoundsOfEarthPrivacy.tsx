import React from 'react';
import {
  Bell,
  Database,
  Globe2,
  Home,
  LockKeyhole,
  MapPin,
  Mic2,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react';

const UPDATED_DATE = 'August 25, 2026';

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <section className="grid gap-8 border-t border-cyan-300/15 pt-12 md:grid-cols-[220px_1fr]">
    <div className="flex items-start gap-3 text-cyan-300">
      {icon}
      <h2 className="text-xl font-black text-white">{title}</h2>
    </div>
    <div className="space-y-5 text-sm leading-7 text-zinc-300 md:text-base">{children}</div>
  </section>
);

const BulletList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex gap-3">
        <span aria-hidden="true" className="mt-[2px] text-fuchsia-400">›</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const SoundsOfEarthPrivacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#03040c] text-white selection:bg-fuchsia-500 selection:text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-cyan-300/15 bg-[#03040c]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a href="/" className="group flex items-center text-lg font-black tracking-tight uppercase">
            <Home className="mr-2 text-zinc-500 transition-colors group-hover:text-cyan-300" size={19} />
            JimWashkau<span className="text-cyan-300">.com</span>
          </a>
          <a href="/sounds-of-earth/support" className="text-xs font-bold tracking-[0.18em] text-fuchsia-400 uppercase hover:text-fuchsia-300">
            App support
          </a>
        </div>
      </nav>

      <header className="relative overflow-hidden px-6 pb-20 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.14),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-emerald-300/30 bg-emerald-300/5 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.25em] text-emerald-300 uppercase">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Earth:// privacy channel secure
          </div>
          <p className="mb-4 font-mono text-sm tracking-[0.3em] text-cyan-300 uppercase">Sounds of Earth</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.9] uppercase sm:text-7xl md:text-8xl">
            Privacy <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="mt-8 max-w-3xl font-mono text-base leading-7 text-zinc-400 md:text-lg">
            This policy explains how Sounds of Earth handles information when you record, publish, discover, and interact with sounds from around the world.
          </p>
          <p className="mt-6 font-mono text-xs tracking-widest text-zinc-500 uppercase">Last updated: {UPDATED_DATE}</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-14 px-6 pb-28">
        <div className="border border-cyan-300/20 bg-cyan-300/[0.04] p-6 font-mono text-sm leading-7 text-zinc-300 md:p-8">
          Sounds of Earth is published by James Louis Washkau Jr. Questions or privacy requests can be sent to{' '}
          <a className="font-bold text-cyan-300 hover:text-cyan-200" href="mailto:support@jimwashkau.com">support@jimwashkau.com</a>.
        </div>

        <Section icon={<Database size={24} />} title="Information we collect">
          <BulletList items={[
            <><strong className="text-white">Account information:</strong> your email address or Sign in with Apple identifier, authentication records, and account ID.</>,
            <><strong className="text-white">Profile information:</strong> your username, display name, biography, avatar, and profile statistics.</>,
            <><strong className="text-white">Published content:</strong> audio recordings and their titles, descriptions, tags, duration, timestamps, and related metadata.</>,
            <><strong className="text-white">Location:</strong> the coordinate captured with a recording and a privacy-protected approximate coordinate used to display public recordings on the map.</>,
            <><strong className="text-white">Social activity:</strong> follows, reactions, comments, saves, blocks, reports, and activity events.</>,
            <><strong className="text-white">Notifications:</strong> device push tokens and notification preferences when you enable push notifications.</>,
          ]} />
        </Section>

        <Section icon={<Mic2 size={24} />} title="How we use information">
          <BulletList items={[
            'Create and secure your account and profile.',
            'Upload, store, play, organize, and map recordings you choose to publish.',
            'Power Discover, Following, Nearby, search, comments, reactions, saves, and creator profiles.',
            'Send notifications for social activity when notifications are enabled.',
            'Moderate content, investigate reports, prevent abuse, and enforce the Community Guidelines.',
            'Maintain, troubleshoot, and improve the app and its reliability.',
          ]} />
          <p>Sounds of Earth does not sell your personal information or use it for third-party behavioral advertising.</p>
        </Section>

        <Section icon={<Globe2 size={24} />} title="What other people can see">
          <p>Public recordings, their metadata, your public profile, and public social activity may be visible to other users. A privacy-protected public map coordinate is used so listeners can discover where a sound was captured without exposing the protected source coordinate through the public feed.</p>
          <p>Do not record or publish private conversations, personal information, or audio you do not have permission to share.</p>
        </Section>

        <Section icon={<MapPin size={24} />} title="Location and permissions">
          <p>Location access lets the app attach a place to a recording, show nearby signals, and center the map near you. Microphone access is required to record audio. Photo library or camera access is used only when you choose a profile image. Notification permission is optional.</p>
          <p>You can change these permissions at any time in iOS Settings. Disabling a permission may prevent the related feature from working.</p>
        </Section>

        <Section icon={<UserRound size={24} />} title="Service providers">
          <p>Sounds of Earth uses service providers to operate the network:</p>
          <BulletList items={[
            <><strong className="text-white">Supabase</strong> provides authentication, database, file storage, and server functions.</>,
            <><strong className="text-white">Apple</strong> provides Sign in with Apple, Apple Push Notification service, App Store distribution, and iOS platform services.</>,
            <><strong className="text-white">Apple MapKit</strong> provides mapping features in the app.</>,
          ]} />
          <p>These providers process information under their own terms and privacy commitments. Information may be processed in countries other than the one where you live.</p>
        </Section>

        <Section icon={<LockKeyhole size={24} />} title="Security and retention">
          <p>We use reasonable technical and organizational safeguards, including authenticated access and database access controls. No internet service can guarantee absolute security.</p>
          <p>Information is retained while your account is active and as needed to provide the service, resolve disputes, prevent abuse, or meet legal obligations. Content removed from the live service may remain briefly in backups or security records.</p>
        </Section>

        <Section icon={<Trash2 size={24} />} title="Your choices and deletion">
          <BulletList items={[
            'Edit your profile and manage notification permissions.',
            'Delete your recordings and comments from their in-app menus.',
            'View saved recordings and manage blocked accounts.',
            'Initiate full account deletion inside the app from Settings. This removes the account and associated profile and content from the active service, subject to limited legal, security, and backup retention.',
            'Contact support to ask about access, correction, or deletion rights available where you live.',
          ]} />
        </Section>

        <Section icon={<ShieldCheck size={24} />} title="Safety and children">
          <p>Sounds of Earth is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided information, contact us so we can investigate and remove it where required.</p>
          <p>Use the in-app report and block controls for unsafe or objectionable content. Reports may include the content and account information needed for moderation.</p>
        </Section>

        <Section icon={<Bell size={24} />} title="Policy updates">
          <p>We may update this policy as the app changes. The current version and effective date will remain available on this page. Material changes may also be communicated in the app or through another appropriate channel.</p>
        </Section>

        <div className="border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/5 p-8 text-center md:p-12">
          <p className="font-mono text-xs tracking-[0.25em] text-fuchsia-300 uppercase">Privacy transmission complete</p>
          <h2 className="mt-4 text-3xl font-black">Need help with your data?</h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="mailto:support@jimwashkau.com" className="bg-cyan-300 px-7 py-4 text-sm font-black tracking-widest text-black uppercase hover:bg-white">Email support</a>
            <a href="/sounds-of-earth/support" className="border border-white/20 px-7 py-4 text-sm font-black tracking-widest uppercase hover:border-fuchsia-300 hover:text-fuchsia-300">Open help center</a>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 font-mono text-xs tracking-wider text-zinc-500 sm:flex-row">
          <span>© 2026 JIM WASHKAU // SOUNDS OF EARTH</span>
          <div className="flex gap-6"><a href="/" className="hover:text-cyan-300">HOME</a><a href="/sounds-of-earth/support" className="hover:text-cyan-300">SUPPORT</a></div>
        </div>
      </footer>
    </div>
  );
};

export default SoundsOfEarthPrivacy;
