import { useState, useEffect, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Calendar, ChevronRight, Camera, Shield, Cpu, Smartphone, Heart, ExternalLink, ArrowRight, Check, HeartPulse, Vibrate, Video, Rocket, Languages, Mic2, Volume2, WifiOff, FileText, PenLine, ScanLine, LockKeyhole, Compass, Gauge, MapPin } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Support from './Support';
import Privacy from './Privacy';
import Terms from './Terms';
import MarsRelay from './MarsRelay';
import LoveSignal from './LoveSignal';
import SpaceDrinks from './SpaceDrinks';
import Apps from './Apps';
import TravelVid from './TravelVid';
import LingoEcho from './LingoEcho';
import SwiftPdfEditor from './SwiftPdfEditor';
import IPhoneJailbreakWizard from './IPhoneJailbreakWizard';
import JimWasRecorder from './JimWasRecorder';
import WhatsNew from './WhatsNew';
import JWIosMcp from './JWIosMcp';
import GPhotos2Shorts from './GPhotos2Shorts';
import SoundsOfEarthPrivacy from './SoundsOfEarthPrivacy';
import SoundsOfEarthSupport from './SoundsOfEarthSupport';
import SoundsOfEarth from './SoundsOfEarth';
import WoWPolitics from './WoWPolitics';
import { siteUpdates } from './data/siteUpdates';

