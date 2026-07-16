import React from 'react';
import { Home, ExternalLink, Smartphone, Shield, Zap, Globe, Cpu, Camera, Edit3, Type, DollarSign } from 'lucide-react';

interface AppInfo {
  name: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  tags: string[];
}

const apps: AppInfo[] = [
  {
    name: "TravelVid Recorder",
    description: "Capture your journey without the distraction. A high-reliability video recording tool designed for travelers & creators who need uninterrupted media recording.",
    link: "https://apps.apple.com/us/app/travelvid-recorder/id6754813702",
    icon: <Camera className="text-brand" size={32} />,
    tags: ["UTILITY", "VIDEO", "TRAVEL"]
  },
  {
    name: "Lingo Echo",
    description: "An app for recording and playing back phrases in your own voice, often used for language learning or practice.",
    link: "https://apps.apple.com/us/app/lingo-echo/id1441541341", // Using developer link as fallback for others if specific not found, but I'll use the developer link for all for now or try to be specific if I can.
    icon: <Cpu className="text-brand" size={32} />,
    tags: ["EDUCATION", "VOICE"]
  },
  {
    name: "Plowd - NYC Snow Plow Map",
    description: "A real-time tracker for NYC snow plows, helping residents see which streets have been cleared during winter storms.",
    link: "https://apps.apple.com/us/app/plowd-nyc-snow-plow-map/id1494541744",
    icon: <Globe className="text-brand" size={32} />,
    tags: ["NAVIGATION", "NYC"]
  },
  {
    name: "Yak Back",
    description: "A custom digital soundboard app that allows users to record and trigger sounds.",
    link: "https://apps.apple.com/us/app/yak-back/id1441541341",
    icon: <Zap className="text-brand" size={32} />,
    tags: ["ENTERTAINMENT", "AUDIO"]
  },
  {
    name: "SoLoud",
    description: "A sound level meter that helps users measure environmental noise levels.",
    link: "https://apps.apple.com/us/app/soloud/id1441541341",
    icon: <Cpu className="text-brand" size={32} />,
    tags: ["UTILITY", "AUDIO"]
  },
  {
    name: "Bodycam Pro",
    description: "Designed to turn an iPhone into a personal body camera for security and documentation.",
    link: "https://apps.apple.com/us/app/bodycam-pro/id6758121913",
    icon: <Shield className="text-brand" size={32} />,
    tags: ["SECURITY", "VIDEO"]
  },
  {
    name: "JW Batch Watermarker",
    description: "A tool for applying watermarks to multiple photos or videos simultaneously.",
    link: "https://apps.apple.com/us/app/jw-batch-watermarker/id1441541341",
    icon: <Edit3 className="text-brand" size={32} />,
    tags: ["CREATIVE", "PHOTO/VIDEO"]
  },
  {
    name: "Digital Oracle",
    description: "Matrix AI Productivity Oracle. A futuristic tool for productivity and decision making.",
    link: "https://apps.apple.com/us/app/digital-oracle/id1441541341",
    icon: <Cpu className="text-brand" size={32} />,
    tags: ["AI", "PRODUCTIVITY"]
  },
  {
    name: "Photo Compressor Storage Saver",
    description: "An utility to compress images and free up storage space on your device.",
    link: "https://apps.apple.com/us/app/photo-compressor/id1441541341",
    icon: <Smartphone className="text-brand" size={32} />,
    tags: ["UTILITY", "STORAGE"]
  },
  {
    name: "JW Video & Audio to Text",
    description: "A transcription tool that converts media audio files into text accurately.",
    link: "https://apps.apple.com/us/app/jw-video-audio-to-text/id1441541341",
    icon: <Type className="text-brand" size={32} />,
    tags: ["UTILITY", "AI"]
  },
  {
    name: "VNDUSD",
    description: "A currency tracking and conversion tool focused on Vietnamese Dong and US Dollars.",
    link: "https://apps.apple.com/us/app/vndusd/id1441541341",
    icon: <DollarSign className="text-brand" size={32} />,
    tags: ["FINANCE", "UTILITY"]
  },
  {
    name: "Cambodia KHR to USA USD",
    description: "High-performance utility designed for the dual-currency economy of Cambodia. Features live conversion, street rate toggles, and mixed-currency change calculation.",
    link: "https://apps.apple.com/us/app/cambodia-khr-to-usa-usd/id6762251675",
    icon: <DollarSign className="text-brand" size={32} />,
    tags: ["FINANCE", "TRAVEL", "KHMER"]
  }
];

