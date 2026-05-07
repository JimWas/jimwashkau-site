import { useEffect, useRef } from 'react';

const PHRASES = [
  ['English', 'AUDREY JIM LOVE TEXAS'],
  ['Spanish', 'AUDREY JIM AMAN TEXAS'],
  ['French', 'AUDREY JIM AIMENT LE TEXAS'],
  ['Italian', 'AUDREY JIM AMANO IL TEXAS'],
  ['Portuguese', 'AUDREY JIM AMAM O TEXAS'],
  ['German', 'AUDREY JIM LIEBEN TEXAS'],
  ['Dutch', 'AUDREY JIM HOUDEN VAN TEXAS'],
  ['Swedish', 'AUDREY JIM ALSKAR TEXAS'],
  ['Norwegian', 'AUDREY JIM ELSKER TEXAS'],
  ['Finnish', 'AUDREY JIM RAKASTAVAT TEXASIA'],
  ['Greek', 'Η AUDREY ΚΑΙ Ο JIM ΑΓΑΠΟΥΝ ΤΟ ΤΕΞΑΣ'],
  ['Russian', 'ОДРИ И ДЖИМ ЛЮБЯТ ТЕХАС'],
  ['Arabic', 'أودري وجيم يحبان تكساس'],
  ['Hebrew', "אודרי וג'ים אוהבים את טקסס"],
  ['Hindi', 'ऑड्री और जिम टेक्सास से प्यार करते हैं'],
  ['Tamil', 'ஆட்ரி மற்றும் ஜிம் டெக்சாஸை நேசிக்கிறார்கள்'],
  ['Khmer', 'អូដ្រី និង ជីម ស្រឡាញ់ តិចសាស់'],
  ['Vietnamese', 'AUDREY VÀ JIM YÊU TEXAS'],
  ['Chinese', '奥黛丽和吉姆爱德克萨斯'],
  ['Japanese', 'オードリーとジムはテキサスを愛しています'],
  ['Korean', '오드리와 짐은 텍사스를 사랑합니다'],
  ['Swahili', 'AUDREY NA JIM WANAIPENDA TEXAS'],
  ['Hawaiian', 'ALOHA O AUDREY LAUA ʻO JIM IĀ TEXAS'],
  ['Latin', 'AUDREY ET JIM TEXIAM AMANT'],
] as const;

const MATRIX_GLYPHS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZAUDREYJIMLOVETEXASアカサタナハマヤラワ零一愛火星地球אבגדהوزحטיابتثجحخدذرअआइईउऊकखगघกขคงจฉชซកខគឃងចឆជ';
const ASCII_RAMP = " .'`^,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const IMAGE_SRC = '/asmr/IMG_E6CAC496EE31-1.jpeg';

type Drop = {
  x: number;
  y: number;
  speed: number;
  length: number;
};

type AsciiPortrait = {
  rows: string[];
  width: number;
  height: number;
};

function randomGlyph() {
  return MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
}

function makeDrops(width: number, height: number, cell: number) {
  const columns = Math.max(18, Math.floor(width / cell));
  return Array.from({ length: columns }, (_, index) => ({
    x: index * cell,
    y: Math.random() * -height,
    speed: 0.45 + Math.random() * 1.4,
    length: 6 + Math.floor(Math.random() * 20),
  }));
}

