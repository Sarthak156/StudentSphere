import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { students } from '../data/mockData';
import StudentProfile from './StudentProfile';

export default function StudentDashboard() {
  const { user } = useAuth();
  const student = students.find(s => s.email === user?.email);

  if (!student) {
    return (
      <div className="p-8 max-w-[1400px] mx-auto text-center py-20">
        <User size={48} className="text-mid-gray mx-auto mb-4" />
        <h2 className="font-display font-semibold text-xl text-off-black">Profile Not Found</h2>
        <p className="text-sm text-graphite mt-2">Your student profile could not be loaded.</p>
      </div>
    );
  }

  return <StudentProfile student={student} onBack={() => {}} />;
}
