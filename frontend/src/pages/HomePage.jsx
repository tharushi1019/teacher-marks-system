import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import API from "../services/api";

export default function HomePage({ setRole }) {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
    API.get("/subjects").then(res => setSubjects(res.data));
  }, []);

  return (
    <div className="min-h-screen p-6 relative">

      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* HERO */}
      <div className="glass p-8 text-center space-y-6 fade-in">

        <h1 className="text-4xl font-bold text-blue-600">
          🎓 School Management Dashboard
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Manage students, subjects, and marks with modern analytics
        </p>

        <div className="flex justify-center gap-4 flex-wrap">

          <button
            onClick={() => {
              setRole("teacher");
              navigate("/login");
            }}
            className="btn-primary"
          >
            👨‍🏫 Teacher Dashboard
          </button>

          <button
            onClick={() => {
              setRole("admin");
              navigate("/login");
            }}
            className="btn-primary"
          >
            👨‍💼 Admin Panel
          </button>

        </div>

      </div>

      {/* IMAGE SECTION */}
      <div className="mt-8 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          alt="school"
          className="rounded-2xl shadow-xl w-full max-w-4xl object-cover"
        />
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="glass p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-500">
            {students.length}
          </h2>
          <p>Total Students</p>
        </div>

        <div className="glass p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-500">
            {subjects.length}
          </h2>
          <p>Total Subjects</p>
        </div>

        <div className="glass p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-500">
            13
          </h2>
          <p>Grades</p>
        </div>

      </div>

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="glass p-6">
          <h3 className="text-blue-500 font-semibold mb-2">
            📊 Analytics
          </h3>
          <p className="text-sm">
            Visualize performance with charts and reports
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-blue-500 font-semibold mb-2">
            🧾 Reports
          </h3>
          <p className="text-sm">
            Export PDF reports for class performance
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-blue-500 font-semibold mb-2">
            ⚡ Fast Management
          </h3>
          <p className="text-sm">
            Easily manage students, grades, and subjects
          </p>
        </div>

      </div>

    </div>
  );
}