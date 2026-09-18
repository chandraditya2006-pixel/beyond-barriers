import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle } from 'lucide-react';

/**
 * RiskBadge Component
 * Renders an accessible, visually distinct badge for student risk statuses:
 * - Stable (Emerald / Green)
 * - Needs Attention (Amber / Warm Yellow)
 * - Immediate Support (Rose / Red)
 * 
 * @param {Object} props
 * @param {'Stable'|'Needs Attention'|'Immediate Support'|string} props.status
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.showIcon=true]
 * @param {boolean} [props.pulse=false]
 */
export default function RiskBadge({ status = 'Stable', size = 'md', showIcon = true, pulse = false }) {
  const configs = {
    'Stable': {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      label: 'Stable',
      tooltip: 'Student is meeting institutional progress expectations.'
    },
    'Needs Attention': {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
      label: 'Needs Attention',
      tooltip: 'Early indicators suggest upcoming academic or attendance support is recommended.'
    },
    'Immediate Support': {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-700',
      dot: 'bg-rose-500',
      icon: AlertOctagon,
      label: 'Immediate Support',
      tooltip: 'High priority educational intervention needed (attendance dip, critical assessments).'
    }
  };

  const config = configs[status] || {
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    text: 'text-slate-700',
    dot: 'bg-slate-400',
    icon: HelpCircle,
    label: status || 'Unknown',
    tooltip: 'Status not specified.'
  };

  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm sm:text-base px-3 py-1.5 gap-2 font-semibold'
  };

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 18
  };

  const isImmediate = status === 'Immediate Support';

  return (
    <span
      title={config.tooltip}
      className={`inline-flex items-center rounded-full border shadow-sm transition-all duration-150 ${config.bg} ${config.border} ${config.text} ${sizeClasses[size] || sizeClasses.md}`}
    >
      {showIcon ? (
        <span className="relative flex items-center justify-center">
          <IconComponent size={iconSizes[size] || 15} className="shrink-0" />
          {(pulse || isImmediate) && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping opacity-75" />
          )}
        </span>
      ) : (
        <span className={`w-2 h-2 rounded-full ${config.dot} ${pulse || isImmediate ? 'animate-pulse' : ''}`} />
      )}
      <span className="whitespace-nowrap">{config.label}</span>
    </span>
  );
}
