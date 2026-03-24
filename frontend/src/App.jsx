import { useState } from "react";
import StudentList from "./components/StudentList";
import MarksForm from "./components/MarksForm";
import MarksTable from "./components/MarksTable";

export default function App() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState(""); // ✅ NEW
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen px-6 py-10">

      {/* DARK MODE */}
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="fixed top-4 right-4 btn-primary"
      >
        🌙
      </button>

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-center mb-10 
                     bg-gradient-to-r from-blue-600 to-blue-400 
                     bg-clip-text text-transparent animate-fade-in">
        🎓 Teacher Dashboard
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* LEFT PANEL */}
        <div className="glass p-6 space-y-6 animate-slide-up">

          <div>
            <label className="font-medium">Select Student</label>
            <StudentList 
              setStudentId={setStudentId}
              setStudentName={setStudentName} // ✅ NEW
              refresh={refresh}
            />
          </div>

          <div>
            <label className="font-medium">Enter Marks</label>
            <MarksForm 
              studentId={studentId} 
              setRefresh={setRefresh}
            />
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="glass p-6 animate-slide-up delay-150">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            Marks Overview
          </h2>

          <MarksTable 
            studentId={studentId}
            studentName={studentName} // ✅ NEW
            refresh={refresh}
          />
        </div>

      </div>
    </div>
  );
}