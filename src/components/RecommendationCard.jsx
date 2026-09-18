// src/components/RecommendationCard.jsx
import React from 'react';
import { 
  Bookmark, 
  Sparkles, 
  Clock, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RecommendationCard({ recommendation, onAction }) {
  const { bookmarkedRecIds, toggleBookmarkRec, addToast, openModal } = useApp();
  const isBookmarked = bookmarkedRecIds.has(recommendation.id);

  const categoryColors = {
    'Learning Resource': 'bg-teal-50 text-teal-800 border-teal-200',
    'Scholarship': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Mentor': 'bg-indigo-50 text-indigo-800 border-indigo-200',
    'Career Guidance': 'bg-sky-50 text-sky-800 border-sky-200'
  };

  const badgeClass = categoryColors[recommendation.category] || 'bg-slate-100 text-slate-700 border-slate-200';

  const handleActionClick = () => {
    if (onAction) {
      onAction(recommendation);
      return;
    }

    // Default interactive modal
    openModal({
      title: recommendation.title,
      subtitle: `${recommendation.category} • Offered by ${recommendation.provider}`,
      children: (
        <div className="space-y-4">
          <div className="p-3.5 bg-teal-50/70 rounded-xl border border-teal-200/80">
            <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              Why this recommendation?
            </h5>
            <ul className="mt-2.5 space-y-2 text-xs text-teal-950">
              {recommendation.whyThisRecommendation.map((reason, idx) => {
                const parts = reason.split(':');
                const hasPrefix = parts.length > 1;
                return (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold shrink-0 mt-0.5">•</span>
                    <span className="leading-relaxed">
                      {hasPrefix ? (
                        <>
                          <strong className="text-teal-900">{parts[0]}:</strong>
                          <span>{parts.slice(1).join(':')}</span>
                        </>
                      ) : (
                        reason
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium">Format:</span>
              <p className="font-semibold text-slate-800 mt-0.5">{recommendation.format}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium">Duration/Deadline:</span>
              <p className="font-semibold text-slate-800 mt-0.5">{recommendation.duration}</p>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Confirming will add this intervention to your active learning dashboard and notify your advisor.
          </p>
        </div>
      ),
      confirmText: recommendation.actionText || "Proceed",
      onConfirm: () => {
        addToast(`Initiated: "${recommendation.title}"`, 'success');
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Category Badge & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
            {recommendation.category}
          </span>
          <button
            type="button"
            onClick={() => toggleBookmarkRec(recommendation.id, recommendation.title)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-teal-50 border-teal-300 text-teal-700'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Bookmark Recommendation"
            title={isBookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-teal-600 text-teal-600' : ''}`} />
          </button>
        </div>

        {/* Title & Provider */}
        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
          {recommendation.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
          <span>{recommendation.provider}</span>
          <span>•</span>
          <span>{recommendation.duration}</span>
        </p>

        {/* Prominent "Why this recommendation?" Section */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Why this recommendation?</span>
          </div>

          <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
            {recommendation.whyThisRecommendation.map((reason, idx) => {
              const parts = reason.split(':');
              const hasPrefix = parts.length > 1;

              return (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed text-[11px]">
                    {hasPrefix ? (
                      <>
                        <strong className="text-slate-900 font-semibold">{parts[0]}:</strong>
                        <span>{parts.slice(1).join(':')}</span>
                      </>
                    ) : (
                      reason
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer Meta & Action Button */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-slate-500">
          {recommendation.level}
        </span>

        <button
          type="button"
          onClick={handleActionClick}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <span>{recommendation.actionText || 'Explore'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
