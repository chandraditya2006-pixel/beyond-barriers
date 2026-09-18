// src/data/mockStudent.js
// Realistic mock student data for Beyond Barriers - Frontend MVP
// Designed for Ananya Sharma (B.Tech Computer Science, Year 3)

export const mockStudent = {
  id: "STU-2024-8842",
  name: "Ananya Sharma",
  avatar: "AS",
  email: "ananya.sharma@campus.edu",
  phone: "+91 98765 43210",
  course: "B.Tech Computer Science",
  department: "School of Computing & Information Technology",
  year: 3,
  semester: 5,
  rollNumber: "CS21B044",
  academicAdvisor: "Dr. Ramesh Kulkarni",
  
  // Core metrics requested
  academicScore: 52, // 52% (Needs support)
  attendance: 68,    // 68% (Below mandatory 75% threshold)
  learningProgress: 64, // 64%
  learningPace: "Moderate",
  preferredLanguage: "English (Bilingual support enabled)",
  accessibilityRequirement: "Screen Reader Friendly & High-Contrast Mode (Visual & Captioned preference)",
  financialNeed: "High (Tier-1 Need-Based Aid Candidate)",
  careerInterest: "Software Development",

  // Overall status summary - Consistent across the entire platform
  supportStatus: {
    badge: "Active Support Plan",
    severity: "warning", // 'warning' | 'danger' | 'success'
    totalCount: 3,
    highPriorityCount: 2,
    monitoringCount: 1,
    headline: "3 Detected Support Areas (2 High Priority, 1 Monitoring)",
    subtext: "Support areas identified in Attendance, Academic (DSA), and Financial Need eligibility."
  },

  // Personalization Model: Student Profile → Support Factors → Personalized Support Plan
  personalizationFactors: [
    {
      category: "Academic Performance",
      value: "52% Aggregate",
      detail: "Midterm score in DSA is 48%, OS is 54%",
      influence: "Triggers peer tutor pairing, curated visual algorithm labs, and remedial question banks."
    },
    {
      category: "Attendance Tracking",
      value: "68% Attendance",
      detail: "7% below mandatory 75% university examination cutoff",
      influence: "Generates attendance petition workflow, makeup Saturday classes, and advisor alert."
    },
    {
      category: "Learning Pace",
      value: "Moderate Pace",
      detail: "Prefers 1.5x time on recursive algorithms with step-by-step visual tracers",
      influence: "Filters out fast-paced cram courses; prioritizes self-paced interactive modules."
    },
    {
      category: "Accessibility & Inclusion",
      value: "Digital Accommodations",
      detail: "Requires captioned video lectures, high contrast UI, and accessible PDFs",
      influence: "Ensures every recommended courseware and reading resource is 100% WCAG compliant."
    },
    {
      category: "Financial Circumstances",
      value: "High Need (Tier-1)",
      detail: "Family annual income below ₹3.5 LPA",
      influence: "Fast-tracks fee concession grants, emergency book vouchers, and laptop scholarship matches."
    },
    {
      category: "Career Aspirations",
      value: "Software Development",
      detail: "Targeting Junior Software Engineer campus placements in Semester 6",
      influence: "Aligns skill benchmarks, DSA roadmaps, and industry alumni mentor matches."
    }
  ],

  // 3 Detected Support Areas (Barriers)
  barriers: [
    {
      id: "bar-1",
      category: "Attendance Support",
      shortCategory: "Attendance",
      severity: "danger",
      severityLabel: "High Priority",
      title: "Attendance Below University Minimum (68%)",
      currentValue: "68% Attendance (136 / 200 sessions)",
      threshold: "≥ 75% Mandatory Exam Cutoff",
      whyDetected: "Holistic university attendance sync logged multiple absences in August due to transit disruption and recuperation.",
      potentialImpact: "Debarment from Semester 5 laboratory exams and theory end-semester examinations if below 75% by October 30.",
      recommendedAction: "Submit formal medical leave petition to Dean of Academics and attend 4 remedial Saturday bridge sessions.",
      actionLabel: "Submit Leave Petition",
      actionType: "attendance_petition",
      resolved: false
    },
    {
      id: "bar-2",
      category: "Academic Support",
      shortCategory: "Academic",
      severity: "warning",
      severityLabel: "High Priority",
      title: "Prerequisite Difficulty: Data Structures & Algorithms",
      currentValue: "48% in Mid-Term Diagnostic Assessments",
      threshold: "≥ 65% Departmental Competency Benchmark",
      whyDetected: "Midterm diagnostic revealed difficulties with recursion trees, graph traversals, and dynamic programming.",
      potentialImpact: "Ineligibility for Semester 6 software development campus placement coding rounds and capstone projects.",
      recommendedAction: "Enroll in Beyond Barriers Visual DSA Tracer module and pair with 4th-year peer tutor Rohan Varma.",
      actionLabel: "Join DSA Peer Circle",
      actionType: "dsa_tutoring",
      resolved: false
    },
    {
      id: "bar-3",
      category: "Financial Support",
      shortCategory: "Financial",
      severity: "info",
      severityLabel: "Monitoring / Recommended",
      title: "High Financial Need - Eligible Grants Available",
      currentValue: "Family Income < ₹3.5L / annum (Tier-1 Need)",
      threshold: "Eligible for 100% Tuition & Hardware Grants",
      whyDetected: "Semester intake flagged financial barrier for semester reference textbooks, laptop upgrade, and exam fees.",
      potentialImpact: "Out-of-pocket financial strain impacting study hours and learning materials access.",
      recommendedAction: "Submit pre-verified application to Pragati Women in Tech Scholarship (₹50,000 award) closing in 5 days.",
      actionLabel: "Apply for Aid",
      actionType: "financial_aid",
      resolved: false
    }
  ],

  // Recommendations with explicit student-specific factors
  recommendations: [
    {
      id: "rec-1",
      title: "DSA Fundamentals & Visual Algorithm Tracer",
      category: "Learning Resource",
      badgeColor: "teal",
      provider: "Beyond Barriers Interactive CS Lab",
      duration: "4 weeks (Self-paced)",
      level: "Intermediate",
      rating: "4.8 / 5.0 (340 students)",
      format: "Visual Interactive Modules & Code Playground",
      whyThisRecommendation: [
        "Academic score factor: Recent DSA midterm score (48%) is 17% below batch average",
        "Career interest factor: Data structures is the primary technical filter for Software Development roles",
        "Learning pace factor: Visual step-by-step tracing accommodates your moderate, concept-first learning pace",
        "Support area factor: Directly targets Active Support Area #2 (Academic Prerequisite Difficulty)"
      ],
      actionText: "Start Learning Module",
      bookmarked: true
    },
    {
      id: "rec-2",
      title: "Pragati Tech Diversity & Merit Scholarship",
      category: "Scholarship",
      badgeColor: "emerald",
      provider: "State Education Welfare Council",
      duration: "Deadline: Oct 15, 2026",
      level: "₹50,000 / Year + Laptop Subsidy",
      rating: "Verified Partner",
      format: "Direct Bank Transfer & College Tuition Waiver",
      whyThisRecommendation: [
        "Financial need factor: Matches your Tier-1 High Need status (< ₹3.5L annual family income)",
        "Academic score factor: Your 52% aggregate satisfies the qualifying cut-off (minimum 50% required)",
        "Demographic & Course factor: Specially reserved for female students in B.Tech Computer Science",
        "Support area factor: Resolves Active Support Area #3 (Financial Resource Barrier)"
      ],
      actionText: "Review & Apply",
      bookmarked: false
    },
    {
      id: "rec-3",
      title: "1-on-1 Mentorship: Arjun Mehta (Senior SDE)",
      category: "Mentor",
      badgeColor: "indigo",
      provider: "Campus Alumni Mentorship Network",
      duration: "Bi-weekly 45-min virtual syncs",
      level: "Software Engineering & Career Prep",
      rating: "4.9 / 5.0 (42 mentees placed)",
      format: "Live 1-on-1 Video Sync & Code Reviews",
      whyThisRecommendation: [
        "Career interest factor: Directly matches your target role in Software Development",
        "Academic support factor: Arjun specializes in guiding students who need reinforcement in core DSA",
        "Pace factor: Provides tailored milestone check-ins suited to your moderate pace without overwhelming deadlines",
        "Inclusion factor: Alumni mentor experienced in supporting first-generation college students"
      ],
      actionText: "Schedule Introduction",
      bookmarked: true
    },
    {
      id: "rec-4",
      title: "Operating Systems: Concurrency & Memory Labs",
      category: "Learning Resource",
      badgeColor: "teal",
      provider: "Open Systems Courseware Initiative",
      duration: "3 weeks (15 hours)",
      level: "Core CS",
      rating: "4.7 / 5.0 (180 students)",
      format: "Browser-based Linux Kernel Simulations",
      whyThisRecommendation: [
        "Academic score factor: Midterm OS score was 54%, pulling down overall aggregate",
        "Attendance impact: Interactive labs replace missed lecture hours with practical hands-on understanding",
        "Career interest factor: Memory management and threads are heavily tested in software engineering interviews",
        "Accessibility factor: Includes closed captions and full screen-reader accessibility"
      ],
      actionText: "Access Labs",
      bookmarked: false
    },
    {
      id: "rec-5",
      title: "Full-Stack Project Sprint (React + Node.js)",
      category: "Career Guidance",
      badgeColor: "blue",
      provider: "Developer Ecosystem Hub",
      duration: "6 weeks milestone project",
      level: "Portfolio Builder",
      rating: "High Industry Relevance",
      format: "Guided Capstone Project with GitHub CI/CD",
      whyThisRecommendation: [
        "Career interest factor: Translates foundational theory into tangible Software Development portfolio proof",
        "Learning progress factor: Leverages your 64% module completion into production-ready web application projects",
        "Placement factor: Software engineering recruiters require at least 2 deployed full-stack projects on GitHub",
        "Mentorship support: Weekly code reviews ensure structured incremental progress"
      ],
      actionText: "Join Cohort",
      bookmarked: false
    },
    {
      id: "rec-6",
      title: "Campus Emergency Textbook & Tech Voucher",
      category: "Scholarship",
      badgeColor: "emerald",
      provider: "Dean of Student Affairs Office",
      duration: "Rolling applications (Closes in 5 days)",
      level: "₹12,000 book & hardware vouchers",
      rating: "Instant Approval for High-Need Tier",
      format: "Campus Bookstore & Certified Hardware Voucher",
      whyThisRecommendation: [
        "Financial need factor: Pre-approved for Tier-1 High Financial Need students without GPA restrictions",
        "Academic barrier factor: Provides prescribed DSA and Operating Systems textbooks for free",
        "Immediate relief: Fast-track 48-hour voucher disbursement cycle",
        "Support area factor: Eliminates out-of-pocket costs for essential study resources"
      ],
      actionText: "Claim Voucher",
      bookmarked: false
    }
  ],

  // Opportunities with 2-3 concrete matching factors
  opportunities: [
    {
      id: "opp-1",
      title: "Pragati Women in Technology Scholarship",
      category: "Scholarships",
      provider: "Ministry of Education & Tech Consortium",
      amount: "₹50,000 / year",
      deadline: "October 15, 2026",
      description: "Empowering female undergraduate students in Computer Science with tuition support, mentoring circles, and hardware allowances.",
      eligibility: "Female students enrolled in 3rd/4th year B.Tech CS/IT with family income below ₹5 LPA and academic standing ≥ 50%.",
      matchScore: "98% Match",
      matchingFactors: [
        "Financial need matches: Verified Tier-1 family income (< ₹3.5L/yr)",
        "Course eligibility matches: Currently enrolled in 3rd Year B.Tech CS",
        "Academic requirement met: 52% score satisfies minimum 50% criteria"
      ],
      actionText: "Apply Now",
      spotsLeft: "14 grants remaining",
      bookmarked: true
    },
    {
      id: "opp-2",
      title: "Google Generation Scholarship for Women in Tech",
      category: "Scholarships",
      provider: "Google Diversity & Inclusion",
      amount: "$1,000 Grant + Community Access",
      deadline: "November 1, 2026",
      description: "Merit-cum-need award recognizing students who demonstrate passion for computer science and leadership in technical communities.",
      eligibility: "Undergraduate students in Computing with active academic standing and community involvement.",
      matchScore: "92% Match",
      matchingFactors: [
        "Career interest aligned: Software Development & Computing degree",
        "Course eligibility matches: 3rd year Computer Science undergraduate",
        "Diversity & inclusion track: Specially geared for women in technology"
      ],
      actionText: "Apply Now",
      spotsLeft: "Open nationwide",
      bookmarked: false
    },
    {
      id: "opp-3",
      title: "Mastering Data Structures with Visual Problem Solving",
      category: "Courses",
      provider: "Beyond Barriers Academy",
      amount: "Free for Enrolled Students",
      deadline: "Starts next Monday",
      description: "Comprehensive step-by-step masterclass focusing on Arrays, Linked Lists, Trees, Heaps, and Dynamic Programming with visual diagrams.",
      eligibility: "Enrolled CS undergraduates seeking to strengthen algorithmic problem solving.",
      matchScore: "96% Match",
      matchingFactors: [
        "Current support area matched: Directly resolves DSA barrier (48% score)",
        "Learning pace aligned: Visual stepwise tracing suited to moderate pace",
        "Career prerequisite: Core requirement for Software Development interviews"
      ],
      actionText: "Enroll Free",
      spotsLeft: "8 spots left in batch",
      bookmarked: true
    },
    {
      id: "opp-4",
      title: "Practical Operating Systems & Concurrency",
      category: "Courses",
      provider: "Systems Engineering Guild",
      amount: "Free with Student ID",
      deadline: "Self-Paced Enrollment",
      description: "Learn threads, locks, semaphore synchronization, paging, and memory management through guided terminal laboratories.",
      eligibility: "Knowledge of basic C/C++ programming.",
      matchScore: "89% Match",
      matchingFactors: [
        "Academic score matched: Reinforces 54% Operating Systems mid-term",
        "Course syllabus aligned: Semester 5 B.Tech Computer Science curriculum",
        "Format suited: Self-paced practical terminal simulation modules"
      ],
      actionText: "Enroll Free",
      spotsLeft: "Self-paced",
      bookmarked: false
    },
    {
      id: "opp-5",
      title: "Arjun Mehta - Senior Software Engineer @ Microsoft",
      category: "Mentors",
      provider: "Alumni Mentorship Circle",
      amount: "Free 1-on-1 Sessions",
      deadline: "Available this Thursday & Saturday",
      description: "6+ years in distributed systems and backend engineering. Specializes in helping students overcome coding barriers and crack technical interviews.",
      eligibility: "Students aiming for Software Engineering internships or full-time roles.",
      matchScore: "97% Match",
      matchingFactors: [
        "Career interest aligned: Software Development track mentorship",
        "Support area matched: Dedicated guidance for Data Structures hurdles",
        "Campus alumni network: Senior engineer from your college department"
      ],
      actionText: "Connect with Mentor",
      spotsLeft: "3 slots open this week",
      bookmarked: true
    },
    {
      id: "opp-6",
      title: "Priya Nair - Staff Engineer @ Google Cloud",
      category: "Mentors",
      provider: "Women in Tech Mentors",
      amount: "Free Bi-weekly Sessions",
      deadline: "Bookings open for October",
      description: "Expertise in full-stack web applications, scalable APIs, and resume review for female engineers entering product companies.",
      eligibility: "3rd & 4th year computer science students.",
      matchScore: "94% Match",
      matchingFactors: [
        "Career interest aligned: Full-stack software engineering guidance",
        "Course level matched: 3rd year student transition to placement prep",
        "Diversity network: Women in Tech mentorship circle"
      ],
      actionText: "Connect with Mentor",
      spotsLeft: "2 slots open",
      bookmarked: false
    },
    {
      id: "opp-7",
      title: "Campus Hardship & Technology Access Grant",
      category: "Scholarships",
      provider: "University Welfare Trust",
      amount: "₹15,000 / semester",
      deadline: "October 8, 2026 (Urgent)",
      description: "Emergency support for students experiencing financial difficulties to cover internet, books, software tools, and transit costs.",
      eligibility: "Verified high financial need status verified by college committee.",
      matchScore: "95% Match",
      matchingFactors: [
        "Financial need matches: Pre-qualified Tier-1 aid classification",
        "Fast disbursal: 48-hour approval cycle for urgent educational needs",
        "Zero GPA barrier: No minimum cutoff required for emergency assistance"
      ],
      actionText: "Apply Now",
      spotsLeft: "20 grants",
      bookmarked: false
    },
    {
      id: "opp-8",
      title: "Full-Stack Web Development Bootcamp",
      category: "Courses",
      provider: "OpenDev Labs",
      amount: "Sponsored / 100% Scholarship",
      deadline: "Starts Oct 20, 2026",
      description: "Learn modern JavaScript, React, Node.js, REST APIs, and database design with production deployment on cloud platforms.",
      eligibility: "Open to all enrolled students with basic coding experience.",
      matchScore: "91% Match",
      matchingFactors: [
        "Career interest aligned: Industry full-stack development skills",
        "Financial accommodation: 100% sponsored fee waiver for student",
        "Project output: Deployed portfolio application for internship resume"
      ],
      actionText: "Enroll Free",
      spotsLeft: "15 spots",
      bookmarked: false
    }
  ],

  // Career Pathway & Skills
  careerPathway: {
    interest: "Software Development",
    targetRole: "Junior Software Engineer / Full-Stack Developer",
    currentStageNumber: 2,
    currentStageName: "Data Structures",
    currentStageProgress: "48% (Needs Work)",
    nextRecommendedAction: "Complete 15 LeetCode Easy/Medium Arrays & HashMaps + Attend Tuesday OS remedial lab",
    pipeline: [
      {
        id: "step-1",
        stageNumber: 1,
        title: "Programming",
        status: "Completed",
        score: "78% (Strong Foundation)",
        badge: "Completed",
        desc: "Object-oriented programming in Java and C++, syntax, memory allocation, and functions.",
        icon: "CheckCircle2",
        isCurrent: false
      },
      {
        id: "step-2",
        stageNumber: 2,
        title: "Data Structures",
        status: "In-Progress",
        score: "48% (Focus Needed)",
        badge: "Current Active Stage",
        desc: "Arrays, stacks, queues, trees, graphs, sorting, searching, recursion, and time complexity.",
        icon: "AlertCircle",
        isCurrent: true
      },
      {
        id: "step-3",
        stageNumber: 3,
        title: "Development Projects",
        status: "Upcoming",
        score: "Target: Sem 5-6",
        badge: "Next Stage",
        desc: "Build 2 full-stack projects: REST API backend, modern React frontend, and cloud deployment.",
        icon: "Clock",
        isCurrent: false
      },
      {
        id: "step-4",
        stageNumber: 4,
        title: "Internship",
        status: "Planned",
        score: "Target: Sem 6",
        badge: "Placement Milestone",
        desc: "Technical mock interviews, system design basics, resume tailoring, and campus internship drive.",
        icon: "Briefcase",
        isCurrent: false
      },
      {
        id: "step-5",
        stageNumber: 5,
        title: "Career",
        status: "Goal",
        score: "Target: Graduation",
        badge: "Target Outcome",
        desc: "Full-time placement in high-growth software engineering role at tech product company.",
        icon: "Award",
        isCurrent: false
      }
    ],

    // Skills & progress meters
    skills: [
      { name: "Programming (Java / Python)", progress: 75, target: 85, status: "Good", color: "bg-teal-500" },
      { name: "Data Structures & Algorithms", progress: 48, target: 80, status: "Needs Work", color: "bg-amber-500" },
      { name: "Web Development (HTML/CSS/JS/React)", progress: 62, target: 80, status: "On Track", color: "bg-blue-500" },
      { name: "Database Management (SQL)", progress: 58, target: 75, status: "Moderate", color: "bg-cyan-500" },
      { name: "Git & Collaborative Development", progress: 80, target: 85, status: "Strong", color: "bg-emerald-500" },
      { name: "System Design & Problem Solving", progress: 35, target: 70, status: "Beginner", color: "bg-rose-400" }
    ],

    // Recommended next steps checklist
    nextSteps: [
      {
        id: "ns-1",
        title: "Complete 15 LeetCode Easy problems in Arrays & HashMaps",
        deadline: "By next Sunday",
        priority: "High",
        estimatedTime: "5 hours",
        completed: false
      },
      {
        id: "ns-2",
        title: "Attend Tuesday remedial lab session for OS Memory Management",
        deadline: "Tuesday, 3:00 PM",
        priority: "High",
        estimatedTime: "2 hours",
        completed: false
      },
      {
        id: "ns-3",
        title: "Submit medical exemption certificate to Dean for 6 missed lecture hours",
        deadline: "Friday, 5:00 PM",
        priority: "Critical",
        estimatedTime: "30 mins",
        completed: true
      },
      {
        id: "ns-4",
        title: "Complete initial draft application for Pragati Tech Scholarship",
        deadline: "Oct 12, 2026",
        priority: "Medium",
        estimatedTime: "1 hour",
        completed: false
      },
      {
        id: "ns-5",
        title: "Book 1st mentorship intro with Arjun Mehta via Campus Portal",
        deadline: "Thursday",
        priority: "Medium",
        estimatedTime: "15 mins",
        completed: true
      }
    ]
  },

  // Historical and analytical data for Recharts
  progressData: {
    academicTrend: [
      { semester: "Sem 1", score: 68, target: 70, benchmark: 60 },
      { semester: "Sem 2", score: 64, target: 70, benchmark: 60 },
      { semester: "Sem 3", score: 58, target: 70, benchmark: 60 },
      { semester: "Sem 4", score: 55, target: 70, benchmark: 60 },
      { semester: "Sem 5 (Current)", score: 52, target: 70, benchmark: 60 },
      { semester: "Sem 5 (Projected)", score: 65, target: 70, benchmark: 60 }
    ],

    attendanceTrend: [
      { month: "June", attendance: 88, threshold: 75 },
      { month: "July", attendance: 82, threshold: 75 },
      { month: "August", attendance: 71, threshold: 75 },
      { month: "September", attendance: 68, threshold: 75 },
      { month: "October (Projected)", attendance: 76, threshold: 75 }
    ],

    subjectPerformance: [
      { subject: "Data Structures", score: 48, average: 65, target: 75 },
      { subject: "Operating Systems", score: 54, average: 62, target: 75 },
      { subject: "Database Systems", score: 65, average: 67, target: 75 },
      { subject: "Computer Networks", score: 56, average: 64, target: 75 },
      { subject: "Software Engineering", score: 62, average: 70, target: 75 },
      { subject: "Discrete Math", score: 52, average: 60, target: 75 }
    ],

    weeklyHours: [
      { day: "Mon", hours: 2.5, recommended: 3.5 },
      { day: "Tue", hours: 1.8, recommended: 3.5 },
      { day: "Wed", hours: 3.0, recommended: 3.5 },
      { day: "Thu", hours: 2.0, recommended: 3.5 },
      { day: "Fri", hours: 1.5, recommended: 3.5 },
      { day: "Sat", hours: 4.5, recommended: 4.0 },
      { day: "Sun", hours: 3.2, recommended: 3.0 }
    ]
  },

  // Student Passport comprehensive sections
  passportSections: {
    personal: {
      fullName: "Ananya Sharma",
      dob: "14 November 2004",
      studentId: "STU-2024-8842",
      campus: "Main Tech Campus (Block B)",
      residentialStatus: "Day Scholar (Commuter)",
      emergencyContact: "Mrs. Sunita Sharma (Mother) - +91 98765 11223"
    },
    academic: {
      degree: "Bachelor of Technology",
      major: "Computer Science & Engineering",
      currentSemester: "Semester 5 (Year 3)",
      creditsCompleted: "88 / 160 Credits",
      cgpa: "5.4 / 10.0 (52% equivalent)",
      currentBacklogs: "0 Active Backlogs (2 subjects at risk)"
    },
    attendance: {
      currentPercentage: "68%",
      classesAttended: "136 / 200 Sessions",
      classesNeededFor75: "16 consecutive sessions required to cross 75%",
      status: "At Risk (Debarment Warning Issued)"
    },
    learningStyle: {
      pace: "Moderate (Needs 1.5x time on abstract algorithmic concepts)",
      preferredFormat: "Interactive visual playgrounds & annotated video snippets",
      groupPreference: "Small peer study circles (2-3 students)",
      evaluationStrengths: "Hands-on coding assignments > Written theory tests"
    },
    language: {
      primary: "English",
      secondary: "Hindi",
      supportNeeded: "Technical terminology clarification & bilingual study notes enabled"
    },
    accessibility: {
      status: "Active Digital Accommodations Verified",
      featuresEnabled: [
        "Screen Reader Friendly (ARIA compliant)",
        "High-Contrast Interface Mode",
        "Captioned & Subtitled Video Courseware",
        "Keyboard-Only Navigable Workspaces",
        "Extended Time Allowance on Coding Quizzes (1.25x)"
      ],
      sensoryAccommodations: "High audio clarity, dyslexia-friendly font compatibility",
      mobilityAssistance: "None required - Day scholar commuter",
      inclusionCoordinator: "Campus Center for Universal Design & Inclusion"
    },
    financial: {
      classification: "High Need (Tier 1 Priority)",
      annualFamilyIncome: "Below ₹3,50,000",
      feeStatus: "Partially Funded / Seeking Scholarship",
      eligibleAidTypes: ["State Post-Matric Grant", "Corporate STEM Women Aid", "Campus Welfare Book Fund"]
    },
    career: {
      primaryInterest: "Software Development",
      secondaryInterest: "Cloud Applications & Web Engineering",
      targetGraduation: "June 2027",
      readinessLevel: "Foundation Stage (Strengthening Core Algorithms)"
    }
  }
};
