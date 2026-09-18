import React from 'react';
import {
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  Eye,
  HeartHandshake,
  Compass,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Video,
  Languages,
  BadgeCheck,
  Building,
  Target
} from 'lucide-react';
import './StudentPassport.css';

/**
 * Reusable Student Support Passport Component
 * 
 * @param {Object} props
 * @param {Object} props.student - Student object containing personal, academic, accessibility, financial, career, preferences
 * @returns {JSX.Element}
 */
export const StudentSupportPassport = ({ student }) => {
  if (!student) {
    return (
      <div className="passport-container">
        <div className="passport-hero-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <AlertTriangle size={36} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
          <h3>No Student Record Selected</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Please provide a valid student object to render the Support Passport.
          </p>
        </div>
      </div>
    );
  }

  // Safe destructuring with full support for Member 3 exact contract & top-level aliases
  const personal = student.personal || {
    name: student.name || 'Unknown Student',
    studentId: student.id || student.studentId || 'N/A',
    course: student.course || 'Undergraduate',
    year: student.year || 1,
    institution: student.institution || 'ABC University',
    avatar: student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  const academic = student.academic || {
    marks: student.marks || 0,
    attendance: student.attendance || 0,
    learningProgress: student.learningProgress || 0,
    learningPace: student.learningPace || 'Moderate',
    gradeAverage: 'N/A'
  };

  const accessibility = student.accessibility || {
    requirement: student.accessibilityRequirement || 'None',
    assistiveTechnology: student.assistiveTechnology || 'None',
    accommodations: 'Standard course materials'
  };

  const financial = student.financial || {
    needLevel: student.financialNeed || 'Low',
    scholarshipRequired: student.scholarshipRequired || 'No',
    aidCategory: 'Standard'
  };

  const career = student.career || {
    interest: student.careerInterest || 'Undecided',
    targetRole: student.targetRole || 'Undecided'
  };

  const preferences = student.preferences || {
    learningMode: student.learningMode || 'Visual',
    preferredResources: student.preferredResources || ['Video'],
    preferredLanguage: student.language || 'English'
  };

  // Color & Badge helpers for visual indicators
  const getMarksColorClass = (marks) => {
    if (marks >= 80) return { fill: 'fill-emerald', badge: 'badge-success', label: 'Distinction' };
    if (marks >= 60) return { fill: 'fill-cyan', badge: 'badge-info', label: 'Proficient' };
    if (marks >= 50) return { fill: 'fill-amber', badge: 'badge-warning', label: 'Needs Support' };
    return { fill: 'fill-indigo', badge: 'badge-danger', label: 'Critical' };
  };

  const getAttendanceColorClass = (attendance) => {
    if (attendance >= 85) return { fill: 'fill-emerald', badge: 'badge-success', label: 'Compliant' };
    if (attendance >= 75) return { fill: 'fill-cyan', badge: 'badge-info', label: 'Regular' };
    return { fill: 'fill-amber', badge: 'badge-warning', label: 'Below Threshold (<75%)' };
  };

  const getFinancialBadgeClass = (need) => {
    const lower = (need || '').toLowerCase();
    if (lower === 'high') return 'badge-danger';
    if (lower === 'moderate') return 'badge-warning';
    return 'badge-success';
  };

  const marksMeta = getMarksColorClass(academic.marks);
  const attendanceMeta = getAttendanceColorClass(academic.attendance);

  return (
    <article className="passport-container" aria-label={`Student Support Passport for ${personal.name}`}>
      
      {/* 1. PERSONAL INFORMATION - Hero Passport Header */}
      <section className="passport-hero-card" aria-label="Personal Information Summary">
        <div className="hero-main-content">
          <div className="hero-identity">
            <div className="avatar-wrapper">
              <img
                src={personal.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={`${personal.name} avatar`}
                className="student-avatar"
              />
              <span className="avatar-badge-icon" title="Active Student Status">
                <BadgeCheck size={16} />
              </span>
            </div>

            <div className="identity-text">
              <h2>
                {personal.name}
                <span className="id-badge">{personal.studentId}</span>
              </h2>

              <p className="identity-subtitle">
                <span>{personal.course}</span>
                <span className="identity-bullet">•</span>
                <span>Year {personal.year}</span>
                <span className="identity-bullet">•</span>
                <span>{personal.institution}</span>
              </p>

              <div className="hero-tags">
                <span className="meta-chip">
                  <Building size={14} color="#818cf8" />
                  {personal.institution}
                </span>
                <span className="meta-chip">
                  <GraduationCap size={14} color="#22d3ee" />
                  Cohort {2024 + (personal.year ? 4 - personal.year : 0)}
                </span>
                <span className="meta-chip">
                  <Target size={14} color="#34d399" />
                  {career.targetRole}
                </span>
              </div>
            </div>
          </div>

          <div className="passport-seal">
            <span className="seal-label">Passport State</span>
            <div className="seal-status">
              <span className="pulse-dot"></span>
              <span>Active & Verified</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ID: {personal.studentId}-SSP
            </span>
          </div>
        </div>
      </section>

      {/* KEY METRICS OVERVIEW (Academic, Attendance, Learning Progress & Pace) */}
      <section className="passport-kpis-grid" aria-label="Academic and Progress KPIs">
        
        {/* KPI 1: Marks */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Marks Score</span>
            <div className="kpi-icon-badge indigo">
              <Award size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{academic.marks}%</span>
            <span className={`kpi-badge ${marksMeta.badge}`}>{marksMeta.label}</span>
          </div>
          <div className="kpi-progress-bar-wrapper">
            <div className="progress-track" role="progressbar" aria-valuenow={academic.marks} aria-valuemin={0} aria-valuemax={100}>
              <div className={`progress-fill ${marksMeta.fill}`} style={{ width: `${Math.min(100, Math.max(0, academic.marks))}%` }}></div>
            </div>
            <span className="kpi-footer-note">
              Overall Examination Evaluation
            </span>
          </div>
        </div>

        {/* KPI 2: Attendance */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Attendance</span>
            <div className="kpi-icon-badge cyan">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{academic.attendance}%</span>
            <span className={`kpi-badge ${attendanceMeta.badge}`}>
              {academic.attendance >= 75 ? 'Safe' : 'Alert'}
            </span>
          </div>
          <div className="kpi-progress-bar-wrapper">
            <div className="progress-track" role="progressbar" aria-valuenow={academic.attendance} aria-valuemin={0} aria-valuemax={100}>
              <div className={`progress-fill ${attendanceMeta.fill}`} style={{ width: `${Math.min(100, Math.max(0, academic.attendance))}%` }}></div>
            </div>
            <span className="kpi-footer-note">
              {academic.attendance >= 75 ? '✓ Meets institutional quota' : '⚠ Below 75% minimum'}
            </span>
          </div>
        </div>

        {/* KPI 3: Learning Progress */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Learning Progress</span>
            <div className="kpi-icon-badge emerald">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{academic.learningProgress}%</span>
            <span className="kpi-badge badge-success">On Course</span>
          </div>
          <div className="kpi-progress-bar-wrapper">
            <div className="progress-track" role="progressbar" aria-valuenow={academic.learningProgress} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill fill-emerald" style={{ width: `${Math.min(100, Math.max(0, academic.learningProgress))}%` }}></div>
            </div>
            <span className="kpi-footer-note">
              Curriculum milestones completed
            </span>
          </div>
        </div>

        {/* KPI 4: Learning Pace */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Learning Pace</span>
            <div className="kpi-icon-badge purple">
              <Clock size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ fontSize: '1.65rem' }}>{academic.learningPace}</span>
            <span className="kpi-badge badge-purple">Adaptive</span>
          </div>
          <div className="kpi-progress-bar-wrapper">
            <div className="progress-track">
              <div
                className="progress-fill fill-indigo"
                style={{
                  width: academic.learningPace === 'Fast' ? '90%' : academic.learningPace === 'Moderate' ? '60%' : '35%'
                }}
              ></div>
            </div>
            <span className="kpi-footer-note">
              {academic.learningPace === 'Fast' ? 'Accelerated mastery curve' : 'Balanced modular speed'}
            </span>
          </div>
        </div>

      </section>

      {/* DETAILED PASSPORT SECTIONS (2x2 / 2x4 responsive grid) */}
      <div className="passport-sections-grid">

        {/* SECTION A: Personal Information Details */}
        <div className="passport-section-card" id="passport-personal-info">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <ShieldCheck size={18} />
              </div>
              <h3>Personal Information</h3>
            </div>
            <span className="section-badge">Verified Bio</span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">Full Name</span>
              <span className="info-value">{personal.name}</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Student ID</span>
              <span className="info-value" style={{ fontFamily: 'monospace', color: '#a5b4fc' }}>{personal.studentId}</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Degree & Department</span>
              <span className="info-value">{personal.course}</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Academic Year</span>
              <span className="info-value">Year {personal.year} (Junior)</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Institution</span>
              <span className="info-value">{personal.institution}</span>
            </div>
          </div>
        </div>

        {/* SECTION B: Academic Performance Breakdown */}
        <div className="passport-section-card" id="passport-academic-performance">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <Award size={18} />
              </div>
              <h3>Academic Performance</h3>
            </div>
            <span className="section-badge">Semester 5</span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">Aggregate Marks</span>
              <span className="info-value" style={{ color: academic.marks >= 75 ? '#34d399' : '#fbbf24' }}>
                {academic.marks}%
              </span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Learning Pace</span>
              <span className="info-value">{academic.learningPace}</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Grading Bracket</span>
              <span className="info-value">{academic.marks >= 80 ? 'Grade A (Outstanding)' : 'Grade C+ (Intervention Recommended)'}</span>
            </div>
          </div>

          <div className={`highlight-box ${academic.marks >= 75 ? 'success' : 'warning'}`}>
            <span className="highlight-title">Performance Advisory</span>
            <p className="highlight-content">
              {academic.marks >= 75
                ? 'Academic metrics reflect high mastery. Recommended for competitive research electives and advanced projects.'
                : 'Marks indicate potential comprehension hurdles in core subjects. Target micro-quizzes and visual practice modules.'}
            </p>
          </div>
        </div>

        {/* SECTION C: Attendance & Engagement */}
        <div className="passport-section-card" id="passport-attendance">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <CalendarCheck size={18} />
              </div>
              <h3>Attendance & Engagement</h3>
            </div>
            <span className={`section-badge ${academic.attendance >= 75 ? '' : 'badge-warning'}`}>
              {academic.attendance}% Recorded
            </span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">Cumulative Attendance</span>
              <span className="info-value">{academic.attendance}%</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Minimum Mandate</span>
              <span className="info-value">75% Required</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Compliance Status</span>
              <span className="info-value">
                {academic.attendance >= 75 ? (
                  <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> In Good Standing
                  </span>
                ) : (
                  <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={14} /> Shortfall Alert
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className={`highlight-box ${academic.attendance >= 75 ? 'success' : 'warning'}`}>
            <span className="highlight-title">Attendance Impact Note</span>
            <p className="highlight-content">
              {academic.attendance >= 75
                ? 'Consistent class presence maintained. No barrier identified for exam eligibility.'
                : 'Current attendance is 68%, which falls below the 75% threshold. Recommend logging asynchronous engagement hours.'}
            </p>
          </div>
        </div>

        {/* SECTION D: Learning Progress */}
        <div className="passport-section-card" id="passport-learning-progress">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <TrendingUp size={18} />
              </div>
              <h3>Learning Progress</h3>
            </div>
            <span className="section-badge">{academic.learningProgress}% Completed</span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">Curriculum Completion</span>
              <span className="info-value">{academic.learningProgress}%</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Active Modules</span>
              <span className="info-value">{academic.learningProgress >= 80 ? 'Module 5 of 6 (Advanced)' : 'Module 3 of 6 (Core)'}</span>
            </div>
            <div className="info-pair-row">
              <span className="info-label">Pacing Trajectory</span>
              <span className="info-value">{academic.learningPace} Pace Curve</span>
            </div>
          </div>

          <div className="highlight-box info">
            <span className="highlight-title">Curricular Milestones</span>
            <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Milestone 1: Foundations</span>
                <span style={{ color: '#34d399' }}>✓ 100%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Milestone 2: Applied Projects</span>
                <span style={{ color: academic.learningProgress >= 70 ? '#34d399' : '#38bdf8' }}>
                  {academic.learningProgress >= 70 ? '✓ 90%' : `${academic.learningProgress}%`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION E: Learning Preferences */}
        <div className="passport-section-card" id="passport-learning-preferences">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <Sparkles size={18} />
              </div>
              <h3>Learning Preferences</h3>
            </div>
            <span className="section-badge">{preferences.learningMode} Learner</span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">
                <Eye size={15} color="#818cf8" />
                Primary Learning Mode
              </span>
              <span className="custom-pill">
                {preferences.learningMode}
              </span>
            </div>

            <div className="info-pair-row">
              <span className="info-label">
                <Languages size={15} color="#22d3ee" />
                Preferred Language
              </span>
              <span className="info-value">{preferences.preferredLanguage}</span>
            </div>

            <div className="info-pair-row" style={{ alignItems: 'flex-start' }}>
              <span className="info-label" style={{ paddingTop: '0.2rem' }}>
                <Video size={15} color="#34d399" />
                Preferred Resources
              </span>
              <div className="pill-group">
                {Array.isArray(preferences.preferredResources) ? (
                  preferences.preferredResources.map((res, idx) => (
                    <span key={idx} className="custom-pill">
                      {res}
                    </span>
                  ))
                ) : (
                  <span className="custom-pill">{preferences.preferredResources}</span>
                )}
              </div>
            </div>
          </div>

          <div className="highlight-box info">
            <span className="highlight-title">Personalization Strategy</span>
            <p className="highlight-content">
              Prioritizes video walkthroughs with step-by-step interactive coding Sandboxes. High engagement retention when content is visual.
            </p>
          </div>
        </div>

        {/* SECTION F: Accessibility Requirements */}
        <div className="passport-section-card" id="passport-accessibility">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <HeartHandshake size={18} />
              </div>
              <h3>Accessibility Requirements</h3>
            </div>
            <span className={`section-badge ${accessibility.requirement !== 'None' ? 'badge-purple' : ''}`}>
              {accessibility.requirement === 'None' ? 'No Barrier' : `${accessibility.requirement} Support`}
            </span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">Requirement</span>
              <span className="info-value">
                {accessibility.requirement === 'None' ? (
                  <span style={{ color: '#94a3b8' }}>None</span>
                ) : (
                  <span className="custom-pill" style={{ background: 'rgba(168, 85, 247, 0.2)', borderColor: 'rgba(168, 85, 247, 0.4)', color: '#e9d5ff' }}>
                    {accessibility.requirement}
                  </span>
                )}
              </span>
            </div>

            <div className="info-pair-row">
              <span className="info-label">Assistive Technology</span>
              <span className="info-value">
                {accessibility.assistiveTechnology === 'None' ? (
                  <span style={{ color: '#94a3b8' }}>None</span>
                ) : (
                  <span className="custom-pill" style={{ background: 'rgba(56, 189, 248, 0.2)', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#bae6fd' }}>
                    {accessibility.assistiveTechnology}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className={`highlight-box ${accessibility.requirement !== 'None' ? 'info' : 'success'}`}>
            <span className="highlight-title">Accommodation Protocol</span>
            <p className="highlight-content">
              {accessibility.requirement === 'Hearing'
                ? 'Student requires synchronized high-accuracy subtitles (Captions) on all multimedia lectures and live speech-to-text integration during seminars.'
                : 'No specialized assistive hardware required. Standard inclusive digital formats are sufficient.'}
            </p>
          </div>
        </div>

        {/* SECTION G: Financial Support Needs */}
        <div className="passport-section-card" id="passport-financial-support">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <BookOpen size={18} />
              </div>
              <h3>Financial Support Needs</h3>
            </div>
            <span className={`section-badge ${getFinancialBadgeClass(financial.needLevel)}`}>
              {financial.needLevel} Need
            </span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">Financial Need Level</span>
              <span className={`kpi-badge ${getFinancialBadgeClass(financial.needLevel)}`}>
                {financial.needLevel}
              </span>
            </div>

            <div className="info-pair-row">
              <span className="info-label">Scholarship Required</span>
              <span className="info-value">
                {financial.scholarshipRequired === 'Yes' ? (
                  <span style={{ color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={14} /> Yes (Action Required)
                  </span>
                ) : (
                  <span style={{ color: '#34d399', fontWeight: 600 }}>
                    No (Self-Supported)
                  </span>
                )}
              </span>
            </div>

            <div className="info-pair-row">
              <span className="info-label">Aid Allocation Category</span>
              <span className="info-value">{financial.aidCategory || 'Standard Evaluation'}</span>
            </div>
          </div>

          <div className={`highlight-box ${financial.scholarshipRequired === 'Yes' ? 'warning' : 'success'}`}>
            <span className="highlight-title">Financial Aid Status</span>
            <p className="highlight-content">
              {financial.scholarshipRequired === 'Yes'
                ? 'High financial need flagged. System recommends connecting with merit-cum-means tuition grants and fee waiver schemes.'
                : 'Tuition and academic supplies are self-funded without financial blockages.'}
            </p>
          </div>
        </div>

        {/* SECTION H: Career Interests & Target Role */}
        <div className="passport-section-card" id="passport-career-interests">
          <div className="section-title-bar">
            <div className="title-with-icon">
              <div className="section-icon-box">
                <Compass size={18} />
              </div>
              <h3>Career Interests</h3>
            </div>
            <span className="section-badge">{career.targetRole}</span>
          </div>

          <div className="info-pairs-list">
            <div className="info-pair-row">
              <span className="info-label">Career Domain</span>
              <span className="custom-pill">
                {career.interest}
              </span>
            </div>

            <div className="info-pair-row">
              <span className="info-label">Target Role</span>
              <span className="info-value" style={{ color: '#818cf8', fontWeight: 700 }}>
                {career.targetRole}
              </span>
            </div>

            <div className="info-pair-row">
              <span className="info-label">Target Graduation</span>
              <span className="info-value">June 2027</span>
            </div>
          </div>

          <div className="highlight-box info">
            <span className="highlight-title">Curated Career Roadmap</span>
            <p className="highlight-content">
              Target role is <strong>{career.targetRole}</strong> in {career.interest}. Recommended next step: build 2 portfolio capstone projects matching industry tech stacks.
            </p>
          </div>
        </div>

      </div>

      {/* MEMBER 3 INTEGRATION DATA CONTRACT STATUS CALLOUT */}
      <footer className="integration-callout" aria-label="Member 3 Recommendation Engine Integration Contract">
        <div className="integration-header">
          <div className="integration-title">
            <CheckCircle2 size={18} color="#34d399" />
            <span>Member 3 Integration Contract Ready</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Consumed seamlessly by Recommendation & Barrier Engine
          </span>
        </div>
        <div className="code-schema-preview">
          <div className="code-token">
            <span>academic.marks</span>
            <span className="val">{academic.marks}%</span>
          </div>
          <div className="code-token">
            <span>academic.attendance</span>
            <span className="val">{academic.attendance}%</span>
          </div>
          <div className="code-token">
            <span>accessibility.requirement</span>
            <span className="val">{accessibility.requirement}</span>
          </div>
          <div className="code-token">
            <span>financial.needLevel</span>
            <span className="val">{financial.needLevel}</span>
          </div>
          <div className="code-token">
            <span>career.targetRole</span>
            <span className="val">{career.targetRole}</span>
          </div>
          <div className="code-token">
            <span>preferences.learningMode</span>
            <span className="val">{preferences.learningMode}</span>
          </div>
        </div>
      </footer>

    </article>
  );
};

export default StudentSupportPassport;
