import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockClients } from "../data/mockClients";
import type { DashboardType, Platform } from "../types";

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "meta", label: "Meta Ads" },
  { value: "google_ads", label: "Google Ads" },
  { value: "linkedin", label: "LinkedIn Ads" },
  { value: "google_sheets", label: "Google Sheets" },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

export function ClientSettingsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";
  const existing = isNew ? null : mockClients.find((c) => c.id === id);

  const [name, setName] = useState(existing?.name ?? "");
  const [type, setType] = useState<DashboardType>(existing?.dashboardType ?? "leads");
  const [color, setColor] = useState(existing?.color ?? "#3b82f6");
  const [platforms, setPlatforms] = useState<Platform[]>(existing?.platforms ?? []);
  const [saved, setSaved] = useState(false);

  if (!isNew && !existing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <p className="text-[#8b949e]">Cliente não encontrado.</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
          Voltar para Visão Geral
        </Link>
      </div>
    );
  }

  const togglePlatform = (p: Platform) => {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#8b949e]">
        <Link to="/" className="hover:text-white transition-colors">Visão Geral</Link>
        <span>/</span>
        {existing && (
          <>
            <Link to={`/clients/${id}`} className="hover:text-white transition-colors">{existing.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-white">Configurações</span>
      </div>

      <h1 className="text-xl font-bold text-white">
        {isNew ? "Novo Cliente" : `Configurações — ${existing?.name}`}
      </h1>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs text-[#8b949e] font-medium mb-1.5">Nome do Cliente</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Loja ABC"
            required
            className="w-full bg-[#161b22] border border-[#30363d] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-[#6b7280]"
          />
        </div>

        {/* Dashboard Type */}
        <div>
          <label className="block text-xs text-[#8b949e] font-medium mb-1.5">Tipo de Dashboard</label>
          <div className="grid grid-cols-2 gap-3">
            {(["ecommerce", "leads"] as DashboardType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  type === t
                    ? t === "ecommerce"
                      ? "border-blue-500 bg-blue-600/10"
                      : "border-green-500 bg-green-600/10"
                    : "border-[#21262d] bg-[#161b22] hover:border-[#30363d]"
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${type === t ? (t === "ecommerce" ? "text-blue-400" : "text-green-400") : "text-white"}`}>
                  {t === "ecommerce" ? "E-commerce" : "Leads"}
                </div>
                <div className="text-xs text-[#6b7280]">
                  {t === "ecommerce"
                    ? "Faturamento, funil de vendas, demografias"
                    : "Campanhas, leads, custo/lead, engajamento"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block text-xs text-[#8b949e] font-medium mb-1.5">Cor do Cliente</label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${color === c ? "border-white scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-xs text-[#8b949e] font-medium mb-1.5">Plataformas</label>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => togglePlatform(p.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                  platforms.includes(p.value)
                    ? "border-blue-500 bg-blue-600/10 text-blue-400"
                    : "border-[#21262d] bg-[#161b22] text-[#8b949e] hover:border-[#30363d]"
                }`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  platforms.includes(p.value) ? "bg-blue-600 border-blue-600" : "border-[#30363d]"
                }`}>
                  {platforms.includes(p.value) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {saved ? "Salvo!" : isNew ? "Criar Cliente" : "Salvar Alterações"}
          </button>
          <button
            type="button"
            onClick={() => navigate(isNew ? "/" : `/clients/${id}`)}
            className="px-5 py-2.5 bg-[#21262d] hover:bg-[#2d333b] text-[#8b949e] text-sm font-medium rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
