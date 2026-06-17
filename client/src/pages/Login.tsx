import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaRegFileAlt, FaUserFriends, FaChartPie, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa"

function Login({ onLogin }: {onLogin: () => void }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FRONTEND-ONLY: fake login
    onLogin();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-4 md:p-8">
        {/* <h1 className="text-4xl font-bold text-gray-900 text-center mb-12 my-2">
          {/* Logo Placeholder */}
          {/* <img src="/logo.svg" alt="logo" className="h-12 w-12 mx-auto mb-4" /> */}
          {/* 🏠 Household Billing Tracker
        </h1> */}
        {/* <p className="text-sm text-gray-600 text-center mb-4">
          Track bills, contributions, and shared household expenses.
        </p> */}
        <div className="grid grid-cols-2 gap-2 justify-content justify-items-center">
          
          {/* Login Form - Left Side */}
          <div className="grid justify-start text-sm text-gray-700 font-medium px-10 py-2">
            <div className="grid grid-flow-cols grid-rows-3 gap-4">
              <div className="row-span-3 mb-8">
              <FaHome className="flex justify-center items-center w-15 h-15 text-blue-500 items-center mt-0.5 flex-shrink-0"/>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Household Billing Tracker</h2>
                <p className="text-sm text-gray-600">Simplify your household finances and stay on top of what matters</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaRegFileAlt className="w-9 h-9 text-green-500 outline-1 outline-gray-200 p-1 rounded-md mt-0.5 flex-shrink-0"/> 
                <div className="mb-2">
                  <h3 className="font-bold">Track household bills</h3>
                  <p className="text-xs">Keep all your bills in one place.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaUserFriends className="w-9 h-9 text-blue-500 outline-1 outline-gray-200 p-1 rounded-md mt-0.5 flex-shrink-0"/> 
                <div className="mb-2">
                  <h3 className="font-bold">Monitor member contributions</h3>
                  <p className="text-xs">See who paid what, clearly.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaChartPie className="w-9 h-9 text-yellow-500 outline-1 outline-gray-200 p-1 rounded-md mt-0.5 flex-shrink-0"/> 
                <div className="mb-2">
                  <h3 className="font-bold">View expense summaries </h3>
                  <p className="text-xs">Get insights with beautiful summaries.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaShieldAlt className="w-9 h-9 text-purple-500 outline-1 outline-gray-200 p-1 rounded-md mt-0.5 flex-shrink-0"/>
                <div className="mb-2">
                  <h3 className="font-bold">Never miss a payment</h3>
                  <p className="text-xs">Keep your bills organized.</p>
                  {/* <p className="text-xs">Set reminders and stay organized</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Login Form - Right Side */}
          <div className="grid items-center justify-end text-sm text-gray-700 font-medium bg-gray-50 px-14 rounded-xl shadow-md">
            <div className="">
              <div className="items-center justify-center text-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
                <p className="text-sm text-gray-600">Please sign in to your account</p>
              </div>
            
            <form className="" onSubmit={handleSubmit}>
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
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="********"
                    />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash/> : <FaEye />}
                  </button>
                </div>
                {/* Fake Link */}
              <p className="flex justify-end text-sm text-gray-500 mb-6 mt-1">
                <span className=" text-indigo-600 cursor-pointer">
                  Forgot Password?
                </span>
              </p>
              </div>
              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Sign In
              </button>
              {/* OR horizontal line */}
              <div className="flex items-center my-8">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Fake Link */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?
                <span className="text-indigo-600 cursor-pointer">
                  {" "}
                  Create One
                </span>
              </p>
            </form>
            </div>
          </div>
        </div>
        <hr className="my-6"/> 
        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; 2026 Household Billing Tracker. All rights reserved.
        </p>
        <p className="text-center text-xs text-gray-400 mt-2">
          * This is a frontend-only demo and does not include real authentication. User data is currently stored in local storage.
        </p>
      </div>
    </div>
  );
}

export default Login;
