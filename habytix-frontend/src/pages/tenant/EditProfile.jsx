import { useState } from "react";
import TenantLayout from "../../layouts/TenantLayout";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "Yash Supekar",
    phone: "+91 9876543210",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", form);
    navigate("/tenant/profile");
  };

  return (
    <TenantLayout>
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 max-w-xl"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-slate-900 text-white px-5 py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/tenant/profile")}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </TenantLayout>
  );
}
