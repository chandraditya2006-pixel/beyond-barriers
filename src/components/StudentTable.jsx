import React from 'react';
import { Eye, MessageSquarePlus, User, ChevronRight, AlertCircle, ArrowUpDown } from 'lucide-react';
import RiskBadge from './RiskBadge';

/**
 * StudentTable Component
 * Renders the 8-column Student Monitoring Table required by Beyond Barriers Teacher Dashboard.
 * 
 * Columns:
 * 1. Student (Avatar, Name, ID/Email)
 * 2. Course / Year
 * 3. Academic Score
 * 4. Attendance
 * 5. Progress
 * 6. Risk Status
 * 7. Support Areas
 * 8. Action
 * 
 * @param {Object} props
 * @param {Array<Object>} props.students Filtered and normalized student list
 * @param {Function} props.onViewStudent Callback when View is clicked
 * @param {Function} props.onQuickNote Callback for quick note action
 * @param {Function} props.onResetFilters Callback when resetting filters in empty state
 * @param {string} [props.sortField] Current sort field
 * @param {string} [props.sortOrder] 'asc' | 'desc'
 * @param {Function} [props.onSort] Sort click handler
 */
export default function StudentTable({
  students = [],
  onViewStudent,
  onQuickNote,
  onResetFilters,
  sortField = 'name',
  sortOrder = 'asc',
  onSort
}) {
  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
          <AlertCircle size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-800">No students match your criteria</h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
          Try adjusting your search query, clearing your risk filter, or resetting all parameters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  const renderSortHeader = (label, field) => {
    const isCurrent = sortField === field;
    return (
      <button
        type="button"
        onClick={() => onSort && onSort(field)}
        className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-wider text-2xs"
      >
        <span>{label}</span>
        <ArrowUpDown size={11} className={`transition-opacity ${isCurrent ? 'opacity-100 text-indigo-600' : 'opacity-40'}`} />
      </button>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
      
      {/* Mobile-Friendly List (Small Screens) */}
      <div className="block md:hidden divide-y divide-slate-100">
        {students.map((student) => {
          const isAttendanceLow = student.attendance < 75;
          return (
            <div key={student.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                    {student.avatar || student.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                    <p className="text-xs text-slate-500">{student.course} • {student.year}</p>
                  </div>
                </div>
                <RiskBadge status={student.riskStatus} size="sm" />
              </div>

              {/* Mobile Key Stats Row */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/60 text-center">
                <div>
                  <span className="text-2xs text-slate-400 uppercase font-semibold">Score</span>
                  <div className="text-xs font-bold text-slate-800">{student.academicScore}%</div>
                </div>
                <div>
                  <span className="text-2xs text-slate-400 uppercase font-semibold">Attendance</span>
                  <div className={`text-xs font-bold ${isAttendanceLow ? 'text-rose-600' : 'text-slate-800'}`}>
                    {student.attendance}%
                  </div>
                </div>
                <div>
                  <span className="text-2xs text-slate-400 uppercase font-semibold">Progress</span>
                  <div className="text-xs font-bold text-indigo-700">{student.learningProgress}%</div>
                </div>
              </div>

              {/* Support Areas Chips */}
              {student.supportAreas && student.supportAreas.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {student.supportAreas.map((area, i) => (
                    <span key={i} className="text-2xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {area}
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile Actions */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onQuickNote && onQuickNote(student)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquarePlus size={14} />
                  <span>Note</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewStudent && onViewStudent(student)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop & Tablet Table (8 Columns as Requested) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600">
              {/* 1. Student */}
              <th className="py-3.5 px-4 font-semibold text-2xs uppercase tracking-wider">
                {renderSortHeader('Student', 'name')}
              </th>

              {/* 2. Course / Year */}
              <th className="py-3.5 px-3 font-semibold text-2xs uppercase tracking-wider">
                {renderSortHeader('Course / Year', 'course')}
              </th>

              {/* 3. Academic Score */}
              <th className="py-3.5 px-3 font-semibold text-2xs uppercase tracking-wider">
                {renderSortHeader('Academic Score', 'academicScore')}
              </th>

              {/* 4. Attendance */}
              <th className="py-3.5 px-3 font-semibold text-2xs uppercase tracking-wider">
                {renderSortHeader('Attendance', 'attendance')}
              </th>

              {/* 5. Progress */}
              <th className="py-3.5 px-3 font-semibold text-2xs uppercase tracking-wider">
                {renderSortHeader('Progress', 'learningProgress')}
              </th>

              {/* 6. Risk Status */}
              <th className="py-3.5 px-3 font-semibold text-2xs uppercase tracking-wider">
                {renderSortHeader('Risk Status', 'riskStatus')}
              </th>

              {/* 7. Support Areas */}
              <th className="py-3.5 px-3 font-semibold text-2xs uppercase tracking-wider">
                Support Areas
              </th>

              {/* 8. Action */}
              <th className="py-3.5 px-4 font-semibold text-2xs uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {students.map((student) => {
              const isAttendanceBelowThreshold = student.attendance < 75;
              const isScoreLow = student.academicScore < 60;

              return (
                <tr 
                  key={student.id} 
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* 1. Student */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                        {student.avatar || student.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-900 block truncate group-hover:text-indigo-600 transition-colors">
                          {student.name}
                        </span>
                        <span className="text-2xs text-slate-400 block truncate">
                          {student.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 2. Course / Year */}
                  <td className="py-3.5 px-3">
                    <div className="text-slate-800 font-medium text-xs leading-tight">
                      {student.course}
                    </div>
                    <span className="inline-block mt-0.5 text-2xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      {student.year}
                    </span>
                  </td>

                  {/* 3. Academic Score */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-bold text-xs ${isScoreLow ? 'text-amber-700' : 'text-slate-800'}`}>
                        {student.academicScore}%
                      </span>
                    </div>
                    <div className="w-20 bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          student.academicScore < 60 ? 'bg-amber-500' : student.academicScore < 75 ? 'bg-blue-500' : 'bg-emerald-500'
                        }`} 
                        style={{ width: `${Math.min(student.academicScore, 100)}%` }}
                      />
                    </div>
                  </td>

                  {/* 4. Attendance */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-xs ${
                        isAttendanceBelowThreshold ? 'text-rose-600' : 'text-emerald-700'
                      }`}>
                        {student.attendance}%
                      </span>
                      {isAttendanceBelowThreshold && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" title="Below 75% threshold" />
                      )}
                    </div>
                    <span className="text-2xs text-slate-400 block">
                      {isAttendanceBelowThreshold ? 'Below Req' : 'Good'}
                    </span>
                  </td>

                  {/* 5. Progress */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-indigo-600" 
                          style={{ width: `${Math.min(student.learningProgress, 100)}%` }}
                        />
                      </div>
                      <span className="text-2xs font-semibold text-slate-600 font-mono">
                        {student.learningProgress}%
                      </span>
                    </div>
                  </td>

                  {/* 6. Risk Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <RiskBadge status={student.riskStatus} size="sm" />
                  </td>

                  {/* 7. Support Areas */}
                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {student.supportAreas && student.supportAreas.length > 0 ? (
                        student.supportAreas.slice(0, 2).map((area, idx) => (
                          <span 
                            key={idx} 
                            className="text-2xs font-medium px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-700 border border-slate-200 truncate max-w-[140px]"
                            title={area}
                          >
                            {area}
                          </span>
                        ))
                      ) : (
                        <span className="text-2xs text-slate-400 italic">None flagged</span>
                      )}
                      {student.supportAreas && student.supportAreas.length > 2 && (
                        <span 
                          className="text-2xs font-medium px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 cursor-default"
                          title={student.supportAreas.slice(2).join(', ')}
                        >
                          +{student.supportAreas.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* 8. Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <button
                        type="button"
                        onClick={() => onQuickNote && onQuickNote(student)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Add Teacher Note"
                        aria-label={`Add note for ${student.name}`}
                      >
                        <MessageSquarePlus size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewStudent && onViewStudent(student)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-xs font-semibold transition-all duration-150 inline-flex items-center gap-1 cursor-pointer group/btn shadow-2xs"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Count Indicator */}
      <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">{students.length}</span> student records
        </div>
        <div className="flex items-center gap-4 text-2xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Stable
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Needs Attention
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Immediate Support
          </span>
        </div>
      </div>
    </div>
  );
}
