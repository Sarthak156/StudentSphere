# StudentSphere — Complete Site Map

> **Platform:** Academic Intelligence Platform  
> **Roles:** Admin, Teacher, Student  
> **Entry Point:** Login Page (`/`)

---

## 1. LOGIN PAGE (`LoginPage.tsx`)

**Access:** Unauthenticated users (all roles)

### Elements & Interactions

| Element | Action | Result |
|---------|--------|--------|
| **Email input field** | Type email | Sets email state |
| **Password input field** | Type password | Sets password state |
| **Show/Hide password toggle** | Click eye icon | Toggles password visibility |
| **"Sign In" button** | Click | Validates credentials → On success: redirects to main app; On failure: shows error message "Invalid email or password" |
| **Quick Login — Admin card** | Click | Auto-fills `admin@studentsphere.edu` / `admin123` |
| **Quick Login — Teacher card** | Click | Auto-fills `j.mitchell@studentsphere.edu` / `teacher123` |
| **Quick Login — Student card** | Click | Auto-fills `a.mercer@studentsphere.edu` / `student123` |
| **Mobile Quick Login buttons** | Click | Same auto-fill as above (visible only on mobile) |
| **"Terms of Service" link** | Click | (Placeholder — no actual link) |
| **"Privacy Policy" link** | Click | (Placeholder — no actual link) |

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@studentsphere.edu | admin123 |
| Teacher | j.mitchell@studentsphere.edu | teacher123 |
| Teacher 2 | s.chen@studentsphere.edu | teacher123 |
| Student | a.mercer@studentsphere.edu | student123 |
| Student 2 | p.nandakumar@studentsphere.edu | student123 |
| Student 3 | m.okafor@studentsphere.edu | student123 |

---

## 2. MAIN LAYOUT (After Login)

**Common to all authenticated users**

### 2.1 Status Bar (`StatusBar.tsx`)
- Displays system status indicator (always "All systems operational")

### 2.2 Header (`Header.tsx`)

| Element | Action | Result |
|---------|--------|--------|
| **StudentSphere logo/brand** | — | Displays app name |
| **Bell (Notifications) icon** | Click | (Placeholder — hover animation only) |
| **Settings (Gear) icon** | Click | (Placeholder — hover animation only) |
| **User avatar/name** | Hover | Shows user initials, name, role |
| **Logout button** | Click | Calls `logout()` → Returns to Login Page |

### 2.3 Navigation Bar (`Navigation.tsx`)

**Role-based tab filtering:**

| Tab ID | Label | Icon | Admin | Teacher | Student |
|--------|-------|------|-------|---------|---------|
| `dashboard` | Dashboard | LayoutDashboard | ✅ | ✅ | ✅ |
| `admin` | Admin Panel | Shield | ✅ | ❌ | ❌ |
| `my-students` | My Students | UsersIcon | ❌ | ✅ | ❌ |
| `my-profile` | My Profile | User | ❌ | ❌ | ✅ |
| `students` | Students | UsersIcon | ✅ | ❌ | ❌ |
| `leaderboard` | Leaderboard | Trophy | ✅ | ✅ | ✅ |
| `starboard` | Star Board | Star | ✅ | ✅ | ✅ |
| `chat` | Chat Room | MessageCircle | ✅ | ✅ | ✅ |
| `notices` | Notices | Clipboard | ✅ | ✅ | ✅ |

- Clicking any tab → Sets `activeTab` state → Renders corresponding page
- Active tab has animated underline indicator

### 2.4 Footer
- Displays copyright "© 2025 StudentSphere · Academic Intelligence Platform"
- Shows current user name & role
- Shows "All systems operational" status indicator

---

## 3. DASHBOARD (`Dashboard.tsx`)

**Access:** All roles (Admin, Teacher, Student)

### 3.1 KPI Cards (4 cards)

| Card | Data | Interaction |
|------|------|-------------|
| **Total Students** | 2,847 | Hover: lifts card with shadow |
| **Average GPA** | 3.62 | Hover: lifts card with shadow |
| **Attendance Rate** | 94.7% | Hover: lifts card with shadow |
| **Active Courses** | 186 | Hover: lifts card with shadow |

- Each card shows: label, animated counter value, icon, trend indicator (vs last semester)

