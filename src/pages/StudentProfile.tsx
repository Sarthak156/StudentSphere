import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Mail, Calendar, Award, Phone, User,
  ArrowUpRight, ArrowDownRight, Star, BookOpen,
  Clock, CheckCircle, FileText, BarChart3, Users,
  Droplet
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
    { id: 'overview' as Tab, label: 'Overview', icon: User },
    { id: 'academics' as Tab, label: 'Semester Results', icon: BarChart3 },
    { id: 'assignments' as Tab, label: 'Assignments', icon: FileText },
    { id: 'attendance' as Tab, label: 'Attendance', icon: Clock },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-8 max-w-[1400px] mx-auto"
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -3 }}
        className="flex items-center gap-2 text-sm text-graphite hover:text-off-black transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </motion.button>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-0 ${
              student.status === 'active' ? 'bg-status-green' :
              student.status === 'on-leave' ? 'bg-status-amber' :
              student.status === 'graduated' ? 'bg-accent-navy' : 'bg-status-red'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div>
                <h1 className="font-display font-bold text-2xl text-off-black">{student.name}</h1>
                <p className="text-sm text-graphite mt-0.5">{student.id} · {student.department}</p>
              </div>
              <span className={`self-start text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${
                student.status === 'active' ? 'bg-status-green/10 text-status-green' :
                student.status === 'on-leave' ? 'bg-status-amber/10 text-status-amber' :
                student.status === 'graduated' ? 'bg-accent-navy/10 text-accent-navy' :
                'bg-status-red/10 text-status-red'
              }`}>
                {student.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
              <div className="flex items-center gap-2 text-xs text-graphite">
                <Mail size={13} />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-graphite">
                <Phone size={13} />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-graphite">
                <Calendar size={13} />
                <span>Year {student.year} · Sem {student.semester} · Section {student.section}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <div className="text-center">
              <p className="font-display font-bold text-2xl text-off-black">{student.gpa.toFixed(2)}</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider">Sem GPA</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-2xl text-off-black">{student.cgpa.toFixed(2)}</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider">CGPA</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-2xl text-off-black">#{student.rank}</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider">Rank</p>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        {canEdit && (
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEditStudent?.(student)}
              className="px-4 py-2 text-xs font-medium bg-accent-navy text-white rounded-lg hover:bg-accent-navy/90 transition-colors"
            >
              Edit Student
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDeleteStudent?.(student.id)}
              className="px-4 py-2 text-xs font-medium bg-status-red/10 text-status-red rounded-lg hover:bg-status-red/20 transition-colors"
            >
              Remove Student
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-2 p-1 rounded-xl w-fit overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Personal Info */}
            <div className="bg-surface-0 rounded-xl border border-border p-5">
              <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Personal Details</h3>
              <div className="space-y-3.5">
                <div className="flex justify-between text-sm">
                  <span className="text-graphite">Date of Birth</span>
                  <span className="text-charcoal font-medium">{student.dob}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-graphite">Blood Group</span>
                  <span className="text-charcoal font-medium flex items-center gap-1">
                    <Droplet size={12} className="text-status-red/60" />
                    {student.bloodGroup}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-graphite">Father's Name</span>
                  <span className="text-charcoal font-medium">{student.fatherName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-graphite">Mother's Name</span>
                  <span className="text-charcoal font-medium">{student.motherName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-graphite">Emergency Contact</span>
                  <span className="text-charcoal font-medium">{student.emergencyContact}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-graphite">Address</span>
                  <span className="text-charcoal font-medium text-right max-w-[200px]">{student.address}</span>
                </div>
              </div>
            </div>

            {/* Mentor Info */}
            {student.mentorName && (
              <div className="bg-surface-0 rounded-xl border border-border p-5">
                <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-3">Academic Mentor</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center">
                    <Users size={18} className="text-accent-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-off-black">{student.mentorName}</p>
                    <p className="text-xs text-graphite">Faculty Mentor</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-surface-0 rounded-xl border border-border p-5">
              <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Academic Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-2 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg text-off-black">{student.totalCredits}</p>
                  <p className="text-[10px] text-graphite">Total Credits</p>
                </div>
                <div className="bg-surface-2 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg text-off-black">{student.completedCredits}</p>
                  <p className="text-[10px] text-graphite">Completed</p>
                </div>
                <div className="bg-surface-2 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg text-off-black">{student.backlogs}</p>
                  <p className="text-[10px] text-graphite">Backlogs</p>
                </div>
                <div className="bg-surface-2 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg text-off-black">{student.semester}</p>
                  <p className="text-[10px] text-graphite">Semester</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns */}
          <div className="lg:col-span-2 space-y-5">
            {/* Radar Chart */}
            <div className="bg-surface-0 rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold text-off-black">Performance Radar</h3>
                  <p className="text-xs text-graphite mt-0.5">Multi-dimensional assessment</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-accent-orange" />
                  <span className="text-sm font-display font-bold text-off-black">{overallScore}/100</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid stroke="#E5E2DD" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B6560' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="value" stroke="#2C3E6B" fill="#2C3E6B" fillOpacity={0.12} strokeWidth={2} animationDuration={1200} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Achievements + Score Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-surface-0 rounded-xl border border-border p-5">
                <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Achievements</h3>
                <div className="space-y-2">
                  {student.achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-2">
                      <Award size={13} className="text-accent-orange flex-shrink-0" />
                      <span className="text-xs text-charcoal">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-0 rounded-xl border border-border p-5">
                <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-4">Score Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Academic', value: student.scores.academic, color: 'bg-accent-navy' },
                    { label: 'Social', value: student.scores.social, color: 'bg-accent-teal' },
                    { label: 'Physical', value: student.scores.physical, color: 'bg-accent-olive' },
                    { label: 'Looks', value: student.scores.looks, color: 'bg-accent-orange' },
                    { label: 'Communication', value: student.scores.communication, color: 'bg-accent-slate' },
                    { label: 'Skills', value: student.scores.skills, color: 'bg-charcoal' },
                  ].map((entry) => (
                    <div key={entry.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-charcoal">{entry.label}</span>
                        <span className="font-semibold text-off-black">{entry.value}</span>
                      </div>
                      <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
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
            <div className="bg-surface-0 rounded-xl border border-border p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                student.rankChange > 0 ? 'bg-status-green/10' :
                student.rankChange < 0 ? 'bg-status-red/10' : 'bg-surface-3'
              }`}>
                {student.rankChange > 0 ? (
                  <ArrowUpRight size={22} className="text-status-green" />
                ) : student.rankChange < 0 ? (
                  <ArrowDownRight size={22} className="text-status-red" />
                ) : (
                  <span className="text-graphite font-bold">—</span>
                )}
              </div>
              <div>
                <p className="text-sm text-graphite">Rank Movement this Semester</p>
                <p className={`font-display font-bold text-lg ${
                  student.rankChange > 0 ? 'text-status-green' :
                  student.rankChange < 0 ? 'text-status-red' : 'text-graphite'
                }`}>
                  {student.rankChange > 0 ? `+${student.rankChange} positions ↑` :
                   student.rankChange < 0 ? `${student.rankChange} positions ↓` : 'No change'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academics' && (
        <div className="space-y-5">
          {/* CGPA Trend */}
          <div className="bg-surface-0 rounded-xl border border-border p-5">
            <h3 className="font-display font-semibold text-off-black mb-1">Semester GPA Trend</h3>
            <p className="text-xs text-graphite mb-5">Performance across all semesters</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={student.semesterResults.map(sr => ({
                name: `Sem ${sr.semester}`,
                GPA: Math.round(sr.gpa * 100) / 100,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B6560' }} />
                <YAxis domain={[2, 4]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B6560' }} />
                <Tooltip
                  contentStyle={{ background: '#1E1B18', border: 'none', borderRadius: '8px', color: '#FAF9F7', fontSize: '12px' }}
                />
                <Bar dataKey="GPA" radius={[4, 4, 0, 0]} fill="#2C3E6B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Semester Cards */}
          <div className="space-y-3">
            {student.semesterResults.map((sem) => {
              const totalCredits = sem.courses.reduce((sum, c) => sum + c.credits, 0);
              return (
                <motion.div
                  key={sem.semester}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-0 rounded-xl border border-border overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 bg-surface-2">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-off-black">Semester {sem.semester}</span>
                      <span className="text-xs text-graphite">{sem.year}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        sem.status === 'passed' ? 'bg-status-green/10 text-status-green' :
                        sem.status === 'ongoing' ? 'bg-status-amber/10 text-status-amber' :
                        'bg-status-red/10 text-status-red'
                      }`}>
                        {sem.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[10px] text-graphite">GPA</p>
                        <p className="font-display font-bold text-sm text-off-black">{sem.gpa.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-graphite">Credits</p>
                        <p className="font-display font-bold text-sm text-off-black">{totalCredits}</p>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-border-light">
                    {sem.courses.map((course, ci) => (
                      <div key={ci} className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="text-[10px] font-mono text-graphite w-16">{course.code}</span>
                          <span className="text-sm text-charcoal truncate">{course.name}</span>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={11} className="text-graphite/50" />
                            <span className="text-xs text-graphite">{course.credits} cr</span>
                          </div>
                          <span className={`text-sm font-semibold w-8 text-center ${gradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                          <span className={`text-xs font-medium w-8 text-right ${scoreColor(course.score)}`}>
                            {course.score}
                          </span>
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

      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total', value: student.assignments.length, color: 'text-off-black' },
              { label: 'Submitted', value: student.assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length, color: 'text-accent-teal' },
              { label: 'Graded', value: student.assignments.filter(a => a.status === 'graded').length, color: 'text-status-green' },
              { label: 'Pending', value: student.assignments.filter(a => a.status === 'pending' || a.status === 'late').length, color: 'text-status-amber' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-0 rounded-xl border border-border p-4 text-center">
                <p className={`font-display font-bold text-xl ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-graphite uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Assignment Cards */}
          {student.assignments.map((asn, i) => (
            <motion.div
              key={asn.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-surface-0 rounded-xl border border-border p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-off-black">{asn.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      asn.status === 'graded' ? 'bg-status-green/10 text-status-green' :
                      asn.status === 'submitted' ? 'bg-accent-teal/10 text-accent-teal' :
                      asn.status === 'late' ? 'bg-status-red/10 text-status-red' :
                      'bg-status-amber/10 text-status-amber'
                    }`}>{asn.status}</span>
                  </div>
                  <p className="text-xs text-graphite">{asn.course} ({asn.courseCode})</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={11} className="text-graphite/50" />
                      <span className="text-[10px] text-graphite">Due: {asn.dueDate}</span>
                    </div>
                    {asn.submittedDate && (
                      <div className="flex items-center gap-1">
                        <CheckCircle size={11} className="text-status-green/50" />
                        <span className="text-[10px] text-graphite">Submitted: {asn.submittedDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {asn.score !== undefined ? (
                    <div>
                      <p className={`font-display font-bold text-lg ${scoreColor(asn.score)}`}>
                        {asn.score}/{asn.maxScore}
                      </p>
                      <p className="text-[10px] text-graphite">Score</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-display font-bold text-lg text-graphite">—</p>
                      <p className="text-[10px] text-graphite">Not graded</p>
                    </div>
                  )}
                </div>
              </div>
              {asn.feedback && (
                <div className="mt-3 pt-3 border-t border-border-light">
                  <p className="text-[10px] text-graphite uppercase tracking-wider mb-1">Feedback</p>
                  <p className="text-xs text-charcoal italic">"{asn.feedback}"</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="space-y-5">
          {/* Attendance Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-surface-0 rounded-xl border border-border p-4 text-center col-span-2 sm:col-span-1">
              <p className="font-display font-bold text-2xl text-accent-navy">{attStats.percentage}%</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider">Overall</p>
            </div>
            {[
              { label: 'Present', value: attStats.present, color: 'text-status-green' },
              { label: 'Absent', value: attStats.absent, color: 'text-status-red' },
              { label: 'Late', value: attStats.late, color: 'text-status-amber' },
              { label: 'Excused', value: attStats.excused, color: 'text-accent-slate' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-0 rounded-xl border border-border p-4 text-center">
                <p className={`font-display font-bold text-xl ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-graphite uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Attendance Records */}
          <div className="bg-surface-0 rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-off-black">Attendance Records</h3>
              <p className="text-xs text-graphite mt-0.5">Course-wise daily attendance</p>
            </div>
            <div className="divide-y divide-border-light max-h-[500px] overflow-y-auto">
              {student.attendance.slice(0, 60).map((record, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 hover:bg-surface-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      record.status === 'present' ? 'bg-status-green' :
                      record.status === 'absent' ? 'bg-status-red' :
                      record.status === 'late' ? 'bg-status-amber' : 'bg-accent-slate'
                    }`} />
                    <span className="text-[11px] font-mono text-graphite w-20">{record.courseCode}</span>
                    <span className="text-xs text-charcoal">{record.date}</span>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
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
