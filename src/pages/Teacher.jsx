import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  RefreshCw, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Download, 
  Layers, 
  GraduationCap 
} from 'lucide-react';
import TeacherStatCard from '../components/TeacherStatCard';
import StudentTable from '../components/StudentTable';
import StudentDetails from '../components/StudentDetails';
import { 
  normalizeDataset, 
  calculateDashboardStats, 
  filterAndSearchStudents 
} from '../utils/teacherRiskAdapter';
import { DEMO_STUDENTS, DEMO_METADATA } from '../data/teacherDemoData';

/**
 * Teacher Page Component
 * Main coordinator for the Beyond Barriers Teacher Dashboard module.
 */
export default function Teacher() {
  // Master student state normalized via adapter
  const [students, setStudents] = useState(() => normalizeDataset(DEMO_STUDENTS));

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('All'); // 'All' | 'Stable' | 'Needs Attention' | 'Immediate Support'
  const [selectedSupportArea, setSelectedSupportArea] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Modal / Selected Student state
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Derive unique support areas from all students for filter dropdown
  const allSupportAreas = useMemo(() => {
    const areas = new Set();
    students.forEach(s => {
      if (Array.isArray(s.supportAreas)) {
        s.supportAreas.forEach(area => areas.add(area));
      }
    });
    return Array.from(areas);
  }, [students]);

  // Compute live dashboard metrics across current dataset
  const stats = useMemo(() => calculateDashboardStats(students), [students]);

  // Apply search, filters, and sorting
  const filteredStudents = useMemo(() => {
    return filterAndSearchStudents(students, {
      query: searchQuery,
      riskFilter: selectedRiskFilter,
      supportArea: selectedSupportArea,
      sortBy: sortField,
      sortDirection: sortOrder
    });
  }, [students, searchQuery, selectedRiskFilter, selectedSupportArea, sortField, sortOrder]);

  // Handle stat card click to quickly filter
  const handleStatCardClick = (targetRisk) => {
    if (selectedRiskFilter === targetRisk) {
      setSelectedRiskFilter('All');
    } else {
      setSelectedRiskFilter(targetRisk);
    }
  };

  // Sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Teacher Action: Mark intervention complete / pending
  const handleToggleIntervention = (studentId, interventionId) => {
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        if (student.id !== studentId) return student;

        let statusChangedTo = 'completed';
        const updatedInterventions = student.suggestedInterventions.map(inv => {
          if (inv.id === interventionId) {
            const nextStatus = inv.status === 'completed' ? 'pending' : 'completed';
            statusChangedTo = nextStatus;
            return { ...inv, status: nextStatus };
          }
          return inv;
        });

        showToast(
          statusChangedTo === 'completed'
            ? `Intervention marked complete for ${student.name}`
            : `Intervention set back to pending for ${student.name}`
        );

        const updatedStudent = { ...student, suggestedInterventions: updatedInterventions };
        // If modal is currently showing this student, update modal data too
        if (selectedStudent && selectedStudent.id === studentId) {
          setSelectedStudent(updatedStudent);
        }
        return updatedStudent;
      });
    });
  };

  // Teacher Action: Add Note
  const handleAddNote = (studentId, noteObj) => {
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        if (student.id !== studentId) return student;

        const updatedNotes = [noteObj, ...(student.notes || [])];
        const updatedStudent = { ...student, notes: updatedNotes };
        
        if (selectedStudent && selectedStudent.id === studentId) {
          setSelectedStudent(updatedStudent);
        }
        return updatedStudent;
      });
    });
    showToast(`Note added to ${selectedStudent?.name || 'student'}'s case log`);
  };

  // Teacher Action: Add custom intervention
  const handleAddCustomIntervention = (studentId, customInv) => {
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        if (student.id !== studentId) return student;

        const updatedInterventions = [customInv, ...(student.suggestedInterventions || [])];
        const updatedStudent = { ...student, suggestedInterventions: updatedInterventions };

        if (selectedStudent && selectedStudent.id === studentId) {
          setSelectedStudent(updatedStudent);
        }
        return updatedStudent;
      });
    });
    showToast(`New custom intervention scheduled`);
  };

  // Quick reset for empty states
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRiskFilter('All');
    setSelectedSupportArea('All');
  };

  // Export summary snapshot (demo feature)
  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Course,Year,AcademicScore,Attendance,LearningProgress,RiskStatus,SupportAreas"]
        .concat(
          filteredStudents.map(s => `"${s.id}","${s.name}","${s.course}","${s.year}",${s.academicScore},${s.attendance},${s.learningProgress},"${s.riskStatus}","${s.supportAreas.join('; ')}"`)
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Beyond_Barriers_Student_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Student monitoring report downloaded as CSV");
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-bounce-subtle">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Hackathon & Institutional Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-indigo-100 text-xs py-2 px-4 sm:px-8 border-b border-indigo-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-2xs uppercase px-2 py-0.5 rounded font-mono font-bold tracking-wider">
              Beyond Barriers
            </span>
            <span className="hidden sm:inline text-indigo-300">•</span>
            <span className="text-white font-semibold">Personalized & Inclusive Education Support System</span>
          </div>
          <div className="flex items-center gap-3 text-indigo-300 text-2xs sm:text-xs">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-mono">
              Member 4 Module: Teacher Side
            </span>
            <span className="hidden md:inline">DEMO DATA ACTIVE (Adapter Ready)</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 1. Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
                <GraduationCap size={22} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Teacher Dashboard
              </h1>
            </div>
            <p className="text-sm sm:text-base text-slate-500 font-normal">
              Monitor student progress and provide timely support.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setStudents(normalizeDataset(DEMO_STUDENTS));
                handleResetFilters();
                showToast("Demo data reloaded and synchronized");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Reset dataset"
            >
              <RefreshCw size={14} />
              <span>Sync Data</span>
            </button>
          </div>
        </header>

        {/* 2. Summary Cards Grid (5 Cards Required) */}
        <section aria-labelledby="summary-metrics-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="summary-metrics-heading" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers size={14} />
              <span>Student Population Overview</span>
            </h2>
            <span className="text-2xs text-slate-400">Click a card to filter students</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {/* 1. Total Students */}
            <TeacherStatCard
              title="Total Students"
              value={stats.totalStudents}
              subtitle="All monitored cohorts"
              variant="total"
              isActive={selectedRiskFilter === 'All'}
              onClick={() => setSelectedRiskFilter('All')}
            />

            {/* 2. Stable Students */}
            <TeacherStatCard
              title="Stable Students"
              value={stats.stableCount}
              subtitle="Meeting progress goals"
              variant="stable"
              isActive={selectedRiskFilter === 'Stable'}
              onClick={() => handleStatCardClick('Stable')}
            />

            {/* 3. Needs Attention */}
            <TeacherStatCard
              title="Needs Attention"
              value={stats.needsAttentionCount}
              subtitle="Early support indicators"
              variant="attention"
              isActive={selectedRiskFilter === 'Needs Attention'}
              onClick={() => handleStatCardClick('Needs Attention')}
            />

            {/* 4. Immediate Support */}
            <TeacherStatCard
              title="Immediate Support"
              value={stats.immediateSupportCount}
              subtitle="Priority interventions"
              variant="immediate"
              isActive={selectedRiskFilter === 'Immediate Support'}
              onClick={() => handleStatCardClick('Immediate Support')}
            />

            {/* 5. Active Interventions */}
            <TeacherStatCard
              title="Active Interventions"
              value={stats.activeInterventionsCount}
              subtitle={`${stats.completedInterventionsCount} completed to date`}
              variant="interventions"
              isActive={false}
              onClick={() => {
                // Focus on students who have active interventions
                setSelectedRiskFilter('All');
                showToast(`Viewing ${stats.activeInterventionsCount} pending interventions`);
              }}
            />
          </div>
        </section>

        {/* 3. Search and Filtering Controls */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-soft space-y-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students by name, course, or skills..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Support Area Dropdown Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <SlidersHorizontal size={14} />
                <span>Support Area:</span>
              </div>
              <select
                value={selectedSupportArea}
                onChange={(e) => setSelectedSupportArea(e.target.value)}
                className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-medium"
              >
                <option value="All">All Support Areas</option>
                {allSupportAreas.map((area, idx) => (
                  <option key={idx} value={area}>{area}</option>
                ))}
              </select>

              {(searchQuery || selectedRiskFilter !== 'All' || selectedSupportArea !== 'All') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 transition-colors cursor-pointer"
                >
                  Reset all
                </button>
              )}
            </div>
          </div>

          {/* 6. Filter Tabs by Risk Status (All, Stable, Needs Attention, Immediate Support) */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 flex-wrap gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-2xs sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
                Risk Filter:
              </span>

              {/* All */}
              <button
                type="button"
                onClick={() => setSelectedRiskFilter('All')}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedRiskFilter === 'All'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>All</span>
                <span className={`text-2xs px-1.5 py-0.2 rounded-full font-mono ${
                  selectedRiskFilter === 'All' ? 'bg-slate-700 text-white' : 'bg-white text-slate-600'
                }`}>
                  {stats.totalStudents}
                </span>
              </button>

              {/* Stable */}
              <button
                type="button"
                onClick={() => setSelectedRiskFilter('Stable')}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedRiskFilter === 'Stable'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Stable</span>
                <span className={`text-2xs px-1.5 py-0.2 rounded-full font-mono ${
                  selectedRiskFilter === 'Stable' ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {stats.stableCount}
                </span>
              </button>

              {/* Needs Attention */}
              <button
                type="button"
                onClick={() => setSelectedRiskFilter('Needs Attention')}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedRiskFilter === 'Needs Attention'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Needs Attention</span>
                <span className={`text-2xs px-1.5 py-0.2 rounded-full font-mono ${
                  selectedRiskFilter === 'Needs Attention' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'
                }`}>
                  {stats.needsAttentionCount}
                </span>
              </button>

              {/* Immediate Support */}
              <button
                type="button"
                onClick={() => setSelectedRiskFilter('Immediate Support')}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedRiskFilter === 'Immediate Support'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                <span>Immediate Support</span>
                <span className={`text-2xs px-1.5 py-0.2 rounded-full font-mono ${
                  selectedRiskFilter === 'Immediate Support' ? 'bg-rose-800 text-white' : 'bg-rose-100 text-rose-800'
                }`}>
                  {stats.immediateSupportCount}
                </span>
              </button>
            </div>

            {/* Filter Result Counter */}
            <div className="text-2xs sm:text-xs text-slate-500 font-medium">
              Showing {filteredStudents.length} of {stats.totalStudents} students
            </div>
          </div>
        </section>

        {/* 4. Student Monitoring Table Section */}
        <section aria-labelledby="student-table-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="student-table-heading" className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Student Monitoring Records</span>
              <span className="text-xs font-normal text-slate-400">
                (Click 'View' for detailed risk indicators &amp; suggested interventions)
              </span>
            </h2>
          </div>

          <StudentTable
            students={filteredStudents}
            onViewStudent={(student) => setSelectedStudent(student)}
            onQuickNote={(student) => setSelectedStudent(student)}
            onResetFilters={handleResetFilters}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </section>

        {/* Integration Callout Footer (For Hackathon Reviewers & Teammates) */}
        <footer className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-100 border border-indigo-100 text-slate-700 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-indigo-900 text-sm">
            <Sparkles size={16} className="text-indigo-600" />
            <span>Member 4 Module: Teacher-Side Monitoring &amp; Intervention System</span>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            This module is architected with a decoupled adapter layer (<code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono">src/utils/teacherRiskAdapter.js</code>). 
            When Member 1, 2, and 3 finalize <code className="font-mono">studentData.js</code> and <code className="font-mono">recommendationEngine.js</code>, their data feeds directly into <code className="font-mono">normalizeDataset()</code> without requiring UI refactoring.
          </p>
          <div className="text-2xs text-slate-400 pt-1">
            Beyond Barriers • Educational Support Indicators Only • Autumn Semester 2026
          </div>
        </footer>

      </div>

      {/* 5. Student Details Modal View */}
      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onToggleIntervention={handleToggleIntervention}
          onAddNote={handleAddNote}
          onAddIntervention={handleAddCustomIntervention}
        />
      )}

    </div>
  );
}
