import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Sliders,
  Moon,
  Sun,
  Eye,
  Check,
  Save,
  BrainCircuit,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { user, reducedMotion, setReducedMotion } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || 'Dr. Alex Vance');
  const [email, setEmail] = useState(user?.email || 'alex.vance@analytics.ai');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoProfiling, setAutoProfiling] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Details', icon: User },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Appearance & Motion', icon: Sliders },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-navy-900 tracking-tight">System Settings & Preferences</h2>
        <p className="text-xs text-text-secondary mt-0.5">Manage user profile, password security, notification channels, and motion accessibility</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Tab Menu */}
        <Card className="lg:col-span-3 p-3 h-fit space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer
                  ${isSelected
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Right Settings Form Content */}
        <Card className="lg:col-span-9 p-6">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <CardHeader className="pb-2 border-b border-slate-100 mb-0">
                  <CardTitle className="text-base">Profile Details</CardTitle>
                </CardHeader>

                <div className="flex items-center gap-4 py-2">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-brand-blue"
                  />
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-[11px] text-text-secondary mt-1">Supports JPG, PNG up to 2 MB</p>
                  </div>
                </div>

                <Input
                  label="Full Display Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  label="Work Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <CardHeader className="pb-2 border-b border-slate-100 mb-0">
                  <CardTitle className="text-base">Password & Security</CardTitle>
                </CardHeader>

                <Input label="Current Password" type="password" placeholder="••••••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••••••" />
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <CardHeader className="pb-2 border-b border-slate-100 mb-0">
                  <CardTitle className="text-base">Notification Channels</CardTitle>
                </CardHeader>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <div>
                      <p className="text-xs font-bold text-navy-900">In-App AI Notifications</p>
                      <p className="text-[11px] text-text-secondary">Receive alerts when automated profiling finishes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      className="rounded border-slate-300 text-brand-blue"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <div>
                      <p className="text-xs font-bold text-navy-900">Auto Dataset Profiling Alerts</p>
                      <p className="text-[11px] text-text-secondary">Automatically run profiling on upload</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoProfiling}
                      onChange={(e) => setAutoProfiling(e.target.checked)}
                      className="rounded border-slate-300 text-brand-blue"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <CardHeader className="pb-2 border-b border-slate-100 mb-0">
                  <CardTitle className="text-base">Appearance & Motion Accessibility</CardTitle>
                </CardHeader>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <div>
                      <p className="text-xs font-bold text-navy-900">Reduced Motion Mode</p>
                      <p className="text-[11px] text-text-secondary">Disable heavy 3D particle canvas and long scroll transitions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={reducedMotion}
                      onChange={(e) => setReducedMotion(e.target.checked)}
                      className="rounded border-slate-300 text-brand-blue"
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button type="submit" variant="primary" icon={isSaved ? Check : Save}>
                {isSaved ? 'Preferences Saved!' : 'Save Preferences'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
