import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FRONTEND-ONLY: fake login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {/* Logo Placeholder */}
          {/* <img src="/logo.svg" alt="logo" className="h-12 w-12 mx-auto mb-4" /> */}
          Household Billing Tracker
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="example@mail.com"
            />
          </div>
          {/* Password*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="********"
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            Sign In
          </button>

          {/* Fake Link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            No account?
            <span className="text-indigo-600 cursor-pointer">
              {" "}
              Create Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
