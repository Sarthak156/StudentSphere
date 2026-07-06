export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  department?: string;
  assignedStudents?: string[]; // teacher's assigned student IDs
  assignedTeacher?: string;    // student's assigned teacher ID
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
  name: string;
  email: string;
  avatar: string;
  department: string;
  year: number;
  semester: number;
  section: string;
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
  totalCredits: number;
  completedCredits: number;
  backlogs: number;
  assignedTeacher?: string;
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

const generateSemesterResults = (baseGpa: number): SemesterResult[] => {
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
    name: 'Dr. Rebecca Thornton',
    email: 'admin@studentsphere.edu',
    password: 'admin123',
    role: 'admin',
    avatar: teacherAvatars[0],
    department: 'Administration',
  },
  {
    id: 'USR-TCH-001',
    name: 'Prof. James Mitchell',
    email: 'j.mitchell@studentsphere.edu',
    password: 'teacher123',
    role: 'teacher',
    avatar: teacherAvatars[1],
    department: 'Computer Science',
    assignedStudents: ['STU-001', 'STU-003', 'STU-005', 'STU-008', 'STU-010'],
  },
  {
    id: 'USR-TCH-002',
    name: 'Dr. Sarah Chen',
    email: 's.chen@studentsphere.edu',
    password: 'teacher123',
    role: 'teacher',
    avatar: teacherAvatars[0],
    department: 'Computer Science',
    assignedStudents: ['STU-002', 'STU-004', 'STU-006', 'STU-007', 'STU-009', 'STU-011', 'STU-012'],
  },
  {
    id: 'USR-STU-001',
    name: 'Alexander Mercer',
    email: 'a.mercer@studentsphere.edu',
    password: 'student123',
    role: 'student',
    avatar: avatars[0],
    department: 'Computer Science',
    assignedTeacher: 'USR-TCH-001',
  },
  {
    id: 'USR-STU-002',
    name: 'Priya Nandakumar',
    email: 'p.nandakumar@studentsphere.edu',
    password: 'student123',
    role: 'student',
    avatar: avatars[1],
    department: 'Biomedical Engineering',
    assignedTeacher: 'USR-TCH-002',
  },
  {
    id: 'USR-STU-003',
    name: 'Marcus Okafor',
    email: 'm.okafor@studentsphere.edu',
    password: 'student123',
    role: 'student',
    avatar: avatars[2],
    department: 'Architecture',
    assignedTeacher: 'USR-TCH-001',
  },
];

