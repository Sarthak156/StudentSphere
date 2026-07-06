import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Calendar, User, Filter } from 'lucide-react';
import { notices } from '../data/mockData';

const categories = ['all', 'academic', 'event', 'urgent', 'general'];

const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
  academic: { bg: 'bg-accent-navy/10', text: 'text-accent-navy', label: 'Academic' },
  event: { bg: 'bg-accent-teal/10', text: 'text-accent-teal', label: 'Event' },
  urgent: { bg: 'bg-status-red/10', text: 'text-status-red', label: 'Urgent' },
  general: { bg: 'bg-surface-3', text: 'text-graphite', label: 'General' },
};

export default function NoticeBoard() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? notices
    : notices.filter((n) => n.category === activeCategory);

  const pinnedNotices = filtered.filter((n) => n.pinned);
  const otherNotices = filtered.filter((n) => !n.pinned);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-[1200px] mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-off-black">Notice Board</h2>
          <p className="text-sm text-graphite mt-1">Academic announcements & institutional updates</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-graphite" />
          <div className="flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-off-black text-warm-white'
                    : 'bg-surface-2 text-graphite hover:bg-surface-3'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Pin size={13} className="text-accent-orange" />
            <span className="text-xs font-semibold text-graphite uppercase tracking-wider">Pinned</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {pinnedNotices.map((notice, i) => {
                const config = categoryConfig[notice.category];
                return (
                  <motion.div
                    key={notice.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                    className="bg-surface-0 rounded-xl border border-border p-5 cursor-pointer transition-all hover:border-mid-gray/50 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange rounded-l-xl" />
                    <div className="pl-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                          {config.label}
                        </span>
                        <Pin size={10} className="text-accent-orange" />
                      </div>
                      <h3 className="font-semibold text-off-black text-sm leading-snug">{notice.title}</h3>
                      <p className="text-xs text-graphite mt-2 leading-relaxed line-clamp-2">{notice.content}</p>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-light">
                        <div className="flex items-center gap-1.5">
                          <User size={11} className="text-graphite/50" />
                          <span className="text-[10px] text-graphite">{notice.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-graphite/50" />
                          <span className="text-[10px] text-graphite">{notice.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Other Notices */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {otherNotices.map((notice, i) => {
            const config = categoryConfig[notice.category];
            return (
              <motion.div
                key={notice.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (pinnedNotices.length + i) * 0.06, duration: 0.4 }}
                whileHover={{ x: 4 }}
                className="bg-surface-0 rounded-xl border border-border p-5 cursor-pointer hover:bg-surface-1 hover:border-mid-gray/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                        {config.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-off-black text-sm">{notice.title}</h3>
                    <p className="text-xs text-graphite mt-1.5 leading-relaxed line-clamp-2">{notice.content}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <User size={11} className="text-graphite/50" />
                        <span className="text-[10px] text-graphite">{notice.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-graphite/50" />
                        <span className="text-[10px] text-graphite">{notice.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-graphite">No notices in this category</p>
        </div>
      )}
    </motion.div>
  );
}
