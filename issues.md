# StudentSphere - Project Issues & Improvement Areas

This document lists identified issues, bugs, and areas for improvement in the StudentSphere project.

---

## 1. Authentication & State

### 1.1. Insecure Mock Authentication

*   **Issue**: The `AuthContext` performs authentication by searching for a matching email and password in a client-side mock data array (`src/data/mockData.ts`). This is highly insecure.
*   **Severity**: High (if this were a production app)
*   **Recommendation**: Replace the mock login logic with a proper backend authentication flow using JWTs as outlined in the `README.md`. For now, this is acceptable for a prototype.

### 1.2. Client-Side State is Not Persisted

*   **Issue**: Any state changes made during a session (e.g., sending a chat message, editing a student) are lost upon page refresh. The application state resets to the initial mock data.
*   **Severity**: Medium
*   **Recommendation**: To improve the demo experience, consider persisting state changes to `localStorage`. For example, updates to students, notices, or new chat messages could be saved and reloaded.

### 1.3. Hardcoded User in Chat

*   **Issue**: When sending a message in `ChatRoom.tsx`, the sender is hardcoded as `"You"`. The message is not associated with the currently logged-in user from `AuthContext`.
*   **Severity**: Low
*   **Recommendation**: Use the `user` object from `useAuth()` to set the `sender` and `avatar` for new messages.

## 2. Routing & Navigation

### 2.1. No URL-Based Routing

*   **Issue**: The application uses component state (`activeTab`) for navigation instead of a router library like `react-router-dom`. This means pages are not bookmarkable, and browser back/forward buttons do not work as expected.
*   **Severity**: Medium
*   **Recommendation**: Implement `react-router-dom` to manage navigation. Each page should correspond to a unique URL (e.g., `/dashboard`, `/students`, `/chat`). This aligns better with web standards.

### 2.2. Student Profile Navigation is Fragile

*   **Issue**: Viewing a student profile is handled by setting a `selectedStudent` state in the root `App.tsx` component. This is not a scalable or robust way to handle detail views.
*   **Severity**: Medium
*   **Recommendation**: With a router, this can be handled with a dynamic route like `/students/:studentId`. The `StudentProfile` page would fetch the student's ID from the URL parameters.

## 3. UI/UX & Feature Gaps

### 3.1. Missing 3D and Advanced Animations

*   **Issue**: The `README.md` describes a highly immersive, 3D, and cinematic UI. The current implementation is a well-designed but standard 2D dashboard. There is no usage of `Three.js`, `React Three Fiber`, or `GSAP` as specified.
*   **Severity**: High (based on project vision)
*   **Recommendation**: Begin integrating `react-three-fiber` for background animations, 3D elements, and page transitions to match the project's core vision.

### 3.2. Chat Room Access Control Not Implemented

*   **Issue**: The `ChatRoom.tsx` component displays locked rooms (`Top 10`, `Top 25`) but does not implement the access control logic described in the `README.md`. Any user can currently view the (empty) message list for these rooms.
*   **Severity**: Medium
*   **Recommendation**: Use the `user` and `student` data from context/mock data to check the user's rank and conditionally disable or hide rooms they cannot access.

### 3.3. Hardcoded Top 7 Students on Star Board

*   **Issue**: The `StarBoard.tsx` page correctly sorts students by rank but hardcodes the slice to the top 7 (`.slice(0, 7)`). The `README.md` specifies this is the correct number, but it's inflexible.
*   **Severity**: Low
*   **Recommendation**: Move the number `7` to a constant at the top of the file (e.g., `const STAR_BOARD_COUNT = 7;`) to make it easier to configure.

## 4. Code & Project Structure

### 4.1. Monolithic Mock Data File

*   **Issue**: `src/data/mockData.ts` is over 700 lines long and contains type definitions, mock data, and data-massaging helper functions. This makes it difficult to navigate and maintain.
*   **Severity**: Low
*   **Recommendation**: Split the file into logical parts:
    *   `src/types/index.ts`: All TypeScript interfaces (`User`, `Student`, etc.).
    *   `src/data/mocks.ts`: The mock data arrays (`users`, `students`, etc.).
    *   `src/data/helpers.ts`: Helper functions (`getStudentsByTeacher`, `generateAssignments`, etc.).

### 4.2. Unused Dependencies

*   **Issue**: The `package.json` may contain dependencies that are not used in the project (e.g., `react-router-dom` is installed but not used for routing).
*   **Severity**: Low
*   **Recommendation**: Run a tool like `depcheck` to identify and remove unused packages to keep the project clean.