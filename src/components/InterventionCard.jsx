import React from 'react';
import { 
  CalendarClock, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Code, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';

/**
 * InterventionCard Component
 * Displays an educational intervention suggestion with interactive toggle for teachers.
 * 
 * @param {Object} props
 * @param {Object} props.intervention
 * @param {string} props.intervention.id
 * @param {string} props.intervention.title
 * @param {string} props.intervention.description
 * @param {string} [props.intervention.type] 'Attendance' | 'Academic' | 'Financial' | 'Mentorship' | 'Skill' | 'Resources'
 * @param {string} [props.intervention.priority] 'High' | 'Medium' | 'Low'
 * @param {'pending'|'completed'} [props.intervention.status='pending']
 * @param {string} [props.intervention.dueDate]
 * @param {Function} props.onToggleStatus Callback when teacher marks complete/pending
 */
export default function InterventionCard({ intervention, onToggleStatus }) {
  if (!intervention) return null;

  const isCompleted = intervention.status === 'completed';

  // Map intervention types to icons and badges
  const typeConfigs = {
    Attendance: {
      icon: Clock,
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      label: 'Attendance Improvement'
    },
    Academic: {
      icon: GraduationCap,
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      label: 'Academic Review'
    },
    Financial: {
      icon: Award,
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Scholarship / Aid'
    },
    Mentorship: {
      icon: UserCheck,
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
      label: 'Mentor Follow-up'
    },
    Skill: {
      icon: Code,
      badge: 'bg-teal-50 text-teal-700 border-teal-200',
      label: 'Skill Practice'
    },
    Resources: {
      icon: BookOpen,
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      label: 'Learning Resources'
    }
  };

  const priorityStyles = {
    High: 'bg-rose-100/80 text-rose-800 border-rose-200 font-semibold',
    Medium: 'bg-amber-100/80 text-amber-800 border-amber-200 font-medium',
    Low: 'bg-slate-100 text-slate-700 border-slate-200 font-medium'
  };

  const typeConfig = typeConfigs[intervention.type] || {
    icon: AlertCircle,
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    label: intervention.type || 'Support Action'
  };

  const TypeIcon = typeConfig.icon;

  return (
    <div 
      className={`relative rounded-xl border p-4 transition-all duration-200 ${
        isCompleted 
          ? 'bg-slate-50/70 border-slate-200 opacity-80' 
          : 'bg-white border-slate-200/80 shadow-xs hover:shadow-sm hover:border-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Action Checkbox / Toggle */}
          <button
            type="button"
            onClick={() => onToggleStatus && onToggleStatus(intervention.id)}
            className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
              isCompleted
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                : 'border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 bg-white'
            }`}
            title={isCompleted ? "Mark intervention as pending" : "Mark intervention complete"}
            aria-label={isCompleted ? "Mark intervention as pending" : "Mark intervention complete"}
          >
            {isCompleted && <CheckCircle2 size={14} strokeWidth={2.5} />}
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-md border ${typeConfig.badge} inline-flex items-center gap-1 font-medium`}>
                <TypeIcon size={12} />
                {typeConfig.label}
              </span>

              {intervention.priority && (
                <span className={`text-2xs sm:text-xs px-2 py-0.5 rounded-md border ${priorityStyles[intervention.priority] || priorityStyles.Medium}`}>
                  {intervention.priority} Priority
                </span>
              )}

              {isCompleted && (
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 size={12} /> Completed
                </span>
              )}
            </div>

            <h4 className={`text-sm font-semibold text-slate-800 ${isCompleted ? 'line-through text-slate-500' : ''}`}>
              {intervention.title}
            </h4>

            <p className={`text-xs text-slate-600 mt-1 leading-relaxed ${isCompleted ? 'text-slate-400' : ''}`}>
              {intervention.description}
            </p>
          </div>
        </div>

        {/* Due Date Indicator */}
        {intervention.dueDate && (
          <div className="shrink-0 flex items-center gap-1 text-2xs sm:text-xs text-slate-500 bg-slate-100/70 border border-slate-200/60 px-2 py-1 rounded-lg">
            <CalendarClock size={12} className="text-slate-400" />
            <span>{intervention.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
