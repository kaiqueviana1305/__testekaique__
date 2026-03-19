import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
