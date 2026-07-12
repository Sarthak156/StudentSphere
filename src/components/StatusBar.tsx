import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Trophy, Signal } from 'lucide-react';
import { dashboardStats } from '../data/mockData';

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const items = [
    { icon: Users, label: 'IES Students Enrolled', value: dashboardStats.totalStudents.toLocaleString() },
    { icon: Activity, label: 'Active Now', value: dashboardStats.activeUsers.toLocaleString() },
    { icon: Trophy, label: 'MST-II Ranking', value: 'Live' },
    { icon: Signal, label: 'IES Server', value: 'Operational' },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-off-black text-warm-white/70 px-4 sm:px-6 py-2 flex items-center justify-between text-xs tracking-wide overflow-x-auto"
    >
      <div className="hidden md:flex items-center gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <item.icon size={12} className="text-warm-white/40" />
            <span className="text-warm-white/40">{item.label}:</span>
            <span className="text-warm-white/80 font-medium">{item.value}</span>
            {i < items.length - 1 && (
              <span className="ml-4 w-px h-3 bg-warm-white/10" />
            )}
          </div>
        ))}
      </div>
      <div className="flex md:hidden items-center gap-4">
        <div className="flex items-center gap-2">
          <Users size={12} className="text-warm-white/40" />
          <span className="text-warm-white/80 font-medium">{dashboardStats.totalStudents.toLocaleString()}</span>
        </div>
        <span className="w-px h-3 bg-warm-white/10" />
        <div className="flex items-center gap-2">
          <Signal size={12} className="text-warm-white/40" />
          <span className="text-warm-white/80 font-medium">IES Online</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-warm-white/40 hidden sm:inline">{formatDate(time)}</span>
        <span className="w-px h-3 bg-warm-white/10 hidden sm:inline" />
        <span className="text-warm-white/70 font-mono tabular-nums">{formatTime(time)}</span>
        <span className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
      </div>
    </motion.div>
  );
}
