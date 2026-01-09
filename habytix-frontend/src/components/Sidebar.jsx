import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-8">Habytix</h1>

            <nav className="space-y-3">
                <Link className="block text-slate-300 hover:text-white" to={`/${role}/dashboard`}>
                    Dashboard
                </Link>

                {role === "tenant" && (
                    <>
                        <Link className="block text-slate-300 hover:text-white" to="/tenant/tickets">
                            My Requests
                        </Link>
                        <Link className="block text-slate-300 hover:text-white" to="/tenant/payments">
                            Payments
                        </Link>
                        <Link className="block text-slate-300 hover:text-white" to="/tenant/documents">
                            Documents
                        </Link>
                        <Link
                            className="block text-slate-300 hover:text-white"
                            to="/tenant/tickets"
                        >
                            My Requests
                        </Link>
                        <Link
                            to="/tenant/profile"
                            className="block text-slate-300 hover:text-white"
                        >
                            Profile
                        </Link>


                    </>
                )}
            </nav>
        </aside>
    );
}
