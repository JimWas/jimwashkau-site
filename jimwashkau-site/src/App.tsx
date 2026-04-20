import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Calendar, ChevronRight } from 'lucide-react';

// Force import the markdown files so they are bundled
import opOrion from './content/logs/op-orion.md?raw';
import opViper from './content/logs/op-viper.md?raw';
import opWailingWalrus from './content/logs/op-wailingwalrus.md?raw';
import opDancingThunder from './content/logs/op-dancingthunder.md?raw';
import cmDancingSwamp from './content/logs/cm-dancingswamp.md?raw';
import cambodia17 from './content/logs/cambodia-17.md?raw';
import opSailingfrogs from './content/logs/op-sailingfrogs.md?raw';

const MOCK_MODULES: Record<string, string> = {
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

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter uppercase">
            JimWashkau<span className="text-brand">.com</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest">
            <a href="#mission" className="hover:text-brand transition-colors">THE MISSION</a>
            <a href="#capabilities" className="hover:text-brand transition-colors">CAPABILITIES</a>
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
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Mission Background" 
            className="w-full h-full object-cover opacity-40"
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
              /// One day at a time.
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

      {/* Capabilities Section */}
      <section id="capabilities" className="py-32 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">CORE CAPABILITIES</h2>
            <div className="h-1 w-24 bg-brand"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
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
            <a href="https://www.linkedin.com/in/jimwashkau/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">LINKEDIN</a>
            <a href="https://github.com/JimWas" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">GITHUB</a>
            <a href="https://x.com/JimWashkau" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">X.COM</a>
          </div>
        </div>
      </footer>
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

export default App;