export const students: Student[] = [
  {
    id: 'STU-001',
    name: 'Alexander Mercer',
    email: 'a.mercer@studentsphere.edu',
    avatar: avatars[0],
    department: 'Computer Science',
    year: 3,
    semester: 5,
    section: 'A',
    gpa: 3.94,
    cgpa: 3.88,
    rank: 1,
    rankChange: 2,
    status: 'active',
    scores: { academic: 96, social: 82, physical: 74, looks: 78, communication: 88, skills: 92 },
    achievements: ["Dean's List", 'Hackathon Winner', 'Research Published', 'Peer Mentor', 'Best Project Award'],
    joinDate: '2023-08-15',
    lastActive: '2 min ago',
    phone: '+1 (555) 123-4567',
    address: '42 College Ave, University District',
    dob: '2003-04-12',
    bloodGroup: 'O+',
    emergencyContact: '+1 (555) 987-6543',
    fatherName: 'Robert Mercer',
    motherName: 'Elena Mercer',
    semesterResults: generateSemesterResults(3.88),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 98,
    backlogs: 0,
    assignedTeacher: 'USR-TCH-001',
    mentorName: 'Prof. James Mitchell',
  },
  {
    id: 'STU-002',
    name: 'Priya Nandakumar',
    email: 'p.nandakumar@studentsphere.edu',
    avatar: avatars[1],
    department: 'Biomedical Engineering',
    year: 4,
    semester: 7,
    section: 'A',
    gpa: 3.91,
    cgpa: 3.85,
    rank: 2,
    rankChange: 0,
    status: 'active',
    scores: { academic: 94, social: 90, physical: 68, looks: 85, communication: 92, skills: 88 },
    achievements: ['Valedictorian Candidate', 'Lab Excellence Award', 'Student Council', 'Research Grant'],
    joinDate: '2022-08-20',
    lastActive: '5 min ago',
    phone: '+1 (555) 234-5678',
    address: '78 Science Blvd, Research Park',
    dob: '2002-09-28',
    bloodGroup: 'A+',
    emergencyContact: '+1 (555) 876-5432',
    fatherName: 'Raj Nandakumar',
    motherName: 'Lakshmi Nandakumar',
    semesterResults: generateSemesterResults(3.85),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 135,
    backlogs: 0,
    assignedTeacher: 'USR-TCH-002',
    mentorName: 'Dr. Sarah Chen',
  },
  {
    id: 'STU-003',
    name: 'Marcus Okafor',
    email: 'm.okafor@studentsphere.edu',
    avatar: avatars[2],
    department: 'Architecture',
    year: 2,
    semester: 4,
    section: 'B',
    gpa: 3.87,
    cgpa: 3.82,
    rank: 3,
    rankChange: 1,
    status: 'active',
    scores: { academic: 88, social: 86, physical: 90, looks: 82, communication: 78, skills: 94 },
    achievements: ['Design Competition Winner', 'Athletic Excellence', 'Portfolio Showcase'],
    joinDate: '2024-08-10',
    lastActive: '12 min ago',
    phone: '+1 (555) 345-6789',
    address: '15 Design Row, Creative Quarter',
    dob: '2004-02-15',
    bloodGroup: 'B+',
    emergencyContact: '+1 (555) 765-4321',
    fatherName: 'Chidi Okafor',
    motherName: 'Amara Okafor',
    semesterResults: generateSemesterResults(3.82),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 62,
    backlogs: 0,
    assignedTeacher: 'USR-TCH-001',
    mentorName: 'Prof. James Mitchell',
  },
  {
    id: 'STU-004',
    name: 'Ethan Rashid',
    email: 'e.rashid@studentsphere.edu',
    avatar: avatars[3],
    department: 'Data Science',
    year: 3,
    semester: 5,
    section: 'A',
    gpa: 3.82,
    cgpa: 3.76,
    rank: 4,
    rankChange: -1,
    status: 'active',
    scores: { academic: 90, social: 74, physical: 72, looks: 80, communication: 84, skills: 90 },
    achievements: ['Analytics Challenge Winner', 'Teaching Assistant', 'Open Source Contributor'],
    joinDate: '2023-08-15',
    lastActive: '30 min ago',
    phone: '+1 (555) 456-7890',
    address: '27 Data Lane, Tech Park',
    dob: '2003-07-22',
    bloodGroup: 'AB+',
    emergencyContact: '+1 (555) 654-3210',
    fatherName: 'Omar Rashid',
    motherName: 'Fatima Rashid',
    semesterResults: generateSemesterResults(3.76),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 92,
    backlogs: 1,
    assignedTeacher: 'USR-TCH-002',
    mentorName: 'Dr. Sarah Chen',
  },
  {
    id: 'STU-005',
    name: 'Jordan Kimathi',
    email: 'j.kimathi@studentsphere.edu',
    avatar: avatars[4],
    department: 'Mechanical Engineering',
    year: 2,
    semester: 3,
    section: 'A',
    gpa: 3.78,
    cgpa: 3.74,
    rank: 5,
    rankChange: 3,
    status: 'active',
    scores: { academic: 86, social: 88, physical: 92, looks: 76, communication: 80, skills: 86 },
    achievements: ['Robotics Club Lead', 'Innovation Award', 'Community Service'],
    joinDate: '2024-08-10',
    lastActive: '1 hr ago',
    phone: '+1 (555) 567-8901',
    address: '56 Engineering Drive, Innovation Hub',
    dob: '2004-11-03',
    bloodGroup: 'O-',
    emergencyContact: '+1 (555) 543-2109',
    fatherName: 'Kwame Kimathi',
    motherName: 'Zuri Kimathi',
    semesterResults: generateSemesterResults(3.74),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 45,
    backlogs: 0,
    assignedTeacher: 'USR-TCH-001',
    mentorName: 'Prof. James Mitchell',
  },
  {
    id: 'STU-006',
    name: 'Daniel Okonkwo',
    email: 'd.okonkwo@studentsphere.edu',
    avatar: avatars[5],
    department: 'Economics',
    year: 4,
    semester: 8,
    section: 'A',
    gpa: 3.75,
    cgpa: 3.70,
    rank: 6,
    rankChange: -2,
    status: 'active',
    scores: { academic: 84, social: 92, physical: 70, looks: 88, communication: 94, skills: 78 },
    achievements: ['Debate Champion', 'Model UN Award', 'Entrepreneurship Prize'],
    joinDate: '2022-08-20',
    lastActive: '2 hr ago',
    phone: '+1 (555) 678-9012',
    address: '89 Economics Street, Business District',
    dob: '2002-05-18',
    bloodGroup: 'A-',
    emergencyContact: '+1 (555) 432-1098',
    fatherName: 'Emeka Okonkwo',
    motherName: 'Nkechi Okonkwo',
    semesterResults: generateSemesterResults(3.70),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 158,
    backlogs: 1,
    assignedTeacher: 'USR-TCH-002',
    mentorName: 'Dr. Sarah Chen',
  },
  {
    id: 'STU-007',
    name: 'Amira Hassan',
    email: 'a.hassan@studentsphere.edu',
    avatar: avatars[6],
    department: 'Medicine',
    year: 3,
    semester: 6,
    section: 'A',
    gpa: 3.96,
    cgpa: 3.92,
    rank: 7,
    rankChange: 1,
    status: 'active',
    scores: { academic: 98, social: 76, physical: 66, looks: 82, communication: 86, skills: 90 },
    achievements: ['Top Academic Performer', 'Research Fellowship', 'Clinical Excellence'],
    joinDate: '2023-08-15',
    lastActive: '45 min ago',
    phone: '+1 (555) 789-0123',
    address: '12 Medical Plaza, Health Campus',
    dob: '2003-08-09',
    bloodGroup: 'B-',
    emergencyContact: '+1 (555) 321-0987',
    fatherName: 'Yusuf Hassan',
    motherName: 'Leila Hassan',
    semesterResults: generateSemesterResults(3.92),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 110,
    backlogs: 0,
    assignedTeacher: 'USR-TCH-002',
    mentorName: 'Dr. Sarah Chen',
  },
  {
    id: 'STU-008',
    name: 'Liam Hartwell',
    email: 'l.hartwell@studentsphere.edu',
    avatar: avatars[0],
    department: 'Physics',
    year: 2,
    semester: 3,
    section: 'B',
    gpa: 3.70,
    cgpa: 3.66,
    rank: 8,
    rankChange: 0,
    status: 'on-leave',
    scores: { academic: 82, social: 70, physical: 80, looks: 74, communication: 76, skills: 88 },
    achievements: ['Physics Olympiad Medalist', 'Lab Innovation Award'],
    joinDate: '2024-08-10',
    lastActive: '3 days ago',
    phone: '+1 (555) 890-1234',
    address: '34 Physics Wing, Science Complex',
    dob: '2004-01-27',
    bloodGroup: 'AB-',
    emergencyContact: '+1 (555) 210-9876',
    fatherName: 'Thomas Hartwell',
    motherName: 'Claire Hartwell',
    semesterResults: generateSemesterResults(3.66),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 42,
    backlogs: 2,
    assignedTeacher: 'USR-TCH-001',
    mentorName: 'Prof. James Mitchell',
  },
  {
    id: 'STU-009',
    name: 'Sofia Ramirez',
    email: 's.ramirez@studentsphere.edu',
    avatar: avatars[1],
    department: 'Environmental Science',
    year: 3,
    semester: 5,
    section: 'A',
    gpa: 3.68,
    cgpa: 3.62,
    rank: 9,
    rankChange: -1,
    status: 'active',
    scores: { academic: 80, social: 88, physical: 76, looks: 86, communication: 90, skills: 82 },
    achievements: ['Sustainability Award', 'Field Research Grant', 'Peer Tutor'],
    joinDate: '2023-08-15',
    lastActive: '20 min ago',
    phone: '+1 (555) 901-2345',
    address: '67 Green Campus Drive, Eco Park',
    dob: '2003-11-14',
    bloodGroup: 'A+',
    emergencyContact: '+1 (555) 109-8765',
    fatherName: 'Carlos Ramirez',
    motherName: 'Maria Ramirez',
    semesterResults: generateSemesterResults(3.62),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 88,
    backlogs: 1,
    assignedTeacher: 'USR-TCH-002',
    mentorName: 'Dr. Sarah Chen',
  },
  {
    id: 'STU-010',
    name: 'Noah Patel',
    email: 'n.patel@studentsphere.edu',
    avatar: avatars[2],
    department: 'Mathematics',
    year: 4,
    semester: 7,
    section: 'A',
    gpa: 3.88,
    cgpa: 3.84,
    rank: 10,
    rankChange: 2,
    status: 'active',
    scores: { academic: 92, social: 72, physical: 64, looks: 70, communication: 78, skills: 96 },
    achievements: ['Math Olympiad Gold', 'Algorithm Competition Winner', 'Graduate Offer'],
    joinDate: '2022-08-20',
    lastActive: '1 hr ago',
    phone: '+1 (555) 012-3456',
    address: '45 Math Tower, Science Complex',
    dob: '2002-12-01',
    bloodGroup: 'O+',
    emergencyContact: '+1 (555) 098-7654',
    fatherName: 'Arjun Patel',
    motherName: 'Divya Patel',
    semesterResults: generateSemesterResults(3.84),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 132,
    backlogs: 0,
    assignedTeacher: 'USR-TCH-001',
    mentorName: 'Prof. James Mitchell',
  },
  {
    id: 'STU-011',
    name: 'Isabella Chen',
    email: 'i.chen@studentsphere.edu',
    avatar: avatars[6],
    department: 'Psychology',
    year: 2,
    semester: 4,
    section: 'B',
    gpa: 3.72,
    cgpa: 3.68,
    rank: 11,
    rankChange: 0,
    status: 'active',
    scores: { academic: 84, social: 94, physical: 72, looks: 90, communication: 88, skills: 76 },
    achievements: ['Research Assistant', 'Psychology Society President'],
    joinDate: '2024-08-10',
    lastActive: '15 min ago',
    phone: '+1 (555) 123-7890',
    address: '22 Behavioral Sciences Building',
    dob: '2004-06-19',
    bloodGroup: 'A+',
    emergencyContact: '+1 (555) 789-0123',
    fatherName: 'Wei Chen',
    motherName: 'Lin Chen',
    semesterResults: generateSemesterResults(3.68),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 58,
    backlogs: 0,
    assignedTeacher: 'USR-TCH-002',
    mentorName: 'Dr. Sarah Chen',
  },
  {
    id: 'STU-012',
    name: 'Kai Tanaka',
    email: 'k.tanaka@studentsphere.edu',
    avatar: avatars[3],
    department: 'Industrial Design',
    year: 3,
    semester: 5,
    section: 'A',
    gpa: 3.65,
    cgpa: 3.60,
    rank: 12,
    rankChange: -3,
    status: 'inactive',
    scores: { academic: 78, social: 80, physical: 86, looks: 84, communication: 82, skills: 92 },
    achievements: ['Design Portfolio Award', 'UX Competition Finalist'],
    joinDate: '2023-08-15',
    lastActive: '1 week ago',
    phone: '+1 (555) 456-0123',
    address: '90 Design Studio, Creative Quarter',
    dob: '2003-10-08',
    bloodGroup: 'B+',
    emergencyContact: '+1 (555) 321-0987',
    fatherName: 'Hiro Tanaka',
    motherName: 'Yuki Tanaka',
    semesterResults: generateSemesterResults(3.60),
    assignments: generateAssignments(),
    attendance: generateAttendance(),
    totalCredits: 160,
    completedCredits: 85,
    backlogs: 2,
    assignedTeacher: 'USR-TCH-002',
    mentorName: 'Dr. Sarah Chen',
  },
];

