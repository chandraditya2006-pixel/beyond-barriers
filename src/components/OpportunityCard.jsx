// src/components/OpportunityCard.jsx
import React from 'react';
import { 
  Bookmark, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OpportunityCard({ opportunity, onAction }) {
  const { 
    bookmarkedOppIds, 
    toggleBookmarkOpp, 
    appliedOppIds, 
    applyOpportunity, 
    openModal, 
    student 
  } = useApp();

  const isBookmarked = bookmarkedOppIds.has(opportunity.id);
  const isApplied = appliedOppIds.has(opportunity.id);

  const categoryConfigs = {
    'Scholarships': {
      pill: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      actionDefault: 'Apply Now'
    },
    'Courses': {
      pill: 'bg-teal-50 text-teal-800 border-teal-200',
      actionDefault: 'Enroll Free'
    },
    'Mentors': {
      pill: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      actionDefault: 'Connect with Mentor'
    }
  };

  const currentConfig = categoryConfigs[opportunity.category] || {
    pill: 'bg-slate-100 text-slate-800 border-slate-200',
    actionDefault: 'Apply'
  };

  const handleApply = () => {
    if (isApplied) return;

    if (onAction) {
      onAction(opportunity);
      return;
    }

    openModal({
      title: `Application: ${opportunity.title}`,
      subtitle: `${opportunity.category} • Offered by ${opportunity.provider}`,
      children: (
        <div className="space-y-4">
          <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 text-xs text-teal-950">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Verified Match Profile ({opportunity.matchScore})</span>
            </div>
            <ul className="mt-2 space-y-1 text-[11px] text-teal-900">
              {opportunity.matchingFactors?.map((mf, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{mf}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Applicant:</span>
              <span className="font-semibold text-slate-800">{student.name} ({student.rollNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Academic Standing:</span>
              <span className="font-semibold text-slate-800">{student.academicScore}% • Year {student.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Financial Aid Bracket:</span>
              <span className="font-semibold text-slate-800">{student.financialNeed}</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Eligibility & Verification:
            </label>
            <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
              {opportunity.eligibility}
            </p>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Your verified Support Passport credentials will be securely shared with the program coordinator.
          </p>
        </div>
      ),
      confirmText: `Submit Application`,
      onConfirm: () => {
        applyOpportunity(opportunity);
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Category & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${currentConfig.pill}`}>
            {opportunity.category}
          </span>
          <button
            type="button"
            onClick={() => toggleBookmarkOpp(opportunity.id, opportunity.title)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-teal-50 border-teal-300 text-teal-700'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Bookmark Opportunity"
            title={isBookmarked ? "Remove from bookmarks" : "Save opportunity"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-teal-600 text-teal-600' : ''}`} />
          </button>
        </div>

        {/* Title & Provider */}
        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{opportunity.provider}</span>
        </p>

        {/* Matches Your Profile Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50/90 border border-teal-200 text-teal-800 text-[11px] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>Matches your profile</span>
          <span className="text-teal-900 font-bold ml-1 bg-white px-1.5 py-0.2 rounded text-[10px] shadow-2xs">
            {opportunity.matchScore}
          </span>
        </div>

        {/* Concrete 2-3 Matching Factors */}
        {opportunity.matchingFactors && opportunity.matchingFactors.length > 0 && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Matching Factors:
            </span>
            <ul className="space-y-1 text-[11px] text-slate-700">
              {opportunity.matchingFactors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
          {opportunity.description}
        </p>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-500">
          {opportunity.deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{opportunity.deadline}</span>
            </div>
          )}
          {opportunity.amount && (
            <span className="font-semibold text-slate-800 block mt-0.5">{opportunity.amount}</span>
          )}
        </div>

        {isApplied ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Applied</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleApply}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <span>{opportunity.actionText || currentConfig.actionDefault}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
