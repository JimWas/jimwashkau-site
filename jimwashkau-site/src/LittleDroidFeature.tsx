import { useRef } from 'react';
import { ArrowRight, Heart, Moon, Music2, Sparkles } from 'lucide-react';
import { Nursery } from './BB8Monitor';
import cozyPortrait from './assets/bb8-portraits/bb8-cozy-portrait.svg';

export default function LittleDroidFeature() {
  const sceneRef = useRef<SVGSVGElement>(null);
  return <section id="little-droid" aria-labelledby="little-droid-feature-title" className="relative isolate overflow-hidden border-y border-[#dba374]/20 bg-[#090e0d] py-20 md:py-28">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_35%,rgba(145,176,153,.14),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgba(214,138,69,.1),transparent_50%)]"/>
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
      <div>
        <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dba374]/30 bg-[#dba374]/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[.24em] text-[#e7bc94]"><Sparkles size={13}/> Featured · Little Droid</p>
        <h2 id="little-droid-feature-title" className="text-5xl font-black leading-[.92] tracking-[-.055em] sm:text-6xl xl:text-7xl">SMALL DROID.<span className="block text-[#e4aa78]">BIG HEART.</span></h2>
        <p className="mt-7 max-w-lg text-base leading-relaxed text-[#a8b4aa] md:text-lg">A little peace in a big galaxy. Step into BB-8’s cozy nursery for sleepy beeps, tiny adventures, and visits from his Mars buddies.</p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#c1cdbd]"><span className="inline-flex items-center gap-2"><Moon size={15} className="text-[#e4aa78]"/> Cozy recharge naps</span><span className="inline-flex items-center gap-2"><Music2 size={15} className="text-[#e4aa78]"/> Gentle lullabies</span><span className="inline-flex items-center gap-2"><Heart size={15} className="text-[#e4aa78]"/> Little Mars friends</span></div>
        <a href="/bb8" className="mt-9 inline-flex items-center justify-center gap-4 rounded-lg bg-[#e4aa78] px-6 py-4 text-sm font-bold text-[#16231d] transition-colors hover:bg-[#f3c395] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4aa78]">Visit BB-8’s nursery <ArrowRight size={18}/></a>
        <p className="mt-4 text-[10px] tracking-wide text-[#748578]">A fan-made nursery, full of little moments.</p>
      </div>
      <div className="min-w-0">
        <a href="/bb8" aria-label="Step inside BB-8’s nursery" className="group block overflow-hidden rounded-2xl border border-[#a4b599]/25 bg-[#131e19] shadow-[0_25px_100px_rgba(0,0,0,.35)] transition-colors hover:border-[#e4aa78]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4aa78]">
          <div className="flex items-center justify-between gap-3 px-5 py-4 text-[10px] tracking-wide text-[#d5dfcf]"><span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#acbf94]"/> BB-8’s nursery</span><span className="font-mono text-[9px] uppercase tracking-[.15em] text-[#8c9f90]">A peek inside</span></div>
          <div className="aspect-[960/650] overflow-hidden"><Nursery mood="sleeping" activity="sleeping" night={false} sceneRef={sceneRef} friends={[]} wallPhoto={cozyPortrait} cribPhoto={cozyPortrait} pastime={null} visiting={['percy', 'oppy', 'ginny']}/></div>
          <div className="flex items-center justify-between gap-3 border-t border-white/5 px-5 py-4 text-[11px] text-[#b3c2ab]"><span>Little droid. Very good company.</span><ArrowRight size={16} className="text-[#e4aa78] transition-transform group-hover:translate-x-1"/></div>
        </a>
        <div className="mt-5 flex justify-between gap-4 px-1 text-[10px] text-[#80927e]"><span>25 little adventures</span><span>3 Mars buddies</span><span>One happy place</span></div>
      </div>
    </div>
  </section>;
}
