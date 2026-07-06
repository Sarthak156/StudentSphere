import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Eye, EyeOff, UserCheck, ShieldCheck, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roleInfo = [
  {
    role: 'admin',
    icon: ShieldCheck,
    label: 'Administrator',
    desc: 'Full system access — manage teachers & students',
    color: 'bg-accent-navy/10 text-accent-navy',
    ring: 'ring-accent-navy',
    example: 'admin@studentsphere.edu',
  },
  {
    role: 'teacher',
    icon: UserCheck,
    label: 'Teacher',
    desc: 'Manage assigned students, view analytics',
    color: 'bg-accent-teal/10 text-accent-teal',
    ring: 'ring-accent-teal',
    example: 'j.mitchell@studentsphere.edu',
  },
  {
    role: 'student',
    icon: GraduationCap,
    label: 'Student',
    desc: 'View your profile, results, assignments',
    color: 'bg-accent-orange/10 text-accent-orange',
    ring: 'ring-accent-orange',
    example: 'a.mercer@studentsphere.edu',
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
        setError(result.error || 'Login failed');
      }
      setLoading(false);
    }, 600);
  };

  const fillCredentials = (role: string) => {
    if (role === 'admin') {
      setEmail('admin@studentsphere.edu');
      setPassword('admin123');
    } else if (role === 'teacher') {
      setEmail('j.mitchell@studentsphere.edu');
      setPassword('teacher123');
    } else {
      setEmail('a.mercer@studentsphere.edu');
      setPassword('student123');
    }
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-surface-1 flex flex-col">
      {/* Background decoration */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent-navy/[0.02] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent-orange/[0.02] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-off-black flex items-center justify-center">
          <span className="text-warm-white font-display font-bold text-sm">SS</span>
        </div>
        <span className="font-display font-semibold text-lg text-off-black">StudentSphere</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Side - Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <h1 className="font-display font-bold text-4xl text-off-black leading-tight">
                Welcome to<br />
                <span className="text-accent-navy">StudentSphere</span>
              </h1>
              <p className="text-graphite mt-4 text-sm leading-relaxed max-w-sm">
                Academic Intelligence Platform — a unified system for administrators, teachers, and students to manage academic life with elegance and precision.
              </p>

              <div className="mt-8 space-y-3">
                <p className="text-xs font-semibold text-graphite uppercase tracking-wider">Quick Login</p>
                {roleInfo.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.role;
                  return (
                    <motion.button
                      key={role.role}
                      onClick={() => fillCredentials(role.role)}
                      whileHover={{ x: 4 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        isSelected
                          ? `border-${role.role === 'admin' ? 'accent-navy' : role.role === 'teacher' ? 'accent-teal' : 'accent-orange'} bg-surface-0`
                          : 'border-border hover:border-mid-gray/50 bg-surface-0/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${role.color} flex items-center justify-center`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-off-black">{role.label}</p>
                        <p className="text-xs text-graphite mt-0.5">{role.example}</p>
                      </div>
                      <span className="text-[10px] text-graphite font-mono">••••••••</span>
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
              <div className="bg-surface-0 rounded-2xl border border-border p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-display font-bold text-xl text-off-black">Sign In</h2>
                  <p className="text-xs text-graphite mt-1">Enter your credentials to access the platform</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-graphite mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@studentsphere.edu"
                      required
                      className="w-full px-4 py-2.5 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-graphite mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2.5 pr-10 text-sm bg-surface-2 border border-border rounded-lg focus:outline-none focus:border-charcoal/40 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
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
                        className="text-xs text-status-red bg-status-red/5 px-3 py-2 rounded-lg"
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
                    className="w-full flex items-center justify-center gap-2 py-3 bg-off-black text-warm-white text-sm font-medium rounded-xl hover:bg-charcoal transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-warm-white/30 border-t-warm-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn size={16} />
                        <span>Sign In</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Mobile role selectors */}
                <div className="mt-6 lg:hidden pt-5 border-t border-border">
                  <p className="text-xs font-semibold text-graphite uppercase tracking-wider mb-3">Quick Login</p>
                  <div className="grid grid-cols-3 gap-2">
                    {roleInfo.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.role}
                          onClick={() => fillCredentials(role.role)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                            selectedRole === role.role
                              ? 'border-off-black bg-surface-2'
                              : 'border-border hover:bg-surface-2'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${role.color} flex items-center justify-center`}>
                            <Icon size={14} />
                          </div>
                          <span className="text-[10px] text-graphite font-medium">{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="text-center text-[10px] text-graphite/60 mt-4">
                By signing in, you agree to the Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
