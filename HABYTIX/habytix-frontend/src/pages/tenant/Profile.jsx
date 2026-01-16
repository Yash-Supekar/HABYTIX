import TenantLayout from "../../layouts/TenantLayout";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("habytixUser"));

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <TenantLayout>
      <div className="max-w-xl bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

        <div className="space-y-3 text-sm">
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <button
          onClick={() => navigate("/tenant/profile/edit")}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      </div>
    </TenantLayout>
  );
}
