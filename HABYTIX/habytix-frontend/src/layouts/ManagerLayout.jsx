import { Link, useNavigate } from "react-router-dom";

export default function ManagerLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-700">
            Manager Panel
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
