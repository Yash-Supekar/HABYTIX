import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function TenantLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar role="tenant" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-slate-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
