// src/pages/Opportunities.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Coins, 
  BookOpen, 
  Users, 
  Bookmark, 
  Sparkles, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import OpportunityCard from '../components/OpportunityCard';

const opportunityCategories = [
  { id: 'All', label: 'All Opportunities', icon: Compass },
  { id: 'Scholarships', label: 'Scholarships & Grants', icon: Coins },
  { id: 'Courses', label: 'Upskilling Courses', icon: BookOpen },
  { id: 'Mentors', label: 'Industry Mentors', icon: Users },
];

export default function Opportunities() {
  const [searchParams] = useSearchParams();
  const { student, bookmarkedOppIds, appliedOppIds } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [onlySaved, setOnlySaved] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Client-side search and filtering
  const filteredOpportunities = student.opportunities.filter(opp => {
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      opp.title.toLowerCase().includes(query) ||
      opp.provider.toLowerCase().includes(query) ||
      opp.description.toLowerCase().includes(query) ||
      opp.eligibility.toLowerCase().includes(query);
    const matchesSaved = !onlySaved || bookmarkedOppIds.has(opp.id);

    return matchesCategory && matchesSearch && matchesSaved;
  });

  return (
    <div className="space-y-8">
      {/* Opportunities Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>Inclusive Growth Marketplace</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Curated Opportunities Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Discover vetted scholarships, foundational courses, and alumni mentors pre-matched to your academic profile and career aspirations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-colors cursor-pointer ${
                onlySaved
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-white' : ''}`} />
              <span>Saved ({bookmarkedOppIds.size})</span>
            </button>

            <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{appliedOppIds.size} Active Applications</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {opportunityCategories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'All'
                ? student.opportunities.length
                : student.opportunities.filter(o => o.category === cat.id).length;

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

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search grants, mentors, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No matching opportunities found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setOnlySaved(false);
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
