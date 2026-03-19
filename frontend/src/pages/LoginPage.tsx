import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Seppala Dashboard</h1>
          <p className="text-[#8b949e] text-sm mt-1">Gestão de campanhas centralizada</p>
        </div>

        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#8b949e] font-medium mb-1.5">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#0d1117] border border-[#30363d] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-[#6b7280]"
                placeholder="seu_usuario"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8b949e] font-medium mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0d1117] border border-[#30363d] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-[#6b7280]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="text-center text-sm text-[#8b949e] mt-5">
            Não tem conta?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
