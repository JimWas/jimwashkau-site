import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react';

const article = {
  slug: 'cambodia-free-beer',
  title: 'Cambodia\'s “Free Beer” Ring-Pull Promotions',
  excerpt: 'A quick travel note on Cambodia\'s beer-can contests, neighborhood-shop prizes, and what visitors should know before chasing a winning tab.',
  date: 'September 13, 2026',
  location: 'Cambodia',
};

export default function Blog() {
  const isArticle = window.location.pathname === `/blog/${article.slug}`;

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-brand selection:text-white">
      <nav className="border-b border-white/10 bg-black/90">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a href="/" className="text-lg font-black uppercase tracking-[-0.03em]">JimWashkau<span className="text-brand">.com</span></a>
          <a href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-white">
            <ArrowLeft size={15} /> Home
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {isArticle ? <Article /> : <Index />}
      </main>
    </div>
  );
}

function Index() {
  return (
    <>
      <header className="max-w-3xl">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-brand">Jim Washkau Blog</p>
        <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-8xl">TRAVEL NOTES.<br /><span className="text-brand">USEFUL DETOURS.</span></h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">Travel tips, small discoveries, and practical notes from the road.</p>
      </header>

      <section className="mt-16 max-w-4xl border-t border-white/10 pt-8">
        <a href={`/blog/${article.slug}`} className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-brand/60 md:p-10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            <span className="inline-flex items-center gap-2 text-brand"><MapPin size={14} /> {article.location}</span>
            <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> {article.date}</span>
          </div>
          <h2 className="mt-7 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">{article.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{article.excerpt}</p>
          <span className="mt-8 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em] text-brand">Read article <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span>
        </a>
      </section>
    </>
  );
}

function Article() {
  return (
    <article className="max-w-3xl">
      <a href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-brand"><ArrowLeft size={15} /> All posts</a>
      <div className="mt-12 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        <span className="inline-flex items-center gap-2 text-brand"><MapPin size={14} /> Cambodia</span>
        <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> September 13, 2026</span>
      </div>
      <h1 className="mt-7 text-5xl font-black leading-[0.94] tracking-[-0.06em] md:text-7xl">Cambodia’s <span className="text-brand">“Free Beer”</span> Ring-Pull Promotions</h1>
      <p className="mt-8 text-xl leading-relaxed text-zinc-400">Beer is already relatively inexpensive in Cambodia, but promotional cans can make it even cheaper.</p>

      <div className="mt-12 space-y-7 text-lg leading-relaxed text-zinc-300">
        <p>Several local brands run ring-pull contests in which customers check the underside of a can&apos;s tab to see whether they have won a prize.</p>
        <p>The most common reward is another can of beer, although some tabs offer cash. Much rarer prizes may include motorcycles, cars, or large sums of money. Winning tabs can usually be exchanged at small neighborhood shops, which may charge a modest commission. Bars and supermarkets generally do not participate. Anyone who wins a valuable prize should keep both the tab and the original can for verification.</p>
        <p>These promotions are an interesting feature of Cambodia&apos;s consumer culture. They turn an ordinary purchase into a game and encourage customers to remain loyal to particular brands.</p>
        <p>However, the odds are not publicly available, promotion rules can change, and Cambodia has considered restrictions on alcohol-related prize campaigns. Visitors should therefore check current regulations and enjoy alcohol responsibly.</p>
      </div>

      <section className="mt-14 border-t border-white/10 pt-10" aria-label="Cambodia beer media">
        <p className="mb-6 text-xs font-black uppercase tracking-[0.25em] text-brand">From the trip</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <MediaImage src="/blog/cambodia-free-beer/hanuman-premium.jpg" alt="Hanuman Premium Lager can held outdoors in Cambodia" caption="Hanuman Premium Lager" />
          <MediaImage src="/blog/cambodia-free-beer/angkor-bottle.jpg" alt="Angkor beer bottle held indoors" caption="Angkor beer" />
          <MediaImage src="/blog/cambodia-free-beer/hanuman-lite.jpg" alt="Hanuman Lite can held outside at night" caption="Hanuman Lite" />
          <MediaVideo src="/blog/cambodia-free-beer/beer-promo-1.mov" caption="Beer promotion clip" />
          <MediaVideo src="/blog/cambodia-free-beer/beer-promo-2.mov" caption="Second promotion clip" />
          <a href="/blog/cambodia-free-beer/beer-promo-2.heic" className="flex min-h-56 flex-col justify-end rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-brand/60" download>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand">Original photo</p>
            <p className="mt-3 text-lg font-bold">Open the HEIC image</p>
            <p className="mt-2 text-sm text-zinc-500">Download the original iPhone photo for compatible devices.</p>
          </a>
        </div>
      </section>

      <div className="mt-14 border-l-2 border-brand bg-brand/5 px-6 py-5 text-sm leading-relaxed text-zinc-400">Travel note: promotion rules and alcohol regulations can change. Confirm current details locally, and drink responsibly.</div>
    </article>
  );
}

function MediaImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <img src={src} alt={alt} className="aspect-[4/5] w-full object-cover" loading="lazy" />
      <figcaption className="px-4 py-3 text-sm text-zinc-400">{caption}</figcaption>
    </figure>
  );
}

function MediaVideo({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <video className="aspect-[4/5] w-full object-cover" controls preload="metadata" playsInline>
        <source src={src} type="video/quicktime" />
        Your browser does not support this video format.
      </video>
      <figcaption className="px-4 py-3 text-sm text-zinc-400">{caption}</figcaption>
    </figure>
  );
}
