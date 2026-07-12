import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Eye, EyeOff, UserCheck, ShieldCheck, GraduationCap, Users, School } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roleInfo = [
  {
    role: 'superadmin',
    icon: ShieldCheck,
    label: 'Super Admin (ERP)',
    desc: 'Full ERP control — institutes, branches, passwords, system',
    color: 'bg-accent-navy/10 text-accent-navy',
    ring: 'ring-accent-navy',
    example: 'superadmin@ipsacademy.org',
    password: 'super123',
  },
  {
    role: 'principal',
    icon: Users,
    label: 'Principal (IES)',
    desc: 'Institute overview — HODs, reports, institute notices',
    color: 'bg-accent-slate/10 text-accent-slate',
    ring: 'ring-accent-slate',
    example: 'principal@ipsacademy.org',
    password: 'principal123',
  },
  {
    role: 'hod',
    icon: UserCheck,
    label: 'HOD (Data Science)',
    desc: 'Manage branch faculty, coordinators, subjects & students',
    color: 'bg-accent-teal/10 text-accent-teal',
    ring: 'ring-accent-teal',
    example: 'hod.ds@ipsacademy.org',
    password: 'hod123',
  },
  {
    role: 'coordinator',
    icon: Users,
    label: 'Section Coordinator (T-1 DS)',
    desc: 'Monitor attendance, weak students & section timetable',
    color: 'bg-accent-orange/10 text-accent-orange',
    ring: 'ring-accent-orange',
    example: 'coordinator@ipsacademy.org',
    password: 'coord123',
  },
  {
    role: 'faculty',
    icon: UserCheck,
    label: 'Faculty Member (DS)',
    desc: 'Take attendance, upload marks & assignments',
    color: 'bg-accent-olive/10 text-accent-olive',
    ring: 'ring-accent-olive',
    example: 'faculty@ipsacademy.org',
    password: 'faculty123',
  },
  {
    role: 'student',
    icon: GraduationCap,
    label: 'B.Tech Student (Sem 6 DS)',
    desc: 'Timetable, attendance %, semester results & placements',
    color: 'bg-status-green/10 text-status-green',
    ring: 'ring-status-green',
    example: '0808DS231042.ies@ipsacademy.org',
    password: 'student123',
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (!result.success) {
        setError(result.error || 'Invalid official email or password');
      }
      setLoading(false);
    }, 600);
  };

  const fillCredentials = (role: string) => {
    const info = roleInfo.find(r => r.role === role);
    if (info) {
      setEmail(info.example);
      setPassword(info.password);
      setSelectedRole(role);
    }
  };

  return (
    <div className="min-h-screen bg-surface-1 flex flex-col">
      {/* Background decoration */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent-navy/[0.03] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[450px] h-[450px] bg-accent-orange/[0.03] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-border/50 bg-surface-0/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-off-black flex items-center justify-center shadow-sm">
            <School size={20} className="text-warm-white" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-off-black tracking-tight leading-none block">
              IPS Academy
            </span>
            <span className="text-[11px] text-graphite font-medium">Institute of Engineering & Science (IES)</span>
          </div>
        </div>
        <span className="text-xs font-mono bg-surface-2 text-graphite px-3 py-1 rounded-full border border-border">
          Academic Portal v4.2
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="inline-block text-xs font-semibold uppercase tracking-widest bg-accent-navy/10 text-accent-navy px-3 py-1 rounded-full mb-3">
                Official Campus ERP
              </div>
              <h1 className="font-display font-bold text-4xl text-off-black leading-tight">
                Welcome to<br />
                <span className="text-accent-navy">IPS Academy IES</span>
              </h1>
              <p className="text-graphite mt-3 text-sm leading-relaxed max-w-md">
                Institute of Engineering & Science — the unified academic dashboard for section coordinators, faculty members, and engineering undergraduates.
              </p>

              <div className="mt-8 space-y-3">
                <p className="text-xs font-semibold text-graphite uppercase tracking-wider">Quick Login Demo Accounts</p>
                {roleInfo.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.role;
                  return (
                    <motion.button
                      key={role.role}
                      type="button"
                      onClick={() => fillCredentials(role.role)}
                      whileHover={{ x: 4 }}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-xl border transition-all text-left ${
                        isSelected
                          ? `border-${role.role === 'admin' ? 'accent-navy' : role.role === 'coordinator' ? 'accent-slate' : role.role === 'teacher' ? 'accent-teal' : 'accent-orange'} bg-surface-0 shadow-sm ring-1 ring-border`
                          : 'border-border hover:border-mid-gray/80 bg-surface-0/60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${role.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-off-black truncate">{role.label}</p>
                          <span className="text-[10px] text-accent-navy font-mono bg-surface-2 px-1.5 py-0.5 rounded">
                            {role.role.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-graphite mt-0.5 truncate">{role.example}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-surface-0 rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-display font-bold text-xl text-off-black">Sign In to IES Portal</h2>
                  <p className="text-xs text-graphite mt-1">Enter your official IPS Academy email & password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-graphite mb-1.5">Official IPS Email / Enrollment No.</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="0808DS231042.ies@ipsacademy.org"
                      required
                      className="w-full px-4 py-2.5 text-sm bg-surface-2 border border-border rounded-xl focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-graphite">Password</label>
                      <span className="text-[11px] text-accent-navy hover:underline cursor-pointer">Forgot password?</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2.5 pr-10 text-sm bg-surface-2 border border-border rounded-xl focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-status-red bg-status-red/5 px-3.5 py-2.5 rounded-xl border border-status-red/20"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-off-black text-warm-white text-sm font-medium rounded-xl hover:bg-charcoal transition-all disabled:opacity-50 mt-2 shadow-sm"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-warm-white/30 border-t-warm-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn size={16} />
                        <span>Sign In to Portal</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Mobile role selectors */}
                <div className="mt-6 lg:hidden pt-5 border-t border-border">
                  <p className="text-xs font-semibold text-graphite uppercase tracking-wider mb-3">Quick Login Demo Accounts</p>
                  <div className="grid grid-cols-2 gap-2">
                    {roleInfo.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.role}
                          type="button"
                          onClick={() => fillCredentials(role.role)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${
                            selectedRole === role.role
                              ? 'border-off-black bg-surface-2'
                              : 'border-border hover:bg-surface-2'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${role.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] font-semibold text-off-black block truncate">{role.label}</span>
                            <span className="text-[9px] text-graphite uppercase tracking-wider">{role.role}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="text-center text-[11px] text-graphite/70 mt-4">
                IPS Academy — Institute of Engineering & Science, Rajendra Nagar, Indore (M.P.)
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
