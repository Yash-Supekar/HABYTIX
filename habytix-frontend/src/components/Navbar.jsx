export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">Dashboard</h2>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="text-sm text-slate-600 hover:text-slate-900"
      >
        Logout
      </button>
    </header>
  );
}
