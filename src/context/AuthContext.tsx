import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '../data/mockData';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  // Permission booleans matching exact matrix
  canManageInstitutes: boolean;
  canManageBranches: boolean;
  canAddFaculty: boolean;
  canAssignFacultyToSubjects: boolean;
  canAssignCoordinators: boolean;
  canAddStudents: boolean;
  canViewAllStudents: boolean;
  canViewSectionStudents: boolean;
  canViewAssignedStudents: boolean;
  canTakeAttendance: boolean;
  canEditAttendance: boolean;
  canReviewAttendance: boolean;
  canUploadMarks: boolean;
  canViewReports: boolean;
  canViewSectionReports: boolean;
  canViewSubjectReports: boolean;
  canPublishNotices: boolean;
  canPublishSectionNotices: boolean;
  canPublishSubjectNotices: boolean;
  canManageTimetables: boolean;
  canViewTimetables: boolean;
  canSubmitAssignments: boolean;
  canResetPasswords: boolean;
  canManageSystem: boolean;
  // Role checks
  isSuperAdmin: boolean;
  isPrincipal: boolean;
  isHod: boolean;
  isCoordinator: boolean;
  isFaculty: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }
    setUser(found);
    return { success: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const r = user?.role;

  // Exact permission matrix from spec
  const perms = {
    canManageInstitutes:       r === 'superadmin',
    canManageBranches:         r === 'superadmin',
    canAddFaculty:             r === 'superadmin' || r === 'principal' || r === 'hod',
    canAssignFacultyToSubjects: r === 'superadmin' || r === 'principal' || r === 'hod',
    canAssignCoordinators:     r === 'superadmin' || r === 'principal' || r === 'hod',
    canAddStudents:            r === 'superadmin' || r === 'principal' || r === 'hod',
    canViewAllStudents:        r === 'superadmin' || r === 'principal' || r === 'hod',
    canViewSectionStudents:    r === 'coordinator',
    canViewAssignedStudents:   r === 'faculty',
    canTakeAttendance:         r === 'faculty',
    canEditAttendance:         r === 'faculty',
    canReviewAttendance:       r === 'hod' || r === 'coordinator' || r === 'principal',
    canUploadMarks:            r === 'faculty',
    canViewReports:            r === 'superadmin' || r === 'principal' || r === 'hod',
    canViewSectionReports:     r === 'coordinator',
    canViewSubjectReports:     r === 'faculty',
    canPublishNotices:         r === 'superadmin' || r === 'principal' || r === 'hod',
    canPublishSectionNotices:  r === 'coordinator',
    canPublishSubjectNotices:  r === 'faculty',
    canManageTimetables:       r === 'superadmin' || r === 'principal' || r === 'hod',
    canViewTimetables:         true, // everyone
    canSubmitAssignments:      r === 'student',
    canResetPasswords:         r === 'superadmin',
    canManageSystem:           r === 'superadmin',
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        ...perms,
        isSuperAdmin:  r === 'superadmin',
        isPrincipal:   r === 'principal',
        isHod:         r === 'hod',
        isCoordinator: r === 'coordinator',
        isFaculty:     r === 'faculty',
        isStudent:     r === 'student',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
