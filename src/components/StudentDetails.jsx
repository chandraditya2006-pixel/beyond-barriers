import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  ListTodo, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  User, 
  Plus, 
  ExternalLink 
} from 'lucide-react';
import RiskBadge from './RiskBadge';
import InterventionCard from './InterventionCard';

/**
 * StudentDetails Modal Component
 * Displays comprehensive student record, educational risk explanation, interventions, and teacher notes.
 * 
 * @param {Object} props
 * @param {Object} props.student Student object (normalized via teacherRiskAdapter)
 * @param {Function} props.onClose Close modal callback
 * @param {Function} props.onToggleIntervention Callback to toggle intervention status
 * @param {Function} props.onAddNote Callback to add a teacher note (text, author)
 * @param {Function} [props.onAddIntervention] Callback to add a custom intervention
 */
export default function StudentDetails({
  student,
  onClose,
  onToggleIntervention,
  onAddNote,
  onAddIntervention
}) {
  const [newNoteText, setNewNoteText] = useState('');
  const [teacherName, setTeacherName] = useState('Faculty Advisor');
  const [showAddInterventionModal, setShowAddInterventionModal] = useState(false);
  const [customInvTitle, setCustomInvTitle] = useState('');
  const [customInvType, setCustomInvType] = useState('Academic');
  const [customInvPriority, setCustomInvPriority] = useState('Medium');
  const [customInvDesc, setCustomInvDesc] = useState('');

  if (!student) return null;

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    if (onAddNote) {
      onAddNote(student.id, {
        id: `NOTE-${Date.now()}`,
        date: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true 
        }),
        author: teacherName || 'Teacher',
        text: newNoteText.trim()
      });
    }
    setNewNoteText('');
  };

  const handleCreateCustomIntervention = (e) => {
    e.preventDefault();
    if (!customInvTitle.trim()) return;

    if (onAddIntervention) {
      onAddIntervention(student.id, {
        id: `INT-${student.id}-${Date.now()}`,
        title: customInvTitle.trim(),
        description: customInvDesc.trim() || 'Custom teacher intervention scheduled for student follow-up.',
        type: customInvType,
        priority: customInvPriority,
        status: 'pending',
        dueDate: 'Next Week'
      });
    }

    setCustomInvTitle('');
    setCustomInvDesc('');
    setShowAddInterventionModal(false);
  };

  const isAttendanceAtRisk = student.attendance < 75;
  const isScoreAtRisk = student.academicScore < 60;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-details-title"
      >
        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 px-6 py-5 text-white flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-inner shrink-0">
              {student.avatar || student.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="student-details-title" className="text-xl sm:text-2xl font-bold text-white">
                  {student.name}
                </h2>
                <RiskBadge status={student.riskStatus} size="sm" pulse />
              </div>
              <p className="text-indigo-100 text-xs sm:text-sm mt-0.5 flex flex-wrap items-center gap-2">
                <span>{student.course}</span>
                <span>•</span>
                <span>{student.year} ({student.semester})</span>
                <span>•</span>
                <span className="text-indigo-200">{student.id}</span>
              </p>
              <p className="text-indigo-200/80 text-xs mt-0.5">
                {student.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Academic Score */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Academic Score</span>
                <TrendingUp size={14} className={isScoreAtRisk ? 'text-amber-500' : 'text-emerald-500'} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{student.academicScore}%</span>
                {isScoreAtRisk && (
                  <span className="text-2xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium">Needs Attention</span>
                )}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    student.academicScore < 60 ? 'bg-amber-500' : student.academicScore < 75 ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(student.academicScore, 100)}%` }}
                />
              </div>
            </div>

            {/* Attendance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Attendance Rate</span>
                <Calendar size={14} className={isAttendanceAtRisk ? 'text-rose-500' : 'text-emerald-500'} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{student.attendance}%</span>
                {isAttendanceAtRisk ? (
                  <span className="text-2xs text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-medium">&lt; 75% Threshold</span>
                ) : (
                  <span className="text-2xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">Standard</span>
                )}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    student.attendance < 75 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(student.attendance, 100)}%` }}
                />
              </div>
            </div>

            {/* Learning Progress */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Learning Progress</span>
                <BookOpen size={14} className="text-indigo-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{student.learningProgress}%</span>
                <span className="text-2xs text-slate-500">syllabus covered</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-indigo-600" 
                  style={{ width: `${Math.min(student.learningProgress, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Career Goal & Skills */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 via-indigo-50/40 to-slate-50 border border-indigo-100/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                  <Target size={18} />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-500 block">Aspirational Career Goal</span>
                  <span className="text-sm font-semibold text-slate-800">{student.careerGoal}</span>
                </div>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-500 mr-1">Skills:</span>
                {student.skills && student.skills.length > 0 ? (
                  student.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No skills recorded yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Detected Support Areas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <span>Detected Support Areas</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.supportAreas && student.supportAreas.length > 0 ? (
                student.supportAreas.map((area, idx) => (
                  <span 
                    key={idx}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-indigo-50/80 text-indigo-700 border border-indigo-200 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {area}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">No specialized support areas flagged</span>
              )}
            </div>
          </div>

          {/* RISK REASONS EXPLANATION (Why Flagged) */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <ShieldAlert size={18} className="text-amber-600 shrink-0" />
                <span>Risk Explanation & Flagged Indicators</span>
              </div>
              <span className="text-2xs uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100/90 text-amber-800 font-bold border border-amber-200">
                Educational Signals
              </span>
            </div>

            {student.riskReasons && student.riskReasons.length > 0 ? (
              <ul className="space-y-2 mt-1">
                {student.riskReasons.map((reason, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-amber-900/90 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>No active risk flags. Student metrics align with standard academic progress milestones.</span>
              </div>
            )}

            {/* Educational Disclaimer */}
            <p className="text-2xs text-amber-800/80 italic border-t border-amber-200/60 pt-2 leading-relaxed">
              * Note: These are educational support indicators based on course metrics, attendance, and assignment submissions. They do not constitute medical, psychological, or clinical diagnoses.
            </p>
          </div>

          {/* Recommendations from Engine */}
          {student.recommendations && student.recommendations.length > 0 && (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-950 font-semibold text-sm">
                <Lightbulb size={18} className="text-indigo-600 shrink-0" />
                <span>Personalized Recommendations</span>
              </div>
              <ul className="space-y-2">
                {student.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-indigo-100/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Interventions List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ListTodo size={18} className="text-indigo-600" />
                <span>Suggested Interventions ({student.suggestedInterventions?.length || 0})</span>
              </h3>

              <button
                type="button"
                onClick={() => setShowAddInterventionModal(!showAddInterventionModal)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Intervention</span>
              </button>
            </div>

            {/* Add custom intervention inline form */}
            {showAddInterventionModal && (
              <form onSubmit={handleCreateCustomIntervention} className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 space-y-3 animate-fadeIn">
                <div className="font-semibold text-xs text-slate-700">New Educational Intervention</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Intervention Title (e.g. Schedule mentor follow-up)"
                    value={customInvTitle}
                    onChange={(e) => setCustomInvTitle(e.target.value)}
                    className="sm:col-span-2 text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    required
                  />
                  <select
                    value={customInvType}
                    onChange={(e) => setCustomInvType(e.target.value)}
                    className="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Attendance">Attendance</option>
                    <option value="Academic">Academic Review</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Financial">Scholarship / Aid</option>
                    <option value="Skill">Skill Practice</option>
                    <option value="Resources">Learning Resources</option>
                  </select>
                </div>
                <textarea
                  placeholder="Actionable notes or details for the intervention..."
                  value={customInvDesc}
                  onChange={(e) => setCustomInvDesc(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddInterventionModal(false)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Save Intervention
                  </button>
                </div>
              </form>
            )}

            {student.suggestedInterventions && student.suggestedInterventions.length > 0 ? (
              <div className="space-y-2.5">
                {student.suggestedInterventions.map((inv) => (
                  <InterventionCard
                    key={inv.id}
                    intervention={inv}
                    onToggleStatus={() => onToggleIntervention && onToggleIntervention(student.id, inv.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                No active intervention suggestions for this student.
              </p>
            )}
          </div>

          {/* Teacher Notes Timeline & Add Note */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-600" />
              <span>Teacher Notes & Case Log ({student.notes?.length || 0})</span>
            </h3>

            {/* Note History List */}
            {student.notes && student.notes.length > 0 ? (
              <div className="space-y-2">
                {student.notes.map((note) => (
                  <div key={note.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">{note.author}</span>
                      <span className="text-2xs text-slate-400">{note.date}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                No teacher notes recorded yet. Add the first observation below.
              </p>
            )}

            {/* Add Note Form */}
            <form onSubmit={handleAddNoteSubmit} className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Your Name / Role"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 bg-white"
                />
                <span className="text-2xs text-slate-400">Teacher author tag</span>
              </div>
              <div className="flex gap-2">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add confidential teacher note or student observation..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send size={14} />
                  <span>Add Note</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Student Monitoring Mode • Member 4 Module
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
