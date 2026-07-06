import { motion } from 'framer-motion';
import { ChevronDown, Bell, Settings, LogOut } from 'lucide-react';
import type { User } from '../data/mockData';

interface HeaderProps {
  onLogout: () => void;
  user: User | null;
}

export default function Header({ onLogout, user }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full bg-surface-0 border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-lg bg-off-black flex items-center justify-center">
          <span className="text-warm-white font-display font-bold text-sm">SS</span>
        </div>
        <div>
          <h1 className="font-display font-semibold text-lg text-off-black tracking-tight leading-none">
            StudentSphere
          </h1>
          <p className="text-xs text-graphite mt-0.5 capitalize">Academic Intelligence Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative p-2 rounded-lg hover:bg-surface-2 transition-colors"
        >
          <Bell size={18} className="text-graphite" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-orange" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="p-2 rounded-lg hover:bg-surface-2 transition-colors"
        >
          <Settings size={18} className="text-graphite" />
        </motion.button>
        <div className="w-px h-8 bg-border" />
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-accent-navy flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'SS'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-off-black leading-none">{user?.name || 'User'}</p>
            <p className="text-xs text-graphite mt-0.5 capitalize">{user?.role || 'Guest'}</p>
          </div>
          <ChevronDown size={14} className="text-graphite group-hover:text-off-black transition-colors" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          className="p-2 rounded-lg hover:bg-status-red/10 text-graphite hover:text-status-red transition-colors"
          title="Sign Out"
        >
          <LogOut size={18} />
        </motion.button>
      </div>
    </motion.header>
  );
}
