// src/pages/Login.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";
import { Eye, EyeOff, Home, Mail, Lock } from "lucide-react";

const Login = ({ onLoginSuccess, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) toast.error(error.message);
    else {
      toast.success("Login successful!");
      if (data?.session) onLoginSuccess(data.session);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
          <div className="text-center space-y-3 py-8 px-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to access your real estate dashboard</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md flex items-center justify-center transition-all disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Sign In"}
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={switchToSignup}
                    className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Your trusted partner in real estate excellence
        </p>
      </div>
    </div>
  );
};

export default Login;
