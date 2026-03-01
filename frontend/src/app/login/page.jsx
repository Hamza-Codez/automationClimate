"use client";
import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const SimpleLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Login successful!");
      router.push("/"); 

    } catch (error) {
      setMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500/40 to-slate-100 flex items-center justify-center px-4">
      {/* Reduced max-width to md (28rem) for a tighter, more modern look */}
      <div className="max-w-sm w-full bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
          <p className="mt-1 text-xs text-slate-500">
            Please sign in to your account
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:border-slate-500 transition-all placeholder:text-slate-300"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Password</label>
                <a href="#" className="text-[10px] font-medium text-slate-400 hover:text-slate-600">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:border-slate-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" /> Sign in
              </>
            )}
          </button>

          {message && (
            <p className={`text-center text-[12px] font-medium ${
                message.includes("successful") ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="pt-2 text-center border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-slate-900 font-bold hover:underline underline-offset-4">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleLoginPage;