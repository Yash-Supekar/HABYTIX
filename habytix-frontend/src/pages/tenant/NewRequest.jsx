import { useState } from "react";
import TenantLayout from "../../layouts/TenantLayout";
import { useNavigate } from "react-router-dom";

const categories = {
  Maintenance: ["Plumbing", "Electrical", "HVAC", "Carpentry"],
  Complaint: ["Noise", "Cleanliness", "Security"],
  Service: ["Cleaning", "Pest Control", "Internet"],
};

export default function NewRequest() {
  const navigate = useNavigate();
  const [type, setType] = useState("Maintenance");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      type,
      category,
      priority,
      description,
    });

    navigate("/tenant/tickets");
  };

  return (
    <TenantLayout>
      <h1 className="text-2xl font-semibold mb-6">Raise New Request</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 max-w-2xl"
      >
        {/* Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Request Type</label>
          <select
            className="w-full border rounded-lg p-2"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCategory("");
            }}
          >
            {Object.keys(categories).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border rounded-lg p-2"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories[type].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            className="w-full border rounded-lg p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            rows="4"
            className="w-full border rounded-lg p-2"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Attach Photos (optional)
          </label>
          <input type="file" className="w-full text-sm" />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800"
          >
            Submit Request
          </button>
          <button
            type="button"
            onClick={() => navigate("/tenant/tickets")}
            className="border px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </TenantLayout>
  );
}
