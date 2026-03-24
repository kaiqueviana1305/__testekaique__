import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch {
      toast.error("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: "linear-gradient(145deg, #0B1120 0%, #1a1040 60%, #0f172a 100%)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            S
          </div>
          <span className="text-white font-semibold text-lg">Seppala</span>
        </div>

        {/* Main copy */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Mídia paga<br />
              <span style={{ background: "linear-gradient(90deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                centralizada.
              </span>
            </h1>
            <p className="mt-4 text-base" style={{ color: "#94a3b8" }}>
              Conecte Meta, LinkedIn e Google Ads em um só lugar. Acompanhe KPIs em tempo real e tome decisões mais inteligentes.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {[
              "Dashboard unificado de campanhas",
              "Métricas em tempo real por plataforma",
              "CPC, CPL, ROAS e muito mais",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(99,102,241,0.2)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm" style={{ color: "#94a3b8" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform logos hint */}
        <div className="flex items-center gap-3">
          {[
            { label: "Meta", color: "#1877F2" },
            { label: "LinkedIn", color: "#0A66C2" },
            { label: "Google", color: "#EA4335" },
          ].map((p) => (
            <span
              key={p.label}
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ background: `${p.color}30`, border: `1px solid ${p.color}50`, color: p.color }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              S
            </div>
            <span className="font-semibold text-slate-800">Seppala</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Bem-vindo de volta</h2>
          <p className="text-sm text-slate-500 mb-8">Entre na sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="seu_usuario"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-card"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-card pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPass ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-60 mt-2"
              style={{
                background: loading ? "#6366f1" : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Entrando...
                </span>
              ) : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Não tem conta?{" "}
            <a href="/register" className="font-medium text-brand-600 hover:text-brand-500 transition-colors">
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
