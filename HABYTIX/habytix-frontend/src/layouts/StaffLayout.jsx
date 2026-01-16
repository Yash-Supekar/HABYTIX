import { Link, useNavigate } from "react-router-dom";

export default function StaffLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("habytixUser");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Habytix</h2>

        <nav className="space-y-4 text-sm">
          <Link to="/staff/dashboard" className="block hover:text-slate-300">
            Dashboard
          </Link>
          <Link to="/staff/tickets" className="block hover:text-slate-300">
            Tickets
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex justify-end items-center bg-white px-6 py-4 shadow">
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline font-medium"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
