import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Combine,
  Download,
  FileCheck2,
  FileText,
  Highlighter,
  ImagePlus,
  LockKeyhole,
  PenLine,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Type,
  Wand2,
} from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/swift-pdf-editor/id6759518269';

const features = [
  {
    icon: <PenLine />,
    eyebrow: 'Edit PDFs',
    title: 'Markup, write, and refine documents.',
    body: 'Draw directly on pages, add text, insert images, highlight important details, and place watermarks before saving or sharing.',
  },
  {
    icon: <FileCheck2 />,
    eyebrow: 'Sign fast',
    title: 'Drop signatures where they belong.',
    body: 'Create a saved signature, resize it, position it precisely, and export clean signed documents from your iPhone.',
  },
  {
    icon: <ScanLine />,
    eyebrow: 'Scan paper',
    title: 'Turn paper into editable PDFs.',
    body: 'Use the camera to scan receipts, forms, notes, agreements, and paperwork into documents you can edit, sign, organize, and share.',
  },
  {
    icon: <Combine />,
    eyebrow: 'Organize pages',
    title: 'Combine, reorder, and manage files.',
    body: 'Merge PDFs, reorder pages, keep useful recent documents nearby, mark favorites, and clear recent history without deleting originals.',
  },
  {
    icon: <Wand2 />,
    eyebrow: 'Convert locally',
    title: 'Move between useful document formats.',
    body: 'Convert PDF to Word, Word to PDF, Excel to PDF, extract text, and turn PDF content into structured Markdown when available.',
  },
  {
    icon: <LockKeyhole />,
    eyebrow: 'Protect documents',
    title: 'Handle private PDFs with control.',
    body: 'Pro tools include password protection, unlocking when you have permission, PDF repair, and advanced document utilities.',
  },
] as const;

const workflow = [
  { icon: <FileText />, title: 'Open', body: 'Start from Files, iCloud Drive, scanned paper, or a recent document.' },
  { icon: <Highlighter />, title: 'Edit', body: 'Add text, signatures, images, highlights, marks, and page changes.' },
  { icon: <ShieldCheck />, title: 'Export', body: 'Save or share the finished PDF while document work stays on device.' },
] as const;

const proTools = [
  'Unlimited saved signatures and initials',
  'Unlimited local text recognition',
  'Password protection and PDF unlocking',
  'PDF repair and PDF to Markdown conversion',
  'Advanced tools with ads removed',
] as const;

