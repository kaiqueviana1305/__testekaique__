import { Link } from "react-router-dom";
import { ClientCard } from "../components/Overview/ClientCard";
import { mockClients } from "../data/mockClients";
import { useAuth } from "../hooks/useAuth";

export function OverviewPage() {
  const { user } = useAuth();

  const ecommerceCount = mockClients.filter((c) => c.dashboardType === "ecommerce").length;
  const leadsCount = mockClients.filter((c) => c.dashboardType === "leads").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Olá, {user?.first_name || user?.username} 👋
          </h1>
          <p className="text-sm text-[#8b949e] mt-1">
            Gerencie os dashboards dos seus clientes
          </p>
        </div>
        <Link
          to="/clients/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Cliente
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
          <p className="text-xs text-[#8b949e] uppercase tracking-wide font-medium">Total de Clientes</p>
          <p className="text-3xl font-bold text-white mt-1">{mockClients.length}</p>
        </div>
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
          <p className="text-xs text-[#8b949e] uppercase tracking-wide font-medium">E-commerce</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">{ecommerceCount}</p>
        </div>
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
          <p className="text-xs text-[#8b949e] uppercase tracking-wide font-medium">Leads</p>
          <p className="text-3xl font-bold text-green-400 mt-1">{leadsCount}</p>
        </div>
      </div>

      {/* Section: E-commerce */}
      {ecommerceCount > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <h2 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wide">E-commerce</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockClients
              .filter((c) => c.dashboardType === "ecommerce")
              .map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
          </div>
        </div>
      )}

      {/* Section: Leads */}
      {leadsCount > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <h2 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wide">Leads</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockClients
              .filter((c) => c.dashboardType === "leads")
              .map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
