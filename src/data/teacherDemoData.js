/**
 * =========================================================================================
 * DEMO DATA: Beyond Barriers – Personalized and Inclusive Education Support System
 * =========================================================================================
 * MODULE: Member 4 – Teacher Dashboard & Student Monitoring
 * 
 * IMPORTANT NOTE:
 * This file contains MOCK / DEMO DATA for standalone development and demonstration.
 * In the final integrated project, this data will be supplied by:
 *   1. The team's central student database / API (studentData.js)
 *   2. The team's recommendation engine (recommendationEngine.js)
 * 
 * All student records pass through `src/utils/teacherRiskAdapter.js` to normalize the schema
 * before being consumed by `Teacher.jsx` and UI components.
 * =========================================================================================
 */

export const DEMO_STUDENTS = [
  {
    id: "STU-101",
    name: "Aarav Sharma",
    avatar: "AS",
    email: "aarav.sharma@campus.edu",
    course: "B.Tech Computer Science",
    year: "Year 3",
    semester: "Semester 5",
    academicScore: 54, // % or GPA out of 100
    attendance: 58,    // %
    learningProgress: 42, // % syllabus/module completion
    skills: ["Python", "C++ Basics", "HTML/CSS"],
    careerGoal: "Full Stack Software Developer",
    riskStatus: "Immediate Support",
    supportAreas: ["Attendance Support", "Financial Aid Guidance", "DSA Remedial"],
    riskReasons: [
      "Attendance is currently 58%, significantly below the 75% institutional requirement",
      "Missed 3 consecutive lab assignments in Data Structures & Algorithms",
      "Academic score declined by 18% compared to the previous semester evaluation",
      "Student reported commute challenges and requested information on emergency travel aid"
    ],
    recommendations: [
      "Immediate counselor check-in regarding attendance and commute constraints",
      "Enroll in accelerated evening peer-study cohort for Data Structures",
      "Forward application to Institutional Emergency Travel Stipend Committee"
    ],
    suggestedInterventions: [
      {
        id: "INT-101-1",
        title: "Attendance Improvement Plan",
        description: "Draft and sign a personalized attendance catch-up schedule with faculty advisor.",
        type: "Attendance",
        priority: "High",
        status: "pending",
        dueDate: "2026-09-25"
      },
      {
        id: "INT-101-2",
        title: "Suggest Scholarship Support",
        description: "Connect with Financial Aid office for semester transit grant and textbook vouchers.",
        type: "Financial",
        priority: "High",
        status: "pending",
        dueDate: "2026-09-28"
      },
      {
        id: "INT-101-3",
        title: "Schedule Mentor Follow-up",
        description: "Bi-weekly academic mentoring session with Prof. Nair for algorithm assignment support.",
        type: "Mentorship",
        priority: "Medium",
        status: "pending",
        dueDate: "2026-10-02"
      }
    ],
    notes: [
      {
        id: "NOTE-1",
        date: "2026-09-14 11:30 AM",
        author: "Prof. Ananya Sen",
        text: "Spoke with Aarav after class. He is traveling 2.5 hours each way due to family relocation. Very motivated but exhausted. Prioritize transit subsidy."
      }
    ]
  },
  {
    id: "STU-102",
    name: "Priya Patel",
    avatar: "PP",
    email: "priya.patel@campus.edu",
    course: "B.Tech Data Science & AI",
    year: "Year 2",
    semester: "Semester 3",
    academicScore: 68,
    attendance: 72,
    learningProgress: 61,
    skills: ["Python", "SQL", "Statistics", "Pandas"],
    careerGoal: "Machine Learning Engineer",
    riskStatus: "Needs Attention",
    supportAreas: ["Math Practice", "Attendance Watch", "Peer Tutoring"],
    riskReasons: [
      "Attendance is at 72% (marginally below the 75% threshold)",
      "Midterm score in Linear Algebra (58%) requires reinforcement",
      "Learning progress slowed down over the last two module checkpoints"
    ],
    recommendations: [
      "Assign a peer tutor for matrix calculus and linear algebra practice",
      "Provide asynchronous video recap access for missed lectures"
    ],
    suggestedInterventions: [
      {
        id: "INT-102-1",
        title: "Review Academic Progress",
        description: "Conduct 1-on-1 review of Linear Algebra midterm exam solutions.",
        type: "Academic",
        priority: "Medium",
        status: "pending",
        dueDate: "2026-09-26"
      },
      {
        id: "INT-102-2",
        title: "Recommend Learning Resources",
        description: "Share 3Blue1Brown interactive linear algebra series and problem sets.",
        type: "Resources",
        priority: "Low",
        status: "completed",
        dueDate: "2026-09-16"
      }
    ],
    notes: [
      {
        id: "NOTE-2",
        date: "2026-09-15 03:15 PM",
        author: "Dr. K. Raman",
        text: "Priya attended math tutorial office hours yesterday. Showed good grasp once visual intuition was explained."
      }
    ]
  },
  {
    id: "STU-103",
    name: "Rohan Iyer",
    avatar: "RI",
    email: "rohan.iyer@campus.edu",
    course: "B.Tech Computer Science",
    year: "Year 4",
    semester: "Semester 7",
    academicScore: 91,
    attendance: 94,
    learningProgress: 92,
    skills: ["React", "Node.js", "System Design", "TypeScript", "AWS"],
    careerGoal: "Cloud Architect / DevOps Engineer",
    riskStatus: "Stable",
    supportAreas: ["Capstone Mentorship", "Career Placement"],
    riskReasons: [],
    recommendations: [
      "Encourage submission of final year capstone to the National Student Innovation Expo",
      "Nominate for department peer mentoring fellowship"
    ],
    suggestedInterventions: [
      {
        id: "INT-103-1",
        title: "Skill Practice Support",
        description: "Advanced distributed systems sandbox access for capstone project.",
        type: "Skill",
        priority: "Low",
        status: "completed",
        dueDate: "2026-09-10"
      }
    ],
    notes: [
      {
        id: "NOTE-3",
        date: "2026-09-12 10:00 AM",
        author: "Prof. Ananya Sen",
        text: "Capstone proposal approved with distinction. Excellent performance throughout."
      }
    ]
  },
  {
    id: "STU-104",
    name: "Meera Nair",
    avatar: "MN",
    email: "meera.nair@campus.edu",
    course: "B.Tech Electronics & Comm.",
    year: "Year 3",
    semester: "Semester 5",
    academicScore: 49,
    attendance: 51,
    learningProgress: 38,
    skills: ["Microcontrollers", "MATLAB", "Circuit Design"],
    careerGoal: "Embedded IoT Specialist",
    riskStatus: "Immediate Support",
    supportAreas: ["Attendance Support", "Academic Recovery", "Assistive Learning"],
    riskReasons: [
      "Attendance has dropped to 51% following medical leave with incomplete makeup credits",
      "Failing grade warning in Digital Signal Processing (DSP)",
      "Severe lag in hardware laboratory practical hours (8 sessions pending)",
      "Learning pace slowed due to lack of specialized high-contrast digital lab resources"
    ],
    recommendations: [
      "Establish an individualized makeup schedule for missed laboratory hours",
      "Provide accessible digital simulation software licenses for home practice",
      "Formal academic recovery plan overseen by department head"
    ],
    suggestedInterventions: [
      {
        id: "INT-104-1",
        title: "Attendance Improvement Plan",
        description: "Formalize approved medical makeup timetable for 8 hardware lab sessions.",
        type: "Attendance",
        priority: "High",
        status: "pending",
        dueDate: "2026-09-24"
      },
      {
        id: "INT-104-2",
        title: "Review Academic Progress",
        description: "Schedule DSP subject review with course instructor Prof. Varma.",
        type: "Academic",
        priority: "High",
        status: "pending",
        dueDate: "2026-09-27"
      },
      {
        id: "INT-104-3",
        title: "Recommend Learning Resources",
        description: "Supply virtual Proteus / circuit simulation licenses for home catch-up.",
        type: "Resources",
        priority: "Medium",
        status: "completed",
        dueDate: "2026-09-17"
      }
    ],
    notes: [
      {
        id: "NOTE-4",
        date: "2026-09-16 02:45 PM",
        author: "Prof. S. Varma",
        text: "Meera submitted medical certificates covering August. She is eager to make up missed lab hours. Lab tech will supervise on Saturdays."
      }
    ]
  },
  {
    id: "STU-105",
    name: "Karan Verma",
    avatar: "KV",
    email: "karan.verma@campus.edu",
    course: "B.Tech Information Tech",
    year: "Year 1",
    semester: "Semester 1",
    academicScore: 65,
    attendance: 74,
    learningProgress: 55,
    skills: ["C Programming", "Discrete Mathematics"],
    careerGoal: "Cybersecurity Analyst",
    riskStatus: "Needs Attention",
    supportAreas: ["First-Year Transition", "Attendance Watch", "Coding Practice"],
    riskReasons: [
      "Attendance hovering at 74% (first-year transition flag)",
      "Student missed 2 programming lab submissions due to IDE setup issues",
      "Shows hesitation in team coding assignments"
    ],
    recommendations: [
      "Assign senior student buddy from ACM/IEEE student chapter",
      "Offer introductory workshop on terminal tools and version control"
    ],
    suggestedInterventions: [
      {
        id: "INT-105-1",
        title: "Schedule Mentor Follow-up",
        description: "Pair with 3rd-year peer buddy for weekly programming problem walkthrough.",
        type: "Mentorship",
        priority: "Medium",
        status: "pending",
        dueDate: "2026-09-29"
      },
      {
        id: "INT-105-2",
        title: "Skill Practice Support",
        description: "Provide beginner-friendly curated Git and Linux CLI practice modules.",
        type: "Skill",
        priority: "Low",
        status: "pending",
        dueDate: "2026-10-05"
      }
    ],
    notes: [
      {
        id: "NOTE-5",
        date: "2026-09-17 09:10 AM",
        author: "Prof. Ananya Sen",
        text: "Assisted Karan with laptop GCC compiler installation. He expressed relief and promised to attend the Monday lab on time."
      }
    ]
  },
  {
    id: "STU-106",
    name: "Ananya Deshmukh",
    avatar: "AD",
    email: "ananya.d@campus.edu",
    course: "B.Tech Data Science & AI",
    year: "Year 3",
    semester: "Semester 5",
    academicScore: 88,
    attendance: 91,
    learningProgress: 86,
    skills: ["Python", "TensorFlow", "Deep Learning", "Data Viz"],
    careerGoal: "AI Research Scientist",
    riskStatus: "Stable",
    supportAreas: ["Research Paper Writing", "Conference Grant"],
    riskReasons: [],
    recommendations: [
      "Review draft paper for submission to student track at IEEE BigData",
      "Nominate for summer undergraduate research fellowship"
    ],
    suggestedInterventions: [
      {
        id: "INT-106-1",
        title: "Suggest Scholarship Support",
        description: "Assist with university research travel grant paperwork.",
        type: "Financial",
        priority: "Low",
        status: "completed",
        dueDate: "2026-09-05"
      }
    ],
    notes: []
  },
  {
    id: "STU-107",
    name: "Vikramaditya Roy",
    avatar: "VR",
    email: "vikram.roy@campus.edu",
    course: "B.Tech Mechanical Engg",
    year: "Year 2",
    semester: "Semester 4",
    academicScore: 59,
    attendance: 64,
    learningProgress: 48,
    skills: ["AutoCAD", "Thermodynamics Basics", "SolidWorks"],
    careerGoal: "Automotive Design Engineer",
    riskStatus: "Needs Attention",
    supportAreas: ["Attendance Support", "Assignment Catch-up", "CAD Lab Access"],
    riskReasons: [
      "Attendance rate dropped to 64% over the past 4 weeks",
      "Missed CAD project milestone 1 submission",
      "Expressed difficulty accessing high-spec CAD workstations outside lab hours"
    ],
    recommendations: [
      "Provide evening extended access pass to campus CAD computing clusters",
      "Structure milestone breakdown for remaining project deliverables"
    ],
    suggestedInterventions: [
      {
        id: "INT-107-1",
        title: "Attendance Improvement Plan",
        description: "Set attendance check target of 80% for upcoming 30 days.",
        type: "Attendance",
        priority: "Medium",
        status: "pending",
        dueDate: "2026-09-30"
      },
      {
        id: "INT-107-2",
        title: "Recommend Learning Resources",
        description: "Grant campus remote-desktop access to engineering CAD software.",
        type: "Resources",
        priority: "Medium",
        status: "pending",
        dueDate: "2026-09-23"
      }
    ],
    notes: []
  },
  {
    id: "STU-108",
    name: "Zoya Fatima",
    avatar: "ZF",
    email: "zoya.fatima@campus.edu",
    course: "B.Tech Computer Science",
    year: "Year 3",
    semester: "Semester 5",
    academicScore: 84,
    attendance: 96,
    learningProgress: 88,
    skills: ["Java", "Spring Boot", "Docker", "PostgreSQL"],
    careerGoal: "Backend Systems Engineer",
    riskStatus: "Stable",
    supportAreas: ["Open Source Mentorship", "Interview Prep"],
    riskReasons: [],
    recommendations: [
      "Connect with alumni network for backend microservices internship preparation",
      "Encourage participation in regional Smart India Hackathon"
    ],
    suggestedInterventions: [
      {
        id: "INT-108-1",
        title: "Skill Practice Support",
        description: "Provide mock technical interview question bank and peer mock slots.",
        type: "Skill",
        priority: "Low",
        status: "completed",
        dueDate: "2026-09-12"
      }
    ],
    notes: [
      {
        id: "NOTE-8",
        date: "2026-09-10 04:00 PM",
        author: "Prof. Ananya Sen",
        text: "Zoya is leading the backend module for her team very competently."
      }
    ]
  },
  {
    id: "STU-109",
    name: "Devendra Choudhary",
    avatar: "DC",
    email: "devendra.c@campus.edu",
    course: "B.Tech Civil Engg",
    year: "Year 2",
    semester: "Semester 3",
    academicScore: 52,
    attendance: 55,
    learningProgress: 44,
    skills: ["Surveying", "Structural Analysis Basics", "Excel"],
    careerGoal: "Infrastructure Project Manager",
    riskStatus: "Immediate Support",
    supportAreas: ["Financial Aid Guidance", "Attendance Support", "Structural Math Remedial"],
    riskReasons: [
      "Attendance at 55%, triggering secondary warning threshold",
      "Financial stress flagged due to pending hostel and examination fees",
      "Failed first continuous assessment in Structural Analysis I",
      "Reported working part-time night shifts affecting morning class attendance"
    ],
    recommendations: [
      "Fast-track emergency financial aid fee installment request",
      "Switch morning slot lectures to afternoon tutorial recordings where feasible",
      "Enlist in student welfare emergency counseling"
    ],
    suggestedInterventions: [
      {
        id: "INT-109-1",
        title: "Suggest Scholarship Support",
        description: "Submit urgent application for Department Hardship & Tuition Waiver scheme.",
        type: "Financial",
        priority: "High",
        status: "pending",
        dueDate: "2026-09-22"
      },
      {
        id: "INT-109-2",
        title: "Attendance Improvement Plan",
        description: "Coordinate with faculty to adjust attendance minimums with flexible makeup assignments.",
        type: "Attendance",
        priority: "High",
        status: "pending",
        dueDate: "2026-09-25"
      },
      {
        id: "INT-109-3",
        title: "Schedule Mentor Follow-up",
        description: "Weekly academic checkpoint with Faculty Advisor Dr. Mukherjee.",
        type: "Mentorship",
        priority: "Medium",
        status: "pending",
        dueDate: "2026-09-29"
      }
    ],
    notes: [
      {
        id: "NOTE-9",
        date: "2026-09-15 11:00 AM",
        author: "Dr. B. Mukherjee",
        text: "Spoke with Devendra. Very sincere student facing family breadwinner pressures. Dean of Student Welfare agreed to expedite fee moratorium."
      }
    ]
  },
  {
    id: "STU-110",
    name: "Sneha Mukherjee",
    avatar: "SM",
    email: "sneha.m@campus.edu",
    course: "B.Tech Biotechnology",
    year: "Year 3",
    semester: "Semester 6",
    academicScore: 76,
    attendance: 82,
    learningProgress: 79,
    skills: ["Bioinformatics", "Python", "Genomics Tools", "R"],
    careerGoal: "Computational Biologist",
    riskStatus: "Stable",
    supportAreas: ["Data Science Bridge", "Industry Mentorship"],
    riskReasons: [],
    recommendations: [
      "Facilitate introduction to Computational Biology research lab",
      "Encourage cross-department registration in Advanced Machine Learning"
    ],
    suggestedInterventions: [
      {
        id: "INT-110-1",
        title: "Recommend Learning Resources",
        description: "Share NCBI genomics pipeline tutorials and Bioconductor packages.",
        type: "Resources",
        priority: "Low",
        status: "completed",
        dueDate: "2026-09-08"
      }
    ],
    notes: []
  }
];

export const DEMO_METADATA = {
  institution: "National Institute of Inclusive Learning",
  academicYear: "2026 - 2027",
  term: "Autumn Semester",
  lastSyncTimestamp: "2026-09-18T13:45:00Z",
  totalEnrolled: 10,
  disclaimer: "These indicators are educational support signals derived from academic activity, submissions, and attendance. They are NOT medical, psychological, or clinical diagnoses."
};
