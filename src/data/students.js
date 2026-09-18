/**
 * Beyond Barriers - Personalized Education Support System
 * Member 2: Student Data Layer
 * 
 * Reusable student data repository separate from UI presentation.
 * Explicitly designed for seamless consumption by:
 * - Member 2 (Student Support Passport & Features)
 * - Member 3 (Barrier Analysis & Recommendation Engine)
 * - Member 4 (Teacher/Mentor Dashboard)
 */

export const students = {
  STU001: {
    // Top-level identifiers for direct access
    id: 'STU001',
    name: 'Ananya Sharma',

    // Personal Information
    personal: {
      name: 'Ananya Sharma',
      studentId: 'STU001',
      course: 'B.Tech Computer Science',
      year: 3,
      institution: 'ABC University',
      email: 'ananya.sharma@abc.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },

    // Academic Information (Consumable by Member 3 Recommendation Engine)
    academic: {
      marks: 52, // 52%
      attendance: 68, // 68%
      learningProgress: 61, // 61%
      learningPace: 'Moderate', // Fast | Moderate | Slow
      currentSemester: 'Semester 5',
      gradeAverage: 'C+'
    },

    // Accessibility Requirements (Consumable by Member 3 Barrier Engine)
    accessibility: {
      requirement: 'None',
      assistiveTechnology: 'None',
      accommodations: 'Standard digital course materials'
    },

    // Financial Support Needs (Consumable by Member 3 Resource Allocator)
    financial: {
      needLevel: 'High', // High | Moderate | Low
      scholarshipRequired: 'Yes', // 'Yes' / 'No'
      scholarshipStatus: 'Application Pending',
      aidCategory: 'Merit-cum-Means Assistance'
    },

    // Career Aspirations (Consumable by Member 3 Pathway Recommender)
    career: {
      interest: 'Software Development',
      targetRole: 'Software Engineer',
      focusAreas: ['Full Stack Web', 'Data Structures', 'Cloud Fundamentals']
    },

    // Learning Preferences (Consumable by Member 3 Personalized Content Engine)
    preferences: {
      learningMode: 'Visual', // Visual | Auditory | Kinesthetic | Reading/Writing
      preferredResources: ['Video', 'Interactive exercises'],
      preferredLanguage: 'English'
    }
  },

  STU002: {
    // Top-level identifiers for direct access
    id: 'STU002',
    name: 'Rahul Verma',

    // Personal Information
    personal: {
      name: 'Rahul Verma',
      studentId: 'STU002',
      course: 'B.Tech Computer Science',
      year: 3,
      institution: 'ABC University',
      email: 'rahul.verma@abc.edu',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },

    // Academic Information (Consumable by Member 3 Recommendation Engine)
    academic: {
      marks: 82, // 82%
      attendance: 91, // 91%
      learningProgress: 84, // 84%
      learningPace: 'Fast', // Fast | Moderate | Slow
      currentSemester: 'Semester 5',
      gradeAverage: 'A'
    },

    // Accessibility Requirements (Consumable by Member 3 Barrier Engine)
    accessibility: {
      requirement: 'Hearing',
      assistiveTechnology: 'Captions',
      accommodations: 'Real-time live captioning, transcripts for all video lectures'
    },

    // Financial Support Needs (Consumable by Member 3 Resource Allocator)
    financial: {
      needLevel: 'Low', // High | Moderate | Low
      scholarshipRequired: 'No', // 'Yes' / 'No'
      scholarshipStatus: 'Not Required',
      aidCategory: 'Self-Funded'
    },

    // Career Aspirations (Consumable by Member 3 Pathway Recommender)
    career: {
      interest: 'Data Science',
      targetRole: 'Data Scientist',
      focusAreas: ['Machine Learning', 'Python for Data Analysis', 'Statistical Inference']
    },

    // Learning Preferences (Consumable by Member 3 Personalized Content Engine)
    preferences: {
      learningMode: 'Visual', // Visual | Auditory | Kinesthetic | Reading/Writing
      preferredResources: ['Video', 'Interactive exercises'],
      preferredLanguage: 'English'
    }
  }
};

/**
 * Convenience array list of all demo students
 */
export const studentsList = Object.values(students);

/**
 * Retrieve student record by ID
 * @param {string} id - e.g. 'STU001' or 'STU002'
 * @returns {object|null} Student record or null if not found
 */
export function getStudentById(id) {
  if (!id) return null;
  return students[id] || studentsList.find(s => s.personal.studentId === id || s.id === id) || null;
}

/**
 * Retrieve all students
 * @returns {Array<object>} Array of all student objects
 */
export function getAllStudents() {
  return studentsList;
}

export default students;
