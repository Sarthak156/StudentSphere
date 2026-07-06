import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, School, GraduationCap, BookOpen, X, Trash2 } from 'lucide-react';
import { users, students, type User, type Student } from '../data/mockData';

type Section = 'overview' | 'manage-teachers' | 'manage-students';

const avatars = [
  'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/11156392/pexels-photo-11156392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
];

// Temporary store for new items (in-memory only for demo)
let tempTeachers: User[] = [];
let tempStudents: Student[] = [];

export default function AdminDashboard() {
  const [section, setSection] = useState<Section>('overview');
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', department: '' });
  const [studentForm, setStudentForm] = useState({
    name: '', email: '', department: '', year: 1, section: 'A',
    phone: '', address: '', fatherName: '', motherName: '',
  });
  const [allStudents, setAllStudents] = useState<Student[]>([...students]);
  const [allTeachers, setAllTeachers] = useState<User[]>([
    ...users.filter(u => u.role === 'teacher'),
    ...tempTeachers,
  ]);

  const teachers = allTeachers;
  const studentsList = allStudents;

  const handleAddTeacher = () => {
    if (!teacherForm.name || !teacherForm.email || !teacherForm.department) return;
    const newTeacher: User = {
      id: `USR-TCH-${String(teachers.length + 1).padStart(3, '0')}`,
      name: teacherForm.name,
      email: teacherForm.email,
      password: 'teacher123',
      role: 'teacher',
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      department: teacherForm.department,
      assignedStudents: [],
    };
    const updated = [...teachers, newTeacher];
    setAllTeachers(updated);
    tempTeachers.push(newTeacher);
    setTeacherForm({ name: '', email: '', department: '' });
    setShowAddTeacher(false);
  };

  const handleAddStudent = () => {
    if (!studentForm.name || !studentForm.email || !studentForm.department) return;
    const newStudent: Student = {
      id: `STU-${String(studentsList.length + 1).padStart(3, '0')}`,
      name: studentForm.name,
      email: studentForm.email,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      department: studentForm.department,
      year: studentForm.year,
      semester: studentForm.year * 2 - 1,
      section: studentForm.section,
      gpa: 0,
      cgpa: 0,
      rank: studentsList.length + 1,
      rankChange: 0,
      status: 'active',
      scores: { academic: 0, social: 0, physical: 0, looks: 0, communication: 0, skills: 0 },
      achievements: [],
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
      phone: studentForm.phone,
      address: studentForm.address,
      dob: '',
      bloodGroup: '',
      emergencyContact: '',
      fatherName: studentForm.fatherName,
      motherName: studentForm.motherName,
      semesterResults: [],
      assignments: [],
      attendance: [],
      totalCredits: 160,
      completedCredits: 0,
      backlogs: 0,
    };
    const updated = [...studentsList, newStudent];
    setAllStudents(updated);
    tempStudents.push(newStudent);
    setStudentForm({ name: '', email: '', department: '', year: 1, section: 'A', phone: '', address: '', fatherName: '', motherName: '' });
    setShowAddStudent(false);
  };

  const handleDeleteStudent = (id: string) => {
    setAllStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleDeleteTeacher = (id: string) => {
    setAllTeachers(prev => prev.filter(t => t.id !== id));
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-off-black">Admin Dashboard</h2>
        <p className="text-sm text-graphite mt-1">Manage teachers, students, and system settings</p>
      </div>

      {/* Quick Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Teachers', value: teachers.length, icon: School, color: 'bg-accent-navy/10 text-accent-navy' },
          { label: 'Total Students', value: studentsList.length, icon: GraduationCap, color: 'bg-accent-teal/10 text-accent-teal' },
          { label: 'Active Students', value: studentsList.filter(s => s.status === 'active').length, icon: Users, color: 'bg-status-green/10 text-status-green' },
          { label: 'Departments', value: new Set(studentsList.map(s => s.department)).size, icon: BookOpen, color: 'bg-accent-orange/10 text-accent-orange' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemAnim} className="bg-surface-0 rounded-xl border border-border p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-graphite uppercase tracking-wider font-semibold">{stat.label}</p>
              <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon size={16} />
              </div>
            </div>
            <p className="font-display font-bold text-2xl text-off-black mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6 bg-surface-2 p-1 rounded-xl w-fit overflow-x-auto">
        {([
          { id: 'overview' as Section, label: 'Overview', icon: Users },
          { id: 'manage-teachers' as Section, label: 'Manage Teachers', icon: School },
          { id: 'manage-students' as Section, label: 'Manage Students', icon: GraduationCap },
        ]).map((tab) => {
          const isActive = section === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                isActive ? 'bg-surface-0 text-off-black shadow-sm' : 'text-graphite hover:text-charcoal'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {section === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-0 rounded-xl border border-border p-6">
            <h3 className="font-display font-semibold text-off-black mb-4">Recent Teachers</h3>
            <div className="space-y-3">
              {teachers.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-2 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-accent-navy/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent-navy">{t.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-off-black">{t.name}</p>
                    <p className="text-xs text-graphite">{t.department} · {t.assignedStudents?.length || 0} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-0 rounded-xl border border-border p-6">
            <h3 className="font-display font-semibold text-off-black mb-4">Department Distribution</h3>
            <div className="space-y-3">
              {Object.entries(
                studentsList.reduce((acc: Record<string, number>, s) => {
                  acc[s.department] = (acc[s.department] || 0) + 1;
                  return acc;
                }, {})
              ).sort((a, b) => b[1] - a[1]).map(([dept, count], i) => (
                <div key={dept} className="flex items-center gap-3">
                  <span className="text-xs text-graphite w-2 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-charcoal">{dept}</span>
                      <span className="text-xs text-graphite">{count}</span>
                    </div>
                    <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-navy rounded-full"
                        style={{ width: `${(count / Math.max(...Object.values(studentsList.reduce((acc, s) => { acc[s.department] = (acc[s.department] || 0) + 1; return acc; }, {} as Record<string, number>)))) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {section === 'manage-teachers' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-graphite">{teachers.length} teachers registered</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddTeacher(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-off-black text-warm-white rounded-xl hover:bg-charcoal transition-colors"
            >
              <UserPlus size={14} />
              <span>Add Teacher</span>
            </motion.button>
          </div>

          {/* Teacher List */}
          <div className="bg-surface-0 rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-surface-2 text-[10px] uppercase tracking-wider font-semibold text-graphite">
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Department</div>
              <div className="col-span-2">Students</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y divide-border-light">
              {teachers.map((t) => (
                <div key={t.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center hover:bg-surface-2 transition-colors">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-navy/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-accent-navy">{t.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-off-black font-medium">{t.name}</span>
                  </div>
                  <div className="col-span-3 text-xs text-charcoal">{t.department}</div>
                  <div className="col-span-2 text-xs text-graphite">{t.assignedStudents?.length || 0} assigned</div>
                  <div className="col-span-2 text-xs text-graphite truncate">{t.email}</div>
                  <div className="col-span-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteTeacher(t.id)}
                      className="p-1.5 rounded-lg hover:bg-status-red/10 text-graphite hover:text-status-red transition-colors"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Teacher Modal */}
          {showAddTeacher && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface-0 rounded-2xl border border-border p-6 w-full max-w-md shadow-xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-semibold text-off-black">Add Teacher</h3>
                  <button onClick={() => setShowAddTeacher(false)} className="p-1 rounded-lg hover:bg-surface-2 transition-colors">
                    <X size={18} className="text-graphite" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-graphite mb-1.5">Full Name</label>
                    <input
                      value={teacherForm.name}
                      onChange={e => setTeacherForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Dr. Jane Doe"
                      className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-graphite mb-1.5">Email</label>
                    <input
                      value={teacherForm.email}
                      onChange={e => setTeacherForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="j.doe@studentsphere.edu"
                      className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-graphite mb-1.5">Department</label>
                    <input
                      value={teacherForm.department}
                      onChange={e => setTeacherForm(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Computer Science"
                      className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
                    />
                  </div>
                  <p className="text-[10px] text-graphite/60">Default password: <span className="font-mono">teacher123</span></p>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddTeacher}
                    disabled={!teacherForm.name || !teacherForm.email || !teacherForm.department}
                    className="w-full py-2.5 bg-off-black text-warm-white text-sm font-medium rounded-xl hover:bg-charcoal transition-colors disabled:opacity-30"
                  >
                    Add Teacher
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}

      {section === 'manage-students' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-graphite">{studentsList.length} students enrolled</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddStudent(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-off-black text-warm-white rounded-xl hover:bg-charcoal transition-colors"
            >
              <UserPlus size={14} />
              <span>Add Student</span>
            </motion.button>
          </div>

          {/* Student List */}
          <div className="bg-surface-0 rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-surface-2 text-[10px] uppercase tracking-wider font-semibold text-graphite">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">ID</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-1">GPA</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y divide-border-light max-h-[500px] overflow-y-auto">
              {studentsList.map((s) => (
                <div key={s.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center hover:bg-surface-2 transition-colors">
                  <div className="col-span-4 flex items-center gap-3">
                    <img src={s.avatar} className="w-7 h-7 rounded-lg object-cover" alt="" />
                    <span className="text-sm text-off-black font-medium truncate">{s.name}</span>
                  </div>
                  <div className="col-span-2 text-xs text-graphite font-mono">{s.id}</div>
                  <div className="col-span-2 text-xs text-charcoal truncate">{s.department}</div>
                  <div className="col-span-1 text-xs text-charcoal">{s.year}</div>
                  <div className="col-span-1 text-xs font-display font-bold text-off-black">{s.gpa.toFixed(2)}</div>
                  <div className="col-span-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      s.status === 'active' ? 'bg-status-green/10 text-status-green' :
                      s.status === 'on-leave' ? 'bg-status-amber/10 text-status-amber' :
                      'bg-status-red/10 text-status-red'
                    }`}>{s.status}</span>
                  </div>
                  <div className="col-span-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteStudent(s.id)}
                      className="p-1.5 rounded-lg hover:bg-status-red/10 text-graphite hover:text-status-red transition-colors"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Student Modal */}
          {showAddStudent && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface-0 rounded-2xl border border-border p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-semibold text-off-black">Add Student</h3>
                  <button onClick={() => setShowAddStudent(false)} className="p-1 rounded-lg hover:bg-surface-2 transition-colors">
                    <X size={18} className="text-graphite" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Full Name</label>
                      <input value={studentForm.name} onChange={e => setStudentForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Email</label>
                      <input value={studentForm.email} onChange={e => setStudentForm(p => ({ ...p, email: e.target.value }))} placeholder="j.doe@..." className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Department</label>
                      <input value={studentForm.department} onChange={e => setStudentForm(p => ({ ...p, department: e.target.value }))} placeholder="Computer Science" className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Year</label>
                      <select value={studentForm.year} onChange={e => setStudentForm(p => ({ ...p, year: Number(e.target.value) }))} className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all">
                        {[1, 2, 3, 4].map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Phone</label>
                      <input value={studentForm.phone} onChange={e => setStudentForm(p => ({ ...p, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Section</label>
                      <select value={studentForm.section} onChange={e => setStudentForm(p => ({ ...p, section: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all">
                        {['A', 'B', 'C'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-graphite mb-1.5">Address</label>
                    <input value={studentForm.address} onChange={e => setStudentForm(p => ({ ...p, address: e.target.value }))} placeholder="123 Campus Drive" className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Father's Name</label>
                      <input value={studentForm.fatherName} onChange={e => setStudentForm(p => ({ ...p, fatherName: e.target.value }))} placeholder="Father name" className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-graphite mb-1.5">Mother's Name</label>
                      <input value={studentForm.motherName} onChange={e => setStudentForm(p => ({ ...p, motherName: e.target.value }))} placeholder="Mother name" className="w-full px-3 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray" />
                    </div>
                  </div>
                  <p className="text-[10px] text-graphite/60">Default password: <span className="font-mono">student123</span></p>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddStudent}
                    disabled={!studentForm.name || !studentForm.email || !studentForm.department}
                    className="w-full py-2.5 bg-off-black text-warm-white text-sm font-medium rounded-xl hover:bg-charcoal transition-colors disabled:opacity-30"
                  >
                    Add Student
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
