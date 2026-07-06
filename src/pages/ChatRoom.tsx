import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Hash, Users, Lock } from 'lucide-react';
import { chatMessages } from '../data/mockData';

const rooms = [
  { id: 'general', name: 'General', icon: Hash, desc: 'Open discussion', locked: false },
  { id: 'top-10', name: 'Top 10', icon: Lock, desc: 'Rank 1-10 only', locked: true },
  { id: 'top-25', name: 'Top 25', icon: Lock, desc: 'Rank 1-25 only', locked: true },
];

export default function ChatRoom() {
  const [activeRoom, setActiveRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredMessages = messages.filter((m) => m.room === activeRoom);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages.length]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: `C-${Date.now()}`,
      sender: 'You',
      avatar: '',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      room: activeRoom,
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-[1200px] mx-auto"
    >
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-off-black">Chat Room</h2>
        <p className="text-sm text-graphite mt-1">Connect with peers in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 h-[600px]">
        {/* Room Sidebar */}
        <div className="bg-surface-0 rounded-xl border border-border p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-graphite uppercase tracking-wider mb-3">Channels</h3>
          <div className="space-y-1 flex-1">
            {rooms.map((room) => {
              const isActive = activeRoom === room.id;
              const Icon = room.icon;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-off-black text-warm-white'
                      : 'hover:bg-surface-2 text-charcoal'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-warm-white/60' : 'text-graphite'} />
                  <div>
                    <p className="text-sm font-medium">{room.name}</p>
                    <p className={`text-[10px] ${isActive ? 'text-warm-white/40' : 'text-graphite'}`}>
                      {room.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-border mt-3">
            <div className="flex items-center gap-2 text-xs text-graphite">
              <Users size={12} />
              <span>{filteredMessages.length > 0 ? `${new Set(filteredMessages.map(m => m.sender)).size} participants` : 'No messages yet'}</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-surface-0 rounded-xl border border-border flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash size={16} className="text-graphite" />
              <span className="font-medium text-off-black text-sm">
                {rooms.find((r) => r.id === activeRoom)?.name}
              </span>
            </div>
            <span className="text-xs text-graphite">{filteredMessages.length} messages</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence>
              {filteredMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className="flex items-start gap-3 group"
                >
                  {msg.avatar ? (
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-accent-navy flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">Y</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-off-black">{msg.sender}</span>
                      <span className="text-[10px] text-graphite/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal mt-0.5 leading-relaxed">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />

            {filteredMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-graphite">
                <Hash size={32} className="mb-3 text-mid-gray" />
                <p className="text-sm">No messages in this channel yet</p>
                <p className="text-xs text-graphite/60 mt-1">Start the conversation</p>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Message #${rooms.find((r) => r.id === activeRoom)?.name?.toLowerCase()}...`}
                className="flex-1 px-4 py-2.5 text-sm bg-surface-2 border border-transparent rounded-lg focus:outline-none focus:border-charcoal/20 focus:bg-surface-0 transition-all placeholder:text-mid-gray"
              />
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!message.trim()}
                className="w-9 h-9 rounded-lg bg-off-black text-warm-white flex items-center justify-center disabled:opacity-30 transition-opacity"
              >
                <Send size={15} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
