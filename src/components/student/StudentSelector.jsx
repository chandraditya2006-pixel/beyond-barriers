import React from 'react';
import { UserCheck, Sparkles } from 'lucide-react';
import './StudentSelector.css';

/**
 * Interactive Student Profile Switcher
 * Demonstrates component reusability across multiple student profiles
 */
export const StudentSelector = ({ students, selectedId, onSelectStudent }) => {
  return (
    <div className="student-selector-container">
      <div className="selector-label-group">
        <span className="selector-tag">Demo Profile Selector</span>
        <h3>Switch Demo Student Profile</h3>
        <p>
          Verify dynamic component reusability: the same <code>&lt;StudentSupportPassport /&gt;</code> renders both profiles without any hardcoding.
        </p>
      </div>

      <div className="selector-cards-row">
        {students.map((student) => {
          const isSelected = student.id === selectedId || student.personal?.studentId === selectedId;
          const personal = student.personal || student;
          const academic = student.academic || {};
          const accessibility = student.accessibility || {};
          const financial = student.financial || {};

          return (
            <button
              key={student.id || personal.studentId}
              type="button"
              className={`student-card-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectStudent(student.id || personal.studentId)}
              aria-pressed={isSelected}
            >
              <div className="btn-avatar-wrap">
                <img
                  src={personal.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={personal.name}
                  className="btn-avatar-img"
                />
                {isSelected && (
                  <span className="btn-active-check">
                    <UserCheck size={12} />
                  </span>
                )}
              </div>

              <div className="btn-info">
                <div className="btn-name-row">
                  <span className="btn-name">{personal.name}</span>
                  <span className="btn-id-badge">{personal.studentId}</span>
                </div>
                <div className="btn-subtext">
                  <span>{academic.marks}% Marks</span>
                  <span>•</span>
                  <span>{academic.attendance}% Attd</span>
                  <span>•</span>
                  <span>{financial.needLevel} Need</span>
                </div>
                {accessibility.requirement && accessibility.requirement !== 'None' && (
                  <div className="btn-tag-wrap">
                    <span className="btn-purple-tag">♿ {accessibility.requirement} Support</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StudentSelector;
