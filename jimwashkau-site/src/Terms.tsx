import React from 'react';
import { FileText, Scale, ShieldAlert, Globe, Home } from 'lucide-react';

const Terms: React.FC = () => {
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
            Legal Protocol
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-3 py-1 border border-brand text-brand text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">
            Usage Agreement & Legal Terms
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase">
            Terms of <span className="text-brand">Use</span>
          </h1>
          <p className="text-xl text-zinc-400 font-mono italic max-w-2xl mx-auto">
            /// Standard usage protocols for all iOS applications published by Jim Washkau.
          </p>
          <p className="mt-8 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Last Updated: May 2, 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          
          {/* Acceptance of Terms */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <FileText className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">Acceptance</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-4">
              <p>
                By downloading, installing, or using any application published by <span className="text-white font-bold">Jim Washkau</span>, you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the applications.
              </p>
            </div>
          </div>

          {/* License & Restrictions */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <Globe className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">License</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-6">
              <div>
                <h3 className="text-white font-bold uppercase mb-2">Usage Rights</h3>
                <p>I grant you a personal, non-exclusive, non-transferable, limited license to use the applications for personal, non-commercial purposes on devices you own or control.</p>
              </div>
              <div>
                <h3 className="text-white font-bold uppercase mb-2">Prohibited Actions</h3>
                <p>You may not: reverse engineer, decompile, or attempt to extract the source code of the applications; modify or create derivative works; or use the applications for any unlawful purpose.</p>
              </div>
            </div>
          </div>

          {/* Disclaimer of Warranty */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <ShieldAlert className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">Warranty</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-4">
              <p>
                THE APPLICATIONS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, JIM WASHKAU DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="grid md:grid-cols-3 gap-8 items-start border-t border-white/10 pt-16">
            <div className="flex items-center space-x-3 md:col-span-1">
              <Scale className="text-brand" size={24} />
              <h2 className="text-xl font-black uppercase">Liability</h2>
            </div>
            <div className="md:col-span-2 text-zinc-400 font-mono text-sm leading-relaxed space-y-4">
              <p>
                IN NO EVENT SHALL JIM WASHKAU BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF THE USE OF OR INABILITY TO USE THE APPLICATIONS.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-20 p-12 bg-zinc-950 border border-white/10 text-center">
            <h2 className="text-2xl font-black mb-4 uppercase">Legal Inquiries</h2>
            <p className="text-zinc-500 font-mono text-sm mb-8">
              If you have any questions regarding these Terms of Use, please contact me directly.
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
            © 2026 JIM WASHKAU. ALL RIGHTS RESERVED. // TERMS SECURE
          </div>
          <div className="flex space-x-6 text-sm font-bold tracking-widest">
            <a href="/" className="hover:text-brand transition-colors">HOME</a>
            <a href="/support" className="hover:text-brand transition-colors">SUPPORT</a>
            <a href="/privacy" className="hover:text-brand transition-colors">PRIVACY</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