### 3.2 Student Activity Chart (Area Chart)
- Shows enrollment & engagement trends over 6 months (Jul–Dec)
- Hover: tooltip with exact values

### 3.3 Department Distribution (Bar Chart)
- Shows student count per department
- Hover: tooltip with department name & count

### 3.4 Top Performers (Top 5 Students)
- Displays rank, avatar, name, department, GPA, rank change indicator
- Hover: row highlight

### 3.5 Latest Notices (4 notices)
- Shows pinned indicator, category badge, title, content preview, date
- Hover: row highlight with border change

---

## 4. ADMIN DASHBOARD (`AdminDashboard.tsx`)

**Access:** Admin only (tab: "Admin Panel")

### 4.1 Quick Stats (4 cards)
- Total Teachers, Total Students, Active Students, Departments count

### 4.2 Section Tabs

| Tab | Action | Result |
|-----|--------|--------|
| **Overview** | Click | Shows Recent Teachers list + Department Distribution |
| **Manage Teachers** | Click | Shows teacher management interface |
| **Manage Students** | Click | Shows student management interface |

### 4.3 Overview Section
- **Recent Teachers:** List of teachers with name, department, assigned student count
- **Department Distribution:** Bar chart with department names, student counts, percentage bars

### 4.4 Manage Teachers Section

| Element | Action | Result |
|---------|--------|--------|
| **"Add Teacher" button** | Click | Opens modal form |
| **Teacher list table** | — | Shows columns: Name, Department, Students, Email |
| **Delete (Trash) icon** | Click | Removes teacher from list |

**Add Teacher Modal:**
| Field | Type | Description |
|-------|------|-------------|
| Full Name | Text input | Required |
| Email | Text input | Required |
| Department | Text input | Required |
| Default password | Info text | `teacher123` |
| **"Add Teacher" button** | Click | Validates → Creates teacher with random avatar → Closes modal |

### 4.5 Manage Students Section

| Element | Action | Result |
|---------|--------|--------|
| **"Add Student" button** | Click | Opens modal form |
| **Student list table** | — | Shows columns: Name, ID, Department, Year, GPA, Status |
| **Delete (Trash) icon** | Click | Removes student from list |

**Add Student Modal:**
| Field | Type | Description |
|-------|------|-------------|
| Full Name | Text input | Required |
| Email | Text input | Required |
| Department | Text input | Required |
| Year | Dropdown (1-4) | Required |
| Section | Dropdown (A/B/C) | Required |
| Phone | Text input | Optional |
| Address | Text input | Optional |
| Father's Name | Text input | Optional |
| Mother's Name | Text input | Optional |
| Default password | Info text | `student123` |
| **"Add Student" button** | Click | Validates → Creates student → Closes modal |

---

## 5. TEACHER DASHBOARD (`TeacherDashboard.tsx`)

**Access:** Teacher only (tab: "My Students")

### 5.1 Stats Cards (3 cards)
- Assigned Students count, Active Students count, Departments count

### 5.2 My Students Grid
- Displays student cards with: avatar, name, ID, department, GPA, rank, attendance %, status indicator, rank movement, overall score, semester
- **Click on any student card** → Opens `StudentProfile` in edit mode (`canEdit=true`)

### 5.3 Empty State
- If no students assigned: Shows "No students assigned to you yet" with contact admin message

---

## 6. STUDENT DASHBOARD (`StudentDashboard.tsx`)

**Access:** Student only (tab: "My Profile")

### 6.1 Behavior
- Looks up student by matching email from auth context
- If found → Renders `StudentProfile` in read-only mode (`canEdit=false`)
- If not found → Shows "Profile Not Found" error message

---

## 7. STUDENT PROFILE (`StudentProfile.tsx`)

**Access:** 
- Admin: Via "Students" tab → click student card
- Teacher: Via "My Students" tab → click student card
- Student: Via "My Profile" tab (read-only)

### 7.1 Profile Header
- Back button (except for Student viewing own profile)
- Avatar with status indicator dot (green/amber/red)
- Name, ID, Department
- Status badge
- Email, Phone, Year/Semester/Section
- GPA, CGPA, Rank display

### 7.2 Quick Action Buttons (Admin/Teacher only)
| Button | Action | Result |
|--------|--------|--------|
| **Edit Student** | Click | Calls `onEditStudent` callback |
| **Remove Student** | Click | Calls `onDeleteStudent` callback |

