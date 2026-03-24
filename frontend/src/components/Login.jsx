import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Login = ({ setRole }) => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setRole(role);

    if (role === "admin") navigate("/admin");
    if (role === "teacher") navigate("/teacher");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-6 text-gray-800 dark:text-gray-100">

      {/* 🌗 Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className="text-3xl font-bold text-blue-500">
        Teacher Marks System
      </h1>

      <button onClick={() => handleLogin("teacher")} className="btn-primary w-60">
        Teacher Login
      </button>

      <button onClick={() => handleLogin("admin")} className="btn-primary w-60">
        Admin Login
      </button>
    </div>
  );
};

export default Login;