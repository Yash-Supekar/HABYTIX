import { useNavigate } from "react-router-dom";
import TenantLayout from "../../layouts/TenantLayout";

const mockProfile = {
  name: "Yash Supekar",
  email: "yash@example.com",
  phone: "+91 9876543210",
  building: "IRIS TOWER",
  unit: "B-204",
};

export default function Profile() {
  const navigate = useNavigate();

  return (
    <TenantLayout>
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow p-6 max-w-xl">
        <ProfileRow label="Name" value={mockProfile.name} />
        <ProfileRow label="Email" value={mockProfile.email} />
        <ProfileRow label="Phone" value={mockProfile.phone} />
        <ProfileRow label="Building" value={mockProfile.building} />
        <ProfileRow label="Unit" value={mockProfile.unit} />

        <button
          onClick={() => navigate("/tenant/profile/edit")}
          className="mt-6 bg-slate-900 text-white px-5 py-2 rounded-lg"
        >
          Edit Profile
        </button>
      </div>
    </TenantLayout>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="flex justify-between border-b py-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
