import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, AlertTriangle, BookOpen, Mail, ChevronRight, CheckCircle, Send, School, Calendar, Award, UserPlus, Edit3, Trash2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStudentsByCoordinator, getAttendanceStats, type Student, STUDENT_TIMETABLE, IPS_BRANCHES } from '../data/mockData';
import StudentProfile from './StudentProfile';

type Tab = 'overview' | 'manage-students' | 'defaulters' | 'remedial' | 'faculty-timetable';

const avatars = [
  'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/11156392/pexels-photo-11156392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
];

export default function CoordinatorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeSent, setNoticeSent] = useState(false);

  const coordBranchCode = user?.coordinatorOf?.branchCode || 'DS';
  const coordSection = user?.coordinatorOf?.section || 'T-1';
  const coordBranchName = user?.coordinatorOf?.branch || 'Computer Science & Engineering (Data Science)';

  const initialStudents = getStudentsByCoordinator(coordBranchCode, coordSection);
  const [sectionStudents, setSectionStudents] = useState<Student[]>(initialStudents);

  // Student CRUD state
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentForm, setStudentForm] = useState({
    name: '', computerCode: '', enrollmentNo: '', branch: coordBranchName, branchCode: coordBranchCode,
    year: 3, section: coordSection, semester: 6, phone: '', address: '', fatherName: '', motherName: '',
    email: '', gpa: 3.5,
  });

  const totalStudents = sectionStudents.length;
  const defaulterStudents = sectionStudents.filter(s => getAttendanceStats(s.id).percentage < 75 || s.backlogs > 0);
  const weakStudents = sectionStudents.filter(s => s.gpa < 3.78 || s.backlogs > 0);
  const topStudents = [...sectionStudents].sort((a, b) => b.gpa - a.gpa).slice(0, 3);
  const averageSectionGpa = totalStudents > 0 ? (sectionStudents.reduce((acc, s) => acc + s.gpa, 0) / totalStudents).toFixed(2) : '0.00';
  const averageSectionAttendance = totalStudents > 0 ? Math.round(sectionStudents.reduce((acc, s) => acc + getAttendanceStats(s.id).percentage, 0) / totalStudents) : 0;

  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeBody.trim()) return;
    setNoticeSent(true);
    setTimeout(() => { setNoticeTitle(''); setNoticeBody(''); setNoticeSent(false); }, 3000);
  };

  const resetStudentForm = () => {
    setStudentForm({
      name: '', computerCode: '', enrollmentNo: '', branch: coordBranchName, branchCode: coordBranchCode,
      year: 3, section: coordSection, semester: 6, phone: '', address: '', fatherName: '', motherName: '',
      email: '', gpa: 3.5,
    });
  };

  const handleAddStudent = () => {
    if (!studentForm.name || !studentForm.computerCode) return;
    if (editingStudent) {
      // Update existing
      const updated = sectionStudents.map(s => s.id === editingStudent.id ? {
        ...s,
        name: studentForm.name,
        computerCode: studentForm.computerCode,
        enrollmentNo: studentForm.enrollmentNo || s.enrollmentNo,
        email: studentForm.email || s.email,
        branch: studentForm.branch,
        branchCode: studentForm.branchCode,
        section: studentForm.section,
        year: studentForm.year,
        semester: studentForm.semester,
        phone: studentForm.phone || s.phone,
        address: studentForm.address || s.address,
        fatherName: studentForm.fatherName || s.fatherName,
        motherName: studentForm.motherName || s.motherName,
        gpa: studentForm.gpa,
      } : s);
      setSectionStudents(updated);
      setEditingStudent(null);
    } else {
      const newStudent: Student = {
        id: `STU-${studentForm.computerCode}`,
        computerCode: studentForm.computerCode,
        enrollmentNo: studentForm.enrollmentNo || `0808${studentForm.branchCode}${studentForm.computerCode}`,
        name: studentForm.name,
        email: studentForm.email || `${studentForm.enrollmentNo || `0808${studentForm.branchCode}${studentForm.computerCode}`}.ies@ipsacademy.org`,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        institute: 'Institute of Engineering & Science (IES)',
        branch: studentForm.branch,
        branchCode: studentForm.branchCode,
        year: studentForm.year,
        semester: studentForm.semester,
        section: studentForm.section,
        rollNumber: studentForm.enrollmentNo,
        admissionYear: 2026 - studentForm.year,
        coordinatorName: user?.name || 'Dr. Rajeshwar Singh',
        facultyAdvisor: 'Prof. Amit Verma',
        gpa: studentForm.gpa,
        cgpa: studentForm.gpa - 0.05,
        rank: sectionStudents.length + 1,
        rankChange: 0,
        status: 'active',
        scores: { academic: 88, social: 82, physical: 78, looks: 82, communication: 86, skills: 85 },
        achievements: ['New Enrolment - Section ' + studentForm.section],
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: 'Just now',
        phone: studentForm.phone || '+91 98260 00000',
        address: studentForm.address || 'Indore M.P.',
        dob: '2005-01-01',
        bloodGroup: 'O+',
        emergencyContact: '+91 98260 11111',
        fatherName: studentForm.fatherName || 'Parent Name',
        motherName: studentForm.motherName || 'Parent Name',
        semesterResults: [],
        assignments: [],
        attendance: [],
        internalMarks: [],
        totalCredits: 160,
        completedCredits: 0,
        backlogs: 0,
      };
      setSectionStudents(prev => [newStudent, ...prev]);
    }
    setShowAddStudent(false);
    resetStudentForm();
  };

  const handleEditClick = (s: Student) => {
    setEditingStudent(s);
    setStudentForm({
      name: s.name,
      computerCode: s.computerCode,
      enrollmentNo: s.enrollmentNo,
      branch: s.branch,
      branchCode: s.branchCode,
      year: s.year,
      section: s.section,
      semester: s.semester,
      phone: s.phone,
      address: s.address,
      fatherName: s.fatherName,
      motherName: s.motherName,
      email: s.email,
      gpa: s.gpa,
    });
    setShowAddStudent(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (!confirm('Are you sure you want to remove this student from Section ' + coordSection + '?')) return;
    setSectionStudents(prev => prev.filter(s => s.id !== id));
  };

  if (selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        canEdit
        onEditStudent={(s) => { setSelectedStudent(s); handleEditClick(s); }}
        onDeleteStudent={(id) => { setSelectedStudent(null); handleDeleteStudent(id); }}
      />
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-slate/10 flex items-center justify-center flex-shrink-0 mt-1">
              <School size={24} className="text-accent-slate" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-semibold bg-accent-slate/10 text-accent-slate px-2.5 py-0.5 rounded-full">
                  Section Coordinator Portal
                </span>
                <span className="text-xs text-graphite font-mono">Principal → HOD → Coordinator → Faculty → Students</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-off-black mt-2">
                Section {coordSection} — {coordBranchName}
              </h2>
              <p className="text-xs text-graphite mt-1">
                Coordinator: <span className="font-semibold text-charcoal">{user?.name}</span> · B.Tech 3rd Year Sem VI · Can Add/Remove/Update Students
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-surface-2 p-4 rounded-xl border border-border/60 self-start md:self-auto">
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Section Strength</p>
              <p className="font-display font-bold text-2xl text-off-black mt-0.5">{totalStudents} Students</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Avg Attendance</p>
              <p className="font-display font-bold text-2xl text-accent-teal mt-0.5">{averageSectionAttendance}%</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Avg GPA</p>
              <p className="font-display font-bold text-2xl text-accent-navy mt-0.5">{averageSectionGpa}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-surface-2 p-1 rounded-xl w-fit overflow-x-auto">
        {[
          { id: 'overview' as Tab, label: 'Section Overview & Honors', icon: Users },
          { id: 'manage-students' as Tab, label: `Manage Students (Add/Edit/Delete)`, icon: UserPlus, count: totalStudents },
          { id: 'defaulters' as Tab, label: `Attendance Alerts`, icon: AlertTriangle, count: defaulterStudents.length },
          { id: 'remedial' as Tab, label: `Remedial & Backlogs`, icon: BookOpen, count: weakStudents.length },
          { id: 'faculty-timetable' as Tab, label: 'Faculty & Timetable', icon: Calendar },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                isActive ? 'bg-surface-0 text-off-black shadow-sm' : 'text-graphite hover:text-charcoal'
              }`}
            >
              <Icon size={15} className={tab.id === 'defaulters' ? 'text-status-red' : ''} />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  tab.id === 'defaulters' ? 'bg-status-red/10 text-status-red' : tab.id === 'manage-students' ? 'bg-accent-navy/10 text-accent-navy' : 'bg-status-amber/10 text-status-amber'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface-0 rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-off-black">Section {coordSection} Honor Roll</h3>
                  <p className="text-xs text-graphite mt-0.5">Top performing students based on current MST & semester GPA</p>
                </div>
                <Award size={20} className="text-accent-orange" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topStudents.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelectedStudent(s)}
                    className="bg-surface-2/60 border border-border/80 rounded-xl p-4 cursor-pointer hover:border-mid-gray transition-all relative"
                  >
                    <span className="absolute top-3 right-3 font-display font-bold text-2xl text-accent-orange/30">#{idx + 1}</span>
                    <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-surface-0 mb-3" />
                    <h4 className="font-semibold text-sm text-off-black truncate">{s.name}</h4>
                    <p className="text-[11px] font-mono text-graphite mt-0.5">{s.enrollmentNo}</p>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs font-display font-bold text-off-black">GPA: {s.gpa.toFixed(2)}</span>
                      <span className="text-[10px] text-status-green font-medium">Top Performer</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-surface-0 rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-off-black">All Enrolled Students ({coordSection}) - {totalStudents}</h3>
                  <p className="text-xs text-graphite mt-0.5">Click to view complete academic profile</p>
                </div>
              </div>
              <div className="divide-y divide-border-light max-h-[420px] overflow-y-auto">
                {sectionStudents.map((s) => {
                  const att = getAttendanceStats(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-surface-2 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-off-black truncate group-hover:text-charcoal">{s.name}</p>
                          <p className="text-[11px] font-mono text-graphite">{s.enrollmentNo} · Code: {s.computerCode}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] text-graphite">Attendance</p>
                          <p className={`text-xs font-bold ${att.percentage < 75 ? 'text-status-red' : 'text-status-green'}`}>{att.percentage}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-graphite">GPA</p>
                          <p className="text-xs font-display font-bold text-off-black">{s.gpa.toFixed(2)}</p>
                        </div>
                        <ChevronRight size={16} className="text-mid-gray group-hover:text-off-black transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-surface-0 rounded-2xl border border-border p-6 self-start">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={18} className="text-accent-navy" />
              <h3 className="font-display font-semibold text-off-black">Send Section Notice</h3>
            </div>
            <p className="text-xs text-graphite mb-4">Broadcast urgent instructions or attendance warnings to Section {coordSection}.</p>

            {noticeSent ? (
              <div className="bg-status-green/10 border border-status-green/20 rounded-xl p-4 text-center my-4">
                <CheckCircle size={28} className="text-status-green mx-auto mb-2" />
                <p className="text-sm font-semibold text-status-green">Notice Broadcasted!</p>
                <p className="text-xs text-graphite mt-1">Delivered to all Section {coordSection} students.</p>
              </div>
            ) : (
              <form onSubmit={handleSendNotice} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-graphite mb-1">Notice Title</label>
                  <input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} placeholder="e.g., Mandatory Lab Record Submission..." required className="w-full px-3 py-2 text-xs bg-surface-2 border border-border rounded-lg focus:outline-none focus:bg-surface-0 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-graphite mb-1">Notice Content</label>
                  <textarea value={noticeBody} onChange={(e) => setNoticeBody(e.target.value)} rows={4} placeholder="Enter instructions, deadlines, or warnings..." required className="w-full px-3 py-2 text-xs bg-surface-2 border border-border rounded-lg focus:outline-none focus:bg-surface-0 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 bg-off-black text-warm-white text-xs font-medium rounded-xl hover:bg-charcoal transition-colors">
                  <Send size={14} />
                  <span>Broadcast to Section {coordSection}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Manage Students - Full CRUD for Coordinator */}
      {activeTab === 'manage-students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-off-black">Manage Students - Section {coordSection}</h3>
              <p className="text-xs text-graphite mt-0.5">Add, edit, or remove students from your coordinated section. Changes reflect instantly.</p>
            </div>
            <button
              onClick={() => { resetStudentForm(); setEditingStudent(null); setShowAddStudent(true); }}
              className="px-4 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
            >
              <UserPlus size={15} />
              <span>Add New Student to {coordSection}</span>
            </button>
          </div>

          <div className="bg-surface-0 rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 gap-2 px-6 py-3.5 bg-surface-2 text-[10px] uppercase font-bold text-graphite tracking-wider border-b border-border">
              <div className="col-span-4">Student & Enrollment No</div>
              <div className="col-span-2">Comp Code / GPA</div>
              <div className="col-span-3">Contact & Parents</div>
              <div className="col-span-3 text-right">Actions (Edit / Delete)</div>
            </div>
            <div className="divide-y divide-border-light max-h-[600px] overflow-y-auto">
              {sectionStudents.map((s) => (
                <div key={s.id} className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-surface-2/60 transition-colors text-xs">
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-off-black truncate">{s.name}</p>
                      <p className="text-[11px] font-mono text-graphite truncate">{s.enrollmentNo}</p>
                      <p className="text-[10px] text-accent-navy font-bold mt-0.5">Sem {s.semester} · {s.branchCode}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="font-mono font-bold text-charcoal">{s.computerCode}</p>
                    <p className="text-[11px] font-display font-bold text-off-black mt-0.5">GPA {s.gpa.toFixed(2)}</p>
                    <p className="text-[10px] text-graphite">{s.status}</p>
                  </div>
                  <div className="col-span-3 min-w-0">
                    <p className="font-mono text-charcoal truncate">{s.phone}</p>
                    <p className="text-[11px] text-graphite truncate">{s.fatherName} / {s.motherName}</p>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-2">
                    <button onClick={() => setSelectedStudent(s)} className="p-2 rounded-lg bg-surface-2 text-charcoal hover:bg-surface-3 transition-colors" title="View Full Profile">
                      <Users size={14} />
                    </button>
                    <button onClick={() => handleEditClick(s)} className="p-2 rounded-lg bg-accent-navy/10 text-accent-navy hover:bg-accent-navy/20 transition-colors" title="Edit Student Record">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDeleteStudent(s.id)} className="p-2 rounded-lg bg-status-red/10 text-status-red hover:bg-status-red/20 transition-colors" title="Remove from Section">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Edit Student Modal */}
          <AnimatePresence>
            {showAddStudent && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-surface-0 rounded-2xl border border-border p-6 w-full max-w-lg shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-display font-bold text-lg text-off-black">{editingStudent ? 'Update Student Record' : 'Add Student to Section ' + coordSection}</h3>
                    <button onClick={() => { setShowAddStudent(false); setEditingStudent(null); resetStudentForm(); }} className="p-1 rounded-lg hover:bg-surface-2"><X size={18} className="text-graphite" /></button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-graphite mb-1">Full Name *</label>
                      <input value={studentForm.name} onChange={e => setStudentForm(p => ({ ...p, name: e.target.value }))} placeholder="Aarav Sharma" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg focus:outline-none focus:bg-surface-0" />
                    </div>
                    <div>
                      <label className="block font-medium text-graphite mb-1">Computer Code *</label>
                      <input value={studentForm.computerCode} onChange={e => setStudentForm(p => ({ ...p, computerCode: e.target.value }))} placeholder="231042" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono focus:outline-none focus:bg-surface-0" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-graphite mb-1">Enrollment No (0808DS...)</label>
                      <input value={studentForm.enrollmentNo} onChange={e => setStudentForm(p => ({ ...p, enrollmentNo: e.target.value }))} placeholder={`0808${studentForm.branchCode}${studentForm.computerCode}`} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono focus:outline-none focus:bg-surface-0" />
                    </div>
                    <div>
                      <label className="block font-medium text-graphite mb-1">Official Email</label>
                      <input value={studentForm.email} onChange={e => setStudentForm(p => ({ ...p, email: e.target.value }))} placeholder="0808DS....ies@ipsacademy.org" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono focus:outline-none focus:bg-surface-0" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-graphite mb-1">Branch Code</label>
                      <select value={studentForm.branchCode} onChange={e => setStudentForm(p => ({ ...p, branchCode: e.target.value, branch: IPS_BRANCHES.find(b => b.code === e.target.value)?.name || p.branch }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg focus:outline-none focus:bg-surface-0">
                        {IPS_BRANCHES.map(b => <option key={b.code} value={b.code}>{b.code} - {b.shortName}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-graphite mb-1">Year</label>
                      <select value={studentForm.year} onChange={e => setStudentForm(p => ({ ...p, year: Number(e.target.value), semester: Number(e.target.value) * 2 }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg">
                        {[1, 2, 3, 4].map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-graphite mb-1">Section</label>
                      <select value={studentForm.section} onChange={e => setStudentForm(p => ({ ...p, section: e.target.value }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono font-bold">
                        {['DS-1', 'DS-2', 'S-1', 'S-2', 'T-1', 'T-2', 'F-1', 'F-2'].map(sec => <option key={sec} value={sec}>Section {sec}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-graphite mb-1">Phone</label>
                      <input value={studentForm.phone} onChange={e => setStudentForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98260 00000" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                    </div>
                    <div>
                      <label className="block font-medium text-graphite mb-1">GPA</label>
                      <input type="number" step="0.01" min="0" max="4" value={studentForm.gpa} onChange={e => setStudentForm(p => ({ ...p, gpa: Number(e.target.value) }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-graphite mb-1">Address</label>
                    <input value={studentForm.address} onChange={e => setStudentForm(p => ({ ...p, address: e.target.value }))} placeholder="Indore, M.P." className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-xs" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-graphite mb-1">Father's Name</label>
                      <input value={studentForm.fatherName} onChange={e => setStudentForm(p => ({ ...p, fatherName: e.target.value }))} placeholder="Father Name" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                    </div>
                    <div>
                      <label className="block font-medium text-graphite mb-1">Mother's Name</label>
                      <input value={studentForm.motherName} onChange={e => setStudentForm(p => ({ ...p, motherName: e.target.value }))} placeholder="Mother Name" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-border">
                    <button onClick={() => { setShowAddStudent(false); setEditingStudent(null); resetStudentForm(); }} className="px-4 py-2 bg-surface-2 text-charcoal text-xs font-semibold rounded-xl hover:bg-surface-3">Cancel</button>
                    <button onClick={handleAddStudent} disabled={!studentForm.name || !studentForm.computerCode} className="px-5 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal disabled:opacity-50">
                      {editingStudent ? 'Update Student Record' : 'Add to Section ' + coordSection}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {activeTab === 'defaulters' && (
        <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-status-red" />
                <h3 className="font-display font-semibold text-lg text-off-black">Strict Attendance Warning List</h3>
              </div>
              <p className="text-xs text-graphite mt-1">Students below 75% threshold liable for exam detention.</p>
            </div>
            <button onClick={() => { setNoticeTitle(`URGENT: Exam Detention Warning for Section ${coordSection} Defaulters`); setNoticeBody(`Students with attendance below 75% must report to Section Coordinator office (${user?.name}) immediately.`); setActiveTab('overview'); }} className="px-4 py-2 bg-status-red text-white text-xs font-medium rounded-xl hover:bg-status-red/90 transition-colors shadow-sm">Issue Detention Warning</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defaulterStudents.map((s) => {
              const att = getAttendanceStats(s.id);
              return (
                <div key={s.id} onClick={() => setSelectedStudent(s)} className="bg-surface-2/70 border border-status-red/20 rounded-xl p-5 hover:border-status-red/40 cursor-pointer transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-11 h-11 rounded-xl object-cover ring-2 ring-status-red/30" />
                      <div>
                        <h4 className="font-semibold text-sm text-off-black">{s.name}</h4>
                        <p className="text-[11px] font-mono text-graphite mt-0.5">{s.enrollmentNo}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-status-red/10 text-status-red">{att.percentage}% Att.</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs bg-surface-0 p-2.5 rounded-lg border border-border/60">
                    <div><p className="text-[10px] text-graphite">Attended</p><p className="font-semibold text-charcoal mt-0.5">{att.present}/{att.total}</p></div>
                    <div><p className="text-[10px] text-graphite">Absent/Late</p><p className="font-semibold text-status-red mt-0.5">{att.absent + att.late}</p></div>
                    <div><p className="text-[10px] text-graphite">Backlogs</p><p className="font-semibold text-off-black mt-0.5">{s.backlogs}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'remedial' && (
        <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-6">
          <div>
            <h3 className="font-display font-semibold text-lg text-off-black">Remedial Guidance & Backlog Tracking</h3>
            <p className="text-xs text-graphite mt-1">Students requiring academic counseling, extra tutorial support, or backlog clearance tracking.</p>
          </div>
          <div className="divide-y divide-border-light border border-border rounded-xl overflow-hidden">
            {weakStudents.map((s) => (
              <div key={s.id} onClick={() => setSelectedStudent(s)} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-surface-2 transition-colors cursor-pointer gap-4">
                <div className="flex items-center gap-3.5">
                  <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-semibold text-sm text-off-black">{s.name}</h4>
                    <p className="text-xs text-graphite font-mono mt-0.5">{s.enrollmentNo} · Advisor: {s.facultyAdvisor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                  <div className="text-right"><p className="text-[10px] text-graphite">Current GPA</p><p className="text-xs font-display font-bold text-status-amber">{s.gpa.toFixed(2)}</p></div>
                  <div className="text-right"><p className="text-[10px] text-graphite">Active Backlogs</p><span className={`text-xs font-bold px-2 py-0.5 rounded ${s.backlogs > 0 ? 'bg-status-red/10 text-status-red' : 'bg-surface-3 text-graphite'}`}>{s.backlogs} {s.backlogs === 1 ? 'subject' : 'subjects'}</span></div>
                  <button className="px-3 py-1.5 bg-surface-3 text-charcoal hover:bg-off-black hover:text-warm-white text-xs font-medium rounded-lg transition-colors">Review Academic History</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'faculty-timetable' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
            <h3 className="font-display font-semibold text-off-black">Faculty Teaching Section {coordSection}</h3>
            <p className="text-xs text-graphite">Subject allocation and faculty contact list for current semester</p>
            <div className="space-y-3">
              {[
                { name: 'Prof. Amit Verma', subject: 'Deep Learning & Neural Networks', code: 'PCC-DS601', room: 'Room 405' },
                { name: 'Dr. Rajeshwar Singh', subject: 'Big Data Analytics & Hadoop', code: 'PCC-DS602', room: 'Room 402' },
                { name: 'Dr. Neha Kulkarni', subject: 'Data Visualization & BI', code: 'PEC-DS603', room: 'Room 405' },
                { name: 'Prof. Sanjay Dubey', subject: 'Cloud Computing & Distributed Data', code: 'OEC-DS601', room: 'Room 310' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2 border border-border/60">
                  <div>
                    <h4 className="font-semibold text-sm text-off-black">{f.name}</h4>
                    <p className="text-xs text-graphite mt-0.5">{f.subject} (<span className="font-mono">{f.code}</span>)</p>
                  </div>
                  <span className="text-xs font-mono bg-surface-0 px-2.5 py-1 rounded-lg border border-border text-charcoal">{f.room}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
            <h3 className="font-display font-semibold text-off-black">Section {coordSection} Master Timetable</h3>
            <p className="text-xs text-graphite">Weekly lecture schedule for B.Tech III Year Semester VI</p>
            <div className="divide-y divide-border-light max-h-[350px] overflow-y-auto">
              {STUDENT_TIMETABLE.map((slot, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-10 font-bold text-accent-navy bg-accent-navy/10 py-1 text-center rounded">{slot.day}</span>
                    <div>
                      <p className="font-semibold text-off-black">{slot.subject}</p>
                      <p className="text-[11px] text-graphite font-mono mt-0.5">{slot.code} · {slot.faculty}</p>
                    </div>
                  </div>
                  <span className="font-mono text-graphite whitespace-nowrap">{slot.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
