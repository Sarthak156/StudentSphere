export type UserRole = 'superadmin' | 'principal' | 'hod' | 'coordinator' | 'faculty' | 'student';

export interface BranchInfo {
  code: string;
  name: string;
  shortName: string;
}

export const IPS_BRANCHES: BranchInfo[] = [
  { code: 'CS', name: 'Computer Science & Engineering', shortName: 'CSE' },
  { code: 'IT', name: 'Computer Science & Information Technology', shortName: 'CS & IT' },
  { code: 'DS', name: 'Computer Science & Engineering (Data Science)', shortName: 'CSE (DS)' },
  { code: 'AI', name: 'Computer Science & Engineering (AI & Machine Learning)', shortName: 'CSE (AI & ML)' },
  { code: 'IO', name: 'Computer Science & Engineering (IoT & CSITS)', shortName: 'CSE (IoT)' },
  { code: 'EC', name: 'Electronics & Communication Engineering', shortName: 'ECE' },
  { code: 'EE', name: 'Electrical & Electronics Engineering', shortName: 'EEE' },
  { code: 'CE', name: 'Civil Engineering', shortName: 'Civil' },
  { code: 'ME', name: 'Mechanical Engineering', shortName: 'Mechanical' },
  { code: 'CH', name: 'Chemical Engineering', shortName: 'Chemical' },
  { code: 'FT', name: 'Fire Technology & Safety Engineering', shortName: 'Fire Tech' },
  { code: 'FY', name: 'B.Tech First Year (Common)', shortName: 'First Year' },
];

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  branch?: string;
  department?: string; // Backwards compatibility alias for branch
  branchCode?: string;
  hodOfBranch?: string;  // HOD's assigned branch code
  assignedSections?: string[];
  assignedSubjects?: { code: string; name: string; branch: string; semester: number; sections: string[] }[];
  assignedStudents?: string[];
  coordinatorOf?: { branch: string; branchCode: string; semester: number; section: string };
}

export interface CourseResult {
  code: string;
  name: string;
  credits: number;
  grade: string;
  score: number;
  attendance: number;
}

export interface SemesterResult {
  semester: number;
  year: string;
  gpa: number;
  credits: number;
  status: 'passed' | 'failed' | 'ongoing';
  courses: CourseResult[];
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  dueDate: string;
  submittedDate?: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  score?: number;
  maxScore: number;
  feedback?: string;
}

