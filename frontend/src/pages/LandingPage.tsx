import { useState } from "react";
import { Link } from "react-router-dom";

const R = "#E31E24";
const BLACK = "#0D0D0D";
const DARK = "#141414";

// ── Wolf SVG Logo (simplified Seppala wolf icon) ──────────────────────────
const WolfLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <path d="M60 8 L90 28 L95 55 L110 65 L98 80 L80 74 L68 95 L60 88 L52 95 L40 74 L22 80 L10 65 L25 55 L30 28 Z"
      fill={R} />
    <path d="M55 38 L65 38 L68 50 L60 54 L52 50 Z" fill={BLACK} opacity="0.6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "📈", title: "Mídia Paga",        desc: "Google, Meta, LinkedIn e TikTok com gestão estratégica e foco em ROAS máximo.",      color: R },
  { icon: "🔍", title: "SEO & Conteúdo",    desc: "Estratégias orgânicas que constroem autoridade e tráfego qualificado de forma contínua.", color: "#1877F2" },
  { icon: "📱", title: "Social Media",       desc: "Criação e gestão de conteúdo que engaja e converte sua audiência em clientes.",       color: "#0A66C2" },
  { icon: "📊", title: "Analytics & BI",    desc: "Dashboards em tempo real e insights que guiam decisões mais inteligentes.",           color: "#f59e0b" },
  { icon: "⚡", title: "Automação",         desc: "Fluxos de e-mail, CRM e automações que nutrem leads e aumentam conversões.",          color: "#10b981" },
  { icon: "🎯", title: "Consultoria",        desc: "Diagnóstico completo e plano de ação personalizado para acelerar seus resultados.",   color: "#8b5cf6" },
];

const STATS = [
  { value: "R$ 50M+", label: "Em mídia gerenciada" },
  { value: "300+",    label: "Clientes atendidos"  },
  { value: "8 anos",  label: "De mercado"           },
  { value: "4.9★",    label: "Avaliação média"      },
];

const RESULTS = [
  { company: "E-commerce de Moda", metric: "+340%", desc: "de ROAS em 3 meses",      tag: "Google Ads", dot: "#EA4335" },
  { company: "SaaS B2B",           metric: "-62%",  desc: "no custo por lead",        tag: "LinkedIn",   dot: "#0A66C2" },
  { company: "Clínica Médica",     metric: "5x",    desc: "mais agendamentos",        tag: "Meta Ads",   dot: "#1877F2" },
];

const PLANS = [
  { name: "Starter", price: "R$ 2.900", period: "/mês", desc: "Para negócios começando no digital.",       highlight: false,
    features: ["1 plataforma de mídia", "Até R$ 15k em verba", "Relatórios mensais", "Suporte via e-mail"], cta: "Começar agora" },
  { name: "Growth",  price: "R$ 5.900", period: "/mês", desc: "Para empresas que querem escalar.",         highlight: true,
    features: ["3 plataformas de mídia", "Até R$ 80k em verba", "Dashboard em tempo real", "Suporte prioritário", "Reunião quinzenal"], cta: "Escolher Growth" },
  { name: "Scale",   price: "Sob consulta", period: "", desc: "Para grandes operações.",                   highlight: false,
    features: ["Plataformas ilimitadas", "Verba sem limite", "Time dedicado", "BI personalizado", "Reuniões semanais"], cta: "Falar com especialista" },
];

