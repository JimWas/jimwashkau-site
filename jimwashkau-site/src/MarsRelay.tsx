import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Zap, 
  Wifi, 
  WifiOff, 
  Activity, 
  ShieldAlert, 
  Cpu, 
  ArrowLeft, 
  Signal,
  MessageSquare,
  Globe,
  Compass,
  Mic,
  Square,
  Radio,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'Mars' | 'Earth';
  text: string;
  timestamp: number;
  size: number;
}

interface QueuedMessage {
  id: string;
  sender: 'Mars' | 'Earth';
  text: string;
  status: 'transmitting' | 'in-transit' | 'delivered';
  size: number;
  transmissionStart: number;
  transmissionDuration: number;
  delayStart: number;
  totalDeliveryTime: number;
}

interface AISuggestion {
  type: 'compression' | 'shortened' | 'priority' | 'warning';
  text: string;
  action?: () => void;
}

const DISTANCES = {
  MOON: { label: 'Moon', delay: 1.3, rate: 50000 },
  MARS: { label: 'Mars', delay: 1140, rate: 1900 },
  DEEP_SPACE: { label: 'Deep Space (Jupiter)', delay: 1980, rate: 800 }
};

const formatTime = (seconds: number) => {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s.toString().padStart(2, '0')}s`;
};

function SignalPath({ queue, distance, currentTime }: { queue: QueuedMessage[], distance: keyof typeof DISTANCES, currentTime: number }) {
  const config = DISTANCES[distance];
  
  return (
    <div className="border-b border-white/10 bg-zinc-950/50 p-6 relative overflow-hidden h-32 flex items-center shrink-0">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,204,0.1),transparent_70%)]"></div>
      </div>
      
      {/* Earth Side */}
      <div className="flex flex-col items-center justify-center z-10 w-24">
        <div className="relative">
          <Globe size={28} className="text-blue-500 mb-2 relative z-10" />
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
        </div>
        <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">Earth</span>
      </div>
      
      {/* Space Path */}
      <div className="flex-1 px-8 relative h-full flex items-center">
        {/* The path line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-blue-500/40 via-zinc-800 to-accent/40"></div>
        
        {/* Grid lines for distance feel */}
        <div className="absolute inset-0 flex justify-between px-8 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-full w-[1px] bg-white/5"></div>
          ))}
        </div>

        {/* Active Transmissions */}
        {queue.map(msg => {
          const totalTime = msg.transmissionDuration + msg.totalDeliveryTime;
          const elapsed = (currentTime - msg.transmissionStart) / 1000;
          
          if (elapsed < 0) {
            // Scheduled but not yet sent (e.g. response waiting at Earth)
            const isAtEarth = msg.sender === 'Earth';
            return (
              <div 
                key={msg.id}
                className={`absolute top-1/2 -translate-y-1/2 ${isAtEarth ? 'left-0' : 'right-0'}`}
              >
                <div className={`w-2 h-2 rounded-full bg-zinc-700 animate-pulse`} />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-zinc-600 uppercase">
                  Pending
                </div>
              </div>
            );
          }
          
          if (elapsed > totalTime) return null;
          
          const progress = (elapsed / totalTime) * 100;
          const position = msg.sender === 'Earth' 
            ? progress // Earth -> Mars (Left to Right)
            : (100 - progress); // Mars -> Earth (Right to Left)
          
          return (
            <div 
              key={msg.id}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center group z-20"
              style={{ left: `${position}%`, transition: 'left 1s linear' }}
            >
              <div className={`w-3 h-3 rounded-full ${msg.sender === 'Mars' ? 'bg-brand shadow-[0_0_15px_#0066cc]' : 'bg-accent shadow-[0_0_15px_#ff5c00]'} animate-pulse`} />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-2 py-0.5 border border-white/10 text-[9px] font-bold text-white backdrop-blur-sm">
                ETA {formatTime(Math.max(0, totalTime - elapsed))}
              </div>
              <div className={`absolute top-4 ${msg.sender === 'Mars' ? 'text-brand' : 'text-accent'} text-[10px] font-black`}>
                {msg.sender === 'Mars' ? '◀' : '▶'}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Target Side */}
      <div className="flex flex-col items-center justify-center z-10 w-24">
        <div className="relative mb-2">
          <div className={`w-7 h-7 rounded-full border-2 ${distance === 'MARS' ? 'border-accent bg-accent/20' : 'border-zinc-500 bg-zinc-500/20'} relative z-10`}></div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <div className={`absolute inset-0 ${distance === 'MARS' ? 'bg-accent/10' : 'bg-zinc-500/10'} blur-xl rounded-full`}></div>
        </div>
        <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">{config.label}</span>
      </div>
    </div>
  );
}

export default function MarsRelay() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [queue, setQueue] = useState<QueuedMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [distance, setDistance] = useState<'MOON' | 'MARS' | 'DEEP_SPACE'>('MARS');
  const [isSignalLost, setIsSignalLost] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, queue]);

  // Handle message delivery logic
  useEffect(() => {
    const checkQueue = () => {
      const now = Date.now();
      const newlyDelivered: Message[] = [];
      const remainingQueue: QueuedMessage[] = [];

      queue.forEach(msg => {
        const elapsed = (now - msg.transmissionStart) / 1000;
        const totalWait = msg.transmissionDuration + msg.totalDeliveryTime;

        if (elapsed >= totalWait) {
          newlyDelivered.push({
            id: msg.id,
            sender: msg.sender,
            text: msg.text,
            timestamp: now,
            size: msg.size
          });
        } else {
          remainingQueue.push(msg);
        }
      });

      if (newlyDelivered.length > 0) {
        setMessages(prev => [...prev, ...newlyDelivered]);
        setQueue(remainingQueue);
      }
    };

    const interval = setInterval(checkQueue, 1000);
    return () => clearInterval(interval);
  }, [queue]);

  // Random signal events
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsSignalLost(true);
        setTimeout(() => setIsSignalLost(false), 3000 + Math.random() * 5000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleRecording = () => {
    if (!isRecording) {
      setRecordingTime(0);
      setIsRecording(true);
    } else {
      setIsRecording(false);
      // Simulate sending a voice message
      setInputText(`[VOICE_UPLINK_${Math.random().toString(36).substr(2, 4).toUpperCase()}] Dur: ${recordingTime}s`);
      // We don't call sendMessage here to let user review the text/size
    }
  };

  const calculateSize = (text: string) => {
    return new Blob([text]).size;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);

    // AI logic
    const size = calculateSize(text);
    const suggestions: AISuggestion[] = [];

    if (size > 1000) {
      suggestions.push({
        type: 'warning',
        text: 'Large payload detected. High risk of packet loss.'
      });
      suggestions.push({
        type: 'compression',
        text: 'Suggest delta-encoding or compression to reduce bandwidth.'
      });
    }

    if (text.length > 200) {
      suggestions.push({
        type: 'shortened',
        text: 'Summarize for critical telemetry priority?'
      });
    }

    setAiSuggestions(suggestions);
  };

  const sendMessage = (sender: 'Mars' | 'Earth' = 'Mars') => {
    if (!inputText.trim() || isSignalLost) return;

    const size = calculateSize(inputText);
    const config = DISTANCES[distance];
    const transmissionDuration = size / config.rate;
    
    const newMessage: QueuedMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text: inputText,
      status: 'transmitting',
      size,
      transmissionStart: Date.now(),
      transmissionDuration,
      delayStart: Date.now() + (transmissionDuration * 1000),
      totalDeliveryTime: config.delay
    };

    setQueue(prev => [...prev, newMessage]);
    setInputText('');
    setAiSuggestions([]);

    // Simulate response if it's from Mars
    if (sender === 'Mars') {
      setTimeout(() => {
        const responses = [
          "Loud and clear, Mars Base Alpha. We're processing your data.",
          "Telemetry received. Orbital path looks nominal.",
          "Understood. We are relaying this to Houston.",
          "Signal weak, but message decoded. Please stand by for instructions."
        ];
        const responseText = responses[Math.floor(Math.random() * responses.length)];
        const respSize = calculateSize(responseText);
        
        setQueue(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          sender: 'Earth',
          text: responseText,
          status: 'transmitting',
          size: respSize,
          transmissionStart: Date.now() + (config.delay * 1000) + (transmissionDuration * 1000),
          transmissionDuration: respSize / config.rate,
          delayStart: Date.now() + (config.delay * 1000) + (transmissionDuration * 1000),
          totalDeliveryTime: config.delay
        }]);
      }, 2000);
    }
  };

  const getStatus = (msg: QueuedMessage) => {
    const elapsed = (currentTime - msg.transmissionStart) / 1000;
    if (elapsed < msg.transmissionDuration) return 'transmitting';
    return 'in-transit';
  };

  const getRemainingTime = (msg: QueuedMessage) => {
    const elapsed = (currentTime - msg.transmissionStart) / 1000;
    const total = msg.transmissionDuration + msg.totalDeliveryTime;
    return Math.max(0, Math.round(total - elapsed));
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-mono selection:bg-brand selection:text-white">
      {/* HUD Header */}
      <header className="border-b border-brand/30 bg-black/80 backdrop-blur-md p-4 flex items-center justify-between z-50">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Activity className="text-brand animate-pulse" size={20} />
            <h1 className="text-lg font-black tracking-tighter uppercase">
              MARS<span className="text-brand">RELAY</span> AI
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4 border-l border-white/10 pl-6">
            <div className="text-[10px] space-y-0.5">
              <p className="text-zinc-500 uppercase font-bold tracking-widest">Target</p>
              <p className="text-sm font-bold">{DISTANCES[distance].label}</p>
            </div>
            <div className="text-[10px] space-y-0.5">
              <p className="text-zinc-500 uppercase font-bold tracking-widest">Latency</p>
              <p className="text-sm font-bold">{formatTime(DISTANCES[distance].delay)}</p>
            </div>
            <div className="text-[10px] space-y-0.5">
              <p className="text-zinc-500 uppercase font-bold tracking-widest">Bandwidth</p>
              <p className="text-sm font-bold text-brand">{DISTANCES[distance].rate} B/s</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 border rounded-full text-xs font-bold ${isSignalLost ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-brand/50 text-brand bg-brand/10'}`}>
            {isSignalLost ? <WifiOff size={14} /> : <Wifi size={14} />}
            <span>{isSignalLost ? 'SIGNAL LOST' : 'LINK STABLE'}</span>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="p-2 border border-white/10 hover:border-brand transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Simulation Controls */}
        <aside className="w-80 border-r border-white/10 bg-zinc-950 p-6 flex flex-col space-y-8 hidden lg:flex">
          <section>
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center">
              <Compass size={12} className="mr-2" /> Navigation Presets
            </h2>
            <div className="space-y-2">
              {(Object.keys(DISTANCES) as Array<keyof typeof DISTANCES>).map((k) => (
                <button
                  key={k}
                  onClick={() => setDistance(k)}
                  className={`w-full text-left p-3 border transition-all ${distance === k ? 'border-brand bg-brand/10 text-brand' : 'border-white/5 hover:border-white/20 text-zinc-400'}`}
                >
                  <p className="text-sm font-bold uppercase">{DISTANCES[k].label}</p>
                  <p className="text-[10px] opacity-60">{formatTime(DISTANCES[k].delay)} OWD</p>
                </button>
              ))}
            </div>
          </section>

          <section className="flex-1 overflow-y-auto">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center">
              <Activity size={12} className="mr-2" /> Signal Log
            </h2>
            <div className="space-y-4">
              {queue.map(msg => {
                const isPending = (currentTime - msg.transmissionStart) < 0;
                return (
                  <div key={msg.id} className="group">
                    <div className="flex justify-between items-end mb-1 px-1">
                      <span className={`text-[9px] font-black tracking-widest uppercase ${msg.sender === 'Mars' ? 'text-brand' : 'text-accent'}`}>
                        {msg.sender === 'Mars' ? 'Outgoing' : 'Incoming'}
                      </span>
                      <span className="text-[8px] text-zinc-600 font-mono">{msg.size}B</span>
                    </div>
                    <div className={`p-3 border ${isPending ? 'border-dashed border-white/5 bg-transparent' : 'border-white/10 bg-black/60'} relative transition-all`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-300 truncate w-40 leading-none">
                            {isPending ? 'PENDING RELAY...' : msg.text}
                          </p>
                          <div className="flex items-center space-x-2">
                             <div className={`w-1 h-1 rounded-full ${getStatus(msg) === 'transmitting' ? 'bg-brand animate-pulse' : 'bg-green-500'}`} />
                             <span className="text-[8px] uppercase text-zinc-500 tracking-tighter">
                               {isPending ? 'Queued at remote' : getStatus(msg)}
                             </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end text-brand text-[10px] font-black">
                            <Clock size={10} className="mr-1" />
                            <span>{formatTime(getRemainingTime(msg))}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-1 bg-white/5 w-full overflow-hidden relative">
                        <div 
                          className={`h-full ${msg.sender === 'Mars' ? 'bg-brand shadow-[0_0_8px_#0066cc]' : 'bg-accent shadow-[0_0_8px_#ff5c00]'} transition-all duration-1000`} 
                          style={{ 
                            width: `${isPending ? 0 : Math.min(100, ((currentTime - msg.transmissionStart) / 1000) / (msg.transmissionDuration + msg.totalDeliveryTime) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              {queue.length === 0 && (
                <div className="text-center py-12 border border-dashed border-white/5 rounded-lg">
                  <Signal size={24} className="mx-auto text-zinc-800 mb-3" />
                  <p className="text-zinc-600 text-[9px] uppercase tracking-[0.2em]">No active transmissions</p>
                </div>
              )}
            </div>
          </section>

          <section className="p-4 border border-brand/20 bg-brand/5">
            <div className="flex items-center space-x-2 text-brand mb-2">
              <Cpu size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">AI Operator Active</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Real-time message optimization and priority routing active. Sub-space compression enabled.
            </p>
          </section>
        </aside>

        {/* Middle: Chat Interface */}
        <div className="flex-1 flex flex-col relative bg-black">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[linear-gradient(rgba(0,102,204,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          <SignalPath queue={queue} distance={distance} currentTime={currentTime} />

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar"
          >
            {messages.length === 0 && queue.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <Signal size={48} className="mb-4 animate-pulse" />
                <p className="text-sm uppercase tracking-[0.3em]">Establishing Quantum Link...</p>
                <p className="text-xs mt-2">Maximum throughput: {DISTANCES[distance].rate} B/s</p>
              </div>
            )}
            
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'Mars' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 border ${msg.sender === 'Mars' ? 'border-brand/30 bg-brand/5' : 'border-white/10 bg-zinc-950'} relative group`}>
                  <div className={`absolute -top-2 ${msg.sender === 'Mars' ? 'left-4' : 'right-4'} px-2 bg-black text-[10px] font-bold tracking-widest text-zinc-400`}>
                    {msg.sender.toUpperCase()} MISSION CONTROL
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-200">{msg.text}</p>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-600">
                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    <span>{msg.size} BYTES</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Suggestions Overlay */}
          {aiSuggestions.length > 0 && (
            <div className="mx-6 mb-4 p-4 border border-brand/40 bg-black/90 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-brand">
                  <ShieldAlert size={14} />
                  <span className="text-xs font-bold uppercase tracking-widest">AI Optimization Suggestions</span>
                </div>
                <button onClick={() => setAiSuggestions([])} className="text-zinc-500 hover:text-white">
                  <Zap size={14} />
                </button>
              </div>
              <div className="space-y-2">
                {aiSuggestions.map((s, i) => (
                  <div key={i} className="flex items-start space-x-3 text-[11px] bg-white/5 p-2 border border-white/5">
                    <span className="text-brand font-bold">[0{i+1}]</span>
                    <p className="text-zinc-300">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-zinc-950/50 backdrop-blur-sm">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={handleTextChange}
                placeholder="Enter transmission for Mars Alpha..."
                className="w-full h-24 bg-black border border-white/10 p-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-brand transition-colors resize-none pr-32"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                <div className="text-[10px] text-zinc-500 font-bold">
                  {calculateSize(inputText)} BYTES
                </div>
                <button 
                  onClick={handleRecording}
                  className={`p-3 border transition-all ${isRecording ? 'border-red-500 text-red-500 bg-red-500/10 animate-pulse' : 'border-white/10 text-zinc-400 hover:border-brand hover:text-brand'}`}
                  title={isRecording ? 'Stop Recording' : 'Record Voice'}
                >
                  {isRecording ? <Square size={18} /> : <Mic size={18} />}
                </button>
                <button 
                  onClick={() => sendMessage()}
                  disabled={!inputText.trim() || isSignalLost || isRecording}
                  className={`p-3 border transition-all ${!inputText.trim() || isSignalLost || isRecording ? 'border-white/5 text-zinc-700 cursor-not-allowed' : 'border-brand text-brand hover:bg-brand hover:text-white shadow-[0_0_15px_rgba(0,102,204,0.3)]'}`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              <div className="flex items-center space-x-4">
                <span className="flex items-center"><Globe size={12} className="mr-1" /> Earth Relay: Online</span>
                <span className="flex items-center"><MessageSquare size={12} className="mr-1" /> Buffer: 100%</span>
              </div>
              <div className={isSignalLost ? 'text-red-500' : 'text-brand'}>
                {isSignalLost ? 'LINK ERROR' : 'Ready for uplink'}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="border-t border-white/10 bg-black p-2 flex justify-between text-[9px] text-zinc-600 font-bold tracking-[0.2em] uppercase">
        <div className="flex space-x-6">
          <span>Encryption: AES-4096-QUANTUM</span>
          <span>Protocol: DS-NET-8.2</span>
          <span>Hardware: IBM-Q MARS EDGE</span>
        </div>
        <div className="flex space-x-4">
          <span className="animate-pulse">● System Uplink Active</span>
          <span>{new Date().toISOString()}</span>
        </div>
      </footer>
    </div>
  );
}
