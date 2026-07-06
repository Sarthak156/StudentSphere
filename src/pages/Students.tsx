import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { students, type Student } from '../data/mockData';

interface StudentsProps {
  onSelectStudent: (student: Student) => void;
}

export default function Students({ onSelectStudent }: StudentsProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const departments = ['all', ...new Set(students.map((s) => s.department))];

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || s.department === filter;
    return matchesSearch && matchesFilter;
  });

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-status-green';
      case 'inactive': return 'bg-status-red';
      case 'on-leave': return 'bg-status-amber';
      default: return 'bg-mid-gray';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-[1400px] mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-off-black">Student Directory</h2>
        <p className="text-sm text-graphite mt-1">Manage and explore student profiles</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" />
          <input
            type="text"
            placeholder="Search by name, department, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-0 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 transition-colors placeholder:text-mid-gray"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-graphite" />
          <div className="flex gap-1 overflow-x-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  filter === dept
                    ? 'bg-off-black text-warm-white'
                    : 'bg-surface-2 text-graphite hover:bg-surface-3'
                }`}
              >
                {dept === 'all' ? 'All' : dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-graphite mb-4">
        Showing <span className="font-semibold text-charcoal">{filtered.length}</span> of {students.length} students
      </p>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((student, i) => (
            <motion.div
              key={student.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => onSelectStudent(student)}
              whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
              className="bg-surface-0 rounded-xl p-5 border border-border hover:border-mid-gray/60 cursor-pointer transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface-0 ${statusColor(student.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-off-black truncate group-hover:text-charcoal">
                      {student.name}
                    </h3>
                    <ChevronRight size={14} className="text-mid-gray group-hover:text-graphite transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-xs text-graphite mt-0.5">{student.id}</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <div className="flex items-center gap-1">
                      <MapPin size={11} className="text-graphite/60" />
                      <span className="text-xs text-graphite">{student.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={11} className="text-graphite/60" />
                      <span className="text-xs text-graphite">Year {student.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[10px] text-graphite uppercase tracking-wider">GPA</p>
                    <p className="text-sm font-display font-bold text-off-black">{student.gpa.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-graphite uppercase tracking-wider">Rank</p>
                    <p className="text-sm font-display font-bold text-off-black">#{student.rank}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {student.achievements.slice(0, 2).map((a, j) => (
                    <span
                      key={j}
                      className="text-[10px] px-2 py-0.5 bg-surface-2 text-graphite rounded-full truncate max-w-[90px]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
