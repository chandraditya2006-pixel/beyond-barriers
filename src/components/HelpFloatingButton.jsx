// src/components/HelpFloatingButton.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  X, 
  GraduationCap, 
  Coins, 
  Accessibility, 
  Compass, 
  MessageSquare, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HelpFloatingButton() {
  const navigate = useNavigate();
  const { student, isHelpOpen, openHelp, closeHelp, openModal, addToast } = useApp();

  const supportOptions = [
    {
      id: 'academic',
      title: 'Academic Support',
      desc: 'Pair with peer tutors in DSA & Operating Systems',
      icon: GraduationCap,
      color: 'text-amber-600 bg-amber-50',
      action: () => {
        closeHelp();
        navigate('/recommendations');
        addToast("Showing academic support & peer tutoring resources", "info");
      }
    },
    {
      id: 'financial',
      title: 'Financial Support',
      desc: 'Emergency book grants & fee waiver applications',
      icon: Coins,
      color: 'text-emerald-600 bg-emerald-50',
      action: () => {
        closeHelp();
        navigate('/opportunities?category=Scholarships');
        addToast("Filtered to eligible financial scholarships & grants", "info");
      }
    },
    {
      id: 'accessibility',
      title: 'Accessibility & Inclusion Support',
      desc: 'Request digital accommodations, captions & formats',
      icon: Accessibility,
      color: 'text-teal-600 bg-teal-50',
      action: () => {
        closeHelp();
        navigate('/passport');
        addToast("Opening verified accessibility accommodations section", "info");
      }
    },
    {
      id: 'career',
      title: 'Career Guidance',
      desc: 'Software development roadmap & skill benchmarks',
      icon: Compass,
      color: 'text-sky-600 bg-sky-50',
      action: () => {
        closeHelp();
        navigate('/career');
      }
    },
    {
      id: 'advisor',
      title: 'Talk to Academic Advisor',
      desc: `Direct consultation with ${student.academicAdvisor}`,
      icon: MessageSquare,
      color: 'text-indigo-600 bg-indigo-50',
      action: () => {
        closeHelp();
        openModal({
          title: `Schedule Session: ${student.academicAdvisor}`,
          subtitle: "Dedicated Student Academic & Personal Counseling",
          children: (
            <div className="space-y-3 text-xs text-slate-600">
              <p>Your advisor can assist with attendance remediation, credit transfers, and confidential support petitions.</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800 block">Available Walk-In Hours:</span>
                <span>Monday & Thursday: 2:00 PM – 4:00 PM (Block B, Room 304)</span>
              </div>
            </div>
          ),
          confirmText: "Request Priority Callback",
          onConfirm: () => addToast(`Appointment request routed to ${student.academicAdvisor}!`, "success")
        });
      }
    }
  ];

  return (
    <>
      {/* Floating Need Help Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => (isHelpOpen ? closeHelp() : openHelp())}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 hover:text-teal-800 rounded-full border border-slate-200/90 shadow-lg shadow-slate-200/60 hover:shadow-xl transition-all cursor-pointer group"
          aria-label="Need Help Support Menu"
        >
          <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs group-hover:bg-teal-600 group-hover:text-white transition-colors">
            ?
          </div>
          <span className="text-xs font-semibold tracking-wide">
            Need Help?
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>

      {/* Lightweight Support Menu Popover */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-start p-4 sm:p-6 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200 ml-0 sm:ml-4 mb-16 sm:mb-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Inclusive Student Support Desk
                </h3>
                <p className="text-[11px] text-slate-500">
                  Select an area to receive immediate guidance or connect with staff.
                </p>
              </div>
              <button 
                onClick={closeHelp}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-3 space-y-1 max-h-[60vh] overflow-y-auto">
              {supportOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    onClick={opt.action}
                    className="p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${opt.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                        {opt.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {opt.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
              Assigned Advisor: <strong className="text-slate-700">{student.academicAdvisor}</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
