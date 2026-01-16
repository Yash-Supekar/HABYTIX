import { useEffect, useState } from "react";
import axios from "axios";
import ManagerLayout from "../../layouts/ManagerLayout";

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tickets/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load stats", error);
    }
  };

  if (!stats) {
    return (
      <ManagerLayout>
        <p>Loading dashboard...</p>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <h1 className="text-2xl font-semibold mb-6">Manager Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Total Tickets" value={stats.total} />
        <StatCard title="Open" value={stats.open} />
        <StatCard title="In Progress" value={stats.inProgress} />
        <StatCard title="Closed" value={stats.closed} />
      </div>
    </ManagerLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}
