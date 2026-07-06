import { motion } from 'framer-motion';
import { Trophy, ArrowUpRight, ArrowDownRight, Medal, Crown } from 'lucide-react';
import { students } from '../data/mockData';

const sorted = [...students].sort((a, b) => a.rank - b.rank);

export default function Leaderboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-[1200px] mx-auto"
    >
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-off-black">Leaderboard</h2>
        <p className="text-sm text-graphite mt-1">Academic performance rankings — current semester</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sorted.slice(0, 3).map((student, i) => {
          const podiumStyles = [
            { ring: 'ring-accent-orange', bg: 'bg-accent-orange/5', badge: 'bg-accent-orange text-white', icon: Crown },
            { ring: 'ring-accent-slate', bg: 'bg-accent-slate/5', badge: 'bg-accent-slate text-white', icon: Medal },
            { ring: 'ring-accent-teal', bg: 'bg-accent-teal/5', badge: 'bg-accent-teal text-white', icon: Medal },
          ];
          const style = podiumStyles[i];
          const Icon = style.icon;
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.06)' }}
              className={`${style.bg} rounded-xl p-6 border border-border hover:border-mid-gray/50 transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`w-8 h-8 rounded-lg ${style.badge} flex items-center justify-center`}>
                  <Icon size={16} />
                </span>
                <span className="font-display font-bold text-3xl text-off-black/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className={`w-14 h-14 rounded-xl object-cover ring-2 ${style.ring}`}
                />
                <div>
                  <h3 className="font-semibold text-off-black">{student.name}</h3>
                  <p className="text-xs text-graphite mt-0.5">{student.department}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-graphite uppercase tracking-wider">GPA</p>
                  <p className="font-display font-bold text-xl text-off-black">{student.gpa.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-graphite uppercase tracking-wider">Movement</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {student.rankChange > 0 ? (
                      <>
                        <ArrowUpRight size={14} className="text-status-green" />
                        <span className="text-sm font-semibold text-status-green">+{student.rankChange}</span>
                      </>
                    ) : student.rankChange < 0 ? (
                      <>
                        <ArrowDownRight size={14} className="text-status-red" />
                        <span className="text-sm font-semibold text-status-red">{student.rankChange}</span>
                      </>
                    ) : (
                      <span className="text-sm text-graphite">—</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Ranking List */}
      <div className="bg-surface-0 rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-surface-2 text-[10px] uppercase tracking-wider font-semibold text-graphite">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Student</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-1">GPA</div>
          <div className="col-span-1">Score</div>
          <div className="col-span-2 text-right">Movement</div>
        </div>

        {/* Rows */}
        {sorted.map((student, i) => {
          const overallScore = Math.round(
            Object.values(student.scores).reduce((a, b) => a + b, 0) / 6
          );
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-t border-border-light hover:bg-surface-2 transition-colors cursor-pointer ${
                i < 3 ? 'bg-surface-1' : ''
              }`}
            >
              <div className="col-span-1">
                <span className={`font-display font-bold text-sm ${
                  i === 0 ? 'text-accent-orange' :
                  i < 3 ? 'text-accent-slate' : 'text-graphite'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-off-black truncate">{student.name}</p>
                  <p className="text-xs text-graphite">{student.id}</p>
                </div>
              </div>
              <div className="col-span-2 text-xs text-charcoal truncate">{student.department}</div>
              <div className="col-span-1 text-xs text-charcoal">{student.year}</div>
              <div className="col-span-1 font-display font-bold text-sm text-off-black">{student.gpa.toFixed(2)}</div>
              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-navy rounded-full"
                      style={{ width: `${overallScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-charcoal w-6">{overallScore}</span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-1">
                {student.rankChange > 0 ? (
                  <>
                    <ArrowUpRight size={13} className="text-status-green" />
                    <span className="text-xs font-medium text-status-green">+{student.rankChange}</span>
                  </>
                ) : student.rankChange < 0 ? (
                  <>
                    <ArrowDownRight size={13} className="text-status-red" />
                    <span className="text-xs font-medium text-status-red">{student.rankChange}</span>
                  </>
                ) : (
                  <span className="text-xs text-graphite">—</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-graphite">
        <Trophy size={12} />
        <span>Rankings updated daily based on academic performance metrics</span>
      </div>
    </motion.div>
  );
}
