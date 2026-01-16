import { useState } from "react";
import TenantLayout from "../../layouts/TenantLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("habytixUser"));

  const [form, setForm] = useState({
    fullName: user.fullName,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        form
      );

      // update localStorage with new data
      localStorage.setItem("habytixUser", JSON.stringify(res.data));

      navigate("/tenant/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <TenantLayout>
      <div className="max-w-xl bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Full Name"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Email"
            required
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="New Password (optional)"
            type="password"
          />

          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </TenantLayout>
  );
}
