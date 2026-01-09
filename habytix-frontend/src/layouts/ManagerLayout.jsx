import { Link } from "react-router-dom";

export default function ManagerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Habytix</h2>

        <nav className="space-y-4 text-sm">
          <Link to="/manager/dashboard" className="block hover:text-slate-300">
            Dashboard
          </Link>
          <Link to="/manager/tickets" className="block hover:text-slate-300">
            Tickets
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
