import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { integrationsApi, campaignsApi } from "../services/api";
import type { PlatformConnection } from "../types";
import { format } from "date-fns";
import { subDays } from "date-fns";

const PLATFORM_ICONS: Record<string, string> = {
  meta: "🟦",
  linkedin: "🔵",
  google_ads: "🔴",
  google_sheets: "🟩",
};

function SyncModal({ connection, onClose }: { connection: PlatformConnection; onClose: () => void }) {
  const [dateFrom, setDateFrom] = useState(format(subDays(new Date(), 29), "yyyy-MM-dd"));
  const [dateTo, setDateTo] = useState(format(new Date(), "yyyy-MM-dd"));
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await campaignsApi.sync({
        connection_id: String(connection.id),
        date_from: dateFrom,
        date_to: dateTo,
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="font-semibold text-gray-900 mb-4">Sincronizar: {connection.name}</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Data início</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Data fim</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={handleSync} disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-blue-700">
            {loading ? "Sincronizando..." : "Sincronizar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ManualConnectionForm({ onSuccess }: { onSuccess: () => void }) {
  const [platform, setPlatform] = useState("meta");
  const [name, setName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);

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
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-3">
      <h3 className="font-semibold text-gray-800">Adicionar conexão manual</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Plataforma</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}
            className="w-full border rounded-lg px-2 py-1.5 text-sm">
            <option value="meta">Meta Ads</option>
            <option value="linkedin">LinkedIn Ads</option>
            <option value="google_ads">Google Ads</option>
            <option value="google_sheets">Google Sheets</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-600 block mb-1">Nome amigável</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required
            placeholder="Ex: Conta Principal"
            className="w-full border rounded-lg px-2 py-1.5 text-sm" />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-600 block mb-1">ID da Conta de Anúncios</label>
        <input value={accountId} onChange={(e) => setAccountId(e.target.value)}
          placeholder={platform === "google_sheets" ? "ID da planilha (Spreadsheet ID)" : "Ex: act_123456789"}
          className="w-full border rounded-lg px-2 py-1.5 text-sm" />
      </div>
      <div>
        <label className="text-xs text-gray-600 block mb-1">Access Token</label>
        <input value={accessToken} onChange={(e) => setAccessToken(e.target.value)} type="password"
          placeholder="Token de acesso da plataforma"
          className="w-full border rounded-lg px-2 py-1.5 text-sm" />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-blue-700">
        {loading ? "Salvando..." : "Salvar conexão"}
      </button>
    </form>
  );
}

export function IntegrationsPage() {
  const [syncTarget, setSyncTarget] = useState<PlatformConnection | null>(null);
  const [showForm, setShowForm] = useState(false);
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
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Integrações</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Conexão manual
        </button>
      </div>

      {/* OAuth buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { id: "meta", label: "Conectar Meta Ads", color: "bg-blue-600" },
          { id: "linkedin", label: "Conectar LinkedIn Ads", color: "bg-sky-600" },
          { id: "google", label: "Conectar Google Ads / Sheets", color: "bg-red-500" },
        ].map((p) => (
          <button key={p.id} onClick={() => handleOAuth(p.id as "meta" | "linkedin" | "google")}
            className={`${p.color} text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity`}>
            {p.label}
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
        <h2 className="text-base font-semibold text-gray-800 mb-3">Conexões ativas</h2>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : !connections?.length ? (
          <div className="text-center py-12 text-gray-400 border rounded-xl">
            Nenhuma conexão configurada ainda.
          </div>
        ) : (
          <div className="space-y-2">
            {connections.map((conn: PlatformConnection) => (
              <div key={conn.id} className="bg-white border rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{PLATFORM_ICONS[conn.platform]}</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{conn.name}</p>
                    <p className="text-xs text-gray-500">
                      {conn.platform_display} · {conn.auth_method_display}
                      {conn.last_sync_at && ` · Sincronizado ${new Date(conn.last_sync_at).toLocaleDateString("pt-BR")}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSyncTarget(conn)}
                    className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                    Sincronizar
                  </button>
                  <button onClick={() => {
                    if (confirm("Remover esta conexão?")) deleteMutation.mutate(conn.id);
                  }}
                    className="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-medium">
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {syncTarget && <SyncModal connection={syncTarget} onClose={() => setSyncTarget(null)} />}
    </div>
  );
}
