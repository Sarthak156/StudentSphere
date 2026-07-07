# StudentSphere — Architecture Document

## Overview

StudentSphere is an **Academic Intelligence Platform** built as a single-page application (SPA) using React 19 with TypeScript. It provides role-based dashboards for **admins**, **teachers**, and **students**, featuring student performance tracking, leaderboards, chat, notices, and more. The application uses mock data for all content and manages navigation via client-side tab state rather than URL-based routing.

---

## Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Framework      | React 19                            |
| Language       | TypeScript 5.9                      |
| Build Tool     | Vite 7                              |
| Styling        | Tailwind CSS 4                      |
| Animations     | Framer Motion                       |
| Charts         | Recharts                            |
| Icons          | Lucide React                        |
| Class Utils    | clsx + tailwind-merge               |
| Linting        | TypeScript (strict mode)            |

---

## Project Structure

```
StudentSphere/
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── architecture.md             # This document
├── src/
│   ├── main.tsx                # Application entry point
│   ├── App.tsx                 # Root component (shell + routing)
│   ├── index.css               # Global styles (Tailwind)
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication state & role checks
│   ├── data/
│   │   └── mockData.ts         # Type definitions & mock data
│   ├── components/
│   │   ├── Header.tsx          # Top navigation bar
│   │   ├── Navigation.tsx      # Tab-based navigation bar
│   │   ├── StatusBar.tsx       # System status indicator
│   │   └── AnimatedCounter.tsx # Animated number display
│   ├── pages/
│   │   ├── LoginPage.tsx       # Login screen
│   │   ├── Dashboard.tsx       # Main analytics dashboard
│   │   ├── AdminDashboard.tsx  # Admin panel
│   │   ├── TeacherDashboard.tsx# Teacher's student management
│   │   ├── StudentDashboard.tsx# Student's self-profile
│   │   ├── Students.tsx        # Student listing (admin)
│   │   ├── StudentProfile.tsx  # Individual student details
│   │   ├── Leaderboard.tsx     # Rankings & performance
│   │   ├── StarBoard.tsx       # Achievements & recognition
│   │   ├── ChatRoom.tsx        # Messaging system
│   │   └── NoticeBoard.tsx     # Notices & announcements
│   └── utils/
│       └── cn.ts               # Tailwind class merging utility
```

---

## Architecture Overview

### 1. Entry Point (`src/main.tsx`)

- Mounts the `<App />` component inside `React.StrictMode`.
- Imports global CSS (`index.css`).

### 2. Root Component (`src/App.tsx`)

The `App` component wraps everything in an `AuthProvider` and contains `AppContent`, which is the main application shell.

**Key responsibilities:**
- **Authentication gate**: If `isAuthenticated` is `false`, renders `<LoginPage />`.
- **Tab-based navigation**: Uses `activeTab` state (string) to determine which page to render — no URL routing.
- **Role-based filtering**: Navigation tabs are filtered based on the user's role:
  - `admin` → sees Admin Panel, Students, Dashboard, Leaderboard, Star Board, Chat, Notices
  - `teacher` → sees My Students, Dashboard, Leaderboard, Star Board, Chat, Notices
  - `student` → sees My Profile, Dashboard, Leaderboard, Star Board, Chat, Notices
- **Student selection flow**: When a student is selected from the Students page, `selectedStudent` state is set and the view switches to `StudentProfile`.
- **Page transitions**: Uses Framer Motion's `AnimatePresence` for smooth page transitions.

**Layout structure:**
```
<StatusBar />
<Header />
<Navigation />
<main> → {renderPage()}</main>
<footer />
```

### 3. Authentication (`src/context/AuthContext.tsx`)

- Provides `AuthContext` with `user`, `login`, `logout`, and role-check booleans (`isAdmin`, `isTeacher`, `isStudent`).
- `login()` validates credentials against the mock `users` array.
- `logout()` clears the current user state.
- Exposes `canManageStudents` and `canManageTeachers` permission flags.

### 4. Data Layer (`src/data/mockData.ts`)

All data is hardcoded mock data. No backend API is used.

**Type definitions:**
- `User` — user accounts with role, department, and assignment relationships
- `Student` — comprehensive student profile including scores, achievements, semester results, assignments, attendance
- `Notice` — announcements with categories and target audiences
- `ChatMessage` — chat messages with sender info and room
- `SemesterResult`, `CourseResult`, `Assignment`, `AttendanceRecord` — academic data types

