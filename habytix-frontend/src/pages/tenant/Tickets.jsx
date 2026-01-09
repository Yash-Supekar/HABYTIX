import { useNavigate } from "react-router-dom";
import TenantLayout from "../../layouts/TenantLayout";

const mockTickets = [
  {
    id: 1,
    type: "Maintenance",
    category: "Plumbing",
    status: "OPEN",
    createdAt: "2026-01-02",
  },
  {
    id: 2,
    type: "Complaint",
    category: "Noise",
    status: "IN_PROGRESS",
    createdAt: "2026-01-02",
  },
];

export default function Tickets() {
  const navigate = useNavigate();

  return (
    <TenantLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Requests</h1>
        <button
          onClick={() => navigate("/tenant/tickets/new")}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          + New Request
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() =>
                  navigate(`/tenant/tickets/${ticket.id}`)
                }
                className="border-t cursor-pointer hover:bg-slate-50"
              >
                <td className="p-4">{ticket.type}</td>
                <td className="p-4">{ticket.category}</td>
                <td className="p-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="p-4">{ticket.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TenantLayout>
  );
}

function StatusBadge({ status }) {
  const styles = {
    OPEN: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    CLOSED: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
