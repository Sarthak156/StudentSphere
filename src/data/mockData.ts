export type UserRole = 'admin' | 'coordinator' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  institute?: string; // e.g., 'Institute of Engineering & Science'
  department?: string; // e.g., 'Computer Science & Engineering'
  assignedSections?: string[]; // For coordinators and faculty
}

export interface SemesterResult {
  semester: number;
  year: string;
  gpa: number;
  credits: number;
  status: 'passed' | 'failed' | 'ongoing';
  courses: CourseResult[];
}

export interface CourseResult {
  code: string;
  name: string;
  credits: number;
  grade: string;
  score: number;
  attendance: number;
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

export interface Student {
  id: string;
  computerCode: string;
  enrollmentNumber: string;
  name: string;
  email: string;
  avatar: string;
  institute: string;
  department: string;
  branch: string;
  year: number;
  semester: number;
  section: string;
  gpa: number;
  cgpa: number;
  status: 'active' | 'inactive' | 'on-leave' | 'graduated';
  scores: {
    academic: number;
    social: number;
    physical: number;
    looks: number;
    communication: number;
    skills: number;
  };
  achievements: string[]; // To be replaced by more specific fields
  projects?: string[];
  certifications?: string[];
  joinDate: string;
  lastActive: string;
  phone: string;
  address: string;
  dob: string;
  bloodGroup: string;
  rollNumber: string;
  emergencyContact: string;
  fatherName: string;
  motherName: string;
  semesterResults: SemesterResult[];
  assignments: Assignment[];
  attendance: AttendanceRecord[];
  totalCredits: number;
  completedCredits: number;
  backlogs: number;
  coordinatorId?: string;
  facultyAdvisorId?: string;
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
  '/avatars/avatar-1.png',
  '/avatars/avatar-2.png',
  '/avatars/avatar-3.png',
  '/avatars/avatar-4.png',
  '/avatars/avatar-5.png',
  '/avatars/avatar-6.png',
  '/avatars/avatar-7.png',
];

const teacherAvatars = [
  '/avatars/teacher-1.png',
  '/avatars/teacher-2.png',
  '/avatars/teacher-3.png',
];

const generateSemesterResults = (baseGpa: number, admissionYear: number): SemesterResult[] => {
  const semesters = [
    { sem: 1, year: '2022-23' },
    { sem: 2, year: '2022-23' },
    { sem: 3, year: '2023-24' },
    { sem: 4, year: '2023-24' },
    { sem: 5, year: '2024-25' },
    { sem: 6, year: '2024-25' },
    { sem: 7, year: '2025-26' },
    { sem: 8, year: '2025-26' },
  ];

  return semesters.map((s, _i) => ({
    semester: s.sem,
    year: s.year,
    gpa: Math.min(4.0, Math.max(2.0, baseGpa + (Math.random() - 0.5) * 0.8)),
    credits: 20 + Math.floor(Math.random() * 5),
    status: s.sem < 6 ? 'passed' as const : s.sem === 6 ? 'ongoing' as const : 'ongoing' as const,
    courses: [
      { code: `${['CS', 'ME', 'BT', 'ARCH', 'ECO', 'PSY', 'MATH', 'PHY'][Math.floor(Math.random() * 8)]}${100 + s.sem * 100}`, name: ['Data Structures', 'Thermodynamics', 'Biochemistry', 'Design Theory', 'Microeconomics', 'Cognitive Science', 'Linear Algebra', 'Quantum Mechanics'][Math.floor(Math.random() * 8)], credits: 4, grade: ['A', 'A-', 'B+', 'B'][Math.floor(Math.random() * 4)], score: 75 + Math.floor(Math.random() * 20), attendance: 80 + Math.floor(Math.random() * 20) },
      { code: `${['CS', 'ME', 'BT', 'ARCH', 'ECO', 'PSY', 'MATH', 'PHY'][Math.floor(Math.random() * 8)]}${101 + s.sem * 100}`, name: ['Algorithms', 'Fluid Mechanics', 'Genetics', 'History of Architecture', 'Macroeconomics', 'Behavioral Psychology', 'Calculus', 'Electromagnetism'][Math.floor(Math.random() * 8)], credits: 4, grade: ['A-', 'B+', 'B', 'B-'][Math.floor(Math.random() * 4)], score: 72 + Math.floor(Math.random() * 18), attendance: 75 + Math.floor(Math.random() * 25) },
      { code: `${['CS', 'ME', 'BT', 'ARCH', 'ECO', 'PSY', 'MATH', 'PHY'][Math.floor(Math.random() * 8)]}${102 + s.sem * 100}`, name: ['Database Systems', 'Material Science', 'Cell Biology', 'Structural Design', 'Econometrics', 'Research Methods', 'Probability', 'Thermal Physics'][Math.floor(Math.random() * 8)], credits: 3, grade: ['A', 'A-', 'B+', 'B+'][Math.floor(Math.random() * 4)], score: 78 + Math.floor(Math.random() * 17), attendance: 85 + Math.floor(Math.random() * 15) },
      { code: `${['CS', 'ME', 'BT', 'ARCH', 'ECO', 'PSY', 'MATH', 'PHY'][Math.floor(Math.random() * 8)]}${103 + s.sem * 100}`, name: ['Networks', 'Dynamics', 'Immunology', 'Urban Planning', 'Statistics', 'Social Psychology', 'Discrete Math', 'Optics'][Math.floor(Math.random() * 8)], credits: 3, grade: ['B+', 'A-', 'A', 'B'][Math.floor(Math.random() * 4)], score: 74 + Math.floor(Math.random() * 20), attendance: 82 + Math.floor(Math.random() * 18) },
    ],
  }));
};

const generateAssignments = (): Assignment[] => {
  const courses = [
    { code: 'CS301', name: 'Data Structures' },
    { code: 'CS302', name: 'Algorithms' },
    { code: 'CS303', name: 'Database Systems' },
    { code: 'CS304', name: 'Computer Networks' },
  ];
  const assignments: Assignment[] = [];
  courses.forEach((c, ci) => {
    for (let i = 1; i <= 3; i++) {
      const isSubmitted = Math.random() > 0.3;
      const isGraded = isSubmitted && Math.random() > 0.4;
      assignments.push({
        id: `ASN-${ci}${i}`,
        title: `Assignment ${i}: ${['Implementation', 'Analysis', 'Research Report', 'Case Study'][i - 1]}`,
        course: c.name,
        courseCode: c.code,
        dueDate: `2025-${String(11 + ci).padStart(2, '0')}-${String(10 + i * 5).padStart(2, '0')}`,
        submittedDate: isSubmitted ? `2025-${String(11 + ci).padStart(2, '0')}-${String(8 + i * 5).padStart(2, '0')}` : undefined,
        status: isGraded ? 'graded' as const : isSubmitted ? 'submitted' as const : Math.random() > 0.5 ? 'pending' as const : 'late' as const,
        score: isGraded ? 75 + Math.floor(Math.random() * 25) : undefined,
        maxScore: 100,
        feedback: isGraded ? ['Excellent work!', 'Good effort, needs more detail.', 'Well structured.', 'Great analysis.'][Math.floor(Math.random() * 4)] : undefined,
      });
    }
  });
  return assignments;
};

const generateAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const courses = ['CS301', 'CS302', 'CS303', 'CS304'];
  const months = ['2025-09', '2025-10', '2025-11'];
  const statuses: ('present' | 'absent' | 'late' | 'excused')[] = ['present', 'present', 'present', 'present', 'present', 'absent', 'late', 'present', 'present', 'excused'];
  
