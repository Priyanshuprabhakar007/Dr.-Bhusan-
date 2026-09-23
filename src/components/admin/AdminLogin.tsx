import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AdminLoginProps {
  onSuccess?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { adminLogin, adminUsers } = useData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await adminLogin(email, password, rememberMe);
      if (res.success) {
        onSuccess?.();
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setErrorMessage('A security error occurred during sign-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setIsForgotModalOpen(false);
      setForgotEmail('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#071D2D] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: '#149A96' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: '#18B8B4' }}
        />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#073F3D] to-[#149A96] text-white shadow-xl shadow-teal-900/40 border border-teal-500/30">
            <Stethoscope className="w-7 h-7 text-[#18B8B4]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
              Dr. Bhushan Parmar
            </h1>
            <p className="text-sm font-medium text-[#18B8B4] tracking-wide mt-0.5">
              Website Administration & Clinical CMS
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-[#0F2333]/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-start space-x-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-login-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@oncology.care"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#149A96] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs text-[#18B8B4] hover:text-teal-300 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#149A96] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  id="admin-login-remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-[#149A96] focus:ring-[#149A96] focus:ring-offset-0"
                />
                <span>Remember this workstation</span>
              </label>
              <div className="flex items-center text-xs text-slate-400 space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#149A96]" />
                <span>SHA-256 Salted</span>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              id="admin-sign-in-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#073F3D] via-[#149A96] to-[#18B8B4] hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-teal-950/50 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Administration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Roles */}
          <div className="mt-7 pt-6 border-t border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Quick Role Selection (Demo Access)</span>
              <Sparkles className="w-3.5 h-3.5 text-[#18B8B4]" />
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@oncology.care', 'Admin@2025')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-left text-xs text-slate-200 border border-slate-700/60 flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-semibold text-white">Super Admin:</span> Dr. Bhushan Parmar
                  <div className="text-[10px] text-teal-400">admin@oncology.care (Full System Rights)</div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-teal-900/60 text-teal-300 font-medium">
                  Auto-fill
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('content@oncology.care', 'Content@2025')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-left text-xs text-slate-200 border border-slate-700/60 flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-semibold text-white">Content Manager:</span> Clinical Editor
                  <div className="text-[10px] text-teal-400">content@oncology.care (Pages, Blogs, Treatments)</div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-teal-900/60 text-teal-300 font-medium">
                  Auto-fill
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('enquiries@oncology.care', 'Enquiries@2025')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-left text-xs text-slate-200 border border-slate-700/60 flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-semibold text-white">Enquiry Manager:</span> Care Coordinator
                  <div className="text-[10px] text-teal-400">enquiries@oncology.care (Appointments & Leads)</div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-teal-900/60 text-teal-300 font-medium">
                  Auto-fill
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Protected healthcare clinical system • Authorized personnel only
        </p>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0F2333] border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">
              Reset Administrator Password
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your registered administrator email address. A cryptographic recovery token will be dispatched to your authorized inbox.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-teal-950/70 border border-teal-700 text-teal-200 text-xs flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Password reset token sent to your email. Check inbox or spam folder.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="admin@oncology.care"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#149A96]"
                />
                <div className="flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#149A96] hover:bg-teal-600 text-white text-xs font-semibold transition-colors"
                  >
                    Send Recovery Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
