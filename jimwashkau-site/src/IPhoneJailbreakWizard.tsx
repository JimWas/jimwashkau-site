import { useMemo, useState, type ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, Cpu, ExternalLink, GitFork, Search, Shield, Smartphone } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import wizardData from './data/iphoneJailbreakWizard.json';

type Recommendation = {
  name: string;
  method: string;
  jailbreakUrl: string;
  guideUrl: string;
  guideText: string;
  type: string;
  latestVersion: string;
  packageManager: string;
};

type FirmwareRow = {
  from: string;
  to: string;
  osStr: string;
  recommendation: Recommendation;
};

type IPhoneModel = {
  name: string;
  slug: string;
  devices: string[];
  soc: string[];
  architecture: string[];
  released: string;
  latestFirmware: string;
  latestJailbreakableFirmware: string;
  originalUrl: string;
  appleDbUrl: string;
  rows: FirmwareRow[];
  methods: string[];
};

const models = wizardData.models as IPhoneModel[];

function versionRange(row: FirmwareRow) {
  return row.from === row.to ? `${row.osStr} ${row.from}` : `${row.osStr} ${row.from} - ${row.to}`;
}

function isAvailable(row: FirmwareRow) {
  return row.recommendation.name !== 'N/A';
}

function methodCount(model: IPhoneModel) {
  return model.methods.length || model.rows.filter(isAvailable).length;
}

