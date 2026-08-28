import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Database,
  BarChart3,
  Bot,
  PieChart,
  TrendingUp,
  FileText,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Sparkles,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'User Management', path: '/user-management', icon: Users },
  { name: 'Dataset Management', path: '/dataset-management', icon: Database, badge: '4' },
  { name: 'Data Analysis', path: '/data-analysis', icon: BarChart3 },
  { name: 'AI Analyst', path: '/ai-analyst', icon: Bot, isAi: true },
  { name: 'Visualizations', path: '/visualizations', icon: PieChart },
  { name: 'Predictions', path: '/predictions', icon: TrendingUp },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'History', path: '/history', icon: History },
];

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-navy-800 text-white border-r border-navy-700 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-navy-700/80">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white shadow-glow shrink-0">
            <BrainCircuit className="w-6 h-6 animate-pulse-slow" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-sm text-white leading-tight">
                AI DATA ANALYTICS
              </span>
              <span className="text-[10px] font-semibold text-brand-cyan tracking-widest uppercase">
                AGENT SAAS
              </span>
            </div>
          )}
        </NavLink>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-navy-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-navy-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {!collapsed && (
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Workspace Navigation
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`
                group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-brand-blue to-brand-cyan/90 text-white shadow-md shadow-brand-blue/30 font-semibold'
                  : 'text-slate-300 hover:bg-navy-700/60 hover:text-white'
                }
              `}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : item.isAi ? 'text-brand-cyan' : 'text-slate-400 group-hover:text-white'
                }`}
              />

              {!collapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}

              {!collapsed && item.isAi && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent border border-brand-accent/40">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}

              {!collapsed && item.badge && !item.isAi && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-navy-700 text-slate-300">
                  {item.badge}
                </span>
              )}

              {/* Tooltip for Collapsed Sidebar */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-navy-900 text-white text-xs rounded-md shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-navy-700/80 space-y-1">
        <NavLink
          to="/settings"
          onClick={() => setIsMobileOpen(false)}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
            ${location.pathname === '/settings'
              ? 'bg-brand-blue text-white'
              : 'text-slate-300 hover:bg-navy-700/60 hover:text-white'
            }
          `}
        >
          <Settings className="w-5 h-5 text-slate-400 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {/* User Card when expanded */}
        {!collapsed && user && (
          <div className="mt-3 pt-3 border-t border-navy-700/60 flex items-center gap-3 px-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-brand-cyan/40"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">{user.name}</span>
              <span className="text-[10px] text-slate-400 truncate">{user.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:block h-screen sticky top-0 transition-all duration-300 z-30 ${collapsed ? 'w-20' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
          <div className="relative w-64 max-w-xs h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
