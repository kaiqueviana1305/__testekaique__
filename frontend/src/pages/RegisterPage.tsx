import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../services/api";

const R = "#E31E24";
const BLACK = "#0D0D0D";

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = R;
  e.target.style.boxShadow = `0 0 0 3px ${R}20`;
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "#e2e8f0";
  e.target.style.boxShadow = "";
};

export function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", first_name: "", last_name: "", company: "", password: "", password_confirm: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(form);
      toast.success("Conta criada! Faça login.");
      navigate("/login");
    } catch (err: unknown) {
      const errors = (err as { response?: { data?: Record<string, string[]> } })?.response?.data;
      toast.error(errors ? Object.values(errors).flat().join(" ") : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all";

  return (
    <div className="min-h-screen flex">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12" style={{ background: BLACK }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#1a1a1a" }}>
            <svg width="24" height="24" viewBox="0 0 100 100" fill={R}>
              <path d="M50 5 L75 20 L80 45 L95 55 L85 65 L70 60 L60 80 L50 75 L45 85 L35 70 L20 72 L15 55 L30 45 L25 20 Z" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl uppercase tracking-wide">Seppala</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Comece a monitorar<br />
            <span style={{ color: R }}>suas campanhas.</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
            Crie sua conta e conecte suas plataformas de mídia paga para acompanhar resultados em tempo real.
          </p>
        </div>
        <p className="text-xs" style={{ color: "#333" }}>© 2024 Seppala Agência Digital.</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8 animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: BLACK }}>
              <svg width="18" height="18" viewBox="0 0 100 100" fill={R}>
                <path d="M50 5 L75 20 L80 45 L95 55 L85 65 L70 60 L60 80 L50 75 L45 85 L35 70 L20 72 L15 55 L30 45 L25 20 Z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 uppercase tracking-wide">Seppala</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Criar conta</h2>
          <p className="text-sm text-slate-400 mb-8">Preencha seus dados para começar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[{ name: "first_name", label: "Nome" }, { name: "last_name", label: "Sobrenome" }].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                  <input name={f.name} onChange={handleChange} onFocus={focusStyle} onBlur={blurStyle} className={inputClass} />
                </div>
              ))}
            </div>
            {[
              { name: "username", label: "Usuário",   type: "text",     required: true },
              { name: "email",    label: "E-mail",    type: "email",    required: true },
              { name: "company",  label: "Empresa",   type: "text",     required: false },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                <input name={f.name} type={f.type} onChange={handleChange} required={f.required} onFocus={focusStyle} onBlur={blurStyle} className={inputClass} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              {[{ name: "password", label: "Senha" }, { name: "password_confirm", label: "Confirme" }].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                  <input name={f.name} type="password" onChange={handleChange} required onFocus={focusStyle} onBlur={blurStyle} className={inputClass} />
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-60 mt-2"
              style={{ background: R, boxShadow: `0 4px 14px ${R}50` }}>
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Já tem conta?{" "}
            <a href="/login" className="font-medium transition-colors" style={{ color: R }}>Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
}
