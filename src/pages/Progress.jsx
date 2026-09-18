// src/pages/Progress.jsx
import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CalendarClock, 
  BookOpen, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Target,
  FileText,
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine, 
  Legend 
} from 'recharts';
import { useApp } from '../context/AppContext';

export default function Progress() {
  const { student, addToast, openModal } = useApp();
  const [activeMetric, setActiveMetric] = useState('all');

  const pData = student.progressData;

  const handleDownloadReport = () => {
    addToast("Generating comprehensive progress analytics report...", "info");
    setTimeout(() => {
      addToast("Academic & Attendance Analytics Report downloaded!", "success");
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
            <span>Longitudinal Analytics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Progress & Performance Diagnostics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Track academic score trajectories, monthly attendance compliance against the 75% cutoff threshold, and granular subject performance.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadReport}
          className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Export Analytics Summary</span>
        </button>
      </div>

      {/* Top 4 Quick Status Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Score</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-extrabold text-amber-700">{student.academicScore}%</span>
            <span className="text-xs text-slate-500">Sem 5 Mid-Term</span>
          </div>
          <p className="text-[11px] text-amber-700 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Target: 70% for campus drive</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-rose-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-extrabold text-rose-600">{student.attendance}%</span>
            <span className="text-xs text-slate-500">Min: 75%</span>
          </div>
          <p className="text-[11px] text-rose-700 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>7% below mandatory threshold</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-teal-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Learning Progress</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-extrabold text-teal-700">{student.learningProgress}%</span>
            <span className="text-xs text-slate-500">Modules</span>
          </div>
          <p className="text-[11px] text-teal-700 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Moderate pace on track</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-indigo-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Credits Completed</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-2xl font-extrabold text-indigo-700">88 / 160</span>
            <span className="text-xs text-slate-500">Credits</span>
          </div>
          <p className="text-[11px] text-indigo-700 mt-2 flex items-center gap-1">
            <Target className="w-3 h-3" />
            <span>Degree completion at 55%</span>
          </p>
        </div>
      </div>

      {/* Row 1: Academic Progress Trend & Attendance Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Academic Progress Chart */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  Academic Progress by Semester
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Historical aggregate scores vs target placement cutoff (70%)
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pData.academicTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="academicScoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[30, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(val) => [`${val}%`, 'Score']}
                  />
                  <ReferenceLine y={70} stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Target: 70%', fill: '#b45309', fontSize: 10, position: 'insideTopRight' }} />
                  <ReferenceLine y={60} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Passing Cutoff (60%)', fill: '#64748b', fontSize: 10, position: 'insideBottomRight' }} />
                  <Area type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={3} fill="url(#academicScoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span>Projection: Projected to reach 65% with DSA remediation.</span>
          </div>
        </div>

        {/* Attendance Trend Chart */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-rose-600" />
                  Monthly Attendance & 75% Requirement
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Debarment warning triggered due to August/September drops
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pData.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(val) => [`${val}%`, 'Attendance']}
                  />
                  <ReferenceLine y={75} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Mandatory 75% Cutoff', fill: '#dc2626', fontSize: 10, position: 'insideTopLeft' }} />
                  <Bar dataKey="attendance" fill="#0284c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="text-rose-700 font-medium">16 consecutive classes required in October to clear cutoff.</span>
          </div>
        </div>

      </div>

      {/* Row 2: Subject Performance Comparison & Weekly Study Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Subject Performance Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  Semester 5 Subject Breakdown
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparing your mid-term score with batch average & target benchmark
                </p>
              </div>
            </div>

            <div className="h-68 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pData.subjectPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="score" name="Your Score" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="average" name="Batch Average" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Note: Data Structures (48%) is 17% below batch average. Remedial tutoring recommended.
          </div>
        </div>

        {/* Weekly Study Engagement Hours (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  Weekly Study Hours Logged
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Platform activity & self-study logs (Target: 20 hrs/week)
                </p>
              </div>
            </div>

            <div className="h-68 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pData.weeklyHours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[0, 6]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(val, name) => [`${val} hrs`, name === 'hours' ? 'Logged Hours' : 'Recommended']}
                  />
                  <Line type="monotone" dataKey="hours" name="Logged Hours" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="recommended" name="Recommended" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span>Total logged this week: <strong className="text-slate-900">17.5 hrs</strong></span>
            <span className="text-emerald-700 font-semibold">+2.5 hrs vs last week</span>
          </div>
        </div>

      </div>
    </div>
  );
}
