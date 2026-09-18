/**
 * =========================================================================================
 * BEYOND BARRIERS - TEACHER RISK ADAPTER LAYER (Member 4 Integration Layer)
 * =========================================================================================
 * Path: src/utils/teacherRiskAdapter.js
 * 
 * PURPOSE & ARCHITECTURAL ROLE:
 * This adapter serves as the single source of truth for normalizing student records and 
 * recommendation engine outputs before they reach the UI components (`Teacher.jsx`, 
 * `StudentTable.jsx`, `StudentDetails.jsx`).
 * 
 * INTEGRATION INSTRUCTIONS FOR TEAMMATES:
 * -----------------------------------------------------------------------------------------
 * When Member 1, 2, or 3 finishes `studentData.js` and `recommendationEngine.js`:
 *   1. Import your central data source or fetch from API.
 *   2. Pass raw student objects and recommendation engine outputs into `normalizeDataset()`.
 *   3. No UI components need to be modified! The UI relies exclusively on the standardized
 *      fields returned by this adapter.
 * =========================================================================================
 */

import { DEMO_STUDENTS } from '../data/teacherDemoData.js';

/**
 * Standard Normalized Risk Status Types:
 * @typedef {'Stable' | 'Needs Attention' | 'Immediate Support'} NormalizedRiskStatus
 */

/**
 * Derives a fallback educational risk status if external recommendation engine hasn't computed it.
 * Educational support indicators only.
 * 
 * @param {number} attendance Percentage attendance (0-100)
 * @param {number} academicScore Percentage or GPA score (0-100)
 * @param {number} [flagsCount=0] Number of flagged support areas / missed milestones
 * @returns {NormalizedRiskStatus}
 */
export function deriveRiskStatus(attendance = 100, academicScore = 100, flagsCount = 0) {
  if (attendance < 60 || academicScore < 55 || flagsCount >= 3) {
    return 'Immediate Support';
  }
  if (attendance < 75 || academicScore < 70 || flagsCount >= 1) {
    return 'Needs Attention';
  }
  return 'Stable';
}

/**
 * Normalizes a single student item and its external recommendation output into the standardized UI contract.
 * 
 * @param {Object} rawStudent Raw student object from team's studentData.js or API
 * @param {Object} [rawRecommendation={}] Output from recommendationEngine.js (optional)
 * @returns {Object} Standardized student item for Teacher UI
 */