export default function IPhoneJailbreakWizard() {
  const [query, setQuery] = useState('');
  const [selectedName, setSelectedName] = useState(models[0]?.name ?? '');

  const filteredModels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return models;
    }

    return models.filter((model) => {
      const haystack = [
        model.name,
        model.devices.join(' '),
        model.soc.join(' '),
        model.latestJailbreakableFirmware,
      ].join(' ').toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  const selectedModel = models.find((model) => model.name === selectedName) ?? filteredModels[0] ?? models[0];
  const availableRows = selectedModel?.rows.filter(isAvailable) ?? [];
  const unavailableRows = selectedModel?.rows.filter((row) => !isAvailable(row)) ?? [];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      <Analytics />
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tighter uppercase flex items-center group">
            <ArrowLeft className="mr-2 text-zinc-500 group-hover:text-brand transition-colors" size={20} />
            JimWashkau<span className="text-brand">.com</span>
          </a>
          <a
            href={wizardData.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand hover:text-white transition-colors"
          >
            Source Guide
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main>
        <section className="pt-40 pb-20 relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,204,0.18),transparent_34%),radial-gradient(circle_at_78%_35%,rgba(255,92,0,0.12),transparent_28%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,102,204,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.10)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/60 text-brand text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">
                <Smartphone size={14} />
                iPhone Decision Wizard
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.92] mb-8">
                iPhone Jailbreak
                <span className="block text-brand">Get Started Map</span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
                A browsable recreation of the iOS Guide get-started selector for iPhone models. Pick a device to see matching iOS ranges, recommended methods, and links back to the current upstream guide.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/10 mt-14">
              <StatCard label="iPhone groups" value={String(wizardData.summary.modelCount)} />
              <StatCard label="Methods mapped" value={String(wizardData.summary.methodCount)} />
              <StatCard label="Data source" value="iOS Guide" />
            </div>
          </div>
        </section>

        <section className="py-10 bg-zinc-950 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-4 border border-yellow-500/30 bg-yellow-500/10 p-5 text-sm text-yellow-100">
              <AlertTriangle className="shrink-0 text-yellow-400" size={20} />
              <p className="leading-relaxed">
                Jailbreaking can reduce device security, affect warranty/service eligibility, and may cause data loss. This page is an informational index, not a guarantee that a method is safe or current. Back up first and verify everything with the linked upstream guide.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[0.42fr_0.58fr] gap-10 items-start">
              <aside className="lg:sticky lg:top-28">
                <label className="block text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 mb-3">
                  Find iPhone Model
                </label>
                <div className="relative mb-5">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search model, SoC, identifier..."
                    className="w-full bg-zinc-950 border border-white/10 pl-12 pr-4 py-4 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-brand"
                  />
                </div>

                <div className="max-h-[610px] overflow-y-auto border border-white/10 bg-zinc-950">
                  {filteredModels.map((model) => (
                    <button
                      key={model.name}
                      onClick={() => setSelectedName(model.name)}
                      className={`w-full text-left p-5 border-b border-white/10 transition-colors ${
                        selectedModel?.name === model.name ? 'bg-brand/15 text-white' : 'hover:bg-white/5 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-black uppercase tracking-tight">{model.name}</p>
                          <p className="text-xs font-mono text-zinc-500 mt-1">
                            {model.soc.join(', ') || 'Unknown SoC'} / {model.latestJailbreakableFirmware}
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                          {methodCount(model)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              {selectedModel && (
                <div>
                  <div className="border border-brand/25 bg-zinc-950 p-7 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand mb-4">Selected device</p>
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-5">{selectedModel.name}</h2>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-zinc-400">
                          <InfoLine label="Identifiers" value={selectedModel.devices.join(', ')} />
                          <InfoLine label="SoC" value={selectedModel.soc.join(', ') || 'Unknown'} />
                          <InfoLine label="Architecture" value={selectedModel.architecture.join(', ') || 'Unknown'} />
                          <InfoLine label="Released" value={selectedModel.released || 'Unknown'} />
                          <InfoLine label="Latest iOS" value={selectedModel.latestFirmware} />
                          <InfoLine label="Latest jailbreakable" value={selectedModel.latestJailbreakableFirmware} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={selectedModel.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-3 bg-brand text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
                        >
                          Original
                          <ExternalLink size={14} />
                        </a>
                        <a
                          href={selectedModel.appleDbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-3 border border-white/15 text-xs font-bold uppercase tracking-[0.2em] hover:border-brand hover:text-brand transition-colors"
                        >
                          AppleDB
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                      <Shield className="text-brand" size={24} />
                      Recommended Version Ranges
                    </h3>
                    <div className="overflow-hidden border border-white/10">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-950 text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                          <tr>
                            <th className="p-4">iOS range</th>
                            <th className="p-4">Recommendation</th>
                            <th className="p-4 hidden md:table-cell">Type</th>
                            <th className="p-4 hidden lg:table-cell">Package manager</th>
                          </tr>
                        </thead>
                        <tbody>
                          {availableRows.map((row) => (
                            <tr key={`${row.from}-${row.to}-${row.recommendation.name}`} className="border-t border-white/10 bg-black hover:bg-white/[0.03]">
                              <td className="p-4 font-mono text-zinc-300">{versionRange(row)}</td>
                              <td className="p-4">
                                <a
                                  href={row.recommendation.guideUrl || row.recommendation.jailbreakUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 font-bold text-brand hover:text-white transition-colors"
                                >
                                  {row.recommendation.name}
                                  <ExternalLink size={14} />
                                </a>
                                {row.recommendation.latestVersion && (
                                  <p className="text-xs text-zinc-600 mt-1">Latest: {row.recommendation.latestVersion}</p>
                                )}
                              </td>
                              <td className="p-4 hidden md:table-cell text-zinc-400">{row.recommendation.type || 'Unknown'}</td>
                              <td className="p-4 hidden lg:table-cell text-zinc-400 uppercase">{row.recommendation.packageManager || 'Varies'}</td>
                            </tr>
                          ))}
                          {unavailableRows.map((row) => (
                            <tr key={`${row.from}-${row.to}-na`} className="border-t border-white/10 bg-zinc-950/40">
                              <td className="p-4 font-mono text-zinc-500">{versionRange(row)}</td>
                              <td className="p-4 text-zinc-500">No listed jailbreak in this dataset</td>
                              <td className="p-4 hidden md:table-cell text-zinc-600">N/A</td>
                              <td className="p-4 hidden lg:table-cell text-zinc-600">N/A</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-px bg-white/10">
                    <SourceCard
                      icon={<GitFork size={22} />}
                      title="Source and License"
                      body={`${wizardData.source.name} data extracted from the MIT-licensed cfw-guide/ios.cfw.guide repository and AppleDB submodule.`}
                      href={wizardData.source.repository}
                      linkText="View repository"
                    />
                    <SourceCard
                      icon={<Cpu size={22} />}
                      title="Implementation Note"
                      body="This page mirrors the selector logic and version mapping, then links out for instructions so the technical guide remains current."
                      href={wizardData.source.url}
                      linkText="Open iOS Guide"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-zinc-950 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-sm text-zinc-500 leading-relaxed">
            <p className="mb-4">
              Attribution: iOS Guide, MIT License Copyright (c) 2021 Emma. AppleDB data snapshot:{' '}
              <span className="font-mono">{wizardData.source.appleDbCommit}</span>.
            </p>
            <p>
              MIT permission notice: Permission is granted free of charge to use, copy, modify, merge, publish, distribute, sublicense, and sell copies, provided the copyright and permission notice are included. The software is provided as-is, without warranty.
            </p>
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
      <p className="text-3xl font-black uppercase">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/35 p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-600 mb-2">{label}</p>
      <p className="font-mono text-zinc-300">{value}</p>
    </div>
  );
}

function SourceCard({
  icon,
  title,
  body,
  href,
  linkText,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  href: string;
  linkText: string;
}) {
  return (
    <article className="bg-zinc-950 p-7">
      <div className="text-brand mb-5">{icon}</div>
      <h3 className="text-lg font-black uppercase mb-3">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed mb-5">{body}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand hover:text-white transition-colors"
      >
        {linkText}
        <ExternalLink size={13} />
      </a>
    </article>
  );
}