### 7.3 Profile Tabs

| Tab | Content |
|-----|---------|
| **Overview** | Personal Details, Academic Mentor, Academic Stats, Performance Radar chart, Achievements, Score Breakdown bars, Rank Movement |
| **Semester Results** | GPA trend bar chart, Semester cards with course list (code, name, credits, grade, score) |
| **Assignments** | Stats (Total/Submitted/Graded/Pending), Assignment cards with title, status, course, due date, score, feedback |
| **Attendance** | Overall %, Present/Absent/Late/Excused counts, Attendance records list with course code, date, status |

### 7.4 Overview Tab Details
- **Personal Details:** DOB, Blood Group, Father's Name, Mother's Name, Emergency Contact, Address
- **Academic Mentor:** Mentor name and designation (if assigned)
- **Academic Stats:** Total Credits, Completed, Backlogs, Semester
- **Performance Radar:** Radar chart with 6 dimensions (Academic, Social, Physical, Looks, Communication, Skills)
- **Achievements:** List of achievement badges
- **Score Breakdown:** Animated progress bars for each dimension
- **Rank Movement:** Up/down/stable indicator with position change

### 7.5 Semester Results Tab
- **GPA Trend:** Bar chart showing GPA across all semesters
- **Semester Cards:** Expandable cards showing courses with code, name, credits, grade, score, status (passed/ongoing/failed)

### 7.6 Assignments Tab
- **Stats Row:** Total, Submitted, Graded, Pending counts
- **Assignment Cards:** Title, status badge, course, due date, submitted date, score, feedback

### 7.7 Attendance Tab
- **Stats Row:** Overall %, Present, Absent, Late, Excused counts
- **Attendance Records:** Scrollable list with color-coded status dots

---

## 8. STUDENTS DIRECTORY (`Students.tsx`)

**Access:** Admin only (tab: "Students")

### 8.1 Search & Filters
| Element | Action | Result |
|---------|--------|--------|
| **Search input** | Type text | Filters by name, department, or ID (case-insensitive) |
| **Department filter buttons** | Click | Filters by department ("All" shows all) |

### 8.2 Student Grid
- Displays student cards with: avatar, status dot, name, ID, department, year, GPA, rank, achievement tags
- **Click on any student card** → Opens `StudentProfile` with `canEdit=true` (Admin can edit)

### 8.3 Results Count
- Shows "Showing X of Y students"

---

## 9. LEADERBOARD (`Leaderboard.tsx`)

**Access:** All roles

### 9.1 Top 3 Podium
- **#1 Gold:** Crown icon, orange ring, featured styling
- **#2 Silver:** Medal icon, slate ring
- **#3 Bronze:** Medal icon, teal ring
- Each shows: avatar, name, department, GPA, rank movement
- Hover: lifts card with shadow

### 9.2 Full Ranking Table
- Columns: Rank, Student (avatar + name + ID), Department, Year, GPA, Score (with progress bar), Movement
- Rows 1-3 have subtle background highlight
- Hover: row highlight

### 9.3 Footer
- "Rankings updated daily based on academic performance metrics"

---

## 10. STAR BOARD (`StarBoard.tsx`)

**Access:** All roles

### 10.1 Header
- "Recognition Gallery" subtitle with sparkle icons
- Title and description

### 10.2 Featured Student (#1)
- Large avatar with star badge
- Name, department, year
- Achievement tags
- GPA and Overall Score display
- Decorative background circles

### 10.3 Star Grid (Ranks 2-7)
- Cards with: avatar, rank badge, name, department
- Stats: GPA, Score, Year
- Achievement tags (up to 3)
- "Top X% performer" indicator
- Hover: lifts card with shadow

### 10.4 Footer
- "Star Board recognizes the top 7 students each semester"

---

## 11. CHAT ROOM (`ChatRoom.tsx`)

**Access:** All roles

### 11.1 Room Sidebar
| Room | Icon | Description | Access |
|------|------|-------------|--------|
| **General** | Hash | Open discussion | All users |
| **Top 10** | Lock | Rank 1-10 only | Restricted (UI only) |
| **Top 25** | Lock | Rank 1-25 only | Restricted (UI only) |

