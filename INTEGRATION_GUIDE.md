# Beyond Barriers – Teacher Dashboard (Member 4 Integration Guide)

## Overview
This repository contains **Member 4's assigned module** for the project:
**"Beyond Barriers – Personalized and Inclusive Education Support System"**

This module specifically implements:
1. **Teacher Dashboard**
2. **Student Table** (8 monitoring columns)
3. **Student Risk Indicators** (`Stable`, `Needs Attention`, `Immediate Support`)
4. **Intervention Suggestions** & Interactive Completion
5. **Teacher-side student monitoring & Case Log Notes**
6. **Integration-ready adapter structure** (`src/utils/teacherRiskAdapter.js`)

---

## Directory Structure
```
src/
├── components/
│   ├── StudentTable.jsx         # 8-column monitoring table, sorting & mobile list
│   ├── TeacherStatCard.jsx      # Summary metrics with soft gradients & click-to-filter
│   ├── RiskBadge.jsx            # Stable / Needs Attention / Immediate Support badges
│   ├── InterventionCard.jsx     # Suggested intervention cards with completion toggles
│   └── StudentDetails.jsx       # Student modal with metrics, risk reasons, interventions, notes
├── pages/
│   └── Teacher.jsx              # Main Teacher Dashboard page orchestrating data & actions
├── data/
│   └── teacherDemoData.js       # DEMO DATA clearly labeled for standalone development
└── utils/
    └── teacherRiskAdapter.js    # Architectural adapter normalizing raw data for UI
```

---

## How to Integrate Team Data & Recommendation Engine

The entire dashboard is decoupled from the data source via **`src/utils/teacherRiskAdapter.js`**.
UI components do **NOT** duplicate recommendation logic or assume an exact backend format.

### Step 1: Connecting `studentData.js` (Member 1 / 2)
In `src/pages/Teacher.jsx`, replace the import:
```javascript
// Current development demo data:
import { DEMO_STUDENTS } from '../data/teacherDemoData';

// When ready, import the team's real dataset:
import { realStudentsList } from '../data/studentData';
```

### Step 2: Connecting `recommendationEngine.js` (Member 3)
If the recommendation engine produces risk scores, explanations, or intervention suggestions:
```javascript
import { runRecommendationEngine } from '../services/recommendationEngine';

// Pass both to normalizeDataset:
const recommendationsMap = runRecommendationEngine(realStudentsList);
const initialStudents = normalizeDataset(realStudentsList, recommendationsMap);
```

### Expected Field Contract (Normalized by `teacherRiskAdapter.js`):
The adapter automatically accepts and handles alternative field names, but the primary fields are:
- `id`: Student ID
- `name`: Full Name
- `course`: Enrolled degree/program
- `year`: Current academic year (e.g. "Year 2")
- `academicScore`: Number (0-100)
- `attendance`: Number (0-100)
- `learningProgress`: Number (0-100)
- `skills`: Array of strings
- `careerGoal`: Target career aspiration
- `riskStatus`: `"Stable" | "Needs Attention" | "Immediate Support"`
- `riskReasons`: Array of educational support indicator strings (e.g., "Attendance below 75%", "Missed 2 lab submissions")
- `recommendations`: Array of recommendation strings
- `suggestedInterventions`: Array of `{ id, title, description, type, priority, status, dueDate }`
- `notes`: Array of `{ id, date, author, text }`

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

---

## Important Notice on Risk Indicators
All risk reasons and indicators implemented in this module are **educational support indicators only** (such as attendance dips, assignment milestones, and learning pace slowdowns). They do **NOT** make medical, psychological, or clinical diagnoses.
