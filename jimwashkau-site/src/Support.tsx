import React from 'react';
import { Mail, Shield, MessageCircle, HelpCircle, ChevronRight, Home } from 'lucide-react';

const Support: React.FC = () => {
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
            Support Center
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 border border-brand text-brand text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">
              iOS Application Support
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase">
              System <br />
              <span className="text-brand">Assistance</span>
            </h1>
            <p className="text-xl text-zinc-400 font-mono italic">
              /// Support and documentation for VNDUSD and other iOS deployments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-12">
              {/* FAQ Section */}
              <div>
                <h2 className="text-3xl font-black mb-8 uppercase flex items-center">
                  <HelpCircle className="mr-4 text-brand" size={32} />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <FAQItem 
                    question="How do I get help with a specific app like VNDUSD?" 
                    answer="For application-specific support, please ensure you have the latest version installed from the App Store. If issues persist, use the 'EMAIL SUPPORT' link to contact me directly with your app version and iOS device details." 
                  />
                  <FAQItem 
                    question="How do I connect my external accounts?" 
                    answer="If the app supports third-party integrations (such as GitHub for mission logging), navigate to the 'Settings' section within the app to enter your authentication tokens or credentials securely." 
                  />
                  <FAQItem 
                    question="Where is my data stored?" 
                    answer="My apps are designed with a 'Privacy-First' approach. Most data is stored locally on your device or transmitted directly to your own private repositories/accounts without passing through third-party servers." 
                  />
                  <FAQItem 
                    question="Is my personal information collected?" 
                    answer="No. I do not collect or sell your personal information. Most processing (like speech-to-text or financial calculations) occurs entirely on-device to ensure maximum security." 
                  />
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="p-8 border border-white/10 bg-zinc-950">
                <h3 className="text-xl font-bold mb-6 uppercase">Common Troubleshooting</h3>
                <ul className="space-y-4 text-zinc-400 font-mono text-sm">
                  <li className="flex items-start">
                    <span className="text-brand mr-2">›</span>
                    <span>Ensure you have granted Microphone and Speech Recognition permissions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand mr-2">›</span>
                    <span>Verify that your GitHub repository exists and the token is correct.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand mr-2">›</span>
                    <span>Check that you have a stable internet connection for 'TRANSMIT' operations.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar Contact */}
            <div className="space-y-8">
              <div className="p-8 bg-brand text-white">
                <MessageCircle className="mb-6" size={40} />
                <h3 className="text-2xl font-black mb-4 uppercase">Direct Support</h3>
                <p className="mb-8 font-medium opacity-90">
                  Can't find what you're looking for? Contact me directly for assistance with VNDUSD or any of my other applications.
                </p>
                <a 
                  href="mailto:contact@jimwashkau.com" 
                  className="inline-flex items-center px-6 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all text-sm"
                >
                  <Mail className="mr-3" size={18} />
                  EMAIL SUPPORT
                </a>
              </div>

              <div id="privacy" className="p-8 border border-white/10 bg-zinc-950">
                <Shield className="mb-6 text-brand" size={32} />
                <h3 className="text-lg font-bold mb-4 uppercase tracking-tight">Privacy Strategy</h3>
                <div className="text-zinc-500 text-sm leading-relaxed space-y-4 font-mono italic">
                  <p>
                    All my applications are built with a zero-data-retention policy. I do not operate servers to store your personal data, calculations, or authentication credentials.
                  </p>
                  <ul className="space-y-2">
                    <li>• Processing occurs entirely on your device.</li>
                    <li>• Sensitive keys are stored securely in the iOS Keychain.</li>
                    <li>• Data is transmitted only to accounts you explicitly authorize.</li>
                  </ul>
                </div>
              </div>
            </div>
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
            <a href="/" className="hover:text-brand transition-colors">HOME</a>
            <a href="/privacy" className="hover:text-brand transition-colors">PRIVACY</a>
            <a href="https://github.com/JimWas" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">GITHUB</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-white/5 bg-zinc-950 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="font-bold uppercase tracking-tight">{question}</span>
        <ChevronRight className={`text-brand transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} size={20} />
      </button>
      {isOpen && (
        <div className="p-6 pt-0 text-zinc-400 font-mono text-sm border-t border-white/5 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default Support;
