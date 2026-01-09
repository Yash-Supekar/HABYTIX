import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
    return (
        <AuthLayout>
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
                <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
                <p className="text-sm text-slate-500 mb-6">
                    Sign in to continue to Habytix
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            localStorage.setItem("role", "TENANT");
                            window.location.href = "/tenant/dashboard";
                        }}
                        className="w-full bg-slate-900 text-white py-2 rounded-lg"
                    >
                        Sign In (Tenant)
                    </button>

                </form>

                <p className="text-sm text-center text-slate-500 mt-6">
                    Don’t have an account? <span className="text-slate-900 font-medium cursor-pointer">Sign up</span>
                </p>
            </div>
        </AuthLayout>
    );
}
