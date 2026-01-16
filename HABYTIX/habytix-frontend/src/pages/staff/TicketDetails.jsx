import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StaffLayout from "../../layouts/StaffLayout";

export default function StaffTicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetchTicket();
    fetchTenants();
  }, []);

  const fetchTicket = async () => {
    const res = await axios.get(`http://localhost:8080/api/tickets/${id}`);
    setTicket(res.data);
  };

  const fetchTenants = async () => {
    const res = await axios.get("http://localhost:8080/api/users/role/tenant");
    setTenants(res.data);
  };

  const getTenantName = (tenantId) => {
    const tenant = tenants.find((t) => t.id === tenantId);
    return tenant ? tenant.fullName : `Tenant ID ${tenantId}`;
  };

  const closeTicket = async () => {
    await axios.put(
      `http://localhost:8080/api/tickets/${id}/status?status=CLOSED`
    );
    navigate("/staff/tickets");
  };

  if (!ticket) return <StaffLayout>Loading...</StaffLayout>;

  return (
    <StaffLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">
        <button
          onClick={() => navigate("/staff/tickets")}
          className="text-indigo-600 hover:underline font-medium"
        >
          ← Back to Tickets
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          {getTenantName(ticket.tenantId)}
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Title:</strong> {ticket.title}
          </p>
          <p>
            <strong>Description:</strong> {ticket.description}
          </p>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
        </div>

        {ticket.status !== "CLOSED" && (
          <button
            onClick={closeTicket}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
          >
            Close Ticket
          </button>
        )}
      </div>
    </StaffLayout>
  );
}
