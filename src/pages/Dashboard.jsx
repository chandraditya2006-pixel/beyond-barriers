// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  CalendarClock, 
  BookOpenCheck, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  FileDown, 
  UserPlus, 
  Coins, 
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  UserCheck,
  Cpu,
  Layers,
  Zap,
  Accessibility,
  Compass,
  ArrowDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine,
  BarChart,
  Bar
} from 'recharts';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import BarrierCard from '../components/BarrierCard';
import RecommendationCard from '../components/RecommendationCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { student, resolvedBarriers, addToast, openModal } = useApp();
  const [chartView, setChartView] = useState('academic'); // 'academic' | 'attendance'

  const handleQuickAction = (actionKey) => {
    switch (actionKey) {
      case 'passport_download':
        addToast("Support Passport generated & downloaded (PDF)", "success");
        break;
      case 'dsa_tutor':
        openModal({
          title: "Request DSA Peer Tutor",
          subtitle: "Academic Support Intervention",
          children: (
            <div className="space-y-3 text-xs text-slate-600">
              <p>Your current mid-term score in Data Structures is 48%. We will pair you with a top-performing 4th-year peer tutor.</p>
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200">
                <span className="font-semibold text-teal-900 block">Matched Peer:</span>
                <span>Rohan Varma (Sem 7 CS, 9.4 GPA, Specializes in Trees & Dynamic Programming)</span>
              </div>
              <p className="italic text-slate-500">Free campus peer tutoring funded by Student Success Initiative.</p>
            </div>
          ),
          confirmText: "Confirm Tutor Pairing",
          onConfirm: () => addToast("Peer tutor request submitted! Rohan will contact you via campus email.", "success")
        });
        break;
      case 'emergency_aid':
        navigate('/opportunities?category=Scholarships');
        break;
      case 'advisor_meeting':
        openModal({
          title: "Schedule Academic Advisor Sync",
          subtitle: `Advisor: ${student.academicAdvisor}`,
          children: (
            <div className="space-y-3 text-xs text-slate-600">
              <p>Book a dedicated 20-minute counseling slot regarding attendance leaves and remedial credit plan.</p>
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 block">Select Slot:</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs">
                  <option>Tomorrow, 11:30 AM - 11:50 AM (Department Office)</option>
                  <option>Wednesday, 3:00 PM - 3:20 PM (Virtual Google Meet)</option>
                  <option>Friday, 2:00 PM - 2:20 PM (Department Office)</option>
                </select>
              </div>
            </div>
          ),
          confirmText: "Book Meeting",
          onConfirm: () => addToast(`Appointment requested with ${student.academicAdvisor}!`, "success")
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Welcome & Status Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-sky-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Subtle background ambient decorations */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-32 -top-12 w-48 h-48 rounded-full bg-teal-400/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 border border-teal-400/40 text-teal-100 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Inclusive Education Support Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {student.name}
            </h2>
            <p className="text-sm text-teal-100/90 mt-1 max-w-xl leading-relaxed">
              {student.course} • Year {student.year} (Semester {student.semester}) • ID: {student.rollNumber}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/passport')}
              className="px-4 py-2.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-semibold text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <span>View Support Passport</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/recommendations')}
              className="px-4 py-2.5 rounded-xl bg-teal-600/60 hover:bg-teal-600/80 border border-teal-400/30 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Explore Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Consistent Support status banner inside hero */}
        <div className="mt-6 pt-5 border-t border-teal-600/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold text-amber-200">
              Support Status: 3 Detected Support Areas (2 High Priority, 1 Monitoring/Recommended)
            </span>
            <span className="text-teal-200 hidden sm:inline">•</span>
            <span className="text-teal-100/80">
              Active interventions scheduled for Attendance, DSA Fundamentals, and Financial Aid.
            </span>
          </div>

          <span className="text-teal-200 font-medium">
            Next Milestone: End-term prep in 28 days
          </span>
        </div>
      </div>

      {/* 2. Core Metrics / Stat Cards - Consistent Counts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            Key Academic & Engagement Indicators
          </h3>
          <span className="text-xs text-slate-500">
            Updated: Semester 5 Mid-Term
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="Academic Score"
            value={`${student.academicScore}%`}
            subvalue="Target: 70%"
            icon={GraduationCap}
            status="warning"
            badgeText="Needs Support"
            trend="Needs +18% to reach goal"
            trendDirection="down"
            onClick={() => navigate('/progress')}
          />
          <StatCard
            title="Attendance"
            value={`${student.attendance}%`}
            subvalue="Min Req: 75%"
            icon={CalendarClock}
            status="danger"
            badgeText="Below Min Threshold"
            trend="7% below exam eligibility"
            trendDirection="down"
            onClick={() => navigate('/passport')}
          />
          <StatCard
            title="Learning Progress"
            value={`${student.learningProgress}%`}
            subvalue="Moderate Pace"
            icon={BookOpenCheck}
            status="teal"
            badgeText="Steady Pace"
            trend="+12% completed this month"
            trendDirection="up"
            onClick={() => navigate('/career')}
          />
          <StatCard
            title="Detected Support Areas"
            value="3"
            subvalue="2 High, 1 Monitoring"
            icon={ShieldAlert}
            status="warning"
            badgeText="3 Active Needs"
            trend="2 High Priority • 1 Monitoring"
            trendDirection="up"
            onClick={() => navigate('/recommendations')}
          />
        </div>
      </div>

      {/* 3. Personalization Explanation: Student Profile → Support Factors → Personalized Support Plan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Transparent Support Architecture</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              How your support plan is personalized
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Beyond Barriers analyzes 6 multidimensional student factors to produce individualized, non-judgmental interventions.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
            Intake Model: <span className="text-teal-800 font-bold">Holistic Equity Framework</span>
          </div>
        </div>

        {/* Visual Communication Pipeline: Student Profile → Support Factors → Personalized Support Plan */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          
          {/* Box 1: Student Profile */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 01</span>
                <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
                  <UserCheck className="w-4 h-4" />
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                1. Student Profile
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Comprehensive data ingested from campus records, course registration, and student intake.
              </p>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60">
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-semibold text-slate-800">{student.name}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Program:</span>
                <span className="font-semibold text-slate-800">B.Tech CS • Yr 3</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Language:</span>
                <span className="font-semibold text-slate-800">English (Bilingual)</span>
              </li>
            </ul>
          </div>

          {/* Box 2: 6 Support Factors Evaluated */}
          <div className="p-5 rounded-2xl bg-teal-50/40 border border-teal-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Step 02</span>
                <span className="p-1.5 rounded-lg bg-teal-600 text-white">
                  <Cpu className="w-4 h-4" />
                </span>
              </div>
              <h4 className="text-sm font-bold text-teal-950">
                2. Evaluated Support Factors
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Platform continuously measures 6 holistic indicators against benchmarks:
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white p-2 rounded-lg border border-teal-100/90 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Academic</span>
                <span className="text-amber-700 font-bold">{student.academicScore}% (DSA 48%)</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-teal-100/90 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Attendance</span>
                <span className="text-rose-600 font-bold">{student.attendance}% (Min: 75%)</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-teal-100/90 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Learning Pace</span>
                <span className="text-teal-700 font-bold">{student.learningPace}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-teal-100/90 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Accessibility</span>
                <span className="text-slate-700 font-medium">Digital Captions</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-teal-100/90 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Financial Need</span>
                <span className="text-emerald-700 font-bold">Tier 1 (High)</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-teal-100/90 shadow-2xs">
                <span className="font-semibold text-slate-800 block">Career Goal</span>
                <span className="text-sky-700 font-bold">Software Dev</span>
              </div>
            </div>
          </div>

          {/* Box 3: Personalized Support Plan Output */}
          <div className="p-5 rounded-2xl bg-sky-50/40 border border-sky-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Step 03</span>
                <span className="p-1.5 rounded-lg bg-sky-600 text-white">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                3. Personalized Support Plan
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Generates transparent, actionable interventions with explicit rationales.
              </p>
            </div>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-sky-100">
              <li className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tailored DSA visual courseware</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Attendance medical leave bridge</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>₹50,000 Pragati tech grant match</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1-on-1 alumni mentor (SDE Microsoft)</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 4. 3 Detected Support Areas (Barriers) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              3 Detected Support Areas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              2 High Priority items requiring prompt action and 1 Monitoring / Recommended item.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
              2 High Priority
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              1 Monitoring
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {student.barriers.map((barrier) => (
            <BarrierCard key={barrier.id} barrier={barrier} />
          ))}
        </div>
      </div>

      {/* 5. Chart & Recommendations Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Academic Progress & Attendance Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Performance & Attendance Trajectory
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visual monitoring against university and placement benchmarks
                </p>
              </div>

              {/* Chart Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setChartView('academic')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartView === 'academic'
                      ? 'bg-white text-teal-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Academic Score
                </button>
                <button
                  type="button"
                  onClick={() => setChartView('attendance')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartView === 'attendance'
                      ? 'bg-white text-teal-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Attendance (%)
                </button>
              </div>
            </div>

            {/* Chart Render */}
            <div className="h-64 sm:h-72 w-full mt-5">
              {chartView === 'academic' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={student.progressData.academicTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis domain={[30, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                      formatter={(val, name) => [`${val}%`, name === 'score' ? 'Student Score' : 'Target Threshold']}
                    />
                    <ReferenceLine y={70} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Target 70%', fill: '#d97706', fontSize: 10, position: 'insideTopRight' }} />
                    <ReferenceLine y={60} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Passing Benchmark 60%', fill: '#64748b', fontSize: 10, position: 'insideBottomRight' }} />
                    <Area type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={student.progressData.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                      formatter={(val) => [`${val}%`, 'Monthly Attendance']}
                    />
                    <ReferenceLine y={75} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Mandatory 75% Cutoff', fill: '#dc2626', fontSize: 10, position: 'insideTopLeft' }} />
                    <Bar dataKey="attendance" fill="#0284c7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Current standing: <strong className="text-slate-800">52% Aggregate</strong> (Need +18% for campus placement threshold)
            </span>
            <button
              onClick={() => navigate('/progress')}
              className="text-teal-700 font-semibold hover:text-teal-800 flex items-center gap-1"
            >
              Full Analytics Breakdown →
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Personalized Recommendation Preview */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Tailored Recommendation Preview
            </h4>
            <button
              onClick={() => navigate('/recommendations')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              View All ({student.recommendations.length}) →
            </button>
          </div>

          {/* Show top 2 recommendations */}
          <div className="space-y-4">
            {student.recommendations.slice(0, 2).map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      </div>

      {/* 6. Quick Actions Dock */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 mb-4">
          Immediate Support Actions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <button
            type="button"
            onClick={() => handleQuickAction('passport_download')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-200 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FileDown className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-teal-900">
                  Export Passport
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Official PDF summary
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickAction('dsa_tutor')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-200 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <UserPlus className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">
                  Request DSA Tutor
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  1-on-1 peer assistance
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickAction('emergency_aid')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-200 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                  Apply for Aid
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Grants & fee waivers
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickAction('advisor_meeting')}
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-200 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
                  Advisor Sync
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Schedule appointment
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