export const notices: Notice[] = [
  {
    id: 'N-001',
    title: 'Semester Examination Schedule Released',
    content: 'The final examination schedule for the current semester has been published. Students are advised to check their respective department portals for detailed timetables and venue allocations.',
    category: 'academic',
    pinned: true,
    author: 'Academic Office',
    date: '2025-12-15',
    targetAudience: ['admin', 'teacher', 'student'],
  },
  {
    id: 'N-002',
    title: 'Annual Innovation Summit 2026',
    content: 'Registration is now open for the Annual Innovation Summit. This year features keynote speakers from leading tech companies and research institutions.',
    category: 'event',
    pinned: true,
    author: 'Innovation Cell',
    date: '2025-12-14',
    targetAudience: ['admin', 'teacher', 'student'],
  },
  {
    id: 'N-003',
    title: 'Faculty Development Program',
    content: 'A two-day faculty development program on modern pedagogical techniques will be held. All faculty members are requested to confirm participation.',
    category: 'academic',
    pinned: false,
    author: 'Academic Office',
    date: '2025-12-13',
    targetAudience: ['admin', 'teacher'],
  },
  {
    id: 'N-004',
    title: 'Scholarship Application Deadline Extended',
    content: 'The deadline for merit-based scholarship applications has been extended to January 31st, 2026. Students with a GPA of 3.5 and above are encouraged to apply.',
    category: 'urgent',
    pinned: true,
    author: 'Financial Aid Office',
    date: '2025-12-12',
    targetAudience: ['admin', 'teacher', 'student'],
  },
  {
    id: 'N-005',
    title: 'Staff Meeting - Curriculum Review',
    content: 'Mandatory staff meeting for curriculum review on December 20th. Please review the proposed changes before the meeting.',
    category: 'academic',
    pinned: false,
    author: 'Dean Office',
    date: '2025-12-11',
    targetAudience: ['admin', 'teacher'],
  },
  {
    id: 'N-006',
    title: 'Research Paper Submission Guidelines Updated',
    content: 'Updated guidelines for undergraduate research paper submissions are now available. All submissions must follow the new formatting standards.',
    category: 'academic',
    pinned: false,
    author: 'Research Department',
    date: '2025-12-10',
    targetAudience: ['admin', 'teacher', 'student'],
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'C-001',
    sender: 'Alexander Mercer',
    avatar: avatars[0],
    message: 'Has anyone started working on the distributed systems project? Looking for study group partners.',
    timestamp: '10:24 AM',
    room: 'general',
  },
  {
    id: 'C-002',
    sender: 'Priya Nandakumar',
    avatar: avatars[1],
    message: "I'm in! The consensus algorithms section is particularly interesting. Let's meet at the library tomorrow?",
    timestamp: '10:26 AM',
    room: 'general',
  },
  {
    id: 'C-003',
    sender: 'Marcus Okafor',
    avatar: avatars[2],
    message: "Count me in too. I've been reviewing the Raft paper. Really elegant design.",
    timestamp: '10:28 AM',
    room: 'general',
  },
  {
    id: 'C-004',
    sender: 'Amira Hassan',
    avatar: avatars[6],
    message: 'Great initiative! The study room on 3rd floor is usually available after 4 PM.',
    timestamp: '10:31 AM',
    room: 'general',
  },
  {
    id: 'C-005',
    sender: 'Daniel Okonkwo',
    avatar: avatars[5],
    message: 'Anyone attending the guest lecture on behavioral economics this Friday?',
    timestamp: '10:35 AM',
    room: 'general',
  },
  {
    id: 'C-006',
    sender: 'Sofia Ramirez',
    avatar: avatars[1],
    message: "Yes! Professor Williams is an amazing speaker. Last year's talk was phenomenal.",
    timestamp: '10:37 AM',
    room: 'general',
  },
  {
    id: 'C-007',
    sender: 'Noah Patel',
    avatar: avatars[2],
    message: 'Just finished the linear algebra problem set. That eigenvalue decomposition problem was tricky.',
    timestamp: '10:40 AM',
    room: 'general',
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
  { name: 'Computer Science', students: 420, color: '#2C3E6B' },
  { name: 'Engineering', students: 380, color: '#4A8B8D' },
  { name: 'Medicine', students: 310, color: '#C4784A' },
  { name: 'Architecture', students: 245, color: '#6B7D5E' },
  { name: 'Economics', students: 290, color: '#5A7091' },
  { name: 'Sciences', students: 350, color: '#3D3832' },
];

export function getStudentsByTeacher(teacherId: string): Student[] {
  const teacher = users.find(u => u.id === teacherId);
  if (!teacher?.assignedStudents) return [];
  return students.filter(s => teacher.assignedStudents!.includes(s.id));
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
