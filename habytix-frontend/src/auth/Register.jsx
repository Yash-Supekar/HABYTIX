import AuthLayout from "../layouts/AuthLayout";

export default function Register() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-2">Create account</h2>
        <p className="text-sm text-slate-500 mb-6">
          Start managing your property experience with Habytix
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Tenant</option>
              <option>Property Manager</option>
              <option>Maintenance Staff</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-slate-500 mt-6">
          Already have an account? <span className="text-slate-900 font-medium cursor-pointer">Sign in</span>
        </p>
      </div>
    </AuthLayout>
  );
}
