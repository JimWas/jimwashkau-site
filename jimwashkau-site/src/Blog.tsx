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
      <img src="/blog/cambodia-free-beer/beer-promo-2.jpg" alt="Hanuman Lite beer can photographed in Cambodia" className="mt-12 aspect-[4/3] w-full rounded-[1.5rem] border border-white/10 object-cover" />
      <div className="mt-12 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        <span className="inline-flex items-center gap-2 text-brand"><MapPin size={14} /> Cambodia</span>
        <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> September 13, 2026</span>
      </div>
      <h1 className="mt-7 text-5xl font-black leading-[0.94] tracking-[-0.06em] md:text-7xl">Cambodia’s <span className="text-brand">“Free Beer”</span> Ring-Pull Promotions</h1>
      <p className="mt-8 text-xl leading-relaxed text-zinc-400">Beer is already relatively inexpensive in Cambodia, but promotional cans can make it even cheaper.</p>

      <div className="mt-12 space-y-7 text-lg leading-relaxed text-zinc-300">
        <p>What&apos;s cheaper than a budget-friendly Cambodian beer? Free beer, of course! While technically you have to buy a can first, getting a free round, or even getting paid to drink, feels like a total win. If you&apos;ve just spent the day exploring Angkor Wat and want a cold one, here is how the country&apos;s famous beer promotions work.</p>

        <h2 className="pt-6 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">How to Get the &quot;Cheapest&quot; Beer in Cambodia</h2>
        <p>Several local breweries run ring-pull promotions on canned beer. When you open a promotional can, check the underside of the tab to see whether you have won a prize.</p>
        <blockquote className="border-l-2 border-brand bg-brand/5 px-6 py-5 text-base leading-relaxed text-zinc-300"><strong className="text-white">Important regulatory update:</strong> The Cambodian government has officially mandated that all prize-based promotions on ring pulls and bottle caps must cease by September 30, 2026, with a full ban enforced starting October 1, 2026. Until that deadline passes, ring-pull prizes remain active.</blockquote>

        <h2 className="pt-6 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Participating Brands</h2>
        <p>Participating brands fluctuate, but common options include:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand">
          <li>Cambodia Beer</li>
          <li>Ganzberg Beer</li>
          <li>Anchor Beer</li>
          <li>Hanuman Beer</li>
          <li>Krud Beer</li>
          <li>Mattrid Beer</li>
          <li>Vattanac Premium Light</li>
          <li>ABC Beer Extra Stout</li>
          <li>Red Bull, which is non-alcoholic but runs the same style of ring-pull promotion</li>
        </ul>
        <p>If you haven&apos;t won, the metal tab will typically read <em>&quot;Thank You&quot;</em> or show a thumbs-up icon in English or Khmer. If you win, it will explicitly print the reward. If you&apos;re unsure what the print says, ask a local before tossing it out.</p>

        <h2 className="pt-6 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">What Prizes Can You Win?</h2>
        <ul className="list-disc space-y-3 pl-6 marker:text-brand">
          <li><strong className="text-white">Free cans:</strong> The most common win is a free replacement beer.</li>
          <li><strong className="text-white">Cash prizes:</strong> Instant cash wins usually start small, such as $1, $5, or $12.50, which offsets the cost of your drinks. Major jackpot cash prizes can reach tens of thousands of dollars.</li>
          <li><strong className="text-white">Vehicles and luxury goods:</strong> Motorbikes and cars are awarded periodically. Motorbike prizes often require collecting three matching ring-pull tabs, such as Moto Part 1, Moto Part 2, and Moto Part 3. Select brands like ABC have even offered luxury items such as Rolex watches.</li>
        </ul>
        <p><strong className="text-white">Keep both the ring pull and the original intact can</strong> for vehicle wins or large cash payouts. They may be required for verification.</p>

        <h2 className="pt-6 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">What Are the Odds?</h2>
        <p>Win rates are a hot topic among locals and expats. Breweries do not publish official odds, but high market competition keeps casual win rates relatively high, with many people reporting extra-can wins on up to 50% of purchases in a case. Cambodia Beer and Ganzberg Beer are frequently cited as having some of the highest small-cash payout rates.</p>
        <p>Rumors persist that win rates increase during Cambodian public holidays such as Pchum Ben or Khmer New Year, but this has never been officially confirmed by distributors.</p>

        <h2 className="pt-6 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">How to Redeem Winning Tabs</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[680px] w-full border-collapse text-left text-sm">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-zinc-300">
              <tr><th className="border-b border-white/10 px-4 py-4">Prize type</th><th className="border-b border-white/10 px-4 py-4">Where to redeem</th><th className="border-b border-white/10 px-4 py-4">How it works and fees</th></tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr><td className="border-b border-white/10 px-4 py-4 font-bold text-white">Free cans</td><td className="border-b border-white/10 px-4 py-4">Mom-and-pop convenience stores</td><td className="border-b border-white/10 px-4 py-4">Small neighborhood shops may exchange these for a service fee of 500 to 1,000 KHR, approximately $0.12 to $0.25 USD, per can.</td></tr>
              <tr><td className="px-4 py-4 font-bold text-white">Cash, vehicles, and large prizes</td><td className="px-4 py-4">Follow the brand&apos;s printed claim instructions</td><td className="px-4 py-4">Keep the winning tab, original can, and any matching parts. Ask the shop or distributor where the prize must be verified before handing anything over.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <section className="mt-14 border-t border-white/10 pt-10" aria-label="Cambodia beer media">
        <p className="mb-6 text-xs font-black uppercase tracking-[0.25em] text-brand">From the trip</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <MediaImage src="/blog/cambodia-free-beer/hanuman-premium.jpg" alt="Hanuman Premium Lager can held outdoors in Cambodia" caption="Hanuman Premium Lager" />
          <MediaImage src="/blog/cambodia-free-beer/angkor-bottle.jpg" alt="Angkor beer bottle held indoors" caption="Angkor beer" />
          <MediaImage src="/blog/cambodia-free-beer/hanuman-lite.jpg" alt="Hanuman Lite can held outside at night" caption="Hanuman Lite" />
          <MediaVideo src="/blog/cambodia-free-beer/beer-promo-1.mp4" caption="Beer promotion clip" />
          <MediaVideo src="/blog/cambodia-free-beer/beer-promo-2.mov" caption="Second promotion clip" />
          <a href="/blog/cambodia-free-beer/beer-promo-2.jpg" className="flex min-h-56 flex-col justify-end rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-brand/60" download>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand">Original photo</p>
            <p className="mt-3 text-lg font-bold">Download the JPG photo</p>
            <p className="mt-2 text-sm text-zinc-500">A browser-friendly version of the original iPhone photo.</p>
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
        <source src={src} type="video/mp4" />
        Your browser does not support this video format.
      </video>
      <figcaption className="px-4 py-3 text-sm text-zinc-400">{caption}</figcaption>
    </figure>
  );
}
