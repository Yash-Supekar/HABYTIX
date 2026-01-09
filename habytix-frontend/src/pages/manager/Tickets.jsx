import { useNavigate } from "react-router-dom";
import ManagerLayout from "../../layouts/ManagerLayout";

const mockTickets = [
  {
    id: 1,
    tenant: "B-204",
    category: "Plumbing",
    status: "OPEN",
  },
  {
    id: 2,
    tenant: "A-102",
    category: "Noise",
    status: "IN_PROGRESS",
  },
];

export default function ManagerTickets() {
  const navigate = useNavigate();

  return (
    <ManagerLayout>
      <h1 className="text-2xl font-semibold mb-6">All Tickets</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Tenant</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket) => (
              <tr key={ticket.id} className="border-t">
                <td className="p-4">{ticket.tenant}</td>
                <td className="p-4">{ticket.category}</td>
                <td className="p-4">{ticket.status}</td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      navigate(`/manager/tickets/${ticket.id}`)
                    }
                    className="text-slate-900 underline"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ManagerLayout>
  );
}