function buildAsciiPortrait(image: HTMLImageElement, width: number, height: number): AsciiPortrait | null {
  const targetWidth = Math.min(86, Math.max(38, Math.floor(width / 9)));
  const targetHeight = Math.min(34, Math.max(14, Math.floor(height / 19)));
  const aspect = image.naturalHeight / Math.max(1, image.naturalWidth);
  const portraitHeight = Math.max(12, Math.min(targetHeight, Math.floor(targetWidth * aspect * 0.46)));
  const portraitWidth = Math.max(28, Math.min(targetWidth, Math.floor(portraitHeight / Math.max(0.1, aspect) / 0.46)));

  const offscreen = document.createElement('canvas');
  offscreen.width = portraitWidth;
  offscreen.height = portraitHeight;
  const ctx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  ctx.drawImage(image, 0, 0, portraitWidth, portraitHeight);
  const pixels = ctx.getImageData(0, 0, portraitWidth, portraitHeight).data;
  const rows: string[] = [];

  for (let y = 0; y < portraitHeight; y += 1) {
    let row = '';
    for (let x = 0; x < portraitWidth; x += 1) {
      const offset = (y * portraitWidth + x) * 4;
      const brightness = pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114;
      const rampIndex = Math.floor((brightness / 255) * (ASCII_RAMP.length - 1));
      row += ASCII_RAMP[rampIndex];
    }
    rows.push(row.trimEnd());
  }

  return { rows, width: portraitWidth, height: portraitHeight };
}

function drawOrbit(ctx: CanvasRenderingContext2D, cx: number, cy: number, rx: number, ry: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 9]);
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function imageVisibility(frame: number) {
  const cycle = frame % 920;
  const visible = 270;
  const fade = 52;
  if (cycle > visible) return 0;
  if (cycle < fade) return cycle / fade;
  if (cycle > visible - fade) return Math.max(0, (visible - cycle) / fade);
  return 1;
}

