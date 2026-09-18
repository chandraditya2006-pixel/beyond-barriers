// src/components/StatCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  status = 'neutral', // 'danger' | 'warning' | 'success' | 'teal' | 'neutral'
  badgeText,
  trend,
  trendDirection, // 'up' | 'down'
  onClick
}) {
  const statusStyles = {
    danger: {
      border: 'border-rose-200/90',
      iconBg: 'bg-rose-50 text-rose-600',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      accent: 'text-rose-600'
    },
    warning: {
      border: 'border-amber-200/90',
      iconBg: 'bg-amber-50 text-amber-600',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      accent: 'text-amber-600'
    },
    success: {
      border: 'border-emerald-200/90',
      iconBg: 'bg-emerald-50 text-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accent: 'text-emerald-600'
    },
    teal: {
      border: 'border-teal-200/90',
      iconBg: 'bg-teal-50 text-teal-600',
      badge: 'bg-teal-50 text-teal-700 border-teal-200',
      accent: 'text-teal-600'
    },
    neutral: {
      border: 'border-slate-200',
      iconBg: 'bg-slate-100 text-slate-700',
      badge: 'bg-slate-50 text-slate-600 border-slate-200',
      accent: 'text-slate-800'
    }
  };

  const style = statusStyles[status] || statusStyles.neutral;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border ${style.border} shadow-xs hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              {value}
            </span>
            {subvalue && (
              <span className="text-xs font-medium text-slate-500">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {trend && (
          <div className="flex items-center gap-1 font-medium">
            {trendDirection === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
            )}
            <span className={trendDirection === 'up' ? 'text-emerald-700' : 'text-rose-700'}>
              {trend}
            </span>
          </div>
        )}

        {badgeText && (
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${style.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
