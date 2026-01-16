import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ManagerLayout from "../../layouts/ManagerLayout";
import axios from "axios";

export default function AssignTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicket();
    fetchStaff();
    fetchTenants();
  }, []);

  // Fetch ticket details
  const fetchTicket = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/tickets/${id}`);
      setTicket(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setLoading(false);
    }
  };

  // Fetch STAFF users
  const fetchStaff = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/users/role/staff"
      );
      setStaffList(res.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  // Fetch TENANT users
  const fetchTenants = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/users/role/tenant"
      );
      setTenantList(res.data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  const getTenantName = (tenantId) => {
    const tenant = tenantList.find((t) => t.id === tenantId);
    return tenant ? tenant.fullName : `Tenant ID ${tenantId}`;
  };

  // Assign ticket to staff
  const handleAssign = async (staffId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tickets/${id}/assign?staffId=${staffId}`
      );
      fetchTicket();
    } catch (error) {
      console.error("Error assigning ticket:", error);
      alert("Failed to assign ticket");
    }
  };

  // Close ticket
  const handleCloseTicket = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/tickets/${id}/status?status=CLOSED`
      );
      fetchTicket();
    } catch (error) {
      console.error("Error closing ticket:", error);
      alert("Failed to close ticket");
    }
  };

  if (loading) return <ManagerLayout>Loading...</ManagerLayout>;
  if (!ticket) return <ManagerLayout>No ticket found</ManagerLayout>;

  return (
    <ManagerLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/manager/tickets")}
              className="text-indigo-600 hover:underline text-sm font-medium"
            >
              ← Back
            </button>

            {/* <h1 className="text-3xl font-bold text-gray-800">
              Ticket #{ticket.id}
            </h1> */}
          </div>

          <span
            className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
              ticket.status === "OPEN"
                ? "bg-green-500"
                : ticket.status === "IN_PROGRESS"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {ticket.status}
          </span>
        </div>

        {/* Ticket details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Tenant:</p>
            <p>{getTenantName(ticket.tenantId)}</p>
          </div>

          <div>
            <p className="font-semibold">Priority:</p>
            <p>{ticket.priority}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Title:</p>
            <p>{ticket.title}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Description:</p>
            <p>{ticket.description}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Assigned To:</p>
            <p>
              {ticket.assignedTo
                ? staffList.find((s) => s.id === ticket.assignedTo)?.fullName ||
                  `Staff ID ${ticket.assignedTo}`
                : "Not assigned"}
            </p>
          </div>
        </div>

        {/* Assign staff */}
        <div className="mt-4">
          <p className="font-semibold mb-2 text-gray-800">Assign to Staff:</p>

          <div className="flex flex-wrap gap-4 mb-4">
            {staffList.length === 0 && (
              <p className="text-sm text-gray-500">No staff available</p>
            )}

            {staffList.map((staff) => (
              <button
                key={staff.id}
                onClick={() => handleAssign(staff.id)}
                className={`px-5 py-2 rounded-lg font-medium transition transform hover:scale-105 ${
                  ticket.assignedTo === staff.id
                    ? "bg-indigo-700 text-white shadow-lg"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                {staff.fullName}
              </button>
            ))}
          </div>

          {ticket.status === "IN_PROGRESS" && (
            <button
              onClick={handleCloseTicket}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Close Ticket
            </button>
          )}
        </div>
      </div>
    </ManagerLayout>
  );
}
