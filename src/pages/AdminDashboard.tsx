import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus, School, GraduationCap, X, Trash2,
  ShieldCheck, FileText, Download, Building, CheckCircle
} from 'lucide-react';
import { users, students, type User, type Student, IPS_BRANCHES } from '../data/mockData';

type AdminTab = 'overview' | 'manage-faculty' | 'manage-coordinators' | 'manage-students' | 'reports';

const avatars = [
  'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/11156392/pexels-photo-11156392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
];

let tempTeachers: User[] = [];
let tempStudents: Student[] = [];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [reportGenerated, setReportGenerated] = useState<string | null>(null);

  // Faculty Form state
  const [teacherForm, setTeacherForm] = useState({
    name: '', email: '', branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS', sections: 'T-1, S-1', subjectCode: 'PCC-DS601', subjectName: 'Deep Learning'
  });

  // Student Form state
  const [studentForm, setStudentForm] = useState({
    name: '', email: '', branch: 'Computer Science & Engineering (Data Science)',
    branchCode: 'DS', year: 3, section: 'T-1', computerCode: '241199',
    enrollmentNo: '0808DS241199', phone: '+91 98260 00000', address: 'Indore (M.P.)',
    fatherName: '', motherName: ''
  });

  const [allStudents, setAllStudents] = useState<Student[]>([...students]);
  const [allTeachers, setAllTeachers] = useState<User[]>([
    ...users.filter(u => u.role === 'faculty'),
    ...tempTeachers,
  ]);

  const coordinators = users.filter(u => u.role === 'coordinator');

  const handleAddTeacher = () => {
    if (!teacherForm.name || !teacherForm.email) return;
    const newTeacher: User = {
      id: `USR-TCH-${String(allTeachers.length + 1).padStart(3, '0')}`,
      name: teacherForm.name,
      email: teacherForm.email,
      password: 'teacher123',
      role: 'faculty',
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      branch: teacherForm.branch,
      branchCode: teacherForm.branchCode,
      assignedSections: teacherForm.sections.split(',').map(s => s.trim()),
      assignedSubjects: [
        {
          code: teacherForm.subjectCode,
          name: teacherForm.subjectName,
          branch: teacherForm.branchCode,
          semester: 6,
          sections: teacherForm.sections.split(',').map(s => s.trim())
        }
      ],
      assignedStudents: [],
    };
    setAllTeachers(prev => [...prev, newTeacher]);
    tempTeachers.push(newTeacher);
    setTeacherForm({ name: '', email: '', branch: 'Computer Science & Engineering (Data Science)', branchCode: 'DS', sections: 'T-1, S-1', subjectCode: 'PCC-DS601', subjectName: 'Deep Learning' });
    setShowAddTeacher(false);
  };

  const handleAddStudent = () => {
    if (!studentForm.name || !studentForm.computerCode) return;
    const newStudent: Student = {
      id: `STU-${studentForm.computerCode}`,
      computerCode: studentForm.computerCode,
      enrollmentNo: studentForm.enrollmentNo || `0808${studentForm.branchCode}${studentForm.computerCode}`,
      name: studentForm.name,
      email: studentForm.email || `${studentForm.enrollmentNo}.ies@ipsacademy.org`,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      institute: 'Institute of Engineering & Science (IES)',
      branch: studentForm.branch,
      branchCode: studentForm.branchCode,
      year: studentForm.year,
      semester: studentForm.year * 2,
      section: studentForm.section,
      rollNumber: studentForm.enrollmentNo,
      admissionYear: 2026 - studentForm.year,
      coordinatorName: 'Dr. Rajeshwar Singh',
      facultyAdvisor: 'Prof. Amit Verma',
      gpa: 3.80,
      cgpa: 3.78,
      rank: allStudents.length + 1,
      rankChange: 0,
      status: 'active',
      scores: { academic: 88, social: 85, physical: 80, looks: 82, communication: 86, skills: 88 },
      achievements: ['New IES Enrolment 2026'],
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
      phone: studentForm.phone,
      address: studentForm.address,
      dob: '2005-01-01',
      bloodGroup: 'O+',
      emergencyContact: '+91 98260 11111',
      fatherName: studentForm.fatherName || 'Shri Parent Name',
      motherName: studentForm.motherName || 'Smt. Parent Name',
      semesterResults: [],
      assignments: [],
      attendance: [],
      internalMarks: [],
      totalCredits: 160,
      completedCredits: 0,
      backlogs: 0,
    };
    setAllStudents(prev => [newStudent, ...prev]);
    tempStudents.push(newStudent);
    setStudentForm({ name: '', email: '', branch: 'Computer Science & Engineering (Data Science)', branchCode: 'DS', year: 3, section: 'T-1', computerCode: String(Math.floor(241000 + Math.random() * 900)), enrollmentNo: '', phone: '+91 98260 00000', address: 'Indore (M.P.)', fatherName: '', motherName: '' });
    setShowAddStudent(false);
  };

  const handleDeleteStudent = (id: string) => {
    setAllStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleDeleteTeacher = (id: string) => {
    setAllTeachers(prev => prev.filter(t => t.id !== id));
  };

  const triggerReport = (reportName: string) => {
    setReportGenerated(reportName);
    setTimeout(() => setReportGenerated(null), 4000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-navy/10 flex items-center justify-center flex-shrink-0 mt-1">
              <ShieldCheck size={26} className="text-accent-navy" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-semibold bg-accent-navy/10 text-accent-navy px-2.5 py-0.5 rounded-full">
                  Central Administration Portal
                </span>
                <span className="text-xs text-graphite font-mono">IPS Academy ERP Controller</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-off-black mt-2">
                Dr. Archana Sharma (Principal / Admin)
              </h2>
              <p className="text-xs text-graphite mt-1">
                Managing: <span className="font-semibold text-charcoal">Institute of Engineering & Science (IES)</span> + 6 Sister Institutes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-surface-2 p-4 rounded-xl border border-border/60 self-start md:self-auto flex-wrap">
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Total Enrolled</p>
              <p className="font-display font-bold text-2xl text-off-black mt-0.5">3,420</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Branches</p>
              <p className="font-display font-bold text-2xl text-accent-teal mt-0.5">{IPS_BRANCHES.length}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Faculty & Staff</p>
              <p className="font-display font-bold text-2xl text-accent-navy mt-0.5">{allTeachers.length + coordinators.length + 180}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-2 bg-surface-2 p-1 rounded-xl w-fit overflow-x-auto">
        {[
          { id: 'overview' as AdminTab, label: 'Institutes & Branch Overview', icon: Building },
          { id: 'manage-faculty' as AdminTab, label: `Faculty Allocation (${allTeachers.length})`, icon: School },
          { id: 'manage-coordinators' as AdminTab, label: `Section Coordinators (${coordinators.length})`, icon: ShieldCheck },
          { id: 'manage-students' as AdminTab, label: `Student Directory (${allStudents.length})`, icon: GraduationCap },
          { id: 'reports' as AdminTab, label: 'ERP Reports & Exports', icon: FileText },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                isActive ? 'bg-surface-0 text-off-black shadow-sm font-semibold' : 'text-graphite hover:text-charcoal'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Sister Institutes under IPS Academy */}
            <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg text-off-black">IPS Academy Institute Ecosystem</h3>
              <p className="text-xs text-graphite">Centralized multi-institute structure supported by this architecture</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Institute of Engineering & Science (IES)', code: '0808', status: 'Active (Current ERP)', students: '3,420 Enrolled', primary: true },
                  { name: 'Institute of Management Research & Tech', code: '0801', status: 'Sister Institute', students: '1,200 Enrolled' },
                  { name: 'Institute of Pharmacy', code: '0804', status: 'Sister Institute', students: '650 Enrolled' },
                  { name: 'Institute of Architecture', code: '0812', status: 'Sister Institute', students: '420 Enrolled' },
                  { name: 'Institute of Law', code: '0818', status: 'Sister Institute', students: '580 Enrolled' },
                  { name: 'Institute of Hotel Management', code: '0822', status: 'Sister Institute', students: '310 Enrolled' },
                ].map((inst) => (
                  <div key={inst.code} className={`p-4 rounded-xl border transition-all ${inst.primary ? 'bg-accent-navy/5 border-accent-navy/30 ring-1 ring-accent-navy/10' : 'bg-surface-2/60 border-border/70'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold bg-surface-0 px-2 py-0.5 rounded border border-border">
                        Code: {inst.code}
                      </span>
                      <span className={`text-[10px] font-bold ${inst.primary ? 'text-accent-navy' : 'text-graphite'}`}>
                        {inst.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-off-black mt-1.5">{inst.name}</h4>
                    <p className="text-xs text-graphite mt-1">{inst.students}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch Distribution inside IES */}
            <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg text-off-black">IES Engineering Branch Distribution</h3>
              <div className="space-y-3">
                {IPS_BRANCHES.slice(0, 8).map((b, i) => (
                  <div key={b.code} className="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border/60 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 font-bold font-mono bg-surface-0 py-1 text-center rounded text-charcoal border border-border flex-shrink-0">
                        {b.code}
                      </span>
                      <span className="font-semibold text-off-black truncate">{b.name}</span>
                    </div>
                    <span className="font-mono text-charcoal bg-surface-0 px-3 py-1 rounded border border-border">
                      {[480, 360, 340, 310, 280, 420, 290, 240][i % 8]} Students
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Stats & System Status */}
          <div className="space-y-6">
            <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
              <h3 className="font-display font-semibold text-off-black">ERP Server & Database Health</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 bg-surface-2 rounded-xl">
                  <span className="text-graphite">Database Latency</span>
                  <span className="font-mono font-bold text-status-green">14 ms (Optimized)</span>
                </div>
                <div className="flex justify-between p-3 bg-surface-2 rounded-xl">
                  <span className="text-graphite">Daily Active Sessions</span>
                  <span className="font-mono font-bold text-charcoal">2,840 users</span>
                </div>
                <div className="flex justify-between p-3 bg-surface-2 rounded-xl">
                  <span className="text-graphite">Attendance Sync Rate</span>
                  <span className="font-mono font-bold text-accent-teal">99.8% Live</span>
                </div>
                <div className="flex justify-between p-3 bg-surface-2 rounded-xl">
                  <span className="text-graphite">Examination Portal Lock</span>
                  <span className="font-mono font-bold text-status-amber">Unlocks April 25</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Faculty */}
      {activeTab === 'manage-faculty' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-off-black">Faculty & Subject Allocation Register</h3>
              <p className="text-xs text-graphite mt-0.5">Hierarchy: Faculty → Subject → Branch → Semester → Sections</p>
            </div>
            <button
              onClick={() => setShowAddTeacher(true)}
              className="px-4 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
            >
              <UserPlus size={15} />
              <span>Allocate New Faculty</span>
            </button>
          </div>

          <div className="bg-surface-0 rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 gap-2 px-6 py-3.5 bg-surface-2 text-[10px] uppercase font-bold text-graphite tracking-wider border-b border-border">
              <div className="col-span-4">Faculty Member & Email</div>
              <div className="col-span-3">Assigned Branch & Sections</div>
              <div className="col-span-4">Allocated Subject & Code</div>
              <div className="col-span-1 text-right">Action</div>
            </div>
            <div className="divide-y divide-border-light max-h-[500px] overflow-y-auto">
              {allTeachers.map((t) => (
                <div key={t.id} className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-surface-2/60 transition-colors text-xs">
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-off-black truncate">{t.name}</p>
                      <p className="text-[11px] font-mono text-graphite truncate">{t.email}</p>
                    </div>
                  </div>
                  <div className="col-span-3 font-mono">
                    <p className="font-semibold text-charcoal">{t.branchCode || 'DS'} ({t.branch?.split(' ')[0]})</p>
                    <p className="text-[11px] text-accent-navy font-bold mt-0.5">Sections: {t.assignedSections?.join(', ') || 'T-1, S-1'}</p>
                  </div>
                  <div className="col-span-4">
                    {t.assignedSubjects && t.assignedSubjects.length > 0 ? (
                      <div>
                        <p className="font-semibold text-off-black">{t.assignedSubjects[0].name}</p>
                        <p className="text-[11px] font-mono text-graphite">{t.assignedSubjects[0].code} · Sem {t.assignedSubjects[0].semester}</p>
                      </div>
                    ) : (
                      <span className="text-graphite italic">Multiple departmental courses</span>
                    )}
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => handleDeleteTeacher(t.id)}
                      className="p-2 rounded-lg hover:bg-status-red/10 text-graphite hover:text-status-red transition-colors"
                      title="Remove Allocation"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Faculty Modal */}
          {showAddTeacher && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface-0 rounded-2xl border border-border p-6 w-full max-w-lg shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="font-display font-bold text-lg text-off-black">Allocate Faculty to Sections</h3>
                  <button onClick={() => setShowAddTeacher(false)} className="p-1 rounded-lg hover:bg-surface-2"><X size={18} className="text-graphite" /></button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-graphite mb-1">Full Name</label>
                    <input value={teacherForm.name} onChange={e => setTeacherForm(p => ({ ...p, name: e.target.value }))} placeholder="Prof. Rajesh Sharma" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                  </div>
                  <div>
                    <label className="block font-medium text-graphite mb-1">Official Email</label>
                    <input value={teacherForm.email} onChange={e => setTeacherForm(p => ({ ...p, email: e.target.value }))} placeholder="r.sharma@ipsacademy.org" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-graphite mb-1">Branch Code</label>
                    <select value={teacherForm.branchCode} onChange={e => setTeacherForm(p => ({ ...p, branchCode: e.target.value }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg">
                      {IPS_BRANCHES.map(b => <option key={b.code} value={b.code}>{b.shortName} ({b.code})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-graphite mb-1">Assigned Sections (comma separated)</label>
                    <input value={teacherForm.sections} onChange={e => setTeacherForm(p => ({ ...p, sections: e.target.value }))} placeholder="T-1, T-2, S-1" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-graphite mb-1">Subject Code</label>
                    <input value={teacherForm.subjectCode} onChange={e => setTeacherForm(p => ({ ...p, subjectCode: e.target.value }))} placeholder="PCC-DS601" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" />
                  </div>
                  <div>
                    <label className="block font-medium text-graphite mb-1">Subject Name</label>
                    <input value={teacherForm.subjectName} onChange={e => setTeacherForm(p => ({ ...p, subjectName: e.target.value }))} placeholder="Deep Learning" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={handleAddTeacher} disabled={!teacherForm.name || !teacherForm.email} className="px-5 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal disabled:opacity-50">Confirm Allocation</button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Manage Coordinators */}
      {activeTab === 'manage-coordinators' && (
        <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
          <h3 className="font-display font-semibold text-lg text-off-black">Section Coordinators Directory</h3>
          <p className="text-xs text-graphite">Each section across all 4 undergraduate years is assigned exactly one dedicated Section Coordinator.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              { name: 'Dr. Rajeshwar Singh', branch: 'Computer Science & Engineering (Data Science)', code: 'DS', sec: 'T-1', sem: 6, email: 'r.singh@ipsacademy.org' },
              { name: 'Dr. Neha Kulkarni', branch: 'Computer Science & Engineering (AI & ML)', code: 'AI', sec: 'F-1', sem: 8, email: 'n.kulkarni@ipsacademy.org' },
              { name: 'Prof. Sanjay Dubey', branch: 'Fire Technology & Safety Engineering', code: 'FT', sec: 'T-1', sem: 6, email: 's.dubey@ipsacademy.org' },
              { name: 'Dr. Manish Sharma', branch: 'Computer Science & Engineering (Core)', code: 'CS', sec: 'S-1', sem: 4, email: 'm.sharma@ipsacademy.org' },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-surface-2 border border-border/70 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-accent-navy text-white px-2 py-0.5 rounded">
                      Section {c.sec}
                    </span>
                    <span className="text-xs font-semibold text-accent-navy">{c.code} · Sem {c.sem}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-off-black mt-2">{c.name}</h4>
                  <p className="text-xs text-graphite mt-0.5">{c.branch}</p>
                  <p className="text-xs font-mono text-charcoal mt-2">{c.email}</p>
                </div>
                <button className="px-3 py-1.5 bg-surface-0 text-charcoal text-xs font-medium rounded-lg border border-border hover:bg-off-black hover:text-warm-white transition-colors">
                  Change Allocation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Manage Students Directory */}
      {activeTab === 'manage-students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-off-black">Master Undergraduate Register</h3>
              <p className="text-xs text-graphite mt-0.5">Enrolment verification and record management for all B.Tech students</p>
            </div>
            <button
              onClick={() => setShowAddStudent(true)}
              className="px-4 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
            >
              <UserPlus size={15} />
              <span>Enroll New Student</span>
            </button>
          </div>

          <div className="bg-surface-0 rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 gap-2 px-6 py-3.5 bg-surface-2 text-[10px] uppercase font-bold text-graphite tracking-wider border-b border-border">
              <div className="col-span-4">Student & Enrollment No</div>
              <div className="col-span-3">Branch & Section</div>
              <div className="col-span-2 font-mono">Computer Code</div>
              <div className="col-span-2">GPA / Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>
            <div className="divide-y divide-border-light max-h-[500px] overflow-y-auto">
              {allStudents.map((s) => (
                <div key={s.id} className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-surface-2/60 transition-colors text-xs">
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-off-black truncate">{s.name}</p>
                      <p className="text-[11px] font-mono text-graphite truncate">{s.enrollmentNo}</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="font-semibold text-charcoal truncate">{s.branch || s.department}</p>
                    <p className="text-[11px] font-mono text-accent-navy font-bold mt-0.5">Section {s.section} · Sem {s.semester}</p>
                  </div>
                  <div className="col-span-2 font-mono font-bold text-charcoal">{s.computerCode}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="font-display font-bold text-off-black">{s.gpa.toFixed(2)}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-status-green/10 text-status-green">
                      {s.status}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => handleDeleteStudent(s.id)}
                      className="p-2 rounded-lg hover:bg-status-red/10 text-graphite hover:text-status-red transition-colors"
                      title="De-enroll Student"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Student Modal */}
          {showAddStudent && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface-0 rounded-2xl border border-border p-6 w-full max-w-lg shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="font-display font-bold text-lg text-off-black">Enroll New B.Tech Student</h3>
                  <button onClick={() => setShowAddStudent(false)} className="p-1 rounded-lg hover:bg-surface-2"><X size={18} className="text-graphite" /></button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-graphite mb-1">Full Name</label>
                    <input value={studentForm.name} onChange={e => setStudentForm(p => ({ ...p, name: e.target.value }))} placeholder="Siddharth Mehta" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                  </div>
                  <div>
                    <label className="block font-medium text-graphite mb-1">Computer Code</label>
                    <input value={studentForm.computerCode} onChange={e => setStudentForm(p => ({ ...p, computerCode: e.target.value }))} placeholder="241199" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-graphite mb-1">Enrollment No (Format: 0808DS241199)</label>
                    <input value={studentForm.enrollmentNo} onChange={e => setStudentForm(p => ({ ...p, enrollmentNo: e.target.value }))} placeholder="0808DS241199" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" />
                  </div>
                  <div>
                    <label className="block font-medium text-graphite mb-1">Official IPS Email</label>
                    <input value={studentForm.email} onChange={e => setStudentForm(p => ({ ...p, email: e.target.value }))} placeholder="0808DS241199.ies@ipsacademy.org" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-graphite mb-1">Branch Code</label>
                    <select value={studentForm.branchCode} onChange={e => setStudentForm(p => ({ ...p, branchCode: e.target.value }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg">
                      {IPS_BRANCHES.map(b => <option key={b.code} value={b.code}>{b.code}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-graphite mb-1">Year</label>
                    <select value={studentForm.year} onChange={e => setStudentForm(p => ({ ...p, year: Number(e.target.value) }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg">
                      {[1, 2, 3, 4].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-graphite mb-1">Section</label>
                    <select value={studentForm.section} onChange={e => setStudentForm(p => ({ ...p, section: e.target.value }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono font-bold">
                      {['DS-1', 'DS-2', 'S-1', 'S-2', 'T-1', 'T-2', 'F-1'].map(sec => <option key={sec} value={sec}>{sec}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button onClick={handleAddStudent} disabled={!studentForm.name || !studentForm.computerCode} className="px-5 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal disabled:opacity-50">Save Enrolment Record</button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-6">
          <div>
            <h3 className="font-display font-semibold text-lg text-off-black">IES Automated ERP Report Generator</h3>
            <p className="text-xs text-graphite mt-0.5">Generate compliant academic sheets and attendance audit reports in CSV / PDF format</p>
          </div>

          {reportGenerated && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-status-green/10 border border-status-green/20 rounded-xl flex items-center gap-3">
              <CheckCircle size={20} className="text-status-green flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-status-green">Generated Report Successfully!</p>
                <p className="text-xs text-charcoal mt-0.5 font-mono">File: {reportGenerated}_IES_2026.csv (Prepared for download)</p>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Even Semester Attendance Defaulter Report (<75%)', desc: 'Lists all undergraduate students across IES sections currently falling below RGPV attendance requirements.' },
              { title: 'Mid-Term Examination (MST-I & II) Consolidated Score Sheet', desc: 'Complete theory sessional marks aggregated by branch and section.' },
              { title: 'Faculty Workload & Lecture Allocation Report', desc: 'Summary of theory subjects and lab sessions assigned to teaching staff.' },
              { title: 'Branch Enrollment & Placement Eligibility Audit', desc: 'List of students meeting CGPA >= 6.5 criteria with no active backlogs for campus recruitment.' },
            ].map((rep, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-surface-2 border border-border/70 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-off-black">{rep.title}</h4>
                  <p className="text-xs text-graphite mt-1 leading-relaxed">{rep.desc}</p>
                </div>
                <button
                  onClick={() => triggerReport(rep.title.split(' ')[0] + '_Report')}
                  className="px-4 py-2 bg-surface-0 border border-border hover:bg-off-black hover:text-warm-white text-xs font-semibold rounded-xl transition-all self-start flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Generate & Export Report</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
