import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StatusBar from './components/StatusBar';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import Leaderboard from './pages/Leaderboard';
import StarBoard from './pages/StarBoard';
import ChatRoom from './pages/ChatRoom';
import NoticeBoard from './pages/NoticeBoard';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import FacultyManagement from './pages/FacultyManagement';
import { LayoutDashboard, Shield, Users as UsersIcon, User, Trophy, Star, MessageCircle, Clipboard, Building, BookOpenCheck } from 'lucide-react';
import type { Student } from './data/mockData';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

function AppContent() {
  const { isAuthenticated, user, logout, isSuperAdmin, isPrincipal, isHod, isCoordinator, isFaculty, isStudent } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleSelectStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
    setActiveTab('student-profile');
  }, []);

  const handleBackFromProfile = useCallback(() => {
    setSelectedStudent(null);
    setActiveTab('students');
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setSelectedStudent(null);
    setActiveTab(tab);
  }, []);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const canManageUsers = isSuperAdmin || isPrincipal || isHod;

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin', label: 'ERP Admin', icon: Shield },
    { id: 'faculty-mgmt', label: 'Faculty & Coordinators', icon: Building },
    { id: 'coordinator', label: 'Coordinator Panel', icon: BookOpenCheck },
    { id: 'my-students', label: 'My Lectures', icon: UsersIcon },
    { id: 'my-profile', label: 'My Profile', icon: User },
    { id: 'students', label: 'Student Directory (IES)', icon: UsersIcon },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'starboard', label: 'Star Board', icon: Star },
    { id: 'chat', label: 'Chat Room', icon: MessageCircle },
    { id: 'notices', label: 'Notices', icon: Clipboard },
  ];

  const filteredNavTabs = navTabs.filter(tab => {
    if (tab.id === 'admin') return isSuperAdmin;
    if (tab.id === 'faculty-mgmt') return canManageUsers;
    if (tab.id === 'coordinator') return isCoordinator || canManageUsers;
    if (tab.id === 'my-students') return isFaculty;
    if (tab.id === 'my-profile') return isStudent;
    if (tab.id === 'students') return canManageUsers || isCoordinator || isFaculty;
    return true;
  });

  const renderPage = () => {
    if (activeTab === 'student-profile' && selectedStudent) {
      const canEdit = canManageUsers || isCoordinator || isFaculty;
      return (
        <StudentProfile
          student={selectedStudent}
          onBack={handleBackFromProfile}
          canEdit={canEdit}
        />
      );
    }

    if (canManageUsers && activeTab === 'faculty-mgmt') return <FacultyManagement />;
    if (isSuperAdmin && activeTab === 'admin') return <AdminDashboard />;
    if (isFaculty && activeTab === 'my-students') return <TeacherDashboard />;
    if ((isCoordinator || canManageUsers) && activeTab === 'coordinator') return <CoordinatorDashboard />;
    if (isStudent && activeTab === 'my-profile') return <StudentDashboard />;

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students onSelectStudent={handleSelectStudent} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'starboard':
        return <StarBoard />;
      case 'chat':
        return <ChatRoom />;
      case 'notices':
        return <NoticeBoard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-1 flex flex-col">
      <StatusBar />
      <Header onLogout={logout} user={user} />
      <Navigation
        tabs={filteredNavTabs}
        activeTab={activeTab === 'student-profile' ? (isFaculty ? 'my-students' : isStudent ? 'my-profile' : 'students') : activeTab}
        onTabChange={handleTabChange}
      />

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="px-4 sm:px-8 py-4 border-t border-border bg-surface-0">
        <div className="flex items-center justify-between text-xs text-graphite">
          <span>© 2026 IPS Academy — Institute of Engineering & Science (IES), Indore · Academic Management Portal</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{user?.name} · {user?.role === 'superadmin' ? 'Super Admin' : user?.role === 'principal' ? 'Principal' : user?.role === 'hod' ? 'HOD' : user?.role === 'coordinator' ? 'Section Coordinator' : user?.role === 'faculty' ? 'Faculty' : 'Student'}</span>
            <span className="w-px h-3 bg-border hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
              IES ERP — All systems operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
