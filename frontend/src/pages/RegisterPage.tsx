import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../services/api";

export function RegisterPage() {
  const [form, setForm] = useState({
    username: "", email: "", first_name: "", last_name: "",
    company: "", password: "", password_confirm: "",
  });
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
      const msg = errors ? Object.values(errors).flat().join(" ") : "Erro ao criar conta.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fields: { name: keyof typeof form; label: string; type: string; required?: boolean; colSpan?: boolean }[] = [
    { name: "first_name", label: "Nome",     type: "text" },
    { name: "last_name",  label: "Sobrenome", type: "text" },
    { name: "username",   label: "Usuário",   type: "text",     required: true, colSpan: true },
    { name: "email",      label: "E-mail",    type: "email",    required: true, colSpan: true },
    { name: "company",    label: "Empresa",   type: "text",     colSpan: true },
    { name: "password",         label: "Senha",          type: "password", required: true },
    { name: "password_confirm", label: "Confirme a senha", type: "password", required: true },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left branding */}
      <div
        className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12"
        style={{ background: "linear-gradient(145deg, #0B1120 0%, #1a1040 60%, #0f172a 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            S
          </div>
          <span className="text-white font-semibold text-lg">Seppala</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white leading-tight">
            Comece a monitorar<br />
            <span style={{ background: "linear-gradient(90deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              suas campanhas.
            </span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Crie sua conta gratuitamente e conecte suas plataformas de mídia paga para começar a acompanhar resultados em tempo real.
          </p>
        </div>

        <p className="text-xs" style={{ color: "#475569" }}>
          © 2024 Seppala. Todos os direitos reservados.
        </p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md py-8 animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              S
            </div>
            <span className="font-semibold text-slate-800">Seppala</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Criar conta</h2>
          <p className="text-sm text-slate-500 mb-8">Preencha seus dados para começar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {fields.filter(f => !f.colSpan).map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                  <input
                    name={f.name}
                    type={f.type}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-card transition-all"
                  />
                </div>
              ))}
            </div>

            {fields.filter(f => f.colSpan).map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  onChange={handleChange}
                  required={f.required}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-card transition-all"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              {fields.filter(f => f.name === "password" || f.name === "password_confirm").map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                  <input
                    name={f.name}
                    type={f.type}
                    onChange={handleChange}
                    required={f.required}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-card transition-all"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-60 mt-2"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
              }}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Já tem conta?{" "}
            <a href="/login" className="font-medium text-brand-600 hover:text-brand-500 transition-colors">
              Entrar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
