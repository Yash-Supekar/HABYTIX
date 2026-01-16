import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantLayout from "../../layouts/TenantLayout";
import { useEffect } from "react";
import axios from "axios";

export default function NewRequest() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("habytixUser"));
  if (!user) return;

  useEffect(() => {
    if (!user) {
      alert("User not logged in");
      navigate("/login");
    }
  }, []);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/tickets", {
        title: form.title,
        description: form.description,
        priority: form.priority,
        tenantId: user.id, // ✅ REQUIRED
      });

      navigate("/tenant/tickets");
    } catch (error) {
      console.error("Ticket creation failed:", error.response || error);
      alert("Failed to submit request");
    }
  };

  return (
    <TenantLayout>
      <h1 className="text-2xl font-semibold mb-6">Create New Request</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your issue"
          required
          rows={4}
          className="w-full border p-2 rounded"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </TenantLayout>
  );
}
