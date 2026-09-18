import React from 'react';
import { Users, CheckCircle2, AlertTriangle, AlertOctagon, ListTodo, ArrowUpRight } from 'lucide-react';

/**
 * TeacherStatCard Component
 * Displays a summary metric with modern light theme styling, soft gradients, and interactive click-to-filter.
 * 
 * @param {Object} props
 * @param {string} props.title Card label
 * @param {number|string} props.value Metric count
 * @param {string} [props.subtitle] Subtext / context
 * @param {'total'|'stable'|'attention'|'immediate'|'interventions'} props.variant
 * @param {boolean} [props.isActive=false] Whether currently selected as a filter
 * @param {Function} [props.onClick] Click handler to trigger table filtering
 */
export default function TeacherStatCard({
  title,
  value,
  subtitle,
  variant = 'total',
  isActive = false,
  onClick
}) {
  const styles = {
    total: {
      gradient: 'from-indigo-50/70 via-white to-blue-50/40',
      border: 'border-indigo-100 hover:border-indigo-300',
      activeRing: 'ring-2 ring-indigo-500 border-indigo-400 shadow-indigo-100',
      iconBg: 'bg-indigo-100 text-indigo-700',
      icon: Users,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      glow: 'group-hover:text-indigo-600'
    },
    stable: {
      gradient: 'from-emerald-50/70 via-white to-teal-50/40',
      border: 'border-emerald-100 hover:border-emerald-300',
      activeRing: 'ring-2 ring-emerald-500 border-emerald-400 shadow-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-700',
      icon: CheckCircle2,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      glow: 'group-hover:text-emerald-600'
    },
    attention: {
      gradient: 'from-amber-50/80 via-white to-orange-50/40',
      border: 'border-amber-200/80 hover:border-amber-300',
      activeRing: 'ring-2 ring-amber-500 border-amber-400 shadow-amber-100',
      iconBg: 'bg-amber-100 text-amber-700',
      icon: AlertTriangle,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      glow: 'group-hover:text-amber-700'
    },
    immediate: {
      gradient: 'from-rose-50/80 via-white to-red-50/40',
      border: 'border-rose-200/80 hover:border-rose-300',
      activeRing: 'ring-2 ring-rose-500 border-rose-400 shadow-rose-100',
      iconBg: 'bg-rose-100 text-rose-700',
      icon: AlertOctagon,
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      glow: 'group-hover:text-rose-700'
    },
    interventions: {
      gradient: 'from-sky-50/80 via-white to-cyan-50/40',
      border: 'border-sky-100 hover:border-sky-300',
      activeRing: 'ring-2 ring-sky-500 border-sky-400 shadow-sky-100',
      iconBg: 'bg-sky-100 text-sky-700',
      icon: ListTodo,
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      glow: 'group-hover:text-sky-700'
    }
  };

  const style = styles[variant] || styles.total;
  const IconComponent = style.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative text-left w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${style.gradient} border ${style.border} ${
        isActive ? style.activeRing + ' shadow-md' : 'shadow-sm hover:shadow-md'
      } transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs sm:text-sm font-medium text-slate-600 tracking-tight flex items-center gap-1.5">
          {title}
        </span>
        <div className={`p-2 sm:p-2.5 rounded-xl ${style.iconBg} transition-transform group-hover:scale-110 shadow-xs`}>
          <IconComponent size={18} className="shrink-0" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </div>
        {onClick && (
          <span className="text-xs font-medium text-slate-400 group-hover:text-slate-700 flex items-center gap-0.5 transition-colors">
            Filter <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-500 truncate leading-relaxed">
          {subtitle}
        </p>
      )}

      {isActive && (
        <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
        </span>
      )}
    </button>
  );
}
