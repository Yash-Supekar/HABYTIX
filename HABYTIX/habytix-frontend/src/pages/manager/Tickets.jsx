import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerLayout from "../../layouts/ManagerLayout";
import axios from "axios";

export default function ManagerTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [tenantList, setTenantList] = useState([]);

  useEffect(() => {
    fetchTickets();
    fetchStaff();
    fetchTenants();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tickets");
      setTickets(res.data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/role/staff");
      setStaffList(res.data);
    } catch (error) {
      console.error("Failed to fetch staff", error);
    }
  };

  const fetchTenants = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/role/tenant");
      setTenantList(res.data);
    } catch (error) {
      console.error("Failed to fetch tenants", error);
    }
  };

  const getStaffName = (staffId) => {
    const staff = staffList.find((s) => s.id === staffId);
    return staff ? staff.fullName : `ID ${staffId}`;
  };

  const getTenantName = (tenantId) => {
    const tenant = tenantList.find((t) => t.id === tenantId);
    return tenant ? tenant.fullName : `ID ${tenantId}`;
  };

  return (
    <ManagerLayout>
      <h1 className="text-2xl font-semibold mb-6">All Tickets</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="p-4">Tenant Name</th>
              <th className="p-4">Title</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4">Assigned To</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{getTenantName(ticket.tenantId)}</td>
                <td className="p-4">{ticket.title}</td>
                <td className="p-4">{ticket.priority}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      ticket.status === "OPEN"
                        ? "bg-green-500"
                        : ticket.status === "IN_PROGRESS"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="p-4">
                  {ticket.assignedTo ? getStaffName(ticket.assignedTo) : "-"}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/manager/tickets/${ticket.id}`)}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No tickets available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ManagerLayout>
  );
}
