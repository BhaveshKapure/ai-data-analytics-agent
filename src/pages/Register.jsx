import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AIOrb3D } from '../components/3d/AIOrb3D';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-md bg-navy-900/90 backdrop-blur-xl border border-navy-700 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <AIOrb3D size="w-16 h-16" color="#00F0FF" speed={3} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <BrainCircuit className="w-6 h-6 text-brand-cyan" />
            <span className="text-lg font-extrabold tracking-tight text-white">AI DATA ANALYTICS</span>
          </div>
          <p className="text-xs text-slate-400">Create your enterprise analytics account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Dr. Alex Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}
            required
          />

          <Input
            label="Work Email"
            type="email"
            placeholder="alex@enterprise.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-sm font-bold mt-2"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Create Account & Launch
          </Button>
        </form>

        <div className="pt-4 border-t border-navy-800 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <NavLink to="/login" className="text-brand-cyan font-bold hover:underline">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
