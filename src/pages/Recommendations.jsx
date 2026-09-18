// src/pages/Recommendations.jsx
import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Bookmark, 
  BookOpen, 
  Coins, 
  Users, 
  Compass,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import RecommendationCard from '../components/RecommendationCard';

const categories = [
  { id: 'All', label: 'All Recommendations', icon: Sparkles },
  { id: 'Learning Resource', label: 'Learning Resources', icon: BookOpen },
  { id: 'Scholarship', label: 'Scholarships & Aid', icon: Coins },
  { id: 'Mentor', label: 'Mentors', icon: Users },
  { id: 'Career Guidance', label: 'Career Guidance', icon: Compass },
];

export default function Recommendations() {
  const { student, bookmarkedRecIds } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Filter recommendations based on category, search, and bookmarks
  const filteredRecommendations = student.recommendations.filter(rec => {
    const matchesCategory = selectedCategory === 'All' || rec.category === selectedCategory;
    const matchesSearch = 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.whyThisRecommendation.some(reason => reason.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = !onlyBookmarked || bookmarkedRecIds.has(rec.id);

    return matchesCategory && matchesSearch && matchesBookmark;
  });

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Evidence-Backed Interventions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Personalized Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Every item is selected specifically to address your academic barriers, high financial need, and career goal in <strong>{student.careerInterest}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-colors cursor-pointer ${
                onlyBookmarked
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-white' : ''}`} />
              <span>Saved Items ({bookmarkedRecIds.size})</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'All' 
                ? student.recommendations.length 
                : student.recommendations.filter(r => r.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-teal-800 text-teal-100' : 'bg-slate-200/70 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search recommendations or reasons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {filteredRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No matching recommendations found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setOnlyBookmarked(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