  months.forEach(month => {
    courses.forEach(course => {
      for (let d = 1; d <= 22; d += 2) {
        records.push({
          date: `${month}-${String(d).padStart(2, '0')}`,
          course,
          courseCode: course,
          status: statuses[Math.floor(Math.random() * statuses.length)],
        });
      }
    });
  });
  return records;
};

export const users: User[] = [
  {
    id: 'USR-ADM-001',
    name: 'Dr. Archana Keerti',
    email: 'principal.ies@ipsacademy.org',
    password: 'admin123',
    role: 'admin',
    avatar: teacherAvatars[0],
    institute: 'Institute of Engineering & Science',
    department: 'Principal Office',
  },
  {
    id: 'USR-CRD-001',
    name: 'Prof. Manish Pande',
    email: 'manish.pande.ies@ipsacademy.org',
    password: 'coordinator123',
    role: 'coordinator',
    avatar: teacherAvatars[1],
    institute: 'Institute of Engineering & Science',
    department: 'Computer Science & Engineering',
    assignedSections: ['DS-1', 'DS-2'],
  },
  {
    id: 'USR-TCH-001',
    name: 'Dr. Namrata Patel',
    email: 'namrata.patel.ies@ipsacademy.org',
    password: 'teacher123',
    role: 'teacher',
    avatar: teacherAvatars[1],
    institute: 'Institute of Engineering & Science',
    department: 'Computer Science & Engineering',
    assignedSections: ['DS-1', 'DS-2', 'S-1'],
  },
  {
    id: 'USR-TCH-002',
    name: 'Prof. Deepak Sharma',
    email: 'deepak.sharma.ies@ipsacademy.org',
    password: 'teacher123',
    role: 'teacher',
    avatar: teacherAvatars[0],
    institute: 'Institute of Engineering & Science',
    department: 'Information Technology',
    assignedSections: ['DS-1', 'S-2'],
  },
  {
    id: '241122',
    name: 'Aarav Sharma',
    email: '0808DS241122.ies@ipsacademy.org',
    password: 'student123',
    role: 'student',
    avatar: avatars[0],
    institute: 'Institute of Engineering & Science',
    department: 'Computer Science & Engineering',
  },
  {
    id: '241123',
    name: 'Diya Patel',
    email: '0808DS241123.ies@ipsacademy.org',
    password: 'student123',
    role: 'student',
    avatar: avatars[2],
    institute: 'Institute of Engineering & Science',
    department: 'Computer Science & Engineering',
  },
];

