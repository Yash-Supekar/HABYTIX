import { useEffect, useState } from "react";
import TenantLayout from "../../layouts/TenantLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TenantTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("habytixUser"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchTickets();
    }
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/tickets/tenant/${user.id}`
      );
      setTickets(res.data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      alert("Failed to load your requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TenantLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Requests</h1>
        <button
          onClick={() => navigate("/tenant/tickets/new")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + New Request
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-500">
          No requests found. Click "New Request" to create one.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shadow rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="p-4 border-b">Title</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Priority</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 border-b">{t.title}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        t.status === "OPEN"
                          ? "bg-green-500"
                          : t.status === "IN_PROGRESS"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 border-b">{t.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </TenantLayout>
  );
}
