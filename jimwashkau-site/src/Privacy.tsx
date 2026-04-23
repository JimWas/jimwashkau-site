import React from 'react';
import { Shield, Lock, EyeOff, Server, Home } from 'lucide-react';

const Privacy: React.FC = () => {
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
            Privacy Protocol
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-3 py-1 border border-brand text-brand text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">
            Data Integrity & User Privacy
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase">
            Privacy <span className="text-brand">Policy</span>
          </h1>
          <p className="text-xl text-zinc-400 font-mono italic max-w-2xl mx-auto">
            /// Standard privacy protocols for VNDUSD and all iOS applications published by Jim Washkau.
          </p>
          <p className="mt-8 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Last Updated: April 23, 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          
          {/* Core Philosophy */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <Shield className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">Core Philosophy</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-4">
              <p>
                My applications are built on the principle of <span className="text-white font-bold">Privacy by Design</span>. I believe that your data belongs to you, and my software should function as a local tool rather than a data collection gateway.
              </p>
            </div>
          </div>

          {/* Data Collection */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <EyeOff className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">Data Collection</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-6">
              <div>
                <h3 className="text-white font-bold uppercase mb-2">No Personal Information</h3>
                <p>I do not collect, store, or transmit any personal identifiable information (PII). My apps do not require account creation on my servers, nor do they track your location or usage habits for advertising purposes.</p>
              </div>
              <div>
                <h3 className="text-white font-bold uppercase mb-2">On-Device Processing</h3>
                <p>All complex operations—including speech recognition, financial calculations, and data formatting—occur locally on your iOS device using Apple's native frameworks. Your raw data never leaves your device unless you explicitly authorize a transmission.</p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <Server className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">Third-Parties</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-4">
              <p>
                Certain applications may allow you to connect to third-party services (e.g., GitHub). In these cases:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-brand mr-2">›</span>
                  <span>Connections are direct between your device and the service provider.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">›</span>
                  <span>I do not act as an intermediary for your data or credentials.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-2">›</span>
                  <span>Your interactions are governed by the third-party's own privacy policy.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Security */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <Lock className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">Data Security</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-4">
              <p>
                Sensitive information, such as API tokens or integration keys, is stored exclusively in the <span className="text-white font-bold">iOS Keychain</span>. This ensures that your credentials remain encrypted and protected by the system's hardware-level security.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-20 p-12 bg-zinc-950 border border-white/10 text-center">
            <h2 className="text-2xl font-black mb-4 uppercase">Questions?</h2>
            <p className="text-zinc-500 font-mono text-sm mb-8">
              If you have any questions regarding these privacy protocols, please contact me directly.
            </p>
            <a 
              href="mailto:contact@jimwashkau.com" 
              className="inline-block px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand hover:text-white transition-all duration-300"
            >
              CONTACT JIM
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-zinc-500 font-mono tracking-wider">
            © 2026 JIM WASHKAU. ALL RIGHTS RESERVED. // PRIVACY SECURE
          </div>
          <div className="flex space-x-6 text-sm font-bold tracking-widest">
            <a href="/" className="hover:text-brand transition-colors">HOME</a>
            <a href="/support" className="hover:text-brand transition-colors">SUPPORT</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
