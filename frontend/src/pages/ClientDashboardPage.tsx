import { useParams, Link, Navigate } from "react-router-dom";
import { mockClients } from "../data/mockClients";
import { EcommerceDashboard } from "../components/EcommerceDashboard/EcommerceDashboard";
import { LeadsDashboard } from "../components/LeadsDashboard/LeadsDashboard";

export function ClientDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <p className="text-[#8b949e]">Cliente não encontrado.</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
          Voltar para Visão Geral
        </Link>
      </div>
    );
  }

  if (client.dashboardType === "ecommerce") {
    return <EcommerceDashboard client={client} />;
  }

  return <LeadsDashboard client={client} />;
}
