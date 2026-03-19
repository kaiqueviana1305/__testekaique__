import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { mockClients } from "../../data/mockClients";
import clsx from "clsx";

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;
  const isClientActive = (id: string) => location.pathname.startsWith(`/clients/${id}`);

  return (
    <aside className="w-56 bg-[#0d1117] border-r border-[#21262d] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-[#21262d]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h1 className="font-bold text-white text-sm leading-tight">Seppala</h1>
            <p className="text-xs text-[#6b7280]">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="p-3 space-y-1 border-b border-[#21262d]">
        <Link
          to="/"
          className={clsx(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            isActive("/")
              ? "bg-blue-600 text-white"
              : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
          )}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Visão Geral
        </Link>
        <Link
          to="/integrations"
          className={clsx(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            isActive("/integrations")
              ? "bg-blue-600 text-white"
              : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
          )}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Integrações
        </Link>
      </nav>

      {/* Clients */}
      <div className="flex-1 overflow-auto p-3">
        <p className="text-xs text-[#6b7280] font-semibold uppercase tracking-wider px-3 mb-2">Clientes</p>
        <div className="space-y-1">
          {mockClients.map((client) => (
            <Link
              key={client.id}
              to={`/clients/${client.id}`}
              className={clsx(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isClientActive(client.id)
                  ? "bg-[#161b22] text-white"
                  : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
              )}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: client.color }}
              />
              <span className="truncate">{client.name}</span>
              <span className={clsx(
                "ml-auto text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0",
                client.dashboardType === "ecommerce"
                  ? "bg-blue-600/20 text-blue-400"
                  : "bg-green-600/20 text-green-400"
              )}>
                {client.dashboardType === "ecommerce" ? "Eco" : "Leads"}
              </span>
            </Link>
          ))}
          <Link
            to="/clients/new"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#6b7280] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Adicionar cliente
          </Link>
        </div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-[#21262d]">
        <p className="text-xs font-medium text-white truncate">
          {user?.first_name || user?.username}
        </p>
        {user?.company && (
          <p className="text-xs text-[#6b7280] truncate">{user.company}</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
