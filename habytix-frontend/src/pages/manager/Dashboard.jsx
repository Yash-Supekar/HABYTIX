import ManagerLayout from "../../layouts/ManagerLayout";

export default function ManagerDashboard() {
  return (
    <ManagerLayout>
      <h1 className="text-2xl font-semibold mb-6">Manager Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Tickets" value="128" />
        <StatCard title="Open Tickets" value="23" />
        <StatCard title="Monthly Revenue" value="₹4,80,000" />
      </div>
    </ManagerLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
