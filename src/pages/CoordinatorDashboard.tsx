import { motion } from 'framer-motion';
import { Building, Users, UserCheck, BarChart3, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { students } from '../data/mockData';
import { getAttendanceStats } from '../data/helpers';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function CoordinatorDashboard() {
  const { user } = useAuth();

  const assignedSections = user?.assignedSections || [];
  const sectionStudents = students.filter(s => assignedSections.includes(s.section));

  const totalStudents = sectionStudents.length;
  const overallAttendance = Math.round(
    sectionStudents.reduce((acc, s) => acc + getAttendanceStats(s.id).percentage, 0) / (totalStudents || 1)
  );
  const studentsBelowThreshold = sectionStudents.filter(s => getAttendanceStats(s.id).percentage < 75).length;

  const stats = [
    { label: 'Assigned Sections', value: assignedSections.join(', '), icon: Building },
    { label: 'Total Students', value: totalStudents, icon: Users },
    { label: 'Overall Attendance', value: `${overallAttendance}%`, icon: BarChart3 },
    { label: 'Low Attendance', value: studentsBelowThreshold, icon: AlertTriangle },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display text-3xl font-bold text-off-black">Coordinator Dashboard</h1>
        <p className="mt-1 text-sm text-graphite">
          Overview of sections: <span className="font-semibold text-accent-teal">{assignedSections.join(', ')}</span>
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-surface-0 border border-border rounded-2xl p-6 flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-surface-2 rounded-lg flex items-center justify-center">
              <stat.icon className="text-accent-teal" size={24} />
            </div>
            <div>
              <p className="text-xs text-graphite uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold font-display text-off-black mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-off-black">Students with Low Attendance (&lt;75%)</h2>
        <div className="mt-4 bg-surface-0 border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {sectionStudents
              .filter(s => getAttendanceStats(s.id).percentage < 75)
              .map(student => (
                <div key={student.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-off-black">{student.name}</p>
                    <p className="text-xs text-graphite">{student.enrollmentNumber} - Section {student.section}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-status-red">{getAttendanceStats(student.id).percentage}%</p>
                    <p className="text-xs text-graphite">Attendance</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}