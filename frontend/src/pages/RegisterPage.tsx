import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const inputCls = "w-full bg-[#0d1117] border border-[#30363d] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-[#6b7280]";
  const labelCls = "text-xs font-medium text-[#8b949e] block mb-1.5";

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Criar conta</h1>
          <p className="text-[#8b949e] text-sm mt-1">Seppala Dashboard</p>
        </div>

        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "first_name", label: "Nome" },
                { name: "last_name", label: "Sobrenome" },
              ].map((f) => (
                <div key={f.name}>
                  <label className={labelCls}>{f.label}</label>
                  <input name={f.name} onChange={handleChange} className={inputCls} />
                </div>
              ))}
            </div>
            {[
              { name: "username", label: "Usuário", type: "text" },
              { name: "email", label: "E-mail", type: "email" },
              { name: "company", label: "Empresa", type: "text" },
              { name: "password", label: "Senha", type: "password" },
              { name: "password_confirm", label: "Confirme a senha", type: "password" },
            ].map((f) => (
              <div key={f.name}>
                <label className={labelCls}>{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  onChange={handleChange}
                  required={f.name !== "company"}
                  className={inputCls}
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>
          <p className="text-center text-sm text-[#8b949e] mt-5">
            Já tem conta?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
