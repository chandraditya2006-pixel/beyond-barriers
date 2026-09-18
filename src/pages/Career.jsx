// src/pages/Career.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Briefcase, 
  Code2, 
  Layers, 
  Sparkles, 
  PlusCircle, 
  ChevronRight,
  AlertCircle,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Career() {
  const { student, careerNextSteps, toggleCareerStep, openModal, addToast } = useApp();
  const [selectedStep, setSelectedStep] = useState(student.careerPathway.pipeline[1]); // Default to Stage 2: Data Structures

  const cp = student.careerPathway;
  const completedStepsCount = careerNextSteps.filter(s => s.completed).length;

  const handleAddCustomStep = () => {
    openModal({
      title: "Add Custom Career Goal",
      subtitle: "Personal Roadmap Milestone",
      children: (
        <div className="space-y-3 text-xs text-slate-600">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Milestone Title:</label>
            <input 
              type="text" 
              placeholder="e.g., Build Portfolio REST API in Spring Boot" 
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs" 
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Target Completion:</label>
            <input 
              type="text" 
              placeholder="e.g., In 2 weeks" 
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs" 
            />
          </div>
        </div>
      ),
      confirmText: "Add Milestone",
      onConfirm: () => addToast("Custom milestone added to your career roadmap!", "success")
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5 text-teal-600" />
            <span>Target Career Pathway</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {cp.interest} Pathway
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Targeting <strong>{cp.targetRole}</strong>. This 5-stage progressive pathway connects your foundational coursework with campus drive requirements.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Placement Target</p>
            <p className="text-xs font-bold text-slate-900">Semester 6 Campus Drives</p>
          </div>
        </div>
      </div>

      {/* 2. Prominent Current Stage & Next Recommended Action Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Current Stage */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block mb-1">
              Current Stage
            </span>
            <div className="text-lg font-extrabold text-white flex items-center gap-2">
              <span>Stage 2: {cp.currentStageName}</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>
            <p className="text-xs text-teal-100/80 mt-1">
              Active Focus: Overcoming algorithmic barriers
            </p>
          </div>

          {/* Current Progress */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block mb-1">
              Current Stage Progress
            </span>
            <div className="text-lg font-extrabold text-amber-300">
              {cp.currentStageProgress}
            </div>
            <p className="text-xs text-teal-100/80 mt-1">
              Target: 80% competency before placement drives
            </p>
          </div>

          {/* Next Recommended Action */}
          <div className="p-4 rounded-2xl bg-teal-500/20 border border-teal-400/40 backdrop-blur-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200 block mb-1">
              Next Recommended Action
            </span>
            <p className="text-xs font-semibold text-white leading-relaxed">
              {cp.nextRecommendedAction}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Visually Prominent 5-Stage Software Development Pathway */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              5-Stage Software Development Pathway
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any stage to inspect milestone requirements and support resources.
            </p>
          </div>
          <span className="text-xs text-teal-800 bg-teal-50 px-3 py-1 rounded-full font-semibold border border-teal-200 w-fit">
            Stage 2 Active (DSA)
          </span>
        </div>

        {/* The 5-stage pipeline with prominent visual flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {cp.pipeline.map((step, idx) => {
            const isSelected = selectedStep.id === step.id;
            let statusBadge = "bg-slate-100 text-slate-700";
            let cardBg = "bg-slate-50/50 border-slate-200 hover:bg-white";

            if (step.status === 'Completed') {
              statusBadge = "bg-emerald-100 text-emerald-800";
              cardBg = "bg-emerald-50/30 border-emerald-300 hover:bg-emerald-50/50";
            } else if (step.status === 'In-Progress') {
              statusBadge = "bg-amber-100 text-amber-800 font-bold animate-pulse";
              cardBg = "bg-amber-50/40 border-amber-300 ring-2 ring-amber-300/60 shadow-xs";
            } else if (step.status === 'Upcoming') {
              statusBadge = "bg-sky-100 text-sky-800";
              cardBg = "bg-sky-50/30 border-sky-300";
            }

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${cardBg} ${
                  isSelected ? 'ring-2 ring-teal-600 shadow-sm' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-extrabold text-slate-400">0{step.stageNumber}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadge}`}>
                      {step.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">{step.score}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-teal-600 translate-x-0.5' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Inspector */}
        {selectedStep && (
          <div className="mt-6 p-5 rounded-2xl bg-teal-50/50 border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-200/70 px-2 py-0.5 rounded-md">
                Selected Stage: 0{selectedStep.stageNumber} — {selectedStep.title}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">
                Curriculum Focus & Support Blueprint
              </h4>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {selectedStep.desc} Addressing your current 48% diagnostic score in this area through peer tutoring and visual module practice directly unlocks internship placement rounds.
              </p>
            </div>
            <button
              onClick={() => {
                openModal({
                  title: `Interventions for Stage 0${selectedStep.stageNumber}: ${selectedStep.title}`,
                  subtitle: "Beyond Barriers Curriculum Sync",
                  children: (
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <strong className="text-slate-800 block">1. DSA Visual Problem Tracer</strong>
                        <span>Step-by-step code animation for tree traversals, dynamic programming, and binary search.</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <strong className="text-slate-800 block">2. Peer Mentoring with Arjun Mehta (Senior SDE)</strong>
                        <span>Weekly 45-minute technical review sessions.</span>
                      </div>
                    </div>
                  ),
                  confirmText: "Close"
                });
              }}
              className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
            >
              View Stage Interventions
            </button>
          </div>
        )}
      </div>

      {/* 4. Two Column Section: Required Skills & Next Steps Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (6 cols): Required Skills & Skill Progress Bars */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-teal-600" />
                  Required Skills & Readiness
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assessed from coursework, coding submissions, and labs
                </p>
              </div>
              <span className="text-xs text-slate-500">Benchmark: 80%</span>
            </div>

            {/* Skill bars */}
            <div className="space-y-4">
              {cp.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">Target: {skill.target}%</span>
                      <span className="font-bold text-slate-900">{skill.progress}%</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${skill.color}`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Primary Focus Area: <strong className="text-amber-700">Data Structures & Algorithms (48%)</strong></span>
          </div>
        </div>

        {/* Right Column (6 cols): Recommended Next Steps Checklist */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Recommended Next Steps
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Interactive checklist prioritizing high-impact actions
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddCustomStep}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5">
              {careerNextSteps.map((step) => {
                const priorityStyles = {
                  Critical: 'bg-rose-100 text-rose-800 border-rose-200',
                  High: 'bg-amber-100 text-amber-800 border-amber-200',
                  Medium: 'bg-slate-100 text-slate-700 border-slate-200',
                };
                const pill = priorityStyles[step.priority] || priorityStyles.Medium;

                return (
                  <div
                    key={step.id}
                    onClick={() => toggleCareerStep(step.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      step.completed
                        ? 'bg-slate-50/70 border-slate-200 opacity-65'
                        : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-2xs'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onChange={() => {}} // Handled by div click
                      className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-semibold ${step.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {step.title}
                        </p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${pill}`}>
                          {step.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span>Due: {step.deadline}</span>
                        <span>•</span>
                        <span>Est: {step.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Completed: <strong className="text-teal-700">{completedStepsCount} of {careerNextSteps.length}</strong> tasks
            </span>
            <span className="text-[11px] text-slate-400">Click any task to toggle status</span>
          </div>
        </div>

      </div>
    </div>
  );
}
