import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import TeacherPage from "./pages/TeacherPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [role, setRole] = useState("");

  return (
    <BrowserRouter>

      {/* 🌈 GLOBAL BACKGROUND */}
      <div className="min-h-screen 
        bg-gradient-to-br 
        from-blue-50 via-white to-blue-100 
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-800
        transition-all duration-500">

        <Routes>

          {/* 🏠 HOME PAGE (NEW DEFAULT) */}
          <Route
            path="/"
            element={<HomePage setRole={setRole} />}
          />

          {/* 🔐 LOGIN PAGE */}
          <Route
            path="/login"
            element={<Login setRole={setRole} />}
          />

          {/* 👨‍💼 ADMIN */}
          <Route
            path="/admin"
            element={
              role === "admin" ? (
                <AdminPage setRole={setRole} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 👨‍🏫 TEACHER */}
          <Route
            path="/teacher"
            element={
              role === "teacher" ? (
                <TeacherPage setRole={setRole} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* ❌ UNKNOWN ROUTES */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}