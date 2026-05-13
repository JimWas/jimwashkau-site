import { ArrowLeft, Coffee, Droplets, Package, Recycle, ShieldAlert, Sparkles } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import marsSpirit from './assets/Mars_Spirit.png';

const drinkCards = [
  {
    icon: Droplets,
    title: 'Water is the main drink',
    body: 'Crews drink treated water from sealed bags, pouches, and station dispensers. On the ISS, water is precious cargo, so every drop is managed like mission hardware.',
  },
  {
    icon: Recycle,
    title: 'A lot of it is recycled',
    body: 'Space stations recover water from humidity, sweat, breath, and urine, then clean it through filtration and processing until it is safe to drink again.',
  },
  {
    icon: Coffee,
    title: 'Coffee, tea, and juice still fly',
    body: 'Many drinks launch as powders or concentrates. Astronauts add hot or room-temperature water, shake the pouch, and sip through a straw with a clamp.',
  },
  {
    icon: Package,
    title: 'Containers matter',
    body: 'Open cups are risky in microgravity because liquid floats away. Most drinks use sealed pouches, valves, straws, or special capillary cups made for space.',
  },
  {
    icon: ShieldAlert,
    title: 'Fizz is complicated',
    body: 'Carbonated drinks do not behave like they do on Earth. Gas bubbles do not rise and separate normally, so fizzy drinks can feel unpleasant and are uncommon.',
  },
  {
    icon: Sparkles,
    title: 'Taste changes in orbit',
    body: 'Fluid shifts can make astronauts feel congested, which can dull taste. Stronger flavors, warm drinks, and sauces often become more appealing in space.',
  },
] as const;

export default function SpaceDrinks() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      <Analytics />
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tighter uppercase">
            JimWashkau<span className="text-brand">.com</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] hover:border-brand hover:text-brand transition-colors"
          >
            <ArrowLeft size={16} />
            Home
          </a>
        </div>
      </header>

      <main>
        <section className="relative min-h-[78vh] pt-20 flex items-center overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 z-0">
            <img
              src={marsSpirit}
              alt="Mars rover landscape"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </div>
          <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(0,102,204,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.12)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />

          <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/60 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-6">
                <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_14px_var(--color-brand)]" />
                Crew Life Systems
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.92] mb-8">
                What Astronauts Drink In Space
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed">
                Mostly water, often recycled, delivered through carefully designed pouches and dispensers. Space drinking is less about floating cocktails and more about fluid control, safety, and survival.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-zinc-950 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">The Short Answer</h2>
                <p className="text-zinc-400 leading-relaxed text-lg mb-8">
                  Astronauts drink water, coffee, tea, lemonade, juice, sports drinks, and other flavored beverages. The big difference is the packaging: liquids need sealed containers because microgravity turns loose drops into floating hazards.
                </p>
                <div className="border border-brand/30 bg-black/60 p-6 font-mono text-sm text-zinc-300">
                  <p className="text-brand text-[10px] font-bold uppercase tracking-[0.28em] mb-3">Mission note</p>
                  <p>
                    Every drink has to respect mass, storage, sanitation, crew preference, and the simple fact that there is no reliable "down" for liquid to pour into.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-px bg-white/10">
                {drinkCards.map(({ icon: Icon, title, body }) => (
                  <article key={title} className="bg-zinc-950 p-7 hover:bg-black transition-colors">
                    <Icon className="text-brand mb-6" size={28} />
                    <h3 className="text-lg font-black uppercase mb-4 leading-tight">{title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-px bg-white/10">
              <FactBlock label="Hydration" value="Water first" detail="Crew health, food prep, hygiene, and equipment all depend on careful water management." />
              <FactBlock label="Packaging" value="Pouches" detail="Straws, clamps, valves, and drink bags keep liquid contained until someone actually drinks it." />
              <FactBlock label="Rule of thumb" value="No loose liquid" detail="A floating blob can get into eyes, electronics, vents, filters, or tiny equipment gaps." />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FactBlock({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="bg-black p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand mb-4">{label}</p>
      <h3 className="text-3xl font-black uppercase mb-4">{value}</h3>
      <p className="text-zinc-500 leading-relaxed">{detail}</p>
    </div>
  );
}