// ── Component ─────────────────────────────────────────────────────────────
export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "#fff", color: BLACK }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <Link to="/" className="flex items-center gap-2.5">
          <WolfLogo size={30} />
          <span className="font-black text-slate-900 text-lg uppercase tracking-wider">Seppala</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[["Serviços","services"],["Resultados","results"],["Planos","plans"],["Contato","contact"]].map(([label,id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{label}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5">Dashboard</Link>
          <button onClick={() => scrollTo("contact")} className="text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all"
            style={{ background: R, boxShadow: `0 4px 12px ${R}50` }}>
            Fale conosco
          </button>
        </div>
        <button className="md:hidden" style={{ color: BLACK }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 pt-16" style={{ background: "rgba(255,255,255,0.98)" }}>
          <div className="flex flex-col gap-1 p-6">
            {[["Serviços","services"],["Resultados","results"],["Planos","plans"],["Contato","contact"]].map(([label,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-3 text-lg font-medium text-slate-700 border-b border-slate-100">{label}</button>
            ))}
            <Link to="/dashboard" className="py-3 text-lg font-medium" style={{ color: R }}>Dashboard →</Link>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden" style={{ background: BLACK }}>
        {/* Red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${R}30 0%, transparent 70%)`, top: "-100px" }} />

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-widest"
            style={{ background: `${R}15`, color: R, border: `1px solid ${R}30` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: R }} />
            Agência de Marketing Digital
          </div>

          {/* Wolf logo centered */}
          <div className="flex justify-center mb-8">
            <WolfLogo size={80} />
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white mb-6 uppercase">
            Transformamos<br />
            investimento em<br />
            <span style={{ color: R }}>resultados reais.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "#666" }}>
            A Seppala é uma agência de marketing digital especializada em mídia paga. Cuidamos das suas campanhas para você focar no que importa: <strong style={{ color: "#999" }}>crescer</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm"
              style={{ background: R, boxShadow: `0 8px 24px ${R}50` }}>
              Quero escalar meu negócio <Arrow />
            </button>
            <button onClick={() => scrollTo("results")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{ background: "#1a1a1a", color: "#aaa", border: "1px solid #2a2a2a" }}>
              Ver resultados
            </button>
          </div>

          {/* Platforms */}
          <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#444" }}>Especialistas em:</span>
            {[{ label: "Google Ads", c: "#EA4335" }, { label: "Meta Ads", c: "#1877F2" }, { label: "LinkedIn", c: "#0A66C2" }, { label: "TikTok Ads", c: "#fff" }].map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${p.c}15`, color: p.c, border: `1px solid ${p.c}30` }}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 md:px-12" style={{ background: DARK, borderTop: `2px solid ${R}`, borderBottom: `1px solid #2a2a2a` }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-sm" style={{ color: "#555" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6 md:px-12" style={{ background: "#f9f9f9" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: R }}>Serviços</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">Tudo o que você precisa<br />para crescer no digital</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 cursor-default transition-all duration-200"
                style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.1)`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.borderColor = `${s.color}30`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.06)"; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl" style={{ background: `${s.color}10` }}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="results" className="py-24 px-6 md:px-12" style={{ background: BLACK }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: R }}>Cases de Sucesso</p>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">Números que falam<br />por si só</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESULTS.map((r) => (
              <div key={r.company} className="rounded-2xl p-8 relative overflow-hidden"
                style={{ background: DARK, border: "1px solid #2a2a2a" }}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
                  style={{ background: `radial-gradient(circle, ${R}, transparent 70%)` }} />
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-6"
                  style={{ background: `${r.dot}15`, color: r.dot, border: `1px solid ${r.dot}30` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.dot }} />{r.tag}
                </span>
                <p className="text-5xl font-black text-white mb-2">{r.metric}</p>
                <p className="text-sm mb-4" style={{ color: "#666" }}>{r.desc}</p>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#333" }}>{r.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 md:px-12" style={{ background: "#f9f9f9" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: R }}>Processo</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">Como trabalhamos</h2>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "Diagnóstico", desc: "Analisamos seu negócio, concorrência e histórico de campanhas para mapear oportunidades." },
              { step: "02", title: "Estratégia",  desc: "Criamos um plano com metas claras, canais ideais e distribuição inteligente de verba." },
              { step: "03", title: "Execução",    desc: "Nosso time coloca tudo no ar com copy, criativos e segmentações validadas por dados." },
              { step: "04", title: "Otimização",  desc: "Monitoramos diariamente e ajustamos campanhas para maximizar o ROAS continuamente." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 bg-white rounded-2xl p-6 items-start"
                style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <span className="text-sm font-black flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${R}10`, color: R }}>
                  {item.step}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section id="plans" className="py-24 px-6 md:px-12" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: R }}>Planos</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">Escolha o seu plano</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <div key={p.name} className="rounded-2xl p-7 flex flex-col relative overflow-hidden"
                style={p.highlight
                  ? { background: BLACK, border: `2px solid ${R}`, boxShadow: `0 16px 48px ${R}30` }
                  : { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                {p.highlight && (
                  <span className="absolute top-5 right-5 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider"
                    style={{ background: R, color: "#fff" }}>Popular</span>
                )}
                <div className="relative">
                  <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: p.highlight ? "#555" : "#94a3b8" }}>{p.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-black" style={{ color: p.highlight ? "#fff" : BLACK }}>{p.price}</span>
                    {p.period && <span className="text-sm mb-1" style={{ color: p.highlight ? "#555" : "#94a3b8" }}>{p.period}</span>}
                  </div>
                  <p className="text-sm mb-6" style={{ color: p.highlight ? "#555" : "#94a3b8" }}>{p.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: p.highlight ? "#aaa" : "#475569" }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${R}15`, color: R }}><Check /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo("contact")}
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all"
                    style={p.highlight
                      ? { background: R, color: "#fff", boxShadow: `0 4px 14px ${R}50` }
                      : { background: `${R}08`, color: R, border: `1px solid ${R}20` }}>
                    {p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6 md:px-12" style={{ background: BLACK }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: R }}>Contato</p>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">Pronto para crescer?</h2>
          <p className="mb-10 leading-relaxed" style={{ color: "#555" }}>
            Fale com um especialista Seppala e descubra como transformar sua estratégia de marketing digital.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada! Entraremos em contato em breve."); }} className="space-y-3 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[{ placeholder: "Seu nome" }, { placeholder: "Seu e-mail", type: "email" }].map((f, i) => (
                <input key={i} required type={f.type ?? "text"} placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  style={{ background: DARK, border: "1px solid #2a2a2a" }}
                  onFocus={(e) => { e.target.style.borderColor = R; e.target.style.boxShadow = `0 0 0 3px ${R}20`; }}
                  onBlur={(e) => { e.target.style.borderColor = "#2a2a2a"; e.target.style.boxShadow = ""; }} />
              ))}
            </div>
            <input placeholder="Empresa"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
              style={{ background: DARK, border: "1px solid #2a2a2a" }}
              onFocus={(e) => { e.target.style.borderColor = R; e.target.style.boxShadow = `0 0 0 3px ${R}20`; }}
              onBlur={(e) => { e.target.style.borderColor = "#2a2a2a"; e.target.style.boxShadow = ""; }} />
            <textarea required rows={4} placeholder="Conte sobre seu negócio e objetivos..."
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
              style={{ background: DARK, border: "1px solid #2a2a2a" }}
              onFocus={(e) => { e.target.style.borderColor = R; e.target.style.boxShadow = `0 0 0 3px ${R}20`; }}
              onBlur={(e) => { e.target.style.borderColor = "#2a2a2a"; e.target.style.boxShadow = ""; }} />
            <button type="submit" className="w-full py-3.5 rounded-xl font-black text-white text-sm uppercase tracking-wide"
              style={{ background: R, boxShadow: `0 4px 16px ${R}50` }}>
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-12" style={{ background: "#060606", borderTop: `1px solid #1a1a1a` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <WolfLogo size={24} />
            <span className="font-black text-white text-sm uppercase tracking-wider">Seppala</span>
          </div>
          <p className="text-xs" style={{ color: "#333" }}>© 2024 Seppala Agência Digital. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:contato@seppala.com.br" className="text-xs transition-colors" style={{ color: "#333" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#666"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#333"; }}>
              contato@seppala.com.br
            </a>
            <Link to="/dashboard" className="text-xs font-semibold transition-colors" style={{ color: R }}>
              Dashboard →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