export function normalizeStudent(rawStudent = {}, rawRecommendation = {}) {
  const id = rawStudent.id || rawStudent._id || `STU-${Math.random().toString(36).substr(2, 5)}`;
  const name = rawStudent.name || rawStudent.fullName || 'Anonymous Student';
  
  // Create initials avatar if not provided
  const avatar = rawStudent.avatar || name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';
  
  const email = rawStudent.email || `${name.toLowerCase().replace(/\s+/g, '.')}@campus.edu`;
  const course = rawStudent.course || rawStudent.department || 'Undergraduate Program';
  const year = rawStudent.year || (rawStudent.grade ? `Year ${rawStudent.grade}` : 'Year 1');
  const semester = rawStudent.semester || 'Current Semester';

  const academicScore = Number(rawStudent.academicScore ?? rawStudent.gpaScore ?? rawStudent.gradePercentage ?? 0);
  const attendance = Number(rawStudent.attendance ?? rawStudent.attendancePercentage ?? 0);
  const learningProgress = Number(rawStudent.learningProgress ?? rawStudent.progressPercentage ?? 0);

  const skills = Array.isArray(rawStudent.skills) ? rawStudent.skills : [];
  const careerGoal = rawStudent.careerGoal || rawStudent.aspiration || 'Undecided / Exploring';

  // Support areas from student data or recommendation engine
  const supportAreas = Array.from(new Set([
    ...(Array.isArray(rawStudent.supportAreas) ? rawStudent.supportAreas : []),
    ...(Array.isArray(rawRecommendation.supportAreas) ? rawRecommendation.supportAreas : [])
  ]));

  // Risk status: prioritize recommendation engine output, then raw student data, then fallback logic
  let riskStatus = rawRecommendation.riskStatus || rawStudent.riskStatus;
  if (!riskStatus || !['Stable', 'Needs Attention', 'Immediate Support'].includes(riskStatus)) {
    // Map alternate names if teammate used different casing or labels
    if (String(riskStatus).toLowerCase().includes('immediate') || String(riskStatus).toLowerCase().includes('high')) {
      riskStatus = 'Immediate Support';
    } else if (String(riskStatus).toLowerCase().includes('attention') || String(riskStatus).toLowerCase().includes('medium') || String(riskStatus).toLowerCase().includes('moderate')) {
      riskStatus = 'Needs Attention';
    } else if (String(riskStatus).toLowerCase().includes('low') || String(riskStatus).toLowerCase().includes('stable')) {
      riskStatus = 'Stable';
    } else {
      riskStatus = deriveRiskStatus(attendance, academicScore, supportAreas.length);
    }
  }

  // Educational risk reasons: clearly formatted support indicators
  const rawReasons = [
    ...(Array.isArray(rawStudent.riskReasons) ? rawStudent.riskReasons : []),
    ...(Array.isArray(rawRecommendation.riskReasons) ? rawRecommendation.riskReasons : []),
    ...(Array.isArray(rawRecommendation.explanations) ? rawRecommendation.explanations : [])
  ];

  // If no explicit reasons provided but student needs attention, synthesize educational indicators
  const riskReasons = rawReasons.length > 0 ? Array.from(new Set(rawReasons)) : (() => {
    const synthetic = [];
    if (attendance < 75) synthetic.push(`Attendance is at ${attendance}%, below the 75% standard.`);
    if (academicScore < 60) synthetic.push(`Academic score is at ${academicScore}%, requiring performance reinforcement.`);
    if (learningProgress < 50) synthetic.push(`Curriculum learning progress (${learningProgress}%) shows recent slowdown.`);
    return synthetic;
  })();

  // Educational recommendations
  const recommendations = Array.from(new Set([
    ...(Array.isArray(rawStudent.recommendations) ? rawStudent.recommendations : []),
    ...(Array.isArray(rawRecommendation.recommendations) ? rawRecommendation.recommendations : [])
  ]));

  // Suggested interventions
  const suggestedInterventions = (
    Array.isArray(rawRecommendation.suggestedInterventions) && rawRecommendation.suggestedInterventions.length > 0
      ? rawRecommendation.suggestedInterventions
      : (Array.isArray(rawStudent.suggestedInterventions) ? rawStudent.suggestedInterventions : [])
  ).map((inv, idx) => ({
    id: inv.id || `${id}-INT-${idx + 1}`,
    title: inv.title || inv.actionName || 'Educational Follow-up',
    description: inv.description || inv.details || 'Coordinate with student for targeted academic support.',
    type: inv.type || 'Academic',
    priority: inv.priority || 'Medium',
    status: inv.status || 'pending', // 'pending' | 'completed'
    dueDate: inv.dueDate || 'Upcoming Checkpoint'
  }));

  // Teacher notes log
  const notes = Array.isArray(rawStudent.notes) ? rawStudent.notes : [];

  return {
    id,
    name,
    avatar,
    email,
    course,
    year,
    semester,
    academicScore,
    attendance,
    learningProgress,
    skills,
    careerGoal,
    riskStatus,
    supportAreas,
    riskReasons,
    recommendations,
    suggestedInterventions,
    notes,
    _raw: { rawStudent, rawRecommendation }
  };
}

/**
 * Normalizes an array of raw students with optional recommendation engine outputs.
 * 
 * @param {Array<Object>} [rawStudentsList=DEMO_STUDENTS] Array of student records
 * @param {Map<string, Object>|Object} [recommendationsMap={}] Recommendations keyed by student ID
 * @returns {Array<Object>} Array of normalized students
 */
export function normalizeDataset(rawStudentsList = DEMO_STUDENTS, recommendationsMap = {}) {
  if (!Array.isArray(rawStudentsList)) return [];

  return rawStudentsList.map(rawStudent => {
    const studentId = rawStudent.id || rawStudent._id;
    const studentRec = recommendationsMap instanceof Map 
      ? recommendationsMap.get(studentId) 
      : (recommendationsMap[studentId] || {});
      
    return normalizeStudent(rawStudent, studentRec);
  });
}

/**
 * Computes statistical metrics across the student dataset for summary cards.
 * 
 * @param {Array<Object>} students Normalized students array
 * @returns {Object} Dashboard summary counts and averages
 */
