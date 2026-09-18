// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileBadge2, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  HelpCircle,
  ChevronRight,
  Layers,
  LogOut,
  LogIn
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navigationLinks = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Support Passport', path: '/passport', icon: FileBadge2, badge: 'Profile' },
  { name: 'Recommendations', path: '/recommendations', icon: Sparkles, badge: 'New' },
  { name: 'Opportunities', path: '/opportunities', icon: Compass },
  { name: 'Career Path', path: '/career', icon: TrendingUp },
  { name: 'Progress', path: '/progress', icon: BarChart3 }
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { student, logout } = useApp();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100 gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              Beyond Barriers
            </div>
            <p className="text-[11px] font-medium text-teal-700 tracking-wide uppercase">
              Support System
            </p>
          </div>
        </div>

        {/* Student Quick Pill - Consistent 3 Detected Support Areas */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-50 border border-slate-100/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-semibold flex items-center justify-center text-sm ring-2 ring-teal-600/20">
              {student.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-semibold text-slate-900 truncate">
                {student.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {student.course.split(' ')[0]} • Year {student.year}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Support Needs:</span>
            <span className="font-semibold px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800">
              3 Detected (2 High)
            </span>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu
          </div>
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={({ isActive }) => `
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative
                  ${isActive 
                    ? 'bg-teal-50 text-teal-900 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span className="flex-1">{link.name}</span>
                    {link.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive ? 'bg-teal-200/60 text-teal-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-teal-600 rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Support System Info & Switch/Sign Out Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <div className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Inclusive Support Engine
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Personalized interventions based on holistic student intake.
            </p>
            <div className="mt-2 text-[10px] text-teal-700 font-medium">
              Advisor: {student.academicAdvisor}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-2 px-3 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>Sign Out / Switch Demo</span>
          </button>
        </div>
      </aside>
    </>
  );
}
