import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC]">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
