import { SlideData, PLATFORM_COLORS, PLATFORM_LABELS } from './carouselData';

// Lobo Seppala — SVG inline simplificado
function SeppalWolfLogo({ size = 64, color = '#E30613' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orelha esquerda */}
      <polygon points="20,10 35,45 10,40" fill={color} />
      {/* Orelha direita / ponta */}
      <polygon points="50,5 65,40 38,38" fill={color} />
      {/* Cabeça principal */}
      <path d="M15,42 Q10,60 20,70 Q30,82 50,80 Q70,78 78,65 Q88,50 80,38 Q70,28 55,35 Q45,38 35,35 Q22,32 15,42Z" fill={color} />
      {/* Focinho */}
      <path d="M45,68 Q50,78 58,72 Q65,67 62,60 Q55,55 48,60Z" fill={color} />
      {/* Olho — recorte branco */}
      <ellipse cx="38" cy="54" rx="5" ry="6" fill="white" />
      <ellipse cx="60" cy="52" rx="4" ry="5" fill="white" />
      {/* Pupilas */}
      <ellipse cx="39" cy="55" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="61" cy="53" rx="2" ry="2.5" fill="#1a1a1a" />
    </svg>
  );
}

function PlatformBadge({ platform, accentColor }: { platform: SlideData['platform']; accentColor: string }) {
  if (!platform) return null;
  const label = PLATFORM_LABELS[platform];
  return (
    <span
      className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
      style={{ backgroundColor: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}55` }}
    >
      {label}
    </span>
  );
}

function ErrorNumber({ n, color }: { n: number; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span
        className="text-6xl font-black leading-none"
        style={{ color, opacity: 0.15, fontVariantNumeric: 'tabular-nums' }}
      >
        0{n}
      </span>
      <span className="text-sm font-bold tracking-widest uppercase text-gray-400">
        Erro #{n}
      </span>
    </div>
  );
}

interface CarouselSlideProps {
  slide: SlideData;
  total: number;
}

export function CarouselSlide({ slide, total }: CarouselSlideProps) {
  const platformColor = slide.platform ? PLATFORM_COLORS[slide.platform] : slide.accentColor;

  // ── COVER ──────────────────────────────────────────────────────────────────
  if (slide.type === 'cover') {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center px-8 text-center relative overflow-hidden ${slide.bgClass}`}>
        {/* Linha de acento no topo */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: slide.accentColor }} />

        {/* Glow decorativo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: slide.accentColor }}
        />

        <SeppalWolfLogo size={80} color={slide.accentColor} />

        <h1 className="mt-4 text-2xl font-black text-white leading-tight tracking-tight">
          Agência Seppala
        </h1>

        <div className="mt-6 mb-4">
          <PlatformBadge platform={slide.platform} accentColor={platformColor} />
        </div>

        <h2 className="text-xl font-black text-white leading-snug tracking-tight max-w-xs">
          {slide.title}
        </h2>

        {slide.subtitle && (
          <p className="mt-3 text-sm text-gray-400 font-medium">{slide.subtitle}</p>
        )}

        <div className="absolute bottom-4 right-6 text-xs text-gray-600 font-mono">
          1 / {total}
        </div>
      </div>
    );
  }

  // ── CTA ────────────────────────────────────────────────────────────────────
  if (slide.type === 'cta') {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center px-8 text-center relative overflow-hidden ${slide.bgClass}`}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: slide.accentColor }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: slide.accentColor }}
        />

        <SeppalWolfLogo size={60} color={slide.accentColor} />

        <h2 className="mt-5 text-3xl font-black text-white leading-tight tracking-tight">
          {slide.title}
        </h2>
        <h3 className="text-3xl font-black leading-tight" style={{ color: slide.accentColor }}>
          {slide.subtitle}
        </h3>

        {slide.body && (
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">{slide.body}</p>
        )}

        <div
          className="mt-6 px-6 py-3 rounded-full text-white font-bold text-sm tracking-wide"
          style={{ backgroundColor: slide.accentColor }}
        >
          @agenciaseppala
        </div>

        <div className="mt-4 flex gap-2">
          <span className="text-xs px-2 py-1 rounded text-gray-300" style={{ backgroundColor: '#1877F233' }}>
            Advantage+
          </span>
          <span className="text-xs px-2 py-1 rounded text-gray-300" style={{ backgroundColor: '#EA443533' }}>
            PMax
          </span>
        </div>

        <div className="absolute bottom-4 right-6 text-xs text-gray-600 font-mono">
          {total} / {total}
        </div>
      </div>
    );
  }

  // ── ERROR ──────────────────────────────────────────────────────────────────
  return (
    <div className={`w-full h-full flex flex-col justify-between px-6 py-6 relative overflow-hidden ${slide.bgClass}`}>
      {/* Linha de acento no topo */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: platformColor }} />

      {/* Glow de fundo */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: platformColor }}
      />

      <div>
        {/* Badge plataforma */}
        <div className="mb-3">
          <PlatformBadge platform={slide.platform} accentColor={platformColor} />
        </div>

        {/* Número do erro */}
        {slide.errorNumber && (
          <ErrorNumber n={slide.errorNumber} color={platformColor} />
        )}

        {/* Título */}
        <h2 className="text-lg font-black text-white leading-snug tracking-tight">
          {slide.title}
        </h2>

        {/* Corpo */}
        {slide.body && (
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            {slide.body}
          </p>
        )}

        {/* Métricas (slide 4) */}
        {slide.metrics && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {slide.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: '#ffffff0d', border: `1px solid ${m.color}33` }}
              >
                <div className="text-lg font-black" style={{ color: m.color }}>{m.value}</div>
                <div className="text-xs text-gray-400 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dica */}
      {slide.tip && (
        <div
          className="mt-4 rounded-xl p-3 flex gap-2 items-start"
          style={{ backgroundColor: `${platformColor}18`, border: `1px solid ${platformColor}33` }}
        >
          <span className="text-base">💡</span>
          <p className="text-xs leading-relaxed" style={{ color: platformColor === '#ffffff' ? '#fff' : '#e0e0e0' }}>
            {slide.tip}
          </p>
        </div>
      )}

      {/* Contador */}
      <div className="absolute bottom-4 right-6 text-xs text-gray-600 font-mono">
        {slide.id} / {total}
      </div>
    </div>
  );
}
