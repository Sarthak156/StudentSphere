--

Build a premium, modern full-stack web application called the **IPS Academy Student Portal**.
This is not a generic ERP system. The entire experience should feel like an official, next-generation portal for the **Institute of Engineering & Science (IES)**, powered by a clean UI, smooth transitions, and an intuitive, role-based workflow.

The UI must NOT look like:

* generic dashboard templates
* common AI-generated admin panels
* boring school ERP systems
* flat card-based layouts
* flashy, unprofessional designs

The design language should feel like:

* a next-generation official IPS Academy portal
* an intuitive and clean academic operating system
* a professional and elegant user experience
* modern, but grounded in real-world workflows
* premium and well-crafted
* focused on clarity and ease-of-use

The interface should have:

* depth and layering
* floating panels
* subtle hover physics
* clean, dynamic lighting
* smooth transitions
* animated page entry/exit
* interactive motion effects
* rotating gradients
* soft shadows
* parallax layers
* liquid movement
* smooth cursor interactions
* animated charts

The website should feel alive.

---

# Tech Stack

Frontend:

* Next.js / React
* TypeScript
* Tailwind CSS
* Framer Motion for animations
* Zustand or Context API for state management

Backend:

* Node.js + Express OR Next.js API routes
* PostgreSQL / MongoDB
* MongoDB / PostgreSQL
* JWT Authentication
* Socket.io for real-time chat

Other:

* Cloudinary or local upload system for images
* Responsive design for desktop/tablet/mobile
* Optimized performance despite heavy animations

---

# Global Design Direction

## Visual Identity

Theme:

* Clean, professional UI (light or dark theme)
* IPS Academy brand colors
* Soft, subtle borders
* Floating panels with depth
* Minimal and focused design
* Professional typography

Suggested colors:

* Deep black
* Midnight blue
* Purple neon
* Cyan glow
* Soft silver
* Electric pink highlights

Typography:

* Clean, modern sans-serif fonts (e.g., Inter, Poppins)
* Clear, hierarchical headings
* Smooth transitions between sections

---

# Landing Experience

The homepage should feel like an official and secure login portal for IPS Academy.

Include:

* cinematic intro animation
* animated StudentSphere logo reveal
* floating planets/data spheres
* rotating 3D objects
* interactive particle field
* scroll-triggered animations
* depth-based transitions

Hero section:

* Clean, professional branding
* Clear title: "IPS Academy Student Portal"
* animated tagline
* floating UI elements
* Intuitive login form

Possible tagline:
"Institute of Engineering & Science - Academic Management System"

---

# Authentication System

## User Types

1. Admin
2. Coordinator
3. Faculty
4. Student

---

## Login Features

### Admin Login

* Secure password login
* Access to the main administrative dashboard
* Full system access

### Coordinator Login
* Login using official email + password
* Access to a dashboard focused on their assigned section(s)

### Faculty Login
* Login using official email + password
* Access to a dashboard for managing attendance, assignments, and lectures

### Student Login

* Login using Enrollment No. / Computer Code + password
* Personalized dashboard with academic overview

### Session Management

* JWT-based authentication
* Secure protected routes
* Logout completely clears session/token/state

### Access Denied

If unauthorized access occurs:

* clear warning message
* redirect to login
* clean "Access Denied" interface

---

# Main Dashboard

After login, admin enters a futuristic command center dashboard.

## Dashboard Features

* total students count
* key statistics (faculty, departments, etc.)
* live activity panel
* navigation hub
* timetable preview
* recent notices
* student performance summaries

## Dashboard Design

The dashboard should look like:

* a holographic control room
* floating panels connected with animated lines
* reactive mouse movement
* layered depth system

Add:

* animated statistical counters
* hover expansion effects
* clean graph lines

---

# Student Management System

## Features

Admin can:

* view all students, faculty, and coordinators
* search by name, computer code, or enrollment number
* add new users
* edit user details
* delete users
* upload profile pictures

---

## Student Cards

Instead of plain tables:

* use clean, modern profile cards
* subtle tilt interaction on hover
* soft hover effects

Each card shows:

* profile image
* student name
* rank
* points
* quick actions

---

## Add/Edit Student Form

Form should feel futuristic:

* clean input fields with smooth animations
* floating labels
* smooth transitions
* drag-and-drop image upload

Fields:

* name
* DOB
* branch / section
* description
* achievements
* internal marks
* Computer Code
* Enrollment Number
* password
* profile image

