import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import clsx from "clsx";

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IntegrationsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const NAV_ITEMS = [
  { path: "/dashboard",    label: "Dashboard",   Icon: DashboardIcon },
  { path: "/integrations", label: "Integrações", Icon: IntegrationsIcon },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user
    ? ((user.first_name?.[0] ?? "") + (user.last_name?.[0] ?? "") || (user.username?.[0] ?? "U")).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen flex" style={{ background: "#f1f5f9" }}>
      {/* Sidebar */}
      <aside
        className="w-60 flex flex-col sidebar-scrollbar overflow-y-auto"
        style={{ background: "#0B1120", minHeight: "100vh" }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid #1e2d47" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              S
            </div>
            <div>
              <p className="font-semibold text-white text-sm leading-tight">Seppala</p>
              <p className="text-xs" style={{ color: "#64748b" }}>Campaign Dashboard</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-4 pb-2 space-y-0.5">
          <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: "#334155" }}>
            Menu
          </p>
          {NAV_ITEMS.map(({ path, label, Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "text-white"
                    : "hover:text-white"
                )}
                style={
                  isActive
                    ? { background: "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 100%)", color: "#a5b4fc", borderLeft: "2px solid #6366f1" }
                    : { color: "#64748b", borderLeft: "2px solid transparent" }
                }
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#151e30"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = ""; }}
              >
                <span style={{ opacity: isActive ? 1 : 0.7 }}>
                  <Icon />
                </span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 pb-4 pt-3" style={{ borderTop: "1px solid #1e2d47" }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: "#151e30" }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.first_name ? `${user.first_name} ${user.last_name ?? ""}`.trim() : user?.username}
              </p>
              {user?.company && (
                <p className="text-xs truncate" style={{ color: "#475569" }}>{user.company}</p>
              )}
            </div>
            <button
              onClick={handleLogout}
              title="Sair"
              className="flex-shrink-0 transition-colors"
              style={{ color: "#475569" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-screen-2xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
