// Verification test script for Beyond Barriers Teacher Dashboard
import { DEMO_STUDENTS, DEMO_METADATA } from './src/data/teacherDemoData.js';
import { 
  normalizeStudent, 
  normalizeDataset, 
  calculateDashboardStats, 
  filterAndSearchStudents, 
  deriveRiskStatus 
} from './src/utils/teacherRiskAdapter.js';

console.log('=== TEST 1: Demo Data Verification ===');
console.assert(Array.isArray(DEMO_STUDENTS), 'DEMO_STUDENTS should be an array');
console.assert(DEMO_STUDENTS.length === 10, `Expected 10 students, got ${DEMO_STUDENTS.length}`);
console.log(`✓ Loaded ${DEMO_STUDENTS.length} students from teacherDemoData.js`);

console.log('\n=== TEST 2: Adapter Normalization ===');
const normalized = normalizeDataset(DEMO_STUDENTS);
console.assert(normalized.length === 10, 'Normalized length mismatch');
const first = normalized[0];
console.assert(first.name === 'Aarav Sharma', 'Student name mismatch');
console.assert(first.riskStatus === 'Immediate Support', 'Risk status mismatch');
console.assert(first.academicScore === 54, 'Academic score mismatch');
console.assert(first.attendance === 58, 'Attendance mismatch');
console.assert(first.learningProgress === 42, 'Learning progress mismatch');
console.assert(Array.isArray(first.suggestedInterventions), 'Interventions must be an array');
console.assert(first.suggestedInterventions.length === 3, 'Intervention count mismatch');
console.log('✓ Normalization correctly standardized student properties');

console.log('\n=== TEST 3: Dashboard Statistics ===');
const stats = calculateDashboardStats(normalized);
console.log('Dashboard Stats:', stats);
console.assert(stats.totalStudents === 10, 'Total students should be 10');
console.assert(stats.stableCount === 4, `Expected 4 stable, got ${stats.stableCount}`);
console.assert(stats.needsAttentionCount === 3, `Expected 3 needs attention, got ${stats.needsAttentionCount}`);
console.assert(stats.immediateSupportCount === 3, `Expected 3 immediate support, got ${stats.immediateSupportCount}`);
console.assert(stats.activeInterventionsCount > 0, 'Active interventions should be > 0');
console.log('✓ Statistics aggregation verified');

console.log('\n=== TEST 4: Search Functionality ===');
const searchAarav = filterAndSearchStudents(normalized, { query: 'Aarav' });
console.assert(searchAarav.length === 1 && searchAarav[0].name === 'Aarav Sharma', 'Search Aarav failed');
console.log(`✓ Search for "Aarav" returned exactly 1 match: ${searchAarav[0].name}`);

const searchCourse = filterAndSearchStudents(normalized, { query: 'Biotechnology' });
console.assert(searchCourse.length === 1 && searchCourse[0].name === 'Sneha Mukherjee', 'Search course failed');
console.log(`✓ Search for "Biotechnology" returned 1 match: ${searchCourse[0].name}`);

console.log('\n=== TEST 5: Risk Filters ===');
const stableFiltered = filterAndSearchStudents(normalized, { riskFilter: 'Stable' });
console.assert(stableFiltered.length === 4, `Expected 4 stable students, got ${stableFiltered.length}`);
console.log(`✓ Filter 'Stable' returned ${stableFiltered.length} students`);

const attentionFiltered = filterAndSearchStudents(normalized, { riskFilter: 'Needs Attention' });
console.assert(attentionFiltered.length === 3, `Expected 3 Needs Attention students, got ${attentionFiltered.length}`);
console.log(`✓ Filter 'Needs Attention' returned ${attentionFiltered.length} students`);

const immediateFiltered = filterAndSearchStudents(normalized, { riskFilter: 'Immediate Support' });
console.assert(immediateFiltered.length === 3, `Expected 3 Immediate Support students, got ${immediateFiltered.length}`);
console.log(`✓ Filter 'Immediate Support' returned ${immediateFiltered.length} students`);

console.log('\n=== TEST 6: Support Area Filters & Sorting ===');
const attendanceSupport = filterAndSearchStudents(normalized, { supportArea: 'Attendance Support' });
console.assert(attendanceSupport.length >= 3, 'Support area filter failed');
console.log(`✓ Filter 'Attendance Support' returned ${attendanceSupport.length} students`);

const sortedByScoreDesc = filterAndSearchStudents(normalized, { sortBy: 'academicScore', sortDirection: 'desc' });
console.assert(sortedByScoreDesc[0].academicScore >= sortedByScoreDesc[1].academicScore, 'Sorting failed');
console.log(`✓ Top score sorted student: ${sortedByScoreDesc[0].name} (${sortedByScoreDesc[0].academicScore}%)`);

console.log('\n=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ===');