export function calculateDashboardStats(students = []) {
  const totalStudents = students.length;
  if (totalStudents === 0) {
    return {
      totalStudents: 0,
      stableCount: 0,
      needsAttentionCount: 0,
      immediateSupportCount: 0,
      activeInterventionsCount: 0,
      completedInterventionsCount: 0,
      averageAttendance: 0,
      averageAcademicScore: 0
    };
  }

  let stableCount = 0;
  let needsAttentionCount = 0;
  let immediateSupportCount = 0;
  let activeInterventionsCount = 0;
  let completedInterventionsCount = 0;
  let totalAttendance = 0;
  let totalAcademicScore = 0;

  for (const student of students) {
    if (student.riskStatus === 'Stable') stableCount++;
    else if (student.riskStatus === 'Needs Attention') needsAttentionCount++;
    else if (student.riskStatus === 'Immediate Support') immediateSupportCount++;

    totalAttendance += student.attendance || 0;
    totalAcademicScore += student.academicScore || 0;

    if (Array.isArray(student.suggestedInterventions)) {
      for (const inv of student.suggestedInterventions) {
        if (inv.status === 'completed') {
          completedInterventionsCount++;
        } else {
          activeInterventionsCount++;
        }
      }
    }
  }

  return {
    totalStudents,
    stableCount,
    needsAttentionCount,
    immediateSupportCount,
    activeInterventionsCount,
    completedInterventionsCount,
    averageAttendance: Math.round(totalAttendance / totalStudents),
    averageAcademicScore: Math.round(totalAcademicScore / totalStudents)
  };
}

/**
 * Filters and searches students based on query string, risk status filter, and optional support areas.
 * 
 * @param {Array<Object>} students Normalized students list
 * @param {Object} criteria Filter options
 * @param {string} [criteria.query=''] Search string matching name, email, course, skills
 * @param {string} [criteria.riskFilter='All'] 'All' | 'Stable' | 'Needs Attention' | 'Immediate Support'
 * @param {string} [criteria.supportArea='All'] Filter by specific support area
 * @param {string} [criteria.sortBy='name'] 'name' | 'academicScore' | 'attendance' | 'learningProgress' | 'riskStatus'
 * @param {'asc'|'desc'} [criteria.sortDirection='asc']
 * @returns {Array<Object>} Filtered and sorted students
 */
export function filterAndSearchStudents(students = [], criteria = {}) {
  const {
    query = '',
    riskFilter = 'All',
    supportArea = 'All',
    sortBy = 'name',
    sortDirection = 'asc'
  } = criteria;

  const cleanQuery = query.trim().toLowerCase();

  return students.filter(student => {
    // 1. Search Query Matching (Name, ID, Email, Course, Skills)
    if (cleanQuery) {
      const matchName = student.name?.toLowerCase().includes(cleanQuery);
      const matchId = student.id?.toLowerCase().includes(cleanQuery);
      const matchEmail = student.email?.toLowerCase().includes(cleanQuery);
      const matchCourse = student.course?.toLowerCase().includes(cleanQuery);
      const matchSkills = student.skills?.some(s => s.toLowerCase().includes(cleanQuery));
      const matchCareer = student.careerGoal?.toLowerCase().includes(cleanQuery);

      if (!matchName && !matchId && !matchEmail && !matchCourse && !matchSkills && !matchCareer) {
        return false;
      }
    }

    // 2. Risk Filter Matching
    if (riskFilter && riskFilter !== 'All') {
      if (student.riskStatus !== riskFilter) {
        return false;
      }
    }

    // 3. Support Area Filter Matching
    if (supportArea && supportArea !== 'All') {
      if (!student.supportAreas || !student.supportAreas.includes(supportArea)) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'riskStatus') {
      const riskWeight = { 'Immediate Support': 3, 'Needs Attention': 2, 'Stable': 1 };
      valA = riskWeight[a.riskStatus] || 0;
      valB = riskWeight[b.riskStatus] || 0;
    }

    if (typeof valA === 'string') {
      const comparison = valA.localeCompare(valB);
      return sortDirection === 'asc' ? comparison : -comparison;
    }

    if (typeof valA === 'number') {
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    }

    return 0;
  });
}
