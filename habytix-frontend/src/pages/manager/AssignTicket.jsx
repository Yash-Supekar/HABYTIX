import { useParams, useNavigate } from "react-router-dom";
import ManagerLayout from "../../layouts/ManagerLayout";

const mockTicket = {
  id: 1,
  tenant: "B-204",
  category: "Plumbing",
  description: "Water leakage under kitchen sink",
  status: "OPEN",
  assignedTo: "",
};

const mockStaff = [
  "Ramesh (Plumber)",
  "Suresh (Electrician)",
  "Amit (General Maintenance)",
];

export default function AssignTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <ManagerLayout>
      <h1 className="text-2xl font-semibold mb-6">
        Manage Ticket #{id}
      </h1>

      <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
        {/* Ticket Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Info label="Tenant" value={mockTicket.tenant} />
          <Info label="Category" value={mockTicket.category} />
          <Info label="Status" value={mockTicket.status} />
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-1">Description</h3>
          <p className="text-slate-600">
            {mockTicket.description}
          </p>
        </div>

        {/* Assign Staff */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Assign To
          </label>
          <select className="w-full border rounded-lg p-2">
            <option value="">Select staff</option>
            {mockStaff.map((staff) => (
              <option key={staff}>{staff}</option>
            ))}
          </select>
        </div>

        {/* Update Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Update Status
          </label>
          <select className="w-full border rounded-lg p-2">
            <option>OPEN</option>
            <option>ASSIGNED</option>
            <option>IN_PROGRESS</option>
            <option>CLOSED</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/manager/tickets")}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate("/manager/tickets")}
            className="border px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </ManagerLayout>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
