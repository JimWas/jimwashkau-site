import { useState, useEffect, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Calendar, ChevronRight, Camera, Shield, Cpu, Smartphone, Heart, ExternalLink, ArrowRight, Check, HeartPulse, Vibrate, Video, Rocket } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Support from './Support';
import Privacy from './Privacy';
import Terms from './Terms';
import MarsRelay from './MarsRelay';
import LoveSignal from './LoveSignal';
import SpaceDrinks from './SpaceDrinks';
import Apps from './Apps';
import TravelVid from './TravelVid';
import IPhoneJailbreakWizard from './IPhoneJailbreakWizard';
import JimWasRecorder from './JimWasRecorder';
import WhatsNew from './WhatsNew';
import JWIosMcp from './JWIosMcp';
import { siteUpdates } from './data/siteUpdates';

// Force import the markdown files so they are bundled
import opOrion from './content/logs/op-orion.md?raw';
import opViper from './content/logs/op-viper.md?raw';
import opWailingWalrus from './content/logs/op-wailingwalrus.md?raw';
import opDancingThunder from './content/logs/op-dancingthunder.md?raw';
import cmDancingSwamp from './content/logs/cm-dancingswamp.md?raw';
import cambodia17 from './content/logs/cambodia-17.md?raw';
import opSailingfrogs from './content/logs/op-sailingfrogs.md?raw';
import opKewltram from './content/logs/op-kewltram.md?raw';
import opBargingspider from './content/logs/op-bargingspider.md?raw';
import opHumidrollers from './content/logs/op-humidrollers.md?raw';
import opWanderingelephant from './content/logs/op-wanderingelephant.md?raw';
import opCroakingmoon from './content/logs/op-croakingmoon.md?raw';
import opJustjesus from './content/logs/op-justjesus.md?raw';
import opCensoredprice from './content/logs/op-censoredprice.md?raw';
import cmPizzacake from './content/logs/cm-pizzacake.md?raw';
import cmTypingpanther from './content/logs/cm-typingpanther.md?raw';
import cmFallingfruit from './content/logs/cm-fallingfruit.md?raw';
import cmSlickedchiken from './content/logs/cm-slickedchiken.md?raw';
import cmFlashingskies from './content/logs/cm-flashingskies.md?raw';
import marsSpirit from './assets/Mars_Spirit.png';
import cmNightstream from './content/logs/cm-nightstream.md?raw';
import cmCraftrain from './content/logs/cm-craftrain.md?raw';

const MOCK_MODULES: Record<string, string> = {
  './content/logs/cm-craftrain.md': cmCraftrain,
  './content/logs/cm-nightstream.md': cmNightstream,
  './content/logs/cm-flashingskies.md': cmFlashingskies,
  './content/logs/cm-slickedchiken.md': cmSlickedchiken,
  './content/logs/cm-fallingfruit.md': cmFallingfruit,
  './content/logs/cm-typingpanther.md': cmTypingpanther,
  './content/logs/cm-pizzacake.md': cmPizzacake,
  './content/logs/op-censoredprice.md': opCensoredprice,
  './content/logs/op-justjesus.md': opJustjesus,
  './content/logs/op-croakingmoon.md': opCroakingmoon,
  './content/logs/op-wanderingelephant.md': opWanderingelephant,
  './content/logs/op-humidrollers.md': opHumidrollers,
  './content/logs/op-bargingspider.md': opBargingspider,
  './content/logs/op-kewltram.md': opKewltram,
  './content/logs/op-sailingfrogs.md': opSailingfrogs,
  './content/logs/op-orion.md': opOrion,
  './content/logs/op-viper.md': opViper,
  './content/logs/op-wailingwalrus.md': opWailingWalrus,
  './content/logs/op-dancingthunder.md': opDancingThunder,
  './content/logs/cm-dancingswamp.md': cmDancingSwamp,
  './content/logs/cambodia-17.md': cambodia17
};

interface Mission {
  id: string;
  title: string;
  tag: string;
  status: string;
  year: string;
  date?: string;
  summary: string;
  audio?: string;
  content: string;
}

interface LiveLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  timestamp: string;
  device_id: string;
  device_name: string;
  received_at: string;
}

