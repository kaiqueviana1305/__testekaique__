import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { integrationsApi, campaignsApi } from "../services/api";
import type { PlatformConnection } from "../types";
import { format, subDays } from "date-fns";

const PLATFORM_CONFIG: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  meta:          { label: "Meta Ads",      bg: "rgba(99,102,241,0.08)",  color: "#6366f1", dot: "#6366f1" },
  linkedin:      { label: "LinkedIn Ads",  bg: "rgba(10,102,194,0.08)",  color: "#0A66C2", dot: "#0A66C2" },
  google_ads:    { label: "Google Ads",    bg: "rgba(244,63,94,0.08)",   color: "#f43f5e", dot: "#f43f5e" },
  google_sheets: { label: "Google Sheets", bg: "rgba(16,185,129,0.08)",  color: "#10b981", dot: "#10b981" },
};

function SyncModal({ connection, onClose }: { connection: PlatformConnection; onClose: () => void }) {
  const [dateFrom, setDateFrom] = useState(format(subDays(new Date(), 29), "yyyy-MM-dd"));
  const [dateTo, setDateTo]     = useState(format(new Date(), "yyyy-MM-dd"));
  const [loading, setLoading]   = useState(false);

  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await campaignsApi.sync({
        connection_id: String(connection.id),
        date_from: dateFrom,
        date_to:   dateTo,
      });
      toast.success(`Sincronizado! ${res.data.created} criados, ${res.data.updated} atualizados.`);
      onClose();
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { error?: string } } })?.response?.data?.error ?? "Erro na sincronização.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: "rgba(11,17,32,0.6)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-slide-up" style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.2)" }}>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: PLATFORM_CONFIG[connection.platform]?.bg ?? "rgba(99,102,241,0.08)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PLATFORM_CONFIG[connection.platform]?.color ?? "#6366f1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-.09-4.87" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Sincronizar dados</h3>
            <p className="text-xs text-slate-400">{connection.name}</p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">Data início</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">Data fim</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSync} disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}>
            {loading ? "Sincronizando..." : "Sincronizar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ManualConnectionForm({ onSuccess }: { onSuccess: () => void }) {
  const [platform,    setPlatform]    = useState("meta");
  const [name,        setName]        = useState("");
  const [accountId,   setAccountId]   = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading,     setLoading]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await integrationsApi.createManualConnection({ platform, name, account_id: accountId, access_token: accessToken });
      toast.success("Conexão criada!");
      onSuccess();
    } catch {
      toast.error("Erro ao criar conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 animate-slide-up" style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
      <h3 className="font-semibold text-slate-800 mb-4">Conexão manual</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">Plataforma</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all">
              <option value="meta">Meta Ads</option>
              <option value="linkedin">LinkedIn Ads</option>
              <option value="google_ads">Google Ads</option>
              <option value="google_sheets">Google Sheets</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">Nome amigável</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required
              placeholder="Ex: Conta Principal"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1.5">ID da Conta</label>
          <input value={accountId} onChange={(e) => setAccountId(e.target.value)}
            placeholder={platform === "google_sheets" ? "ID da planilha (Spreadsheet ID)" : "Ex: act_123456789"}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1.5">Access Token</label>
          <input value={accessToken} onChange={(e) => setAccessToken(e.target.value)} type="password"
            placeholder="Token de acesso da plataforma"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 transition-all"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}>
          {loading ? "Salvando..." : "Salvar conexão"}
        </button>
      </form>
    </div>
  );
}

const OAUTH_PLATFORMS = [
  {
    id: "meta",
    label: "Meta Ads",
    description: "Facebook & Instagram Ads",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.06)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn Ads",
    description: "Campanhas B2B profissional",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.06)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: "google",
    label: "Google",
    description: "Google Ads & Sheets",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.06)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
] as const;

export function IntegrationsPage() {
  const [syncTarget, setSyncTarget] = useState<PlatformConnection | null>(null);
  const [showForm,   setShowForm]   = useState(false);
  const queryClient = useQueryClient();

  const { data: connections, isLoading } = useQuery({
    queryKey: ["connections"],
    queryFn: () => integrationsApi.listConnections().then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => integrationsApi.deleteConnection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      toast.success("Conexão removida.");
    },
  });

  const handleOAuth = async (platform: "meta" | "linkedin" | "google") => {
    try {
      const fn = platform === "meta"
        ? integrationsApi.getMetaOAuthUrl
        : platform === "linkedin"
        ? integrationsApi.getLinkedInOAuthUrl
        : integrationsApi.getGoogleOAuthUrl;
      const { data } = await fn();
      window.open(data.url, "_blank");
    } catch {
      toast.error("Erro ao obter URL de autenticação.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Integrações</h1>
          <p className="text-sm text-slate-400 mt-0.5">Conecte suas plataformas de mídia paga</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Conexão manual
        </button>
      </div>

      {/* OAuth Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OAUTH_PLATFORMS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleOAuth(p.id)}
            className="text-left p-4 rounded-2xl transition-all group bg-white"
            style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.07)"; }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors"
              style={{ background: p.bg, color: p.color }}
            >
              {p.icon}
            </div>
            <p className="font-semibold text-slate-800 text-sm">{p.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{p.description}</p>
            <div className="flex items-center gap-1 mt-3" style={{ color: p.color }}>
              <span className="text-xs font-semibold">Conectar via OAuth</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {showForm && (
        <ManualConnectionForm onSuccess={() => {
          setShowForm(false);
          queryClient.invalidateQueries({ queryKey: ["connections"] });
        }} />
      )}

      {/* Connections list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-slate-800">Conexões ativas</h2>
          {connections?.length > 0 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
              {connections.length} {connections.length === 1 ? "conexão" : "conexões"}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />
            ))}
          </div>
        ) : !connections?.length ? (
          <div
            className="bg-white rounded-2xl py-14 text-center"
            style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(99,102,241,0.08)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <p className="font-semibold text-slate-700">Nenhuma conexão configurada</p>
            <p className="text-sm text-slate-400 mt-1">Conecte uma plataforma acima para começar.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {connections.map((conn: PlatformConnection) => {
              const cfg = PLATFORM_CONFIG[conn.platform] ?? { label: conn.platform, bg: "rgba(99,102,241,0.08)", color: "#6366f1", dot: "#6366f1" };
              return (
                <div
                  key={conn.id}
                  className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between"
                  style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: cfg.bg }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.dot }} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{conn.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {conn.platform_display} · {conn.auth_method_display}
                        {conn.last_sync_at && (
                          <span> · Sincronizado em {new Date(conn.last_sync_at).toLocaleDateString("pt-BR")}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSyncTarget(conn)}
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors"
                      style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.15)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.08)"; }}
                    >
                      Sincronizar
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Remover esta conexão?")) deleteMutation.mutate(conn.id);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors"
                      style={{ background: "rgba(239,68,68,0.07)", color: "#ef4444" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.07)"; }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {syncTarget && <SyncModal connection={syncTarget} onClose={() => setSyncTarget(null)} />}
    </div>
  );
}
