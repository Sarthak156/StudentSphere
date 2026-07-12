import { useState } from 'react';
import {
  User, Calendar, Award,
  Briefcase, FileText, ExternalLink, Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  students, getAttendanceStats,
  STUDENT_TIMETABLE, PLACEMENT_UPDATES, notices
} from '../data/mockData';
import StudentProfile from './StudentProfile';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [showFullProfile, setShowFullProfile] = useState(false);

  const student = students.find(s => s.email === user?.email) || students[0];

  if (!student) {
    return (
      <div className="p-8 max-w-[1400px] mx-auto text-center py-20">
        <User size={48} className="text-mid-gray mx-auto mb-4" />
        <h2 className="font-display font-semibold text-xl text-off-black">Profile Not Found</h2>
        <p className="text-sm text-graphite mt-2">Your student profile could not be loaded.</p>
      </div>
    );
  }

  if (showFullProfile) {
    return (
      <StudentProfile
        student={student}
        onBack={() => setShowFullProfile(false)}
      />
    );
  }

  const att = getAttendanceStats(student.id);

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Student Banner */}
      <div className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-border shadow-sm flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-semibold bg-accent-navy/10 text-accent-navy px-2.5 py-0.5 rounded-full">
                  {student.institute}
                </span>
                <span className="text-xs text-graphite font-mono">Code: {student.computerCode}</span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-off-black mt-1">
                {student.name}
              </h1>
              <p className="text-xs text-graphite mt-1 font-mono">
                Enrollment: <span className="font-semibold text-charcoal">{student.enrollmentNo}</span> · {student.branch} (Section {student.section})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowFullProfile(true)}
              className="px-5 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal transition-all shadow-sm flex items-center gap-2"
            >
              <User size={14} />
              <span>Full Profile & Semester Results</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Stat KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
          <div className="bg-surface-2/60 p-4 rounded-xl border border-border/80">
            <p className="text-[11px] uppercase font-semibold text-graphite">Attendance Percentage</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`font-display font-bold text-2xl ${att.percentage < 75 ? 'text-status-red' : 'text-status-green'}`}>
                {att.percentage}%
              </span>
              <span className="text-xs text-graphite">({att.present}/{att.total} classes)</span>
            </div>
            <p className="text-[10px] text-graphite mt-1">
              {att.percentage >= 75 ? '✓ Safe from exam detention' : '⚠ Below 75% threshold'}
            </p>
          </div>

          <div className="bg-surface-2/60 p-4 rounded-xl border border-border/80">
            <p className="text-[11px] uppercase font-semibold text-graphite">Current Semester & Section</p>
            <p className="font-display font-bold text-2xl text-off-black mt-1">
              Semester {student.semester}
            </p>
            <p className="text-[10px] font-semibold text-accent-navy mt-1">
              Section {student.section} · Coordinator: {student.coordinatorName.split(' ').slice(-1)}
            </p>
          </div>

          <div className="bg-surface-2/60 p-4 rounded-xl border border-border/80">
            <p className="text-[11px] uppercase font-semibold text-graphite">GPA / CGPA</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display font-bold text-2xl text-accent-teal">
                {student.gpa.toFixed(2)}
              </span>
              <span className="text-xs text-graphite">/ CGPA {student.cgpa.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-status-green mt-1 font-medium">
              Rank #{student.rank} in Section {student.section}
            </p>
          </div>

          <div className="bg-surface-2/60 p-4 rounded-xl border border-border/80">
            <p className="text-[11px] uppercase font-semibold text-graphite">Internal Sessional Marks</p>
            <p className="font-display font-bold text-2xl text-off-black mt-1">
              MST-I & II
            </p>
            <p className="text-[10px] text-graphite mt-1">
              {student.internalMarks?.length || 4} subjects evaluated
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Timetable & Internal Marks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Timetable */}
          <div className="bg-surface-0 rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-lg text-off-black">Today's & Weekly Timetable</h3>
                <p className="text-xs text-graphite mt-0.5">Section {student.section} lecture & practical slots at IES</p>
              </div>
              <Calendar size={18} className="text-accent-navy" />
            </div>

            <div className="divide-y divide-border-light">
              {STUDENT_TIMETABLE.slice(0, 5).map((slot, idx) => (
                <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface-2/50 transition-colors px-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-11 font-bold text-accent-navy bg-accent-navy/10 py-1.5 text-center rounded-lg text-xs">
                      {slot.day}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-off-black">{slot.subject}</p>
                      <p className="text-[11px] text-graphite font-mono mt-0.5">{slot.code} · Faculty: {slot.faculty}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs bg-surface-2 px-3 py-1 rounded border border-border text-charcoal self-start sm:self-auto">
                    {slot.time} · {slot.room}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Sessional Marks Table */}
          <div className="bg-surface-0 rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-lg text-off-black">Internal Evaluation Marks (Semester {student.semester})</h3>
                <p className="text-xs text-graphite mt-0.5">Sessional test breakdown uploaded by faculty</p>
              </div>
              <Award size={18} className="text-accent-teal" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface-2 text-[10px] uppercase font-semibold text-graphite tracking-wider">
                    <th className="py-2.5 px-3">Subject & Code</th>
                    <th className="py-2.5 px-3 text-center">MST-I (20)</th>
                    <th className="py-2.5 px-3 text-center">MST-II (20)</th>
                    <th className="py-2.5 px-3 text-center">Assign (10)</th>
                    <th className="py-2.5 px-3 text-center">Att. (5)</th>
                    <th className="py-2.5 px-3 text-right">Total (55)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light font-mono">
                  {(student.internalMarks || []).map((m, i) => (
                    <tr key={i} className="hover:bg-surface-2/40 transition-colors">
                      <td className="py-3 px-3 font-sans">
                        <p className="font-semibold text-off-black">{m.subjectName}</p>
                        <p className="text-[10px] text-graphite font-mono">{m.subjectCode}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-charcoal">{m.mst1}</td>
                      <td className="py-3 px-3 text-center font-bold text-charcoal">{m.mst2}</td>
                      <td className="py-3 px-3 text-center font-bold text-charcoal">{m.assignmentMarks}</td>
                      <td className="py-3 px-3 text-center font-bold text-status-green">{m.attendanceMarks}</td>
                      <td className="py-3 px-3 text-right font-bold text-accent-navy text-sm">{m.totalInternal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Placements & Upcoming Exams & Notices */}
        <div className="space-y-6">
          {/* Placement Updates */}
          <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-accent-orange" />
                <h3 className="font-display font-semibold text-off-black">TPO Campus Drives</h3>
              </div>
              <span className="text-[10px] bg-accent-orange/10 text-accent-orange font-bold px-2 py-0.5 rounded-full">
                2026 Batch
              </span>
            </div>
            <p className="text-xs text-graphite">Training & Placement Cell recruitment opportunities for IES undergraduates</p>

            <div className="space-y-3">
              {PLACEMENT_UPDATES.map((plc) => (
                <div key={plc.id} className="p-3.5 rounded-xl bg-surface-2 border border-border/70 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-xs text-off-black">{plc.companyName}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-status-green/10 text-status-green flex-shrink-0">
                      {plc.status}
                    </span>
                  </div>
                  <p className="text-xs text-accent-navy font-medium">{plc.role}</p>
                  <div className="flex justify-between text-[11px] text-graphite pt-1 border-t border-border/50 font-mono">
                    <span>CTC: <strong className="text-charcoal">{plc.ctc}</strong></span>
                    <span>Date: {plc.driveDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Exams Notice */}
          <div className="bg-accent-navy/5 border border-accent-navy/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-accent-navy font-bold text-xs uppercase tracking-wider">
              <Activity size={16} />
              <span>Examination Alert</span>
            </div>
            <h4 className="font-display font-semibold text-off-black text-sm">
              Even Semester Mid-Term II Schedule
            </h4>
            <p className="text-xs text-charcoal leading-relaxed">
              Bring your official IES College ID card & Hall Ticket. Reporting time is 30 minutes before theory start.
            </p>
            <div className="pt-2 border-t border-accent-navy/10 flex items-center justify-between text-xs font-semibold text-accent-navy cursor-pointer hover:underline" onClick={() => setShowFullProfile(true)}>
              <span>Check Hall Ticket Eligibility</span>
              <ExternalLink size={14} />
            </div>
          </div>

          {/* Latest Campus Notice */}
          <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-graphite">
              <FileText size={15} className="text-accent-slate" />
              <span>Campus Bulletin Note</span>
            </div>
            <h4 className="font-semibold text-sm text-off-black">
              {notices[0]?.title}
            </h4>
            <p className="text-xs text-graphite leading-relaxed line-clamp-3">
              {notices[0]?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
