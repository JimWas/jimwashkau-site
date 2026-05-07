import { ArrowLeft } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import AsmrMatrixWidget from './AsmrMatrixWidget';

export default function LoveSignal() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      <Analytics />
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md">
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
        <AsmrMatrixWidget transmitHref="/#contact" />
      </main>
    </div>
  );
}