- Click room → Switches active room → Shows filtered messages
- Shows participant count for active room

### 11.2 Chat Area
- **Header:** Room name with hash icon, message count
- **Messages:** Sender avatar/initials, name, timestamp (on hover), message text
- **Empty state:** "No messages in this channel yet" with icon
- **Input field:** Type message, placeholder changes per room
- **Send button** (or Enter key): Sends message → Appears in chat with "You" as sender

### 11.3 Auto-scroll
- Scrolls to bottom when new messages arrive

---

## 12. NOTICE BOARD (`NoticeBoard.tsx`)

**Access:** All roles

### 12.1 Category Filters
| Filter | Action | Result |
|--------|--------|--------|
| **All** | Click | Shows all notices |
| **Academic** | Click | Filters academic notices |
| **Event** | Click | Filters event notices |
| **Urgent** | Click | Filters urgent notices |
| **General** | Click | Filters general notices |

### 12.2 Pinned Notices Section
- Orange pin icon header
- Cards with: orange left accent bar, category badge, pin icon, title, content (2-line clamp), author, date
- Hover: lifts card with shadow

### 12.3 Other Notices Section
- Cards with: category badge, title, content (2-line clamp), author, date
- Hover: shifts right (x: 4px)

### 12.4 Empty State
- "No notices in this category" when filter yields no results

---

## 13. COMPLETE USER FLOW DIAGRAMS

### 13.1 Admin Flow

```
Login (admin@studentsphere.edu)
  │
  ├── Dashboard (default)
  │     ├── View KPI cards
  │     ├── View activity chart
  │     ├── View department distribution
  │     ├── View top performers
  │     └── View latest notices
  │
  ├── Admin Panel
  │     ├── Overview
  │     │     ├── View recent teachers
  │     │     └── View department distribution
  │     ├── Manage Teachers
  │     │     ├── View teacher list
  │     │     ├── Add Teacher (opens modal)
  │     │     └── Delete Teacher
  │     └── Manage Students
  │           ├── View student list
  │           ├── Add Student (opens modal)
  │           └── Delete Student
  │
  ├── Students
  │     ├── Search students
  │     ├── Filter by department
  │     └── Click student → Student Profile (can edit)
  │           ├── Overview tab
  │           ├── Semester Results tab
  │           ├── Assignments tab
  │           ├── Attendance tab
  │           ├── Edit Student button
  │           └── Remove Student button
  │
  ├── Leaderboard
  │     ├── View top 3 podium
  │     └── View full ranking table
  │
  ├── Star Board
  │     ├── View featured #1 student
  │     └── View ranks 2-7 grid
  │
  ├── Chat Room
  │     ├── Switch between General / Top 10 / Top 25 rooms
  │     ├── View messages
  │     └── Send messages
  │
  ├── Notices
  │     ├── Filter by category
  │     ├── View pinned notices
  │     └── View other notices
  │
  └── Logout → Login Page
```

### 13.2 Teacher Flow

```
Login (j.mitchell@studentsphere.edu or s.chen@studentsphere.edu)
  │
  ├── Dashboard (default)
  │     ├── View KPI cards
  │     ├── View activity chart
  │     ├── View department distribution
  │     ├── View top performers
  │     └── View latest notices
  │
  ├── My Students
  │     ├── View stats cards
  │     ├── View assigned student cards
  │     └── Click student → Student Profile (can edit)
  │           ├── Overview tab
  │           ├── Semester Results tab
  │           ├── Assignments tab
  │           ├── Attendance tab
  │           ├── Edit Student button
  │           └── Remove Student button
  │
  ├── Leaderboard
  │     ├── View top 3 podium
  │     └── View full ranking table
  │
  ├── Star Board
  │     ├── View featured #1 student
  │     └── View ranks 2-7 grid
  │
  ├── Chat Room
  │     ├── Switch between General / Top 10 / Top 25 rooms
  │     ├── View messages
  │     └── Send messages
  │
  ├── Notices
  │     ├── Filter by category
  │     ├── View pinned notices
  │     └── View other notices
  │
  └── Logout → Login Page
```

### 13.3 Student Flow

