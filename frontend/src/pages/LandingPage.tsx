import { useState } from "react";
import { Link } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
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
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Mídia Paga",
    desc: "Gestão estratégica de campanhas no Google, Meta, LinkedIn e mais. Cada real investido com máximo retorno.",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "SEO & Conteúdo",
    desc: "Estratégias orgânicas que constroem autoridade de marca e trazem tráfego qualificado de forma contínua.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Social Media",
    desc: "Criação e gestão de conteúdo que engaja, educa e converte sua audiência em clientes fiéis.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Analytics & BI",
    desc: "Dashboards em tempo real, relatórios de performance e insights que guiam decisões mais inteligentes.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: "Automação",
    desc: "Fluxos de e-mail, CRM e automações que nutrem leads e aumentam a eficiência do seu time de vendas.",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.08)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Consultoria",
    desc: "Diagnóstico completo do seu marketing digital e plano de ação personalizado para acelerar seus resultados.",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.08)",
  },
];

const STATS = [
  { value: "R$ 50M+", label: "Em mídia gerenciada" },
  { value: "300+",    label: "Clientes atendidos" },
  { value: "8 anos",  label: "De mercado" },
  { value: "4.9★",    label: "Avaliação média" },
];

const RESULTS = [
  {
    company: "E-commerce de Moda",
    metric: "+340%",
    desc: "de ROAS em 3 meses",
    tag: "Google Ads",
    tagColor: "#f43f5e",
  },
  {
    company: "SaaS B2B",
    metric: "-62%",
    desc: "no custo por lead",
    tag: "LinkedIn Ads",
    tagColor: "#0A66C2",
  },
  {
    company: "Clínica Médica",
    metric: "5x",
    desc: "mais agendamentos",
    tag: "Meta Ads",
    tagColor: "#6366f1",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "R$ 2.900",
    period: "/mês",
    desc: "Para negócios que estão começando no digital.",
    features: ["1 plataforma de mídia", "Até R$ 15k em verba", "Relatórios mensais", "Suporte via e-mail"],
    cta: "Começar agora",
    highlight: false,
  },
  {
    name: "Growth",
    price: "R$ 5.900",
    period: "/mês",
    desc: "Para empresas que querem escalar com consistência.",
    features: ["3 plataformas de mídia", "Até R$ 80k em verba", "Dashboard em tempo real", "Suporte prioritário", "Reunião quinzenal"],
    cta: "Escolher Growth",
    highlight: true,
  },
  {
    name: "Scale",
    price: "Sob consulta",
    period: "",
    desc: "Para grandes operações com necessidades específicas.",
    features: ["Plataformas ilimitadas", "Verba sem limite", "Time dedicado", "BI personalizado", "Reuniões semanais", "SLA garantido"],
    cta: "Falar com especialista",
    highlight: false,
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "#fff", color: "#0f172a" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >S</div>
          <span className="font-bold text-slate-900 text-lg">Seppala</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[["Serviços","services"],["Resultados","results"],["Planos","plans"],["Contato","contact"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              {label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5">
            Acessar dashboard
          </Link>
          <button
            onClick={() => scrollTo("contact")}
            className="text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }}
          >
            Fale conosco
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 pt-16" style={{ background: "rgba(255,255,255,0.98)" }}>
          <div className="flex flex-col gap-1 p-6">
            {[["Serviços","services"],["Resultados","results"],["Planos","plans"],["Contato","contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-3 text-lg font-medium text-slate-700 border-b border-slate-100">
                {label}
              </button>
            ))}
            <Link to="/dashboard" className="py-3 text-lg font-medium text-brand-600">
              Acessar dashboard →
            </Link>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.15)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Agência de Marketing Digital
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6">
            Transformamos investimento em<br />
            <span
              className="inline-block"
              style={{ background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              resultados reais.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            A Seppala é uma agência de marketing digital especializada em mídia paga. Cuidamos das suas campanhas para você focar no que importa: crescer.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}
            >
              Quero escalar meu negócio
              <ArrowRight />
            </button>
            <button
              onClick={() => scrollTo("results")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-600 bg-white transition-all hover:bg-slate-50"
              style={{ border: "1.5px solid rgba(0,0,0,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              Ver resultados
            </button>
          </div>

          {/* Platform badges */}
          <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Especialistas em:</span>
            {[
              { label: "Google Ads", color: "#EA4335" },
              { label: "Meta Ads",   color: "#1877F2" },
              { label: "LinkedIn",   color: "#0A66C2" },
              { label: "TikTok Ads", color: "#000000" },
            ].map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 md:px-12" style={{ background: "#0B1120" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{s.value}</p>
              <p className="text-sm" style={{ color: "#64748b" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">Serviços</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Tudo o que você precisa<br />para crescer no digital</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-6 group cursor-default transition-all duration-200"
                style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.bg, color: s.color }}>
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
      <section id="results" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">Cases de Sucesso</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Números que falam<br />por si só</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESULTS.map((r) => (
              <div
                key={r.company}
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{ background: "#0B1120", border: "1px solid #1e2d47" }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                  style={{ background: `radial-gradient(circle, ${r.tagColor}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-6"
                  style={{ background: `${r.tagColor}20`, color: r.tagColor }}>
                  {r.tag}
                </span>
                <p className="text-5xl font-extrabold text-white mb-2">{r.metric}</p>
                <p className="text-slate-400 text-sm mb-4">{r.desc}</p>
                <p className="text-xs font-semibold" style={{ color: "#334155" }}>{r.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">Processo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Como trabalhamos</h2>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "Diagnóstico",   desc: "Analisamos seu negócio, concorrência e histórico de campanhas para entender onde estão as oportunidades." },
              { step: "02", title: "Estratégia",    desc: "Criamos um plano personalizado com metas claras, canais ideais e distribuição inteligente de verba." },
              { step: "03", title: "Execução",      desc: "Nosso time coloca tudo no ar com copy, criativos e segmentações validadas por dados." },
              { step: "04", title: "Otimização",    desc: "Monitoramos diariamente e ajustamos campanhas para maximizar o ROAS continuamente." },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-5 bg-white rounded-2xl p-6 items-start"
                style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
              >
                <span
                  className="text-sm font-extrabold flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}
                >
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
      <section id="plans" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">Planos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Escolha o plano ideal<br />para o seu crescimento</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl p-7 flex flex-col relative overflow-hidden"
                style={p.highlight
                  ? { background: "#0B1120", border: "1px solid #1e2d47", boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }
                  : { background: "#fff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                {p.highlight && (
                  <>
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, transparent 60%)" }} />
                    <span
                      className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}
                    >Mais popular</span>
                  </>
                )}
                <div className="relative">
                  <p className="font-semibold text-sm mb-1" style={{ color: p.highlight ? "#94a3b8" : "#64748b" }}>{p.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-extrabold" style={{ color: p.highlight ? "#fff" : "#0f172a" }}>{p.price}</span>
                    {p.period && <span className="text-sm mb-1" style={{ color: p.highlight ? "#64748b" : "#94a3b8" }}>{p.period}</span>}
                  </div>
                  <p className="text-sm mb-6" style={{ color: p.highlight ? "#64748b" : "#94a3b8" }}>{p.desc}</p>

                  <ul className="space-y-2.5 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: p.highlight ? "#cbd5e1" : "#475569" }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: p.highlight ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                    style={p.highlight
                      ? { background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", color: "#fff", boxShadow: "0 4px 14px rgba(99,102,241,0.4)" }
                      : { background: "rgba(99,102,241,0.06)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.15)" }}
                  >
                    {p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6 md:px-12" style={{ background: "#0B1120" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6366f1" }}>Contato</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para crescer?
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Fale com um especialista Seppala e descubra como podemos transformar sua estratégia de marketing digital.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada! Entraremos em contato em breve."); }}
            className="space-y-3 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required placeholder="Seu nome" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                style={{ background: "#151e30", border: "1px solid #1e2d47" }} />
              <input required type="email" placeholder="Seu e-mail" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                style={{ background: "#151e30", border: "1px solid #1e2d47" }} />
            </div>
            <input placeholder="Empresa" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              style={{ background: "#151e30", border: "1px solid #1e2d47" }} />
            <select className="w-full px-4 py-3 rounded-xl text-sm text-slate-400 outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              style={{ background: "#151e30", border: "1px solid #1e2d47" }}>
              <option value="">Qual serviço te interessa?</option>
              {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
            </select>
            <textarea required rows={4} placeholder="Conte sobre seu negócio e objetivos..." className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-brand-500/40 transition-all resize-none"
              style={{ background: "#151e30", border: "1px solid #1e2d47" }} />
            <button type="submit" className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}>
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-12 border-t" style={{ background: "#060d18", borderColor: "#1e2d47" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}>S</div>
            <span className="font-semibold text-white text-sm">Seppala</span>
          </div>
          <p className="text-xs" style={{ color: "#334155" }}>© 2024 Seppala Agência Digital. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:contato@seppala.com.br" className="text-xs transition-colors" style={{ color: "#475569" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}>
              contato@seppala.com.br
            </a>
            <Link to="/dashboard" className="text-xs transition-colors" style={{ color: "#475569" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}>
              Dashboard →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