**Helper functions:**
- `getStudentsByTeacher(teacherId)` — returns students assigned to a teacher
- `getStudentAssignments(studentId)` — returns assignments for a student
- `getStudentAttendance(studentId)` — returns attendance records
- `getAttendanceStats(studentId)` — computes attendance statistics
- `getGradePoints(grade)` — converts letter grade to GPA points

**Dashboard data:**
- `dashboardStats` — aggregate statistics (total students, avg GPA, etc.)
- `activityData` — monthly activity trends
- `departmentData` — student distribution by department

### 5. Component Layer (`src/components/`)

| Component         | Description |
|-------------------|-------------|
| `Header`          | Displays app branding, notification bell, settings, user avatar, and logout button. Uses Framer Motion for entrance animation. |
| `Navigation`      | Renders a horizontal tab bar with icons. Tabs are filtered by role before being passed down. |
| `StatusBar`       | Shows system status indicator (likely online/offline or connection status). |
| `AnimatedCounter` | Displays a numeric value with a counting-up animation. Used for dashboard stats. |

### 6. Page Layer (`src/pages/`)

| Page                | Access     | Description |
|---------------------|------------|-------------|
| `LoginPage`         | Public     | Email/password login form. |
| `Dashboard`         | All roles  | Analytics dashboard with charts (Recharts), stats cards, activity trends, department distribution. |
| `AdminDashboard`    | Admin      | Administrative controls and overview. |
| `TeacherDashboard`  | Teacher    | View and manage assigned students. |
| `StudentDashboard`  | Student    | Self-profile view for students. |
| `Students`          | Admin      | Full student directory with search/filter. |
| `StudentProfile`    | Admin/Teacher | Detailed view of a single student (academics, assignments, attendance, scores). |
| `Leaderboard`       | All roles  | Ranked list of students by GPA/performance. |
| `StarBoard`         | All roles  | Showcases student achievements and recognition. |
| `ChatRoom`          | All roles  | Real-time chat interface with rooms (general, top-10). |
| `NoticeBoard`       | All roles  | Displays notices with pinning, categories, and role-based filtering. |

### 7. Utilities (`src/utils/cn.ts`)

- `cn()` — Combines `clsx` (conditional class names) with `tailwind-merge` (resolves Tailwind conflicts). Used throughout the app for dynamic styling.

---

## Data Flow

```
User Action
    ↓
App.tsx (state change: activeTab, selectedStudent)
    ↓
renderPage() → returns appropriate page component
    ↓
Page component reads from mockData.ts (via imports)
    ↓
AuthContext provides user role & permissions
    ↓
Components conditionally render based on role
```

**Key state management:**
- **Authentication state**: `AuthContext` (React Context)
- **Navigation state**: `activeTab` in `App.tsx` (useState)
- **Student selection**: `selectedStudent` in `App.tsx` (useState)
- **All data**: Static imports from `mockData.ts` (no API calls)

---

## Role-Based Access Control

| Feature               | Admin | Teacher | Student |
|-----------------------|:-----:|:-------:|:-------:|
| Dashboard             | ✅    | ✅      | ✅      |
| Admin Panel           | ✅    | ❌      | ❌      |
| My Students           | ❌    | ✅      | ❌      |
| My Profile            | ❌    | ❌      | ✅      |
| Students Directory    | ✅    | ❌      | ❌      |
| Student Profile (edit)| ✅    | ✅      | ❌      |
| Leaderboard           | ✅    | ✅      | ✅      |
| Star Board            | ✅    | ✅      | ✅      |
| Chat Room             | ✅    | ✅      | ✅      |
| Notice Board          | ✅    | ✅      | ✅      |

---

## Key Design Decisions

1. **Tab-based navigation over URL routing**: The app uses `activeTab` state instead of `react-router-dom` (though the package is installed). This simplifies the SPA architecture for a dashboard-style app where all pages are peers.

2. **Mock data only**: No backend integration. All data is generated client-side, making the app fully self-contained and suitable for demonstration or prototyping.

3. **Role-based UI filtering**: Navigation tabs and page access are filtered at the component level using context values (`isAdmin`, `isTeacher`, `isStudent`), ensuring each role sees only relevant features.

4. **Single-file data layer**: All type definitions, mock data, and helper functions live in one file (`mockData.ts`) for simplicity. This could be split into separate files (types, data, helpers) as the project grows.

5. **Framer Motion for page transitions**: Page changes use `AnimatePresence` with fade/slide variants for a polished UX.

---

## Build & Development

```bash
# Development
npm run dev          # Start Vite dev server

# Production
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build locally
```

The project uses `vite-plugin-singlefile` to optionally bundle everything into a single HTML file for easy deployment.