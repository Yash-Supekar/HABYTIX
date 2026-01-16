import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StaffLayout from "../../layouts/StaffLayout";

const StaffTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("habytixUser"));

  useEffect(() => {
    if (!user?.id) return;
    fetchTickets();
  }, [user?.id]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/tickets/staff/${user.id}`
      );
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch staff tickets", err);
    }
  };

  const statusBadge = (status) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold text-white inline-block";

    if (status === "OPEN") return `${base} bg-green-500`;
    if (status === "IN_PROGRESS") return `${base} bg-yellow-500`;
    return `${base} bg-gray-500`;
  };

  return (
    <StaffLayout>
      <h1 className="text-2xl font-semibold mb-6">My Assigned Tickets</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Details</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{t.title}</td>

                <td className="p-4 text-center">
                  <span className={statusBadge(t.status)}>{t.status}</span>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => navigate(`/staff/tickets/${t.id}`)}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No tickets assigned
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </StaffLayout>
  );
};

export default StaffTickets;
