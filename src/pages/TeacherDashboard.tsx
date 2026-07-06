import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStudentsByTeacher, type Student, getAttendanceStats } from '../data/mockData';
import StudentProfile from './StudentProfile';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const myStudents = getStudentsByTeacher(user?.id || '');

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        canEdit
        onEditStudent={(s) => setSelectedStudent(s)}
        onDeleteStudent={(_id) => {
          setSelectedStudent(null);
        }}
      />
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-off-black">Teacher Dashboard</h2>
        <p className="text-sm text-graphite mt-1">
          Welcome, {user?.name} — managing <span className="font-medium text-charcoal">{myStudents.length}</span> assigned students
        </p>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Assigned Students', value: myStudents.length, icon: Users, color: 'bg-accent-navy/10 text-accent-navy' },
          { label: 'Active Students', value: myStudents.filter(s => s.status === 'active').length, icon: TrendingUp, color: 'bg-status-green/10 text-status-green' },
          { label: 'Departments', value: new Set(myStudents.map(s => s.department)).size, icon: BookOpen, color: 'bg-accent-teal/10 text-accent-teal' },
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

      {/* My Students */}
      <div className="mb-4">
        <h3 className="font-display font-semibold text-lg text-off-black">My Students</h3>
        <p className="text-xs text-graphite mt-0.5">Click on a student to view detailed profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {myStudents.map((student, i) => {
          const attStats = getAttendanceStats(student.id);
          const overallScore = Math.round(Object.values(student.scores).reduce((a, b) => a + b, 0) / 6);
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
              onClick={() => setSelectedStudent(student)}
              className="bg-surface-0 rounded-xl border border-border p-5 cursor-pointer hover:border-mid-gray/60 transition-all group"
            >
              <div className="flex items-start gap-4">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-off-black truncate">{student.name}</h4>
                    <ChevronRight size={14} className="text-mid-gray group-hover:text-graphite transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-xs text-graphite">{student.id} · {student.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 rounded-lg bg-surface-2">
                  <p className="font-display font-bold text-sm text-off-black">{student.gpa.toFixed(2)}</p>
                  <p className="text-[9px] text-graphite uppercase tracking-wider">GPA</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-surface-2">
                  <p className="font-display font-bold text-sm text-off-black">#{student.rank}</p>
                  <p className="text-[9px] text-graphite uppercase tracking-wider">Rank</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-surface-2">
                  <p className="font-display font-bold text-sm text-off-black">{attStats.percentage}%</p>
                  <p className="text-[9px] text-graphite uppercase tracking-wider">Attend</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border-light">
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    student.status === 'active' ? 'bg-status-green' :
                    student.status === 'on-leave' ? 'bg-status-amber' : 'bg-status-red'
                  }`} />
                  <span className="text-[10px] text-graphite capitalize">{student.status}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {student.rankChange > 0 ? (
                    <>
                      <ArrowUpRight size={11} className="text-status-green" />
                      <span className="text-[10px] text-status-green">+{student.rankChange}</span>
                    </>
                  ) : student.rankChange < 0 ? (
                    <>
                      <ArrowDownRight size={11} className="text-status-red" />
                      <span className="text-[10px] text-status-red">{student.rankChange}</span>
                    </>
                  ) : (
                    <span className="text-[10px] text-graphite">—</span>
                  )}
                  <span className="text-[10px] text-graphite ml-1">movement</span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[10px] text-graphite">
                <span className="truncate">Overall: {overallScore}/100</span>
                <span className="w-px h-2.5 bg-border" />
                <span>Sem {student.semester}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {myStudents.length === 0 && (
        <div className="text-center py-16 bg-surface-0 rounded-xl border border-border">
          <Users size={40} className="text-mid-gray mx-auto mb-4" />
          <p className="text-sm text-graphite">No students assigned to you yet</p>
          <p className="text-xs text-graphite/60 mt-1">Contact the administrator for assignments</p>
        </div>
      )}
    </div>
  );
}
