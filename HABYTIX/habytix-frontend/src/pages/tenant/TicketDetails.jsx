import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TenantLayout from "../../layouts/TenantLayout";

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tickets/${id}`)
      .then((res) => setTicket(res.data));
  }, []);

  if (!ticket) return <TenantLayout>Loading...</TenantLayout>;

  return (
    <TenantLayout>
      <h1 className="text-2xl font-semibold mb-4">
        {ticket.title}
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p>
          <strong>Assigned To:</strong>{" "}
          {ticket.assignedTo ? `Staff #${ticket.assignedTo}` : "Not assigned"}
        </p>
      </div>
    </TenantLayout>
  );
}
