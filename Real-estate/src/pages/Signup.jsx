// src/pages/Signup.jsx
import React from "react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";
import { Eye, EyeOff, UserPlus, Mail, Lock, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include a special character")
    .required("Password is required"),
});

const Signup = ({ switchToLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password, fullName } = data;

    const { data: supaData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      if (supaData?.session) toast.success("Signed up and logged in!");
      else toast.success("Signup successful! Check your email to confirm.");
      reset();
      switchToLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
          <div className="text-center space-y-3 py-8 px-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Join Our Community</h2>
            <p className="text-gray-500 text-sm">Create your account to start your real estate journey</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                  className="w-full pl-12 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 outline-none transition-colors"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full pl-12 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 outline-none transition-colors"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 chars)"
                  {...register("password")}
                  className="w-full pl-12 pr-12 h-12 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-purple-600 hover:text-purple-800 font-medium underline transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Discover premium properties and exceptional service
        </p>
      </div>
    </div>
  );
};

export default Signup;
