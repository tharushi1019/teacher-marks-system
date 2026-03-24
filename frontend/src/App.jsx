import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import TeacherPage from "./pages/TeacherPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [role, setRole] = useState("");

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login setRole={setRole} />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            role === "admin" ? (
              <AdminPage setRole={setRole} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            role === "teacher" ? (
              <TeacherPage setRole={setRole} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}