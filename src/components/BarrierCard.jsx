// src/components/BarrierCard.jsx
import React from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Target,
  Info,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BarrierCard({ barrier, onActionClick }) {
  const { resolvedBarriers, resolveBarrier, openModal } = useApp();
  const isResolved = resolvedBarriers.has(barrier.id);

  const severityConfigs = {
    danger: {
      border: 'border-rose-200 hover:border-rose-300',
      headerBg: 'bg-rose-50/70',
      pill: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: AlertTriangle,
      iconColor: 'text-rose-600',
      btn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
    },
    warning: {
      border: 'border-amber-200 hover:border-amber-300',
      headerBg: 'bg-amber-50/70',
      pill: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: AlertCircle,
      iconColor: 'text-amber-600',
      btn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
    },
    info: {
      border: 'border-teal-200 hover:border-teal-300',
      headerBg: 'bg-teal-50/70',
      pill: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: ShieldAlert,
      iconColor: 'text-teal-600',
      btn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
    }
  };

  const config = severityConfigs[barrier.severity] || severityConfigs.warning;
  const Icon = config.icon;

  const handleAction = () => {
    if (isResolved) return;

    if (onActionClick) {
      onActionClick(barrier);
      return;
    }

    // Default modal interaction
    openModal({
      title: `Initiate Support: ${barrier.title}`,
      subtitle: `${barrier.category} • Action Plan`,
      children: (
        <div className="space-y-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Current Value:</span>
              <span className="font-bold text-slate-800">{barrier.currentValue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Target / Threshold:</span>
              <span className="font-bold text-rose-700">{barrier.threshold}</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Why this was detected:
            </label>
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              {barrier.whyDetected}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Recommended Intervention Pathway:
            </label>
            <p className="text-xs text-teal-950 bg-teal-50 p-2.5 rounded-lg border border-teal-200/80">
              {barrier.recommendedAction}
            </p>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Submitting this action links directly with Academic Advisor Dr. Ramesh Kulkarni and the Student Success committee.
          </p>
        </div>
      ),
      confirmText: barrier.actionLabel || "Confirm Support Action",
      onConfirm: () => {
        resolveBarrier(barrier.id, barrier.title);
      }
    });
  };

  return (
    <div className={`bg-white rounded-2xl border ${config.border} shadow-xs transition-all duration-200 overflow-hidden flex flex-col justify-between ${
      isResolved ? 'opacity-80 bg-slate-50/40' : ''
    }`}>
      {/* 1. Header with Support Area Category and Severity Pill */}
      <div className={`p-4 border-b border-slate-100 flex items-center justify-between gap-3 ${config.headerBg}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-2xs ${config.iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">
              {barrier.category}
            </h4>
            <p className="text-[10px] text-slate-500 font-medium">
              Intervention Required
            </p>
          </div>
        </div>

        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase ${config.pill}`}>
          {isResolved ? 'Action Pending' : barrier.severityLabel}
        </span>
      </div>

      {/* 2. Card Body with All 5 Required Fields */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            {barrier.title}
          </h3>

          {/* Status & Threshold Pill Grid */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Current Status / Value</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block truncate" title={barrier.currentValue}>
                {barrier.currentValue}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Target / Threshold</span>
              <span className="font-bold text-rose-700 text-xs mt-0.5 block truncate" title={barrier.threshold}>
                {barrier.threshold}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnostic breakdown: Why Detected, Potential Impact, Recommended Action */}
        <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
          <div>
            <span className="font-semibold text-slate-800 block text-[11px] mb-0.5">
              Why detected:
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {barrier.whyDetected}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/60">
            <span className="font-semibold text-amber-900 block text-[11px] mb-0.5">
              Potential impact:
            </span>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              {barrier.potentialImpact}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200/80">
            <span className="font-semibold text-teal-900 block text-[11px] mb-0.5">
              Recommended action:
            </span>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              {barrier.recommendedAction}
            </p>
          </div>
        </div>

        {/* 3. Action Button */}
        <div className="pt-2">
          {isResolved ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 w-full justify-center">
              <CheckCircle2 className="w-4 h-4" />
              <span>Intervention Scheduled with Advisor</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAction}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${config.btn}`}
            >
              <span>{barrier.actionLabel || 'Take Action'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
