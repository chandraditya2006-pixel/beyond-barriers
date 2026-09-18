// src/pages/SupportPassport.jsx
import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  CalendarClock, 
  Zap, 
  Languages, 
  Accessibility, 
  Coins, 
  Compass, 
  FileDown, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  Edit3,
  Building,
  Mail,
  Phone,
  BookOpen,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SupportPassport() {
  const { student, addToast, openModal } = useApp();

  const p = student.passportSections;

  const handleExportPDF = () => {
    addToast("Generating Beyond Barriers Support Passport (PDF)...", "info");
    setTimeout(() => {
      addToast("Support Passport successfully downloaded as PDF!", "success");
    }, 1200);
  };

  const handleSharePassport = () => {
    openModal({
      title: "Share Verified Support Passport",
      subtitle: "Secure sharing with faculty and student support coordinators",
      children: (
        <div className="space-y-3 text-xs text-slate-600">
          <p>You can grant temporary view access to your academic counselor, disability coordinator, or financial aid officer.</p>
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Recipient:</label>
            <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs">
              <option>{student.academicAdvisor} (Academic Advisor)</option>
              <option>Dean of Student Welfare (Financial Grants Office)</option>
              <option>Campus Accessibility & Inclusion Coordinator</option>
            </select>
          </div>
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-900">
            <span className="font-bold block">Included in verified passport:</span>
            <span>Academic score (52%), Attendance warning (68%), High-need financial certification, and verified accessibility accommodations.</span>
          </div>
        </div>
      ),
      confirmText: "Share Passport",
      onConfirm: () => addToast(`Support Passport sent to ${student.academicAdvisor}`, "success")
    });
  };

  const handleEditProfile = (sectionName) => {
    openModal({
      title: `Update ${sectionName}`,
      subtitle: "Self-Reported Accommodation & Preference Update",
      children: (
        <div className="space-y-3 text-xs text-slate-600">
          <p>Changes will be reflected across your recommendation engine and reviewed by your advisor.</p>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Additional details or adjustments:</label>
            <textarea 
              rows={3} 
              defaultValue="Requesting additional visual laboratory sessions for algorithmic problem solving."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs" 
            />
          </div>
        </div>
      ),
      confirmText: "Save Preferences",
      onConfirm: () => addToast(`${sectionName} preferences updated successfully!`, "success")
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Prominent Student Profile Summary Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Subtle accent border at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-600 to-sky-700 text-white font-bold text-3xl flex items-center justify-center shadow-md ring-4 ring-teal-50 shrink-0">
              {student.avatar}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {student.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  Verified Support Passport
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mt-1">
                {student.course} • Year {student.year} (Semester {student.semester}) • Roll No: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-bold text-slate-800">{student.rollNumber}</code>
              </p>
              <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span>{student.department}</span>
                <span>•</span>
                <span>Academic Advisor: <strong className="text-teal-700 font-semibold">{student.academicAdvisor}</strong></span>
              </p>
            </div>
          </div>

          {/* Export and Share Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleSharePassport}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share with Advisor</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <FileDown className="w-4 h-4" />
              <span>Export Official PDF</span>
            </button>
          </div>
        </div>

        {/* Holistic Profile Snapshot Strip */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Academic Score</span>
            <span className="text-sm font-bold text-amber-700">{student.academicScore}%</span>
            <span className="text-[10px] text-slate-500 block">Needs Attention</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Attendance</span>
            <span className="text-sm font-bold text-rose-600">{student.attendance}%</span>
            <span className="text-[10px] text-slate-500 block">Min 75% Cutoff</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Financial Need</span>
            <span className="text-sm font-bold text-emerald-700">Tier 1</span>
            <span className="text-[10px] text-slate-500 block">High Aid Priority</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Learning Pace</span>
            <span className="text-sm font-bold text-teal-700">{student.learningPace}</span>
            <span className="text-[10px] text-slate-500 block">Visual & Concept</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Career Target</span>
            <span className="text-sm font-bold text-sky-700 truncate block">Software Dev</span>
            <span className="text-[10px] text-slate-500 block">Placement Sem 6</span>
          </div>

          <div className="p-2.5 bg-teal-50/60 rounded-xl border border-teal-200/80">
            <span className="text-[10px] text-teal-800 font-bold uppercase block">Inclusion Status</span>
            <span className="text-sm font-bold text-teal-900">Active</span>
            <span className="text-[10px] text-teal-700 block">Digital Captions</span>
          </div>
        </div>
      </div>

      {/* 2. Highlighted Section: Accessibility & Inclusion Support */}
      <div className="bg-gradient-to-r from-teal-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold mb-2">
              <Accessibility className="w-3.5 h-3.5 text-teal-300" />
              <span>Universal Design & Accessibility Priority</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Accessibility & Inclusion Support Profile
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/80 mt-1 leading-relaxed">
              Every course, mentoring session, and examination environment is calibrated to support your specific digital and learning accommodation requirements.
            </p>

            {/* Active Accommodation Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.accessibility.featuresEnabled.map((item, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-medium backdrop-blur-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/10 border border-white/15 p-4 rounded-2xl backdrop-blur-sm text-xs text-teal-100 shrink-0 max-w-xs">
            <span className="font-semibold block text-white mb-1">Campus Coordinator:</span>
            <p>{p.accessibility.inclusionCoordinator}</p>
            <button
              onClick={() => handleEditProfile("Accessibility Accommodations")}
              className="mt-3 w-full py-2 bg-white text-teal-900 font-semibold rounded-xl text-xs hover:bg-teal-50 transition-colors cursor-pointer shadow-xs"
            >
              Request Accommodation Change
            </button>
          </div>
        </div>
      </div>

      {/* 3. Detailed Profile Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Section 1: Personal Information */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <User className="w-4 h-4 text-teal-600" />
                <span>Personal Information</span>
              </div>
              <button 
                onClick={() => handleEditProfile("Personal Info")}
                className="text-slate-400 hover:text-teal-700 p-1 cursor-pointer"
                title="Edit details"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Full Legal Name:</span>
                <span className="font-semibold text-slate-800">{p.personal.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Student ID:</span>
                <span className="font-semibold text-slate-800">{p.personal.studentId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-semibold text-slate-800">{p.personal.dob}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Residential Status:</span>
                <span className="font-semibold text-slate-800">{p.personal.residentialStatus}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-0.5">Emergency Contact:</span>
                <span className="font-medium text-slate-700 text-[11px]">{p.personal.emergencyContact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Course & Year */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span>Course & Academic Year</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Enrolled
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Degree Program:</span>
                <span className="font-semibold text-slate-800">{p.academic.degree}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Major:</span>
                <span className="font-semibold text-slate-800">{p.academic.major}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Current Semester:</span>
                <span className="font-semibold text-slate-800">{p.academic.currentSemester}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Earned Credits:</span>
                <span className="font-semibold text-slate-800">{p.academic.creditsCompleted}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Assigned Advisor:</span>
                <span className="font-semibold text-teal-700">{student.academicAdvisor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Academic Performance */}
        <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Academic Performance</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Action Required
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Current Aggregate:</span>
                <span className="font-extrabold text-amber-700 text-sm">{student.academicScore}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Cumulative GPA:</span>
                <span className="font-semibold text-slate-800">{p.academic.cgpa}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Target Benchmark:</span>
                <span className="font-semibold text-emerald-700">70% (Placements cutoff)</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-0.5">Critical Subject Focus:</span>
                <span className="text-rose-700 font-semibold text-[11px] bg-rose-50 px-2 py-1 rounded-md block">
                  Data Structures (48%) & Operating Systems (54%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Attendance Status */}
        <div className="bg-white rounded-2xl p-5 border border-rose-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <CalendarClock className="w-4 h-4 text-rose-600" />
                <span>Attendance Status</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                Debarment Risk
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Overall Attendance:</span>
                <span className="font-extrabold text-rose-600 text-sm">{student.attendance}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Minimum Exam Cutoff:</span>
                <span className="font-semibold text-slate-800">75% Mandatory</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Recorded Sessions:</span>
                <span className="font-semibold text-slate-800">{p.attendance.classesAttended}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-0.5">Required Recovery:</span>
                <span className="text-slate-700 font-medium text-[11px] bg-amber-50 p-2 rounded-md block border border-amber-200/60">
                  {p.attendance.classesNeededFor75}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Learning Pace */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Zap className="w-4 h-4 text-teal-600" />
                <span>Learning Pace & Style</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {student.learningPace}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="py-1 border-b border-slate-50">
                <span className="text-slate-500 block mb-0.5">Pace Profile:</span>
                <span className="font-semibold text-slate-800">{p.learningStyle.pace}</span>
              </div>
              <div className="py-1 border-b border-slate-50">
                <span className="text-slate-500 block mb-0.5">Preferred Format:</span>
                <span className="font-semibold text-slate-800">{p.learningStyle.preferredFormat}</span>
              </div>
              <div className="py-1 border-b border-slate-50">
                <span className="text-slate-500 block mb-0.5">Study Arrangement:</span>
                <span className="font-semibold text-slate-800">{p.learningStyle.groupPreference}</span>
              </div>
              <div className="py-1 border-b border-slate-50">
                <span className="text-slate-500 block mb-0.5">Evaluation Strengths:</span>
                <span className="font-medium text-slate-700 text-[11px]">{p.learningStyle.evaluationStrengths}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Preferred Language */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Languages className="w-4 h-4 text-teal-600" />
                <span>Language & Communication</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Bilingual Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Primary Medium:</span>
                <span className="font-semibold text-slate-800">{p.language.primary}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Secondary Language:</span>
                <span className="font-semibold text-slate-800">{p.language.secondary}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-1">Assistance Accommodations:</span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-[11px] leading-relaxed">
                  {p.language.supportNeeded}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Financial Circumstances */}
        <div className="bg-white rounded-2xl p-5 border border-teal-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Coins className="w-4 h-4 text-teal-600" />
                <span>Financial Circumstances</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Tier 1 Aid
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Need Bracket:</span>
                <span className="font-bold text-teal-800">{student.financialNeed}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Income Verification:</span>
                <span className="font-semibold text-slate-800">{p.financial.annualFamilyIncome}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-1">Eligible Aid Schemes:</span>
                <ul className="space-y-1 text-[11px] text-slate-700">
                  {p.financial.eligibleAidTypes.map((aid, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{aid}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Career Interests */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Career Interests</span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                Target Role
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Primary Goal:</span>
                <span className="font-bold text-sky-800">{student.careerInterest}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Secondary Domain:</span>
                <span className="font-semibold text-slate-800">{p.career.secondaryInterest}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Target Graduation:</span>
                <span className="font-semibold text-slate-800">{p.career.targetGraduation}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-0.5">Readiness Stage:</span>
                <span className="text-slate-700 font-medium text-[11px] bg-slate-50 p-2 rounded-md block border border-slate-200/70">
                  {p.career.readinessLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