function SwiftPdfEditor() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = 'Swift PDF Editor is an iPhone PDF app for editing, signing, scanning, compressing, converting, protecting, and sharing documents locally.';
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute('content');
    document.title = 'Swift PDF Editor - PDF Tools for iPhone';

    let descriptionElement = existingDescription;
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute('content', description);

    const socialMeta = [
      ['property', 'og:title', 'Swift PDF Editor - PDF Tools for iPhone'],
      ['property', 'og:description', description],
      ['property', 'og:url', 'https://jimwashkau.com/SwiftPDFEditor'],
      ['property', 'og:type', 'website'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', 'Swift PDF Editor - PDF Tools for iPhone'],
      ['name', 'twitter:description', description],
    ];
    const addedMeta: HTMLMetaElement[] = [];
    socialMeta.forEach(([attribute, key, content]) => {
      const element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      element.dataset.swiftPdfEditor = 'true';
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
    <div className="min-h-screen overflow-hidden bg-[#050608] text-white selection:bg-sky-300 selection:text-black">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050608]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/apps" className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-sky-300/60 group-hover:text-sky-300">
              <ArrowLeft size={16} />
            </span>
            <span className="hidden sm:inline">JimWashkau<span className="text-sky-300">.com</span></span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 md:inline">Available for iPhone</span>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-sky-300"
            >
              Get the app <Download size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative isolate min-h-screen pt-20">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_24%,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_8%_86%,rgba(16,185,129,0.10),transparent_30%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-sky-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]" />
                PDF editor · Scan · Sign · Share
              </div>
              <h1 className="max-w-4xl text-6xl font-black leading-[0.84] tracking-[-0.07em] sm:text-7xl md:text-8xl xl:text-[7rem]">
                PAPERWORK
                <span className="block text-sky-300">WITHOUT</span>
                THE DESK.
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                Swift PDF Editor helps you sign, edit, scan, convert, compress, protect, and share PDFs from your iPhone. Document work stays practical, private, and fast.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-4 rounded-full bg-sky-300 px-8 py-5 text-sm font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-white"
                >
                  Download on the App Store
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
                </a>
                <a
                  href="#document-workflow"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.16em] transition-colors hover:border-white/50"
                >
                  See PDF tools <ChevronRight size={17} />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                <span className="flex items-center gap-2"><Check className="text-sky-300" size={14} /> Local processing</span>
                <span className="flex items-center gap-2"><Check className="text-sky-300" size={14} /> No account required</span>
                <span className="flex items-center gap-2"><Check className="text-sky-300" size={14} /> iOS 17+</span>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[580px] justify-center lg:justify-end">
              <div className="absolute left-0 top-[18%] hidden w-48 rounded-2xl border border-white/10 bg-black/70 p-5 shadow-2xl backdrop-blur-xl sm:block lg:-left-7">
                <div className="mb-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                  Privacy mode <ShieldCheck className="text-emerald-300" size={15} />
                </div>
                <p className="text-xs font-bold text-zinc-200">Documents process locally on device.</p>
              </div>

              <PhoneMockup />

              <div className="absolute -bottom-6 right-0 w-52 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-2xl backdrop-blur-xl sm:right-[-1rem]">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-300/15 text-sky-300"><PenLine size={17} /></span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">Ready to export</p>
                    <p className="text-sm font-black">SIGN · SAVE · SHARE</p>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-400">Add the signature, check the page, send the finished PDF.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
            <Stat value="7.2 MB" label="App size" />
            <Stat value="4+" label="Age rating" />
            <Stat value="iOS 17+" label="Compatibility" />
            <Stat value="Local" label="Document processing" />
          </div>
        </section>

        <section id="document-workflow" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-sky-300">Built for document flow</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">THE PDF TOOLKIT THAT FITS IN YOUR HAND.</h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-400">
                Open the file, make the change, sign the page, compress the attachment, or convert the content without sending your documents through a developer server.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
              {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} number={String(index + 1).padStart(2, '0')} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/10 bg-[#071016] py-28 md:py-36">
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-16 max-w-2xl">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-emerald-300">From inbox to done</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.045em] md:text-6xl">THREE STEPS TO A FINISHED PDF.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {workflow.map((step, index) => (
                <Step key={step.title} {...step} number={String(index + 1).padStart(2, '0')} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-sky-300/20 bg-sky-300/[0.045] p-8 md:p-12">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sky-300 text-black"><ShieldCheck size={20} /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">Privacy posture</p>
                  <p className="mt-1 text-sm text-zinc-500">Documents stay yours</p>
                </div>
              </div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-5xl">NO ACCOUNT. NO DEVELOPER-SERVER DOCUMENT UPLOADS.</h2>
              <p className="mt-8 text-base leading-relaxed text-zinc-400">
                Swift PDF Editor is designed around local document work. Temporary conversion files are removed after processing, passwords are not stored, and recent shortcuts can be cleared without deleting original documents.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#0b1015] p-8 md:p-12">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-zinc-300"><Sparkles size={20} /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">SwiftPDF Pro</p>
                  <p className="mt-1 text-sm text-zinc-500">More serious document tools</p>
                </div>
              </div>
              <ul className="space-y-5 text-sm leading-relaxed text-zinc-400">
                {proTools.map((tool) => (
                  <li key={tool} className="flex gap-3">
                    <Check className="mt-0.5 shrink-0 text-emerald-300" size={18} />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 pb-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-sky-300 px-8 py-16 text-black md:px-16 md:py-20">
            <div className="absolute -right-10 -top-20 h-80 w-80 rounded-full border-[50px] border-black/5" />
            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]"><FileText size={16} /> The document is not going to sign itself</p>
                <h2 className="max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.055em] md:text-7xl">EDIT THE PDF. KEEP MOVING.</h2>
              </div>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-black px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-1">
                Get Swift PDF Editor <ArrowUpRight className="transition-transform group-hover:rotate-45" size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Jim Washkau · Swift PDF Editor</p>
        <div className="flex flex-wrap gap-6">
          <a href="/apps" className="hover:text-sky-300">All apps</a>
          <a href="/support" className="hover:text-sky-300">Support</a>
          <a href="/privacy" className="hover:text-sky-300">Privacy</a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">App Store</a>
        </div>
      </footer>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative rotate-[2deg] rounded-[3.2rem] border border-white/20 bg-[#101923] p-2.5 shadow-[0_50px_120px_rgba(0,0,0,.78),0_0_80px_rgba(56,189,248,.1)]">
      <div className="pointer-events-none absolute left-1/2 top-5 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-[610px] w-[282px] overflow-hidden rounded-[2.7rem] bg-[#eff7ff] text-[#10151c] sm:h-[680px] sm:w-[314px]">
        <div className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#10b981] px-6 pb-6 pt-16 text-white">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/65">Swift PDF Editor</p>
              <h3 className="mt-2 text-3xl font-black leading-none tracking-[-0.04em]">Contract.pdf</h3>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/18 backdrop-blur">
              <FileText size={24} />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              [PenLine, 'Sign'],
              [Type, 'Text'],
              [Highlighter, 'Mark'],
              [ImagePlus, 'Image'],
            ].map(([Icon, label]) => (
              <div key={label as string} className="rounded-2xl bg-white/18 p-3 text-center backdrop-blur">
                <Icon className="mx-auto mb-2" size={18} />
                <p className="text-[9px] font-black uppercase tracking-[0.14em]">{label as string}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="mb-4 rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7b8794]">Page 1 of 4</p>
                <p className="mt-1 text-sm font-black">Service Agreement</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-700">SIGNED</span>
            </div>
            <div className="space-y-2">
              <span className="block h-2 rounded-full bg-[#dbeafe]" />
              <span className="block h-2 w-10/12 rounded-full bg-[#dbeafe]" />
              <span className="block h-2 w-8/12 rounded-full bg-[#dbeafe]" />
            </div>
            <div className="mt-6 rounded-2xl border-2 border-dashed border-sky-300/80 bg-sky-50 p-4">
              <p className="font-serif text-2xl italic text-sky-800">James W.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ['Compress', 'Email ready'],
              ['Convert', 'Word + Markdown'],
              ['Scan', 'Paper to PDF'],
              ['Protect', 'Password tools'],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black">{label}</p>
                <p className="mt-1 text-[11px] font-semibold text-[#64748b]">{detail}</p>
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
    <article className="group bg-[#081016] p-8 transition-colors hover:bg-[#0d1720] md:p-10">
      <div className="mb-10 flex items-start justify-between">
        <span className="text-sky-300 transition-transform group-hover:scale-110">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-zinc-700">{number}</span>
      </div>
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300">{eyebrow}</p>
      <h3 className="mb-4 text-xl font-black uppercase tracking-[-0.02em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
    </article>
  );
}

function Step({ icon, number, title, body }: { icon: ReactNode; number: string; title: string; body: string }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-8 md:p-10">
      <div className="absolute right-6 top-3 text-7xl font-black tracking-[-0.08em] text-white/[0.025]">{number}</div>
      <div className="mb-16 grid h-12 w-12 place-items-center rounded-full bg-sky-300 text-black">{icon}</div>
      <p className="mb-3 font-mono text-[10px] font-bold tracking-[0.24em] text-sky-300">STEP {number}</p>
      <h3 className="mb-4 text-2xl font-black uppercase tracking-[-0.025em]">{title}</h3>
      <p className="leading-relaxed text-zinc-500">{body}</p>
    </article>
  );
}

export default SwiftPdfEditor;