export const students: Student[] = [];

export const notices: Notice[] = [
  {
    id: 'N-001',
    title: 'Semester Examination Schedule Released',
    content: 'The final examination schedule for the current semester has been published. Students are advised to check their respective department portals for detailed timetables and venue allocations.',
    category: 'academic',
    pinned: true,
    author: 'Academic Office',
    date: '2026-07-10',
    targetAudience: ['admin', 'teacher', 'student'],
  },
  {
    id: 'N-002',
    title: 'Annual Innovation Summit 2026',
    content: 'Registration is now open for the Annual Innovation Summit. This year features keynote speakers from leading tech companies and research institutions.',
    category: 'event',
    pinned: true,
    author: 'Innovation Cell',
    date: '2026-07-09',
    targetAudience: ['admin', 'teacher', 'student'],
  },
  {
    id: 'N-003',
    title: 'Faculty Development Program',
    content: 'A two-day faculty development program on modern pedagogical techniques will be held. All faculty members are requested to confirm participation.',
    category: 'academic',
    pinned: false,
    author: 'Academic Office',
    date: '2026-07-08',
    targetAudience: ['admin', 'teacher'],
  },
  {
    id: 'N-004',
    title: 'Scholarship Application Deadline Extended',
    content: 'The deadline for merit-based scholarship applications has been extended to January 31st, 2026. Students with a GPA of 3.5 and above are encouraged to apply.',
    category: 'urgent',
    pinned: true,
    author: 'Financial Aid Office',
    date: '2026-07-07',
    targetAudience: ['admin', 'teacher', 'student'],
  },
  {
    id: 'N-005',
    title: 'Staff Meeting - Curriculum Review',
    content: 'Mandatory staff meeting for curriculum review on December 20th. Please review the proposed changes before the meeting.',
    category: 'academic',
    pinned: false,
    author: 'Dean Office',
    date: '2026-07-06',
    targetAudience: ['admin', 'teacher'],
  },
  {
    id: 'N-006',
    title: 'Research Paper Submission Guidelines Updated',
    content: 'Updated guidelines for undergraduate research paper submissions are now available. All submissions must follow the new formatting standards.',
    category: 'academic',
    pinned: false,
    author: 'Research Department',
    date: '2026-07-05',
    targetAudience: ['admin', 'teacher', 'student'],
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'C-001',
    sender: 'Aarav Sharma',
    avatar: avatars[0],
    message: 'Has anyone started working on the distributed systems project? Looking for study group partners.',
    timestamp: '10:24 AM',
    room: 'DS-1',
  },
  {
    id: 'C-002',
    sender: 'Diya Patel',
    avatar: avatars[1],
    message: "I'm in! The consensus algorithms section is particularly interesting. Let's meet at the library tomorrow?",
    timestamp: '10:26 AM',
    room: 'DS-2',
  },
  {
    id: 'C-003',
    sender: 'Rohan Gupta',
    avatar: avatars[2],
    message: "Count me in too. I've been reviewing the Raft paper. Really elegant design.",
    timestamp: '10:28 AM',
    room: 'S-1',
  },
  {
    id: 'C-004',
    sender: 'Aarav Sharma',
    avatar: avatars[6],
    message: 'Great initiative! The study room on 3rd floor is usually available after 4 PM.',
    timestamp: '10:31 AM',
    room: 'DS-1',
  },
  {
    id: 'C-005',
    sender: 'Faculty',
    avatar: avatars[5],
    message: 'Reminder: Assignment 2 is due this Friday. Please submit via the portal.',
    timestamp: '10:35 AM',
    room: 'general',
  },
  {
    id: 'C-006',
    sender: 'Diya Patel',
    avatar: avatars[1],
    message: 'Can someone share the notes from the morning lecture?',
    timestamp: '10:37 AM',
    room: 'DS-2',
  },
  {
    id: 'C-007',
    sender: 'Rohan Gupta',
    avatar: avatars[2],
    message: 'Just finished the linear algebra problem set. That eigenvalue decomposition problem was tricky.',
    timestamp: '10:40 AM',
    room: 'S-1',
  },
  {
    id: 'C-008',
    sender: 'Alexander Mercer',
    avatar: avatars[0],
    message: 'Top performers — the department head wants us to present at the academic showcase next month.',
    timestamp: '9:15 AM',
    room: 'top-10',
  },
  {
    id: 'C-009',
    sender: 'Priya Nandakumar',
    avatar: avatars[1],
    message: "That's a great opportunity. I can present my biomedical sensor research.",
    timestamp: '9:18 AM',
    room: 'top-10',
  },
  {
    id: 'C-010',
    sender: 'Ethan Rashid',
    avatar: avatars[3],
    message: "I'll prepare a demo of the predictive analytics model we built.",
    timestamp: '9:22 AM',
    room: 'top-10',
  },
];

export const dashboardStats = {
  totalStudents: 2847,
  activeUsers: 1923,
  averageGPA: 3.62,
  attendanceRate: 94.7,
  coursesActive: 186,
  eventsThisMonth: 12,
};

export const activityData = [
  { month: 'Jul', students: 2100, engagement: 78 },
  { month: 'Aug', students: 2450, engagement: 72 },
  { month: 'Sep', students: 2780, engagement: 85 },
  { month: 'Oct', students: 2690, engagement: 88 },
  { month: 'Nov', students: 2820, engagement: 91 },
  { month: 'Dec', students: 2847, engagement: 89 },
];

export const departmentData = [
  { name: 'Computer Sci & Engg', students: 420, color: '#2C3E6B' },
  { name: 'Information Technology', students: 380, color: '#4A8B8D' },
  { name: 'Mechanical Engg', students: 310, color: '#C4784A' },
  { name: 'Civil Engg', students: 245, color: '#6B7D5E' },
  { name: 'Electronics & Comm', students: 290, color: '#5A7091' },
  { name: 'Electrical Engg', students: 350, color: '#3D3832' },
];

export function getStudentsBySection(section: string): Student[] {
  return students.filter(s => s.section === section);
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
