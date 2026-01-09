import TenantLayout from "../../layouts/TenantLayout";

export default function Dashboard() {
  return (
    <TenantLayout>
      <h1 className="text-2xl font-semibold mb-4">Welcome back 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-slate-500 text-sm">Open Requests</p>
          <h2 className="text-3xl font-bold">2</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-slate-500 text-sm">Pending Payments</p>
          <h2 className="text-3xl font-bold">₹12,000</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-slate-500 text-sm">Documents</p>
          <h2 className="text-3xl font-bold">3</h2>
        </div>
      </div>
    </TenantLayout>
  );
}