export default function AsmrMatrixWidget({ transmitHref = '#contact' }: { transmitHref?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let frame = 0;
    let width = 0;
    let height = 0;
    let drops: Drop[] = [];
    let portrait: AsciiPortrait | null = null;
    const image = new Image();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(360, Math.floor(rect.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drops = makeDrops(width, height, width < 640 ? 15 : 18);
      if (image.complete && image.naturalWidth > 0) {
        portrait = buildAsciiPortrait(image, width, height);
      }
    };

    image.onload = () => {
      portrait = buildAsciiPortrait(image, width, height);
    };
    image.src = IMAGE_SRC;

    const draw = () => {
      frame += 1;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const cell = width < 640 ? 15 : 18;
      ctx.font = `${width < 640 ? 12 : 14}px "Nasalization", "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';

      drops.forEach((drop) => {
        for (let i = 0; i < drop.length; i += 1) {
          const y = drop.y - i * cell;
          if (y < -cell || y > height) continue;
          ctx.fillStyle = i === 0 ? 'rgba(230,255,236,0.95)' : i < 4 ? 'rgba(57,255,120,0.74)' : 'rgba(24,140,70,0.32)';
          ctx.fillText(randomGlyph(), drop.x, y);
        }
        drop.y += drop.speed;
        if (drop.y - drop.length * cell > height) {
          drop.y = Math.random() * -height * 0.5;
          drop.speed = 0.45 + Math.random() * 1.4;
          drop.length = 6 + Math.floor(Math.random() * 20);
        }
      });

      const cx = width * 0.58;
      const cy = height * 0.5;
      const earthRx = Math.max(46, width * 0.12);
      const earthRy = Math.max(22, height * 0.12);
      const marsRx = Math.max(88, width * 0.25);
      const marsRy = Math.max(42, height * 0.22);
      drawOrbit(ctx, cx, cy, earthRx, earthRy, 'rgba(0, 102, 204, 0.8)');
      drawOrbit(ctx, cx, cy, marsRx, marsRy, 'rgba(255, 92, 0, 0.72)');

      const earthAngle = frame * 0.018;
      const marsAngle = frame * 0.011 + 1.4;
      const earth = { x: cx + Math.cos(earthAngle) * earthRx, y: cy + Math.sin(earthAngle) * earthRy };
      const mars = { x: cx + Math.cos(marsAngle) * marsRx, y: cy + Math.sin(marsAngle) * marsRy };

      ctx.font = `700 ${width < 640 ? 12 : 14}px "Nasalization", "JetBrains Mono", monospace`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SUN', cx - 12, cy - 8);
      ctx.fillStyle = '#7dd3fc';
      ctx.fillText('EARTH', earth.x - 20, earth.y - 8);
      ctx.fillStyle = '#ff8a3d';
      ctx.fillText('MARS', mars.x - 16, mars.y - 8);

      ctx.strokeStyle = 'rgba(57,255,120,0.66)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(earth.x, earth.y);
      const bend = Math.max(48, height * 0.18);
      ctx.quadraticCurveTo((earth.x + mars.x) / 2, Math.min(70, cy - bend), mars.x, mars.y);
      ctx.stroke();

      const pulse = (frame % 100) / 100;
      const px = (1 - pulse) * (1 - pulse) * earth.x + 2 * (1 - pulse) * pulse * ((earth.x + mars.x) / 2) + pulse * pulse * mars.x;
      const py = (1 - pulse) * (1 - pulse) * earth.y + 2 * (1 - pulse) * pulse * Math.min(70, cy - bend) + pulse * pulse * mars.y;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();

      const phraseIndex = Math.floor(frame / 72) % PHRASES.length;
      ctx.textAlign = 'center';
      ctx.font = `700 ${width < 640 ? 14 : 18}px "Nasalization", "JetBrains Mono", monospace`;
      const [language, phrase] = PHRASES[phraseIndex];
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillText(`${language}: ${phrase}`, width / 2, 42);
      ctx.font = `700 ${width < 640 ? 10 : 12}px "Nasalization", "JetBrains Mono", monospace`;
      ctx.fillStyle = 'rgba(57,255,120,0.8)';
      ctx.fillText('NASA EARTH -> MARS MATRIX | SOFT ASMR SIGNAL', width / 2, 18);

      const visibility = imageVisibility(frame);
      if (portrait && visibility > 0) {
        const charW = width < 640 ? 7 : 9;
        const lineH = width < 640 ? 10 : 12;
        const left = width / 2 - (portrait.width * charW) / 2;
        const top = height / 2 - (portrait.height * lineH) / 2;
        ctx.globalAlpha = 0.24 + visibility * 0.76;
        ctx.textAlign = 'left';
        ctx.font = `${width < 640 ? 10 : 12}px "Nasalization", "JetBrains Mono", monospace`;
        portrait.rows.forEach((row, rowIndex) => {
          const scrambled = visibility < 0.75
            ? row.replace(/\S/g, (char) => (Math.random() > visibility ? randomGlyph() : char))
            : row;
          ctx.fillStyle = rowIndex % 5 === frame % 5 ? '#ffffff' : '#39ff78';
          ctx.fillText(scrambled, left, top + rowIndex * lineH);
        });
        ctx.globalAlpha = 1;
      }

      ctx.textAlign = 'left';
      ctx.font = `700 11px "Nasalization", "JetBrains Mono", monospace`;
      ctx.fillStyle = 'rgba(255,255,255,0.58)';
      ctx.fillText('FONT: Nasalization.otf  |  IMAGE: IMG_E6CAC496EE31-1.jpeg', 18, height - 28);

      animationId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="asmr-matrix" className="py-24 bg-black border-y border-brand/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-brand/50 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-6">
              <span className="h-2 w-2 bg-brand shadow-[0_0_14px_var(--color-brand)]" />
              Love Signal Widget
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">Mars Matrix ASMR</h2>
            <p className="max-w-2xl text-zinc-400 leading-relaxed">
              A live browser version of the terminal signal: matrix rain, Earth-to-Mars telemetry, multilingual Audrey/Jim/Texas transmissions, and a periodic ASCII image fade.
            </p>
          </div>
          <a
            href={transmitHref}
            className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-xs font-bold uppercase tracking-[0.24em] hover:border-brand hover:text-brand transition-colors"
          >
            Transmit
          </a>
        </div>

        <div className="relative border border-brand/30 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,102,204,0.14)]">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,102,204,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.16)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />
          <canvas ref={canvasRef} className="relative block h-[520px] w-full" aria-label="Animated NASA Earth to Mars Matrix ASMR widget" />
        </div>
      </div>
    </section>
  );
}