const TRAVELVID_APP_STORE_URL = 'https://apps.apple.com/us/app/travelvid-recorder/id6754813702';
const TRAVELVID_SCREENSHOT_URL =
  'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/7b/57/e0/7b57e09b-ffc9-c7fc-795f-7b42c57855a8/Gemini_Generated_Image_hjq8tvhjq8tvhjq8.png/460x996bb.webp';

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

  if (currentPath === '/IPVanish' || currentPath === '/ipvanish') {
    window.location.replace('https://affiliate.ipvanish.com/SHBp');
    return null;
  }

  if (currentPath === '/support') {
    return <Support />;
  }

  if (currentPath === '/privacy') {
    return <Privacy />;
  }

  if (currentPath === '/sounds-of-earth/privacy') {
    return <SoundsOfEarthPrivacy />;
  }

  if (currentPath === '/sounds-of-earth/support') {
    return <SoundsOfEarthSupport />;
  }

  if (currentPath === '/sounds-of-earth' || currentPath === '/sounds-of-earth/') {
    return <SoundsOfEarth />;
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

  if (currentPath === '/travelvid' || currentPath === '/TravelVidRecorder' || currentPath === '/travelvid-recorder') {
    return <TravelVid />;
  }

  if (currentPath === '/LingoEcho' || currentPath === '/lingo-echo') {
    return <LingoEcho />;
  }

  if (currentPath === '/SwiftPDFEditor' || currentPath === '/swift-pdf-editor') {
    return <SwiftPdfEditor />;
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

  if (currentPath === '/gphotos2shorts') {
    return <GPhotos2Shorts />;
  }

  if (currentPath === '/wow-politics' || currentPath === '/WoWPolitics') {
    return <WoWPolitics />;
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
            <a
              href="/wow-politics"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/wow-politics');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              WOW POLITICS
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
              <span className="text-brand">Built</span> for today. <span className="text-brand">Ready</span> for tomorrow.
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

      {/* TravelVid Recorder Product Hero */}
      <section className="relative isolate overflow-hidden border-y border-emerald-300/15 bg-[#040806] py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_18%,rgba(52,211,153,0.18),transparent_32%),radial-gradient(circle_at_16%_88%,rgba(251,146,60,0.12),transparent_30%)]"></div>
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-300/25 bg-emerald-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-300 shadow-[0_0_14px_rgba(253,186,116,.9)]"></span>
              Best app so far · Travel video
            </div>
            <h2 className="text-5xl font-black leading-[0.86] tracking-[-0.065em] md:text-7xl xl:text-[5.55rem]">
              RECORD THE
              <span className="block text-emerald-300">WHOLE JOURNEY.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
              TravelVid Recorder is a focused iPhone camera for long travel moments. Cover Mode keeps the screen useful while segmented recording, GPS context, readiness checks, and recovery tools protect the footage.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Video className="shrink-0 text-emerald-300" size={15} /> Segmented capture
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <MapPin className="shrink-0 text-emerald-300" size={15} /> Route context
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Gauge className="shrink-0 text-emerald-300" size={15} /> Travel dashboard
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Shield className="shrink-0 text-emerald-300" size={15} /> Recovery tools
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/travelvid"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, '', '/travelvid');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-emerald-300 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
              >
                Explore TravelVid
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <a
                href={TRAVELVID_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-emerald-300/60 hover:text-emerald-300"
              >
                App Store <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <a
            href="/travelvid"
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState({}, '', '/travelvid');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo(0, 0);
            }}
            className="group relative mx-auto block w-full max-w-[560px]"
            aria-label="Open the TravelVid Recorder product page"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-300/10 blur-3xl transition-opacity group-hover:opacity-100"></div>
            <div className="relative mx-auto flex justify-center">
              <div className="relative rotate-[2deg] rounded-[3.2rem] border border-white/20 bg-[#131714] p-2.5 shadow-[0_45px_120px_rgba(0,0,0,.72),0_0_80px_rgba(52,211,153,.08)] transition-transform duration-500 group-hover:-translate-y-2">
                <div className="pointer-events-none absolute left-1/2 top-5 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black"></div>
                <img
                  src={TRAVELVID_SCREENSHOT_URL}
                  alt="TravelVid Recorder running on an iPhone"
                  className="h-[560px] w-[259px] rounded-[2.7rem] object-cover sm:h-[650px] sm:w-[300px]"
                />
              </div>
            </div>
            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 shadow-2xl backdrop-blur-xl">
              Version 3.4 · 5.0 rating <ArrowRight size={14} />
            </div>
            <div className="absolute left-0 top-10 hidden w-48 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-2xl backdrop-blur-xl sm:block">
              <div className="mb-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Readiness <Compass className="text-emerald-300" size={15} />
              </div>
              <p className="text-xs font-bold text-zinc-200">Camera, mic, storage, and segment checks before capture.</p>
            </div>
          </a>
        </div>
      </section>

      {/* GPhotos2Shorts Product Hero */}
      <section className="relative isolate overflow-hidden border-y border-cyan-300/15 bg-[#02070c] py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_12%,rgba(0,145,255,0.16),transparent_34%),radial-gradient(circle_at_88%_88%,rgba(249,115,22,0.08),transparent_30%)]"></div>
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,.9)]"></span>
              Open source archive tool
            </div>
            <h2 className="font-['Nasalization'] text-5xl leading-[0.88] tracking-[-0.06em] md:text-7xl xl:text-[5.25rem]">
              MEMORIES IN.
              <span className="block text-cyan-300">SHORTS OUT.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
              GPhotos2Shorts turns complete Google Photos and Apple Photos exports into polished vertical videos without cropping photos, losing Live Photo motion, or repeating archived files.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-cyan-300" size={15} /> Photos + Live Photos</div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-cyan-300" size={15} /> Full length videos</div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-cyan-300" size={15} /> Original video audio</div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-cyan-300" size={15} /> JSON clip manifest</div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/gphotos2shorts"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, '', '/gphotos2shorts');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-cyan-300 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
              >
                Explore GPhotos2Shorts
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <a href="https://github.com/JimWas/GPhotos2Shorts" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-cyan-300/60 hover:text-cyan-300">
                GitHub <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <a
            href="/gphotos2shorts"
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState({}, '', '/gphotos2shorts');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo(0, 0);
            }}
            className="group relative block"
            aria-label="Open the GPhotos2Shorts product page"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-300/10 blur-3xl transition-opacity group-hover:opacity-100"></div>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-black p-2 shadow-[0_45px_120px_rgba(0,0,0,.72),0_0_80px_rgba(34,211,238,.08)] transition-transform duration-500 group-hover:-translate-y-2">
              <img src="/gphotos2shorts/hero.webp" alt="GPhotos2Shorts archive to video product showcase" className="aspect-[3/2] w-full rounded-[1.15rem] object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 shadow-2xl backdrop-blur-xl">
              No crop · Fast · Resumable <ArrowRight size={14} />
            </div>
          </a>
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
              JimWas Recorder turns an iOS 16 Dopamine device into a high reliability background recorder. Start video, audio, or photos from physical buttons or Control Center, even with the screen locked.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Check className="shrink-0 text-cyan-300" size={15} /> 480p through 4K
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <HeartPulse className="shrink-0 text-cyan-300" size={15} /> Five second watchdog
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Vibrate className="shrink-0 text-cyan-300" size={15} /> Strong state haptics
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Video className="shrink-0 text-cyan-300" size={15} /> Crash safe segments
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

      {/* WoWPolitics Product Hero */}
      <section className="relative isolate overflow-hidden border-y border-amber-300/15 bg-[#0b0805] py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_86%_78%,rgba(180,83,9,0.14),transparent_32%)]"></div>
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-amber-300/25 bg-amber-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-amber-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,.9)]"></span>
              Open 24/7 · AzerothCore 3.3.5a
            </div>
            <h2 className="text-5xl font-black leading-[0.86] tracking-[-0.065em] md:text-7xl xl:text-[5.4rem]">
              POLITICS AT
              <span className="block text-amber-300">THE INN.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
              WoWPolitics is a custom public server where ten AI driven playerbots debate Trump and American politics inside Goldshire&apos;s Lion&apos;s Pride Inn, around the clock.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-amber-300" size={15} /> Ten AI playerbots</div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-amber-300" size={15} /> Live inn debates</div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-amber-300" size={15} /> Goldshire setting</div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"><Check className="shrink-0 text-amber-300" size={15} /> Public server</div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/wow-politics"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, '', '/wow-politics');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-amber-300 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
              >
                Enter the Inn
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <a href="https://github.com/JimWas/WoWPolitics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-amber-300/60 hover:text-amber-300">
                View on GitHub <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <a
            href="/wow-politics"
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState({}, '', '/wow-politics');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo(0, 0);
            }}
            className="group relative block"
            aria-label="Open the WoWPolitics server page"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-amber-300/10 blur-3xl transition-opacity group-hover:opacity-100"></div>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-black p-2 shadow-[0_45px_120px_rgba(0,0,0,.72),0_0_80px_rgba(245,158,11,.1)] transition-transform duration-500 group-hover:-translate-y-2">
              <img src="/wow-politics/inn-debate.jpg" alt="AI driven political debate inside the Lion&apos;s Pride Inn" className="aspect-[16/10] w-full rounded-[1.15rem] object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300 shadow-2xl backdrop-blur-xl">
              wowpolitics.jimwashkau.com <ArrowRight size={14} />
            </div>
          </a>
        </div>
      </section>

      {/* Lingo Echo Product Hero */}
      <section className="relative isolate overflow-hidden border-b border-fuchsia-300/15 bg-[#07050c] py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(217,70,239,0.16),transparent_32%),radial-gradient(circle_at_86%_78%,rgba(45,212,191,0.11),transparent_30%)]"></div>
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-fuchsia-300/25 bg-fuchsia-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300 shadow-[0_0_14px_rgba(94,234,212,.9)]"></span>
              App Store travel tool
            </div>
            <h2 className="text-5xl font-black leading-[0.86] tracking-[-0.065em] md:text-7xl xl:text-[5.35rem]">
              SPEAK WITH
              <span className="block text-fuchsia-300">YOUR OWN ECHO.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
              Lingo Echo turns your iPhone into a travel phrase soundboard. Record useful lines in your own voice, save favorites, and replay them when the conversation needs to move.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Mic2 className="shrink-0 text-fuchsia-300" size={15} /> Record & replay
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Volume2 className="shrink-0 text-fuchsia-300" size={15} /> Pronunciation help
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <WifiOff className="shrink-0 text-fuchsia-300" size={15} /> Offline friendly
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <Languages className="shrink-0 text-fuchsia-300" size={15} /> 13+ language packs
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/LingoEcho"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, '', '/LingoEcho');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-fuchsia-300 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
              >
                Explore Lingo Echo
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <a
                href="https://apps.apple.com/us/app/lingo-echo/id6759366510"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-fuchsia-300/60 hover:text-fuchsia-300"
              >
                App Store <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <a
            href="/LingoEcho"
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState({}, '', '/LingoEcho');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo(0, 0);
            }}
            className="group relative block"
            aria-label="Open the Lingo Echo product page"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-fuchsia-300/10 blur-3xl transition-opacity group-hover:opacity-100"></div>
            <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#110c18] p-7 shadow-[0_45px_120px_rgba(0,0,0,.72),0_0_80px_rgba(217,70,239,.08)] transition-transform duration-500 group-hover:-translate-y-2">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-300">Quick Phrase Deck</p>
                  <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">Travel mode</h3>
                </div>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-fuchsia-300 text-black">
                  <Languages size={26} />
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Taxi', 'Take me here', 'PLAY'],
                  ['Food', 'No spicy', 'SAVE'],
                  ['Hotel', 'I have a reservation', 'PLAY'],
                  ['Market', 'How much?', 'ECHO'],
                ].map(([label, phrase, action]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/35 p-5">
                    <div className="mb-7 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                      <span>{label}</span>
                      <span>{action}</span>
                    </div>
                    <p className="text-lg font-black">{phrase}</p>
                    <div className="mt-4 flex h-8 items-end gap-1">
                      {[34, 55, 28, 62, 40, 70, 36, 50].map((height, index) => (
                        <span key={index} className="w-full rounded-full bg-fuchsia-300" style={{ height: `${height}%` }}></span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-300 shadow-2xl backdrop-blur-xl">
              iPhone · Free with premium unlock <ArrowRight size={14} />
            </div>
          </a>
        </div>
      </section>

      {/* Swift PDF Editor Product Hero */}
      <section className="relative isolate overflow-hidden border-b border-sky-300/15 bg-[#05080c] py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_24%,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_10%_88%,rgba(16,185,129,0.11),transparent_30%)]"></div>
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-sky-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]"></span>
              Productivity app · PDF toolkit
            </div>
            <h2 className="text-5xl font-black leading-[0.86] tracking-[-0.065em] md:text-7xl xl:text-[5.35rem]">
              PAPERWORK
              <span className="block text-sky-300">WITHOUT THE DESK.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
              Swift PDF Editor helps you sign, edit, scan, compress, convert, protect, and share documents right from your iPhone, with local processing and no account required.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <PenLine className="shrink-0 text-sky-300" size={15} /> Sign & annotate
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <ScanLine className="shrink-0 text-sky-300" size={15} /> Scan paper
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <FileText className="shrink-0 text-sky-300" size={15} /> Convert files
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                <LockKeyhole className="shrink-0 text-sky-300" size={15} /> Protect PDFs
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/SwiftPDFEditor"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, '', '/SwiftPDFEditor');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-sky-300 px-8 py-5 text-sm font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
              >
                Explore Swift PDF Editor
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <a
                href="https://apps.apple.com/us/app/swift-pdf-editor/id6759518269"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-8 py-5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-sky-300/60 hover:text-sky-300"
              >
                App Store <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <a
            href="/SwiftPDFEditor"
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState({}, '', '/SwiftPDFEditor');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo(0, 0);
            }}
            className="group relative block"
            aria-label="Open the Swift PDF Editor product page"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-sky-300/10 blur-3xl transition-opacity group-hover:opacity-100"></div>
            <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0c141d] p-7 shadow-[0_45px_120px_rgba(0,0,0,.72),0_0_80px_rgba(56,189,248,.08)] transition-transform duration-500 group-hover:-translate-y-2">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-sky-300">Document Command Center</p>
                  <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">Contract.pdf</h3>
                </div>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-300 text-black">
                  <FileText size={26} />
                </span>
              </div>

              <div className="rounded-2xl bg-white p-5 text-black">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Page 1 of 4</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">Signed</span>
                </div>
                <div className="space-y-2">
                  <span className="block h-2 rounded-full bg-sky-100"></span>
                  <span className="block h-2 w-10/12 rounded-full bg-sky-100"></span>
                  <span className="block h-2 w-8/12 rounded-full bg-sky-100"></span>
                </div>
                <div className="mt-6 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 p-4">
                  <p className="font-serif text-2xl italic text-sky-800">James W.</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ['Edit', 'Text + markup'],
                  ['Scan', 'Paper to PDF'],
                  ['Compress', 'Email ready'],
                  ['Protect', 'Password tools'],
                ].map(([label, detail]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/35 p-5">
                    <p className="text-sm font-black uppercase">{label}</p>
                    <p className="mt-1 text-xs text-zinc-500">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-sky-300 shadow-2xl backdrop-blur-xl">
              iPhone · Local document work <ArrowRight size={14} />
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
              desc="Professional grade video recording tool designed for uninterrupted media capture."
              icon={<Camera className="text-brand" size={32} />}
              tag="VIDEO / TRAVEL"
              href="/travelvid"
            />
            <AppHeroCard 
              name="Bodycam Pro"
              desc="Turn your iPhone into a personal body camera for high reliability documentation."
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
                A live field position feed, styled to match the mission control feel of the site.
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
              desc="Develops complex solutions to real world problems." 
              number="01"
            />
            <CapabilityCard 
              title="STRATEGIC EXECUTION" 
              desc="Translating complex visions into executable engineering roadmaps." 
              number="02"
            />
            <CapabilityCard 
              title="TECHNICAL DEPTH" 
              desc="Full stack expertise across modern distributed systems and cloud scale." 
              number="03"
            />
            <CapabilityCard 
              title="MISSION COMMAND" 
              desc="Leading cross functional teams to deliver critical results under pressure." 
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
                Deep space communication simulator with 19 minute latency modeling.
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
                Track the newest pages, tools, interactive experiments, and behind the scenes fixes shipping across JimWashkau.com.
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
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand">{update.date.replaceAll('-', '.')}</div>
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
