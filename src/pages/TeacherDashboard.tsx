import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Clock, CheckCircle, Search, Calendar,
  ChevronRight, AlertCircle, FileText, Check, X, School
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getStudentsByTeacher, type Student, getAttendanceStats,
  FACULTY_LECTURES, type Lecture
} from '../data/mockData';
import StudentProfile from './StudentProfile';

type TeacherTab = 'lectures' | 'my-students' | 'assignments-marks' | 'timetable';

interface AttendanceSheetEntry {
  studentId: string;
  name: string;
  enrollmentNo: string;
  computerCode: string;
  avatar: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TeacherTab>('lectures');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>(FACULTY_LECTURES);
  
  // Take Attendance State
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetEntries, setSheetEntries] = useState<AttendanceSheetEntry[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const myStudents = getStudentsByTeacher(user?.id || 'USR-FAC-001');

  // Open Attendance interface for a lecture
  const handleOpenAttendance = (lecture: Lecture) => {
    setActiveLecture(lecture);
    setSearchQuery('');
    setSaveSuccess(false);

    // Filter students by section or load all assigned students
    const sectionStudents = myStudents.filter(s => s.section === lecture.section);
    const targetList = sectionStudents.length > 0 ? sectionStudents : myStudents;

    const entries: AttendanceSheetEntry[] = targetList.map(s => ({
      studentId: s.id,
      name: s.name,
      enrollmentNo: s.enrollmentNo,
      computerCode: s.computerCode,
      avatar: s.avatar,
      status: 'present', // Default to present for fast marking
    }));
    setSheetEntries(entries);
  };

  const handleMarkAllPresent = () => {
    setSheetEntries(prev => prev.map(e => ({ ...e, status: 'present' })));
  };

  const handleToggleStatus = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setSheetEntries(prev => prev.map(e => e.studentId === studentId ? { ...e, status } : e));
  };

  const handleSaveAttendance = () => {
    if (!activeLecture) return;
    setLectures(prev => prev.map(l => l.id === activeLecture.id ? { ...l, attendanceMarked: true, status: 'completed' } : l));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveLecture(null);
    }, 1500);
  };

  const filteredEntries = sheetEntries.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.enrollmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.computerCode.includes(searchQuery)
  );

  if (selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        canEdit
        onEditStudent={(s) => setSelectedStudent(s)}
        onDeleteStudent={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Faculty Header Banner */}
      <div className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center flex-shrink-0 mt-1">
              <School size={24} className="text-accent-teal" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-semibold bg-accent-teal/10 text-accent-teal px-2.5 py-0.5 rounded-full">
                  Faculty Portal (IES)
                </span>
                <span className="text-xs text-graphite font-mono">Branch: {user?.branch || 'CSE (Data Science)'}</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-off-black mt-2">
                {user?.name || 'Prof. Amit Verma'}
              </h2>
              <p className="text-xs text-graphite mt-1">
                Assigned Sections: <span className="font-semibold text-charcoal">{user?.assignedSections?.join(', ') || 'T-1, T-2, S-1'}</span> · Email: {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-surface-2 p-4 rounded-xl border border-border/60 self-start md:self-auto">
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Assigned Students</p>
              <p className="font-display font-bold text-2xl text-off-black mt-0.5">{myStudents.length}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Lectures Today</p>
              <p className="font-display font-bold text-2xl text-accent-navy mt-0.5">{lectures.length}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Att. Pending</p>
              <p className="font-display font-bold text-2xl text-status-amber mt-0.5">
                {lectures.filter(l => !l.attendanceMarked).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-surface-2 p-1 rounded-xl w-fit overflow-x-auto">
        {[
          { id: 'lectures' as TeacherTab, label: "Today's Lectures & Attendance", icon: Clock },
          { id: 'my-students' as TeacherTab, label: `Assigned Students (${myStudents.length})`, icon: Users },
          { id: 'assignments-marks' as TeacherTab, label: 'Internal Marks & Assignments', icon: FileText },
          { id: 'timetable' as TeacherTab, label: 'Weekly Timetable & Messages', icon: Calendar },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setActiveLecture(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                isActive ? 'bg-surface-0 text-off-black shadow-sm' : 'text-graphite hover:text-charcoal'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAKE ATTENDANCE INTERFACE MODAL OR EMBEDDED VIEW */}
      <AnimatePresence>
        {activeLecture && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-surface-0 rounded-2xl border-2 border-accent-navy p-6 shadow-lg space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-accent-navy text-white px-2.5 py-1 rounded">
                    Quick Attendance Sheet
                  </span>
                  <span className="text-xs text-graphite font-mono">Section {activeLecture.section}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-off-black mt-2">
                  {activeLecture.subjectName} (<span className="font-mono">{activeLecture.subjectCode}</span>)
                </h3>
                <p className="text-xs text-graphite mt-0.5">
                  Time: <span className="font-mono text-charcoal font-semibold">{activeLecture.time}</span> · Room: {activeLecture.room}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleMarkAllPresent}
                  className="px-4 py-2 bg-status-green/10 text-status-green hover:bg-status-green/20 text-xs font-semibold rounded-xl border border-status-green/30 transition-colors flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Mark All Present</span>
                </button>
                <button
                  onClick={() => setActiveLecture(null)}
                  className="p-2 rounded-xl bg-surface-2 text-graphite hover:text-charcoal transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Search & Stats inside Sheet */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by name, enrollment, code..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-surface-2 border border-border rounded-xl focus:outline-none focus:bg-surface-0 transition-colors font-mono"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1 text-status-green">
                  Present: <span className="font-bold">{sheetEntries.filter(e => e.status === 'present').length}</span>
                </span>
                <span className="flex items-center gap-1 text-status-red">
                  Absent: <span className="font-bold">{sheetEntries.filter(e => e.status === 'absent').length}</span>
                </span>
                <span className="flex items-center gap-1 text-status-amber">
                  Late: <span className="font-bold">{sheetEntries.filter(e => e.status === 'late').length}</span>
                </span>
              </div>
            </div>

            {/* Student List in Sheet */}
            <div className="divide-y divide-border-light border border-border rounded-xl overflow-hidden max-h-[420px] overflow-y-auto">
              {filteredEntries.map((entry, idx) => (
                <div key={entry.studentId} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 hover:bg-surface-2 transition-colors gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-graphite w-6 text-right">{idx + 1}.</span>
                    <img src={entry.avatar} alt={entry.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-off-black truncate">{entry.name}</p>
                      <p className="text-[11px] font-mono text-graphite mt-0.5">
                        {entry.enrollmentNo} · Code: <span className="text-charcoal font-semibold">{entry.computerCode}</span>
                      </p>
                    </div>
                  </div>

                  {/* Toggle Pill Buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {(['present', 'absent', 'late', 'excused'] as const).map((st) => {
                      const isSelected = entry.status === st;
                      const colors = {
                        present: isSelected ? 'bg-status-green text-white font-bold ring-2 ring-status-green/30' : 'bg-surface-3 text-graphite hover:bg-status-green/10 hover:text-status-green',
                        absent: isSelected ? 'bg-status-red text-white font-bold ring-2 ring-status-red/30' : 'bg-surface-3 text-graphite hover:bg-status-red/10 hover:text-status-red',
                        late: isSelected ? 'bg-status-amber text-white font-bold ring-2 ring-status-amber/30' : 'bg-surface-3 text-graphite hover:bg-status-amber/10 hover:text-status-amber',
                        excused: isSelected ? 'bg-accent-slate text-white font-bold ring-2 ring-accent-slate/30' : 'bg-surface-3 text-graphite hover:bg-accent-slate/10 hover:text-accent-slate',
                      };
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleToggleStatus(entry.studentId, st)}
                          className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${colors[st]}`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Save Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-graphite italic">
                * Saved attendance syncs instantly to Section Coordinator and Student Portal.
              </span>
              <div className="flex items-center gap-3">
                {saveSuccess ? (
                  <span className="flex items-center gap-1.5 text-status-green font-semibold text-xs">
                    <CheckCircle size={16} /> Attendance Saved!
                  </span>
                ) : (
                  <button
                    onClick={handleSaveAttendance}
                    className="px-6 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal transition-colors shadow-sm"
                  >
                    Save & Sync Attendance
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab 1: Today's Lectures View */}
      {activeTab === 'lectures' && !activeLecture && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-off-black">Today's Lecture Schedule</h3>
              <p className="text-xs text-graphite mt-0.5">Click [Take Attendance] on any lecture slot to open the quick attendance register.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className={`bg-surface-0 rounded-2xl border p-6 transition-all flex flex-col justify-between ${
                  lecture.attendanceMarked ? 'border-border' : 'border-accent-navy/40 shadow-sm ring-1 ring-accent-navy/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-surface-2 text-charcoal border border-border">
                      {lecture.time}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      lecture.attendanceMarked
                        ? 'bg-status-green/10 text-status-green'
                        : 'bg-status-amber/10 text-status-amber'
                    }`}>
                      {lecture.attendanceMarked ? 'Attendance Done' : 'Att. Pending'}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-off-black leading-snug">
                    {lecture.subjectName}
                  </h4>
                  <p className="text-xs text-graphite font-mono mt-1">Code: {lecture.subjectCode}</p>

                  <div className="mt-4 space-y-2 text-xs bg-surface-2/60 p-3 rounded-xl border border-border/60">
                    <div className="flex justify-between">
                      <span className="text-graphite">Section / Target</span>
                      <span className="font-bold text-accent-navy">Section {lecture.section}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite">Venue</span>
                      <span className="font-medium text-charcoal">{lecture.room}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => handleOpenAttendance(lecture)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      lecture.attendanceMarked
                        ? 'bg-surface-2 text-charcoal hover:bg-surface-3'
                        : 'bg-off-black text-warm-white hover:bg-charcoal shadow-sm'
                    }`}
                  >
                    <Clock size={14} />
                    <span>{lecture.attendanceMarked ? 'Edit Attendance Sheet' : 'Take Attendance'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Alert Box from Coordinator */}
          <div className="bg-accent-slate/5 border border-accent-slate/20 rounded-2xl p-5 flex items-start gap-3.5">
            <AlertCircle size={20} className="text-accent-slate flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-slate">
                Section Coordinator Note (Dr. Rajeshwar Singh - DS)
              </h4>
              <p className="text-xs text-charcoal mt-1 leading-relaxed">
                "Please make sure attendance for morning slots (PCC-DS601 & PCC-DS602) is submitted by 1:30 PM so the automated defaulter tracking system can issue daily SMS alerts to parents of absent students."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Assigned Students */}
      {activeTab === 'my-students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-off-black">My Enrolled Students</h3>
              <p className="text-xs text-graphite mt-0.5">Showing undergraduate students across your assigned sections ({user?.assignedSections?.join(', ') || 'T-1, S-1'})</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {myStudents.map((student, i) => {
              const attStats = getAttendanceStats(student.id);
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3, boxShadow: '0 12px 35px rgba(0,0,0,0.06)' }}
                  onClick={() => setSelectedStudent(student)}
                  className="bg-surface-0 rounded-2xl border border-border p-5 cursor-pointer hover:border-mid-gray/60 transition-all group"
                >
                  <div className="flex items-start gap-3.5">
                    <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-off-black truncate">{student.name}</h4>
                        <ChevronRight size={15} className="text-mid-gray group-hover:text-off-black transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-[11px] font-mono text-graphite mt-0.5">{student.enrollmentNo}</p>
                      <p className="text-[10px] text-accent-navy font-semibold mt-0.5">Section: {student.section} · Code: {student.computerCode}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 rounded-xl bg-surface-2">
                      <p className="font-display font-bold text-sm text-off-black">{student.gpa.toFixed(2)}</p>
                      <p className="text-[9px] text-graphite uppercase tracking-wider">GPA</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-surface-2">
                      <p className="font-display font-bold text-sm text-off-black">#{student.rank}</p>
                      <p className="text-[9px] text-graphite uppercase tracking-wider">Rank</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-surface-2">
                      <p className={`font-display font-bold text-sm ${attStats.percentage < 75 ? 'text-status-red' : 'text-status-green'}`}>
                        {attStats.percentage}%
                      </p>
                      <p className="text-[9px] text-graphite uppercase tracking-wider">Attend</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border-light flex items-center justify-between text-[11px]">
                    <span className="text-graphite">Coordinator: <span className="text-charcoal font-medium">{student.coordinatorName}</span></span>
                    <span className="font-mono text-xs text-graphite">Sem {student.semester}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Assignments & Internal Marks */}
      {activeTab === 'assignments-marks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
            <h3 className="font-display font-semibold text-off-black">Internal Marks Submission (MST-I & MST-II)</h3>
            <p className="text-xs text-graphite">Upload sessional scores for theory subjects before examination portal lock.</p>
            <div className="divide-y divide-border-light border border-border rounded-xl overflow-hidden">
              {myStudents.map((s) => (
                <div key={s.id} className="p-3.5 flex items-center justify-between hover:bg-surface-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-xs text-off-black">{s.name}</p>
                      <p className="text-[10px] font-mono text-graphite">{s.enrollmentNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <div className="bg-surface-0 px-2 py-1 rounded border border-border">
                      MST-1: <span className="font-bold text-charcoal">19/20</span>
                    </div>
                    <div className="bg-surface-0 px-2 py-1 rounded border border-border">
                      MST-2: <span className="font-bold text-charcoal">18/20</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-off-black">Active Assignments & Lab Records</h3>
              <button className="px-3 py-1.5 bg-off-black text-warm-white text-xs font-medium rounded-lg hover:bg-charcoal transition-colors">
                + Create New Assignment
              </button>
            </div>
            <p className="text-xs text-graphite">Manage lab assignments and project evaluation feedback.</p>
            <div className="space-y-3">
              {[
                { title: 'Lab Implementation: AVL & Red-Black Trees', code: 'PCC-DS601L', due: 'April 12, 2026', submitted: '18 / 22 students' },
                { title: 'Mini Project: Distributed MapReduce Engine Evaluation', code: 'PCC-DS602P', due: 'April 18, 2026', submitted: '14 / 22 students' },
              ].map((asn, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-2 border border-border/60">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-off-black">{asn.title}</h4>
                      <p className="text-xs text-graphite font-mono mt-0.5">{asn.code} · Due: {asn.due}</p>
                    </div>
                    <span className="text-xs font-semibold bg-accent-teal/10 text-accent-teal px-2.5 py-1 rounded-full">
                      {asn.submitted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Weekly Timetable & Messages */}
      {activeTab === 'timetable' && (
        <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
          <h3 className="font-display font-semibold text-off-black">My Weekly Teaching Timetable</h3>
          <p className="text-xs text-graphite">Full allocation for theory & lab sessions across IES blocks</p>
          <div className="divide-y divide-border-light">
            {[
              { day: 'Mon', time: '09:30 - 10:30', sub: 'Deep Learning & Neural Networks', code: 'PCC-DS601', sec: 'T-1', room: 'Room 405' },
              { day: 'Mon', time: '11:30 - 01:30', sub: 'Deep Learning Lab', code: 'PCC-DS601L', sec: 'T-1', room: 'DS Lab 2' },
              { day: 'Tue', time: '10:30 - 11:30', sub: 'Foundations of Data Science & Python', code: 'PCC-DS501', sec: 'S-1', room: 'Room 310' },
              { day: 'Thu', time: '10:30 - 12:30', sub: 'Deep Learning & Neural Networks', code: 'PCC-DS601', sec: 'T-1', room: 'Room 405' },
            ].map((slot, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-12 font-bold text-accent-teal bg-accent-teal/10 py-1.5 text-center rounded-lg">
                    {slot.day}
                  </span>
                  <div>
                    <p className="font-semibold text-off-black">{slot.sub}</p>
                    <p className="text-[11px] font-mono text-graphite mt-0.5">{slot.code} · Section {slot.sec}</p>
                  </div>
                </div>
                <span className="font-mono bg-surface-2 px-3 py-1.5 rounded-lg border border-border text-charcoal font-semibold">
                  {slot.time} · {slot.room}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
