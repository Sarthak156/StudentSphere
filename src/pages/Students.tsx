import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight, Calendar, School } from 'lucide-react';
import { students, type Student, IPS_BRANCHES } from '../data/mockData';

interface StudentsProps {
  onSelectStudent: (student: Student) => void;
}

export default function Students({ onSelectStudent }: StudentsProps) {
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.enrollmentNo.toLowerCase().includes(q) ||
      s.computerCode.includes(q) ||
      (s.branch || s.department || '').toLowerCase().includes(q) ||
      s.coordinatorName.toLowerCase().includes(q) ||
      s.facultyAdvisor.toLowerCase().includes(q) ||
      s.section.toLowerCase().includes(q);

    const matchesBranch = branchFilter === 'all' || s.branchCode === branchFilter;
    const matchesSem = semesterFilter === 'all' || String(s.semester) === semesterFilter;
    const matchesSection = sectionFilter === 'all' || s.section === sectionFilter;

    return matchesSearch && matchesBranch && matchesSem && matchesSection;
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
      className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold bg-accent-navy/10 text-accent-navy px-2.5 py-0.5 rounded-full">
            Institute of Engineering & Science (IES)
          </span>
          <span className="text-xs text-graphite font-mono">Roll Enrolment Register</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-off-black mt-2">Student Directory</h2>
        <p className="text-sm text-graphite mt-1">
          Explore and manage B.Tech engineering profiles across all branches, semesters, and sections
        </p>
      </div>

      {/* Global Search & Hierarchical Filters */}
      <div className="bg-surface-0 p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="relative">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" />
          <input
            type="text"
            placeholder="Global Search: Student Name, Computer Code (231042), Enrollment No (0808DS...), Coordinator, or Section..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-2 border border-border rounded-xl focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray font-mono"
          />
        </div>

        {/* Hierarchical Filter Strip: Institute -> Branch -> Semester -> Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-border/60">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-graphite uppercase tracking-wider mr-1">
              <Filter size={13} /> Hierarchy Filter:
            </span>

            {/* Branch Filter */}
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="bg-surface-2 border border-border rounded-lg px-2.5 py-1.5 text-xs text-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-accent-navy"
            >
              <option value="all">All Branches (IES)</option>
              {IPS_BRANCHES.map((b) => (
                <option key={b.code} value={b.code}>{b.shortName} ({b.code})</option>
              ))}
            </select>

            {/* Semester Filter */}
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="bg-surface-2 border border-border rounded-lg px-2.5 py-1.5 text-xs text-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-accent-navy"
            >
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={String(s)}>Semester {s}</option>
              ))}
            </select>

            {/* Section Filter */}
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="bg-surface-2 border border-border rounded-lg px-2.5 py-1.5 text-xs text-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-accent-navy"
            >
              <option value="all">All Sections</option>
              {['DS-1', 'DS-2', 'S-1', 'S-2', 'T-1', 'T-2', 'F-1', 'F-2'].map((sec) => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>

            {(branchFilter !== 'all' || semesterFilter !== 'all' || sectionFilter !== 'all' || search !== '') && (
              <button
                onClick={() => { setBranchFilter('all'); setSemesterFilter('all'); setSectionFilter('all'); setSearch(''); }}
                className="text-xs text-status-red hover:underline ml-2"
              >
                Reset Filters
              </button>
            )}
          </div>

          <span className="text-xs text-graphite font-mono">
            Showing <strong className="text-charcoal font-sans">{filtered.length}</strong> of {students.length} students
          </span>
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((student, i) => (
            <motion.div
              key={student.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onClick={() => onSelectStudent(student)}
              whileHover={{ y: -3, boxShadow: '0 12px 35px rgba(0,0,0,0.06)' }}
              className="bg-surface-0 rounded-2xl p-5 border border-border hover:border-mid-gray/80 cursor-pointer transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-14 h-14 rounded-2xl object-cover shadow-sm ring-1 ring-border"
                  />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface-0 ${statusColor(student.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-off-black truncate group-hover:text-accent-navy transition-colors">
                      {student.name}
                    </h3>
                    <ChevronRight size={16} className="text-mid-gray group-hover:text-off-black transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-xs text-graphite font-mono mt-0.5 truncate">{student.enrollmentNo}</p>
                  
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-accent-navy/10 text-accent-navy">
                      Section {student.section}
                    </span>
                    <span className="text-[10px] font-mono bg-surface-2 px-2 py-0.5 rounded text-charcoal border border-border">
                      Code: {student.computerCode}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-graphite truncate max-w-[190px]">
                  <School size={13} className="flex-shrink-0 text-graphite/70" />
                  <span className="truncate">{student.branch || student.department}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-charcoal flex-shrink-0">
                  <Calendar size={13} className="text-graphite/70" />
                  <span>Sem {student.semester}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border-light flex items-center justify-between">
                <div className="flex items-center gap-4 font-mono">
                  <div>
                    <p className="text-[10px] text-graphite uppercase font-sans tracking-wider">GPA</p>
                    <p className="text-sm font-bold text-off-black">{student.gpa.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-graphite uppercase font-sans tracking-wider">Rank</p>
                    <p className="text-sm font-bold text-off-black">#{student.rank}</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-1 max-w-[140px]">
                  {(student.achievements || []).slice(0, 2).map((a, j) => (
                    <span
                      key={j}
                      className="text-[10px] px-2 py-0.5 bg-surface-2 text-graphite rounded-full truncate max-w-[110px]"
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

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-surface-0 rounded-2xl border border-border">
          <Search size={36} className="text-mid-gray mx-auto mb-3" />
          <p className="text-sm font-semibold text-charcoal">No engineering students found matching the selected hierarchy</p>
          <p className="text-xs text-graphite mt-1">Try resetting the Branch, Semester, or Section filters.</p>
        </div>
      )}
    </motion.div>
  );
}
