import { motion } from 'framer-motion';
import {
  Users, BookOpen, GraduationCap, CalendarDays,
  TrendingUp, Award, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { dashboardStats, activityData, departmentData, students, notices } from '../data/mockData';
import AnimatedCounter from '../components/AnimatedCounter';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const kpis = [
  { label: 'Total Students', value: dashboardStats.totalStudents, icon: Users, color: 'bg-accent-navy/10 text-accent-navy', change: '+12%' },
  { label: 'Average GPA', value: dashboardStats.averageGPA, icon: GraduationCap, color: 'bg-accent-teal/10 text-accent-teal', change: '+0.08', decimals: 2 },
  { label: 'Attendance Rate', value: dashboardStats.attendanceRate, icon: BookOpen, color: 'bg-accent-olive/10 text-accent-olive', suffix: '%', change: '+2.1%', decimals: 1 },
  { label: 'Active Courses', value: dashboardStats.coursesActive, icon: CalendarDays, color: 'bg-accent-orange/10 text-accent-orange', change: '+8' },
];

export default function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-8 max-w-[1400px] mx-auto space-y-8"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
            className="bg-surface-0 rounded-xl p-5 border border-border hover:border-mid-gray/60 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-graphite uppercase tracking-wider">{kpi.label}</p>
                <p className="text-2xl font-display font-bold text-off-black mt-2">
                  <AnimatedCounter end={kpi.value} decimals={kpi.decimals} suffix={kpi.suffix} />
                </p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center`}>
                <kpi.icon size={18} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <TrendingUp size={12} className="text-status-green" />
              <span className="text-xs font-medium text-status-green">{kpi.change}</span>
              <span className="text-xs text-graphite">vs last semester</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Activity Chart */}
        <motion.div
          variants={item}
          className="lg:col-span-2 bg-surface-0 rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-off-black">Student Activity</h3>
              <p className="text-xs text-graphite mt-1">Enrollment & engagement trends</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-navy" />
                <span className="text-graphite">Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-teal" />
                <span className="text-graphite">Engagement</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2C3E6B" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#2C3E6B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A8B8D" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#4A8B8D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6560' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6560' }} />
              <Tooltip
                contentStyle={{
                  background: '#1E1B18',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FAF9F7',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="students" stroke="#2C3E6B" strokeWidth={2} fill="url(#gradStudents)" />
              <Area type="monotone" dataKey="engagement" stroke="#4A8B8D" strokeWidth={2} fill="url(#gradEngagement)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          variants={item}
          className="bg-surface-0 rounded-xl p-6 border border-border"
        >
          <h3 className="font-display font-semibold text-off-black">Departments</h3>
          <p className="text-xs text-graphite mt-1 mb-6">Student distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={departmentData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B6560' }} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B6560' }} width={100} />
              <Tooltip
                contentStyle={{
                  background: '#1E1B18',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FAF9F7',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="students" radius={[0, 4, 4, 0]} fill="#2C3E6B" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row: Leaderboard + Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Students Snapshot */}
        <motion.div variants={item} className="bg-surface-0 rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-off-black">Top Performers</h3>
              <p className="text-xs text-graphite mt-1">Current semester ranking</p>
            </div>
            <Award size={18} className="text-accent-orange" />
          </div>
          <div className="space-y-3">
            {students.slice(0, 5).map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-2 transition-colors group"
              >
                <span className="w-6 text-center text-sm font-display font-bold text-graphite">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-border"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-off-black truncate">{student.name}</p>
                  <p className="text-xs text-graphite">{student.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-display font-semibold text-off-black">{student.gpa.toFixed(2)}</p>
                  <div className="flex items-center justify-end gap-0.5 mt-0.5">
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notices Snapshot */}
        <motion.div variants={item} className="bg-surface-0 rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-off-black">Latest Notices</h3>
              <p className="text-xs text-graphite mt-1">Academic bulletin</p>
            </div>
          </div>
          <div className="space-y-3">
            {notices.slice(0, 4).map((notice, i) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-4 rounded-lg border border-border-light hover:border-mid-gray/50 hover:bg-surface-2 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      {notice.pinned && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0" />
                      )}
                      <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                        notice.category === 'urgent' ? 'bg-status-red/10 text-status-red' :
                        notice.category === 'academic' ? 'bg-accent-navy/10 text-accent-navy' :
                        notice.category === 'event' ? 'bg-accent-teal/10 text-accent-teal' :
                        'bg-surface-3 text-graphite'
                      }`}>
                        {notice.category}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-off-black group-hover:text-charcoal truncate">
                      {notice.title}
                    </p>
                    <p className="text-xs text-graphite mt-1 line-clamp-1">{notice.content}</p>
                  </div>
                  <span className="text-[10px] text-graphite/60 flex-shrink-0 mt-1">{notice.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
