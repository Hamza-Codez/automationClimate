"use client";
import { useState } from "react";
import axios from "axios";
import { Mail, Lock, User, Eye, EyeOff, LogIn, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("city", formData.city);
      setMessage("Signup successful!");
      router.push('/');
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500/40 to-slate-100 flex items-center justify-center p-4">
      {/* Reduced max-width from 4xl to 3xl for a more elegant desktop feel */}
      <div className="max-w-md md:max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-slate-200">
        
        {/* Left Side: Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-br from-gray-600 to-black p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-3">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Welcome</h1>
          <p className="text-slate-400 text-xs mt-1">Create your account to join us</p>
          
          <div className="hidden md:block mt-8 text-xs text-slate-400">
            <p>Already a member?</p>
            <a href="/login" className="text-white font-medium hover:text-slate-200 transition-colors underline underline-offset-4">
              Sign in
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-5 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-slate-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email & City Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-slate-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-slate-500"
                    placeholder="New York"
                  />
                </div>
              </div>
            </div>

            {/* Passwords Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-9 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-slate-500"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-9 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-slate-500"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-[10px] text-gray-400 uppercase font-bold">Or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>
          </form>

          {message && <p className="text-center text-xs font-medium text-red-500 mt-3">{message}</p>}

          <div className="mt-4 text-center md:hidden">
            <p className="text-gray-500 text-xs">
              Already have an account? <a href="/login" className="text-slate-900 font-bold">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;