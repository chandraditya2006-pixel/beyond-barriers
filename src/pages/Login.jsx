// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Layers, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, addToast } = useApp();

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const fillDemoCredentials = () => {
    setStudentId('CS21B044');
    setPassword('demo123');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentId.trim() || !password.trim()) {
      setErrorMsg('Please enter both your Student ID / Email and Password.');
      return;
    }

    setLoading(true);

    // Simulate snappy network auth transition
    setTimeout(() => {
      const success = login(studentId, password);
      setLoading(false);

      if (success) {
        navigate('/');
      } else {
        setErrorMsg('Invalid credentials. Use demo credentials: ID CS21B044 & Password demo123');
      }
    }, 400);
  };

  const handleForgotPassword = () => {
    addToast('Password reset link sent to registered email: ananya.sharma@campus.edu', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-sky-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* Brand Icon & Heading */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-sky-600 text-white shadow-lg shadow-teal-500/20 mb-4 ring-4 ring-white">
          <Layers className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Beyond Barriers
        </h1>
        <p className="mt-2 text-xs sm:text-sm font-medium text-teal-800 tracking-wide">
          Personalized support. Inclusive education. Better outcomes.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          
          {/* Header pill */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Student Portal Sign In
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/80">
              <ShieldCheck className="w-3 h-3 text-teal-600" />
              Verified Access
            </span>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student ID / Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student ID or Campus Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. CS21B044"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] font-medium text-teal-700 hover:text-teal-800 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to Support Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials Quick Fill Box */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 uppercase tracking-wide">
                  <KeyRound className="w-3.5 h-3.5 text-teal-700" />
                  <span>Demo Credentials</span>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-white px-2 py-0.5 rounded-md border border-teal-200 shadow-2xs hover:bg-teal-50 transition-colors cursor-pointer"
                >
                  Auto-Fill Demo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                <div className="bg-white/90 p-2 rounded-lg border border-teal-100">
                  <span className="text-[10px] text-slate-500 block">Student ID:</span>
                  <code className="text-xs font-bold text-slate-800">CS21B044</code>
                </div>
                <div className="bg-white/90 p-2 rounded-lg border border-teal-100">
                  <span className="text-[10px] text-slate-500 block">Password:</span>
                  <code className="text-xs font-bold text-slate-800">demo123</code>
                </div>
              </div>

              <p className="text-[10px] text-teal-800/80 mt-2 leading-tight">
                Authenticates as student <strong>Ananya Sharma</strong> (B.Tech CS Year 3).
              </p>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Beyond Barriers Inclusive Support Architecture • Frontend MVP
        </p>
      </div>
    </div>
  );
}
