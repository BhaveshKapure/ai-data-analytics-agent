import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  Database,
  ChevronDown,
  User,
  Settings,
  Activity,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications, mockDatasets } from '../../data/mockData';

export const Topbar = ({ onOpenMobileMenu }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState(mockDatasets[0].id);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard': return 'Dashboard Overview';
      case '/user-management': return 'User Management';
      case '/dataset-management': return 'Dataset Management & Schemas';
      case '/data-analysis': return 'Automated Statistical Workshop';
      case '/ai-analyst': return 'AI Data Analyst Workspace';
      case '/visualizations': return 'Visualization Studio';
      case '/predictions': return 'Predictive Intelligence & Forecasting';
      case '/reports': return 'Report Center';
      case '/history': return 'System Activity & Audit Trail';
      case '/settings': return 'System Settings';
      default: return 'AI Data Analytics Agent';
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base md:text-lg font-bold text-navy-900 tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
      </div>

      {/* Center: Search & Quick Dataset Selector */}
      <div className="hidden lg:flex items-center gap-3 max-w-md w-full">
        {/* Dataset Quick Select */}
        <div className="relative">
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="appearance-none bg-slate-100/80 hover:bg-slate-100 text-xs font-semibold text-navy-900 py-2 pl-8 pr-7 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 cursor-pointer"
          >
            {mockDatasets.map((ds) => (
              <option key={ds.id} value={ds.id}>
                {ds.fileName} ({ds.rowCount.toLocaleString()} rows)
              </option>
            ))}
          </select>
          <Database className="w-3.5 h-3.5 text-brand-blue absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Global Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search datasets, AI insights, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/80 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications & Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-cyan ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Notifications ({unreadCount} new)
                </span>
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-semibold text-brand-blue hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs flex gap-3 transition-colors ${
                      n.unread ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="mt-0.5">
                      {n.type === 'ai' && <Bot className="w-4 h-4 text-brand-cyan" />}
                      {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {n.type === 'report' && <FileSpreadsheet className="w-4 h-4 text-brand-blue" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-navy-900">{n.title}</p>
                      <p className="text-text-secondary text-[11px] mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-brand-blue/30"
            />
            <span className="hidden sm:block text-xs font-bold text-navy-900">{user?.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-navy-900">{user?.name}</p>
                <p className="text-[10px] text-slate-500">{user?.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <User className="w-4 h-4 text-slate-400" /> Profile Details
                </button>

                <button
                  onClick={() => {
                    navigate('/history');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <Activity className="w-4 h-4 text-slate-400" /> Recent Activity
                </button>

                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Preferences
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                >
                  <LogOut className="w-4 h-4 text-rose-500" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