// Simple browser-safe frontmatter parser
function parseMarkdown(content: string) {
  const parts = content.split('---');
  if (parts.length < 3) return { data: {} as Record<string, string>, body: content };
  
  const frontmatter = parts[1];
  const body = parts.slice(2).join('---');
  const data: Record<string, string> = {};
  
  frontmatter.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.substring(0, idx).trim();
      let val = line.substring(idx + 1).trim();
      // Remove surrounding quotes if present
      val = val.replace(/^["'](.*)["']$/, '$1');
      data[key] = val;
    }
  });
  
  return { data, body };
}

function App() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [liveLocation, setLiveLocation] = useState<LiveLocation | null>(null);
  const [liveLocationError, setLiveLocationError] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const missionData: Mission[] = [];

        for (const [path, content] of Object.entries(MOCK_MODULES)) {
          try {
            const { data, body } = parseMarkdown(content);
            const id = path.split('/').pop()?.replace('.md', '') || '';
            
            missionData.push({
              id,
              title: data.title || 'Untitled',
              tag: data.tag || 'OP-UNKNOWN',
              status: data.status || 'SUCCESS',
              year: data.year || '2026',
              date: data.date || undefined,
              summary: data.summary || '',
              audio: data.audio || undefined,
              content: body,
            });
          } catch (err) {
            console.error('Error parsing mission at', path, ':', err);
          }
        }

        setMissions(missionData.sort((a, b) => {
          // Sort by date if available
          if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          // Fallback to year
          return parseInt(b.year) - parseInt(a.year);
        }));
      } catch (err) {
        console.error('Failed to load missions:', err);
      }
    };

    loadMissions();
  }, []);

  useEffect(() => {
    let active = true;

    const loadLatestLocation = async () => {
      try {
        const response = await fetch('/api/location/latest', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json() as { status: string; location: LiveLocation | null };

        if (!active) {
          return;
        }

        setLiveLocation(data.location);
        setLiveLocationError(data.location ? null : 'No live fix received yet.');
      } catch {
        if (!active) {
          return;
        }

        setLiveLocationError('Live telemetry is temporarily offline.');
      }
    };

    loadLatestLocation();
    const intervalId = window.setInterval(loadLatestLocation, 30000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  if (currentPath === '/support') {
    return <Support />;
  }

  if (currentPath === '/privacy') {
    return <Privacy />;
  }

  if (currentPath === '/terms') {
    return <Terms />;
  }

  if (currentPath === '/mars-relay') {
    return <MarsRelay />;
  }

  if (currentPath === '/love-signal') {
    return <LoveSignal />;
  }

  if (currentPath === '/space-drinks') {
    return <SpaceDrinks />;
  }

  if (currentPath === '/apps') {
    return <Apps />;
  }

  if (currentPath === '/travelvid') {
    return <TravelVid />;
  }

  if (currentPath === '/iphone-jailbreak-wizard') {
    return <IPhoneJailbreakWizard />;
  }

  if (currentPath === '/jimwas-recorder') {
    return <JimWasRecorder />;
  }

  if (currentPath === '/whats-new') {
    return <WhatsNew />;
  }

  if (currentPath === '/jw-ios-mcp') {
    return <JWIosMcp />;
  }

  const mapBounds = liveLocation
    ? [
        liveLocation.longitude - 0.03,
        liveLocation.latitude - 0.02,
        liveLocation.longitude + 0.03,
        liveLocation.latitude + 0.02,
      ].join(',')
    : '-74.03,40.69,-73.90,40.83';

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds}&layer=mapnik${
    liveLocation ? `&marker=${liveLocation.latitude}%2C${liveLocation.longitude}` : ''
  }`;
  const openStreetMapHref = liveLocation
    ? `https://www.openstreetmap.org/?mlat=${liveLocation.latitude}&mlon=${liveLocation.longitude}#map=13/${liveLocation.latitude}/${liveLocation.longitude}`
    : 'https://www.openstreetmap.org/';
  const lastSeenLabel = liveLocation
    ? new Date(liveLocation.timestamp).toLocaleString()
    : 'Awaiting first uplink';
  const speedMph = liveLocation ? (liveLocation.speed * 2.23694).toFixed(1) : null;
  const accuracyFeet = liveLocation ? Math.round(liveLocation.accuracy * 3.28084) : null;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      <Analytics />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter uppercase">
            JimWashkau<span className="text-brand">.com</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium tracking-widest">
            <a href="#mission" className="hover:text-brand transition-colors">THE MISSION</a>
            <a href="#capabilities" className="hover:text-brand transition-colors">CAPABILITIES</a>
            <a
              href="/apps"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/apps');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              IOS APPS
            </a>
            <a 
              href="/mars-relay" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/mars-relay');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              MARSRELAY
            </a>
            <a
              href="/love-signal"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/love-signal');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              LOVE SIGNAL
            </a>
            <a
              href="/space-drinks"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/space-drinks');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              DRINKS
            </a>
            <a href="#log" className="hover:text-brand transition-colors">MISSION LOG</a>
            <a 
              href="#contact" 
              className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="mission" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={marsSpirit} 
            alt="Mission Background" 
            className="w-full h-full object-cover opacity-[0.76]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.15)_0%,transparent_70%)] pointer-events-none z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 border border-brand text-brand text-xs font-bold tracking-[0.2em] mb-6 uppercase">
              CURRENT STATUS: ALIVE
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 animate-fade-in uppercase">
              MOVING THE <br />
              MISSION FORWARD
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl leading-relaxed italic font-mono">
              Built for today. <span className="text-brand">Ready for</span> tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand hover:text-white transition-all duration-300"
              >
                CONTACT
              </button>
              <button 
                onClick={() => document.getElementById('log')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 border border-white/20 hover:border-white font-bold uppercase tracking-widest transition-all duration-300"
              >
                VIEW ACTIVE LOGS
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 border-t border-l border-white/5 pointer-events-none">
          <div className="w-full h-full opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
      </section>

      {/* JimWas Recorder Product Hero */}
      <section className="relative isolate overflow-hidden border-y border-cyan-300/15 bg-[#05090c] py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_48%,rgba(34,211,238,0.17),transparent_34%),radial-gradient(circle_at_10%_100%,rgba(0,102,204,0.13),transparent_32%)]"></div>
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,.9)]"></span>
              Featured jailbreak deployment
            </div>
            <h2 className="text-5xl font-black leading-[0.86] tracking-[-0.065em] md:text-7xl xl:text-[5.5rem]">
              NEVER LOSE
              <span className="block text-cyan-300">THE MOMENT.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
              JimWas Recorder turns an iOS 16 Dopamine device into a high-reliability background recorder. Start video, audio, or photos from physical buttons or Control Center—even with the screen locked.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Check className="shrink-0 text-cyan-300" size={15} /> 480p through 4K
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <HeartPulse className="shrink-0 text-cyan-300" size={15} /> Five-second watchdog
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Vibrate className="shrink-0 text-cyan-300" size={15} /> Strong state haptics
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Video className="shrink-0 text-cyan-300" size={15} /> Crash-safe segments
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/jimwas-recorder"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, '', '/jimwas-recorder');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-cyan-300 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
              >
                Explore JimWas Recorder
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <a
                href="mailto:contact@jimwashkau.com?subject=JimWas%20Recorder%20for%20iOS%2016"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-cyan-300/60 hover:text-cyan-300"
              >
                Request installation
              </a>
            </div>
          </div>

          <a
            href="/jimwas-recorder"
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState({}, '', '/jimwas-recorder');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo(0, 0);
            }}
            className="group relative block"
            aria-label="Open the JimWas Recorder product page"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-300/10 blur-3xl transition-opacity group-hover:opacity-100"></div>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-black p-2 shadow-[0_45px_120px_rgba(0,0,0,.72),0_0_80px_rgba(34,211,238,.08)] transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src="/recorder/og.png"
                alt="JimWas Recorder background capture product showcase"
                className="aspect-[1200/630] w-full rounded-[1.15rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 shadow-2xl backdrop-blur-xl">
              iOS 16 · Dopamine rootless <ArrowRight size={14} />
            </div>
          </a>
        </div>
      </section>

      {/* iOS Apps Featured Section */}
      <section className="py-24 bg-black border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,204,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/50 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-6">
                <Smartphone size={14} />
                Mobile Deployments
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">
                iOS <span className="text-brand">APPLICATIONS</span>
              </h2>
            </div>
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/apps');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="group flex items-center text-sm font-bold tracking-widest uppercase hover:text-brand transition-colors border-b border-brand/20 pb-2"
            >
              View All iOS Apps <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AppHeroCard 
              name="TravelVid Recorder"
              desc="Professional-grade video recording tool designed for uninterrupted media capture."
              icon={<Camera className="text-brand" size={32} />}
              tag="VIDEO / TRAVEL"
              href="/travelvid"
            />
            <AppHeroCard 
              name="Bodycam Pro"
              desc="Turn your iPhone into a personal body camera for high-reliability documentation."
              icon={<Shield className="text-brand" size={32} />}
              tag="SECURITY / UTILITY"
            />
            <AppHeroCard 
              name="Digital Oracle"
              desc="Matrix AI Productivity Oracle for futuristic decision making and workflows."
              icon={<Cpu className="text-brand" size={32} />}
              tag="AI / PRODUCTIVITY"
            />
          </div>
        </div>
      </section>

      {/* GoFundMe Section */}
      <section className="py-24 bg-brand/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/50 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-8">
            <Heart size={14} fill="currentColor" className="animate-pulse" />
            Active Support Mission
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tight">
            Support My <span className="text-brand">Next Chapter</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 text-lg md:text-xl">
            I'm currently seeking my next professional opportunity. 
            If you've enjoyed my work or want to support my journey, consider contributing to my GoFundMe as I look for what's next.
          </p>
          <a 
            href="https://www.gofundme.com/f/support-jim-while-he-searches-for-his-next-opportunity?attribution_id=sl:8ae82e2e-ae5a-4343-a4ad-1e83e9800c9e"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-5 bg-brand text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,102,204,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
          >
            CONTRIBUTE TO MISSION <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/50 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-6">
                <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_14px_var(--color-brand)]"></span>
                Live Position Feed
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-5">Telemetry Map</h2>
              <p className="text-zinc-400 max-w-2xl leading-relaxed mb-8">
                A live field position feed, styled to match the mission-control feel of the site.
                The endpoint archives each uplink and also exposes a public XML telemetry log.
              </p>

              <div className="grid sm:grid-cols-3 gap-px bg-white/10 mb-8">
                <TelemetryStat label="Last uplink" value={lastSeenLabel} />
                <TelemetryStat label="Speed" value={speedMph ? `${speedMph} mph` : 'No speed'} />
                <TelemetryStat label="Accuracy" value={accuracyFeet ? `${accuracyFeet} ft` : 'Unknown'} />
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.24em]">
                <a
                  href="/api/location/log"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-brand text-white hover:bg-white hover:text-black transition-colors"
                >
                  XML Telemetry Log
                </a>
                <a
                  href={openStreetMapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 border border-white/20 hover:border-brand hover:text-brand transition-colors"
                >
                  Open Full Map
                </a>
              </div>

              {liveLocation && (
                <p className="mt-6 text-sm text-zinc-500 font-mono">
                  {liveLocation.device_name} / {liveLocation.device_id} / {liveLocation.latitude.toFixed(5)},{' '}
                  {liveLocation.longitude.toFixed(5)}
                </p>
              )}
              {liveLocationError && (
                <p className="mt-6 text-sm text-accent font-mono">{liveLocationError}</p>
              )}
            </div>

            <div className="relative border border-brand/25 bg-black/60 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,102,204,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.15)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30"></div>
              <div className="absolute top-5 left-5 z-10 bg-black/85 border border-brand/30 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand mb-1">Location feed</p>
                <p className="text-sm font-mono text-zinc-300">{liveLocation?.device_name ?? 'Awaiting device'}</p>
              </div>
              <iframe
                title="Live location map"
                src={mapSrc}
                className="relative h-[420px] w-full border border-white/10 grayscale contrast-125 brightness-75"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-32 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">CORE CAPABILITIES</h2>
            <div className="h-1 w-24 bg-brand"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10">
            <CapabilityCard 
              title="RAPID DEVELOPER" 
              desc="Develops complex solution to real-world problems." 
              number="01"
            />
            <CapabilityCard 
              title="STRATEGIC EXECUTION" 
              desc="Translating complex visions into executable engineering roadmaps." 
              number="02"
            />
            <CapabilityCard 
              title="TECHNICAL DEPTH" 
              desc="Full-stack expertise across modern distributed systems and cloud scale." 
              number="03"
            />
            <CapabilityCard 
              title="MISSION COMMAND" 
              desc="Leading cross-functional teams to deliver critical results under pressure." 
              number="04"
            />
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/mars-relay');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-left bg-zinc-950 p-10 hover:bg-brand/10 transition-all duration-500 group border-none cursor-pointer"
            >
              <div className="text-brand font-mono mb-8 text-sm tracking-[0.3em] font-bold">05</div>
              <h3 className="text-xl font-black mb-6 group-hover:text-brand transition-colors leading-tight flex items-center">
                MARSRELAY AI <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </h3>
              <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors leading-relaxed">
                Deep space communication simulator with 19-minute latency modeling.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="relative overflow-hidden border-y border-brand/20 bg-black py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(0,102,204,0.18),transparent_34%),radial-gradient(circle_at_82%_54%,rgba(255,92,0,0.10),transparent_30%)]"></div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/50 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-6">
                <Rocket size={14} />
                Site Updates
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
                What&apos;s <span className="text-brand">New</span>
              </h2>
              <p className="text-zinc-400 max-w-xl leading-relaxed mb-9 text-lg">
                Track the newest pages, tools, interactive experiments, and behind-the-scenes fixes shipping across JimWashkau.com.
              </p>
              <a
                href="/whats-new"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, '', '/whats-new');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center gap-3 bg-brand px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-white hover:text-black transition-colors"
              >
                View Full Changelog
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
            </div>

            <div className="grid gap-px bg-white/10">
              {siteUpdates.slice(0, 3).map((update) => (
                <a
                  key={`${update.date}-${update.title}`}
                  href={update.href ?? '/whats-new'}
                  onClick={(event) => {
                    if (!update.href || update.href.startsWith('http')) {
                      return;
                    }
                    event.preventDefault();
                    window.history.pushState({}, '', update.href);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo(0, 0);
                  }}
                  className="group bg-zinc-950/90 p-6 hover:bg-brand/10 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand">{update.date}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-600">{update.category}</div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase mb-3 group-hover:text-brand transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{update.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Log (Portfolio) */}
      <section id="log" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">Mission Log</h2>
              <p className="text-zinc-500 font-mono italic">RETRIEVING ARCHIVED OPERATIONS...</p>
            </div>
            <div className="text-zinc-500 text-sm font-mono border-l-2 border-brand pl-4">
              TOTAL SORTIES: {missions.length} <br />
              SYSTEM STATUS: NOMINAL
            </div>
          </div>

          <div className="space-y-4">
            {missions.map((mission) => (
              <MissionEntry 
                key={mission.id}
                tag={mission.tag} 
                title={mission.title} 
                status={mission.status} 
                year={mission.year}
                onClick={() => setSelectedMission(mission)}
              />
            ))}
            {missions.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
                <p className="text-zinc-500 font-mono uppercase tracking-[0.2em]">No logs currently retrieved.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission Details Modal */}
      {selectedMission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            onClick={() => setSelectedMission(null)}
          ></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/10 overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
              <div className="flex items-center space-x-4">
                <span className="text-brand font-mono font-bold tracking-[0.2em]">{selectedMission.tag}</span>
                <div className="h-4 w-px bg-white/20"></div>
                <h3 className="text-xl font-black uppercase tracking-tight">{selectedMission.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedMission(null)}
                className="p-2 hover:bg-white/10 transition-colors rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-3">
                  <p className="text-xl text-zinc-400 font-medium leading-relaxed mb-8 italic">
                    "{selectedMission.summary}"
                  </p>
                  <div className="prose prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tighter prose-h1:text-4xl prose-h1:font-black">
                    <ReactMarkdown>{selectedMission.content}</ReactMarkdown>
                  </div>
                </div>
                <div className="space-y-6">
                  {selectedMission.audio && (
                    <div className="p-4 border border-brand/20 bg-brand/5">
                      <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-3 flex items-center">
                        <span className="w-2 h-2 bg-brand rounded-full mr-2 animate-pulse"></span>
                        Voice Recording
                      </p>
                      <audio 
                        controls 
                        src={selectedMission.audio} 
                        className="w-full h-8 accent-brand"
                      >
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                  <div className="p-4 border border-white/5 bg-black/30">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Operation Status</p>
                    <div className={`text-xs font-bold inline-block px-2 py-1 border ${selectedMission.status === 'SUCCESS' ? 'border-green-500/50 text-green-500' : 'border-yellow-500/50 text-yellow-500'}`}>
                      {selectedMission.status}
                    </div>
                  </div>
                  <div className="p-4 border border-white/5 bg-black/30">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Deployment Year</p>
                    <div className="text-sm font-bold flex items-center">
                      <Calendar size={14} className="mr-2 text-brand" />
                      {selectedMission.year}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 flex justify-end">
              <button 
                onClick={() => setSelectedMission(null)}
                className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand hover:text-white transition-all duration-300"
              >
                CLOSE LOG
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-brand text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[20vw] font-black opacity-10 select-none leading-none -translate-y-1/4 translate-x-1/4">
          CONTACT
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="text-5xl md:text-7xl font-black mb-8 max-w-2xl">
            READY TO LAUNCH YOUR NEXT MISSION?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-xl font-medium">
            Jim is currently available for hire. Feel free to get in touch!
          </p>
          <a 
            href="mailto:contact@jimwashkau.com" 
            className="inline-block px-12 py-6 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all duration-300"
          >
            CONTACT
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-zinc-500 font-mono tracking-wider">
            © 2026 JIM WASHKAU. ALL RIGHTS RESERVED. // DATA SECURE
          </div>
          <div className="flex space-x-6 text-sm font-bold tracking-widest">
            <a
              href="/whats-new"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/whats-new');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              WHAT'S NEW
            </a>
            <a
              href="/apps"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/apps');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              IOS APPS
            </a>
            <a href="/support" className="hover:text-brand transition-colors">SUPPORT</a>
            <a href="/privacy" className="hover:text-brand transition-colors">PRIVACY</a>
            <a href="https://www.linkedin.com/in/jimwashkau/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">LINKEDIN</a>
            <a href="https://github.com/JimWas" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">GITHUB</a>
            <a href="https://x.com/JimWashkau" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">X.COM</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TelemetryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/60 p-6 border border-transparent">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 mb-3">{label}</p>
      <p className="text-sm md:text-base font-mono text-zinc-100">{value}</p>
    </div>
  );
}

function CapabilityCard({ title, desc, number }: { title: string, desc: string, number: string }) {
  return (
    <div className="bg-zinc-950 p-10 hover:bg-zinc-900 transition-all duration-500 group">
      <div className="text-brand font-mono mb-8 text-sm tracking-[0.3em] font-bold">{number}</div>
      <h3 className="text-xl font-black mb-6 group-hover:text-brand transition-colors leading-tight">{title}</h3>
      <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors leading-relaxed">{desc}</p>
    </div>
  );
}

interface MissionEntryProps {
  tag: string;
  title: string;
  status: string;
  year: string;
  onClick: () => void;
}

function MissionEntry({ tag, title, status, year, onClick }: MissionEntryProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left group border-b border-white/10 py-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 px-4 transition-all duration-300"
    >
      <div className="flex items-center mb-4 md:mb-0">
        <span className="text-brand font-mono font-bold text-sm tracking-widest w-48 shrink-0">{tag}</span>
        <h4 className="text-lg md:text-xl font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">{title}</h4>
      </div>
      <div className="flex items-center space-x-8">
        <span className="text-xs font-mono text-zinc-500">{year}</span>
        <div className={`text-[10px] font-bold px-2 py-1 border ${status === 'SUCCESS' ? 'border-green-500/50 text-green-500' : 'border-yellow-500/50 text-yellow-500'}`}>
          {status}
        </div>
        <ChevronRight size={16} className="text-zinc-700 group-hover:text-brand group-hover:translate-x-1 transition-all" />
      </div>
    </button>
  );
}

function AppHeroCard({ name, desc, icon, tag, href }: { name: string, desc: string, icon: ReactNode, tag: string, href?: string }) {
  const content = (
    <>
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Smartphone size={80} />
      </div>
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="p-4 bg-black border border-white/5 group-hover:border-brand/30 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">{tag}</span>
      </div>
      <h3 className="text-xl font-black mb-4 uppercase group-hover:text-brand transition-colors relative z-10">{name}</h3>
      <p className="text-zinc-500 font-mono text-sm leading-relaxed italic relative z-10">&quot;{desc}&quot;</p>
    </>
  );

  if (href) {
    return (
      <a href={href} className="block bg-zinc-950 p-8 border border-white/10 hover:border-brand/50 transition-all duration-500 group relative">
        {content}
      </a>
    );
  }

  return (
    <div className="bg-zinc-950 p-8 border border-white/10 hover:border-brand/50 transition-all duration-500 group relative">
      {content}
    </div>
  );
}

export default App;
