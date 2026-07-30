import { ArrowLeft, Bot, BrainCircuit, Cable, CheckCircle2, Cpu, Eye, Fingerprint, LockKeyhole, Server, TerminalSquare, Wrench } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const architecture = [
  {
    icon: Server,
    title: 'Rootless daemon',
    body: 'A LaunchDaemon keeps the MCP endpoint alive outside the app sandbox, listens on the device network, and owns long-running agent sessions.',
  },
  {
    icon: Cable,
    title: 'SpringBoard bridge',
    body: 'A companion hook handles UI-level perception and touch injection where the daemon cannot safely reach UIKit and SpringBoard services.',
  },
  {
    icon: Cpu,
    title: 'Local IPC',
    body: 'Daemon and hook communicate over a Unix socket so screen state, actions, and lifecycle commands stay fast and isolated on-device.',
  },
] as const;

const toolGroups = [
  {
    title: 'Perception',
    tools: ['take_screenshot', 'get_ui_tree', 'device_info'],
  },
  {
    title: 'Interaction',
    tools: ['tap_coordinate', 'swipe_gesture', 'type_text', 'system_control'],
  },
  {
    title: 'Apps',
    tools: ['launch_app', 'kill_app', 'list_installed_apps'],
  },
  {
    title: 'Files & Shell',
    tools: ['read_file', 'write_file', 'execute_shell'],
  },
] as const;

const safetyNotes = [
  'Bearer-token authorization for every MCP request.',
  'LAN-scoped access with origin validation and explicit host allowlists.',
  'Adaptive screenshot sizing so visual context does not overload the device.',
  'Autorelease pools around frame capture and UIKit-heavy work.',
  'Separation between agent protocol, privileged daemon work, and SpringBoard UI work.',
] as const;

export default function JWIosMcp() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
      <Analytics />
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
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
        <section className="relative min-h-[82vh] pt-20 flex items-center overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_18%,rgba(0,102,204,0.22),transparent_34%),radial-gradient(circle_at_78%_42%,rgba(255,92,0,0.10),transparent_30%)]" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute -right-20 top-28 h-80 w-80 rounded-full border border-brand/20" />
          <div className="absolute -right-8 top-40 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/60 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-6">
                  <Bot size={14} />
                  iOS Agent Research
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.92] mb-8">
                  JW-iOS-MCP
                </h1>
                <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl leading-relaxed">
                  A research blueprint for an autonomous iOS MCP AI Agent server: rootless daemon, SpringBoard bridge, browser-style tool calls, visual perception, and human-like touch control.
                </p>
              </div>

              <div className="border border-white/10 bg-zinc-950/80 p-6 md:p-8 shadow-2xl shadow-brand/10">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand mb-2">Endpoint Concept</p>
                    <h2 className="text-2xl font-black uppercase">Agent Control Plane</h2>
                  </div>
                  <BrainCircuit className="text-brand" size={34} />
                </div>
                <pre className="overflow-x-auto bg-black p-5 text-xs md:text-sm leading-relaxed text-zinc-300 font-mono">
{`{
  "mcpServers": {
    "jw-ios-mcp": {
      "url": "http://IPHONE_LAN_IP:9000/mcp",
      "transport": "streamable-http",
      "auth": "Bearer <token>"
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-zinc-950 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand mb-4">System Shape</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Two-Tier iOS Architecture</h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  The research separates the agent server from the user-interface bridge. The daemon speaks MCP over HTTP, while the SpringBoard side handles screenshots, accessibility extraction, touch events, and app lifecycle work.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/10">
                {architecture.map(({ icon: Icon, title, body }) => (
                  <article key={title} className="bg-zinc-950 p-7 hover:bg-black transition-colors">
                    <Icon className="text-brand mb-6" size={28} />
                    <h3 className="text-lg font-black uppercase mb-4 leading-tight">{title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-black border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <Panel
                icon={Eye}
                label="Visual Perception"
                title="Screenshots plus accessibility context"
                body="JW-iOS-MCP pairs compressed screen frames with a structured UI tree, giving an AI agent both pixels and semantic controls. That makes tapping, reading, and recovery less brittle than coordinate-only automation."
              />
              <Panel
                icon={Fingerprint}
                label="Human Interaction"
                title="Touch events that behave like a person"
                body="The gesture layer models down, move, and up events through the iOS digitizer path. Swipes can follow Bezier timing so interactions feel closer to real finger movement than instant jumps."
              />
            </div>
          </div>
        </section>

        <section className="py-24 bg-zinc-950 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand mb-4">MCP Tools</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase">Tool Catalog</h2>
              </div>
              <p className="text-zinc-500 leading-relaxed max-w-2xl">
                The catalog is designed around the work an agent actually needs to do: see the phone, understand the UI, act on controls, manage apps, and inspect files when authorized.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10">
              {toolGroups.map((group) => (
                <article key={group.title} className="bg-zinc-950 p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <Wrench className="text-brand" size={20} />
                    <h3 className="text-lg font-black uppercase">{group.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {group.tools.map((tool) => (
                      <div key={tool} className="border border-white/10 bg-black px-3 py-2 font-mono text-xs text-zinc-300">
                        {tool}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-black border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div className="border border-white/10 bg-zinc-950 p-8">
                <TerminalSquare className="text-brand mb-6" size={32} />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand mb-4">Build Notes</p>
                <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">Rootless Theos Package</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  The prototype targets Dopamine-style rootless iOS 16 setups, with package outputs landing under rootless paths and a LaunchDaemon loading the server on boot.
                </p>
                <pre className="overflow-x-auto bg-black p-5 text-xs md:text-sm leading-relaxed text-zinc-300 font-mono">
{`THEOS_PACKAGE_SCHEME = rootless
TOOL_NAME = jwiosmcpd
TWEAK_NAME = jw_ios_mcp_hook

/var/jb/usr/bin/jwiosmcpd
/var/jb/var/run/jw-ios-mcp.sock
/var/jb/Library/LaunchDaemons/com.jimwashkau.jwiosmcpd.plist`}
                </pre>
              </div>

              <div className="border border-white/10 bg-zinc-950 p-8">
                <LockKeyhole className="text-brand mb-6" size={32} />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand mb-4">Hardening</p>
                <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">Designed For Controlled Access</h2>
                <div className="space-y-4">
                  {safetyNotes.map((note) => (
                    <div key={note} className="flex gap-3 text-zinc-400 leading-relaxed">
                      <CheckCircle2 className="mt-1 shrink-0 text-brand" size={18} />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Panel({
  icon: Icon,
  label,
  title,
  body,
}: {
  icon: typeof Eye;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="border border-white/10 bg-zinc-950 p-8 md:p-10">
      <Icon className="text-brand mb-8" size={34} />
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand mb-4">{label}</p>
      <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6">{title}</h3>
      <p className="text-zinc-500 leading-relaxed text-lg">{body}</p>
    </article>
  );
}