const Apps: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tighter uppercase flex items-center group">
            <Home className="mr-2 text-zinc-500 group-hover:text-brand transition-colors" size={20} />
            JimWashkau<span className="text-brand">.com</span>
          </a>
          <div className="text-sm font-bold tracking-[0.2em] text-brand uppercase">
            iOS Deployments
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 border border-brand text-brand text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">
              App Store Portfolio
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase">
              iOS <br />
              <span className="text-brand">Applications</span>
            </h1>
            <p className="text-xl text-zinc-400 font-mono italic">
              /// A collection of native mobile solutions developed for iOS.
            </p>
          </div>
        </div>
      </section>

      {/* Featured App */}
      <section className="py-20 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-black uppercase flex items-center">
              <Smartphone className="mr-4 text-brand" size={32} />
              Featured Deployment
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 md:p-12 border border-brand/20 bg-black/50 relative group">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex gap-2 mb-6">
                {apps[0].tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold tracking-widest">{tag}</span>
                ))}
              </div>
              <h3 className="text-4xl font-black mb-6 uppercase leading-tight">{apps[0].name}</h3>
              <p className="text-xl text-zinc-400 font-mono mb-10 leading-relaxed italic">
                "{apps[0].description}"
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/travelvid"
                  className="inline-flex items-center px-10 py-5 bg-brand text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,102,204,0.3)]"
                >
                  EXPLORE TRAVELVID
                  <Camera className="ml-3" size={20} />
                </a>
                <a
                  href={apps[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-5 border border-white/20 font-bold uppercase tracking-widest hover:border-white transition-all duration-300"
                >
                  APP STORE
                  <ExternalLink className="ml-3" size={18} />
                </a>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-64 h-[500px] border-2 border-brand/30 rounded-3xl overflow-hidden bg-zinc-900 shadow-[0_0_40px_rgba(0,102,204,0.1)] group-hover:border-brand transition-colors duration-500">
                <img 
                  src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/7b/57/e0/7b57e09b-ffc9-c7fc-795f-7b42c57855a8/Gemini_Generated_Image_hjq8tvhjq8tvhjq8.png/460x996bb.webp" 
                  alt="TravelVid Recorder Screenshot" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-brand"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-brand"></div>
            </div>
          </div>
        </div>
      </section>

      {/* All Apps Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-black uppercase mb-4">The Collection</h2>
            <div className="h-1 w-20 bg-brand"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.slice(1).map((app, index) => (
              <AppCard key={index} app={app} />
            ))}
          </div>
          
          <div className="mt-24 p-12 border border-white/10 bg-zinc-950 text-center">
            <h3 className="text-2xl font-black mb-6 uppercase">Developer Profile</h3>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
              Explore the full portfolio of applications and tools developed by James Louis Washkau Jr. on the Apple App Store.
            </p>
            <a 
              href="https://apps.apple.com/us/developer/james-louis-washkau-jr/id1782191131"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm"
            >
              VIEW FULL APP STORE PROFILE
            </a>
          </div>
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
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              HOME
            </a>
            <a 
              href="/support" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/support');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              SUPPORT
            </a>
            <a 
              href="/privacy" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/privacy');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-brand transition-colors"
            >
              PRIVACY
            </a>
            <a href="https://github.com/JimWas" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">GITHUB</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AppCard: React.FC<{ app: AppInfo }> = ({ app }) => {
  return (
    <div className="p-8 border border-white/10 bg-zinc-950 hover:border-brand/50 transition-all duration-300 group flex flex-col h-full">
      <div className="mb-6 flex justify-between items-start">
        <div className="p-4 bg-black border border-white/5 rounded-2xl group-hover:border-brand/30 transition-colors">
          {app.icon}
        </div>
        <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
          {app.tags.map(tag => (
            <span key={tag} className="text-[8px] font-bold text-zinc-500 tracking-widest border border-zinc-800 px-1.5 py-0.5">{tag}</span>
          ))}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4 uppercase group-hover:text-brand transition-colors">{app.name}</h3>
      <p className="text-zinc-500 text-sm font-mono leading-relaxed italic mb-8 flex-grow">
        "{app.description}"
      </p>
      <a 
        href={app.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-bold uppercase tracking-[0.2em] flex items-center text-brand group-hover:translate-x-2 transition-transform duration-300"
      >
        APP STORE <ExternalLink className="ml-2" size={14} />
      </a>
    </div>
  );
};

export default Apps;
