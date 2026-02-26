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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Criar conta</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "first_name", label: "Nome" },
              { name: "last_name", label: "Sobrenome" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-sm font-medium text-gray-700 block mb-1">{f.label}</label>
                <input name={f.name} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
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
              <label className="text-sm font-medium text-gray-700 block mb-1">{f.label}</label>
              <input name={f.name} type={f.type} onChange={handleChange} required={f.name !== "company"}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-2">
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Já tem conta? <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  );
}
