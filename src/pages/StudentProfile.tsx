import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Mail, Calendar, Award, Phone, User,
  ArrowUpRight, ArrowDownRight, Star, BookOpen,
  Clock, CheckCircle, FileText, BarChart3, Users,
  Droplet, School, ShieldCheck, MapPin
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import type { Student } from '../data/mockData';
import { getAttendanceStats } from '../data/mockData';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
  canEdit?: boolean;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (id: string) => void;
}

type Tab = 'overview' | 'academics' | 'assignments' | 'attendance';

const gradeColor = (grade: string) => {
  if (grade.startsWith('A')) return 'text-status-green';
  if (grade.startsWith('B')) return 'text-accent-teal';
  if (grade.startsWith('C')) return 'text-status-amber';
  return 'text-status-red';
};

const scoreColor = (score: number) => {
  if (score >= 90) return 'text-status-green';
  if (score >= 75) return 'text-accent-teal';
  if (score >= 60) return 'text-status-amber';
  return 'text-status-red';
};

export default function StudentProfile({ student, onBack, canEdit, onEditStudent, onDeleteStudent }: StudentProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const radarData = [
    { subject: 'Academic', value: student.scores.academic, fullMark: 100 },
    { subject: 'Social', value: student.scores.social, fullMark: 100 },
    { subject: 'Physical', value: student.scores.physical, fullMark: 100 },
    { subject: 'Looks', value: student.scores.looks, fullMark: 100 },
    { subject: 'Communication', value: student.scores.communication, fullMark: 100 },
    { subject: 'Skills', value: student.scores.skills, fullMark: 100 },
  ];

  const overallScore = Math.round(
    Object.values(student.scores).reduce((a, b) => a + b, 0) / 6
  );

  const attStats = getAttendanceStats(student.id);

  const tabs = [
    { id: 'overview' as Tab, label: 'Academic & Personal Overview', icon: User },
    { id: 'academics' as Tab, label: `Semester Results (1 to ${student.semester})`, icon: BarChart3 },
    { id: 'assignments' as Tab, label: 'Assignments & Labs', icon: FileText },
    { id: 'attendance' as Tab, label: 'Attendance Register', icon: Clock },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6"
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -3 }}
        className="flex items-center gap-2 text-sm text-graphite hover:text-off-black transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Student Directory</span>
      </motion.button>

      {/* Official IES Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm ring-2 ring-border"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-0 ${
              student.status === 'active' ? 'bg-status-green' :
              student.status === 'on-leave' ? 'bg-status-amber' :
              student.status === 'graduated' ? 'bg-accent-navy' : 'bg-status-red'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold bg-accent-navy/10 text-accent-navy px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {student.institute || 'Institute of Engineering & Science (IES)'}
                  </span>
                  <span className="text-xs text-graphite font-mono bg-surface-2 px-2 py-0.5 rounded border border-border">
                    Computer Code: <strong className="text-charcoal">{student.computerCode}</strong>
                  </span>
                </div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-off-black mt-2">
                  {student.name}
                </h1>
                <p className="text-sm font-semibold text-accent-navy mt-0.5">
                  {student.branch || student.department} · Section {student.section}
                </p>
              </div>

              <span className={`self-start text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${
                student.status === 'active' ? 'bg-status-green/10 text-status-green' :
                student.status === 'on-leave' ? 'bg-status-amber/10 text-status-amber' :
                student.status === 'graduated' ? 'bg-accent-navy/10 text-accent-navy' :
                'bg-status-red/10 text-status-red'
              }`}>
                {student.status.toUpperCase()}
              </span>
            </div>

            {/* Official IPS Identification Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 p-3.5 bg-surface-2 rounded-xl border border-border/80 text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-accent-navy flex-shrink-0" />
                <span className="text-graphite">Enrollment No:</span>
                <strong className="text-off-black truncate">{student.enrollmentNo}</strong>
              </div>
              <div className="flex items-center gap-2">
                <School size={14} className="text-accent-teal flex-shrink-0" />
                <span className="text-graphite">Roll Number:</span>
                <strong className="text-off-black">{student.rollNumber || student.enrollmentNo}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-accent-orange flex-shrink-0" />
                <span className="text-graphite">Admission Year:</span>
                <strong className="text-off-black">{student.admissionYear || 2023} (B.Tech Yr {student.year})</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-graphite">
              <div className="flex items-center gap-1.5">
                <Mail size={13} className="text-graphite/80" />
                <span className="font-mono text-charcoal">{student.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-graphite/80" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={13} className="text-graphite/80" />
                <span>Coordinator: <strong className="text-charcoal">{student.coordinatorName}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 self-start sm:self-auto bg-surface-2/60 p-4 rounded-xl border border-border">
            <div className="text-center">
              <p className="font-display font-bold text-2xl text-off-black">{student.gpa.toFixed(2)}</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider mt-0.5">Sem GPA</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="font-display font-bold text-2xl text-off-black">{student.cgpa.toFixed(2)}</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider mt-0.5">CGPA</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="font-display font-bold text-2xl text-off-black">#{student.rank}</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider mt-0.5">Rank ({student.section})</p>
            </div>
          </div>
        </div>

        {/* Quick action buttons if canEdit */}
        {canEdit && (
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEditStudent?.(student)}
              className="px-4 py-2 text-xs font-semibold bg-accent-navy text-white rounded-xl hover:bg-accent-navy/90 transition-colors shadow-sm"
            >
              Edit Student Credentials & Section
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDeleteStudent?.(student.id)}
              className="px-4 py-2 text-xs font-semibold bg-status-red/10 text-status-red rounded-xl hover:bg-status-red/20 transition-colors"
            >
              Remove Student from IES Enrolment
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 bg-surface-2 p-1 rounded-xl w-fit overflow-x-auto">
        {tabs.map((tab) => {
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
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Personal Details */}
            <div className="bg-surface-0 rounded-2xl border border-border p-6">
              <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Official Personal Record</h3>
              <div className="space-y-3.5 divide-y divide-border-light/60">
                <div className="flex justify-between text-xs pt-1">
                  <span className="text-graphite">Date of Birth</span>
                  <span className="text-charcoal font-medium font-mono">{student.dob || '2004-05-14'}</span>
                </div>
                <div className="flex justify-between text-xs pt-2.5">
                  <span className="text-graphite">Blood Group</span>
                  <span className="text-charcoal font-medium flex items-center gap-1">
                    <Droplet size={12} className="text-status-red/60" />
                    {student.bloodGroup || 'O+'}
                  </span>
                </div>
                <div className="flex justify-between text-xs pt-2.5">
                  <span className="text-graphite">Father's Name</span>
                  <span className="text-charcoal font-medium">{student.fatherName || 'Shri Rajesh Sharma'}</span>
                </div>
                <div className="flex justify-between text-xs pt-2.5">
                  <span className="text-graphite">Mother's Name</span>
                  <span className="text-charcoal font-medium">{student.motherName || 'Smt. Meenakshi Sharma'}</span>
                </div>
                <div className="flex justify-between text-xs pt-2.5">
                  <span className="text-graphite">Emergency Contact</span>
                  <span className="text-charcoal font-medium font-mono">{student.emergencyContact || '+91 98260 54321'}</span>
                </div>
                <div className="flex justify-between text-xs pt-2.5">
                  <span className="text-graphite flex items-center gap-1">
                    <MapPin size={12} /> Address
                  </span>
                  <span className="text-charcoal font-medium text-right max-w-[220px] leading-snug">
                    {student.address || '42 AB Road, Indore (M.P.)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Supervision */}
            <div className="bg-surface-0 rounded-2xl border border-border p-6 space-y-4">
              <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider">IES Academic Supervision</h3>
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-2 border border-border/60">
                <div className="w-10 h-10 rounded-xl bg-accent-navy/10 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-accent-navy" />
                </div>
                <div>
                  <p className="text-xs font-bold text-off-black">{student.coordinatorName}</p>
                  <p className="text-[11px] text-graphite">Section Coordinator ({student.section})</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-2 border border-border/60">
                <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center flex-shrink-0">
                  <School size={18} className="text-accent-teal" />
                </div>
                <div>
                  <p className="text-xs font-bold text-off-black">{student.facultyAdvisor}</p>
                  <p className="text-[11px] text-graphite">Assigned Faculty Advisor / Mentor</p>
                </div>
              </div>
            </div>

            {/* Credit & Backlog Summary */}
            <div className="bg-surface-0 rounded-2xl border border-border p-6">
              <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Degree Progression</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-2 rounded-xl p-3.5 text-center border border-border/60">
                  <p className="font-display font-bold text-xl text-off-black">{student.totalCredits || 160}</p>
                  <p className="text-[10px] text-graphite uppercase tracking-wider mt-0.5">Total Credits</p>
                </div>
                <div className="bg-surface-2 rounded-xl p-3.5 text-center border border-border/60">
                  <p className="font-display font-bold text-xl text-status-green">{student.completedCredits || 86}</p>
                  <p className="text-[10px] text-graphite uppercase tracking-wider mt-0.5">Earned</p>
                </div>
                <div className="bg-surface-2 rounded-xl p-3.5 text-center border border-border/60">
                  <p className={`font-display font-bold text-xl ${student.backlogs > 0 ? 'text-status-red' : 'text-charcoal'}`}>
                    {student.backlogs || 0}
                  </p>
                  <p className="text-[10px] text-graphite uppercase tracking-wider mt-0.5">Active Backlogs</p>
                </div>
                <div className="bg-surface-2 rounded-xl p-3.5 text-center border border-border/60">
                  <p className="font-display font-bold text-xl text-accent-navy">VI / T-1</p>
                  <p className="text-[10px] text-graphite uppercase tracking-wider mt-0.5">Current Sem</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Radar Chart */}
            <div className="bg-surface-0 rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold text-off-black">360° Academic Assessment Radar</h3>
                  <p className="text-xs text-graphite mt-0.5">Multi-dimensional evaluation across theory, practical labs, and soft skills</p>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-2 px-3 py-1 rounded-full border border-border">
                  <Star size={14} className="text-accent-orange fill-accent-orange" />
                  <span className="text-xs font-display font-bold text-off-black">{overallScore}/100 Overall</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="#E5E2DD" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#6B6560' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Performance" dataKey="value" stroke="#2C3E6B" fill="#2C3E6B" fillOpacity={0.15} strokeWidth={2.5} animationDuration={1200} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Achievements & Score Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-0 rounded-2xl border border-border p-6">
                <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Official Honors & Certifications</h3>
                <div className="space-y-2.5">
                  {(student.achievements || ["Director's Merit List", 'SIH 2025 Finalist']).map((ach, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-2 border border-border/50">
                      <Award size={15} className="text-accent-orange flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-charcoal leading-snug">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-0 rounded-2xl border border-border p-6">
                <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Skill Domain Breakdown</h3>
                <div className="space-y-3.5">
                  {[
                    { label: 'Core Engineering Theory', value: student.scores.academic, color: 'bg-accent-navy' },
                    { label: 'Lab & Coding Skills', value: student.scores.skills, color: 'bg-accent-teal' },
                    { label: 'Technical Communication', value: student.scores.communication, color: 'bg-accent-slate' },
                    { label: 'Leadership & Teamwork', value: student.scores.social, color: 'bg-accent-orange' },
                  ].map((entry) => (
                    <div key={entry.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                        <span className="text-charcoal">{entry.label}</span>
                        <span className="font-mono font-bold text-off-black">{entry.value}%</span>
                      </div>
                      <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${entry.value}%` }}
                          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                          className={`h-full rounded-full ${entry.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rank Movement */}
            <div className="bg-surface-0 rounded-2xl border border-border p-6 flex items-center gap-5 shadow-sm">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                student.rankChange > 0 ? 'bg-status-green/10' :
                student.rankChange < 0 ? 'bg-status-red/10' : 'bg-surface-3'
              }`}>
                {student.rankChange > 0 ? (
                  <ArrowUpRight size={26} className="text-status-green" />
                ) : student.rankChange < 0 ? (
                  <ArrowDownRight size={26} className="text-status-red" />
                ) : (
                  <span className="text-graphite font-bold text-lg">—</span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-surface-2 px-2.5 py-0.5 rounded text-graphite">
                  Section {student.section} Ranking Trend
                </span>
                <p className={`font-display font-bold text-xl mt-1 ${
                  student.rankChange > 0 ? 'text-status-green' :
                  student.rankChange < 0 ? 'text-status-red' : 'text-graphite'
                }`}>
                  {student.rankChange > 0 ? `+${student.rankChange} positions ↑ this semester` :
                   student.rankChange < 0 ? `${student.rankChange} positions ↓ this semester` : 'No rank movement this semester'}
                </p>
                <p className="text-xs text-graphite mt-0.5">Based on combined internal sessional marks and university CGPA.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Semester Results — STRICTLY CAPPED UP TO CURRENT SEMESTER! */}
      {activeTab === 'academics' && (
        <div className="space-y-6">
          <div className="bg-accent-navy/5 border border-accent-navy/20 rounded-2xl p-5 flex items-start gap-3">
            <ShieldCheck size={20} className="text-accent-navy flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-navy">Official RGPV / IES Examination Policy</h4>
              <p className="text-xs text-charcoal mt-1 leading-relaxed">
                Displaying verified results up to Semester {student.semester} ({student.status === 'active' ? 'Current Semester Ongoing' : 'Completed'}). 
                As per university protocol, grades for future uncompleted semesters (Semesters {student.semester + 1} to 8) cannot be generated or displayed until the respective academic session commences.
              </p>
            </div>
          </div>

          {/* CGPA Trend Bar Chart */}
          <div className="bg-surface-0 rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold text-lg text-off-black">Semester-wise SGPA Progression (Semesters 1 to {student.semester})</h3>
            <p className="text-xs text-graphite mb-6">Historical SGPA across completed academic terms at IPS Academy</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={student.semesterResults.map(sr => ({
                name: `Sem ${sr.semester}`,
                SGPA: Math.round(sr.gpa * 100) / 100,
                status: sr.status
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6560' }} />
                <YAxis domain={[2, 4]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6560' }} />
                <Tooltip
                  contentStyle={{ background: '#1E1B18', border: 'none', borderRadius: '10px', color: '#FAF9F7', fontSize: '12px' }}
                />
                <Bar dataKey="SGPA" radius={[6, 6, 0, 0]} fill="#2C3E6B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Semester Cards */}
          <div className="space-y-4">
            {student.semesterResults.map((sem) => {
              const totalCredits = sem.courses.reduce((sum, c) => sum + c.credits, 0);
              return (
                <motion.div
                  key={sem.semester}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-0 rounded-2xl border border-border overflow-hidden shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-surface-2 gap-3 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-base text-off-black">
                        Semester {sem.semester}
                      </span>
                      <span className="text-xs text-graphite font-mono">Academic Year: {sem.year}</span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        sem.status === 'passed' ? 'bg-status-green/10 text-status-green' :
                        sem.status === 'ongoing' ? 'bg-status-amber/10 text-status-amber' :
                        'bg-status-red/10 text-status-red'
                      }`}>
                        {sem.status === 'ongoing' ? 'Session Ongoing' : 'Passed Clear'}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-semibold text-graphite">Term SGPA</p>
                        <p className="font-display font-bold text-lg text-accent-navy">{sem.gpa.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-semibold text-graphite">Credits</p>
                        <p className="font-display font-bold text-lg text-off-black">{totalCredits} cr</p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-border-light">
                    {sem.courses.map((course, ci) => (
                      <div key={ci} className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 hover:bg-surface-2/40 transition-colors gap-2">
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <span className="text-xs font-mono font-bold text-accent-navy bg-accent-navy/10 px-2 py-1 rounded w-24 text-center flex-shrink-0">
                            {course.code}
                          </span>
                          <span className="text-sm font-semibold text-charcoal truncate">{course.name}</span>
                        </div>
                        <div className="flex items-center gap-6 flex-shrink-0 self-end sm:self-auto font-mono text-xs">
                          <div className="flex items-center gap-1.5 text-graphite">
                            <BookOpen size={13} className="text-graphite/60" />
                            <span>{course.credits} Credits</span>
                          </div>
                          <div className="w-20 text-center">
                            <span className="text-[10px] text-graphite block uppercase">Grade</span>
                            <span className={`text-sm font-bold ${gradeColor(course.grade)}`}>
                              {course.grade}
                            </span>
                          </div>
                          <div className="w-20 text-right">
                            <span className="text-[10px] text-graphite block uppercase font-sans">Marks (%)</span>
                            <span className={`text-sm font-bold ${scoreColor(course.score)}`}>
                              {course.score}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Assignments & Labs */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Assigned', value: student.assignments.length, color: 'text-off-black' },
              { label: 'Submitted / Graded', value: student.assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length, color: 'text-accent-teal' },
              { label: 'Graded', value: student.assignments.filter(a => a.status === 'graded').length, color: 'text-status-green' },
              { label: 'Pending / Lab Due', value: student.assignments.filter(a => a.status === 'pending' || a.status === 'late').length, color: 'text-status-amber' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-0 rounded-2xl border border-border p-5 text-center shadow-sm">
                <p className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</p>
                <p className="text-[11px] font-semibold text-graphite uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {student.assignments.map((asn, i) => (
              <motion.div
                key={asn.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface-0 rounded-2xl border border-border p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <h4 className="text-base font-bold text-off-black">{asn.title}</h4>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        asn.status === 'graded' ? 'bg-status-green/10 text-status-green' :
                        asn.status === 'submitted' ? 'bg-accent-teal/10 text-accent-teal' :
                        asn.status === 'late' ? 'bg-status-red/10 text-status-red' :
                        'bg-status-amber/10 text-status-amber'
                      }`}>{asn.status}</span>
                    </div>
                    <p className="text-xs text-charcoal font-semibold">{asn.course} (<span className="font-mono text-accent-navy">{asn.courseCode}</span>)</p>
                    <div className="flex items-center gap-5 mt-3 text-xs text-graphite font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-graphite/60" />
                        <span>Due Date: {asn.dueDate}</span>
                      </div>
                      {asn.submittedDate && (
                        <div className="flex items-center gap-1.5 text-status-green font-semibold">
                          <CheckCircle size={13} />
                          <span>Submitted: {asn.submittedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0 bg-surface-2 p-3 rounded-xl border border-border/60 self-start sm:self-auto">
                    {asn.score !== undefined ? (
                      <div>
                        <p className={`font-display font-bold text-xl ${scoreColor(asn.score)}`}>
                          {asn.score} / {asn.maxScore}
                        </p>
                        <p className="text-[10px] uppercase font-semibold text-graphite mt-0.5">Faculty Evaluation</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-display font-bold text-lg text-graphite font-mono">— / {asn.maxScore}</p>
                        <p className="text-[10px] uppercase font-semibold text-graphite mt-0.5">Evaluation Pending</p>
                      </div>
                    )}
                  </div>
                </div>
                {asn.feedback && (
                  <div className="mt-4 pt-3.5 border-t border-border bg-surface-2/40 p-3 rounded-xl">
                    <p className="text-[10px] font-bold text-accent-navy uppercase tracking-wider mb-1">Faculty Remarks</p>
                    <p className="text-xs text-charcoal italic font-sans leading-relaxed">"{asn.feedback}"</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Attendance Register */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-surface-0 rounded-2xl border border-border p-5 text-center col-span-2 sm:col-span-1 shadow-sm">
              <p className={`font-display font-bold text-3xl ${attStats.percentage < 75 ? 'text-status-red' : 'text-status-green'}`}>
                {attStats.percentage}%
              </p>
              <p className="text-[10px] font-semibold text-graphite uppercase tracking-wider mt-1">Overall Attendance</p>
            </div>
            {[
              { label: 'Present', value: attStats.present, color: 'text-status-green' },
              { label: 'Absent', value: attStats.absent, color: 'text-status-red' },
              { label: 'Late', value: attStats.late, color: 'text-status-amber' },
              { label: 'Excused', value: attStats.excused, color: 'text-accent-slate' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-0 rounded-2xl border border-border p-5 text-center shadow-sm">
                <p className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</p>
                <p className="text-[11px] font-semibold text-graphite uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-0 rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-off-black">Daily Lecture Attendance Log</h3>
                <p className="text-xs text-graphite mt-0.5">Verified lecture attendance marked by faculty in Section {student.section}</p>
              </div>
              <span className="text-xs font-mono bg-surface-2 px-3 py-1 rounded-full text-graphite border border-border">
                {student.attendance.length} records
              </span>
            </div>
            <div className="divide-y divide-border-light max-h-[480px] overflow-y-auto">
              {student.attendance.map((record, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-surface-2/60 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      record.status === 'present' ? 'bg-status-green' :
                      record.status === 'absent' ? 'bg-status-red' :
                      record.status === 'late' ? 'bg-status-amber' : 'bg-accent-slate'
                    }`} />
                    <div>
                      <p className="text-sm font-semibold text-off-black">{record.course}</p>
                      <p className="text-xs font-mono text-graphite mt-0.5">Code: {record.courseCode} · Date: {record.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    record.status === 'present' ? 'bg-status-green/10 text-status-green' :
                    record.status === 'absent' ? 'bg-status-red/10 text-status-red' :
                    record.status === 'late' ? 'bg-status-amber/10 text-status-amber' :
                    'bg-accent-slate/10 text-accent-slate'
                  }`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