```
Login (a.mercer@studentsphere.edu or any student email)
  │
  ├── Dashboard (default)
  │     ├── View KPI cards
  │     ├── View activity chart
  │     ├── View department distribution
  │     ├── View top performers
  │     └── View latest notices
  │
  ├── My Profile
  │     └── Student Profile (read-only, no edit/delete)
  │           ├── Overview tab
  │           ├── Semester Results tab
  │           ├── Assignments tab
  │           └── Attendance tab
  │
  ├── Leaderboard
  │     ├── View top 3 podium
  │     └── View full ranking table
  │
  ├── Star Board
  │     ├── View featured #1 student
  │     └── View ranks 2-7 grid
  │
  ├── Chat Room
  │     ├── Switch between General / Top 10 / Top 25 rooms
  │     ├── View messages
  │     └── Send messages
  │
  ├── Notices
  │     ├── Filter by category
  │     ├── View pinned notices
  │     └── View other notices
  │
  └── Logout → Login Page
```

---

## 14. ROLE-BASED PERMISSIONS MATRIX

| Feature / Action | Admin | Teacher | Student |
|-----------------|-------|---------|---------|
| View Dashboard | ✅ | ✅ | ✅ |
| View Admin Panel | ✅ | ❌ | ❌ |
| View My Students | ❌ | ✅ | ❌ |
| View My Profile | ❌ | ❌ | ✅ |
| View Students Directory | ✅ | ❌ | ❌ |
| View Leaderboard | ✅ | ✅ | ✅ |
| View Star Board | ✅ | ✅ | ✅ |
| View Chat Room | ✅ | ✅ | ✅ |
| View Notices | ✅ | ✅ | ✅ |
| Add Teacher | ✅ | ❌ | ❌ |
| Delete Teacher | ✅ | ❌ | ❌ |
| Add Student | ✅ | ❌ | ❌ |
| Delete Student | ✅ | ❌ | ❌ |
| Edit Student Profile | ✅ | ✅ (assigned only) | ❌ |
| View Student Profile | ✅ (all) | ✅ (assigned only) | ✅ (self only) |
| Send Chat Messages | ✅ | ✅ | ✅ |
| Filter Notices | ✅ | ✅ | ✅ |
| Logout | ✅ | ✅ | ✅ |

---

## 15. DATA MODELS REFERENCE

| Entity | Key Fields |
|--------|-----------|
| **User** | id, name, email, password, role (admin/teacher/student), avatar, department, assignedStudents[], assignedTeacher |
| **Student** | id, name, email, avatar, department, year, semester, section, gpa, cgpa, rank, rankChange, status, scores{6 dimensions}, achievements[], personal info, semesterResults[], assignments[], attendance[] |
| **Notice** | id, title, content, category (academic/event/urgent/general), pinned, author, date, targetAudience[] |
| **ChatMessage** | id, sender, avatar, message, timestamp, room (general/top-10/top-25) |
| **SemesterResult** | semester, year, gpa, credits, status, courses[] |
| **Assignment** | id, title, course, courseCode, dueDate, submittedDate, status, score, maxScore, feedback |
| **AttendanceRecord** | date, course, courseCode, status (present/absent/late/excused) |

---

## 16. UI COMPONENTS & INTERACTIONS SUMMARY

| Component | File | Key Interactions |
|-----------|------|-----------------|
| StatusBar | `StatusBar.tsx` | Static display |
| Header | `Header.tsx` | Notifications (placeholder), Settings (placeholder), User info, Logout |
| Navigation | `Navigation.tsx` | Tab switching with animated indicator, role-based filtering |
| AnimatedCounter | `AnimatedCounter.tsx` | Animated number display in KPI cards |
| Footer | (in App.tsx) | Copyright, user info, system status |

---

## 17. EDGE CASES & EMPTY STATES

| Scenario | Handling |
|----------|----------|
| Invalid login credentials | Error message: "Invalid email or password" |
| Teacher with no assigned students | Empty state: "No students assigned to you yet" |
| Student profile not found | "Profile Not Found" message |
| No messages in chat room | "No messages in this channel yet" |
| No notices in category | "No notices in this category" |
| Student viewing own profile | No back button, no edit/delete buttons |
| Admin viewing student profile | Can edit and delete |
| Teacher viewing assigned student | Can edit and delete |
| Adding teacher/student with empty required fields | Button disabled until required fields filled |
| Chat room with restricted access | Lock icon shown (no actual access control implemented) |