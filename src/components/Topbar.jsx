// src/components/Topbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const titleMap = {
  '/': { title: 'Student Dashboard', subtitle: 'Overview of your academic standing, support needs & tailored guidance' },
  '/passport': { title: 'Support Passport', subtitle: 'Holistic student profile & verified accommodation credentials' },
  '/recommendations': { title: 'Personalized Recommendations', subtitle: 'Curated interventions with explicit rationales for your needs' },
  '/opportunities': { title: 'Opportunities Hub', subtitle: 'Scholarships, skill courses, and alumni mentors matching your profile' },
  '/career': { title: 'Career Pathway', subtitle: 'Milestone roadmap & skill readiness tracker for Software Development' },
  '/progress': { title: 'Progress & Analytics', subtitle: 'Longitudinal academic trends, attendance monitoring, and milestones' }
};

export default function Topbar({ onToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, addToast, bookmarkedRecIds, bookmarkedOppIds } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef(null);

  const currentMeta = titleMap[location.pathname] || { title: 'Beyond Barriers', subtitle: 'Education Support System' };

  // Close notifications on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Attendance Alert (68%)',
      desc: 'Attendance is 7% below the mandatory 75% exam cutoff threshold.',
      time: 'Today',
      action: () => navigate('/passport')
    },
    {
      id: 2,
      type: 'info',
      title: 'Pragati Scholarship Deadline',
      desc: '₹50,000 grant application window closes in 5 days.',
      time: '2 hours ago',
      action: () => navigate('/opportunities')
    },
    {
      id: 3,
      type: 'success',
      title: 'Mentor Slot Available',
      desc: 'Arjun Mehta has opened 2 additional slots for Thursday.',
      time: '1 day ago',
      action: () => navigate('/recommendations')
    }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
            {currentMeta.title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 truncate">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Quick Search, Notifications, Profile Pill */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Trigger */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search resources, grants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/opportunities?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>

        {/* Support Plan Status Chip */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-amber-800 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Intervention Plan Active</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-2">
                <span className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
                  Active Alerts ({notifications.length})
                </span>
                <span className="text-[11px] text-teal-600 font-medium">
                  Support Engine
                </span>
              </div>
              <div className="space-y-1.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      n.action();
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-start gap-2.5">
                      {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                      {n.type === 'info' && <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />}
                      {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-900 leading-snug">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    navigate('/recommendations');
                    setShowNotifications(false);
                  }}
                  className="text-xs font-medium text-teal-700 hover:text-teal-800"
                >
                  View All Actionable Recommendations →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Student Profile Avatar & Pill */}
        <div 
          onClick={() => navigate('/passport')}
          className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 cursor-pointer group"
          title="View Student Support Passport"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-sky-600 text-white font-semibold flex items-center justify-center text-xs shadow-xs group-hover:ring-2 ring-teal-500/30 transition-all">
            {student.avatar}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 group-hover:text-teal-700 transition-colors leading-tight">
              {student.name}
            </p>
            <p className="text-[10px] text-slate-500">
              {student.course.split(' ')[0]} • Yr {student.year}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
