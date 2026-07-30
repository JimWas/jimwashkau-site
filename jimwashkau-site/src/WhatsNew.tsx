import { ArrowLeft, CalendarDays, ExternalLink, Rocket, Sparkles } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { siteUpdates } from './data/siteUpdates';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}

export default function WhatsNew() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      <Analytics />
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tighter uppercase flex items-center group">
            <ArrowLeft className="mr-2 text-zinc-500 group-hover:text-brand transition-colors" size={20} />
            JimWashkau<span className="text-brand">.com</span>
          </a>
          <div className="hidden sm:flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-brand">
            <Sparkles size={15} />
            Site Changelog
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10 pt-40 pb-20">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_22%,rgba(0,102,204,0.18),transparent_34%),radial-gradient(circle_at_82%_44%,rgba(255,92,0,0.12),transparent_30%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,102,204,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.11)_1px,transparent_1px)] bg-[size:44px_44px] opacity-25" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/60 text-brand text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                <Rocket size={14} />
                Deployment Log
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.92] mb-8">
                What&apos;s New
                <span className="block text-brand">On JimWashkau.com</span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
                A running record of new pages, tools, experiments, product sections, and maintenance updates across the site.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/10 mt-14">
              <StatCard label="Tracked updates" value={String(siteUpdates.length)} />
              <StatCard label="Latest update" value={formatDate(siteUpdates[0].date)} />
              <StatCard label="Status" value="Active" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-5">
              {siteUpdates.map((update) => (
                <article
                  key={`${update.date}-${update.title}`}
                  className="group border border-white/10 bg-zinc-950/70 p-6 md:p-8 hover:border-brand/40 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-brand">
                          <CalendarDays size={13} />
                          {formatDate(update.date)}
                        </span>
                        <span className="border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                          {update.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase mb-4 group-hover:text-brand transition-colors">
                        {update.title}
                      </h2>
                      <p className="text-zinc-400 leading-relaxed mb-6">{update.summary}</p>
                      <ul className="grid gap-3 md:grid-cols-3">
                        {update.items.map((item) => (
                          <li key={item} className="border-l border-brand/50 pl-4 text-sm text-zinc-500 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {update.href && (
                      <a
                        href={update.href}
                        target={update.href.startsWith('http') ? '_blank' : undefined}
                        rel={update.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex shrink-0 items-center justify-center gap-2 border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:border-brand hover:text-brand transition-colors"
                      >
                        Open
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/70 p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 mb-3">{label}</p>
      <p className="text-2xl md:text-3xl font-black uppercase">{value}</p>
    </div>
  );
}
