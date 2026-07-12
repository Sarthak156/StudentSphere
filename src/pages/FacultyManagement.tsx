import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, ShieldCheck, UserPlus, Edit3, Trash2, X, Search, Building, BookOpen } from 'lucide-react';
import { users, type User, IPS_BRANCHES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

type Tab = 'faculty' | 'coordinators';

const avatars = [
  'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
  'https://images.pexels.com/photos/36432730/pexels-photo-36432730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=150',
];

export default function FacultyManagement() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('faculty');
  const [search, setSearch] = useState('');
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const [showAddCoordinator, setShowAddCoordinator] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [facultyList, setFacultyList] = useState<User[]>(users.filter(u => u.role === 'faculty'));
  const [coordinatorList, setCoordinatorList] = useState<User[]>(users.filter(u => u.role === 'coordinator'));

  const [facultyForm, setFacultyForm] = useState({
    name: '', email: '', branch: 'Computer Science & Engineering (Data Science)', branchCode: 'DS',
    sections: 'T-1, T-2', subjectCode: 'PCC-DS601', subjectName: 'Deep Learning & Neural Networks',
  });

  const [coordForm, setCoordForm] = useState({
    name: '', email: '', branch: 'Computer Science & Engineering (Data Science)', branchCode: 'DS',
    section: 'T-1', semester: 6,
  });

  const filteredFaculty = facultyList.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase()) ||
    (f.branch || '').toLowerCase().includes(search.toLowerCase()) ||
    (f.branchCode || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredCoordinators = coordinatorList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.branch || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.coordinatorOf?.section || '').toLowerCase().includes(search.toLowerCase())
  );

  const resetFacultyForm = () => {
    setFacultyForm({
      name: '', email: '', branch: 'Computer Science & Engineering (Data Science)', branchCode: 'DS',
      sections: 'T-1, T-2', subjectCode: 'PCC-DS601', subjectName: 'Deep Learning & Neural Networks',
    });
    setEditingUser(null);
  };

  const resetCoordForm = () => {
    setCoordForm({
      name: '', email: '', branch: 'Computer Science & Engineering (Data Science)', branchCode: 'DS',
      section: 'T-1', semester: 6,
    });
    setEditingUser(null);
  };

  const handleAddFaculty = () => {
    if (!facultyForm.name || !facultyForm.email) return;

    if (editingUser && editingUser.role === 'faculty') {
      const updated = facultyList.map(f => f.id === editingUser.id ? {
        ...f,
        name: facultyForm.name,
        email: facultyForm.email,
        branch: facultyForm.branch,
        branchCode: facultyForm.branchCode,
        assignedSections: facultyForm.sections.split(',').map(s => s.trim()),
        assignedSubjects: [
          {
            code: facultyForm.subjectCode,
            name: facultyForm.subjectName,
            branch: facultyForm.branchCode,
            semester: 6,
            sections: facultyForm.sections.split(',').map(s => s.trim())
          }
        ],
      } : f);
      setFacultyList(updated);
    } else {
      const newFac: User = {
        id: `USR-TCH-${String(facultyList.length + 1).padStart(3, '0')}`,
        name: facultyForm.name,
        email: facultyForm.email,
        password: 'teacher123',
        role: 'faculty',
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        branch: facultyForm.branch,
        branchCode: facultyForm.branchCode,
        assignedSections: facultyForm.sections.split(',').map(s => s.trim()),
        assignedSubjects: [
          {
            code: facultyForm.subjectCode,
            name: facultyForm.subjectName,
            branch: facultyForm.branchCode,
            semester: 6,
            sections: facultyForm.sections.split(',').map(s => s.trim())
          }
        ],
        assignedStudents: [],
      };
      setFacultyList(prev => [newFac, ...prev]);
    }

    setShowAddFaculty(false);
    resetFacultyForm();
  };

  const handleAddCoordinator = () => {
    if (!coordForm.name || !coordForm.email) return;

    if (editingUser && editingUser.role === 'coordinator') {
      const updated = coordinatorList.map(c => c.id === editingUser.id ? {
        ...c,
        name: coordForm.name,
        email: coordForm.email,
        branch: coordForm.branch,
        branchCode: coordForm.branchCode,
        coordinatorOf: {
          branch: coordForm.branch,
          branchCode: coordForm.branchCode,
          semester: coordForm.semester,
          section: coordForm.section,
        }
      } : c);
      setCoordinatorList(updated);
    } else {
      const newCoord: User = {
        id: `USR-CRD-${String(coordinatorList.length + 1).padStart(3, '0')}`,
        name: coordForm.name,
        email: coordForm.email,
        password: 'coord123',
        role: 'coordinator',
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        branch: coordForm.branch,
        branchCode: coordForm.branchCode,
        coordinatorOf: {
          branch: coordForm.branch,
          branchCode: coordForm.branchCode,
          semester: coordForm.semester,
          section: coordForm.section,
        }
      };
      setCoordinatorList(prev => [newCoord, ...prev]);
    }

    setShowAddCoordinator(false);
    resetCoordForm();
  };

  const handleEditFaculty = (fac: User) => {
    setEditingUser(fac);
    setFacultyForm({
      name: fac.name,
      email: fac.email,
      branch: fac.branch || 'Computer Science & Engineering (Data Science)',
      branchCode: fac.branchCode || 'DS',
      sections: (fac.assignedSections || ['T-1']).join(', '),
      subjectCode: fac.assignedSubjects?.[0]?.code || 'PCC-DS601',
      subjectName: fac.assignedSubjects?.[0]?.name || 'Deep Learning & Neural Networks',
    });
    setShowAddFaculty(true);
  };

  const handleEditCoordinator = (coord: User) => {
    setEditingUser(coord);
    setCoordForm({
      name: coord.name,
      email: coord.email,
      branch: coord.branch || coord.coordinatorOf?.branch || 'Computer Science & Engineering (Data Science)',
      branchCode: coord.branchCode || coord.coordinatorOf?.branchCode || 'DS',
      section: coord.coordinatorOf?.section || 'T-1',
      semester: coord.coordinatorOf?.semester || 6,
    });
    setShowAddCoordinator(true);
  };

  const handleDeleteFaculty = (id: string) => {
    if (!confirm('Remove this faculty member from IES?')) return;
    setFacultyList(prev => prev.filter(f => f.id !== id));
  };

  const handleDeleteCoordinator = (id: string) => {
    if (!confirm('Remove this coordinator allocation? The section will become unassigned.')) return;
    setCoordinatorList(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-navy/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Building size={24} className="text-accent-navy" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-semibold bg-accent-navy/10 text-accent-navy px-2.5 py-0.5 rounded-full">
                  Faculty & Coordinator Management
                </span>
                <span className="text-xs text-graphite font-mono">Accessible to Admin & Faculty Roles</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-off-black mt-2">
                IES Teaching Staff Directory & Allocation
              </h2>
              <p className="text-xs text-graphite mt-1">
                Logged in as: <span className="font-semibold text-charcoal">{user?.name}</span> · Role: <span className="font-semibold text-accent-navy capitalize">{user?.role}</span> · Can manage faculty & coordinators per hierarchy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface-2 p-4 rounded-xl border border-border/60 self-start md:self-auto">
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Faculty Members</p>
              <p className="font-display font-bold text-2xl text-off-black mt-0.5">{facultyList.length}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-[11px] uppercase font-semibold text-graphite">Section Coordinators</p>
              <p className="font-display font-bold text-2xl text-accent-slate mt-0.5">{coordinatorList.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="bg-surface-0 p-4 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search faculty/coordinator by name, email, branch, section..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-2 border border-border rounded-xl focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
          />
        </div>

        <div className="flex gap-2 bg-surface-2 p-1 rounded-xl w-fit overflow-x-auto">
          {[
            { id: 'faculty' as Tab, label: `Faculty Directory (${facultyList.length})`, icon: School },
            { id: 'coordinators' as Tab, label: `Section Coordinators (${coordinatorList.length})`, icon: ShieldCheck },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive ? 'bg-surface-0 text-off-black shadow-sm font-semibold' : 'text-graphite hover:text-charcoal'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Faculty Tab */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-off-black">Faculty Allocation & Subject Mapping</h3>
              <p className="text-xs text-graphite mt-0.5">Hierarchy: Faculty → Subject → Branch → Semester → Sections (Real IPS Structure)</p>
            </div>
            <button
              onClick={() => { resetFacultyForm(); setShowAddFaculty(true); }}
              className="px-4 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
            >
              <UserPlus size={15} />
              <span>Add Faculty & Allocate Subject</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredFaculty.map((fac) => (
              <motion.div
                key={fac.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-0 rounded-2xl border border-border p-5 space-y-4 hover:border-mid-gray/60 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={fac.avatar} alt={fac.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-border" />
                    <div>
                      <h4 className="font-semibold text-sm text-off-black">{fac.name}</h4>
                      <p className="text-[11px] font-mono text-graphite mt-0.5">{fac.email}</p>
                      <p className="text-[11px] text-accent-navy font-bold mt-0.5">{fac.branchCode} · {fac.branch?.split('(')[0].trim()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditFaculty(fac)} className="p-1.5 rounded-lg bg-accent-navy/10 text-accent-navy hover:bg-accent-navy/20"><Edit3 size={12} /></button>
                    <button onClick={() => handleDeleteFaculty(fac.id)} className="p-1.5 rounded-lg bg-status-red/10 text-status-red hover:bg-status-red/20"><Trash2 size={12} /></button>
                  </div>
                </div>

                <div className="bg-surface-2/60 p-3 rounded-xl border border-border/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-graphite uppercase tracking-wider">
                    <BookOpen size={12} />
                    <span>Assigned Subjects & Sections</span>
                  </div>
                  {fac.assignedSubjects?.map((sub, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-semibold text-off-black">{sub.name} (<span className="font-mono text-accent-navy">{sub.code}</span>)</p>
                      <p className="text-[11px] text-graphite mt-0.5">Branch: {sub.branch} · Sem {sub.semester} · Sections: {sub.sections.join(', ')}</p>
                    </div>
                  )) || <p className="text-xs text-graphite">Multiple departmental courses</p>}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border-light text-[11px]">
                  <span className="text-graphite">Sections: <strong className="text-charcoal font-mono">{fac.assignedSections?.join(', ') || 'T-1'}</strong></span>
                  <span className="text-graphite">Students: <strong className="text-charcoal">{fac.assignedStudents?.length || 0}</strong></span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Faculty Modal */}
          <AnimatePresence>
            {showAddFaculty && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-surface-0 rounded-2xl border border-border p-6 w-full max-w-lg shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-display font-bold text-lg text-off-black">{editingUser ? 'Update Faculty Allocation' : 'Add Faculty & Subject Allocation'}</h3>
                    <button onClick={() => { setShowAddFaculty(false); resetFacultyForm(); }} className="p-1 rounded-lg hover:bg-surface-2"><X size={18} className="text-graphite" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><label className="block font-medium text-graphite mb-1">Full Name *</label><input value={facultyForm.name} onChange={e => setFacultyForm(p => ({ ...p, name: e.target.value }))} placeholder="Prof. Rajesh Sharma" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" /></div>
                    <div><label className="block font-medium text-graphite mb-1">Official Email *</label><input value={facultyForm.email} onChange={e => setFacultyForm(p => ({ ...p, email: e.target.value }))} placeholder="r.sharma@ipsacademy.org" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><label className="block font-medium text-graphite mb-1">Branch Code</label><select value={facultyForm.branchCode} onChange={e => setFacultyForm(p => ({ ...p, branchCode: e.target.value, branch: IPS_BRANCHES.find(b => b.code === e.target.value)?.name || p.branch }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg">{IPS_BRANCHES.map(b => <option key={b.code} value={b.code}>{b.shortName} ({b.code})</option>)}</select></div>
                    <div><label className="block font-medium text-graphite mb-1">Sections (comma separated)</label><input value={facultyForm.sections} onChange={e => setFacultyForm(p => ({ ...p, sections: e.target.value }))} placeholder="T-1, T-2, S-1" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><label className="block font-medium text-graphite mb-1">Subject Code (e.g., DS13, CS601)</label><input value={facultyForm.subjectCode} onChange={e => setFacultyForm(p => ({ ...p, subjectCode: e.target.value }))} placeholder="PCC-DS601" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" /></div>
                    <div><label className="block font-medium text-graphite mb-1">Subject Name</label><input value={facultyForm.subjectName} onChange={e => setFacultyForm(p => ({ ...p, subjectName: e.target.value }))} placeholder="Deep Learning & Neural Networks" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" /></div>
                  </div>
                  <div className="flex justify-end gap-3 pt-3 border-t border-border">
                    <button onClick={() => { setShowAddFaculty(false); resetFacultyForm(); }} className="px-4 py-2 bg-surface-2 text-charcoal text-xs font-semibold rounded-xl hover:bg-surface-3">Cancel</button>
                    <button onClick={handleAddFaculty} disabled={!facultyForm.name || !facultyForm.email} className="px-5 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal disabled:opacity-50">{editingUser ? 'Update Allocation' : 'Add Faculty Member'}</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Coordinators Tab */}
      {activeTab === 'coordinators' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-off-black">Section Coordinators Allocation</h3>
              <p className="text-xs text-graphite mt-0.5">Each section across IES has exactly one dedicated Section Coordinator (Hierarchy: Principal → HOD → Coordinator → Faculty → Students)</p>
            </div>
            <button onClick={() => { resetCoordForm(); setShowAddCoordinator(true); }} className="px-4 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm">
              <UserPlus size={15} />
              <span>Assign New Coordinator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCoordinators.map((coord) => (
              <motion.div key={coord.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-0 rounded-2xl border border-border p-5 space-y-4 hover:border-mid-gray/60 transition-all group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={coord.avatar} alt={coord.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-border" />
                    <div>
                      <h4 className="font-semibold text-sm text-off-black">{coord.name}</h4>
                      <p className="text-[11px] font-mono text-graphite mt-0.5">{coord.email}</p>
                      <p className="text-[11px] text-accent-slate font-bold mt-0.5">Branch: {coord.branchCode} · {coord.branch?.split('(')[0].trim()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditCoordinator(coord)} className="p-1.5 rounded-lg bg-accent-slate/10 text-accent-slate hover:bg-accent-slate/20"><Edit3 size={12} /></button>
                    <button onClick={() => handleDeleteCoordinator(coord.id)} className="p-1.5 rounded-lg bg-status-red/10 text-status-red hover:bg-status-red/20"><Trash2 size={12} /></button>
                  </div>
                </div>
                <div className="bg-accent-slate/5 p-3 rounded-xl border border-accent-slate/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-accent-slate uppercase tracking-wider">
                    <ShieldCheck size={12} />
                    <span>Section Allocation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold bg-accent-slate text-white px-2.5 py-1 rounded-lg">Section {coord.coordinatorOf?.section || 'T-1'}</span>
                    <span className="text-charcoal font-medium">Semester {coord.coordinatorOf?.semester || 6}</span>
                    <span className="text-graphite">· {coord.coordinatorOf?.branchCode || coord.branchCode}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coordinator Modal */}
          <AnimatePresence>
            {showAddCoordinator && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-surface-0 rounded-2xl border border-border p-6 w-full max-w-lg shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-display font-bold text-lg text-off-black">{editingUser ? 'Update Coordinator Allocation' : 'Assign Section Coordinator'}</h3>
                    <button onClick={() => { setShowAddCoordinator(false); resetCoordForm(); }} className="p-1 rounded-lg hover:bg-surface-2"><X size={18} className="text-graphite" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><label className="block font-medium text-graphite mb-1">Full Name *</label><input value={coordForm.name} onChange={e => setCoordForm(p => ({ ...p, name: e.target.value }))} placeholder="Dr. Manish Sharma" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg" /></div>
                    <div><label className="block font-medium text-graphite mb-1">Official Email *</label><input value={coordForm.email} onChange={e => setCoordForm(p => ({ ...p, email: e.target.value }))} placeholder="m.sharma@ipsacademy.org" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono" /></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div><label className="block font-medium text-graphite mb-1">Branch Code</label><select value={coordForm.branchCode} onChange={e => setCoordForm(p => ({ ...p, branchCode: e.target.value, branch: IPS_BRANCHES.find(b => b.code === e.target.value)?.name || p.branch }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg">{IPS_BRANCHES.map(b => <option key={b.code} value={b.code}>{b.shortName} ({b.code})</option>)}</select></div>
                    <div><label className="block font-medium text-graphite mb-1">Section</label><select value={coordForm.section} onChange={e => setCoordForm(p => ({ ...p, section: e.target.value }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg font-mono font-bold">{['DS-1', 'DS-2', 'S-1', 'S-2', 'T-1', 'T-2', 'F-1', 'F-2'].map(sec => <option key={sec} value={sec}>{sec}</option>)}</select></div>
                    <div><label className="block font-medium text-graphite mb-1">Semester</label><select value={coordForm.semester} onChange={e => setCoordForm(p => ({ ...p, semester: Number(e.target.value) }))} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg">{[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Sem {s}</option>)}</select></div>
                  </div>
                  <div className="flex justify-end gap-3 pt-3 border-t border-border">
                    <button onClick={() => { setShowAddCoordinator(false); resetCoordForm(); }} className="px-4 py-2 bg-surface-2 text-charcoal text-xs font-semibold rounded-xl hover:bg-surface-3">Cancel</button>
                    <button onClick={handleAddCoordinator} disabled={!coordForm.name || !coordForm.email} className="px-5 py-2.5 bg-off-black text-warm-white text-xs font-semibold rounded-xl hover:bg-charcoal disabled:opacity-50">{editingUser ? 'Update Coordinator' : 'Assign Coordinator'}</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
