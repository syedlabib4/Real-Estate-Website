
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

const Login = ({ onLoginSuccess, switchToSignup }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword(form);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login successful!");
      if (data?.session) onLoginSuccess(data.session);
      setForm({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-blue-700">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={switchToSignup}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
