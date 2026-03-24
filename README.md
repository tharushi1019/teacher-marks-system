# 🎓 Teacher Marks System

A full-stack web application where teachers can select students by grade, assign subject marks, view ranked class performance, and export PDF reports. Admins can manage students and subjects.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, React Router v7 |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB with Mongoose ODM |
| Charts | Chart.js + react-chartjs-2 |
| PDF Export | jsPDF + html2canvas |
| HTTP Client | Axios |

> **Backend language choice: Node.js (JavaScript)**
> Chosen for consistency with the React frontend (same language across the stack), fast API development with Express, and native JSON handling with MongoDB.

---

## 📐 My Approach

### 1. Understanding the Problem
The task required a system for a teacher to:
- Select students (filtered by grade)
- Choose a subject
- Enter and save marks
- View performance analytics

I also identified a logical need for an **Admin role** to manage the underlying data (students and subjects), because marks are meaningless without those entities existing first.

### 2. Solution Design

#### Data Model
I designed three core MongoDB collections:

```
Student  { name, grade (1–13), timestamps }
Subject  { name }
Mark     { studentId → Student, subjectId → Subject, marks }
```

The `Mark` collection acts as a **junction/relationship table** between students and subjects, storing a single numeric mark per student-subject pair.

#### API Structure (REST)
```
GET/POST        /api/students
PUT/DELETE      /api/students/:id
GET/POST        /api/subjects
GET/POST        /api/marks
```

#### Frontend Pages
```
/           → HomePage      (stats overview, role entry point)
/login      → Login         (role selector: Teacher / Admin)
/teacher    → TeacherPage   (mark entry, ranked table, chart, PDF export)
/admin      → AdminPage     (student & subject CRUD, search, edit)
```

#### Key UI Features
- **Grade filter** — teacher selects a grade; only that grade's students load
- **Ranked marks table** — students sorted by average mark with A/B/C/F grade badge
- **Bar chart** — subject averages visualised per class
- **PDF export** — class dashboard exported as downloadable PDF
- **Dark / Light / System theme toggle** — persists via localStorage, respects OS preference

---

## 🗂 Project Structure

```
teacher-marks-system/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── models/         # Mongoose schemas (Student, Subject, Mark)
│   ├── routes/         # Express route handlers
│   ├── controllers/    # Business logic
│   ├── seed.js         # Initial data seeder
│   └── server.js       # Entry point (port 5000)
├── frontend/
│   ├── src/
│   │   ├── components/ # Navbar, ThemeToggle, Login, MarksForm, MarksTable…
│   │   ├── pages/      # HomePage, TeacherPage, AdminPage
│   │   ├── services/   # Axios API base config
│   │   └── index.css   # Tailwind + custom utility classes
│   └── index.html
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

### Backend
```bash
cd backend
npm install
# Create a .env file:
#   MONGO_URI=mongodb://localhost:27017/teacher-marks
#   PORT=5000
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

### Seed Sample Data (optional)
```bash
cd backend
node seed.js
```

---

## 🤖 AI Tools Used

I want to be fully transparent about my use of AI tools during this project, as required by the task.

### ChatGPT
Used during the **initial development phase** for:

- Generating Mongoose schema boilerplate
- Asking how to structure a REST API with Express
- Getting starter JSX component templates for React forms and tables
- Understanding how `react-chartjs-2` should be configured

**Example prompts I used:**
> *"Create a Mongoose schema for a student with name and grade fields where grade is 1 to 13"*

> *"How do I filter an API response in Express by a query parameter like grade?"*

> *"Write a React component that renders a table of students with their marks by subject, showing average and letter grade"*

> *"How do I export a div as a PDF in React using jsPDF and html2canvas?"*

### Antigravity (Google DeepMind AI Coding Assistant)
Used during the **final appearance fixing phase** to:

- Scan the full project and generate a bug report for the theme/UI system
- Identify and fix 7 appearance bugs including:
  - **Tailwind v4 dark mode not responding to JS toggle** (root cause: Tailwind v4 defaults to `prefers-color-scheme`, required `@variant dark` override to enable class-based switching)
  - Missing theme toggle on the Login page
  - Badge and input colours not adapting in dark mode
  - Duplicate background declarations across pages
  - Table headers not being theme-adaptive
- Refactor the `ThemeToggle` component to support Light / Dark / System modes

---

## 💡 What I Would Improve with More Time
- **Authentication** — currently role selection has no password; real auth (JWT) would be added
- **Mark validation** — prevent duplicate marks for the same student/subject pair (upsert logic)
- **Responsive mobile layout** — the marks table overflows on small screens
- **Unit tests** — the project currently has no test coverage

---

*Developed by Tharushi | March 2026*
