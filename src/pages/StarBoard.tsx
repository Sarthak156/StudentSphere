import { motion } from 'framer-motion';
import { Star, Award, Sparkles, TrendingUp } from 'lucide-react';
import { students } from '../data/mockData';

const topStudents = [...students].sort((a, b) => a.rank - b.rank).slice(0, 7);

export default function StarBoard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-[1400px] mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <Sparkles size={18} className="text-accent-orange" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent-orange">Recognition Gallery</span>
          <Sparkles size={18} className="text-accent-orange" />
        </motion.div>
        <h2 className="font-display font-bold text-3xl text-off-black">Star Board</h2>
        <p className="text-sm text-graphite mt-2 max-w-md mx-auto">
          Celebrating exceptional academic achievement and outstanding performance
        </p>
      </div>

      {/* Featured Student (Top 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-surface-0 rounded-2xl border border-border p-8 mb-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-navy/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={topStudents[0].avatar}
              alt={topStudents[0].name}
              className="w-28 h-28 rounded-2xl object-cover shadow-md"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-accent-orange flex items-center justify-center shadow-sm">
              <Star size={16} className="text-white fill-white" />
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-accent-orange mb-1">
              #1 Overall Performer
            </p>
            <h3 className="font-display font-bold text-2xl text-off-black">{topStudents[0].name}</h3>
            <p className="text-sm text-graphite mt-1">{topStudents[0].department} · Year {topStudents[0].year}</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {topStudents[0].achievements.map((a, i) => (
                <span key={i} className="text-xs px-3 py-1 bg-accent-orange/8 text-accent-orange rounded-full font-medium">
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-6 md:gap-8">
            <div className="text-center">
              <p className="font-display font-bold text-3xl text-off-black">{topStudents[0].gpa.toFixed(2)}</p>
              <p className="text-[10px] text-graphite uppercase tracking-wider mt-1">GPA</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-3xl text-off-black">
                {Math.round(Object.values(topStudents[0].scores).reduce((a, b) => a + b, 0) / 6)}
              </p>
              <p className="text-[10px] text-graphite uppercase tracking-wider mt-1">Score</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Star Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topStudents.slice(1).map((student, i) => {
          const overallScore = Math.round(
            Object.values(student.scores).reduce((a, b) => a + b, 0) / 6
          );
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.05)' }}
              className="bg-surface-0 rounded-xl border border-border p-6 transition-all relative group"
            >
              <div className="absolute top-4 right-4 font-display font-bold text-4xl text-off-black/[0.04]">
                {String(i + 2).padStart(2, '0')}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-accent-navy flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">#{student.rank}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-off-black">{student.name}</h3>
                  <p className="text-xs text-graphite">{student.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 text-center p-2 rounded-lg bg-surface-2">
                  <p className="font-display font-bold text-off-black">{student.gpa.toFixed(2)}</p>
                  <p className="text-[9px] text-graphite uppercase tracking-wider">GPA</p>
                </div>
                <div className="flex-1 text-center p-2 rounded-lg bg-surface-2">
                  <p className="font-display font-bold text-off-black">{overallScore}</p>
                  <p className="text-[9px] text-graphite uppercase tracking-wider">Score</p>
                </div>
                <div className="flex-1 text-center p-2 rounded-lg bg-surface-2">
                  <p className="font-display font-bold text-off-black">Yr {student.year}</p>
                  <p className="text-[9px] text-graphite uppercase tracking-wider">Year</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {student.achievements.slice(0, 3).map((a, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 bg-surface-2 text-graphite rounded-full">
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-border-light flex items-center gap-1.5">
                <TrendingUp size={11} className="text-status-green" />
                <span className="text-[10px] text-status-green font-medium">Top {Math.round((student.rank / 12) * 100)}% performer</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-graphite">
          <Award size={12} />
          <span>Star Board recognizes the top 7 students each semester</span>
        </div>
      </div>
    </motion.div>
  );
}
