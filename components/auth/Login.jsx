"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/services/auth.service";
import toast from "react-hot-toast";
// import Cookies from 'js-cookie';
import { Eye, EyeOff } from "lucide-react";
import { setToken } from "@/utils/setToken";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Note: Logic kept same, but updated check to match your state key 'email'
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.signIn(formData);

      // setToken(res.data.accessToken);

      if (response.data.accessToken) {
        // Cookies.set('token', response.accessToken, { expires: 7, secure: true, sameSite: 'strict' });
        // Cookies.set('refresh_token', response.refreshToken, { expires: 30, secure: true, sameSite: 'strict' });
        setToken(response.data.accessToken);
        setFormData({
          email: "",
          password: "",
        });
      }
      router.push("/admin/dashboard");
      toast.success("Login successfully");
    } catch (error) {
      setApiError(
        error.message || "Sign in failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Please enter your details to sign in
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {apiError && (
              <div className="rounded-xl bg-red-50 border border-red-100 p-4 animate-shake">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
                  Error
                </p>
                <p className="text-sm text-red-800">{apiError}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3.5 bg-gray-50/50 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400`}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="mt-1.5 ml-1 text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3.5 pr-12 bg-gray-50/50 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400`}
                    placeholder="••••••••"
                  />

                  {/* Eye Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 ml-1 text-xs font-medium text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link (Visual only) */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-bold text-blue-600 hover:text-blue-500 transition-colors"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
