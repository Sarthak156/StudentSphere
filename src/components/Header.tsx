import { motion } from 'framer-motion';
import { ChevronDown, Bell, Settings, LogOut, School } from 'lucide-react';
import type { User } from '../data/mockData';

interface HeaderProps {
  onLogout: () => void;
  user: User | null;
}

export default function Header({ onLogout, user }: HeaderProps) {
  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'superadmin': return 'Super Admin';
      case 'principal': return 'Principal (IES)';
      case 'hod': return 'HOD';
      case 'coordinator': return 'Section Coordinator';
      case 'faculty': return 'Faculty Member';
      case 'student': return 'B.Tech Student';
      default: return 'Guest Portal';
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full bg-surface-0 border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-off-black flex items-center justify-center shadow-sm">
          <School size={20} className="text-warm-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-lg sm:text-xl text-off-black tracking-tight leading-none">
              IPS Academy
            </h1>
            <span className="hidden md:inline text-[10px] uppercase tracking-widest bg-accent-navy/10 text-accent-navy font-semibold px-2 py-0.5 rounded">
              IES Indore
            </span>
          </div>
          <p className="text-xs text-graphite mt-1 font-medium">Institute of Engineering & Science</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative p-2 rounded-lg hover:bg-surface-2 transition-colors"
          title="Campus Notifications"
        >
          <Bell size={18} className="text-graphite" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-orange" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="p-2 rounded-lg hover:bg-surface-2 transition-colors hidden sm:block"
          title="Portal Settings"
        >
          <Settings size={18} className="text-graphite" />
        </motion.button>
        <div className="w-px h-8 bg-border" />
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-accent-navy flex items-center justify-center shadow-sm ring-2 ring-border">
            <span className="text-white text-xs font-bold tracking-wider">
              {user?.name?.replace(/^(Dr\.|Prof\.)\s*/i, '').split(' ').map(n => n[0]).join('').slice(0, 2) || 'IP'}
            </span>
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-off-black leading-none">{user?.name || 'User'}</p>
            <p className="text-[11px] text-accent-navy font-medium mt-1">{getRoleBadge(user?.role)}</p>
          </div>
          <ChevronDown size={14} className="text-graphite group-hover:text-off-black transition-colors hidden sm:block" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          className="p-2 rounded-lg hover:bg-status-red/10 text-graphite hover:text-status-red transition-colors flex items-center gap-1.5"
          title="Sign Out of IES Portal"
        >
          <LogOut size={18} />
          <span className="hidden md:inline text-xs font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