export interface AttendanceRecord {
  date: string;
  course: string;
  courseCode: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface Lecture {
  id: string;
  time: string;
  subjectName: string;
  subjectCode: string;
  section: string;
  room: string;
  status: 'upcoming' | 'completed' | 'ongoing';
  attendanceMarked: boolean;
}

export interface TimetableSlot {
  day: string;
  time: string;
  subject: string;
  code: string;
  room: string;
  faculty: string;
}

export interface InternalMark {
  subjectCode: string;
  subjectName: string;
  mst1: number;
  mst2: number;
  assignmentMarks: number;
  attendanceMarks: number;
  totalInternal: number;
}

export interface PlacementUpdate {
  id: string;
  companyName: string;
  role: string;
  ctc: string;
  eligibility: string;
  driveDate: string;
  status: 'Open' | 'Closed' | 'Shortlisting';
}

export interface Student {
  id: string; // e.g. STU-231042
  computerCode: string; // e.g. 231042
  enrollmentNo: string; // e.g. 0808DS231042
  name: string;
  email: string;
  avatar: string;
  institute: string;
  branch: string;
  department?: string; // Backwards compatibility alias for branch
  branchCode: string;
  year: number;
  semester: number;
  section: string; // e.g. T-1, S-1, DS-1, F-1
  rollNumber: string;
  admissionYear: number;
  coordinatorName: string;
  facultyAdvisor: string;
  gpa: number;
  cgpa: number;
  rank: number;
  rankChange: number;
  status: 'active' | 'inactive' | 'on-leave' | 'graduated';
  scores: {
    academic: number;
    social: number;
    physical: number;
    looks: number;
    communication: number;
    skills: number;
  };
  achievements: string[];
  joinDate: string;
  lastActive: string;
  phone: string;
  address: string;
  dob: string;
  bloodGroup: string;
  emergencyContact: string;
  fatherName: string;
  motherName: string;
  semesterResults: SemesterResult[];
  assignments: Assignment[];
  attendance: AttendanceRecord[];
  internalMarks: InternalMark[];
  totalCredits: number;
  completedCredits: number;
  backlogs: number;
  mentorName?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'event' | 'urgent' | 'general';
  pinned: boolean;
  author: string;
  date: string;
  targetAudience: UserRole[];
  targetBranch?: string;
  targetSemester?: number;
  targetSection?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
  room: string;
}

const avatars = [
  'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/11156392/pexels-photo-11156392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/36432730/pexels-photo-36432730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/35681211/pexels-photo-35681211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
];

const teacherAvatars = [
  'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/36432730/pexels-photo-36432730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
];

/**
 * OFFICIAL IPS ACADEMY - IES SCHEME & SYLLABUS (Based on provided PDFs + RGPV AICTE Flexible Curriculum)
 * Sources:
 * - Group-A I Yr I Sem : MA01 Linear Algebra, PY01 Optics & Modern Physics, ME01 Engg Graphics, CE01 Basic Civil, EC01 Basic Electronics, CS01 Programming for Problem Solving
 * - I Yr II Sem Group A/B : MA02 Diff Eq, CY01 Engg Chemistry, EC01(P) etc, CS01(B) Programming Lab
 * - III SEM (Data Science): MA03 Probability and Statistics, DS01 Data Communication, DS02 Data Structures and Algorithm, DS03 Computer System Organization, DS04 Foundation of Data Science, HS04 EPM + DS01(P) Python Lab
 * - IV SEM onwards inferred from RGPV + IPS PDFs: IV SEM = MA04 Discrete Math, DS05 OS, DS06 DBMS, DS07 OOP, etc
 * - V-VIII SEM from provided syllabus PDFs names: V SEM SCHEME, VI SEM SCHEME-1, VII, VIII
 * - Fire Tech FT has separate PCC codes: FT301 Fire Science, FT302 Hydraulics etc (from syllabus link)
 * - CSERC 2022 batch scheme also included as reference for CS
 */

// Full realistic syllabus by semester for IPS Academy IES (Year wise progression)
const FULL_SYLLABUS: Record<string, Record<number, { code: string; name: string; credits: number }[]>> = {
  FY: {
    // First Year Common Group A (CSE, DS, AI, RC)
    1: [
      { code: 'BSC MA01', name: 'Linear Algebra (MA01)', credits: 3 },
      { code: 'BSC PY01', name: 'Optics & Modern Physics (PY01)', credits: 3 },
      { code: 'ESC ME01', name: 'Engineering Graphics & Visualization (ME01)', credits: 2 },
      { code: 'ESC CE01', name: 'Basic Civil Engineering (CE01)', credits: 2 },
      { code: 'ESC EC01', name: 'Basic Electronics Engineering (EC01)', credits: 2 },
      { code: 'ESC CS01', name: 'Programming for Problem Solving (CS01)', credits: 4 },
    ],
    2: [
      { code: 'BSC MA02', name: 'Differential Equations & Transform (MA02)', credits: 3 },
      { code: 'BSC CY01', name: 'Engineering Chemistry (CY01)', credits: 3 },
      { code: 'ESC ME02', name: 'Basic Mechanical Engineering (ME02)', credits: 2 },
      { code: 'ESC CE02', name: 'Engineering Mechanics (CE02)', credits: 2 },
      { code: 'ESC EC02', name: 'Digital Systems & Computer Workshop', credits: 2 },
      { code: 'ESC CS01(P)', name: 'Programming for Problem Solving Lab (CS01-P)', credits: 1 },
      { code: 'SBC EC01(P)', name: 'Electronics & Computer Workshop', credits: 1 },
    ],
  },
  DS: {
    1: [
      { code: 'BSC MA01', name: 'Linear Algebra', credits: 3 },
      { code: 'BSC PY01', name: 'Optics & Modern Physics', credits: 3 },
      { code: 'ESC ME01', name: 'Engineering Graphics & Visualization', credits: 2 },
      { code: 'ESC EC01', name: 'Basic Electronics Engineering', credits: 2 },
      { code: 'ESC CS01', name: 'Programming for Problem Solving', credits: 4 },
    ],
    2: [
      { code: 'BSC MA02', name: 'Differential Equations & Calculus', credits: 3 },
      { code: 'BSC CY01', name: 'Engineering Chemistry', credits: 3 },
      { code: 'ESC ME02', name: 'Basic Mechanical Engineering', credits: 2 },
      { code: 'ESC CE02', name: 'Engineering Mechanics', credits: 2 },
      { code: 'ESC CS02', name: 'Programming in C & Data Handling', credits: 4 },
    ],
    3: [
      { code: 'BSC MA03', name: 'Probability and Statistics (MA03)', credits: 3 },
      { code: 'PCC DS01', name: 'Data Communication (DS01)', credits: 3 },
      { code: 'PCC DS02', name: 'Data Structures and Algorithm (DS02)', credits: 3 },
      { code: 'PCC DS03', name: 'Computer System Organization (DS03)', credits: 3 },
      { code: 'PCC DS04', name: 'Foundation of Data Science (DS04)', credits: 3 },
      { code: 'HSMC HS04', name: 'Entrepreneurship Principles of Management (HS04)', credits: 1 },
      { code: 'LC DS01(P)', name: 'Programming in Python Lab (DS01-P)', credits: 2 },
    ],
    4: [
      { code: 'BSC MA04', name: 'Discrete Mathematics (MA04)', credits: 3 },
      { code: 'PCC DS05', name: 'Operating System (DS05)', credits: 3 },
      { code: 'PCC DS06', name: 'Database Management System (DS06)', credits: 3 },
      { code: 'PCC DS07', name: 'Object Oriented Programming with Java (DS07)', credits: 3 },
      { code: 'PCC DS08', name: 'Computer Networks & Security (DS08)', credits: 3 },
      { code: 'HSMC HS05', name: 'Professional Ethics & Human Values', credits: 1 },
    ],
    5: [
      { code: 'PCC DS09', name: 'Theory of Computation (DS09)', credits: 3 },
      { code: 'PCC DS10', name: 'Design & Analysis of Algorithms (DS10)', credits: 3 },
      { code: 'PCC DS11', name: 'Machine Learning Techniques (DS11)', credits: 3 },
      { code: 'PCC DS12', name: 'Data Analytics & Visualization (DS12)', credits: 3 },
      { code: 'PEC DS13', name: 'Elective-I: Advanced DBMS / Data Warehousing (DS13)', credits: 3 },
      { code: 'OEC CS01', name: 'Open Elective: Cloud Computing (OEC)', credits: 3 },
    ],
    6: [
      { code: 'PCC DS14', name: 'Deep Learning & Neural Networks (DS14)', credits: 3 },
      { code: 'PCC DS15', name: 'Big Data Analytics & Hadoop Architecture (DS15)', credits: 3 },
      { code: 'PEC DS16', name: 'Data Visualization & Business Intelligence Lab', credits: 3 },
      { code: 'PEC DS17', name: 'Computer Vision & Image Processing (DS17)', credits: 3 },
      { code: 'OEC CS02', name: 'Blockchain Technology / Knowledge Management', credits: 3 },
      { code: 'PROJ DS18', name: 'Minor Project - 2 & Internship-III (DS18)', credits: 2 },
    ],
    7: [
      { code: 'PCC DS19', name: 'Natural Language Processing & LLMs (DS19)', credits: 3 },
      { code: 'PEC DS20', name: 'Elective-III: Streaming Data & Real-Time Analytics', credits: 3 },
      { code: 'PEC DS21', name: 'Elective-IV: Generative AI & Adversarial ML', credits: 3 },
      { code: 'PROJ DS22', name: 'Major Project Phase-I (DS22)', credits: 4 },
      { code: 'INT DS23', name: 'Evaluation of Internship-II (INT)', credits: 3 },
    ],
    8: [
      { code: 'PEC DS24', name: 'Reinforcement Learning & Robotics (DS24)', credits: 3 },
      { code: 'OEC DS25', name: 'Industry 4.0 & IoT Analytics', credits: 3 },
      { code: 'PROJ DS26', name: 'Major Project Phase-II (DS26)', credits: 6 },
    ],
  },
  CS: {
    3: [
      { code: 'BSC CS301', name: 'Discrete Mathematics & Graph Theory (MA04)', credits: 3 },
      { code: 'PCC CS01', name: 'Data Structures using C++ (CS01)', credits: 3 },
      { code: 'PCC CS02', name: 'Digital Electronics & Logic Design (CS02)', credits: 3 },
      { code: 'PCC CS03', name: 'Computer System Organization (CS03)', credits: 3 },
      { code: 'PCC CS04', name: 'Object Oriented Programming & Methodology', credits: 3 },
    ],
    4: [
      { code: 'PCC CS05', name: 'Data Communication & Computer Networks (CS05)', credits: 3 },
      { code: 'PCC CS06', name: 'Operating System (CS06)', credits: 3 },
      { code: 'PCC CS07', name: 'Database Management System (CS07)', credits: 3 },
      { code: 'PCC CS08', name: 'Software Engineering (CS08)', credits: 3 },
      { code: 'PCC CS09', name: 'Design & Analysis of Algorithms (CS09)', credits: 3 },
    ],
    5: [
      { code: 'PCC CS10', name: 'Theory of Computation (CS10)', credits: 3 },
      { code: 'PCC CS11', name: 'Compiler Design (CS11)', credits: 3 },
      { code: 'PCC CS501', name: 'Theory of Computation Lab', credits: 3 },
      { code: 'PCC CS502', name: 'Database Management Systems Lab', credits: 3 },
      { code: 'PEC CS503', name: 'Elective: Data Analytics / Pattern Recognition / Cyber Security', credits: 3 },
    ],
    6: [
      { code: 'PCC CS601', name: 'Machine Learning (CS-601)', credits: 3 },
      { code: 'PCC CS602', name: 'Computer Networks (CS-602)', credits: 3 },
      { code: 'PEC CS603', name: 'Dept Elective: Advanced Computer Architecture / CG & Visualization / Compiler Design (CS-603)', credits: 3 },
      { code: 'OEC CS604', name: 'Open Elective: Knowledge Management / Project Management / Rural Technology (CS-604)', credits: 3 },
      { code: 'LC CS605', name: 'Data Analytics Lab (CS-605)', credits: 2 },
      { code: 'PROJ CS608', name: 'Minor Project-2 (CS-608)', credits: 2 },
    ],
    7: [
      { code: 'PCC CS701', name: 'Artificial Intelligence & Expert Systems', credits: 3 },
      { code: 'PEC CS702', name: 'Elective: Cloud Computing / Big Data / IoT', credits: 3 },
      { code: 'PROJ CS703', name: 'Major Project Phase-I', credits: 4 },
    ],
    8: [
      { code: 'PROJ CS801', name: 'Major Project Phase-II', credits: 6 },
      { code: 'OEC CS802', name: 'Open Elective: Optimization for ML', credits: 3 },
    ],
  },
  AI: {
    3: [
      { code: 'BSC MA03', name: 'Probability and Statistics for AI (MA03)', credits: 3 },
      { code: 'PCC AI01', name: 'Mathematical Foundations for AI (AI01)', credits: 3 },
      { code: 'PCC AI02', name: 'Data Structures and Algorithms in Python (AI02)', credits: 3 },
      { code: 'PCC AI03', name: 'Data Communication & Networking (AI03)', credits: 3 },
      { code: 'PCC AI04', name: 'Foundations of Data Science (AI04)', credits: 3 },
    ],
    4: [
      { code: 'BSC MA04', name: 'Discrete Mathematics (MA04)', credits: 3 },
      { code: 'PCC AI05', name: 'Artificial Intelligence & Search Strategies (AI05)', credits: 3 },
      { code: 'PCC AI06', name: 'Operating Systems (AI06)', credits: 3 },
      { code: 'PCC AI07', name: 'Database Management for AI (AI07)', credits: 3 },
      { code: 'PCC AI08', name: 'Probabilistic Modeling & Statistics (AI08)', credits: 3 },
    ],
    5: [
      { code: 'PCC AI09', name: 'Supervised & Unsupervised Learning (AI09)', credits: 3 },
      { code: 'PCC AI10', name: 'Natural Language Processing & Transformers (AI10)', credits: 3 },
      { code: 'PCC AI11', name: 'Design & Analysis of Algorithms (AI11)', credits: 3 },
      { code: 'PCC AI12', name: 'Computer Vision Fundamentals (AI12)', credits: 3 },
    ],
    6: [
      { code: 'PCC AI13', name: 'Computer Vision & Image Processing (AI13)', credits: 3 },
      { code: 'PCC AI14', name: 'Reinforcement Learning & Robotics (AI14)', credits: 3 },
      { code: 'PEC AI15', name: 'Generative AI & LLM Systems (AI15)', credits: 3 },
      { code: 'OEC AI16', name: 'AI Ethics, Governance & Safety (AI16)', credits: 3 },
      { code: 'PROJ AI17', name: 'Minor Project & Deep Learning Lab', credits: 2 },
    ],
    7: [
      { code: 'PEC AI18', name: 'Elective: Adversarial ML / Streaming Analytics', credits: 3 },
      { code: 'PROJ AI19', name: 'Major Project Phase-I', credits: 4 },
    ],
    8: [
      { code: 'PROJ AI20', name: 'Major Project Phase-II & Industry Internship', credits: 6 },
    ],
  },
  IT: {
    3: [
      { code: 'BSC IT01', name: 'Discrete Structures (MA04)', credits: 3 },
      { code: 'PCC IT01', name: 'Data Structures & Algorithm (IT01)', credits: 3 },
      { code: 'PCC IT02', name: 'Digital Logic & Computer Organization', credits: 3 },
      { code: 'PCC IT03', name: 'Object Oriented Programming', credits: 3 },
    ],
    4: [
      { code: 'PCC IT04', name: 'Operating Systems (IT04)', credits: 3 },
      { code: 'PCC IT05', name: 'Database Management Systems (IT05)', credits: 3 },
      { code: 'PCC IT06', name: 'Computer Networks (IT06)', credits: 3 },
      { code: 'PCC IT07', name: 'Software Engineering', credits: 3 },
    ],
    5: [
      { code: 'PCC IT08', name: 'Theory of Computation', credits: 3 },
      { code: 'PCC IT09', name: 'Data Analytics', credits: 3 },
      { code: 'PCC IT10', name: 'Web Technology', credits: 3 },
    ],
    6: [
      { code: 'PCC IT11', name: 'Machine Learning', credits: 3 },
      { code: 'PCC IT12', name: 'Big Data & Cloud Computing', credits: 3 },
      { code: 'PEC IT13', name: 'Blockchain & Cyber Security', credits: 3 },
    ],
  },
  FT: {
    3: [
      { code: 'PCC FT01', name: 'Fundamentals of Fire Science (FT01)', credits: 3 },
      { code: 'PCC FT02', name: 'Applied Hydraulics & Fluid Mechanics (FT02)', credits: 3 },
      { code: 'PCC FT03', name: 'Fire Chemistry & Thermodynamics (FT03)', credits: 3 },
      { code: 'PCC FT04', name: 'Building Materials & Construction (FT04)', credits: 3 },
    ],
    4: [
      { code: 'PCC FT05', name: 'Fire Suppression & Detection Systems (FT05)', credits: 3 },
      { code: 'PCC FT06', name: 'Industrial Safety Engineering (FT06)', credits: 3 },
      { code: 'PCC FT07', name: 'Electrical Fire Safety (FT07)', credits: 3 },
      { code: 'PCC FT08', name: 'Fire Fighting Hydraulics & Pumps', credits: 3 },
    ],
    5: [
      { code: 'PCC FT09', name: 'Building Construction & Fire Protection (FT09)', credits: 3 },
      { code: 'PCC FT10', name: 'Disaster Management & Emergency Planning (FT10)', credits: 3 },
      { code: 'PCC FT11', name: 'Industrial Hygiene & Occupational Health', credits: 3 },
    ],
    6: [
      { code: 'PCC FT12', name: 'Hazard Identification & Risk Analysis - HIRA (FT12)', credits: 3 },
      { code: 'PCC FT13', name: 'Occupational Health & Safety Legislation (FT13)', credits: 3 },
      { code: 'PEC FT14', name: 'Petrochemical & Oil Refinery Fire Safety (FT14)', credits: 3 },
      { code: 'OEC FT15', name: 'Safety Audit & Loss Prevention (FT15)', credits: 3 },
    ],
  },
};

// Compatibility map for older generic usage
const SYLLABUS_MAP: Record<string, { code: string; name: string }[]> = {
  DS: FULL_SYLLABUS.DS[6] || FULL_SYLLABUS.DS[3],
  CS: FULL_SYLLABUS.CS[6] || FULL_SYLLABUS.CS[3],
  AI: FULL_SYLLABUS.AI[6] || FULL_SYLLABUS.AI[3],
  IT: FULL_SYLLABUS.IT[6] || FULL_SYLLABUS.IT[3],
  FT: FULL_SYLLABUS.FT[6] || FULL_SYLLABUS.FT[3],
  IO: FULL_SYLLABUS.DS[6],
  EC: FULL_SYLLABUS.DS[6],
  EE: FULL_SYLLABUS.DS[6],
  ME: FULL_SYLLABUS.DS[6],
  CE: FULL_SYLLABUS.DS[6],
  CH: FULL_SYLLABUS.DS[6],
  COMMON: FULL_SYLLABUS.FY[1],
};

const getCoursesForSem = (sem: number, branchCode: string): CourseResult[] => {
  // Resolve syllabus: first try FULL_SYLLABUS[branch][sem], fallback to FY for sem 1-2, else generic CS
  const branchSyllabus = FULL_SYLLABUS[branchCode] || FULL_SYLLABUS['CS'];
  const fySyllabus = FULL_SYLLABUS['FY'];
  let subjectList: { code: string; name: string; credits: number }[] = [];

  if (sem === 1 || sem === 2) {
    subjectList = (fySyllabus[sem] as any) || FULL_SYLLABUS.FY[1];
  } else {
    subjectList = (branchSyllabus[sem] as any) || branchSyllabus[6] || FULL_SYLLABUS.CS[6] || [];
  }

  const courses: CourseResult[] = [];
  subjectList.slice(0, 5).forEach((c, i) => {
    const grades = ['A', 'A-', 'B+', 'B', 'A', 'B+'];
    const scores = [89, 84, 78, 82, 91, 76];
    const atts = [92, 87, 83, 89, 95, 81];
    courses.push({
      code: c.code,
      name: c.name,
      credits: c.credits || (i < 2 ? 4 : 3),
      grade: grades[i % grades.length],
      score: scores[i % scores.length] + Math.floor((Math.random() - 0.5) * 6),
      attendance: atts[i % atts.length] + Math.floor((Math.random() - 0.5) * 6),
    });
  });
  return courses;
};

// CRITICAL FIX: Only generate semesters up to currentSem!
const generateSemesterResults = (baseGpa: number, currentSem: number, branchCode: string): SemesterResult[] => {
  const results: SemesterResult[] = [];
  const years = ['2022-23', '2022-23', '2023-24', '2023-24', '2024-25', '2024-25', '2025-26', '2025-26'];

  for (let s = 1; s <= currentSem; s++) {
    const isOngoing = s === currentSem;
    const gpa = isOngoing ? baseGpa : Math.min(10.0, Math.max(6.5, baseGpa + (Math.sin(s) * 0.6)));
    results.push({
      semester: s,
      year: years[s - 1] || '2024-25',
      gpa: Math.round(gpa * 100) / 100,
      credits: s <= 2 ? 15 : 14,
      status: isOngoing ? 'ongoing' : 'passed',
      courses: getCoursesForSem(s, branchCode),
    });
  }
  return results;
};

const generateAssignments = (branchCode: string): Assignment[] => {
  const list = SYLLABUS_MAP[branchCode] || SYLLABUS_MAP.CS;
  return [
    {
      id: 'ASN-001',
      title: 'Lab Implementation: Balanced AVL Trees & Red-Black Trees',
      course: list[6]?.name || 'Deep Learning & Neural Networks',
      courseCode: list[6]?.code || 'PCC-DS601',
      dueDate: '2026-04-12',
      status: 'pending',
      maxScore: 50,
    },
    {
      id: 'ASN-002',
      title: 'Mini Project: Distributed MapReduce Engine Evaluation',
      course: list[7]?.name || 'Big Data Analytics & Hadoop Architecture',
      courseCode: list[7]?.code || 'PCC-DS602',
      dueDate: '2026-04-18',
      status: 'submitted',
      submittedDate: '2026-04-10',
      maxScore: 100,
    },
    {
      id: 'ASN-003',
      title: 'Case Study: Cloud Storage Security Policies & IAM Roles',
      course: list[9]?.name || 'Cloud Computing & Distributed Data',
      courseCode: list[9]?.code || 'OEC-DS601',
      dueDate: '2026-03-28',
      submittedDate: '2026-03-25',
      status: 'graded',
      score: 46,
      maxScore: 50,
      feedback: 'Splendid architectural breakdown and precise security boundary mapping.',
    },
  ];
};

const generateAttendance = (branchCode: string): AttendanceRecord[] => {
  const list = SYLLABUS_MAP[branchCode] || SYLLABUS_MAP.CS;
  const records: AttendanceRecord[] = [];
  const dates = ['2026-03-30', '2026-03-31', '2026-04-01', '2026-04-02', '2026-04-03', '2026-04-06', '2026-04-07', '2026-04-08'];
  const statuses: ('present' | 'absent' | 'late' | 'excused')[] = ['present', 'present', 'present', 'present', 'present', 'present', 'absent', 'late'];

  dates.forEach(date => {
    list.slice(6, 10).forEach((c, idx) => {
      records.push({
        date,
        course: c.name,
        courseCode: c.code,
        status: statuses[(idx + date.charCodeAt(9)) % statuses.length],
      });
    });
  });
  return records.reverse();
};

const generateInternalMarks = (branchCode: string): InternalMark[] => {
  const list = SYLLABUS_MAP[branchCode] || SYLLABUS_MAP.CS;
  return list.slice(6, 10).map((c, i) => ({
    subjectCode: c.code,
    subjectName: c.name,
    mst1: [18, 19, 17, 20][i],
    mst2: [19, 18, 20, 19][i],
    assignmentMarks: 10,
    attendanceMarks: 5,
    totalInternal: [52, 52, 52, 54][i],
  }));
};

export const PLACEMENT_UPDATES: PlacementUpdate[] = [
  {
    id: 'PLC-01',
    companyName: 'TCS Digital & Ninja Campus Drive',
    role: 'System Engineer / Digital Innovator',
    ctc: '₹7.20 LPA (Digital) / ₹3.60 LPA (Ninja)',
    eligibility: 'B.Tech All Branches (CGPA >= 6.5, No Active Backlogs)',
    driveDate: '2026-04-20',
    status: 'Open',
  },
  {
    id: 'PLC-02',
    companyName: 'Infosys HackWithInfy 2026',
    role: 'Power Programmer / Specialist Programmer',
    ctc: '₹9.50 LPA - ₹11.00 LPA',
    eligibility: 'CSE, IT, DS, AI, IoT (CGPA >= 7.0)',
    driveDate: '2026-04-25',
    status: 'Open',
  },
  {
    id: 'PLC-03',
    companyName: 'Persistent Systems Ltd.',
    role: 'Software Engineer - AI & Data',
    ctc: '₹6.80 LPA + Performance Bonus',
    eligibility: 'CSE, IT, DS, AI, ECE (CGPA >= 6.5)',
    driveDate: '2026-05-02',
    status: 'Shortlisting',
  },
];

export const FACULTY_LECTURES: Lecture[] = [
  {
    id: 'LEC-01',
    time: '09:30 AM - 10:30 AM',
    subjectName: 'Deep Learning & Neural Networks',
    subjectCode: 'PCC-DS601',
    section: 'T-1',
    room: 'IES Room 405 (AI/DS Block)',
    status: 'upcoming',
    attendanceMarked: false,
  },
  {
    id: 'LEC-02',
    time: '11:30 AM - 12:30 PM',
    subjectName: 'Big Data Analytics & Hadoop Architecture',
    subjectCode: 'PCC-DS602',
    section: 'T-2',
    room: 'IES Room 402 (AI/DS Block)',
    status: 'upcoming',
    attendanceMarked: false,
  },
  {
    id: 'LEC-03',
    time: '02:00 PM - 03:00 PM',
    subjectName: 'Foundations of Data Science & Python',
    subjectCode: 'PCC-DS501',
    section: 'S-1',
    room: 'IES Room 310 (Core Lab)',
    status: 'upcoming',
    attendanceMarked: true,
  },
];

export const STUDENT_TIMETABLE: TimetableSlot[] = [
  { day: 'Mon', time: '09:30 - 10:30', subject: 'Deep Learning & Neural Networks', code: 'PCC-DS601', room: 'Room 405', faculty: 'Prof. Amit Verma' },
  { day: 'Mon', time: '10:30 - 11:30', subject: 'Big Data Analytics & Hadoop Architecture', code: 'PCC-DS602', room: 'Room 405', faculty: 'Dr. Rajeshwar Singh' },
  { day: 'Mon', time: '11:30 - 01:30', subject: 'Deep Learning Lab / Mini Project', code: 'PCC-DS601L', room: 'DS Lab 2', faculty: 'Prof. Amit Verma' },
  { day: 'Tue', time: '09:30 - 10:30', subject: 'Data Visualization & Business Intelligence', code: 'PEC-DS603', room: 'Room 405', faculty: 'Dr. Neha Kulkarni' },
  { day: 'Tue', time: '10:30 - 11:30', subject: 'Cloud Computing & Distributed Data', code: 'OEC-DS601', room: 'Room 405', faculty: 'Prof. Sanjay Dubey' },
  { day: 'Wed', time: '09:30 - 11:30', subject: 'Big Data & Hadoop Lab', code: 'PCC-DS602L', room: 'Cloud Lab 1', faculty: 'Dr. Rajeshwar Singh' },
  { day: 'Thu', time: '10:30 - 12:30', subject: 'Deep Learning & Neural Networks', code: 'PCC-DS601', room: 'Room 405', faculty: 'Prof. Amit Verma' },
  { day: 'Fri', time: '09:30 - 11:30', subject: 'Technical Seminar & Placement Training', code: 'HSMC-601', room: 'Auditorium', faculty: 'TPO Cell' },
];

export const users: User[] = [
  // === SUPER ADMIN ===
  {
    id: 'USR-SA-001',
    name: 'Dr. Vikram Shekhawat',
    email: 'superadmin@ipsacademy.org',
    password: 'super123',
    role: 'superadmin',
    avatar: teacherAvatars[0],
    branch: 'IPS Academy Central ERP',
    branchCode: 'ERP',
  },
  // === PRINCIPAL ===
  {
    id: 'USR-PRN-001',
    name: 'Dr. Archana Sharma',
    email: 'principal@ipsacademy.org',
    password: 'principal123',
    role: 'principal',
    avatar: teacherAvatars[0],
    branch: 'Institute of Engineering & Science (IES)',
    branchCode: 'IES',
  },
  // === HOD (Data Science) ===
  {
    id: 'USR-HOD-001',
    name: 'Dr. Rajeshwar Singh',
    email: 'hod.ds@ipsacademy.org',
    password: 'hod123',
    role: 'hod',
    avatar: teacherAvatars[1],
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    hodOfBranch: 'DS',
  },
  // === COORDINATOR (Section T-1, DS) ===
  {
    id: 'USR-CRD-001',
    name: 'Dr. Manish Sharma',
    email: 'coordinator@ipsacademy.org',
    password: 'coord123',
    role: 'coordinator',
    avatar: teacherAvatars[1],
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    coordinatorOf: { branch: 'Computer Science & Engineering (Data Science)', branchCode: 'DS', semester: 6, section: 'T-1' },
  },
  // === FACULTY ===
  {
    id: 'USR-FAC-001',
    name: 'Prof. Amit Verma',
    email: 'faculty@ipsacademy.org',
    password: 'faculty123',
    role: 'faculty',
    avatar: teacherAvatars[1],
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    assignedSections: ['T-1', 'T-2', 'S-1'],
    assignedSubjects: [
      { code: 'PCC-DS14', name: 'Deep Learning & Neural Networks', branch: 'CSE (DS)', semester: 6, sections: ['T-1', 'T-2'] },
      { code: 'PCC-DS11', name: 'Machine Learning Techniques', branch: 'CSE (DS)', semester: 5, sections: ['S-1'] },
    ],
    assignedStudents: ['STU-231042', 'STU-231043', 'STU-231044', 'STU-231045', 'STU-241089'],
  },
  {
    id: 'USR-FAC-002',
    name: 'Dr. Neha Kulkarni',
    email: 'n.kulkarni@ipsacademy.org',
    password: 'faculty123',
    role: 'faculty',
    avatar: teacherAvatars[0],
    branch: 'Computer Science & Engineering (AI & Machine Learning)',
    branchCode: 'AI',
    assignedSections: ['T-1', 'S-2'],
    assignedSubjects: [
      { code: 'PCC-AI13', name: 'Computer Vision & Image Processing', branch: 'CSE (AI & ML)', semester: 6, sections: ['T-1'] },
      { code: 'PCC-AI05', name: 'Artificial Intelligence & Search Strategies', branch: 'CSE (AI & ML)', semester: 4, sections: ['S-2'] },
    ],
    assignedStudents: ['STU-221018', 'STU-221019', 'STU-241090', 'STU-241091'],
  },
  {
    id: 'USR-FAC-003',
    name: 'Prof. Sanjay Dubey',
    email: 's.dubey@ipsacademy.org',
    password: 'faculty123',
    role: 'faculty',
    avatar: teacherAvatars[1],
    branch: 'Fire Technology & Safety Engineering',
    branchCode: 'FT',
    assignedSections: ['T-1', 'F-1'],
    assignedSubjects: [
      { code: 'PCC-FT12', name: 'Hazard Identification & Risk Analysis (HIRA)', branch: 'Fire Tech', semester: 6, sections: ['T-1'] },
    ],
    assignedStudents: ['STU-231105', 'STU-231106'],
  },
  // === STUDENTS ===
  {
    id: 'USR-STU-001',
    name: 'Aarav Sharma',
    email: '0808DS231042.ies@ipsacademy.org',
    password: 'student123',
    role: 'student',
    avatar: avatars[0],
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
  },
  {
    id: 'USR-STU-002',
    name: 'Ananya Deshmukh',
    email: '0808AI221018.ies@ipsacademy.org',
    password: 'student123',
    role: 'student',
    avatar: avatars[1],
    branch: 'Computer Science & Engineering (AI & Machine Learning)',
    branchCode: 'AI',
  },
  {
    id: 'USR-STU-003',
    name: 'Rohan Verma',
    email: '0808CS241089.ies@ipsacademy.org',
    password: 'student123',
    role: 'student',
    avatar: avatars[2],
    branch: 'Computer Science & Engineering',
    branchCode: 'CS',
  },
];

export const students: Student[] = [
  {
    id: 'STU-231042',
    computerCode: '231042',
    enrollmentNo: '0808DS231042',
    name: 'Aarav Sharma',
    email: '0808DS231042.ies@ipsacademy.org',
    avatar: avatars[0],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    year: 3,
    semester: 6,
    section: 'T-1',
    rollNumber: '0808DS231042',
    admissionYear: 2023,
    coordinatorName: 'Dr. Rajeshwar Singh',
    facultyAdvisor: 'Prof. Amit Verma',
    gpa: 9.80,
    cgpa: 9.70,
    rank: 1,
    rankChange: 2,
    status: 'active',
    scores: { academic: 96, social: 84, physical: 78, looks: 82, communication: 90, skills: 94 },
    achievements: ["Director's Merit List", 'SIH 2025 Grand Finalist', 'NPTEL Gold in Deep Learning', 'IES Hackathon Winner'],
    joinDate: '2023-08-16',
    lastActive: '2 min ago',
    phone: '+91 98260 12345',
    address: '42 AB Road, Indore, Madhya Pradesh',
    dob: '2004-05-14',
    bloodGroup: 'O+',
    emergencyContact: '+91 98260 54321',
    fatherName: 'Rajesh Sharma',
    motherName: 'Meenakshi Sharma',
    semesterResults: generateSemesterResults(9.70, 6, 'DS'),
    assignments: generateAssignments('DS'),
    attendance: generateAttendance('DS'),
    internalMarks: generateInternalMarks('DS'),
    totalCredits: 160,
    completedCredits: 86,
    backlogs: 0,
    mentorName: 'Prof. Amit Verma',
  },
  {
    id: 'STU-221018',
    computerCode: '221018',
    enrollmentNo: '0808AI221018',
    name: 'Ananya Deshmukh',
    email: '0808AI221018.ies@ipsacademy.org',
    avatar: avatars[1],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (AI & Machine Learning)',
    branchCode: 'AI',
    year: 4,
    semester: 8,
    section: 'F-1',
    rollNumber: '0808AI221018',
    admissionYear: 2022,
    coordinatorName: 'Dr. Neha Kulkarni',
    facultyAdvisor: 'Dr. Neha Kulkarni',
    gpa: 9.88,
    cgpa: 9.78,
    rank: 2,
    rankChange: 0,
    status: 'active',
    scores: { academic: 98, social: 90, physical: 72, looks: 88, communication: 94, skills: 92 },
    achievements: ['Valedictorian Nominee', 'TCS Digital Offer Awardee', 'IEEE Student Branch Chair', 'Published AI Research Paper'],
    joinDate: '2022-08-18',
    lastActive: '5 min ago',
    phone: '+91 94250 87654',
    address: '108 Vijay Nagar, Indore, Madhya Pradesh',
    dob: '2003-09-21',
    bloodGroup: 'A+',
    emergencyContact: '+91 94250 45678',
    fatherName: 'Sanjay Deshmukh',
    motherName: 'Priya Deshmukh',
    semesterResults: generateSemesterResults(9.78, 8, 'AI'),
    assignments: generateAssignments('AI'),
    attendance: generateAttendance('AI'),
    internalMarks: generateInternalMarks('AI'),
    totalCredits: 160,
    completedCredits: 144,
    backlogs: 0,
    mentorName: 'Dr. Neha Kulkarni',
  },
  {
    id: 'STU-241089',
    computerCode: '241089',
    enrollmentNo: '0808CS241089',
    name: 'Rohan Verma',
    email: '0808CS241089.ies@ipsacademy.org',
    avatar: avatars[2],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering',
    branchCode: 'CS',
    year: 2,
    semester: 4,
    section: 'S-1',
    rollNumber: '0808CS241089',
    admissionYear: 2024,
    coordinatorName: 'Prof. Amit Verma',
    facultyAdvisor: 'Prof. Amit Verma',
    gpa: 3.86,
    cgpa: 3.82,
    rank: 3,
    rankChange: 1,
    status: 'active',
    scores: { academic: 90, social: 86, physical: 88, looks: 80, communication: 82, skills: 91 },
    achievements: ['Coding Club Vice Lead', 'CodeChef 4-Star Programmer', 'Inter-College Chess Winner'],
    joinDate: '2024-08-12',
    lastActive: '14 min ago',
    phone: '+91 97550 23456',
    address: '15 Saket Nagar, Indore, Madhya Pradesh',
    dob: '2005-02-19',
    bloodGroup: 'B+',
    emergencyContact: '+91 97550 65432',
    fatherName: 'Vikram Verma',
    motherName: 'Sunita Verma',
    semesterResults: generateSemesterResults(9.55, 4, 'CS'),
    assignments: generateAssignments('CS'),
    attendance: generateAttendance('CS'),
    internalMarks: generateInternalMarks('CS'),
    totalCredits: 160,
    completedCredits: 58,
    backlogs: 0,
    mentorName: 'Prof. Amit Verma',
  },
  {
    id: 'STU-231043',
    computerCode: '231043',
    enrollmentNo: '0808DS231043',
    name: 'Sneha Patel',
    email: '0808DS231043.ies@ipsacademy.org',
    avatar: avatars[3],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    year: 3,
    semester: 6,
    section: 'T-1',
    rollNumber: '0808DS231043',
    admissionYear: 2023,
    coordinatorName: 'Dr. Rajeshwar Singh',
    facultyAdvisor: 'Prof. Amit Verma',
    gpa: 3.84,
    cgpa: 3.79,
    rank: 4,
    rankChange: -1,
    status: 'active',
    scores: { academic: 88, social: 82, physical: 74, looks: 86, communication: 88, skills: 89 },
    achievements: ['ACM Student Chapter Secretary', 'Kaggle Silver Medalist', 'Data Science Hack Winner'],
    joinDate: '2023-08-16',
    lastActive: '30 min ago',
    phone: '+91 99810 34567',
    address: '28 Palasia, Indore, Madhya Pradesh',
    dob: '2004-07-11',
    bloodGroup: 'AB+',
    emergencyContact: '+91 99810 76543',
    fatherName: 'Alok Patel',
    motherName: 'Geeta Patel',
    semesterResults: generateSemesterResults(9.48, 6, 'DS'),
    assignments: generateAssignments('DS'),
    attendance: generateAttendance('DS'),
    internalMarks: generateInternalMarks('DS'),
    totalCredits: 160,
    completedCredits: 86,
    backlogs: 0,
    mentorName: 'Prof. Amit Verma',
  },
  {
    id: 'STU-231044',
    computerCode: '231044',
    enrollmentNo: '0808DS231044',
    name: 'Karthik Nair',
    email: '0808DS231044.ies@ipsacademy.org',
    avatar: avatars[4],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    year: 3,
    semester: 6,
    section: 'T-1',
    rollNumber: '0808DS231044',
    admissionYear: 2023,
    coordinatorName: 'Dr. Rajeshwar Singh',
    facultyAdvisor: 'Prof. Amit Verma',
    gpa: 3.78,
    cgpa: 3.74,
    rank: 5,
    rankChange: 3,
    status: 'active',
    scores: { academic: 86, social: 88, physical: 90, looks: 80, communication: 84, skills: 87 },
    achievements: ['Robotics Workshop Coordinator', 'Smart India Hackathon Finalist', 'Sports Captain - Football'],
    joinDate: '2023-08-16',
    lastActive: '1 hr ago',
    phone: '+91 98930 45678',
    address: '56 Rajendra Nagar, Indore, Madhya Pradesh',
    dob: '2004-10-05',
    bloodGroup: 'O-',
    emergencyContact: '+91 98930 87654',
    fatherName: 'Pradeep Nair',
    motherName: 'Lakshmi Nair',
    semesterResults: generateSemesterResults(9.35, 6, 'DS'),
    assignments: generateAssignments('DS'),
    attendance: generateAttendance('DS'),
    internalMarks: generateInternalMarks('DS'),
    totalCredits: 160,
    completedCredits: 86,
    backlogs: 0,
    mentorName: 'Prof. Amit Verma',
  },
  {
    id: 'STU-231045',
    computerCode: '231045',
    enrollmentNo: '0808DS231045',
    name: 'Divya Tiwari',
    email: '0808DS231045.ies@ipsacademy.org',
    avatar: avatars[5],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    year: 3,
    semester: 6,
    section: 'T-2',
    rollNumber: '0808DS231045',
    admissionYear: 2023,
    coordinatorName: 'Dr. Rajeshwar Singh',
    facultyAdvisor: 'Prof. Amit Verma',
    gpa: 3.75,
    cgpa: 3.71,
    rank: 6,
    rankChange: -2,
    status: 'active',
    scores: { academic: 84, social: 92, physical: 70, looks: 88, communication: 94, skills: 82 },
    achievements: ['National Debate Champion', 'IES Literary Club President', 'Best Student Speaker Award'],
    joinDate: '2023-08-16',
    lastActive: '2 hr ago',
    phone: '+91 91790 56789',
    address: '89 Annapurna Road, Indore, Madhya Pradesh',
    dob: '2004-03-29',
    bloodGroup: 'A-',
    emergencyContact: '+91 91790 98765',
    fatherName: 'Dinesh Tiwari',
    motherName: 'Anita Tiwari',
    semesterResults: generateSemesterResults(9.28, 6, 'DS'),
    assignments: generateAssignments('DS'),
    attendance: generateAttendance('DS'),
    internalMarks: generateInternalMarks('DS'),
    totalCredits: 160,
    completedCredits: 86,
    backlogs: 1,
    mentorName: 'Prof. Amit Verma',
  },
  {
    id: 'STU-231105',
    computerCode: '231105',
    enrollmentNo: '0808FT231105',
    name: 'Aditya Chauhan',
    email: '0808FT231105.ies@ipsacademy.org',
    avatar: avatars[6],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Fire Technology & Safety Engineering',
    branchCode: 'FT',
    year: 3,
    semester: 6,
    section: 'T-1',
    rollNumber: '0808FT231105',
    admissionYear: 2023,
    coordinatorName: 'Prof. Sanjay Dubey',
    facultyAdvisor: 'Prof. Sanjay Dubey',
    gpa: 3.89,
    cgpa: 3.84,
    rank: 7,
    rankChange: 1,
    status: 'active',
    scores: { academic: 92, social: 80, physical: 96, looks: 84, communication: 86, skills: 92 },
    achievements: ['National Fire Safety Drill Commander', 'Industrial Safety Research Fellow', 'Athletics Gold Medalist'],
    joinDate: '2023-08-16',
    lastActive: '45 min ago',
    phone: '+91 98270 67890',
    address: '14 Bhavarkuan, Indore, Madhya Pradesh',
    dob: '2004-01-18',
    bloodGroup: 'B-',
    emergencyContact: '+91 98270 09876',
    fatherName: 'Major Pratap Chauhan',
    motherName: 'Kavita Chauhan',
    semesterResults: generateSemesterResults(9.60, 6, 'FT'),
    assignments: generateAssignments('FT'),
    attendance: generateAttendance('FT'),
    internalMarks: generateInternalMarks('FT'),
    totalCredits: 160,
    completedCredits: 86,
    backlogs: 0,
    mentorName: 'Prof. Sanjay Dubey',
  },
  {
    id: 'STU-231106',
    computerCode: '231106',
    enrollmentNo: '0808FT231106',
    name: 'Pranav Joshi',
    email: '0808FT231106.ies@ipsacademy.org',
    avatar: avatars[0],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Fire Technology & Safety Engineering',
    branchCode: 'FT',
    year: 3,
    semester: 6,
    section: 'T-1',
    rollNumber: '0808FT231106',
    admissionYear: 2023,
    coordinatorName: 'Prof. Sanjay Dubey',
    facultyAdvisor: 'Prof. Sanjay Dubey',
    gpa: 3.68,
    cgpa: 3.63,
    rank: 8,
    rankChange: 0,
    status: 'active',
    scores: { academic: 82, social: 76, physical: 90, looks: 78, communication: 80, skills: 88 },
    achievements: ['Safety Audit Certification', 'Disaster Response Volunteer Lead'],
    joinDate: '2023-08-16',
    lastActive: '3 hr ago',
    phone: '+91 94240 78901',
    address: '67 Rau Road, Indore, Madhya Pradesh',
    dob: '2004-08-25',
    bloodGroup: 'AB-',
    emergencyContact: '+91 94240 10987',
    fatherName: 'Girish Joshi',
    motherName: 'Alka Joshi',
    semesterResults: generateSemesterResults(9.08, 6, 'FT'),
    assignments: generateAssignments('FT'),
    attendance: generateAttendance('FT'),
    internalMarks: generateInternalMarks('FT'),
    totalCredits: 160,
    completedCredits: 86,
    backlogs: 1,
    mentorName: 'Prof. Sanjay Dubey',
  },
  {
    id: 'STU-221019',
    computerCode: '221019',
    enrollmentNo: '0808AI221019',
    name: 'Ishita Mehta',
    email: '0808AI221019.ies@ipsacademy.org',
    avatar: avatars[1],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (AI & Machine Learning)',
    branchCode: 'AI',
    year: 4,
    semester: 8,
    section: 'F-1',
    rollNumber: '0808AI221019',
    admissionYear: 2022,
    coordinatorName: 'Dr. Neha Kulkarni',
    facultyAdvisor: 'Dr. Neha Kulkarni',
    gpa: 3.72,
    cgpa: 3.68,
    rank: 9,
    rankChange: -1,
    status: 'active',
    scores: { academic: 84, social: 88, physical: 76, looks: 86, communication: 90, skills: 85 },
    achievements: ['Infosys Offer Winner', 'AI Workshop Speaker', 'Peer Mentor Lead'],
    joinDate: '2022-08-18',
    lastActive: '20 min ago',
    phone: '+91 98265 89012',
    address: '33 Geeta Bhawan, Indore, Madhya Pradesh',
    dob: '2003-12-04',
    bloodGroup: 'A+',
    emergencyContact: '+91 98265 21098',
    fatherName: 'Nitin Mehta',
    motherName: 'Sarita Mehta',
    semesterResults: generateSemesterResults(9.20, 8, 'AI'),
    assignments: generateAssignments('AI'),
    attendance: generateAttendance('AI'),
    internalMarks: generateInternalMarks('AI'),
    totalCredits: 160,
    completedCredits: 144,
    backlogs: 0,
    mentorName: 'Dr. Neha Kulkarni',
  },
  {
    id: 'STU-241090',
    computerCode: '241090',
    enrollmentNo: '0808AI241090',
    name: 'Vikramaditya Rathore',
    email: '0808AI241090.ies@ipsacademy.org',
    avatar: avatars[2],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (AI & Machine Learning)',
    branchCode: 'AI',
    year: 2,
    semester: 4,
    section: 'S-2',
    rollNumber: '0808AI241090',
    admissionYear: 2024,
    coordinatorName: 'Dr. Neha Kulkarni',
    facultyAdvisor: 'Dr. Neha Kulkarni',
    gpa: 3.88,
    cgpa: 3.84,
    rank: 10,
    rankChange: 2,
    status: 'active',
    scores: { academic: 92, social: 74, physical: 80, looks: 76, communication: 82, skills: 94 },
    achievements: ['Math Olympiad Gold Medalist', 'Algorithm Challenge Champion'],
    joinDate: '2024-08-12',
    lastActive: '1 hr ago',
    phone: '+91 97520 90123',
    address: '19 Mhow Naka, Indore, Madhya Pradesh',
    dob: '2005-04-16',
    bloodGroup: 'O+',
    emergencyContact: '+91 97520 32109',
    fatherName: 'Thakur Mahendra Rathore',
    motherName: 'Sushma Rathore',
    semesterResults: generateSemesterResults(9.60, 4, 'AI'),
    assignments: generateAssignments('AI'),
    attendance: generateAttendance('AI'),
    internalMarks: generateInternalMarks('AI'),
    totalCredits: 160,
    completedCredits: 58,
    backlogs: 0,
    mentorName: 'Dr. Neha Kulkarni',
  },
  {
    id: 'STU-241091',
    computerCode: '241091',
    enrollmentNo: '0808AI241091',
    name: 'Tanvi Kulkarni',
    email: '0808AI241091.ies@ipsacademy.org',
    avatar: avatars[6],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (AI & Machine Learning)',
    branchCode: 'AI',
    year: 2,
    semester: 4,
    section: 'S-2',
    rollNumber: '0808AI241091',
    admissionYear: 2024,
    coordinatorName: 'Dr. Neha Kulkarni',
    facultyAdvisor: 'Dr. Neha Kulkarni',
    gpa: 3.74,
    cgpa: 3.70,
    rank: 11,
    rankChange: 0,
    status: 'active',
    scores: { academic: 86, social: 92, physical: 74, looks: 88, communication: 90, skills: 82 },
    achievements: ['Robotics Club Vice President', 'Inter-College Presentation Winner'],
    joinDate: '2024-08-12',
    lastActive: '15 min ago',
    phone: '+91 98260 01234',
    address: '55 Khatiwala Tank, Indore, Madhya Pradesh',
    dob: '2005-06-08',
    bloodGroup: 'A+',
    emergencyContact: '+91 98260 43210',
    fatherName: 'Anil Kulkarni',
    motherName: 'Vaishali Kulkarni',
    semesterResults: generateSemesterResults(9.25, 4, 'AI'),
    assignments: generateAssignments('AI'),
    attendance: generateAttendance('AI'),
    internalMarks: generateInternalMarks('AI'),
    totalCredits: 160,
    completedCredits: 58,
    backlogs: 0,
    mentorName: 'Dr. Neha Kulkarni',
  },
  {
    id: 'STU-231046',
    computerCode: '231046',
    enrollmentNo: '0808DS231046',
    name: 'Devansh Agrawal',
    email: '0808DS231046.ies@ipsacademy.org',
    avatar: avatars[3],
    institute: 'Institute of Engineering & Science (IES)',
    branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS',
    year: 3,
    semester: 6,
    section: 'T-2',
    rollNumber: '0808DS231046',
    admissionYear: 2023,
    coordinatorName: 'Dr. Rajeshwar Singh',
    facultyAdvisor: 'Prof. Amit Verma',
    gpa: 3.65,
    cgpa: 3.60,
    rank: 12,
    rankChange: -3,
    status: 'inactive',
    scores: { academic: 78, social: 80, physical: 86, looks: 84, communication: 82, skills: 90 },
    achievements: ['Design & UI/UX Club Coordinator', 'Open Source Contributor'],
    joinDate: '2023-08-16',
    lastActive: '1 week ago',
    phone: '+91 94250 12345',
    address: '77 South Tukoganj, Indore, Madhya Pradesh',
    dob: '2004-11-23',
    bloodGroup: 'B+',
    emergencyContact: '+91 94250 54321',
    fatherName: 'Shyam Agrawal',
    motherName: 'Neelam Agrawal',
    semesterResults: generateSemesterResults(9.00, 6, 'DS'),
    assignments: generateAssignments('DS'),
    attendance: generateAttendance('DS'),
    internalMarks: generateInternalMarks('DS'),
    totalCredits: 160,
    completedCredits: 86,
    backlogs: 2,
    mentorName: 'Prof. Amit Verma',
  },
];

export const notices: Notice[] = [
  {
    id: 'N-001',
    title: 'Even Semester Mid-Term Examination Timetable (MST-II)',
    content: 'The 2nd Mid-Term Examination (MST-II) schedule for B.Tech IV, VI, and VIII semesters has been released by the Controller of Examinations, IES IPS Academy. All students must bring their official College ID & Hall Ticket to the examination rooms.',
    category: 'academic',
    pinned: true,
    author: 'Controller of Examinations (IES)',
    date: '2026-04-05',
    targetAudience: ['superadmin', 'principal', 'hod', 'coordinator', 'faculty', 'student'],
  },
  {
    id: 'N-002',
    title: 'TCS & Infosys Campus Recruitment Drive - Pre-Placement Talk',
    content: 'TCS Digital and Infosys will be conducting their mandatory Pre-Placement Talk in the Main Auditorium on April 20th, 2026 at 10:00 AM. All pre-final year (Semester VI) and final year students with CGPA >= 6.5 must attend in formal attire.',
    category: 'event',
    pinned: true,
    author: 'Training & Placement Officer (TPO)',
    date: '2026-04-04',
    targetAudience: ['superadmin', 'principal', 'hod', 'coordinator', 'faculty', 'student'],
  },
  {
    id: 'N-003',
    title: 'Strict Attendance Warning: Students Below 75% Threshold',
    content: 'As per RGPV / IPS Academy regulations, students maintaining an overall attendance below 75% will be detained from appearing in the upcoming Semester Practical and End-Semester Theory Examinations. Section Coordinators are instructed to issue notices to all defaulters.',
    category: 'urgent',
    pinned: true,
    author: 'Principal Office - IES IPS Academy',
    date: '2026-04-02',
    targetAudience: ['superadmin', 'principal', 'hod', 'coordinator', 'faculty', 'student'],
  },
  {
    id: 'N-004',
    title: 'Faculty Development Program on Generative AI & Deep Learning',
    content: 'A 5-day AICTE sponsored FDP will be hosted by the CSE (AI/ML & DS) departments from April 24th to April 28th. All faculty members are requested to register via the internal portal before April 15th.',
    category: 'academic',
    pinned: false,
    author: 'HOD CSE / DS Block',
    date: '2026-04-01',
    targetAudience: ['superadmin', 'principal', 'hod', 'coordinator', 'faculty'],
  },
  {
    id: 'N-005',
    title: 'Submission of Minor & Major Project Phase-II Reports',
    content: 'All B.Tech VI and VIII semester project groups must submit their spiral-bound Phase-II progress reports duly signed by their respective faculty guides to the Section Coordinator office by April 18th.',
    category: 'academic',
    pinned: false,
    author: 'Academic Coordinator - IES',
    date: '2026-03-29',
    targetAudience: ['superadmin', 'principal', 'hod', 'coordinator', 'faculty', 'student'],
  },
  {
    id: 'N-006',
    title: 'Annual Tech-Cultural Fest "Swaranjali & Technovation 2026"',
    content: 'Registrations are open for technical competitions (Hackathon, Robo-Wars, Bridge Design) and cultural events for Swaranjali 2026. Contact your section coordinators for participation forms.',
    category: 'event',
    pinned: false,
    author: 'Student Activity Council (SAC)',
    date: '2026-03-25',
    targetAudience: ['superadmin', 'principal', 'hod', 'coordinator', 'faculty', 'student'],
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'C-001',
    sender: 'Aarav Sharma (T-1)',
    avatar: avatars[0],
    message: 'Has everyone checked the MST-II exam schedule? Deep Learning exam is on Monday right after Big Data.',
    timestamp: '10:24 AM',
    room: 'general',
  },
  {
    id: 'C-002',
    sender: 'Ananya Deshmukh (F-1)',
    avatar: avatars[1],
    message: "Yes! Also make sure you submit the lab record before Friday or the internal marks won't be uploaded.",
    timestamp: '10:26 AM',
    room: 'general',
  },
  {
    id: 'C-003',
    sender: 'Rohan Verma (S-1)',
    avatar: avatars[2],
    message: "We are practicing for the TCS Digital coding round after college today in CSE Lab 3. Anyone free to join?",
    timestamp: '10:28 AM',
    room: 'general',
  },
  {
    id: 'C-004',
    sender: 'Sneha Patel (T-1)',
    avatar: avatars[3],
    message: 'Count me in! I will bring my notes on dynamic programming and graph algorithms.',
    timestamp: '10:31 AM',
    room: 'general',
  },
  {
    id: 'C-005',
    sender: 'Aditya Chauhan (FT / T-1)',
    avatar: avatars[6],
    message: 'Any update from the sports committee on the inter-institute volleyball tournament timings?',
    timestamp: '10:35 AM',
    room: 'general',
  },
  {
    id: 'C-006',
    sender: 'Dr. Rajeshwar Singh (Coordinator)',
    avatar: teacherAvatars[1],
    message: 'Notice for all T-1 students: Please attend the placement orientation at 2:00 PM sharply in Auditorium Hall A.',
    timestamp: '10:40 AM',
    room: 'top-10',
  },
  {
    id: 'C-007',
    sender: 'Aarav Sharma (T-1)',
    avatar: avatars[0],
    message: 'Noted sir! We will be there with our updated resumes.',
    timestamp: '10:42 AM',
    room: 'top-10',
  },
];

export const dashboardStats = {
  totalStudents: 3420,
  activeUsers: 2840,
  averageGPA: 8.56,
  attendanceRate: 88.4,
  coursesActive: 214,
  eventsThisMonth: 16,
};

export const activityData = [
  { month: 'Jul', students: 2600, engagement: 79 },
  { month: 'Aug', students: 2950, engagement: 74 },
  { month: 'Sep', students: 3320, engagement: 87 },
  { month: 'Oct', students: 3250, engagement: 89 },
  { month: 'Nov', students: 3380, engagement: 92 },
  { month: 'Dec', students: 3420, engagement: 90 },
];

export const branchData = [
  { name: 'CSE (Core)', students: 680, color: '#2C3E6B' },
  { name: 'CSE (Data Science)', students: 420, color: '#4A8B8D' },
  { name: 'CSE (AI & ML)', students: 440, color: '#C4784A' },
  { name: 'CS & IT / IoT', students: 380, color: '#6B7D5E' },
  { name: 'Fire Tech & Safety', students: 360, color: '#5A7091' },
  { name: 'ECE / EEE / Civil / Mech', students: 1140, color: '#3D3832' },
];

export const departmentData = branchData; // For backwards compatibility

export function getStudentsByTeacher(teacherId: string): Student[] {
  const teacher = users.find(u => u.id === teacherId);
  if (!teacher?.assignedStudents) return [];
  return students.filter(s => teacher.assignedStudents!.includes(s.id));
}

export function getStudentsByCoordinator(branchCode: string, section?: string): Student[] {
  return students.filter(s => s.branchCode === branchCode && (!section || s.section === section));
}

export function getStudentAssignments(studentId: string): Assignment[] {
  const student = students.find(s => s.id === studentId);
  return student?.assignments || [];
}

export function getStudentAttendance(studentId: string): AttendanceRecord[] {
  const student = students.find(s => s.id === studentId);
  return student?.attendance || [];
}

export function getAttendanceStats(studentId: string) {
  const records = getStudentAttendance(studentId);
  const total = records.length;
  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;
  const excused = records.filter(r => r.status === 'excused').length;
  return { total, present, absent, late, excused, percentage: total > 0 ? Math.round((present / total) * 100) : 0 };
}

export function getGradePoints(grade: string): number {
  const map: Record<string, number> = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };
  return map[grade] || 0;
}