---

# Student Profile Page

This should feel like a futuristic character profile from a game.

## Profile Includes

* name
* Computer Code / Enrollment Number
* DOB
* age
* branch / section
* achievements
* projects / certifications
* description
* profile image

---

## Score System

Display academic metrics:

* GPA / CGPA
* Internal Marks
* Attendance Percentage

---

## Radar / Spider Chart

The radar chart should:

* animate while loading
* use brand colors
* react to hover
* feel clean and informative

Add:

* smooth line animation
* neon pulse effects
* rotating background grid

---

## Profile UI

Features:

* floating layered sections
* smooth transitions
* animated achievement badges
* smooth scroll effects

Student can only view:

* their own profile

Admin can:

* access every student profile

---

# Leaderboard System

## Features

* ranks students by points
* ranks students by GPA/CGPA
* visible to all users

---

## Design

Leaderboard should look like a professional academic ranking board.

Top 3 students:

* extra visual emphasis (e.g., gold, silver, bronze accents)

Add:

* smooth sorting animations
* particle bursts on hover

---

# Star Board

A showcase area for top-performing students (e.g., "Dean's List" or "Toppers").

## Features

* displays highest-ranked students
* clean spotlight animation
* professional profile showcase

Design should feel like:

* hall of fame
* official recognition board

Add:

* clean, modern cards
* subtle spotlight effects

---

# Chat Room System

## Chat Features

* real-time messaging
* Socket.io integration
* multiple rooms
* section-based or role-based access
* general chat room

---

## Access Rules

Students:

* only access their section's room
* plus general room

Admin:

* access all rooms

---

## Chat UI

The chat should NOT look like WhatsApp or Discord clone.

Design it like a professional, integrated communication tool.

Features:

* animated message bubbles
* typing indicators
* smooth message entry
* clean timestamps
* animated room switching

Each message shows:

* sender
* timestamp

---

# Notice Board

## Features

Admin can:

* create and target notices (by institute, department, branch, section)
* delete notices
* clear all notices

Users:

* read notices

---

## UI Design

The notice board should feel like:

* a clean, digital announcement wall

Features:

* animated cards
* newest notices first
* clear importance markers (e.g., color-coded)
* smooth transitions

---

# File Upload System

## Features

* upload profile pictures
* supports PNG/JPG/JPEG/GIF
* unique file naming
* file size limits

---

## Upload UI

Add:

* drag-and-drop zone
* clean upload animation
* live preview
* upload progress animation

---

# Automatic Age Calculation

System automatically calculates:

* years
* months

Display:

* beautifully animated age component

Example:
"17 Years 4 Months"

---

# Access Control System

## Admin Permissions

Full access:

* manage institutes, departments, faculty, coordinators, students
* notices
* all chat rooms
* profiles
* dashboard

---

## Student Permissions

Limited access:

* own profile only
* leaderboard
* toppers list
* notices
* rank-specific chat

---

## Unauthorized Access

If restricted route accessed:

* clean warning screen
* smooth transition
* redirect to login

---

# Animation Requirements

Animations are EXTREMELY important.

Must include:

* page transitions
* hover physics
* smooth scroll animations
* clean loading screens
* floating movement
* interactive cursor
* subtle 3D depth
* layered parallax

Every interaction should feel premium.

---

# 3D Environment Ideas

Subtle 3D effects can be used for:

* background elements
* interactive data visualizations
* page transitions

Possible effects:

* subtle geometric motion
* clean background grids

---

# Sound Design (Optional)

Optional immersive sounds:

* hover sounds
* subtle UI clicks
* notification sounds
* notification pulse

Must remain subtle and premium.

---

# Performance Optimization

Even with heavy visuals:

* optimize animations
* lazy load 3D scenes
* compress assets
* smooth FPS
* responsive interactions

---

# Mobile Responsiveness

The application must:

* adapt beautifully on mobile
* preserve 3D feel
* simplify heavy effects on low-end devices
* maintain smooth performance

---

# Final Goal

The IPS Academy Student Portal should feel less like a generic ERP and more like:

* a modern, official platform for the Institute of Engineering & Science
* an intuitive and powerful academic tool
* a system that understands and streamlines the real-world workflows of the college

The final product should make users feel:
"I'm using a professional, modern tool built specifically for my college."

Every screen should feel handcrafted, intuitive, and visually polished.
