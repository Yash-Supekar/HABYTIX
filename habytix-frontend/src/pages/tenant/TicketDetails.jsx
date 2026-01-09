import { useParams } from "react-router-dom";
import TenantLayout from "../../layouts/TenantLayout";
import StatusTimeline from "../../components/StatusTimeline";

const mockTicket = {
  id: 1,
  type: "Maintenance",
  category: "Plumbing",
  status: "IN_PROGRESS",
  priority: "HIGH",
  description: "Water leaking from kitchen sink.",
  createdAt: "2026-01-02",
};

export default function TicketDetails() {
  const { id } = useParams();

  return (
    <TenantLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          Request #{id}
        </h1>
        <StatusTimeline currentStatus={mockTicket.status} />
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Detail label="Type" value={mockTicket.type} />
          <Detail label="Category" value={mockTicket.category} />
          <Detail label="Status" value={mockTicket.status} />
          <Detail label="Priority" value={mockTicket.priority} />
          <Detail label="Created At" value={mockTicket.createdAt} />
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-medium mb-1">Description</h3>
          <p className="text-slate-600">
            {mockTicket.description}
          </p>
        </div>

        {/* Attachments (Placeholder) */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Attachments</h3>
          <div className="flex gap-3">
            <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-500">
              Image
            </div>
            <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-500">
              Image
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800">
            Add Comment
          </button>
          <button className="border px-5 py-2 rounded-lg rounded-lg">
            Cancel Request
          </button>
        </div>
      </div>
    </TenantLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
