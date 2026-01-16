import { Link } from "react-router-dom";

export default function Sidebar({ role }) {

  const tenantMenu = [
    { label: "Dashboard", path: "/tenant/dashboard" },
    { label: "My Requests", path: "/tenant/tickets" },
    { label: "Payments", path: "/tenant/payments" },
    { label: "Documents", path: "/tenant/documents" },
    { label: "Profile", path: "/tenant/profile" },
  ];

  const managerMenu = [
    { label: "Dashboard", path: "/manager/dashboard" },
    { label: "Tickets", path: "/manager/tickets" },
    { label: "Tenants", path: "/manager/tenants" },
    { label: "Profile", path: "/manager/profile" },
  ];

  const menu = role === "tenant" ? tenantMenu : managerMenu;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Habytix</h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block text-slate-300 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
