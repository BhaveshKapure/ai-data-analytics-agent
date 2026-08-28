import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AIOrb3D } from '../components/3d/AIOrb3D';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('alex.vance@analytics.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/20 blur-3xl rounded-full pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-navy-900/90 backdrop-blur-xl border border-navy-700 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Top AI Orb & Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <AIOrb3D size="w-20 h-20" color="#2F9BF4" speed={3} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <BrainCircuit className="w-6 h-6 text-brand-cyan" />
            <span className="text-lg font-extrabold tracking-tight text-white">AI DATA ANALYTICS</span>
          </div>
          <p className="text-xs text-slate-400">Sign in to your autonomous analytics workspace</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Work Email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
              <input type="checkbox" defaultChecked className="rounded border-navy-700 bg-navy-950 text-brand-blue" />
              <span>Remember session</span>
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link dispatched to email."); }} className="text-brand-cyan hover:underline font-semibold">
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-sm font-bold mt-2"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Sign In to Dashboard
          </Button>
        </form>

        {/* Footer info */}
        <div className="pt-4 border-t border-navy-800 text-center text-xs text-slate-400 space-y-2">
          <p>
            Don't have an account?{' '}
            <NavLink to="/register" className="text-brand-cyan font-bold hover:underline">
              Create Account
            </NavLink>
          </p>
          <p className="text-[11px] text-slate-500">Need help? Contact system admin at <span className="text-slate-400">admin@analytics.ai</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
